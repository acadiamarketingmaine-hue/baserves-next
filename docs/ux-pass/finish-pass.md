# Finish pass (design pass items 3, 4, 6, 7) — Sep 24 2026

Branch `ux-finish`, built on `ux-pass-brand` (cc1f4f6). Sources: `~/Downloads/site-finish-manual/README.md`
§1–2, `~/gameover/protocols/ux.md` D and J.01. Size reference: SMHP. Motion and menu reference: Garden Guys.
Checked on a local dev server (`next dev -p 4521`), never on baserves.com. Not deployed.

## A. One clear next step above the fold on phones (390×844) — J.01

The measure is the top and bottom of the first filled button on a 390×844 screen (Playwright, Reduce Motion on).

| Page | Before | After | Where |
|---|---|---|---|
| /about | no button | Explore Locations (→ /experiences, same as the page's closing CTA), 479–535px | `src/app/about/page.tsx:104` |
| /careers | nothing in the hero (PDF card at 764–836) | Apply Now (→ `#apply`, the form), 439–495px | `src/app/careers/page.tsx:111` |
| /contact | topic cards only (no call option) | Call +1 207 307-7903 (the `tel:` already on the page), 407–463px; topic cards still start at 711px | `src/app/contact/page.tsx:43` |
| /experiences | no button | Book Now (→ `#all-recreation-areas`, same as the closing CTA), 544–600px | `src/app/experiences/page.tsx:167` |
| /experiences/categories/* (6) | no button | See Available Experiences (→ `#available-experiences`, the card grid below), 453–549px | `src/app/experiences/categories/[category]/page.tsx:163`, id at `:175` |
| /rewards | no button | Book Your Next Adventure (→ /experiences, the closing CTA), 567–623px | `src/app/rewards/page.tsx:85` |
| /services | no button | Partnership Inquiries (→ /contact?topic=partnership, as in the nav), 551–607px | `src/app/services/page.tsx:123` |
| /services/[slug] (4) | no button | Request a Quote (→ /contact, the sidebar quote card), 345–401px | `src/app/services/[slug]/page.tsx:171` |
| /services/iowa-dot, /services/utah-dot | no button | Call +1 207 307-7903 (the closing CTA), 479–535 / 576–632px | `iowa-dot/page.tsx:128`, `utah-dot/page.tsx:163` |
| Monongahela campgrounds (6) | none in the baseline sweep | **Fixed by B**: the existing Book on Recreation.gov hero button now sits at 324–412px because titles are smaller on phones. No new button. | — |
| Home, property pages, forest hubs | already had one | unchanged | — |
| /leave-a-review | form choices start at 829px | not applicable: the form is the page's action and starts at the fold | — |
| /privacy, /refund_returns, /sms-terms, /small-business-connection | none | not applicable: legal text and a partner directory have no guest action | — |

All the new buttons use `btn-primary`, 56px tall. No new destinations, labels, numbers or facts. Each one points to a link or anchor that was already on the page (or in the nav, for Services).

## B. Type scale — D.02

| Level | Rule | Applied |
|---|---|---|
| H1 hero | `text-4xl md:text-5xl lg:text-6xl` (the scale the 16 property pages already used; SMHP tops out at 6xl) | `.headline-xl` in `src/app/globals.css:282` changed from 48/60/72px to 36/48/60px, so the 16 `headline-xl` heroes now match the property heroes |
| H2 section | `text-3xl md:text-4xl` | `.headline-lg` (`globals.css:301`) changed from 36/48 to 30/36px. 109 `text-3xl` H2s in 26 files gained `md:text-4xl`. 13 section H2s at `text-2xl` went up to the standard (careers, experiences ×2, categories, campground closing CTA ×6, Corinth ×2, rewards). The home Partnership H2 was capped from `lg:text-6xl` to `md:text-4xl` |
| H3 card | `text-xl` | already the most common (101 uses). No change |

Scale documented in a comment at `globals.css:278`.
Left alone on purpose: H2s inside cards and forms (careers PDF card, Clear Creek pass card, ContactForm, leave-a-review form, Utah region headings) and legal-page H2s (`text-2xl` inside running text). The `text-2xl` H3 subheads inside body copy stay one step between H2 and card H3. `PetServicesRates.tsx` is not imported anywhere, so it was not touched.

## C. Iconography — D.03

- **Applied:** the category hero icon was dark grey on a 60%-black photo. It is now white in a 64px `bg-white/15 ring-white/25` tile (`src/app/experiences/categories/[category]/page.tsx:159`).
- **Applied:** the Clear Creek and Corinth day-use cards mixed emoji with black line icons, with no tile. The icons now sit in a 56px forest-tint tile, matching the About and Services icon tiles (`clear-creek-recreation-area/page.tsx:285`, `corinth-recreation-area/page.tsx:263`).
- **Not applicable (already cards/tiles):** About values, Services list, Rewards perks, home categories, home Partnership services and home process steps.
- **Proposal:** replace the emoji on Clear Creek and Corinth (🏊 🚤 …) with line icons from `Icons.tsx`. That needs new swim, boat and playground icons.

## D. Site Finish Manual §1 (calm motion) and §2 (finished look)

### §1 Calm motion. Overrides are in one commented block at `src/app/globals.css:481`

| Culprit | Finding | Result |
|---|---|---|
| Hero `data-reveal` / GSAP | No GSAP or `data-reveal` on this site | not applicable (motion-probe: 0 conflicts on every page) |
| Grain / noise overlay | none | not applicable |
| Infinite animations | home hero scroll arrow `animate-bounce`, Partnership badge dot `animate-pulse`, unused `.animate-float` | **applied**: removed in `HomeClient.tsx:1253` / `:540`; `.animate-float{animation:none}`. The chat typing dots and form spinner keep their loops because they show work in progress |
| Slow global transitions | `.btn-*`, `.card-hover`, `.location-card`, `.experience-card` used `transition: all .3s`; `.nav-link` .3s | **applied**: 200ms, and only transform, shadow and colour move |
| Transform transitions on scrubbed elements | no scrubbed elements | not applicable |
| Inline `transitionDelay` | home process steps (`HomeClient.tsx:569`) | kept: it is the only stagger (no GSAP to replace it) |
| `backdrop-blur` on large fixed layers | header has none. Search overlay and Treeko tour bar blur only while open | not applicable |

### §2 Finished look

| Item | Result |
|---|---|
| Hero bottom curve | not applicable: no hero curves on this site |
| Floating strips → white card | not applicable: `NoticeBanner` is already a rounded, bordered card |
| Lonely photos | not assessed. Photos belong to the parallel photo session (image `src` is out of scope here) |
| Oversized all-caps H2 | no all-caps H2s. The oversized H2s were capped under B |
| Bold links in body copy → underline | **applied**: Long Lake wedding-packet link (`long-lake-outdoor-center/page.tsx:320`) is now `underline decoration-forest/40 decoration-2 underline-offset-4`. The other bold links are standalone actions, not body copy |
| Hard full-width divider bars | none found |
| Dark forms | not applicable: every form is on white |

### Probe numbers (local dev server, desktop 1440×900, motion forced on)

`jank-probe` (cls / slow frames >50ms / worst frame ms / stuck) and `motion-probe` (conflicts).
The server was in dev mode, so frame times include dev overhead. Compare them with each other, not with a production build.

| Page | Before | After | motion-probe before → after |
|---|---|---|---|
| / | 0.003 / 5 / 166 / 0 | 0.001–0.003 / 1–2 / 103–142 / 0 (one first-run outlier of 846ms from a dev compile) | 0 → 0 |
| /about | 0.000 / 2 / 132 / 0 | 0.000 / 1 / 107 / 0 | 0 → 0 |
| /experiences | 0.000 / 2 / 177 / 0 | 0.000 / 1 / 122 / 0 | 0 → 0 |
| /experiences/categories/hiking | 0.007 / 2 / 166 / 0 | 0.000 / 1 / 124 / 0 | 0 → 0 |
| /monongahela-national-forest/big-bend-campground | 0.000 / 3 / 164 / 0 | 0.000 / 1 / 116 / 0 | 0 → 0 |
| /services | 0.000 / 2 / 156 / 0 | 0.000 / 2 / 162 / 0 | 0 → 0 |
| /long-lake-outdoor-center | 0.000 / 3 / 149 / 0 | 0.000 / 2 / 125 / 0 | 0 → 0 |

## E. Mega menus (Garden Guys format: 640–720px, 2 columns, thumbnail + title + one-line blurb, footer CTA row)

- **Services:** already matched: 700px, 2 columns, 40px thumbnails with title and blurb, and a footer row (View All Services / Partnership Inquiries). Not changed. Its "Government" chip is still blue (`Navigation.tsx` ~`:279`); that belongs to the brand pass.
- **Locations: applied.** The old menu was a 320px single column that scrolled inside a 28rem box, with 28px round thumbnails, no blurbs and no footer. It is now a 680px, 2-column panel (AL/IN/ME/MI | MO/RI/WV) (`Navigation.tsx:452`). Each park has a 40px thumbnail, its name and a one-line blurb. Child areas are listed as indented links. The footer row has Browse Campgrounds → and View All Locations. The blurbs (`blurb` field, `Navigation.tsx:28`) repeat the facts already in the Services menu with the state removed; nothing new was written. The panel is anchored to the right of the green bar, so it stays on screen at 1024px (left edge 320px) and 1440px (656–1336px). The hover area now fills the bar's height, so moving the pointer down into the panel keeps it open. The mobile menu is unchanged.

## Not done / follow-ups

- The home page still shows a full-screen white loading screen with a progress bar (`HomeClient.tsx:1158`) before the hero. This is a bigger UX call than a finish pass: it delays the first view. Ask John.
- Emoji → line icons on Clear Creek and Corinth (see C).
- `next build` was not run (low memory). `tsc --noEmit` and `npm test` (36 pass) passed before every commit.
