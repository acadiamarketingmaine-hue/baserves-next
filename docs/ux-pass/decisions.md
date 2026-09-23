# Decisions waiting on John or the camp

From the baserves.com UX pass, 2026-09-23. Each item names what's live now and what's needed. Nothing here has been changed.

## D1. Where Book buttons go (decided by John 2026-09-24, done)
- **Generic** buttons now go to `/experiences`: the nav "Book", the home page's "Book Your Adventure", "Book Your Stay" and "Book Now", rewards, the site-search "Book a Reservation", and the category-card fallback. The experiences page's own "Book Now" jumps to its "All Recreation Areas" list (`#all-recreation-areas`). "My Reservations" still goes to escape.* login.
- **Properties escape.* can book:** Chief Noonday and Long Lake already go to their escape.* pages (unchanged).
- **Recreation.gov places:** all twelve already go to their own Recreation.gov page (Bankhead added in this pass).
- **Meramec and Washington** keep their vendor sites (meramecpark.com, washingtonstateparkmo.com). escape.* has pages for both, but they're scraped mostateparks copies with an off-site "Make a reservation" (booking audit, finding 2), so escape.* can't actually book them for a guest. If the booking session makes them bookable, switch these two buttons.

## D2. The Missouri pages don't redirect (information, John)
The brief says Meramec and Washington "redirect to mostateparks.com (`next.config.js`)". On 2026-09-23 **neither redirects**. `/washington-state-park` and `/experiences/meramec-state-park` return 200 with our own full pages. Their "Book Your Stay" buttons go to `washingtonstateparkmo.com` and `meramecpark.com` (both 200). No redirect exists in `next.config.js` or anywhere in git history. Left as it is, per "Missouri parks stay listed". Tell me if a redirect was expected.

## D3. Weddings drafts indexing (decided by John 2026-09-24, done)
`/noindex1` and `/noindex2` now have `robots: { index: false, follow: false }`. Neither was in the sitemap. Both pages stay up, unchanged otherwise. John's pick between them is still pending (D10).

## D4. Monongahela maps we don't have (camp)
Seven map tiles on `/monongahela-national-forest` pointed to PDFs that never existed in the repo, so they 404'd. **Removed** (commit "Seven map downloads…"): Bear Heaven, Cranberry campground, Island, Kumbrabow, Otter Creek, Cranberry wilderness, Laurel Fork. **Needed:** the PDFs, if the camp wants those tiles back.
These PDFs are **on disk but not linked anywhere**. I didn't guess their titles; confirm and they can be added: `campground-maps/big-bend.pdf`, `gatewood.pdf`, `stuart.pdf`, `developed-sites.pdf` (an appendix from a Forest Service prospectus, probably not for guests), `wilderness-maps/big-draft.pdf`, `roaring-plains.pdf`, `spice-run.pdf`.

## D5. Chief Noonday facilities (camp)
Removed from the Chief Noonday feature list: **Dining Hall, Meeting Spaces, Sports Fields**. The stats changed from "300+ guests / 12+ cabins / 100+ acres" to **26 guests / 4 cabins / built 1938**. Sources: the page's own paragraph and the booking import (4 cabins: Bear Den 6, Chickadee 4, Crane House 8, Deer Lodge 8). **Needed:** if a dining hall or meeting space can actually be rented, tell me and it goes back. The camp can also change this in the website editor, since Chief Noonday is an editable page.
Side note for the booking session: `scripts/import-chief-noonday.ts:295` sets `capacity: 8` on all four units, so Chickadee (sleeps 4) may be bookable for 8.

## D6. Bankhead season (camp)
The "year-round … accessible throughout the year" line was replaced with "Peak visitation typically runs from mid-March through late October. Campground seasons vary, so check dates for Clear Creek and Corinth on Recreation.gov…". **Needed:** Clear Creek's and Corinth's real open and close dates, if the camp wants them printed. The Hurricane Creek Shooting Range still says "Open year-round" (defaults `:286,:293`). It was left because that's likely true of the range. Confirm.
Clear Creek (`experiences/clear-creek-recreation-area/page.tsx:180`) and Corinth (`corinth-recreation-area/page.tsx:167`) still say "year-round boat launch". That's plausible for a launch ramp but unverified.

## D7. Corinth has two phone numbers (camp)
`/experiences/corinth-recreation-area` shows (205) 489-**3165** next to the address, and the ranger line (205) 489-5111 elsewhere. It may be a separate campground line. Confirm.

## D8. CARTO map tiles now need an API key (John, information)
Both maps were stamped "API KEY REQUIRED". They were switched to standard OpenStreetMap tiles (free, attribution shown). OSM's tile policy is fine for a site this size. If you'd rather keep the CARTO light style, you'll need a CARTO account and key.

## D9. Small Business Connection (hidden per John, 2026-09-24, done)
- Not linked from any menu, footer, site search or page (verified 2026-09-23 on all 47 crawled pages; no references in code).
- **Removed from `src/app/sitemap.ts`**, and the page now sends `robots: { index: false, follow: false }`. It stays reachable only by direct URL.
- `src/data/lastmod.json:39` still has its entry. It's harmless, since the sitemap no longer lists the page.
- Three of its partner links are dead (apexroofnh.com 404, blackmajicsealcoating.com 404, maineheatpumpcleaning.com no connection). Not changed.

## D10. Weddings page (unchanged)
Still waiting on John's pick between the two drafts (see D3). Not published.

## D11. Campsite counts (decided by John 2026-09-24, done; camp may correct)
Where the site contradicted itself, every mention now uses Recreation.gov's reservable-site count, checked 2026-09-24 via the Recreation.gov campsite search (by asset id). **The camp can correct any of these.** Recreation.gov's totals include group sites, day-use shelters and cabins, so the camp's own "campsite" figure may be lower.

| Place | Now says | Was | Recreation.gov breakdown |
|---|---|---|---|
| Indian-Celina 232027 | **59** | 80+, 63, 60+, 60 | North Face 34 · South Slope 25 |
| Tipsaw 232114 | **49** | 35+, 47, 35 | Jack Pine 20 · Dogwood 14 · CATB 11 · 4 group/shelter |
| Hardin Ridge 232056 | **195** | 200+, 203, 208, 200 | 8 loops, 2 cabins, 2 group shelters |
| Spruce Knob Lake 234132 | **42** (paragraph now 28 + 2 double + **12** walk-in) | paragraph added up to 40 | 30 drive-up · 12 walk-to |
| Stuart 232007 | **31** sites | 30+ | 26 main-campground sites (matches the paragraph's "26 campsites") + group, 3 day-use shelters, 1 cabin |

**Home "500+ Campsites"** (`HomeClient.tsx:200`, also `opengraph-image.tsx:129`) **was kept**. Recreation.gov counts for our eleven Recreation.gov campgrounds total 673 (Tipsaw 49, Hardin 195, Celina 59, Spruce Knob 42, Stuart 31, Big Bend 46, Seneca Shadows 81, Jess Judy 3, Gatewood 1, Clear Creek 105, Corinth 61). That's over 500 even without shelters and cabins, and before Burlingame (755 per its page) and Yankee Springs.

## D12. Rewards (decided by John 2026-09-24, done)
Removed from the top menu (desktop and mobile). `/rewards` is still reachable by URL and is still listed in site search and the sitemap. Its "Book Your Next Adventure" button now goes to `/experiences`.
