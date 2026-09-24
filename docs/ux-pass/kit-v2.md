# Lakeside kit v2: Reader, accents, buttons

Built on branch `feat/lakeside-kit-v2` (worktree `.claude/worktrees/kit-v2`), on top of
main `61405f5`. Reference page: `src/app/long-lake-outdoor-center/page.tsx` — the only
page on the Lakeside template, and the only page this pass touched besides the shared
kit and site-wide chrome (`layout.tsx`, `Navigation.tsx`, `globals.css`). A rollout agent
repeats the same component calls on each new property page; nothing here is
Long-Lake-specific except the actual photo choices and CTA URLs.

Companion docs: `docs/ux-pass/motion.md` (GSAP/`data-reveal`), `decisions.md`,
`finish-pass.md`, `photo-audit.md`, and `~/Downloads/site-finish-manual/README.md`.

## A. Reader ("Listen to this page")

`src/components/reader/` — six files, no new npm dependency:

| File | What it is |
|---|---|
| `chunker.ts` | Pure functions: `splitIntoSentences`, `chunkSentences(text, maxLen=180)`. |
| `voices.ts` | `pickVoice(voices)` — prefers Google US English / Aria / Jenny (Natural) / Samantha / Ava, else any `en-*`, else the first voice. |
| `extractor.ts` | `extractReadableBlocks(root)` — walks a DOM element (real or jsdom) and returns one block per heading/`p`/`li`/`figcaption`/`td`/`th`, in DOM order. |
| `engine.ts` | `ReaderEngine` — a plain class, not a hook. Owns `speechSynthesis`, chunk playback, the watchdog, highlighting. One instance for the whole app. |
| `ReaderProvider.tsx` | `<ReaderProvider>` (mount once, in `layout.tsx`) and `useReader()`. Subscribes to the engine via `useSyncExternalStore`. |
| `ReaderButton.tsx` / `ListenButton.tsx` / `ReaderPill.tsx` | The three UI pieces. All render nothing when `!supported`. |

**Wiring** (already done, nothing for a rollout agent to add):
`layout.tsx` wraps `{children}` in `<ReaderProvider>` and renders `<ReaderPill/>` once,
so every page gets the floating control for free. `Navigation.tsx` (the site's header,
used by every real page — home included, via `HomeClient`) renders `<ReaderButton/>` in
the desktop utility row and `<ReaderButton compact/>` in the mobile row. A third entry
point lives in the floating accessibility & reader-control panel (`src/components/a11y/`,
also mounted once from `layout.tsx` — see §E below): its "Reading tools" section calls
`useReader()` directly (play/pause/stop/speed), the same store as everything else here —
there is exactly one Reader engine on the page, never a second one.

**Where a page opts in:** `Hero` (Lakeside) takes a `listen?: boolean` prop, default
`true` — it renders `<ListenButton variant="light"/>` under the subline automatically.
Nothing to do per page unless you want to turn it off (`listen={false}`) or place
`<ListenButton/>` somewhere else (`variant="default"` for a paper background).

**How it works:** click starts `engine.play()`, which reads `document.querySelector('main')`,
extracts blocks, chunks each block's text to ≤180 chars, and speaks the first chunk
*synchronously* in the same tick as the click (required for iOS). Each `onend` speaks the
next chunk. A 12s watchdog re-speaks the current chunk if Chrome goes silent mid-read
(known Chrome bug). Voices: picked synchronously from whatever `getVoices()` already has;
if that's empty, a `voiceschanged` listener (1.5s timeout) upgrades the choice for the
*next* chunk — the first chunk never waits on it. The engine stops on `pathname` change
(`usePathname`), `visibilitychange`, and unmount. The block being read gets `.reader-highlight`
(spruce outline + tint, `globals.css`) and scrolls into view (`smooth` or `auto` by
`prefers-reduced-motion`).

**Skip list:** `nav`, `header`, `footer`, `button`, `form`, `input`, `select`, `textarea`,
`script`, `style`, `svg`, `iframe`; anything `hidden`, `aria-hidden="true"`, or
`[data-reader-skip]` (already on the reader's own controls and can be added to any
element — e.g. the chat assistant needs none because it renders outside `<main>`).

**Tests — what's actually verified vs. what needs an ear:**
- **Machine-verified (60 unit tests, `npm test`):** sentence splitting incl. abbreviations
  (`Dr.`, `St.`, `approx.`) and decimals (`146.5 acres`); chunking never exceeds `maxLen`
  and rejoins losslessly; voice preference order and fallbacks; the DOM extractor's
  skip rules, no-duplicate-descent, and empty/whitespace handling.
  `tests/reader-{chunker,voices,extractor}.test.ts`.
- **Machine-verified (Playwright, headless Chromium, fake `speechSynthesis`):** 17/17
  checks — header button renders; play speaks a chunk; the control pill is NOT full
  width; the chunk sequence advances via `onend`; the heading label updates; the
  highlight is applied AND moves to a different block over time; pause stops further
  chunks and calls the real `.pause()`; resume continues them; the speed toggle cycles;
  stop calls `.cancel()`, clears the pill and the highlight; a **client-side route
  change stops the reader** without the Stop button being clicked. This run also caught
  and fixed a real bug: `useSyncExternalStore`'s snapshot wasn't cached, which crashed
  the whole page (React error #185, infinite render loop) the instant `<ReaderProvider>`
  mounted — every page would have been broken. Fixed in `engine.ts` by caching the
  snapshot and only replacing it on an actual state change.
- **Machine-verified (real headless browsers, unfaked):** `speechSynthesis` and
  `SpeechSynthesisUtterance` exist and `speak()`/`cancel()` don't throw, in both
  **headless Chromium** (0 voices available, so the "empty voice list" code path is
  exercised) and **Playwright WebKit** (221 real macOS voices). Clicking the real header
  button and letting it run for 300ms produced no page errors in either engine.
- **NOT machine-verified — needs a human ear:** that the spoken words are intelligible,
  paced sensibly, and use a pleasant voice; that Safari desktop and iOS Safari (real
  devices, not Playwright's WebKit engine) behave the same as WebKit did here; that the
  first chunk truly starts on iOS from a real tap (WebKit is the closest proxy available
  in this sandbox, not proof). This is inherent to speech, not a shortcut taken here.

**Manual test script for John:** Open `long-lake-outdoor-center` on your phone (Safari)
and on your Mac (Chrome, Edge, Safari, Firefox — whichever you use). Tap the headphones
icon in the header (or "Listen to this page" under the hero title). It should start
talking almost immediately, in a voice, moving a faint green highlight down the page as
it reads and scrolling to follow it. Try the small pill that appears near the top: pause
it, resume it, tap the speed button a couple of times (1× → 1.25× → 0.85×), then stop it.
Click a nav link while it's reading — it should go silent immediately, not talk over the
new page. If anything sounds robotic-broken (not just "computer voice," but stuck,
stuttering, or silent for more than a few seconds), that's the thing to report back.

## B. Section accents

| Pattern | Component / prop | When to use |
|---|---|---|
| Row photo | `RuledRows` row's `image?: Photo` (96–120px desktop, 72px phone, lazy) | Any ruled-row list where each row is really "about" a distinct real thing you have a photo of — downloads, amenities with a place behind them, a roster of rooms. Never a stock photo; if nothing fits, leave `image` off (renders exactly as before). |
| Ember eyebrow rule | `Eyebrow` (`rule?: boolean`), or `eyebrowRule` on `SectionHeader` / `SplitFeature` / `HeritageBand` / `IntroFacts` | The 2–3 section openers on a page that most need to read as "a fresh start" (Long Lake: the very first section under the hero, and the CCC heritage band). Not on every eyebrow — it's a second, quieter cue on top of spacing, and loses its meaning if it's everywhere. |
| Alternating band | `bandPaper` / `bandWhite` / `bandTint` from `./styles` on a `<section>` | Where a real topic change deserves a visible seam and there isn't already a photo/spruce band doing that job. Long Lake: `bandWhite` on Lodging (the "where to stay" block), `bandTint` on "Ways to use the camp." Skip it on sections that already sit next to a photo or the spruce `HeritageBand`. |
| Icon-chip list | `IconChipList` (`items: string[]`) | A flat list of amenities/facts that's currently a plain ruled `<ul>` and would read better as a lighter, "finished" row of chips. Words are passed through verbatim — the icon is a generic checkmark, never a new claim. |

All four are additive/optional: a page that doesn't use them renders exactly as the
template did before this pass.

## C. More buttons — `SectionActions`

`SectionActions({ primary: Cta, secondary?: (Cta & {style?: 'outline'|'link'})[2 max], align?, className? })`
— one primary pill (spruce, rounded-full, `pillPrimary`) plus 0–2 secondary actions
(`pillGhost` outline, or `style:'link'` for a text link with the arrow). Every target is
≥44px.

**Rule: every destination must already exist on the site.** Never invent a URL.
- Booking → the property's existing `ctas.hero`/`ctas.sidebar` (escape.baserves.com,
  Recreation.gov, or a state-park site — whatever that property already uses).
- Phone → `telHref(phone)` from the page's own `phone` value.
- Directions → `mapsUrl(lat, lng)` (`./styles`) built from the coordinates already
  published for that property in `src/components/PropertyMap.tsx`. If a property isn't
  in that file yet, skip the directions button rather than guess coordinates.
- Anchors (`#lodging`, `#weddings`...) → only ones the page already defines.

**Placement guidance** (apply what's relevant per page — not every slot on every page):

| Section | Suggested action(s) |
|---|---|
| After intro facts | Primary: Check availability / Book now. Secondary: Get directions. |
| Places to stay (lodging/cabins) | Primary: the property's existing booking CTA, componentized through `SectionActions` even with no secondary. |
| Groups / events | Primary: Plan a group stay (→ booking URL). Secondary: Call about weddings (→ tel:), if the property does weddings. |
| Weddings (if it has its own section and already has an inline link, e.g. a packet download) | Usually nothing extra — don't duplicate the groups/events section's "Call about weddings" right next to it. |
| Location (if the page has one) | Get directions (see above). Fold into intro facts if there's no separate location section. |
| Gallery | "View all photos" **only if the gallery is truncated on that page**. Long Lake's `Gallery` already shows every photo, so it was skipped there — don't add a button that goes nowhere new. |
| Resources & downloads | Usually nothing — the download rows themselves are the actions. |
| Closing | Already has primary + phone + secondary in `ClosingCta`; leave as-is. |

Long Lake ended up with new `SectionActions` in two places (intro facts, "Ways to use
the camp") plus one existing button componentized (Lodging) — "almost every section has
a relevant next action" without stacking three CTAs into one section.

## D. Rollout checklist (per new property page)

1. Wrap the page in `LakesideShell`; compose `Hero → IntroFacts → …` per the existing
   pattern in `long-lake-outdoor-center/page.tsx`. `Hero`'s `listen` prop defaults on —
   nothing to add for the Reader.
2. Find the property's real booking link (escape.baserves.com page, Recreation.gov page,
   or state-park site) and its coordinates (`PropertyMap.tsx`) before writing any new
   `SectionActions` — never invent either.
3. Pick 2–3 real, unused photos per any `RuledRows` list that would benefit from a row
   photo (check `photo-audit.md` first for what's already spoken for on that page).
   Don't repeat a photo already used prominently elsewhere on the same page.
4. Add `eyebrowRule` to at most 2–3 section openers; add one or two `bandWhite`/
   `bandTint` sections only where they mark a genuine topic change.
5. Convert a plain amenities/facts `<ul>` to `IconChipList` if the page has one.
6. Add `SectionActions` following the placement table above — skip any row that doesn't
   have a real destination on that property.
7. `npx tsc --noEmit`, `npm test`, `npm run build` (delete `.next` after — check `df -h /`
   first). Screenshot the page at 390 and 1440.
8. Never link to `/small-business-connection`; keep phone taps secondary, not primary;
   no full-width phone bottom bar (StickyBooking's existing bottom-left pill is the only
   one — the Reader pill sits at the *top*, so they never collide); ≥44px targets;
   reduced motion gets ≤300ms fades only (already handled by the shared `data-reveal`
   CSS — accents here use no new motion).

## E. Accessibility & reader-control panel

Added on branch `feat/a11y-panel` (worktree `.claude/worktrees/a11y-panel`), on top of
main `9129244`. `src/components/a11y/` — no new npm dependency:

| File | What it is |
|---|---|
| `settings.ts` | Pure logic: `A11ySettings` shape, `DEFAULT_SETTINGS`, `TEXT_SCALES`, `sanitizeSettings`/`loadSettings`/`saveSettings` (localStorage, try/catch), `classesFor`/`applySettings` (writes `<html>` classes + the `--a11y-zoom` custom property). |
| `prepaint.ts` | `A11Y_PREPAINT_SCRIPT` — a hand-written plain-JS mirror of `settings.ts`'s load+apply logic, run as an inline `<script>` at the top of `<body>` (same technique as `LakesideShell`'s `lk-pre` script) so text size / motion / contrast / etc are correct on the very first paint. `tests/a11y-prepaint.test.ts` runs the actual script text against the same fixtures as `settings.ts` to catch drift between the two. |
| `useReducedMotion.ts` | Hook any motion source outside CSS (GSAP, `requestAnimationFrame`, `setInterval`) reads instead of `prefers-reduced-motion` alone — true for either the OS setting or the panel's own toggle, updates instantly via a `window` event, no reload. |
| `A11yWidget.tsx` | The launcher + dialog. Same focus-trap/Escape/Tab pattern as `AssistantPanel.tsx`. |

**Wiring:** `layout.tsx` renders the pre-paint `<script>` first, then wraps `{children}`
alone in `<div data-a11y-scale-root>` (text-size `zoom` applies only to page content —
the launcher/panel/chat/booking pills sit outside it as siblings, so they never scale or
reflow), then mounts `<A11yWidget/>` once alongside `<AssistantChat/>`/`<ReaderPill/>`.

**Placement:** a round 52px spruce button, left edge, vertically centred
(`top:50%; transform:translateY(-50%)`), at every breakpoint. Chosen over "bottom-left
above the booking pill" because the booking pill's position is scroll-state-dependent
(hidden until past the hero, hidden again at the closing CTA) and phone-only, while the
chat launcher (bottom-right) and the desktop sticky pill (top-right, can run wide — see
below) both live at the bottom/top edges. Vertical-centre-left is clear of all three by
construction, on every page, at every scroll position — no collision-detection logic
needed. The open dialog is a rounded card, never full-screen: an inset bottom sheet
(`bottom` safe-area inset, `inset-x-3`) up through the `lg` breakpoint (1024px), then
anchored beside the launcher (left-side, vertically centred) at `lg` and up. It switches
at `lg` rather than `md` (768px) because the property template's desktop sticky booking
pill (`StickyBooking`) can run wide at 768–1023px — `"<name> · call · Book Now"` — and a
380px panel anchored at `left-[76px]` would otherwise clip its left edge; the bottom
sheet has no such ceiling at any width.

**Text size (A− / A / A+ / A++ = 100 / 112.5 / 125 / 150%):** CSS `zoom` on
`[data-a11y-scale-root]`, driven by `--a11y-zoom` (set on `<html>`, inherited). The site's
many hardcoded px sizes rule out a rem-scaling approach; `zoom` scales rendered
text/layout genuinely (verified — see below), unlike `transform: scale()` which doesn't
affect layout/wrapping.

**Stop animations** sets `html.a11y-reduce-motion`, which:
- Disables every CSS transition/animation site-wide via one global rule
  (`animation-duration`/`transition-duration: 0.001ms !important` on `html.a11y-reduce-motion *`) —
  covers Tailwind's `animate-bounce`/`animate-spin`, the assistant's typing dots and panel
  fade-in, hover transitions, the Reader's highlight transition, etc. **Caveat:** a CSS
  *transition* already mid-flight at the exact instant the toggle flips keeps the
  duration that was in effect when it started (spec behaviour, unlike CSS *animations*,
  which do adopt a new duration retroactively) — a one-off, sub-200ms artifact bounded to
  whatever the visitor was just hovering, never a repeat.
- `LakesideMotion.tsx`: folds the class into the same `motion` boolean the GSAP
  `matchMedia('prefers-reduced-motion')` context already branches on, so a page that
  mounts (first load or a client-side nav) with the toggle already on renders the
  reduced-motion branch from the start — no flash. A second listener
  (`a11y:reduce-motion-change`) handles flipping it on an already-mounted page: kills
  every `ScrollTrigger` and every active GSAP tween/timeline (including the count-up
  tweens, which animate a plain `{n}` object, not a DOM node — a target-selector kill
  wouldn't reach them) and jumps hero/reveal/wipe/parallax elements straight to their
  landed state.
- `HomeClient.tsx`: the hero `<video>` pauses and `.load()`s (restores the `poster` image
  — pausing alone leaves whatever frame it stopped on) — driven entirely by an effect,
  with the `autoPlay` attribute removed, since the browser re-asserts `autoPlay` after
  `.load()` and would otherwise race the pause; the featured-destinations carousel's
  6s `setInterval` auto-advance doesn't (re)start; `PartnershipCounter`'s
  `requestAnimationFrame` count-up jumps straight to the target instead of animating; the
  partnership-journey step reveal (`setInterval`, 500ms/step) lights every step at once.
- `PropertyMap.tsx`: the assistant tour popup's photo `setInterval` slideshow doesn't
  auto-rotate.
- `engine.ts` (Reader): `scrollIntoView` behaviour for the read-aloud highlight now also
  checks the a11y class, not just the media query.
- `SmoothDetails.tsx`'s native `Element.animate()` accordion already had its own
  `prefers-reduced-motion` branch (quick opacity fade instead of a height animation) —
  unchanged; the panel toggle doesn't currently extend to it, since `Element.animate()`
  isn't reachable by a CSS rule (documented here as a known gap, not fixed — a follow-up
  would be to also check `useReducedMotion()` there directly).

**Reading tools** is a thin wrapper around `useReader()` from `src/components/reader/` —
Play/Pause/Stop/speed buttons, no second speech engine. See §A above.

**Higher contrast / Underline links / Line spacing / Readable font** are global CSS rules
scoped to `[data-a11y-scale-root]`, toggled by `html.a11y-contrast` /
`.a11y-underline-links` / `.a11y-spacing-relaxed` / `.a11y-readable-font` (`globals.css`).
Readable font forces a plain system sans stack on every element, including headings
(overriding both the Lakeside display serif and the site's own Playfair Display
`font-display`).

**Persistence:** `localStorage['ba-a11y-settings-v1']`, wrapped in try/catch everywhere
(private browsing / blocked storage degrade to session-only, never throw).

**Verification (this addition):**
- `npm test` — 82/82 (60 pre-existing + 22 new: `a11y-settings.test.ts` covers
  `sanitizeSettings`/`loadSettings`/`saveSettings`/`classesFor`/`applySettings` against a
  fake DOM + fake storage, including the private-mode-throws path;
  `a11y-prepaint.test.ts` runs `A11Y_PREPAINT_SCRIPT` itself through the same fixtures to
  prove it hasn't drifted from `settings.ts`).
- `npx tsc --noEmit` — clean. `npm run build` — clean production build (`.next` deleted
  after, `df -h /` checked before). Server killed after verification.
- Playwright (real headless Chromium, `npm run build` + `next start`, never the MCP
  window): 73/73 checks — no-flash (class present at `DOMContentLoaded` with settings
  pre-seeded in `localStorage`) on 3 page types; text-size ratio (~1.125/1.25/1.5×,
  measured via `getBoundingClientRect` on a width-auto nav link, since `zoom` re-flows
  width-constrained text rather than scaling its box) on 3 page types; no horizontal
  scroll at 390/150%; a synthetic CSS-animation probe stops via `document.getAnimations()`;
  contrast/underline/line-spacing/readable-font computed-style changes; GSAP reveal
  elements jump to `opacity:1` and stay there through a scroll (ScrollTrigger not
  re-arming), count-ups land on their final text; hero video pauses/resumes; carousel
  position unchanged after a real 7s wait; settings persist across a full reload and a
  client-side navigation; full keyboard flow (focus enters the dialog, Tab traps for 40
  presses, Escape closes and returns focus to the launcher); no bounding-box overlap
  between the launcher/panel and the chat launcher or the sticky booking pills at
  390/768/1440 on the home and a property page.
- Screenshots: `docs/ux-pass/a11y-panel/launcher-{390,1440}.png`,
  `panel-open-{390,1440}.png`, `text-150-home-390.png`, `text-150-property-1440.png`.
- **Not machine-verified:** that the panel's visual design reads as "Lakeside" to a human
  (screenshots were reviewed, not a design-system diff); that the contrast/underline/
  readable-font rules look good (not just computed-style-correct) against every section
  background across the whole site, only the ones screenshotted; `SmoothDetails.tsx`'s
  `Element.animate()` accordion is not wired to the toggle (see above) — motion there is
  unaffected, a known gap.

## Verification run (this pass)

- `npx tsc --noEmit` — clean.
- `npm test` — 60/60 (36 pre-existing + 24 new Reader unit tests).
- `npm run build` — clean production build, 63 routes, no new page errors. Shared JS
  is 87.8 kB (framework baseline; the Reader added no new npm dependency, so its cost is
  just its own hand-written code, not a library). `.next` deleted after each build.
- Playwright (fake `speechSynthesis`, real headless Chromium): 17/17 checks — see §A.
- Playwright (real `speechSynthesis`, headless Chromium + WebKit): both pass — see §A.
- Screenshots: `docs/ux-pass/kit-v2/long-lake-{390,1440}-full.png` (full page) and
  `-reading-top.png` (control pill visible, mid-"read", desktop and phone).
