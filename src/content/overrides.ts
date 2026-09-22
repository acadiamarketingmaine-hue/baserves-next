/**
 * What this site will accept from the website editor.
 *
 * The editor validates everything on the way IN, and its validator is the
 * contract (booking-system `lib/site-content-validate.ts` +
 * `lib/site-content-policy.ts`). This file validates the same things again on
 * the way OUT, on this side of the wire, and it exists because of a single
 * assumption we refuse to make: that the thing answering `CONTENT_API_URL` is
 * the editor. It might be a stale deployment, a misconfigured hostname, a
 * proxy, or somebody who noticed that a public web server takes JSON from
 * another public web server and renders it. None of those are reasons to put
 * markup, a `javascript:` URL, or a megabyte of prose on a live page.
 *
 * Three rules govern the whole file:
 *
 *   * Nothing here ever throws, and nothing here ever refuses a whole page
 *     because of one bad field. A field that fails its rule is DROPPED, and a
 *     dropped field renders the built-in default — which is the same outcome
 *     as "there was no override", and is always a correct page.
 *   * Only release-1 fields survive. The slug, the page name, the SEO block
 *     and the hand-built page sections are the developers' and cannot be
 *     reached from here even if the API sends them.
 *   * Plain text only. No angle brackets, no control characters, no
 *     unbounded lengths, no `__proto__`.
 *
 * PURE. No imports but types, no environment read at module scope, no clock.
 * Everything time-dependent or deployment-dependent is a parameter, so all of
 * it can be tested without a server, a network or a fixed date.
 */

import type { Cta, Notice, Photo, Season, Stat } from './types'

/* ---------------------------------------------------------------- policy -- */

/**
 * Every limit and every timing decision in one place, mirroring
 * `SITE_CONTENT_POLICY` in the booking system. Where a number appears in both
 * repositories it is the same number on purpose; where they drift, the editor
 * refuses the save first and this file is the backstop.
 */
export const CONTENT_POLICY = {
  /**
   * How long a fetched override is served before it is checked again.
   *
   * The webhook makes a publish visible in seconds. This is what happens when
   * the webhook does not arrive — a wrong configuration, a cold region, a
   * network that ate it — and five minutes is short enough that nobody files a
   * bug and long enough that the editor's API sees one request per page per
   * five minutes rather than one per visitor.
   */
  revalidateSeconds: 300,
  /**
   * How long this site will wait for the editor before rendering defaults.
   *
   * This is inside the render path of a page a visitor is waiting for, so it
   * is deliberately shorter than any sensible API timeout. A slow editor costs
   * a stale page, never a slow one.
   */
  fetchTimeoutMs: 1500,
  /**
   * The calendar a dated notice is read against.
   *
   * The properties are Michigan and Midwest parks, and a closure notice that
   * says it ends today should stop showing at the end of today where the
   * campground is, not at 7pm local because a server thinks in UTC.
   */
  timezone: 'America/Detroit',

  maxGalleryPhotos: 24,
  maxParagraphs: 12,
  maxFeatures: 40,
  maxStats: 8,
  maxNotices: 3,
  maxCtas: 8,
  maxAlternateEmails: 6,

  text: {
    tagline: 120,
    summary: 400,
    paragraph: 2000,
    feature: 120,
    statLabel: 40,
    statValue: 24,
    seasonLabel: 60,
    seasonNote: 600,
    noticeMessage: 400,
    ctaLabel: 60,
    alt: 250,
    url: 500,
    settingsField: 200,
  },
} as const

/** The keys each document accepts. Anything else is dropped by name. */
const PAGE_KEYS = [
  'tagline',
  'summary',
  'hero',
  'gallery',
  'paragraphs',
  'features',
  'stats',
  'season',
  'notices',
  'ctas',
] as const

const SETTINGS_KEYS = ['phone', 'phoneDisplay', 'phoneE164', 'address', 'emails', 'notices'] as const
const PHOTO_KEYS = ['src', 'alt', 'width', 'height'] as const
const STAT_KEYS = ['key', 'value', 'label'] as const
const NOTICE_KEYS = ['id', 'message', 'severity', 'startsOn', 'endsOn'] as const
const CTA_KEYS = ['label', 'url', 'kind'] as const
const SEASON_KEYS = ['isSeasonal', 'label', 'note', 'opensOn', 'closesOn'] as const
const ADDRESS_KEYS = ['street', 'locality', 'region', 'postalCode', 'country'] as const
const EMAILS_KEYS = ['primary', 'alternates'] as const

const NOTICE_SEVERITIES = ['info', 'warning', 'closure'] as const
const CTA_KINDS = ['booking', 'external', 'internal'] as const

/* ------------------------------------------------------------ primitives -- */

/** Keys that are a way of reaching the prototype rather than a field name. */
const FORBIDDEN_KEYS = new Set(['__proto__', 'constructor', 'prototype'])

function isSafeKey(key: string): boolean {
  return !FORBIDDEN_KEYS.has(key)
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/** Own, safe, allowed keys of an object — everything else simply is not read. */
function pick(
  object: Record<string, unknown>,
  allowed: readonly string[],
  dropped: string[],
  path: string,
): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const key of Object.keys(object)) {
    if (!isSafeKey(key)) {
      dropped.push(join(path, key))
      continue
    }
    if (!allowed.includes(key)) {
      dropped.push(join(path, key))
      continue
    }
    out[key] = object[key]
  }
  return out
}

function join(parent: string, child: string | number): string {
  return parent ? `${parent}.${child}` : String(child)
}

/**
 * Angle brackets and control characters.
 *
 * The pages render these strings as JSX children, so stored markup would print
 * rather than execute — but a page printing half a tag is still broken, and a
 * content field containing markup means something upstream is not the editor.
 * Newline and tab are allowed because a real paragraph contains them.
 *
 * The second range is the invisible half: zero-width spaces and joiners, the
 * bidirectional overrides, the word joiner and a byte-order mark. None of them
 * are typed by a person writing about a campground, all of them survive a
 * round trip through JSON, and the bidi ones can make a rendered sentence read
 * in an order that is not the order it is stored in. A field holding any of
 * them is dropped, which renders the built-in text — the cheapest possible
 * outcome for something nobody can see on screen to debug.
 */
const MARKUP = /[<>]/
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u202A-\u202E\u2060-\u2069\uFEFF]/

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

/** A real calendar date, so that 2026-02-31 is refused rather than rolled over. */
export function isRealDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false
  const parsed = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value
}

/**
 * One free-text value, or undefined when it may not be used.
 *
 * A blank string is returned as-is rather than dropped: `resolve` reads a
 * blank as "fall back to the built-in default", which is the editor's
 * reset-to-default control and must survive this file.
 */
function text(value: unknown, limit: number, dropped: string[], path: string): string | undefined {
  if (value === undefined || value === null) return undefined
  if (typeof value !== 'string') {
    dropped.push(path)
    return undefined
  }
  if (value.trim() === '') return value
  if (value.length > limit || MARKUP.test(value) || CONTROL_CHARS.test(value)) {
    dropped.push(path)
    return undefined
  }
  return value
}

/** A required free-text value: inside a supplied list, a blank is a hole. */
function requiredText(
  value: unknown,
  limit: number,
  dropped: string[],
  path: string,
): string | undefined {
  const cleaned = text(value, limit, dropped, path)
  if (cleaned === undefined) return undefined
  if (cleaned.trim() === '') {
    dropped.push(path)
    return undefined
  }
  return cleaned
}

function textList(
  value: unknown,
  maxItems: number,
  limit: number,
  dropped: string[],
  path: string,
): string[] | undefined {
  if (value === undefined || value === null) return undefined
  if (!Array.isArray(value)) {
    dropped.push(path)
    return undefined
  }
  const out: string[] = []
  // Capped rather than refused: the first N are real content, and a list that
  // ran long is a form that got away from somebody, not an attack on the page.
  const kept = value.slice(0, maxItems)
  for (let index = 0; index < kept.length; index += 1) {
    const cleaned = requiredText(kept[index], limit, dropped, join(path, index))
    if (cleaned !== undefined) out.push(cleaned)
  }
  if (value.length > maxItems) dropped.push(`${path}[${maxItems}..]`)
  return out
}

function positiveInteger(value: unknown, dropped: string[], path: string): number | undefined {
  if (value === undefined || value === null) return undefined
  if (typeof value !== 'number' || !Number.isInteger(value) || value <= 0) {
    dropped.push(path)
    return undefined
  }
  return value
}

/* ------------------------------------------------------------------ urls -- */

/**
 * The hosts an overridden image may be served from.
 *
 * Comma separated, and EMPTY BY DEFAULT: a deployment that has not been told
 * where the editor stores photographs does not get to be told by the editor.
 * The same list is turned into a `next.config.js` remote pattern, because an
 * `<Image>` host that the optimiser will not load is a broken picture, and two
 * lists that have to agree should be one list.
 */
export function imageHostAllowList(env: Record<string, string | undefined>): string[] {
  const configured = env.CONTENT_IMAGE_HOSTS
  if (!configured) return []
  return configured
    .split(',')
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean)
}

/** A listed host also covers its subdomains, so one entry is usually enough. */
export function isAllowedImageHost(host: string, allowList: string[]): boolean {
  const lower = host.toLowerCase()
  return allowList.some((allowed) => lower === allowed || lower.endsWith(`.${allowed}`))
}

/**
 * Is this a path on this same site, rather than an absolute address?
 *
 * "Starts with a slash and not two slashes" is NOT enough, and the hole is
 * worth spelling out because it is easy to look at and see nothing wrong.
 * Browsers and `new URL` both treat a backslash in the authority position as a
 * slash, so `/\evil.com` is read as `//evil.com` — a protocol-relative address
 * pointing at somebody else's site — while passing a naive `!startsWith('//')`
 * check. The same trick works with `/\/evil.com` and `/\\evil.com`.
 *
 * So: a slash, then an unambiguous path character. A bare `/` is the home
 * page and is allowed; anything whose second character is a slash, a
 * backslash, a colon or whitespace is not a path on this site.
 */
const ROOT_RELATIVE = /^\/(?:[A-Za-z0-9](?:[^\s\\]*)?)?$/

function isRootRelative(url: string): boolean {
  return ROOT_RELATIVE.test(url)
}

/**
 * A backslash never belongs in a URL this site publishes.
 *
 * In a path it is an escape that different parsers disagree about, and
 * disagreeing parsers are exactly how a link that reads as internal gets
 * followed as external. Refused everywhere, in buttons and in image sources,
 * rather than only in the one position where the trick is known to work.
 */
function hasBackslash(url: string): boolean {
  return url.includes('\\')
}

/**
 * A URL a button may point at: https, or a path on this site.
 *
 * Anything else — http, `javascript:`, `data:`, a bare hostname, anything
 * carrying a backslash — is dropped, which leaves the built-in button in
 * place.
 */
function ctaUrl(value: unknown, dropped: string[], path: string): string | undefined {
  const raw = requiredText(value, CONTENT_POLICY.text.url, dropped, path)
  if (raw === undefined) return undefined
  if (hasBackslash(raw)) {
    dropped.push(path)
    return undefined
  }
  if (isRootRelative(raw)) return raw
  // A slash-led value that is not a clean path is not an absolute URL either.
  // Refuse it here rather than letting `new URL` decide what it meant.
  if (raw.startsWith('/')) {
    dropped.push(path)
    return undefined
  }
  let parsed: URL
  try {
    parsed = new URL(raw)
  } catch {
    dropped.push(path)
    return undefined
  }
  if (parsed.protocol !== 'https:') {
    dropped.push(path)
    return undefined
  }
  return raw
}

/**
 * An image address: https, on an allow-listed host, and nothing else.
 *
 * Deliberately stricter than a button's URL. A button is a link somebody
 * chooses to follow; an image is fetched by every visitor's browser and passed
 * through this site's own image optimiser, so an unknown host is a request
 * this site makes on a stranger's behalf. With no allow-list configured every
 * image override is dropped and every photograph on the site stays the one in
 * the repository.
 */
function imageUrl(
  value: unknown,
  allowedHosts: string[],
  dropped: string[],
  path: string,
): string | undefined {
  const raw = requiredText(value, CONTENT_POLICY.text.url, dropped, path)
  if (raw === undefined) return undefined
  if (hasBackslash(raw)) {
    dropped.push(path)
    return undefined
  }
  let parsed: URL
  try {
    parsed = new URL(raw)
  } catch {
    dropped.push(path)
    return undefined
  }
  if (parsed.protocol !== 'https:' || !isAllowedImageHost(parsed.hostname, allowedHosts)) {
    dropped.push(path)
    return undefined
  }
  return raw
}

/* --------------------------------------------------------------- pieces --- */

interface Context {
  dropped: string[]
  imageHosts: string[]
}

function photo(value: unknown, ctx: Context, path: string): Photo | undefined {
  if (!isPlainObject(value)) {
    if (value !== undefined && value !== null) ctx.dropped.push(path)
    return undefined
  }
  const fields = pick(value, PHOTO_KEYS, ctx.dropped, path)
  const src = imageUrl(fields.src, ctx.imageHosts, ctx.dropped, join(path, 'src'))
  // Alt text is not optional: a supplied photograph replaces one that already
  // had it, and a screen reader saying nothing is a regression.
  const alt = requiredText(fields.alt, CONTENT_POLICY.text.alt, ctx.dropped, join(path, 'alt'))
  if (src === undefined || alt === undefined) {
    ctx.dropped.push(path)
    return undefined
  }
  const out: Photo = { src, alt }
  const width = positiveInteger(fields.width, ctx.dropped, join(path, 'width'))
  const height = positiveInteger(fields.height, ctx.dropped, join(path, 'height'))
  if (width !== undefined) out.width = width
  if (height !== undefined) out.height = height
  return out
}

function gallery(value: unknown, ctx: Context, path: string): Photo[] | undefined {
  if (value === undefined || value === null) return undefined
  if (!Array.isArray(value)) {
    ctx.dropped.push(path)
    return undefined
  }
  const out: Photo[] = []
  const kept = value.slice(0, CONTENT_POLICY.maxGalleryPhotos)
  for (let index = 0; index < kept.length; index += 1) {
    const cleaned = photo(kept[index], ctx, join(path, index))
    if (cleaned) out.push(cleaned)
  }
  if (value.length > CONTENT_POLICY.maxGalleryPhotos) {
    ctx.dropped.push(`${path}[${CONTENT_POLICY.maxGalleryPhotos}..]`)
  }
  return out
}

function stats(value: unknown, ctx: Context, path: string): Stat[] | undefined {
  if (value === undefined || value === null) return undefined
  if (!Array.isArray(value)) {
    ctx.dropped.push(path)
    return undefined
  }
  const out: Stat[] = []
  const kept = value.slice(0, CONTENT_POLICY.maxStats)
  for (let index = 0; index < kept.length; index += 1) {
    const entry = kept[index]
    const at = join(path, index)
    if (!isPlainObject(entry)) {
      ctx.dropped.push(at)
      continue
    }
    const fields = pick(entry, STAT_KEYS, ctx.dropped, at)
    const statValue = requiredText(
      fields.value,
      CONTENT_POLICY.text.statValue,
      ctx.dropped,
      join(at, 'value'),
    )
    const label = requiredText(
      fields.label,
      CONTENT_POLICY.text.statLabel,
      ctx.dropped,
      join(at, 'label'),
    )
    if (statValue === undefined || label === undefined) {
      ctx.dropped.push(at)
      continue
    }
    // The identifier is the page's, not the client's: it is a React key and a
    // field name, and a supplied one is only a hint.
    const key =
      typeof fields.key === 'string' && fields.key.trim() !== '' && isSafeKey(fields.key)
        ? fields.key
        : `stat-${index}`
    out.push({ key, value: statValue, label })
  }
  if (value.length > CONTENT_POLICY.maxStats) {
    ctx.dropped.push(`${path}[${CONTENT_POLICY.maxStats}..]`)
  }
  return out
}

/** A date box that was cleared is a reset, the same as a cleared text box. */
function optionalDate(value: unknown, dropped: string[], path: string): string | undefined {
  if (value === undefined || value === null) return undefined
  if (typeof value !== 'string') {
    dropped.push(path)
    return undefined
  }
  if (value.trim() === '') return ''
  if (!isRealDate(value)) {
    dropped.push(path)
    return undefined
  }
  return value
}

function season(value: unknown, ctx: Context, path: string): Partial<Season> | undefined {
  if (value === undefined || value === null) return undefined
  if (!isPlainObject(value)) {
    ctx.dropped.push(path)
    return undefined
  }
  const fields = pick(value, SEASON_KEYS, ctx.dropped, path)
  const out: Partial<Season> = {}

  if (fields.isSeasonal !== undefined && fields.isSeasonal !== null) {
    if (typeof fields.isSeasonal === 'boolean') out.isSeasonal = fields.isSeasonal
    else ctx.dropped.push(join(path, 'isSeasonal'))
  }
  const label = text(fields.label, CONTENT_POLICY.text.seasonLabel, ctx.dropped, join(path, 'label'))
  if (label !== undefined) out.label = label
  const note = text(fields.note, CONTENT_POLICY.text.seasonNote, ctx.dropped, join(path, 'note'))
  if (note !== undefined) out.note = note

  const opensOn = optionalDate(fields.opensOn, ctx.dropped, join(path, 'opensOn'))
  const closesOn = optionalDate(fields.closesOn, ctx.dropped, join(path, 'closesOn'))
  if (opensOn && closesOn && closesOn < opensOn) {
    ctx.dropped.push(join(path, 'closesOn'))
  } else {
    if (opensOn !== undefined) out.opensOn = opensOn
    if (closesOn !== undefined) out.closesOn = closesOn
  }
  return out
}

function notices(value: unknown, ctx: Context, path: string): Notice[] | undefined {
  if (value === undefined || value === null) return undefined
  if (!Array.isArray(value)) {
    ctx.dropped.push(path)
    return undefined
  }
  const out: Notice[] = []
  const kept = value.slice(0, CONTENT_POLICY.maxNotices)
  for (let index = 0; index < kept.length; index += 1) {
    const entry = kept[index]
    const at = join(path, index)
    if (!isPlainObject(entry)) {
      ctx.dropped.push(at)
      continue
    }
    // `href` and `linkLabel` exist on the built-in Notice type but are NOT in
    // the editor's contract, so an override may not set them: a banner is
    // words, and a link in it is a destination the developers chose.
    const fields = pick(entry, NOTICE_KEYS, ctx.dropped, at)
    const message = requiredText(
      fields.message,
      CONTENT_POLICY.text.noticeMessage,
      ctx.dropped,
      join(at, 'message'),
    )
    const severity = fields.severity
    if (
      message === undefined ||
      typeof severity !== 'string' ||
      !(NOTICE_SEVERITIES as readonly string[]).includes(severity)
    ) {
      ctx.dropped.push(at)
      continue
    }
    const startsOn = optionalDate(fields.startsOn, ctx.dropped, join(at, 'startsOn'))
    const endsOn = optionalDate(fields.endsOn, ctx.dropped, join(at, 'endsOn'))
    // A date that was supplied and is not a date takes the WHOLE notice with
    // it. Dropping just the field would leave a banner with no end on it, and
    // a banner nobody can see the end of is the one failure mode here that
    // costs a camp something.
    const badDate =
      (fields.startsOn !== undefined && fields.startsOn !== null && startsOn === undefined) ||
      (fields.endsOn !== undefined && fields.endsOn !== null && endsOn === undefined)
    if (badDate || (startsOn && endsOn && endsOn < startsOn)) {
      ctx.dropped.push(at)
      continue
    }
    const id =
      typeof fields.id === 'string' && fields.id.trim() !== '' && isSafeKey(fields.id)
        ? fields.id
        : `notice-${index}`
    const notice: Notice = { id, message, severity: severity as Notice['severity'] }
    if (startsOn) notice.startsOn = startsOn
    if (endsOn) notice.endsOn = endsOn
    out.push(notice)
  }
  if (value.length > CONTENT_POLICY.maxNotices) {
    ctx.dropped.push(`${path}[${CONTENT_POLICY.maxNotices}..]`)
  }
  return out
}

function ctas(value: unknown, ctx: Context, path: string): Record<string, Cta> | undefined {
  if (value === undefined || value === null) return undefined
  if (!isPlainObject(value)) {
    ctx.dropped.push(path)
    return undefined
  }
  const out: Record<string, Cta> = {}
  const slots = Object.keys(value).slice(0, CONTENT_POLICY.maxCtas)
  for (const slot of slots) {
    const at = join(path, slot)
    // A slot name is a key this code is about to write. `__proto__` is not a
    // slot.
    if (!isSafeKey(slot)) {
      ctx.dropped.push(at)
      continue
    }
    const entry = value[slot]
    if (!isPlainObject(entry)) {
      ctx.dropped.push(at)
      continue
    }
    const fields = pick(entry, CTA_KEYS, ctx.dropped, at)
    const label = requiredText(
      fields.label,
      CONTENT_POLICY.text.ctaLabel,
      ctx.dropped,
      join(at, 'label'),
    )
    const url = ctaUrl(fields.url, ctx.dropped, join(at, 'url'))
    const kind = fields.kind
    if (
      label === undefined ||
      url === undefined ||
      typeof kind !== 'string' ||
      !(CTA_KINDS as readonly string[]).includes(kind)
    ) {
      ctx.dropped.push(at)
      continue
    }
    // A button's kind and its destination have to agree, or a "book now" that
    // points at this site's own 404 looks like a working button.
    const internal = isRootRelative(url)
    if ((kind === 'internal') !== internal) {
      ctx.dropped.push(at)
      continue
    }
    out[slot] = { label, url, kind: kind as Cta['kind'] }
  }
  if (Object.keys(value).length > CONTENT_POLICY.maxCtas) {
    ctx.dropped.push(`${path}[${CONTENT_POLICY.maxCtas}..]`)
  }
  return out
}

/* ------------------------------------------------------------ documents --- */

export interface SanitisedOverride<T> {
  /** The fields that survived. Safe to hand to `resolve`. */
  value: T
  /** Dotted paths of everything that did not, for one log line. */
  dropped: string[]
}

export interface SanitiseOptions {
  /** Hosts an image override may point at. Empty means "no image overrides". */
  imageHosts?: string[]
}

/** Clean one property page's override. Never throws; never refuses a page. */
export function sanitisePropertyOverride(
  input: unknown,
  options: SanitiseOptions = {},
): SanitisedOverride<Record<string, unknown>> {
  const ctx: Context = { dropped: [], imageHosts: options.imageHosts ?? [] }
  if (!isPlainObject(input)) {
    return { value: {}, dropped: input === undefined || input === null ? [] : [''] }
  }
  const fields = pick(input, PAGE_KEYS, ctx.dropped, '')
  const value: Record<string, unknown> = {}

  const tagline = text(fields.tagline, CONTENT_POLICY.text.tagline, ctx.dropped, 'tagline')
  if (tagline !== undefined) value.tagline = tagline

  const summary = text(fields.summary, CONTENT_POLICY.text.summary, ctx.dropped, 'summary')
  if (summary !== undefined) value.summary = summary

  if (fields.hero !== undefined && fields.hero !== null) {
    const hero = photo(fields.hero, ctx, 'hero')
    if (hero) value.hero = hero
  }

  const photos = gallery(fields.gallery, ctx, 'gallery')
  if (photos !== undefined) value.gallery = photos

  const paragraphs = textList(
    fields.paragraphs,
    CONTENT_POLICY.maxParagraphs,
    CONTENT_POLICY.text.paragraph,
    ctx.dropped,
    'paragraphs',
  )
  if (paragraphs !== undefined) value.paragraphs = paragraphs

  const features = textList(
    fields.features,
    CONTENT_POLICY.maxFeatures,
    CONTENT_POLICY.text.feature,
    ctx.dropped,
    'features',
  )
  if (features !== undefined) value.features = features

  const statRows = stats(fields.stats, ctx, 'stats')
  if (statRows !== undefined) value.stats = statRows

  const seasonWording = season(fields.season, ctx, 'season')
  if (seasonWording !== undefined) value.season = seasonWording

  const banners = notices(fields.notices, ctx, 'notices')
  if (banners !== undefined) value.notices = banners

  const buttons = ctas(fields.ctas, ctx, 'ctas')
  if (buttons !== undefined) value.ctas = buttons

  return { value, dropped: ctx.dropped }
}

/** Clean the site-wide settings override. */
export function sanitiseSettingsOverride(
  input: unknown,
  options: SanitiseOptions = {},
): SanitisedOverride<Record<string, unknown>> {
  const ctx: Context = { dropped: [], imageHosts: options.imageHosts ?? [] }
  if (!isPlainObject(input)) {
    return { value: {}, dropped: input === undefined || input === null ? [] : [''] }
  }
  const fields = pick(input, SETTINGS_KEYS, ctx.dropped, '')
  const value: Record<string, unknown> = {}

  for (const field of ['phone', 'phoneDisplay', 'phoneE164'] as const) {
    const cleaned = text(fields[field], CONTENT_POLICY.text.settingsField, ctx.dropped, field)
    if (cleaned !== undefined) value[field] = cleaned
  }

  if (isPlainObject(fields.address)) {
    const parts = pick(fields.address, ADDRESS_KEYS, ctx.dropped, 'address')
    const address: Record<string, unknown> = {}
    for (const part of ADDRESS_KEYS) {
      const cleaned = text(
        parts[part],
        CONTENT_POLICY.text.settingsField,
        ctx.dropped,
        join('address', part),
      )
      if (cleaned !== undefined) address[part] = cleaned
    }
    value.address = address
  } else if (fields.address !== undefined && fields.address !== null) {
    ctx.dropped.push('address')
  }

  if (isPlainObject(fields.emails)) {
    const parts = pick(fields.emails, EMAILS_KEYS, ctx.dropped, 'emails')
    const emails: Record<string, unknown> = {}
    const primary = text(
      parts.primary,
      CONTENT_POLICY.text.settingsField,
      ctx.dropped,
      'emails.primary',
    )
    if (primary !== undefined) {
      if (primary.trim() === '' || looksLikeEmail(primary)) emails.primary = primary
      else ctx.dropped.push('emails.primary')
    }
    const alternates = textList(
      parts.alternates,
      CONTENT_POLICY.maxAlternateEmails,
      CONTENT_POLICY.text.settingsField,
      ctx.dropped,
      'emails.alternates',
    )
    if (alternates !== undefined) {
      const good = alternates.filter((address) => looksLikeEmail(address))
      if (good.length !== alternates.length) ctx.dropped.push('emails.alternates')
      emails.alternates = good
    }
    value.emails = emails
  } else if (fields.emails !== undefined && fields.emails !== null) {
    ctx.dropped.push('emails')
  }

  const banners = notices(fields.notices, ctx, 'notices')
  if (banners !== undefined) value.notices = banners

  return { value, dropped: ctx.dropped }
}

/** Enough of an address to catch a typed mistake. Not a deliverability check. */
function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

/* ------------------------------------------------------- the notice window - */

/**
 * Today's date in a named timezone, as YYYY-MM-DD.
 *
 * `en-CA` formats as ISO-8601, which is the one thing it is reliably good for.
 * An unknown timezone falls back to UTC rather than throwing, because a typo in
 * a policy constant must not be able to take a page down.
 */
export function todayInTimeZone(timeZone: string, now: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(now)
  } catch {
    return now.toISOString().slice(0, 10)
  }
}

/**
 * Is this notice on today?
 *
 * Both ends are INCLUSIVE: a notice that starts today is on today, and one
 * that ends today is on for the whole of today. A notice with neither date is
 * always on — that is a banner somebody turned on and will turn off.
 */
export function noticeIsActive(notice: Notice, today: string): boolean {
  if (notice.startsOn && today < notice.startsOn) return false
  if (notice.endsOn && today > notice.endsOn) return false
  return true
}

/** The notices that should render today, in the order they were given. */
export function visibleNotices(notices: Notice[], today: string): Notice[] {
  if (!Array.isArray(notices)) return []
  return notices.filter((notice) => noticeIsActive(notice, today))
}
