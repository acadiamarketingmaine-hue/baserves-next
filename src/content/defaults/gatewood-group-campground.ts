import type { PropertyContent } from '../types'

/**
 * Moved verbatim out of
 * src/app/monongahela-national-forest/gatewood-group-campground/page.tsx.
 *
 * One of the six Cheat-Potomac campground pages, which all share a single
 * bespoke layout. The page is at /monongahela-national-forest/gatewood-group-campground,
 * not at /<slug>, so SLUG_TEMPLATE_SLUGS keeps /gatewood-group-campground answering 404
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
export const gatewoodGroupCampground: PropertyContent = {
  slug: 'gatewood-group-campground',
  name: 'Gatewood Group Campground',
  tagline: 'Secluded Group Retreat in the National Forest',
  locationLine: '',
  summary: 'Gatewood Group Campground offers a secluded group camping experience within the Monongahela National Forest. Designed for organized groups, the campground provi',
  seo: {
    title: 'Gatewood Group Campground | Monongahela National Forest | BA Services',
    description: 'Gatewood Group Campground offers a secluded group camping experience within the Monongahela National Forest. Designed for organized groups, the campground provi',
  },
  hero: {
    src: '/images/monongahela/entrance-sign.jpg',
    alt: '',
  },
  gallery: [],
  paragraphs: [
    'Gatewood Group Campground offers a secluded and rustic group camping experience within the Monongahela National Forest. Situated on a ridge at a former fire tower site, the campground provides a quiet, elevated setting surrounded by forest, ideal for organized groups seeking privacy and a back-to-basics outdoor experience.',
    'Located approximately two miles east of Spruce Knob Lake Campground at the end of Forest Road 131, access to Gatewood is controlled by a gated road, which is unlocked for visitors with a valid reservation. The campground\'s remote location enhances its sense of isolation while still providing access to nearby recreational opportunities, including fishing at Spruce Knob Lake and along Gandy Creek.',
    'The campground features a single reservable group site that can accommodate up to approximately 30 people. Facilities include fire rings, picnic tables, and two single-unit vault restrooms. As a primitive site, there is no electric service or drinking water available, and the campground is not ADA accessible.',
    'Trash bins are provided for waste collection; however, there are no RV dump stations on-site. Gatewood Group Campground typically operates from mid-April through late October, aligning with the primary recreation season in the region.',
  ],
  features: [
    'Reservable group sites',
    'Secluded forest setting',
    'Picnic and gathering areas',
    'Vault restrooms',
    'Campfire rings',
    'Nearby hiking trails',
  ],
  stats: [
    { key: 'type', value: 'Group Only', label: 'Type' },
    { key: 'setting', value: 'Secluded Forest', label: 'Setting' },
    { key: 'season', value: 'May–Oct', label: 'Season' },
  ],
  season: {
    isSeasonal: true,
    note: 'Gatewood Group Campground typically operates from mid-April through late October, aligning with the primary recreation season in the region.',
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
      url: 'https://www.recreation.gov/camping/campgrounds/233990',
      kind: 'booking',
    },
    reserve: {
      label: 'Reserve Your Site',
      url: 'https://www.recreation.gov/camping/campgrounds/233990',
      kind: 'booking',
    },
    footer: {
      label: 'Book on Recreation.gov',
      url: 'https://www.recreation.gov/camping/campgrounds/233990',
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
      heading: 'About Gatewood Group Campground',
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
