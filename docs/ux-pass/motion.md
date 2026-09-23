# Long Lake (Lakeside template): motion and interactions

Branch `ux-motion`, built on `ux-pass-brand` (184fc78). Scope: `src/components/property/lakeside/*`
and `src/app/long-lake-outdoor-center/page.tsx`. The only change outside that scope is a
`data-chat-dock` attribute on the Treeko root in `src/components/TreekoChat.tsx`. It does nothing
unless the Lakeside phone bar is showing.

Sources: `~/Downloads/site-finish-manual/README.md` §1 (calm motion) and the Garden Guys GSAP runtime
(`MotionRuntime.tsx`, `PageMotion.tsx`), ported and toned down. `gsap ^3.15.0` (ScrollTrigger and
SplitText from the same package). No Lenis and no scroll hijacking.

## Files

| File | Role |
|---|---|
| `LakesideMotion.tsx` | All GSAP work (client, renders nothing). Looks for the markers below inside `[data-lakeside]`. |
| `LakesideShell.tsx` | Adds `data-lakeside`, the pre-paint script, `lakeside.css` and `<LakesideMotion/>`. |
| `lakeside.css` | Pre-paint and failsafe rules, hover zoom and arrow nudge, sticky bar, Treeko lift, lightbox. |
| `SmoothDetails.tsx` | `<details>` whose body animates height (WAAPI). |
| `Gallery.tsx` | Thumbnails link to the image and open the lightbox. |
| `StickyBooking.tsx` | Desktop pill and phone bottom bar. |

## What moves (motion allowed)

| Element | Marker | Motion | Timing / ease |
|---|---|---|---|
| Hero photo | `[data-lk-hero-img]` (wrapper) | scale 1.06 → 1, no clip or reveal | 1.8s `expo.out` |
| Hero eyebrow, subline, phone pill, booking card | `[data-lk-hero]` | rise 20px + fade | 1.0s `power3.out`, 0.08s stagger, 0.15s delay |
| Hero H1 | `[data-lk-hero-title]` | SplitText lines rise 24px + fade, then split reverted | 1.1s `power3.out`, 0.08s per line |
| Section headers, intro label and lead, prose columns, heritage text, closing words | `[data-reveal="up"]` | fade up 20px once | 1.0s `power3.out`, start `top 90%` |
| Mosaic large photo, Lodge and Weddings photos | `[data-reveal="fade"]` | fade up 20px once | same |
| Card rows (lodging, events) | `[data-reveal="card"]` | ScrollTrigger.batch fade up 24px | 0.9s `power3.out`, 0.08s stagger, max 4 per batch |
| Card, mosaic-small and gallery photos | `[data-reveal="wipe"]` | `clip-path: inset(100% 0 0 0 round 6px)` → `inset(0 round 6px)` | 1.2s `expo.out` (+0.08s inside a card) |
| Facts "16" and "4" | `[data-count]` | count up from 0; ends on the original string | 1.4s `power2.out` |
| Heritage photo, closing photo | `[data-parallax]` | scrubbed yPercent −6 → +6 (photo has 8% spare above and below) | `scrub: 0.6`, `ease: none` |

Only values that are all digits count up. "About 120", "Seats 120" and "146 acres" are left as written.
Count boxes have a fixed `ch` min-width and tabular numbers, so neighbours never move.

Rules kept from manual §1: nothing clips the hero photo, the booking card lost its `backdrop-blur`
(it was over a scaling photo), no infinite animations, no CSS transition on anything GSAP animates
(hover zoom is on the `<img>` inside a wiped wrapper, and the phone hero pill sits in a wrapper div).

## Progressive enhancement

- Server HTML shows everything. Without JS nothing is ever hidden.
- `LakesideShell` renders a one-line inline script that adds `html.lk-pre` before the hero is parsed.
  The hero words then start at opacity 0, and with motion allowed the photo starts at scale 1.06,
  so there is no visible-then-hidden flash. If the runtime never arrives, a CSS failsafe animation
  shows them after 2.5s. The runtime sets inline states, then removes `lk-pre`. If the failsafe
  has already fired, the hero is left alone.
- Once armed, the root gets `.lk-armed` / `data-motion="on"`. Scroll-reveal hidden states are set
  only on elements below the fold at that moment, so nothing on screen blinks.
- Every reveal uses `clearProps`, so revealed elements end with no inline transform or opacity.
- Only transform, opacity and clip-path are animated on reveals, so reveals cause no layout shift.

## Reduced motion (`prefers-reduced-motion: reduce`)

- No transforms, parallax, scale, clip wipes, SplitText or count-ups.
- Hero words: 0.3s opacity fade. Below-the-fold headers, prose, cards and loose photos: 0.3s
  opacity fade once, linear.
- On this page only, `html:has([data-lakeside])` gets `scroll-behavior: auto`, because the site's
  global smooth scroll is itself motion. It also let jumps outrun the scroll triggers, which is
  how the sweep found text still hidden.
- Details: 200ms opacity (open) / 150ms (close), no height animation.
- Sticky bar: 200ms opacity only. Lightbox: fade only. Treeko lift: no transition.

## Interactions

- **Sticky booking** (`StickyBooking.tsx`). An IntersectionObserver shows it once the hero is fully
  above the viewport. A second observer hides it for good once the closing section is on screen
  or above it.
  - Desktop (≥768px): paper pill, top right, 16px under the measured header bottom (121px at 1440).
    It holds the name, a 44px call button and a 44px "Check availability →" button.
  - Phone: bottom bar, 56px plus `env(safe-area-inset-bottom)`, with "Check availability" (flex-1,
    44px) and a 44px call button.
  - While hidden it has `aria-hidden` and `inert`. It uses the page's hero booking URL and phone.
  - While the phone bar shows, `body.lk-bar-on` raises `[data-chat-dock]` (Treeko) by 56px plus the
    safe area. This uses `bottom`, not transform, so Treeko's own fixed overlays still position correctly.
  - Note: manual §6 records John's general preference for no full-width phone bottom bar (Bell).
    This bar was specifically requested for this brief. Flag it if he objects.
- **Photo cards** (CardRow, Mosaic, Gallery). On a fine pointer only, the image zooms to 1.04 over
  1.1s inside its rounded mask on hover or focus-within. The "Learn more" / "Download PDF" arrows
  nudge 4px.
- **Pills.** Colour change, soft shadow, and a 2px lift on a hover-capable pointer with motion
  allowed, over 200ms. The focus-visible outline is unchanged. Pills are 56px tall; links and
  buttons are 44px or more.
- **Gallery lightbox** (`Gallery.tsx`).
  - Thumbnails are `<a href=image>`, so without JS they open the image. With JS a click opens the
    viewer; modified clicks still open a new tab.
  - The viewer is `role=dialog` with `aria-modal`. Focus moves to Close and Tab is trapped. Esc
    closes; ←/→ change photo; on touch, swipe left/right changes photo and swipe down closes.
  - It shows a counter ("3 / 12") and a caption from the photo's alt text. Scroll is locked, with
    scrollbar-gap compensation. On close, focus returns to the thumbnail.
  - The large view is `next/image` with `fill`, `object-contain` and
    `sizes="(min-width: 768px) calc(100vw - 192px), 100vw"`.
- **Concession management** (`SmoothDetails`). Native `<details>` (it still works without JS).
  With JS, the summary click animates the body height (320–700ms, `cubic-bezier(.16,1,.3,1)`) and
  then sets or clears `open`. Nested items work the same way.

## Measurements (local `next start -p 4631`, Sep 24 2026)

| Probe | Result |
|---|---|
| `jank-probe` (3 runs) | CLS 0.000 / 0.000 / 0.000; slow frames 1 / 0 / 0; loafMax 55 / 0 / 0 ms; stuck 0 |
| `jank-probe` (first build, before the reduced-motion scroll fix) | CLS 0.001, loafMax 77 ms, stuck 0 |
| `motion-probe` | 0 conflicts |
| Playwright, reduced motion, desktop 1440 and phone 390 (sweep-style scroll, then back to top) | 0 hidden text elements in any section; 0 transformed reveal elements; facts read "16", "4" |
| Playwright, no JS | 0 hidden; H1 and facts intact |
| Playwright, motion on, desktop | hero photo mid-settle at 250ms (scale 1.028); bar hidden at top, shown at 1400px, hidden at the closing section; lightbox opens on thumbnail 3 ("3 / 12", caption = alt, focus on Close, scroll locked), → gives "4 / 12", Tab stays inside, Esc closes and focus returns to "View photo 3 of 12…", scroll unlocked; details open (402→441px mid-animation) and close |
| Playwright, motion on, phone 390 | bar shown after scroll: 57px tall, 314×44 and 44×44 targets; Treeko bottom 780 above the bar top 787 (no overlap) |

### UX sweep (`--quick --no-build`, out `/tmp/ll-motion-sweep`)

| page | A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|---|
| `/long-lake-outdoor-center` | 100 | 100 | 100 | 0 | 100 | 57 | 90 | – | 100 | 100 |
| `/` | 60 | 100 | 100 | 0 | 100 | 44 | 90 | – | 100 | 100 |

"Content still hidden with Reduce Motion on (F.04)": `/` 7, `/long-lake-outdoor-center` 5.
A re-run of the same filter lists every flagged Long Lake node, and none is Lakeside content.
They are site-wide chrome that is closed by design:
- the phone menu drawer (`fixed inset-0 … transition-opacity`, opacity 0 while closed)
- two desktop mega-menu panels (Locations/Services)
- the footer map's "Use ⌘ + scroll to zoom the map" hint

The home page shows the same nodes. Zero Lakeside elements are hidden (confirmed by the Playwright
check above). D (style inventory) and the F axe items (kbd contrast, nested-interactive in a
max-h-0 accordion, landmark-unique nav, footer heading order, footer redundant alt) are also
site-wide. This brief did not touch them.
