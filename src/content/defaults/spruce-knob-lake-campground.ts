import type { PropertyContent } from '../types'

/**
 * Moved verbatim out of
 * src/app/monongahela-national-forest/spruce-knob-lake-campground/page.tsx.
 *
 * One of the six Cheat-Potomac campground pages, which all share a single
 * bespoke layout. The page is at /monongahela-national-forest/spruce-knob-lake-campground,
 * not at /<slug>, so SLUG_TEMPLATE_SLUGS keeps /spruce-knob-lake-campground answering 404
 * exactly as it does today.
 *
 * `locationLine` is empty and `gallery` is empty because this layout renders
 * neither: the entrance-sign photograph behind the hero (with an empty alt,
 * as a decorative background) is its only image.
 *
 * VERBATIM WART, do not "fix": the SEO description is cut off mid-sentence in
 * the source and really does end that way in the rendered <meta> tag and in
 * the page's JSON-LD. Recorded in design-audit/website-editor-inventory.md.
 */
export const spruceKnobLakeCampground: PropertyContent = {
  slug: 'spruce-knob-lake-campground',
  name: 'Spruce Knob Lake Campground',
  tagline: 'High-Elevation Camping Near West Virginia\'s Highest Peak',
  locationLine: '',
  summary: 'Spruce Knob Lake Campground is perched at high elevation near the summit of Spruce Knob — the highest point in West Virginia at 4,863 feet. The campground surro',
  seo: {
    title: 'Spruce Knob Lake Campground | Monongahela National Forest | BA Services',
    description: 'Spruce Knob Lake Campground is perched at high elevation near the summit of Spruce Knob — the highest point in West Virginia at 4,863 feet. The campground surro',
  },
  hero: {
    src: '/images/monongahela/entrance-sign.jpg',
    alt: '',
  },
  gallery: [],
  paragraphs: [
    'Spruce Knob Lake Campground is located at high elevation near Spruce Knob, the highest point in West Virginia at 4,863 feet. Surrounded by red spruce forests and the rugged terrain of the Allegheny Mountains, the campground offers a cool, quiet retreat with access to panoramic views, the Spruce Knob summit, and the extensive Spruce Knob–Seneca Creek Backcountry, which features more than 60 miles of trails for hiking and exploration.',
    'At the heart of the campground is Spruce Knob Lake, a 25-acre impoundment originally constructed in 1952 for fishing and regularly stocked with trout by the West Virginia Division of Natural Resources. The lake also supports abundant shoreline fishing for bluegill, making it especially appealing for beginning anglers. Non-motorized boats and electric trolling motors are permitted, and facilities include a small boat launch, parking area, and a wooden fishing pier that provides barrier-free access. Additional fishing opportunities can be found nearby along Gandy Creek.',
    'Spruce Knob Lake Campground includes 28 standard campsites, 2 double sites, and 10 walk-in tent sites. Standard sites are equipped with paved spurs, picnic tables, fire rings, and lantern posts. A developed host site provides solar-powered electricity, water, and a sewage holding tank. Sanitary facilities consist of five single-unit vault restrooms, all of which are accessible. Trash dumpsters are available throughout the campground for waste disposal.',
    'There are no RV dump stations at Spruce Knob Lake Campground which typically operates from mid-April through late October, aligning with peak seasonal demand.',
  ],
  features: [
    'Mountain lake setting',
    'Near WV highest point (4,863 ft)',
    'Fishing in Spruce Knob Lake',
    'Hiking to Spruce Knob summit',
    'Vault restrooms',
    'Cool high-elevation climate',
  ],
  stats: [
    { key: 'sites', value: '42', label: 'Sites' },
    { key: 'elevation', value: '~4,000 ft', label: 'Elevation' },
    { key: 'season', value: 'May–Oct', label: 'Season' },
  ],
  season: {
    isSeasonal: true,
    note: 'There are no RV dump stations at Spruce Knob Lake Campground which typically operates from mid-April through late October, aligning with peak seasonal demand.',
  },
  notices: [],
  ctas: {
    parentForest: {
      label: 'Monongahela National Forest',
      url: '/monongahela-national-forest',
      kind: 'internal',
    },
    hero: {
      label: 'Book on Recreation.gov',
      url: 'https://www.recreation.gov/camping/campgrounds/234132',
      kind: 'booking',
    },
    reserve: {
      label: 'Reserve Your Site',
      url: 'https://www.recreation.gov/camping/campgrounds/234132',
      kind: 'booking',
    },
    footer: {
      label: 'Book on Recreation.gov',
      url: 'https://www.recreation.gov/camping/campgrounds/234132',
      kind: 'booking',
    },
    footerBack: {
      label: 'Back to Monongahela NF',
      url: '/monongahela-national-forest',
      kind: 'internal',
    },
  },
  sections: {
    about: {
      heading: 'About Spruce Knob Lake Campground',
    },
    features: {
      heading: 'Features & Amenities',
    },
    closingCta: {
      heading: 'Ready to Visit?',
      intro:
        'Reservations are managed through Recreation.gov. Book your campsite today and experience the Monongahela National Forest.',
    },
  },
}
