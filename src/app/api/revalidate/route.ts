import { NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { contentTag, propertySlugs, SITE_SETTINGS_SLUG } from '@/content'
import { SIGNATURE_HEADER, isValidSlug, verifyRevalidateSignature } from '@/content/signature'

/**
 * "A camp just published a change to this page."
 *
 * The website editor posts one slug here, signed. This drops the cache entry
 * for that slug and nothing else, so a publish is visible within seconds
 * instead of within the revalidation interval.
 *
 * What this endpoint is careful about, and why:
 *
 *   * It FAILS CLOSED. With `SITE_REVALIDATE_SECRET` unset, every request is
 *     refused. An unconfigured deployment is not an open one: the cost of
 *     refusing is that publishes take five minutes to appear, and the cost of
 *     accepting is a public URL that lets a stranger make this site re-fetch
 *     whatever answers `CONTENT_API_URL`, as often as they like.
 *   * It verifies the RAW BODY. The sender signs the exact bytes it sent, so
 *     the bytes are what get verified — never a parsed-and-reserialised object,
 *     whose key order and spacing would not survive the round trip.
 *   * It NEVER ECHOES INPUT. The answer is `{ok:true}` or `{ok:false}` and a
 *     status code. Reflecting a slug, a signature or an error string back at
 *     whoever sent it turns a webhook into a way to ask this site questions.
 *   * The slug is matched against a pattern before it is used, and then
 *     against the slugs this site actually has, so a valid signature over
 *     nonsense costs one rejected request rather than a pile of cache churn.
 */

export const runtime = 'nodejs'
// A webhook is a side effect. It must never be prerendered or cached.
export const dynamic = 'force-dynamic'

/**
 * A burst guard, not a rate limit.
 *
 * The signature is what keeps strangers out; this is what stops a retry loop
 * at the other end from turning into a thousand cache invalidations. It lives
 * in one process's memory, which means it is approximate across regions — and
 * approximate is the right amount of machinery for a webhook that a correct
 * sender calls once per publish.
 */
const BURST_LIMIT = 60
const BURST_WINDOW_MS = 60 * 1000
const seen: { windowStart: number; count: number } = { windowStart: 0, count: 0 }

function overBurstLimit(now: number): boolean {
  if (now - seen.windowStart > BURST_WINDOW_MS) {
    seen.windowStart = now
    seen.count = 0
  }
  seen.count += 1
  return seen.count > BURST_LIMIT
}

/** No body, no detail, no echo. */
function refuse(status: number): NextResponse {
  return NextResponse.json({ ok: false }, { status, headers: { 'cache-control': 'no-store' } })
}

export async function POST(request: Request): Promise<NextResponse> {
  if (overBurstLimit(Date.now())) return refuse(429)

  const secret = process.env.SITE_REVALIDATE_SECRET?.trim()
  // Fail closed, and say "not configured" rather than "forbidden" so that an
  // operator reading the sender's logs can tell the two apart. The body is the
  // same either way.
  if (!secret) return refuse(503)

  // Raw bytes, exactly as sent. Everything after this reads from `raw`.
  let raw: string
  try {
    raw = await request.text()
  } catch {
    return refuse(400)
  }
  // A body big enough to be interesting is not a body containing one slug.
  if (raw.length > 4096) return refuse(413)

  if (!verifyRevalidateSignature(secret, raw, request.headers.get(SIGNATURE_HEADER))) {
    return refuse(401)
  }

  let payload: unknown
  try {
    payload = JSON.parse(raw)
  } catch {
    return refuse(400)
  }
  if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) return refuse(400)

  const slug = (payload as Record<string, unknown>).slug
  if (!isValidSlug(slug)) return refuse(400)

  const isSettings = slug === SITE_SETTINGS_SLUG
  if (!isSettings && !propertySlugs.includes(slug)) {
    // A slug this site does not render. Signed, so not an attack — most likely
    // a page that exists in the editor and not here yet. Nothing to drop, and
    // nothing worth failing over.
    return NextResponse.json({ ok: true }, { headers: { 'cache-control': 'no-store' } })
  }

  // The tag is the part that matters: it is what `getPropertyContent` and
  // `getSiteSettings` filed their fetch under, and dropping it is what makes
  // the next render ask the editor again.
  revalidateTag(contentTag(slug))

  // And the rendered pages that read it. The homepage is deliberately NOT in
  // this list: it does not read the content layer, so nothing it renders can
  // have changed. Add it here on the day it does.
  if (isSettings) {
    for (const propertySlug of propertySlugs) revalidatePath(`/${propertySlug}`)
  } else {
    revalidatePath(`/${slug}`)
  }
  // The shared template that serves the slugs without a bespoke page of their
  // own. It renders on demand today, so this is belt and braces.
  revalidatePath('/[slug]', 'page')

  return NextResponse.json({ ok: true }, { headers: { 'cache-control': 'no-store' } })
}
