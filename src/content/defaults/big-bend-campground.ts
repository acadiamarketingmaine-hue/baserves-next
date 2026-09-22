import type { PropertyContent } from '../types'

/**
 * Moved verbatim out of
 * src/app/monongahela-national-forest/big-bend-campground/page.tsx.
 *
 * One of the six Cheat-Potomac campground pages, which all share a single
 * bespoke layout. The page is at /monongahela-national-forest/big-bend-campground,
 * not at /<slug>, so SLUG_TEMPLATE_SLUGS keeps /big-bend-campground answering 404
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
export const bigBendCampground: PropertyContent = {
  slug: 'big-bend-campground',
  name: 'Big Bend Campground',
  tagline: 'Riverside Camping on the South Branch Potomac',
  locationLine: '',
  summary: 'Big Bend Campground is nestled in a sweeping bend of the South Branch Potomac River within the Monongahela National Forest. The campground offers a mix of tent ',
  seo: {
    title: 'Big Bend Campground | Monongahela National Forest | BA Services',
    description: 'Big Bend Campground is nestled in a sweeping bend of the South Branch Potomac River within the Monongahela National Forest. The campground offers a mix of tent ',
  },
  hero: {
    src: '/images/monongahela/entrance-sign.jpg',
    alt: '',
  },
  gallery: [],
  paragraphs: [
    'Nestled in a sweeping bend of the South Branch of the Potomac River, Big Bend Campground is located within Smoke Hole Canyon in the Monongahela National Forest, approximately 10 miles southwest of Petersburg, West Virginia, at the end of County Route 2. Surrounded by a lush hardwood forest, the campground offers a tranquil, scenic setting with the river just 200 feet away, providing easy access for fishing, swimming, tubing, and non-motorized boating.',
    'Big Bend features 46 standard non-electric campsites, each equipped with a fire ring, lantern post, picnic table, and paved spur suitable for both tent and RV camping. Portions of the campground and select facilities are ADA accessible, supporting a range of visitors\' needs.',
    'Recreational opportunities extend beyond the campground itself. A one-mile loop trail is available onsite, while the nearby Seneca Creek Backcountry and Smoke Hole Canyon offer access to more than 60 miles of additional trails for hiking and exploration.',
    'Facilities at Big Bend are well-developed and include two single-unit vault toilets, two double-unit flush toilets, and a four-unit flush restroom with showers, some of which are accessible. Trash dumpsters are conveniently located throughout the campground loops for waste disposal. An RV dump station with an underground holding tank is located adjacent to the campground, supported by an on-site wastewater treatment system (filtered drain field).',
    'The campground typically operates from early April through the end of October, aligning with the primary recreation season in the region.',
  ],
  features: [
    'Riverside campsites',
    'Fishing and swimming access',
    'Picnic areas and grills',
    'Vault restrooms',
    'Hiking trail access',
    'Wildlife viewing',
  ],
  stats: [
    { key: 'sites', value: '46', label: 'Sites' },
    { key: 'river', value: 'S. Branch Potomac', label: 'River' },
    { key: 'season', value: 'Apr–Nov', label: 'Season' },
  ],
  season: {
    isSeasonal: true,
    note: 'The campground typically operates from early April through the end of October, aligning with the primary recreation season in the region.',
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
      url: 'https://www.recreation.gov/camping/campgrounds/232019',
      kind: 'booking',
    },
    reserve: {
      label: 'Reserve Your Site',
      url: 'https://www.recreation.gov/camping/campgrounds/232019',
      kind: 'booking',
    },
    footer: {
      label: 'Book on Recreation.gov',
      url: 'https://www.recreation.gov/camping/campgrounds/232019',
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
      heading: 'About Big Bend Campground',
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
