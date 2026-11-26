/**
 * Bot protection for the public forms on baserves.com (/careers and /contact).
 *
 * Four checks, in this order:
 *   1. Honeypot: a `website` field hidden from people and screen readers.
 *      Anything in it is a bot; it gets a quiet "success" and nothing is sent.
 *   2. Time to fill: posted faster than a person could read the form. Same
 *      quiet "success".
 *   3. Per-connection rate limit (in memory, per machine). 429.
 *   4. Cloudflare Turnstile, server-side, when TURNSTILE_SECRET_KEY is set.
 *      A missing or failed token is refused (400) so the visitor can retry.
 *      If Cloudflare itself cannot be reached the form still goes through
 *      (logged), so an outage there never stops a real application.
 *
 * Pure on purpose: no imports, so tests/form-guard.test.ts runs it under
 * node's own TypeScript stripping.
 */

export type GuardResult =
  | { action: 'send' }
  | { action: 'drop'; reason: string }
  | { action: 'reject'; status: number; error: string; reason: string }

export interface GuardPolicy {
  /** Name for the rate-limit bucket and the logs. */
  name: string
  minFillMs: number
  maxPerWindow: number
  windowMs: number
}

export const CONTACT_POLICY: GuardPolicy = { name: 'contact', minFillMs: 3000, maxPerWindow: 5, windowMs: 10 * 60 * 1000 }
// An honest applicant sends one application; three an hour from one
// connection leaves room for a family or a shared office.
export const CAREERS_POLICY: GuardPolicy = { name: 'careers', minFillMs: 15000, maxPerWindow: 3, windowMs: 60 * 60 * 1000 }

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

/** Fly sets fly-client-ip itself; the first x-forwarded-for entry is whatever the caller wrote. */
export function clientIp(headers: { get(name: string): string | null }): string {
  const fly = headers.get('fly-client-ip')?.trim()
  if (fly) return fly
  const real = headers.get('x-real-ip')?.trim()
  if (real) return real
  const xff = (headers.get('x-forwarded-for') || '').split(',').map(s => s.trim()).filter(Boolean)
  return xff[xff.length - 1] || 'unknown'
}

const hits = new Map<string, number[]>()

export function rateLimited(policy: GuardPolicy, ip: string, now = Date.now()): boolean {
  const key = `${policy.name}:${ip}`
  const recent = (hits.get(key) || []).filter(t => now - t < policy.windowMs)
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 1000) {
    for (const [k, times] of Array.from(hits.entries())) {
      if (!times.some(t => now - t < policy.windowMs)) hits.delete(k)
    }
  }
  return recent.length > policy.maxPerWindow
}

/** For tests only. */
export function resetRateLimits(): void {
  hits.clear()
}

type FetchLike = (url: string, init: { method: string; headers: Record<string, string>; body: string }) => Promise<{ ok: boolean; json(): Promise<any> }>

export async function verifyTurnstile(
  token: unknown,
  ip: string,
  secret: string | undefined,
  fetchImpl: FetchLike = fetch as unknown as FetchLike
): Promise<'ok' | 'skipped' | 'failed' | 'unreachable'> {
  if (!secret) return 'skipped'
  if (typeof token !== 'string' || token.length < 10 || token.length > 4096) return 'failed'
  try {
    const body = new URLSearchParams({ secret, response: token })
    if (ip && ip !== 'unknown') body.set('remoteip', ip)
    const res = await fetchImpl(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })
    if (!res.ok) return 'unreachable'
    const data = await res.json()
    return data && data.success === true ? 'ok' : 'failed'
  } catch {
    return 'unreachable'
  }
}

export async function guardSubmission(
  policy: GuardPolicy,
  data: Record<string, unknown>,
  ip: string,
  opts: { secret?: string; fetchImpl?: FetchLike; now?: number } = {}
): Promise<GuardResult> {
  if (typeof data.website === 'string' && data.website.trim() !== '') {
    return { action: 'drop', reason: 'honeypot' }
  }
  // A page loaded before this check shipped sends no timing at all; that is
  // left to the rate limit and Turnstile rather than silently dropping a real
  // application.
  const elapsed = data.elapsedMs === undefined || data.elapsedMs === null ? NaN : Number(data.elapsedMs)
  if (Number.isFinite(elapsed) && elapsed < policy.minFillMs) {
    return { action: 'drop', reason: `filled in ${elapsed}ms` }
  }
  if (rateLimited(policy, ip, opts.now)) {
    return { action: 'reject', status: 429, error: 'Too many submissions from this connection. Please try again later.', reason: 'rate limit' }
  }
  const turnstile = await verifyTurnstile(data.turnstileToken, ip, opts.secret, opts.fetchImpl)
  if (turnstile === 'failed') {
    return { action: 'reject', status: 400, error: 'Please complete the security check and try again.', reason: 'turnstile failed' }
  }
  if (turnstile === 'unreachable') console.warn(`${policy.name} form: Turnstile could not be reached, letting the submission through`)
  return { action: 'send' }
}
