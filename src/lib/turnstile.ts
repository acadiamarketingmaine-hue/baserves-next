/**
 * Cloudflare Turnstile widget "BA Services" (account widget for baserves.com,
 * www.baserves.com and escape.baserves.com, created Nov 26 2026). A site key
 * is public by design; the matching secret is the TURNSTILE_SECRET_KEY Fly
 * secret on baserves-next and is never in the repo.
 *
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY overrides it (local runs use Cloudflare's
 * always-pass test key 1x00000000000000000000AA, since the real key only
 * works on the listed domains).
 */
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAAGTrobVabEsZUQlM'
