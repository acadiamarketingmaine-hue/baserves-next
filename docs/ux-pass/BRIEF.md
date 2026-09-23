# baserves.com UI/UX pass: brief for a separate session

Written Sep 23 2026. A second Claude session owns escape.baserves.com (the booking site). **This
session owns baserves.com only.** Start with: "Read ~/Downloads/baserves-next/docs/ux-pass/BRIEF.md and run it."

## 0. Boundaries (read first)

- **Your repo:** `~/Downloads/baserves-next` (GitHub `acadiamarketingmaine-hue/baserves-next`, Vercel project
  `baserves-next`, live at baserves.com). Main was `2131a04` when this was written. Work on a branch or a worktree.
- **Hands off:** `~/Downloads/citation-bot/booking-system` (escape.baserves.com). The other session is releasing
  there. If you find a booking-site problem (including anything past the "Book" hand-off), write it in
  `docs/ux-pass/for-booking-session.md` and don't fix it. `~/Downloads/ba-services-bookings` is a dead clone. Ignore it.
- Before editing, run `git status` and `stat -f '%Sm %N' src/app/page.tsx` to check that nobody else is mid-edit.
- **Never send email or messages to anyone.** Write drafts only. Anything the camp or John must decide goes in
  `docs/ux-pass/decisions.md`. Don't guess.
- In chat, tell John only what he must act on now. Everything else goes in the notes files.

## 1. Settled rules (don't re-ask, don't undo)

- **Missouri parks stay listed.** Meramec and Washington State Park stay in the nav, the listings and
  the sitemap. Their pages redirect to mostateparks.com (`next.config.js`). John confirmed this is correct.
- **The content layer is live.** 17 pages read their copy from `src/content/defaults/` (list in
  `src/content/slugs.ts`, `CONVERTED_SLUGS`). On those pages, change copy in the defaults, not the JSX. Keep
  markup and class order byte-identical where a test or snapshot expects it. Read `docs/content-editor.md` first.
  `npm test` includes the editable-slug test.
- **Facts come from data or the client.** Never invent capacity, prices, dates, amenities, phone numbers or
  claims. Where a claim can't be verified, remove or soften it and log it in decisions.md.
- **Don't change SEO plumbing.** Leave canonicals, `robots.ts`, `sitemap.ts`, redirects and slugs alone. Don't delete images.
- **Weddings page:** two finished drafts have been waiting on John's pick since Sep 16. Don't publish either one.
  Note it in decisions.md.

## 2. Known leads (verify each one; they may already be fixed)

- Home chatbot/stat card claims Chief Noonday capacity **"150+"** (`src/components/HomeClient.tsx:92,318`).
  Booking data says 4 units sleeping 26. Check before changing.
- Bankhead copy says **"open year-round"** (the Michigan pages were fixed; Bankhead wasn't).
- A **"MOTEL" badge label** on a listing card looks wrong.
- Bankhead is missing its **Recreation.gov links**.
- **Guests get lost between baserves.com and escape.baserves.com.** No code bridges the two domains. Audit every
  "Book / Reserve" path from the brand site: where it lands, whether it's the right property/unit, and whether
  there's a way back. Fix the brand side. Log the booking side.
- The Sanity scaffold in `src/sanity` has zero call sites. It's out of scope for this pass. Don't wire it up.

## 3. Method (same format as the booking-site audit)

Template to copy: `~/Downloads/citation-bot/booking-system/design-audit/ux/public/00-public-booking-audit.md`
(read it, don't edit it). Produce `docs/ux-pass/00-brand-site-audit.md` with:

1. **Walk it like a guest** at phone 390x844, tablet 820x1180 and desktop 1440x900. Cover the home page, every property
   page, experiences, services, weddings, about/contact/careers/rewards, the 404 page, and every Book/Reserve hand-off.
   Save screenshots as `docs/ux-pass/NN-name-phone.png`.
2. **Ranked findings table:** # · Sev · Screen · Size · What a guest sees · What should happen · file:line ·
   screenshot. S1 = misleads or blocks a guest (false facts, dead or wrong links, broken booking hand-off).
   S2 = real friction (mobile layout, tap targets under 44px, missing labels/focus, slow images, contradictory copy).
   S3 = polish.
3. **Measure, don't eyeball:** console errors, broken links (check every internal href plus the escape.* links), image
   weights, CLS, and tap targets. For motion, run `node ~/Downloads/site-finish-manual/jank-probe.mjs <url>` and
   `motion-probe.mjs` (see `~/Downloads/site-finish-manual/README.md`). John's Mac has Reduce Motion on,
   so emulate both settings.
4. Add sections for **Quick wins** (each under an hour), **Needs design** and **Needs John/camp** (→ decisions.md).

## 4. Fixing and releasing

- Fix the S1s and the quick wins. Make one small commit per finding, and write each message as a plain sentence
  about the guest-visible problem (match `git log` tone, e.g. "Three search links went nowhere").
- Before merging, run `npx tsc --noEmit -p .`, `npm test` and `npx next build`. Show exit status and error lines only.
- Release: fast-forward `main`, push, then confirm through the Vercel API that the production deployment for that
  commit sha is READY. Then fetch every changed page on baserves.com and confirm the change is live. Never say
  "fixed" until the live page shows it.
- Keep `docs/ux-pass/RESUME.md` current: main sha, what's live, what's open, and what's waiting on John.
  Put a timestamp on each entry (`date`).

## 5. Done means

The audit doc is written. All S1s are fixed and verified live, or logged in decisions.md with the reason. Quick wins
are shipped. for-booking-session.md lists every hand-off problem on the booking side. RESUME.md is current.
