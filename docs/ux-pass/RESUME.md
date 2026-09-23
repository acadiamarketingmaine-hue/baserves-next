# baserves.com UX pass: resume point

## 2026-09-24 05:34 +07
- **main = `167bbbd`**, production READY and verified live with the Vercel MCP fetch, one page at a time.
- **Live now:**
  - Fix round: map pin names, contrast, video 22→1.1 MB, `sizes` on all 91 images, hero `priority`, 44px tap targets, style consolidation, careers autofill.
  - Photo audit: about 125 slots swapped, about 55 alt texts fixed. Shot list in `docs/ux-pass/photo-audit.md`.
  - Finish pass: heading scale, a hero button on phones for 20 pages, light category icons, calm motion, two-column Locations menu. Notes in `docs/ux-pass/finish-pass.md`.
  - Stage House and Infirmary photos rotated upright. The fake home loading screen is removed.
- **Sweeps:** baseline → after-fixes → after-design in `docs/ux-sweep/`. Medians: speed 70→91, accessibility 42→57, visual consistency 0→45. The runner now counts gradient-filled buttons (`.btn-primary`), so the next run's Content (J) score will reflect the new hero buttons.
- **Design:** Figma file https://www.figma.com/design/dLd7BEIKFWkEJz0swoWfOs. D1 Lakeside chosen (common-sense call per John). The template is being built on branch `ux-template` (Long Lake pilot).
- **Decisions made on common sense (2026-09-24):** DSC_0103 is Clear Creek's Raven Trail. Keep adults at public events; don't feature identifiable children. The loading screen is removed.
- **Still open:** D10 (weddings pick), D13 (emails), D14 (Washington acreage), D15 (duplicate Celina 301), camp items D4–D7 and D11.

## 2026-09-24 02:27 +07
- **Full UX protocol now exists:** `~/gameover/protocols/ux.md` plus the runner `~/gameover/protocols/ux/runner/ux-sweep.mjs`. The baseline run is `docs/ux-sweep/2026-09-24-baseline/report.md` (48 pages × 6 configs, local build, 18 min).
- **Baseline:** 0/48 pages meet every bar. Medians: A 100, B 100 (6/6 journeys pass), C 100, D 0, E 100, F 42, G 70, H 100, I 100, J 70.
- **Top fixes, in order of impact:**
  1. Leaflet map markers have no accessible name: 13,080 nodes on all 48 pages. The property map sits in the nav, so the fix is marker `title`/`alt` in `PropertyMap.tsx` (and `RestAreaMap.tsx`).
  2. Colour contrast: `text-white/40` (90), the nav `xl:inline` label (48), white on `bg-green-600` badges (45+).
  3. Home hero video `public/videos/hero.mp4` is 22 MB. Card images load at w=1920 on desktop (up to 887 KB each) because `next/image` has no `sizes`.
  4. LCP 10–13 s locally on the Big Bend, services and Iowa DOT pages. Check the hero images there.
  5. Phone tap targets: footer and menu links 32 px tall on every page (the open layout call).
  6. A raw `&apos;` on Yankee Springs ("recreation area&apos;s lakes").
  7. `/experiences/celina-lakes-recreation-area` is in the sitemap, but nothing links to it (it duplicates `/indian-celina-lakes-recreation-area`).
  8. Visual consistency: 17 button variants (target 3), 22 text colours (target 12), 11 font sizes (target 8). This needs the token pass (protocol D.02).
  9. Careers form: 34 name/address/phone/email fields have no `autocomplete`.
- **Nothing was changed on the site in this step.**

## 2026-09-24 00:57 +07
- **main = `a84e22b`** (plus this notes commit). Production deployment `dpl_FkSdZtPH6YBm6VKFXAuBRcsdN38s` is **READY**.
- **Release 4 is live.**
  - Chat mascot: fake "1" badge gone, 64×75 on phones, focus ring.
  - Services: "Select portfolio highlights" placeholder gone, accordions have `aria-expanded`.
  - Experience category cards have per-category labels (Size/Cost, Stays/Sites, …).
  - Home destination-card stats are spaced.
  - Washington is 2,157 acres on the home page and Services list.
  - Yankee Springs buttons say "Reserve at Chief Noonday / Long Lake".
  - Review form says "Utah and Iowa rest areas".
  - Kayak category hero is the Burlingame kayaks photo.
- **Verified with the Vercel MCP fetch**, one page at a time: `/`, `/services`, `/experiences/categories/{hiking,campground-rentals,kayak-and-watercraft-rentals}`, `/yankee-springs-recreation-area`, `/leave-a-review`, and the layout JS chunk for the mascot. **`vercel curl` now gets the Security Checkpoint too**, so use the MCP fetch.
- **Utah DOT "clipped headline" was not a bug.** It was a screenshot taken while scrolled. A fresh render has the h1 at 181 px, below the 105 px header.
- **Still open:** footer and mobile-menu tap targets (needs a layout call), DOT-page layout shift on tablet, Chief Noonday's slow frame with motion on, the dark category-hero icons, and the Monongahela navy stat band.
- **Waiting on the camp:** D4, D5, D6, D7, D11 (incl. Clear Creek 102 vs 105), D14 (Washington acreage).
- **Waiting on John:** D10 (weddings pick), D13 (which email addresses are real).

## 2026-09-24 00:31 +07
- **main = `41dd826`** (plus this RESUME commit). Production deployment `dpl_7ogfXidqjLCoHk8nCtrtoihv1TfJ` is **READY**.
- **Release 3 is live**, verified with `vercel curl` one page at a time (no crawling):
  - Generic Book buttons go to `/experiences`: nav, home ×3, rewards, category fallback. The experiences page's own button jumps to `#all-recreation-areas`.
  - Rewards is out of the top menu.
  - `/noindex1` and `/noindex2` send `noindex, nofollow`.
  - Recreation.gov counts: Tipsaw 49, Hardin Ridge 195, Spruce Knob 12 walk-in (42 total), Stuart 31, Celina 59.
  - Meramec's lodging tile names meramecpark.com.
  - Checked: `/`, `/noindex1`, `/noindex2`, `/experiences`, `/rewards`, `/tipsaw-…`, `/hardin-ridge-…`, `/hoosier-…`, `/…/spruce-knob-lake-campground`, `/…/stuart-recreation-area`, `/experiences/meramec-state-park`, `/experiences/categories/campground-rentals`. The leftover "200+ / 30+" matches are Yankee Springs' own figures in the menu (correct).
- **Not observable live:** the chat guide's system prompt (`api/treeko/route.ts`). It's deployed, but seeing it needs a chat request, which wasn't sent.
- **Open (no decision needed, design or polish):** audit findings 17–19 and 32–35, 37, 39.
- **Waiting on the camp:** D4 (map PDFs), D5 (Chief Noonday facilities), D6 (Bankhead dates), D7 (Corinth phone), D11 (may correct the Recreation.gov counts).
- **Waiting on John:** D9 (Small Business Connection sitemap/noindex, left alone per his instruction), D10 (weddings pick).
- **Booking side:** `for-booking-session.md`. The other session is on it. Leave it.

## 2026-09-24 00:11 +07
- **main = `870130f`**, pushed. Production deployment `dpl_CcJQZkvkk6T8eQFFQSc3YqE1LQZZ` is **READY**.
- **Verified live** with `vercel curl`, one page at a time. Vercel's Security Checkpoint challenges plain curl and headless browsers from this Mac after the crawl, so **don't crawl again**. Checked pages: `/`, `/chief-noonday-outdoor-center`, `/indian-celina-lakes-recreation-area`, `/tipsaw-…`, `/hardin-ridge-…`, `/bankhead-national-forest`, `/experiences/clear-creek-…`, `/experiences/celina-lakes-…`, `/experiences/categories/campground-rentals`, `/hoosier-…`, `/monongahela-…`, `/services/utah-dot`, `/services/iowa-dot`, `/contact`, `/careers`, the 404, the map chunk (OSM tiles) and the layout chunk (256 px mascot).
- **Not observable live:** the chat guide's system prompt (`api/treeko/route.ts`, Long Lake "16 cabins", Celina "59"). It's deployed in `870130f`, but seeing it needs a chat request, which wasn't sent.
- **Live now:** everything marked **Fixed** in `00-brand-site-audit.md`: 21 commits from `d7e3714` to `870130f`.
- **Open:** audit findings 17–19 and 32–39 (tap targets, DOT layout shift, mascot overlap, services placeholder text, category labels, Utah hero clip, minor copy).
- **Waiting on John:** decisions.md D1 (Book destination), D3 (weddings drafts indexable), D9 (Small Business Connection sitemap), D11 (campsite counts), D12 (Rewards in nav). D2 and D8 are information only.
- **Waiting on the camp:** D4 (map PDFs), D5 (Chief Noonday facilities), D6 (Bankhead dates), D7 (Corinth phone).
- **Booking side:** `for-booking-session.md` B1–B7. Not touched.
- Screenshots: `NN-*.png` in this folder, git-ignored (100 MB).

## 2026-09-23 23:27 +07
- Release 1 (`1e8d4c7`, 13 fixes) pushed and READY.
