/**
 * Proving that a revalidation request came from the website editor.
 *
 * The editor signs the EXACT BYTES it sends with HMAC-SHA256 and puts the
 * result in a header as `sha256=<hex>` (booking-system `lib/site-revalidate.ts`).
 * This is the other half of that. It verifies the raw body as it was read off
 * the wire, never a re-serialised object: `JSON.parse` followed by
 * `JSON.stringify` can reorder keys and change spacing, and an honest request
 * that has been round-tripped would fail to verify.
 *
 * PURE, and imports nothing but `node:crypto`, so the test runner can load it
 * on its own.
 */

import { createHmac, timingSafeEqual } from 'crypto'

/** The header the signature travels in. Named by the sender; do not rename. */
export const SIGNATURE_HEADER = 'x-site-revalidate-signature'

/** The signature for a body, as `sha256=<hex>`. */
export function signRevalidateBody(secret: string, body: string): string {
  return `sha256=${createHmac('sha256', secret).update(body, 'utf8').digest('hex')}`
}

/**
 * Does this signature match this body?
 *
 * Constant time, so a wrong signature does not leak how much of it was right.
 * An unset or empty secret is FALSE, never true: a deployment that forgot to
 * configure the secret must reject every request rather than accept every one.
 */
export function verifyRevalidateSignature(
  secret: string | undefined,
  body: string,
  signature: string | null | undefined,
): boolean {
  if (!secret) return false
  if (typeof signature !== 'string' || signature === '') return false
  const expected = Buffer.from(signRevalidateBody(secret, body))
  const given = Buffer.from(signature)
  // Length is not a secret — the signature is a fixed-width hex string — and
  // timingSafeEqual throws on a length mismatch, so this has to come first.
  if (expected.length !== given.length) return false
  return timingSafeEqual(expected, given)
}

/** The only slugs this site will act on: the URL slugs and `_settings`. */
const SLUG = /^[a-z0-9_-]+$/

export function isValidSlug(value: unknown): value is string {
  return typeof value === 'string' && value.length <= 128 && SLUG.test(value)
}
