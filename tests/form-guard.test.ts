/**
 * Bot protection for /careers and /contact (src/lib/form-guard.ts), the
 * Monongahela routing fix, and the FareHarbor link list. Pure modules only.
 */
import test from 'node:test'
import assert from 'node:assert/strict'
import { CAREERS_POLICY, CONTACT_POLICY, clientIp, guardSubmission, resetRateLimits, verifyTurnstile } from '../src/lib/form-guard.ts'
import { RECREATION_SITES, CAMPGROUND_SITES, recipientsForSite } from '../src/data/managers.ts'
import { FAREHARBOR } from '../src/data/fareharbor.ts'

const headers = (h: Record<string, string>) => ({ get: (n: string) => h[n.toLowerCase()] ?? null })
const okFetch = (success: boolean) => async () => ({ ok: true, json: async () => ({ success }) })

test('the honeypot drops quietly and sends nothing', async () => {
  resetRateLimits()
  const r = await guardSubmission(CONTACT_POLICY, { website: 'http://spam', elapsedMs: 60000 }, '1.1.1.1')
  assert.equal(r.action, 'drop')
})

test('a form posted faster than a person could fill it is dropped', async () => {
  resetRateLimits()
  assert.equal((await guardSubmission(CAREERS_POLICY, { elapsedMs: 900 }, '1.1.1.2')).action, 'drop')
  assert.equal((await guardSubmission(CAREERS_POLICY, { elapsedMs: 120000 }, '1.1.1.2')).action, 'send')
})

test('a page loaded before the check shipped (no timing) is not silently dropped', async () => {
  resetRateLimits()
  assert.equal((await guardSubmission(CAREERS_POLICY, {}, '1.1.1.3')).action, 'send')
})

test('careers allows three an hour from one connection, then 429', async () => {
  resetRateLimits()
  for (let i = 0; i < 3; i++) assert.equal((await guardSubmission(CAREERS_POLICY, { elapsedMs: 60000 }, '2.2.2.2')).action, 'send')
  const fourth = await guardSubmission(CAREERS_POLICY, { elapsedMs: 60000 }, '2.2.2.2')
  assert.equal(fourth.action, 'reject')
  assert.equal(fourth.action === 'reject' && fourth.status, 429)
  assert.equal((await guardSubmission(CAREERS_POLICY, { elapsedMs: 60000 }, '2.2.2.3')).action, 'send')
})

test('with a Turnstile secret, a missing or failed token is refused and a good one passes', async () => {
  resetRateLimits()
  const base = { elapsedMs: 60000 }
  const missing = await guardSubmission(CONTACT_POLICY, base, '3.3.3.1', { secret: 's', fetchImpl: okFetch(true) })
  assert.equal(missing.action === 'reject' && missing.status, 400)
  const bad = await guardSubmission(CONTACT_POLICY, { ...base, turnstileToken: 'x'.repeat(40) }, '3.3.3.2', { secret: 's', fetchImpl: okFetch(false) })
  assert.equal(bad.action, 'reject')
  const good = await guardSubmission(CONTACT_POLICY, { ...base, turnstileToken: 'x'.repeat(40) }, '3.3.3.3', { secret: 's', fetchImpl: okFetch(true) })
  assert.equal(good.action, 'send')
})

test('if Cloudflare cannot be reached the submission still goes through', async () => {
  const down = async () => { throw new Error('network') }
  assert.equal(await verifyTurnstile('x'.repeat(40), '4.4.4.4', 's', down as any), 'unreachable')
  resetRateLimits()
  const r = await guardSubmission(CONTACT_POLICY, { elapsedMs: 60000, turnstileToken: 'x'.repeat(40) }, '4.4.4.4', { secret: 's', fetchImpl: down as any })
  assert.equal(r.action, 'send')
})

test('without a secret Turnstile is skipped, so a release without the key cannot block forms', async () => {
  assert.equal(await verifyTurnstile(undefined, '5.5.5.5', undefined), 'skipped')
})

test('the client address comes from Fly, never from the caller-written first x-forwarded-for entry', () => {
  assert.equal(clientIp(headers({ 'fly-client-ip': '9.9.9.9', 'x-forwarded-for': '1.2.3.4' })), '9.9.9.9')
  assert.equal(clientIp(headers({ 'x-forwarded-for': '1.2.3.4, 8.8.8.8' })), '8.8.8.8')
})

test('nothing routes to the dead SenecaShadowsCG@gmail.com address any more', () => {
  const all = [...RECREATION_SITES, ...CAMPGROUND_SITES].flatMap(s => [s.manager, ...(s.alsoNotify || [])])
  assert.ok(all.every(m => !/senecashadowscg/i.test(m.email)))
  const mon = RECREATION_SITES.find(s => s.label.startsWith('Monongahela'))!
  assert.equal(mon.manager.email.toLowerCase(), 'officemanager@baserves.com')
  const fb = recipientsForSite(CAMPGROUND_SITES.find(s => s.label.startsWith('Monongahela'))!.label).map(m => m.email.toLowerCase())
  assert.deepEqual(fb.sort(), ['andrew@baserves.com', 'officemanager@baserves.com'])
})

test('every FareHarbor link is BA\'s own https booking flow', () => {
  for (const [shortname, links] of Object.entries(FAREHARBOR)) {
    for (const [k, url] of Object.entries(links)) {
      if (k === 'site') continue
      assert.match(url, new RegExp(`^https://fareharbor\\.com/embeds/book/${shortname}/`), `${shortname}.${k}`)
      assert.doesNotMatch(url, /ref=/)
    }
  }
})
