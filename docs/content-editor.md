# The website editor, from this side

A camp edits the words and photographs on its page in the booking system's
website editor. This repository holds the **built-in defaults** — the copy the
developers wrote — and merges a published override onto them at request time.

**Nothing here is required.** With none of these variables set, this site
fetches nothing, renders the copy in `src/content/defaults/` and behaves
exactly as it did before the editor existed.

**Only three pages are editable in release 1** — `long-lake-outdoor-center`,
`yankee-springs-recreation-area`, `chief-noonday-outdoor-center`, plus the
site-wide `_settings`. The list lives in `src/content/slugs.ts`
(`CONVERTED_SLUGS`) and everything facing the editor derives from it. The other
five properties have defaults here but bespoke pages with the copy written into
the JSX, so an override published against them would change nothing on the live
site; they answer 404 from the defaults endpoint, so the editor never offers a
form that does nothing. Converting a page means adding its slug to that list in
the same commit.

## The four environment variables

| Name | Safe default | What it does |
| --- | --- | --- |
| `CONTENT_API_URL` | *unset* | The origin of the booking system, e.g. `https://book.example.com`. When set, `getPropertyContent(slug)` / `getSiteSettings()` fetch `<CONTENT_API_URL>/api/site-content/<slug>` (site settings use the reserved slug `_settings`) and merge the published override onto the defaults. Unset means no fetch at all. |
| `CONTENT_OVERRIDES` | *unset* (on) | Set to `off` to ignore every override and render the built-in defaults. The kill switch: it takes one environment change and a redeploy-free restart to put the site back to the developers' copy if an edit goes wrong. Any other value, or unset, leaves overrides on. |
| `CONTENT_IMAGE_HOSTS` | *unset* (empty) | Comma-separated hostnames a published photograph may be served from, e.g. `uploads.example.com,cdn.example.com`. A listed host also covers its subdomains. **Empty means every image override is ignored** and the photographs in this repository are the ones that render. The same list is turned into a `next.config.js` `images.remotePatterns` entry, so the validator and the image optimiser can never disagree. |
| `SITE_REVALIDATE_SECRET` | *unset* (closed) | The shared secret the booking system signs its publish webhook with — the **same value** as `SITE_REVALIDATE_SECRET` there. `POST /api/revalidate` verifies an HMAC-SHA256 of the raw request body against it. **Unset refuses every request**, which costs at most one revalidation interval of staleness; it never opens the endpoint. |

## What this site exposes

* `POST /api/revalidate` — the publish webhook. Signature in the
  `x-site-revalidate-signature` header as `sha256=<hex>`, over the exact bytes
  of the body; body is `{"slug":"..."}`. Answers `{"ok":true}` or
  `{"ok":false}` and nothing else — it never echoes what it was sent.
* `GET /api/content-defaults/<slug>` — today's built-in values for the
  release-1 editable fields, so the editor can show them as placeholders. Point
  the booking system's `SITE_DEFAULTS_URL` at
  `https://baserves.com/api/content-defaults`; it appends `/<slug>` itself.
  `_settings` is a valid slug here. Public, cached for an hour, and no
  environment or internal state is in the response.

## When the editor cannot be reached

A failed read does **not** fall back to the built-in defaults if this instance
has ever had a good answer for that slug — it serves the last one it received.
Next's data cache only stores 200s, so the naive behaviour would silently
un-publish every edit a camp has made for the length of an outage, live closure
notices included, on a page that looks perfectly fine. Serving yesterday's
published words is always better than replacing them with the developers'. The
memory is per instance and empties on a deploy; an instance that never got a
good answer renders the defaults. The timeout is enforced with a race rather
than only an `AbortController`, because Next strips the signal from a
background revalidation and a hung API would otherwise hold a page
regeneration open indefinitely.

## How fresh a published edit is

Each fetched override is filed under the cache tag `content:<slug>` and
revalidates every **300 seconds** (`CONTENT_POLICY.revalidateSeconds`). A
publish calls the webhook, the tag is dropped, and the change is visible within
seconds. If the webhook never arrives — wrong URL, wrong secret, a network that
ate it — the interval picks the change up within five minutes anyway. The pages
that read the content layer carry `export const revalidate = 300` for the same
reason: a page frozen at build time is a page the editor cannot reach.

## What an override may contain

`src/content/overrides.ts` is the whole answer, and it is deliberately a second
copy of a rule the editor already enforces. Only the release-1 fields
(`tagline`, `summary`, `hero`, `gallery`, `paragraphs`, `features`, `stats`,
`season`, `notices`, `ctas`; and for `_settings`, `phone`, `phoneDisplay`,
`phoneE164`, `address`, `emails`, `notices`) survive. Plain text only — no
angle brackets, no control characters, every length and list capped. Button
URLs must be `https://` or a path on this site; image URLs must be `https://`
**and** on `CONTENT_IMAGE_HOSTS`. Unknown keys, `__proto__` and `constructor`
are dropped. A field that fails a rule is dropped, and a dropped field renders
the built-in default.

## Tests

```
npm test
```

Node's own test runner over the pure functions (`resolve`, the validator, the
HMAC verification, the notice window). No test framework, no new dependency.
