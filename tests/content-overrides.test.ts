/**
 * The pure parts of the content layer, tested without a server or a network.
 *
 * Run with `npm test`. No test framework and no new dependency: node's own
 * runner, and node's own TypeScript stripping, which is why every module under
 * test imports nothing but types and `node:crypto`. The imports carry an
 * explicit `.ts` extension because that is what node's resolver wants; this
 * directory is excluded from tsconfig for the same reason.
 */

import test from 'node:test'
import assert from 'node:assert/strict'

import { resolve } from '../src/content/resolve.ts'
import {
  CONTENT_POLICY,
  isAllowedImageHost,
  imageHostAllowList,
  noticeIsActive,
  sanitisePropertyOverride,
  sanitiseSettingsOverride,
  todayInTimeZone,
  visibleNotices,
} from '../src/content/overrides.ts'
import {
  isValidSlug,
  signRevalidateBody,
  verifyRevalidateSignature,
} from '../src/content/signature.ts'
import {
  CONVERTED_SLUGS,
  SLUG_TEMPLATE_SLUGS,
  SITE_SETTINGS_SLUG,
  isEditableSlug,
} from '../src/content/slugs.ts'
import { loadOverrideWith, type FailureKind, type Sanitised } from '../src/content/fetch-override.ts'

/* ----------------------------------------------------------------- resolve */

test('resolve: a missing or blank override renders the default', () => {
  assert.equal(resolve(undefined, 'built-in'), 'built-in')
  assert.equal(resolve(null, 'built-in'), 'built-in')
  assert.equal(resolve('', 'built-in'), 'built-in')
  assert.equal(resolve('   ', 'built-in'), 'built-in')
  assert.equal(resolve('published', 'built-in'), 'published')
})

test('resolve: an empty array is a default, a full one replaces whole', () => {
  assert.deepEqual(resolve([], ['a', 'b']), ['a', 'b'])
  assert.deepEqual(resolve(['x'], ['a', 'b']), ['x'])
})

test('resolve: objects merge key by key and leave untouched keys alone', () => {
  const fallback = { a: 1, b: { c: 'keep', d: 'change' } }
  assert.deepEqual(resolve({ b: { d: 'changed' } }, fallback), {
    a: 1,
    b: { c: 'keep', d: 'changed' },
  })
})

test('resolve: booleans and numbers from the override win', () => {
  assert.equal(resolve(false, true), false)
  assert.equal(resolve(0, 12), 0)
})

/* --------------------------------------------------------------- validator */

const HOSTS = { imageHosts: ['images.example.com'] }

test('validator: keeps the release-1 fields it understands', () => {
  const { value, dropped } = sanitisePropertyOverride({
    tagline: 'A quiet lake',
    summary: 'Cabins and canoes.',
    features: ['Fire rings', 'Hot showers'],
  })
  assert.deepEqual(value, {
    tagline: 'A quiet lake',
    summary: 'Cabins and canoes.',
    features: ['Fire rings', 'Hot showers'],
  })
  assert.deepEqual(dropped, [])
})

test('validator: drops fields that are not editable in release 1', () => {
  const { value, dropped } = sanitisePropertyOverride({
    slug: 'somewhere-else',
    seo: { title: 'Injected' },
    sections: { about: {} },
    name: 'Renamed',
    tagline: 'Kept',
  })
  assert.deepEqual(value, { tagline: 'Kept' })
  assert.deepEqual(dropped.sort(), ['name', 'sections', 'seo', 'slug'])
})

test('validator: refuses markup and control characters', () => {
  const withTag = sanitisePropertyOverride({ tagline: 'Book <script>alert(1)</script>' })
  assert.deepEqual(withTag.value, {})
  assert.deepEqual(withTag.dropped, ['tagline'])

  const withControl = sanitisePropertyOverride({ tagline: 'Book\u0007 now' })
  assert.deepEqual(withControl.value, {})

  // A newline is a real character in a real paragraph.
  const withNewline = sanitisePropertyOverride({ paragraphs: ['One line.\nAnother line.'] })
  assert.deepEqual(withNewline.value, { paragraphs: ['One line.\nAnother line.'] })
})

test('validator: caps lengths and list sizes', () => {
  const long = 'x'.repeat(CONTENT_POLICY.text.tagline + 1)
  assert.deepEqual(sanitisePropertyOverride({ tagline: long }).value, {})

  const many = Array.from({ length: CONTENT_POLICY.maxParagraphs + 5 }, (_, i) => `Para ${i}`)
  const capped = sanitisePropertyOverride({ paragraphs: many })
  assert.equal((capped.value.paragraphs as string[]).length, CONTENT_POLICY.maxParagraphs)
})

test('validator: a blank string survives, because blank means "use the default"', () => {
  const { value } = sanitisePropertyOverride({ tagline: '' })
  assert.deepEqual(value, { tagline: '' })
  assert.equal(resolve(value.tagline, 'built-in tagline'), 'built-in tagline')
})

test('validator: __proto__ and constructor never reach an object key', () => {
  const nasty = JSON.parse('{"__proto__":{"polluted":true},"tagline":"Fine"}')
  const { value } = sanitisePropertyOverride(nasty)
  assert.deepEqual(value, { tagline: 'Fine' })
  assert.equal(({} as Record<string, unknown>).polluted, undefined)

  const slots = JSON.parse(
    '{"ctas":{"__proto__":{"label":"x","url":"https://a.example.com","kind":"external"}}}',
  )
  const cleaned = sanitisePropertyOverride(slots)
  assert.deepEqual(cleaned.value.ctas, {})
  assert.equal(Object.getPrototypeOf(cleaned.value.ctas as object), Object.prototype)
})

test('validator: CTA urls must be https or a path on this site, and agree with kind', () => {
  const good = sanitisePropertyOverride({
    ctas: {
      hero: { label: 'Book now', url: 'https://book.example.com/lake', kind: 'booking' },
      side: { label: 'Contact', url: '/contact', kind: 'internal' },
    },
  })
  assert.deepEqual(Object.keys(good.value.ctas as object).sort(), ['hero', 'side'])

  for (const url of ['javascript:alert(1)', 'http://plain.example.com', '//evil.example.com', 'data:text/html,x']) {
    const bad = sanitisePropertyOverride({ ctas: { hero: { label: 'Go', url, kind: 'external' } } })
    assert.deepEqual(bad.value.ctas, {}, url)
  }

  // A button that says it leaves the site but points at a path, or the reverse.
  const mismatched = sanitisePropertyOverride({
    ctas: { hero: { label: 'Go', url: '/somewhere', kind: 'external' } },
  })
  assert.deepEqual(mismatched.value.ctas, {})
})

test('validator: a backslash never makes a URL look internal', () => {
  // `/\evil.com` passes a naive "starts with / but not //" check, and then
  // every browser reads it as `//evil.com`.
  for (const url of ['/\\evil.com', '/\\/evil.com', '/\\\\evil.com', '/ok\\path', '/\tx']) {
    const bad = sanitisePropertyOverride({
      ctas: { hero: { label: 'Go', url, kind: 'internal' } },
    })
    assert.deepEqual(bad.value.ctas, {}, url)
  }
  // Real paths on this site still work, including the home page.
  for (const url of ['/', '/contact', '/experiences/meramec-state-park?a=1#b']) {
    const good = sanitisePropertyOverride({
      ctas: { hero: { label: 'Go', url, kind: 'internal' } },
    })
    assert.deepEqual(Object.keys(good.value.ctas as object), ['hero'], url)
  }
  // And a backslash is refused in an image source too.
  const photo = sanitisePropertyOverride(
    { hero: { src: 'https://images.example.com/a\\b.jpg', alt: 'x' } },
    HOSTS,
  )
  assert.deepEqual(photo.value, {})
})

test('validator: invisible characters are refused as well as control ones', () => {
  for (const sneaky of ['Book\u200Bnow', 'Book\u202Enow', 'Book\u2066now', '\uFEFFBook now']) {
    assert.deepEqual(sanitisePropertyOverride({ tagline: sneaky }).value, {}, JSON.stringify(sneaky))
  }
  // A normal sentence with punctuation and accents is untouched.
  const fine = 'Réservez — cabins, canoes & campfires.'
  assert.deepEqual(sanitisePropertyOverride({ tagline: fine }).value, { tagline: fine })
})

test('validator: images need https AND an allow-listed host', () => {
  const photo = { src: 'https://images.example.com/hero.jpg', alt: 'The lake at dawn' }

  // Nothing configured: every image override is ignored.
  assert.deepEqual(sanitisePropertyOverride({ hero: photo }).value, {})

  const allowed = sanitisePropertyOverride({ hero: photo }, HOSTS)
  assert.deepEqual(allowed.value.hero, photo)

  const elsewhere = sanitisePropertyOverride(
    { hero: { src: 'https://elsewhere.example.net/hero.jpg', alt: 'x' } },
    HOSTS,
  )
  assert.deepEqual(elsewhere.value, {})

  // Alt text is not optional.
  const noAlt = sanitisePropertyOverride({ hero: { src: photo.src } }, HOSTS)
  assert.deepEqual(noAlt.value, {})
})

test("validator: one of the site's own photographs needs no allow-list", () => {
  // The editor lets a camp pick a photograph this repository already ships.
  // Refusing it here would be a save that succeeds and changes nothing.
  const own = { src: '/images/long-lake/lodge.jpg', alt: 'The lodge' }
  assert.deepEqual(sanitisePropertyOverride({ hero: own }).value.hero, own)
  assert.deepEqual(sanitisePropertyOverride({ hero: own }, HOSTS).value.hero, own)

  // But only that folder, and no climbing out of it.
  for (const src of [
    '/etc/passwd',
    '/images',
    '/images/',
    '/images/../../secret.jpg',
    '/images/%2e%2e/secret.jpg',
    '/Images/lodge.jpg',
    '//images.example.com/lodge.jpg',
    '/\\images/lodge.jpg',
  ]) {
    assert.deepEqual(sanitisePropertyOverride({ hero: { src, alt: 'x' } }, HOSTS).value, {}, src)
  }
})

test('validator: the image host list reads the environment and covers subdomains', () => {
  assert.deepEqual(imageHostAllowList({}), [])
  assert.deepEqual(imageHostAllowList({ CONTENT_IMAGE_HOSTS: ' A.com , b.com ' }), ['a.com', 'b.com'])
  assert.equal(isAllowedImageHost('cdn.a.com', ['a.com']), true)
  assert.equal(isAllowedImageHost('a.com', ['a.com']), true)
  assert.equal(isAllowedImageHost('nota.com', ['a.com']), false)
  assert.equal(isAllowedImageHost('a.com', []), false)
})

test('validator: notices need a real severity and real dates', () => {
  const ok = sanitisePropertyOverride({
    notices: [{ id: 'n1', message: 'Road closed', severity: 'closure', startsOn: '2026-10-01', endsOn: '2026-10-05' }],
  })
  assert.equal((ok.value.notices as unknown[]).length, 1)

  assert.deepEqual(
    sanitisePropertyOverride({ notices: [{ message: 'x', severity: 'panic' }] }).value.notices,
    [],
  )
  assert.deepEqual(
    sanitisePropertyOverride({ notices: [{ message: 'x', severity: 'info', endsOn: '2026-02-31' }] })
      .value.notices,
    [],
  )
  // A banner may not carry a link the developers did not choose.
  const withLink = sanitisePropertyOverride({
    notices: [{ message: 'x', severity: 'info', href: 'https://evil.example.com', linkLabel: 'Click' }],
  })
  assert.deepEqual(withLink.value.notices, [{ id: 'notice-0', message: 'x', severity: 'info' }])
})

test('validator: settings keep their own field list and check e-mail addresses', () => {
  const { value, dropped } = sanitiseSettingsOverride({
    phoneDisplay: '+1 207 307-7903',
    emails: { primary: 'hello@example.com', alternates: ['nope'] },
    legalName: 'Something Else LLC',
  })
  assert.equal(value.phoneDisplay, '+1 207 307-7903')
  assert.deepEqual(value.emails, { primary: 'hello@example.com', alternates: [] })
  assert.ok(dropped.includes('legalName'))
})

test('validator: a body that is not an object yields no override at all', () => {
  assert.deepEqual(sanitisePropertyOverride('nope').value, {})
  assert.deepEqual(sanitisePropertyOverride(['a']).value, {})
  assert.deepEqual(sanitisePropertyOverride(null).value, {})
})

/* ------------------------------------------------------------ notice window */

const NOTICE = { id: 'n', message: 'Closed for the season', severity: 'closure' } as const

test('notice window: both ends are inclusive', () => {
  const dated = { ...NOTICE, startsOn: '2026-10-01', endsOn: '2026-10-05' }
  assert.equal(noticeIsActive(dated, '2026-09-30'), false)
  assert.equal(noticeIsActive(dated, '2026-10-01'), true)
  assert.equal(noticeIsActive(dated, '2026-10-05'), true)
  assert.equal(noticeIsActive(dated, '2026-10-06'), false)
})

test('notice window: an open-ended notice is on, one end at a time', () => {
  assert.equal(noticeIsActive(NOTICE, '2026-10-01'), true)
  assert.equal(noticeIsActive({ ...NOTICE, startsOn: '2026-11-01' }, '2026-10-01'), false)
  assert.equal(noticeIsActive({ ...NOTICE, endsOn: '2026-09-01' }, '2026-10-01'), false)
})

test('notice window: visibleNotices filters and survives a non-array', () => {
  const notices = [
    { ...NOTICE, id: 'past', endsOn: '2026-01-01' },
    { ...NOTICE, id: 'now' },
  ]
  assert.deepEqual(
    visibleNotices(notices, '2026-10-01').map((n) => n.id),
    ['now'],
  )
  assert.deepEqual(visibleNotices(undefined as never, '2026-10-01'), [])
})

test('notice window: dates are read in the property timezone, not UTC', () => {
  // 03:30 UTC on the 2nd is still 23:30 on the 1st in Detroit, so a notice
  // that ended on the 1st is still on.
  const instant = new Date('2026-10-02T03:30:00Z')
  assert.equal(todayInTimeZone('America/Detroit', instant), '2026-10-01')
  assert.equal(todayInTimeZone('UTC', instant), '2026-10-02')
  assert.equal(
    noticeIsActive({ ...NOTICE, endsOn: '2026-10-01' }, todayInTimeZone(CONTENT_POLICY.timezone, instant)),
    true,
  )
  // A nonsense timezone falls back rather than throwing a page down.
  assert.equal(todayInTimeZone('Not/AZone', instant), '2026-10-02')
})

/* ------------------------------------------------------------------- HMAC */

const SECRET = 'a-shared-secret'
const BODY = JSON.stringify({ slug: 'long-lake-outdoor-center' })

test('hmac: a signature made by the sender verifies here', () => {
  const signature = signRevalidateBody(SECRET, BODY)
  assert.match(signature, /^sha256=[0-9a-f]{64}$/)
  assert.equal(verifyRevalidateSignature(SECRET, BODY, signature), true)
})

test('hmac: the exact bytes matter', () => {
  const signature = signRevalidateBody(SECRET, BODY)
  // The same object, re-serialised with different spacing, is different bytes.
  assert.equal(
    verifyRevalidateSignature(SECRET, JSON.stringify(JSON.parse(BODY), null, 2), signature),
    false,
  )
  assert.equal(verifyRevalidateSignature(SECRET, BODY + ' ', signature), false)
})

test('hmac: a wrong secret, a wrong signature and no secret all fail', () => {
  const signature = signRevalidateBody(SECRET, BODY)
  assert.equal(verifyRevalidateSignature('other-secret', BODY, signature), false)
  assert.equal(verifyRevalidateSignature(SECRET, BODY, 'sha256=' + '0'.repeat(64)), false)
  assert.equal(verifyRevalidateSignature(SECRET, BODY, 'nonsense'), false)
  assert.equal(verifyRevalidateSignature(SECRET, BODY, null), false)
  assert.equal(verifyRevalidateSignature(SECRET, BODY, ''), false)
  // Fail closed: an unset secret accepts nothing, including an empty signature.
  assert.equal(verifyRevalidateSignature(undefined, BODY, signature), false)
  assert.equal(verifyRevalidateSignature('', BODY, signature), false)
})

test('slug pattern: only lower-case, digits, dash and underscore', () => {
  assert.equal(isValidSlug('long-lake-outdoor-center'), true)
  assert.equal(isValidSlug('_settings'), true)
  assert.equal(isValidSlug('../../etc/passwd'), false)
  assert.equal(isValidSlug('Upper-Case'), false)
  assert.equal(isValidSlug('with space'), false)
  assert.equal(isValidSlug(''), false)
  assert.equal(isValidSlug(42), false)
})

/* ------------------------------------------------ which pages are editable */

test('editable slugs: only the pages that actually read the content layer', () => {
  // Every page whose copy now comes from src/content/defaults, so an edit
  // reaches the live page. Adding a slug here without converting its page is
  // the failure this list exists to prevent: the camp types into a box and
  // their own page does not change.
  for (const converted of [
    'long-lake-outdoor-center',
    'yankee-springs-recreation-area',
    'chief-noonday-outdoor-center',
    'bankhead-national-forest',
    'washington-state-park',
    'meramec-state-park',
    'tipsaw-lake-recreation-area',
    'hardin-ridge-recreation-area',
    'indian-celina-lakes-recreation-area',
    'hoosier-national-forest',
    'monongahela-national-forest',
    'big-bend-campground',
    'jess-judy-group-campground',
    'seneca-shadows-campground',
    'spruce-knob-lake-campground',
    'gatewood-group-campground',
    'stuart-recreation-area',
  ]) {
    assert.equal(isEditableSlug(converted), true, converted)
    assert.equal(CONVERTED_SLUGS.includes(converted), true, converted)
  }
  assert.equal(isEditableSlug(SITE_SETTINGS_SLUG), true)

  assert.equal(isEditableSlug('not-a-page-at-all'), false)
  assert.equal(CONVERTED_SLUGS.includes('not-a-page-at-all'), false)
  assert.equal(CONVERTED_SLUGS.length, 17)
})

test('the [slug] template answers only for the slugs whose page it is', () => {
  // Every other converted slug has a page of its own, at /<slug> or somewhere
  // else entirely, and /<slug> must not start answering for it. See the
  // comment on SLUG_TEMPLATE_SLUGS.
  assert.deepEqual([...SLUG_TEMPLATE_SLUGS], ['chief-noonday-outdoor-center'])
  for (const slug of SLUG_TEMPLATE_SLUGS) {
    assert.equal(CONVERTED_SLUGS.includes(slug), true, slug)
  }
})

/* ------------------------------------------- fetching, and the last good one */

/** The editor's response envelope. */
function answer(override: unknown, status = 200): Response {
  return new Response(JSON.stringify({ slug: 's', override, publishedAt: null, version: null }), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

function harness(fetchImpl: typeof fetch, lastGood = new Map<string, Record<string, unknown>>()) {
  const reports: FailureKind[] = []
  return {
    lastGood,
    reports,
    load: (slug = 'long-lake-outdoor-center') =>
      loadOverrideWith({
        slug,
        url: 'https://editor.invalid/api/site-content/' + slug,
        timeoutMs: 50,
        sanitise: (input): Sanitised => sanitisePropertyOverride(input),
        fetchImpl,
        report: (kind) => reports.push(kind),
        lastGood,
      }),
  }
}

test('fetch: a good answer is returned and remembered', async () => {
  const h = harness(async () => answer({ tagline: 'Published words' }))
  assert.deepEqual(await h.load(), { tagline: 'Published words' })
  assert.deepEqual(h.lastGood.get('long-lake-outdoor-center'), { tagline: 'Published words' })
  assert.deepEqual(h.reports, [])
})

test('fetch: an editor outage keeps the last published words, not the defaults', async () => {
  const lastGood = new Map<string, Record<string, unknown>>()
  assert.deepEqual(await harness(async () => answer({ tagline: 'Published words' }), lastGood).load(), {
    tagline: 'Published words',
  })

  // Every way the editor can fail must still serve what it last told us.
  const failures: Array<[string, typeof fetch]> = [
    ['500', async () => answer({}, 500)],
    ['network', async () => { throw new TypeError('fetch failed') }],
    ['not json', async () => new Response('<html>502</html>', { status: 200 })],
    ['wrong shape', async () => new Response('[1,2,3]', { status: 200, headers: { 'content-type': 'application/json' } })],
  ]
  for (const [label, impl] of failures) {
    const h = harness(impl, lastGood)
    assert.deepEqual(await h.load(), { tagline: 'Published words' }, label)
    assert.equal(h.reports.length, 1, label)
  }
})

test('fetch: with no last good answer, a failure renders the defaults', async () => {
  const h = harness(async () => answer({}, 503))
  assert.equal(await h.load(), undefined)
  assert.deepEqual(h.reports, ['status'])
})

test('fetch: an unpublished page replaces the last good answer', async () => {
  const lastGood = new Map<string, Record<string, unknown>>()
  await harness(async () => answer({ tagline: 'Published words' }), lastGood).load()
  // A camp unpublishing is a change, not a fault: the page goes back to the
  // built-in copy rather than keeping words nobody publishes any more.
  assert.deepEqual(await harness(async () => answer({}), lastGood).load(), {})
  assert.deepEqual(lastGood.get('long-lake-outdoor-center'), {})
})

test('fetch: a hung editor cannot hold a render open past the timeout', async () => {
  const lastGood = new Map<string, Record<string, unknown>>()
  await harness(async () => answer({ tagline: 'Published words' }), lastGood).load()

  // Next strips the AbortSignal on a background revalidation, so the abort is
  // not what saves us here — the race is. This fetch ignores the signal
  // entirely, exactly like a hung connection would.
  const hangs: typeof fetch = () => new Promise<Response>(() => {})
  const h = harness(hangs, lastGood)
  const started = Date.now()
  assert.deepEqual(await h.load(), { tagline: 'Published words' })
  assert.ok(Date.now() - started < 1000, 'returned promptly')
  assert.deepEqual(h.reports, ['timeout'])
})

test('fetch: a body that never finishes arriving times out too', async () => {
  const stalled: typeof fetch = async () =>
    ({ ok: true, status: 200, json: () => new Promise<unknown>(() => {}) }) as unknown as Response
  const h = harness(stalled)
  assert.equal(await h.load(), undefined)
  assert.deepEqual(h.reports, ['json'])
})

test('fetch: what the editor sends is still validated before it is remembered', async () => {
  const h = harness(async () => answer({ tagline: '<script>x</script>', summary: 'Fine' }))
  assert.deepEqual(await h.load(), { summary: 'Fine' })
  assert.deepEqual(h.reports, ['dropped'])
})
