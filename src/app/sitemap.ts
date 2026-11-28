import type { MetadataRoute } from 'next';
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { SITE_URL } from '@/lib/seo';
import { lastmodFor } from '@/lib/lastmod';
import { onlyListed } from '@/data/new-forests';
import lastmodJson from '@/data/lastmod.json';

type Freq = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

// [path, fallback lastmod, changeFrequency, priority]
// lastmod comes from src/data/lastmod.json (git commit dates via scripts/gen-lastmod.mjs) — the same
// value WebPage.dateModified uses — with the hand date as fallback. Never new Date().
const ROUTES: [string, string, Freq, number][] = [
  // Static pages
  ['/', '2026-04-24', 'weekly', 1],
  ['/about', '2026-04-24', 'monthly', 0.8],
  ['/contact', '2026-04-15', 'monthly', 0.8],
  ['/careers', '2026-04-15', 'weekly', 0.7],
  ['/services', '2026-09-17', 'monthly', 0.8],
  ['/pricing', '2026-11-28', 'monthly', 0.7],
  ['/experiences', '2026-04-24', 'weekly', 0.9],
  ['/privacy', '2026-03-21', 'yearly', 0.3],
  ['/refund_returns', '2026-03-21', 'yearly', 0.3],
  ['/sms-terms', '2026-03-21', 'yearly', 0.3],
  ['/leave-a-review', '2026-09-03', 'monthly', 0.6],
  ['/rewards', '2026-03-21', 'monthly', 0.5],
  ['/small-business-connection', '2026-09-02', 'monthly', 0.3],

  // Location pages (dedicated routes + [slug] fallbacks)
  ['/hoosier-national-forest', '2026-04-17', 'weekly', 0.8],
  ['/tipsaw-lake-recreation-area', '2026-04-24', 'weekly', 0.8],
  ['/hardin-ridge-recreation-area', '2026-04-17', 'weekly', 0.8],
  ['/indian-celina-lakes-recreation-area', '2026-04-24', 'weekly', 0.8],
  ['/yankee-springs-recreation-area', '2026-09-17', 'weekly', 0.8],
  ['/monongahela-national-forest', '2026-04-17', 'weekly', 0.8],
  ['/washington-state-park', '2026-04-24', 'weekly', 0.8],
  ['/long-lake-outdoor-center', '2026-04-25', 'weekly', 0.8],
  ['/long-lake-outdoor-center/weddings', '2026-10-13', 'monthly', 0.8],
  ['/chief-noonday-outdoor-center', '2026-05-09', 'weekly', 0.8],
  ['/bankhead-national-forest', '2026-09-17', 'weekly', 0.8],

  // New National Forests (listed once NEW_FORESTS_PUBLIC is true)
  ['/allegheny-national-forest', '2026-11-26', 'weekly', 0.8],
  ['/ozark-st-francis-national-forest', '2026-11-26', 'weekly', 0.8],
  ['/ozark-st-francis-national-forest/white-rock-mountain', '2026-11-26', 'weekly', 0.8],
  ['/rogue-river-siskiyou-national-forest', '2026-11-26', 'weekly', 0.8],

  // Monongahela campground sub-pages
  ['/monongahela-national-forest/big-bend-campground', '2026-04-24', 'monthly', 0.7],
  ['/monongahela-national-forest/gatewood-group-campground', '2026-04-24', 'monthly', 0.7],
  ['/monongahela-national-forest/jess-judy-group-campground', '2026-04-17', 'monthly', 0.7],
  ['/monongahela-national-forest/seneca-shadows-campground', '2026-04-17', 'monthly', 0.7],
  ['/monongahela-national-forest/spruce-knob-lake-campground', '2026-04-17', 'monthly', 0.7],
  ['/monongahela-national-forest/stuart-recreation-area', '2026-04-24', 'monthly', 0.7],

  // Service pages (services/[slug] + dedicated DOT pages)
  ['/services/campground-park-maintenance', '2026-03-26', 'monthly', 0.7],
  ['/services/landscaping-and-groundskeeping', '2026-03-26', 'monthly', 0.7],
  ['/services/rest-area-cleaning-and-upkeep', '2026-03-26', 'monthly', 0.7],
  ['/services/preventive-maintenance-and-repairs', '2026-03-26', 'monthly', 0.7],
  ['/services/iowa-dot', '2026-04-17', 'monthly', 0.7],
  ['/services/utah-dot', '2026-04-17', 'monthly', 0.7],

  // Experience pages (dedicated routes + experiences/[slug] fallback)
  ['/experiences/canal-bridge', '2026-04-14', 'weekly', 0.7],
  ['/experiences/corinth-recreation-area', '2026-04-17', 'weekly', 0.7],
  ['/experiences/meramec-state-park', '2026-04-17', 'weekly', 0.7],
  ['/experiences/celina-lakes-recreation-area', '2026-03-26', 'weekly', 0.7],
  ['/experiences/clear-creek-recreation-area', '2026-04-17', 'weekly', 0.7],
  ['/experiences/burlingame-state-park', '2026-04-14', 'weekly', 0.7],

  // Category pages (experiences/categories/[category])
  ['/experiences/categories/kayak-and-watercraft-rentals', '2026-04-14', 'monthly', 0.6],
  ['/experiences/categories/campground-rentals', '2026-04-14', 'monthly', 0.6],
  ['/experiences/categories/hiking', '2026-04-14', 'monthly', 0.6],
  ['/experiences/categories/scenic-drives', '2026-04-14', 'monthly', 0.6],
  ['/experiences/categories/conference-center-rentals', '2026-04-14', 'monthly', 0.6],
  ['/experiences/categories/lookout-pavillions', '2026-04-14', 'monthly', 0.6],
];

// —— Indexable PDF documents served from public/ ——————————————————————
// GSC (sc-domain:baserves.com, 28d) showed 22 /downloads PDFs and
// /employment-application.pdf earning impressions while the sitemap only
// listed HTML ROUTES — sibling Tier 1/2 sites list every indexable URL,
// baserves was the outlier (Nov 28 2026). Instead of chasing impressions,
// emit every real PDF in public/: all return HTTP 200 with no redirects,
// none are noindex/disallowed, and future park documents join the feed at
// the next release automatically. lastmod = git date from lastmod.json
// (gen-lastmod.mjs scans these files now), falling back to file mtime.
//
// Encoding note: Next serializes <loc> verbatim — no XML escaping, no URL
// encoding. Spaces must therefore be percent-encoded, and a raw `&` would
// produce invalid XML, so `&` is written as &amp;. The live host serves
// these files at paths containing a literal & (%26 in the path 404s), so
// the XML-decoded URL is exactly what Google already shows in GSC.
function walkPdfs(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) walkPdfs(p, out);
    else if (/\.pdf$/i.test(entry.name)) out.push(p);
  }
  return out;
}

function encodeDocPath(relPath: string): string {
  // encodeURIComponent escapes &, which the live server does NOT decode for
  // static files — put it back as a literal &, then XML-escape it for the feed.
  const encoded = relPath
    .split('/')
    .map((seg) => encodeURIComponent(seg).replace(/%26/gi, '&'))
    .join('/');
  return encoded.replace(/&/g, '&amp;');
}

function docLastmod(absFile: string, relFromPublic: string): Date {
  const gitDate = (lastmodJson.files as Record<string, string>)[`public/${relFromPublic}`];
  if (gitDate) return new Date(gitDate);
  try {
    return statSync(absFile).mtime;
  } catch {
    return new Date('2026-11-28');
  }
}

const PUBLIC_DIR = join(process.cwd(), 'public');

function documentEntries(): MetadataRoute.Sitemap[number][] {
  const seen = new Map<string, MetadataRoute.Sitemap[number]>();
  const files: string[] = walkPdfs(join(PUBLIC_DIR, 'downloads'));
  // Root-level documents (employment-application.pdf); never recurse images/videos.
  if (existsSync(PUBLIC_DIR)) {
    for (const e of readdirSync(PUBLIC_DIR, { withFileTypes: true })) {
      if (e.isFile() && /\.pdf$/i.test(e.name)) files.push(join(PUBLIC_DIR, e.name));
    }
  }
  for (const absFile of files) {
    const relFromPublic = relative(PUBLIC_DIR, absFile).split(sep).join('/');
    const isRoot = !relFromPublic.startsWith('downloads/');
    const [freq, priority] = isRoot ? (['yearly', 0.4] as const) : (['monthly', 0.6] as const);
    const url = `${SITE_URL}/${encodeDocPath(relFromPublic)}`;
    seen.set(url, { url, lastModified: docLastmod(absFile, relFromPublic), changeFrequency: freq, priority });
  }
  return Array.from(seen.values()).sort((a, b) => a.url.localeCompare(b.url));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = onlyListed(ROUTES, ([path]) => path).map(([path, lastmod, changeFrequency, priority]) => ({
    url: path === '/' ? SITE_URL : `${SITE_URL}${path}`,
    lastModified: lastmodFor(path, lastmod),
    changeFrequency,
    priority,
  }));
  return [...pages, ...documentEntries()];
}
