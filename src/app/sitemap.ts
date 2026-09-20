import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

type Freq = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

// [path, lastmod (git commit date of the page file), changeFrequency, priority]
// Keep lastmod stable — never new Date() — so Google trusts the value.
const ROUTES: [string, string, Freq, number][] = [
  // Static pages
  ['/', '2026-04-24', 'weekly', 1],
  ['/about', '2026-04-24', 'monthly', 0.8],
  ['/contact', '2026-04-15', 'monthly', 0.8],
  ['/careers', '2026-04-15', 'weekly', 0.7],
  ['/services', '2026-09-17', 'monthly', 0.8],
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
  ['/chief-noonday-outdoor-center', '2026-05-09', 'weekly', 0.8],
  ['/bankhead-national-forest', '2026-09-17', 'weekly', 0.8],

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

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(([path, lastmod, changeFrequency, priority]) => ({
    url: path === '/' ? SITE_URL : `${SITE_URL}${path}`,
    lastModified: new Date(lastmod),
    changeFrequency,
    priority,
  }));
}
