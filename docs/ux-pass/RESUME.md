# baserves.com UX pass: resume point

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
