# baserves.com UX pass: resume point

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
