/**
 * Asking the website editor what a camp has published, and what to do when it
 * cannot answer.
 *
 * Split out of `index.ts` and given its collaborators as arguments — the
 * fetch, the sanitiser, the clock's worth of timeout, the log — so that all of
 * it can be exercised without a network, a Next.js build or a real editor.
 * `index.ts` supplies the real ones. PURE: no imports but types.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * The failure that this file exists to prevent
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Next's data cache only stores successful responses. So the obvious design —
 * "on any failure, return undefined and let the defaults render" — has a
 * consequence nobody would choose on purpose: while the editor's API is down,
 * every edit a camp has ever published silently disappears from the live site,
 * including a closure notice telling people a road is shut, and stays gone for
 * as long as the outage lasts. The page does not look broken. It looks fine
 * and says the wrong thing, which is the worst of the available outcomes and
 * the hardest to notice.
 *
 * So a failure falls back to the LAST GOOD ANSWER this instance received, and
 * only falls all the way back to the built-in defaults when there has never
 * been one. Serving a camp's last published words a little longer is always
 * better than replacing them with the developers' words.
 *
 * The memory is per instance and empties on a deploy. That is accepted for
 * release 1: a fresh instance has nothing better than the defaults anyway, and
 * an instance that has served the page once keeps what it learned.
 */

/** Why an override could not be used. Logged once per kind, per instance. */
export type FailureKind = 'unreachable' | 'timeout' | 'status' | 'json' | 'shape' | 'dropped'

/** What a sanitiser hands back: the fields that survived, and what did not. */
export interface Sanitised {
  value: Record<string, unknown>
  dropped: string[]
}

export interface LoadOverrideOptions {
  slug: string
  url: string
  /** How long to wait before giving up and using the last good answer. */
  timeoutMs: number
  /** Passed straight to `fetch` as `next`, so a publish can drop one tag. */
  next?: { tags: string[]; revalidate: number }
  /** The brand-side validator for this slug's document shape. */
  sanitise: (input: unknown) => Sanitised
  /** A seam: the tests pass a stub, so a test run can never call a live site. */
  fetchImpl: typeof fetch
  /** Called at most once per kind by the caller's own de-duplicating logger. */
  report: (kind: FailureKind, detail: string) => void
  /** Where the last good answer per slug is remembered. */
  lastGood: Map<string, Record<string, unknown>>
}

/** A successful read, or a failure that should fall back to the last good one. */
type FetchOutcome =
  | { ok: true; value: Record<string, unknown> }
  | { ok: false; kind: FailureKind; detail: string }

/** Sentinel for the race below: a value `fetch` itself can never produce. */
const TIMED_OUT: unique symbol = Symbol('content-fetch-timeout')

/**
 * Ask the editor once. Never throws.
 *
 * The timeout is a `Promise.race` and NOT only an `AbortController`, because
 * Next strips the signal from a fetch it is revalidating in the background:
 * the abort would never fire and a hung editor API would hold a page
 * regeneration open indefinitely. The controller is still passed so that a
 * live request is genuinely cancelled where it can be; the race is what
 * guarantees this function returns.
 */
async function fetchOnce(options: LoadOverrideOptions): Promise<FetchOutcome> {
  const { url, timeoutMs, sanitise, fetchImpl, report } = options
  const controller = new AbortController()
  let timer: ReturnType<typeof setTimeout> | undefined

  const deadline = new Promise<typeof TIMED_OUT>((settle) => {
    timer = setTimeout(() => {
      controller.abort()
      settle(TIMED_OUT)
    }, timeoutMs)
  })

  try {
    const response = await Promise.race([
      fetchImpl(url, {
        signal: controller.signal,
        headers: { accept: 'application/json' },
        ...(options.next ? { next: options.next } : {}),
      } as RequestInit),
      deadline,
    ])

    if (response === TIMED_OUT) {
      return { ok: false, kind: 'timeout', detail: `${url} took longer than ${timeoutMs}ms` }
    }
    if (!response.ok) {
      return { ok: false, kind: 'status', detail: `${url} answered ${response.status}` }
    }

    // Reading the body can hang after the headers arrive, so it races the same
    // deadline rather than trusting the response to finish.
    const body = await Promise.race([
      response.json().catch(() => TIMED_OUT),
      deadline,
    ])
    if (body === TIMED_OUT) {
      return { ok: false, kind: 'json', detail: `${url} did not answer usable JSON in time` }
    }

    // The contract: { slug, override, publishedAt, version }. An unknown slug
    // and an unpublished page both answer 200 with an empty override, which is
    // not an error on either side.
    if (typeof body !== 'object' || body === null || Array.isArray(body)) {
      return { ok: false, kind: 'shape', detail: `${url} answered something that is not an object` }
    }
    const override = (body as Record<string, unknown>).override
    if (override === undefined || override === null) {
      // A real answer that says "nothing is published here". It REPLACES the
      // last good value, because a camp unpublishing is a change, not a fault.
      return { ok: true, value: {} }
    }
    if (typeof override !== 'object' || Array.isArray(override)) {
      return { ok: false, kind: 'shape', detail: `${url} answered an override that is not an object` }
    }

    const cleaned = sanitise(override)
    if (cleaned.dropped.length > 0) {
      report('dropped', `${options.slug} sent fields this site will not render: ${cleaned.dropped.join(', ')}`)
    }
    return { ok: true, value: cleaned.value }
  } catch {
    // An aborted fetch lands here too, after the race has already decided.
    return { ok: false, kind: 'unreachable', detail: `${url} could not be reached` }
  } finally {
    if (timer) clearTimeout(timer)
  }
}

/**
 * One slug's override: today's if we can get it, the last one we got if we
 * cannot, and nothing at all if we never could.
 */
export async function loadOverrideWith(
  options: LoadOverrideOptions,
): Promise<Record<string, unknown> | undefined> {
  const outcome = await fetchOnce(options)

  if (outcome.ok) {
    options.lastGood.set(options.slug, outcome.value)
    return outcome.value
  }

  const remembered = options.lastGood.get(options.slug)
  options.report(
    outcome.kind,
    `${outcome.detail} — ${remembered ? 'serving the last version this instance received' : 'rendering built-in defaults'}`,
  )
  return remembered
}
