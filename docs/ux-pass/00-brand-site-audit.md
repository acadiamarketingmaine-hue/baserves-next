# Brand-site UX audit: baserves.com

Walked the live site on 23 Sep 2026 with headless Chromium (Playwright) at 390x844 (phone), 820x1180 (tablet) and 1440x900 (desktop), emulating **Reduce Motion ON** (John's setting). The jank and motion probes ran with motion **ON**.
Covered all 46 sitemap URLs plus `/weddings` and a made-up URL for the 404: 144 page loads. Screenshots are in this folder as `NN-page-{phone,tablet,desktop}.png`. They're git-ignored, 100 MB. Phone shots are full-page (capped at 7,000 px), and the fixed header can show mid-image because the page was scrolled before capture. Tablet and desktop shots are above the fold.
Booking hand-offs were walked on a phone: `60-`…`63-handoff-*-phone.png`.
**Nothing was submitted**: no form sent, no booking, no email.

---

## Executive summary

1. **False facts on the home page were the worst problem.** Chief Noonday was sold as "3 lodges · 10+ cabins · 150+" and its own page said "300+ guests · 12+ cabins · dining hall · sports fields". What's bookable is 4 cabins sleeping 26. Long Lake said 200+ and 20 cabins; the real figures are about 120 and 16. Gatewood said "2 group sites · 50+"; it has 1 site for about 30. **Fixed.**
2. **Bankhead said "year-round" and had no reserve link.** Both **fixed**: the copy now says to check campground dates, and Clear Creek and Corinth link straight to Recreation.gov.
3. **7 dead downloads** on the Monongahela page (map PDFs that never existed). **Fixed** by removing the dead tiles; the missing PDFs are requested in decisions.md D4.
4. **Maps were stamped "API KEY REQUIRED"** on every tile (CARTO now wants a key). **Fixed** by switching to OpenStreetMap.
5. **No real 404 page.** Mistyped URLs got bare Next.js white. **Fixed**: the new 404 has the brand, the menu, a phone number and six ways onward.
6. **Guests do get lost between the two domains.** Every generic "Book" opens `escape.baserves.com/` in a new tab. That page can only book 4 of the ~20 places the home page describes, and **nothing on escape.* links back** to baserves.com. The brand side is logged as D1 (John's call); the booking side is logged in for-booking-session.md B1–B6.
7. **Weight:** the median phone page pulled **2.9 MB** of images. 1.3 MB of that was the chat mascot at 1200x1200 on every page. The Utah and Iowa DOT heroes were 3.9 MB and 3.0 MB. **Fixed** (the mascot now costs about 120 KB). The 2.3 MB photo in the home booking widget comes from escape.* (B3).
8. **Accessibility:** the 49-field job application had no associated labels, and the phone search and close-menu buttons had no names. **Fixed.** Footer and mobile-menu links are still 16–32 px tall (S2, needs design).
9. **Measured clean:** 0 console errors and 0 page errors on 46 live pages at 3 sizes. No horizontal scroll at any size. Every `<img>` has alt text. CLS is 0.001 on the home page. The motion probe found 0 CSS/GSAP conflicts. All 166 unique links were checked; the only failures are listed below.
10. **Small Business Connection** is linked from nowhere (checked on all 47 crawled pages), as John asked. It's still reachable by URL and listed in the sitemap (D9).

---

## Ranked findings

Severity: **S1** misleads or blocks a guest · **S2** real friction · **S3** polish. Status is as of this pass.

| # | Sev | Screen | Size | What a guest sees | What should happen | File:line | Screenshot | Status |
|---|-----|--------|------|-------------------|--------------------|-----------|------------|--------|
| 1 | S1 | Home: destination cards and location modal | all | Chief Noonday "3 Lodges · 10+ Cabins · 150+ Capacity"; Long Lake "200+ Capacity · 20 Cabins"; Gatewood "2 group · 50+"; Jess Judy "75+" | 4 cabins · 26 · built 1938; 120 · 16; 1 group · 30; 120 (3×40) — each from that property's own page | `src/components/HomeClient.tsx:92,102,318,327,402,429` | `01-home-phone.png` | **Fixed** d7e3714 |
| 2 | S1 | Chat guide / tour | all | Treeko says Long Lake has "20 cabins" | 16 cabins and 4 bunkhouses for about 120 | `src/app/api/treeko/route.ts:32`, `src/data/property-tour.ts:71` | — | **Fixed** d7e3714 |
| 3 | S1 | Chief Noonday | all | Stats "300+ guests · 12+ cabins · 100+ acres"; features "Dining Hall, Meeting Spaces, Sports Fields" beside a paragraph listing four cabins | 26 guests · 4 cabins · built 1938; unverifiable features removed (D5) | `src/content/defaults/chief-noonday-outdoor-center.ts:46-57` | `21-chief-noonday-outdoor-center-phone.png` | **Fixed** 8b32c7d |
| 4 | S1 | Bankhead | all | "year-round recreational opportunities … accessible throughout the year" | Say the campgrounds are seasonal and to check dates | `src/content/defaults/bankhead-national-forest.ts:47` | `22-bankhead-national-forest-phone.png` | **Fixed** d4c7c7e |
| 5 | S1 | Bankhead | all | No way to reserve; every button goes to another page on our site | "Reserve Clear Creek / Corinth on Recreation.gov" (231990 / 232423, IDs already used on the child pages) | `src/app/bankhead-national-forest/page.tsx` sidebar; defaults `ctas.reserve*` | `22-bankhead-national-forest-phone.png` | **Fixed** fc1f1e1 |
| 6 | S1 | Monongahela downloads | all | 7 of 10 map tiles 404: Bear Heaven, Cranberry ×2, Island, Kumbrabow, Otter Creek, Laurel Fork | Link only maps we have (D4) | `src/content/defaults/monongahela-national-forest.ts:232-246` | `18-monongahela-national-forest-phone.png` | **Fixed** 4eb6473 |
| 7 | S1 | Home map, Iowa/Utah DOT maps | all | Every tile stamped "API KEY REQUIRED · carto.com/basemaps/apikey" | Clean tiles | `src/components/PropertyMap.tsx:337`, `src/components/RestAreaMap.tsx:73` | `01-home-phone.png` (y≈5,000) | **Fixed** 318a71a |
| 8 | S1 | Any bad URL | all | Bare white Next.js "404 This page could not be found": no menu, no brand, no phone | Branded 404 with nav, phone, six onward links, `noindex` | `src/app/not-found.tsx` (new) | `47-this-page-does-not-exist-phone.png` (before) | **Fixed** 22bc700 |
| 9 | S1 | Every generic "Book" (nav, home ×3, experiences, rewards) | all | Opens `escape.baserves.com/`, which books only Chief Noonday, Long Lake, Meramec and Washington, straight after copy about WV, RI, IA, IN and UT | Tell the guest where each kind of site books, or route to `/experiences` | `Navigation.tsx:18,155,780`; `HomeClient.tsx:1230,1409,1594`; `experiences/page.tsx:259`; `rewards/page.tsx:126` | `60-handoff-escape-root-phone.png` | **Fixed** (release 3, John's D1 decision): generic → `/experiences` |
| 10 | S1 | escape.* after hand-off | all | No link back to baserves.com from escape root or the property pages; both logos stay on escape.* | Header/footer link back to the matching brand page | booking repo | `61-`, `62-handoff-*-phone.png` | **Logged** B1 |
| 11 | S2 | Every page | phone | 1.3 MB of 1200×1200 mascot PNGs (`treeko-idle.png`, `treeko-talking.png`) preloaded for a 96 px button | 256 px copies | `src/components/TreekoChat.tsx:38,39,303,421` | — | **Fixed** ec3370d |
| 12 | S2 | Utah DOT, Iowa DOT, Contact, Services, Experiences | all | Raw hero `<img>`: Utah 6000×4000 at 3.9 MB, Iowa PNG 3.0 MB, `bankhead-forest.jpg` 0.5 MB at 20% opacity | 1,400–1,600 px JPEGs (376 / 424 / 185 KB) | `services/utah-dot/page.tsx:150`, `services/iowa-dot/page.tsx:115`, `contact/page.tsx:30`, `services/page.tsx:110`, `experiences/page.tsx:154` | `34-services_utah-dot-phone.png` | **Fixed** 1e8d4c7 |
| 13 | S2 | Careers | all | 49 inputs with no associated label; tapping a label does nothing; screen readers announce "edit text" | `htmlFor`/`id` pairs, unique per repeated row | `src/components/EmploymentApplicationForm.tsx` | `04-careers-phone.png` | **Fixed** 5bd6b63 |
| 14 | S2 | Header | phone | Search and close-menu icon buttons have no accessible name; search 36×36, menu 40×40 | `aria-label`, 44×44, `aria-expanded` on the menu | `src/components/Navigation.tsx:398-412,555-560` | `01-home-phone.png` | **Fixed** 359687c |
| 15 | S2 | Home | phone | 2.3 MB unit photo from the embedded booking widget; home takes about 12 s to network-idle | Widget should serve resized images | `escape.baserves.com/embed/widget.js` | `63-handoff-home-widget-phone.png` | **Logged** B3 |
| 16 | S2 | Home widget | all | 4 carousel arrow buttons with no accessible name | `aria-label` | booking widget | — | **Logged** B4 |
| 17 | S2 | Mobile menu and footer, every page | phone | Mobile-menu links 32 px tall; footer links 16–32 px tall ("Corinth", "Big Bend", "Stuart" 16 px); "Website by Acadia Marketing" 6 px; Leaflet zoom buttons 30 px. About 86 sub-44 px targets per page | Pad the link rows to 44 px | `src/components/Footer.tsx`, `src/components/Navigation.tsx` mobile panel | `07-privacy-phone.png` (footer) | Open: needs design (the footer will grow ~40%) |
| 18 | S2 | Iowa DOT, Utah DOT | tablet | CLS 0.139 / 0.109 (everything else is ≤0.07) | Reserve space for the map / rest-area list | `services/iowa-dot`, `services/utah-dot` | `33-services_iowa-dot-tablet.png`, `34-services_utah-dot-tablet.png` | Open |
| 19 | S2 | Chief Noonday | desktop, motion on | One 346 ms long animation frame during scroll (home 77 ms, Long Lake 142 ms, experiences 134 ms); CLS 0.001 | Profile the gallery/hero on scroll | `src/app/[slug]/page.tsx` | — | Open |
| 20 | S2 | Weddings drafts | all | `/noindex1` and `/noindex2` are live and `index, follow` | `noindex` until John picks (D3) | `src/app/noindex1/page.tsx`, `noindex2/page.tsx` | — | **Fixed** (release 3): noindex, nofollow |
| 21 | S3 | Bankhead hero | all | "Clear Creek" and "Corinth" buttons open our own pages in a new tab | Same tab | `src/app/bankhead-national-forest/page.tsx:117-121` | — | **Fixed** bad4b22 |
| 22 | S3 | Burlingame | all | "Reserve Burlingame" (reserveamerica.com) answers 403 to a script | Likely bot-blocking; open it by hand once | `experiences/burlingame-state-park/page.tsx:180,259,542` | — | Unverified |
| 23 | S3 | Small Business Connection | all | 3 dead partner links (apexroofnh.com 404, blackmajicsealcoating.com 404, maineheatpumpcleaning.com no connection) | Remove or update | `src/app/small-business-connection/page.tsx` | `12-small-business-connection-phone.png` | Logged D9 (page is unlinked) |
| 24 | S3 | Missouri pages | all | The brief says they redirect to mostateparks.com; live, they're full pages on our site with outbound "Book" to meramecpark.com / washingtonstateparkmo.com | Confirm intent | — | `19-washington-state-park-phone.png` | Logged D2 |

| 25 | S1 | Tipsaw, Hardin Ridge, Indian-Celina | all | Stat bar "Year-Round / Open" above a paragraph saying the area operates early April to late October | "Apr–Oct / Season" | `src/content/defaults/{tipsaw-lake,hardin-ridge,indian-celina-lakes}-recreation-area.ts` stats | `14-`, `15-`, `16-…-phone.png` | **Fixed** (release 2) |
| 26 | S1 | Indian-Celina (6 places) | all | 80+ on its own page and the home card, 60+ on the home modal and the experiences page and in the chat guide, "60" in the tour, 63 in the paragraph | **59**, from Recreation.gov campground 232027 (North Face 34 + South Slope 25), checked 2026-09-24 | defaults `:57,:100`; `HomeClient.tsx:60,267`; `experiences/[slug]/page.tsx:83`; `categories/[category]/page.tsx:37`; `property-tour.ts:39`; `api/treeko/route.ts:24` | `16-indian-celina-lakes-recreation-area-phone.png`, `38-…celina…` | **Fixed** 870130f |
| 27 | S1 | Clear Creek | all | "131 acres · Lewis Smith Lake", which is Tipsaw's size | 21,200 acres (the same page's own text) | `experiences/clear-creek-recreation-area/page.tsx:144` | `39-experiences_clear-creek-recreation-area-phone.png` | **Fixed** (release 2) |
| 28 | S2 | Tipsaw | all | "35+ Campsites" on its page, "47" on the experiences card; Recreation.gov lists 49 | One sourced number | `tipsaw-lake-recreation-area.ts:65,180`; `experiences/page.tsx:40,42` | `14-tipsaw-lake-recreation-area-phone.png` | **Fixed** (release 3): 49 everywhere |
| 29 | S2 | Hardin Ridge | all | 200+ in the stat, 208 in the text, 203 on the experiences card; Recreation.gov lists 195 | One sourced number | `hardin-ridge-recreation-area.ts:68,112`; `experiences/page.tsx:49,51` | `15-hardin-ridge-recreation-area-phone.png` | **Fixed** (release 3): 195 everywhere |
| 30 | S2 | Bankhead: Clear Creek card | all | Prints "Bankhead&apos;s largest recreation area" | An apostrophe | `bankhead-national-forest.ts:175` | `22-bankhead-national-forest-phone.png` | **Fixed** 0bc3ace |
| 31 | S3 | Hoosier and Monongahela heroes and sidebars | all | Internal campground links open a new tab | Same tab (external links keep a new tab) | `hoosier-national-forest/page.tsx:121`; `monongahela-national-forest/page.tsx:99,201,476` | — | **Fixed** a5b1121 |
| 32 | S2 | Chat mascot, every page | phone | Mascot sits over body text on the right (e.g. about ~y820, careers ~y1150); permanent red "1" badge | Reserve right padding on small screens; drop the fake unread badge | `src/components/TreekoChat.tsx` | `02-about-phone.png` | **Fixed** (release 4): fake badge removed, 64×75 on phones, focus ring |
| 33 | S2 | Services | phone, tablet | Grey "Select portfolio highlights" text squeezed into each accordion row; lone icons with big gaps | Remove placeholder text | `src/components/ServiceAccordion.tsx` | `05-services-phone.png` | **Fixed** (release 4); the section icons are intentional and were kept |
| 34 | S2 | Experience category cards | all | "Duration: 800+ miles / 25,000 acres"; price slot shows "102 sites — 4 loops" | Relabel the fields (Length, Size, Sites) | `experiences/categories/[category]/page.tsx` | `41-`…`46-…-phone.png` | **Fixed** (release 4): per-category labels |
| 35 | S2 | Utah DOT | desktop | Hero headline cut off under the sticky nav | Add top padding to the hero | `services/utah-dot/page.tsx` | `34-services_utah-dot-desktop.png` | **Not a bug**: the crawl shot was taken while scrolled; a fresh render at the top has the h1 at 181 px, below the 105 px header |
| 36 | S2 | Rewards | all | In the top nav, but the page is "Coming Soon" | Hide from the nav until launch, or add a sign-up (John) | `Navigation.tsx`, `rewards/page.tsx` | `11-rewards-phone.png` | **Fixed** (release 3): out of the top menu |
| 37 | S3 | Home, Washington card | all | "2,147+ Acres" vs 2,157 on the park page; "50+ Campsites10+ mi trails" run together | One number; add the space | `HomeClient.tsx` | `01-home-phone.png` | **Fixed** (release 4): 2,157 to match the park page; stats spaced |
| 38 | S3 | Home | all | "500+ Campsites" sitewide stat, while Burlingame alone lists 755 | Source the total, or drop it | `HomeClient.tsx` | `01-home-phone.png` | Kept: sourced (673 on Recreation.gov alone, D11) |
| 39 | S3 | Minor copy | all | Long Lake is "Yankee Springs, MI" on its page and "Middleville, MI" elsewhere; "Reserve … OC" abbreviation; Spruce Knob 42 vs 40, Stuart 30+ vs 26 in text (Recreation.gov: 42 and 31); kayak hero reuses the Canal Bridge road sign; leave-a-review says "Utah rest stops" only; support@ vs email@ addresses | Tidy in one copy pass | various | — | **Fixed** (release 4): OC, Utah-only review option, kayak hero. Long Lake's two place names are both accurate and were kept. Email addresses are logged as D13 |

**Counts: S1 13 (12 fixed, 1 logged: B1, booking side) · S2 18 (10 fixed) · S3 8 (3 fixed or confirmed) · 39 in total.** Release 3 also fixed Spruce Knob's walk-in count (12), Stuart's site count (31) and Meramec's booking tile text. Findings 25–39 come from a second pass over every screenshot.

---

## Book / Reserve hand-off map (every path from the brand site)

| From | Label | Lands on | Right place? | Way back |
|------|-------|----------|--------------|----------|
| Nav (all pages), home hero, home destinations, home footer CTA, experiences, rewards | Book / Book Your Adventure / Book Your Stay / Book Now | `escape.baserves.com/` (new tab) | Only for CN, LL, Meramec, Washington (#9) | Old tab only (#10) |
| Nav | My Reservations / Log In | `escape.baserves.com/customer/login` (new tab) | Yes | Old tab only |
| Chief Noonday page, Yankee Springs | Book Your Stay / Check Availability / Reserve Chief Noonday | `escape.baserves.com/chief-noonday-outdoor-center` | Yes: "Chief Noonday Outdoor Center – Book Your Stay" | Old tab only |
| Long Lake page, Yankee Springs, weddings drafts | Book Your Stay / Reserve Long Lake | `escape.baserves.com/long-lake-outdoor-center` | Yes | Old tab only |
| Home "Book" widget | embedded cards | escape.* widget | Yes (CN and LL units) | n/a |
| Tipsaw, Hardin Ridge, Indian-Celina, Big Bend, Seneca Shadows, Spruce Knob, Jess Judy, Gatewood, Stuart, Clear Creek, Corinth, **Bankhead (new)** | Reserve on Recreation.gov | `recreation.gov/camping/campgrounds/<id>`, all 200 and the matching campground | Yes | Browser back |
| Burlingame | Reserve Burlingame | reserveamerica.com (403 to script) | Unverified (#22) | — |
| Meramec / Washington | Book Your Stay | meramecpark.com / washingtonstateparkmo.com (200) | Yes (vendor sites) | — |
| Canal Bridge | Book / Reserve Online | canalbridgeme.com (200) | Yes | — |

No brand link passes a return URL or UTM (B6).

---

## Measurements

- **Console:** 0 errors and 0 uncaught exceptions on all 46 live pages × 3 sizes (the only console error is the expected 404 on the 404 test URLs).
- **Links:** 166 unique hrefs checked (internal, escape.*, Recreation.gov, vendors). Failures: 7 Monongahela PDFs (#6), 3 Small Business Connection partners (#23), and ReserveAmerica 403 (#22).
- **Images (phone, before fixes):** median 2.9 MB per page. Worst: home 5.3 MB (the widget's 2.3 MB blob), Utah DOT 6.5 MB, Iowa DOT 5.7 MB. Every `<img>` has alt text.
- **CLS:** home 0.001 (jank probe). The worst in the walk were Iowa DOT tablet 0.139, Utah DOT tablet 0.109 and contact tablet 0.069. All others were under 0.05.
- **Motion** (`jank-probe` and `motion-probe`, motion forced on, desktop): home loafMax 77 ms, Long Lake 142 ms, Chief Noonday 346 ms, experiences 134 ms. 0 stuck reveals and 0 CSS/GSAP conflicts on all four. With Reduce Motion (the walk), nothing animates and no content was stuck hidden.
- **Tap targets:** about 86 sub-44 px targets per page on phone, almost all footer and mobile-menu links (#17). No horizontal overflow at any size.

---

## Quick wins (shipped)

1. Home and chat capacity numbers corrected (#1, #2).
2. Chief Noonday stats and features (#3).
3. Bankhead season copy (#4) and Recreation.gov links (#5).
4. Dead Monongahela map tiles removed (#6).
5. Map tiles to OpenStreetMap (#7).
6. Branded 404 (#8).
7. Mascot images 1.3 MB → 120 KB (#11).
8. DOT, contact, services and experiences heroes resized (#12).
9. Careers form labels (#13).
10. Phone header buttons labelled and enlarged (#14).
11. Bankhead hero links in the same tab (#21).

## Needs design

1. **Footer and mobile-menu tap targets (#17).** Padding every footer link to 44 px makes the 4-column property footer about 40% taller on a phone. Consider collapsing the property list into per-state accordions.
2. **The "Book" chooser (#9 / D1).** One entry point that splits "Michigan cabins" (escape.*) from "national-forest campsites" (Recreation.gov) and "state parks" (vendors).
3. **DOT pages' layout shift (#18).** Reserve map height before Leaflet mounts.

## Needs John or the camp

See `decisions.md`: D1 Book destination · D2 Missouri redirect · D3 weddings drafts indexable · D4 missing map PDFs · D5 Chief Noonday facilities · D6 Bankhead dates · D7 Corinth phone · D8 map tiles · D9 Small Business Connection · D10 weddings pick.
