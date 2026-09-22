import type { PropertyContent } from '../types'

/**
 * Moved verbatim out of
 * src/app/monongahela-national-forest/jess-judy-group-campground/page.tsx.
 *
 * One of the six Cheat-Potomac campground pages, which all share a single
 * bespoke layout. The page is at /monongahela-national-forest/jess-judy-group-campground,
 * not at /<slug>, so SLUG_TEMPLATE_SLUGS keeps /jess-judy-group-campground answering 404
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
export const jessJudyGroupCampground: PropertyContent = {
  slug: 'jess-judy-group-campground',
  name: 'Jess Judy Group Campground',
  tagline: 'Group Camping in the Allegheny Highlands',
  locationLine: '',
  summary: 'Jess Judy Group Campground provides dedicated group camping facilities in the heart of the Monongahela National Forest. Ideal for scout troops, family reunions,',
  seo: {
    title: 'Jess Judy Group Campground | Monongahela National Forest | BA Services',
    description: 'Jess Judy Group Campground provides dedicated group camping facilities in the heart of the Monongahela National Forest. Ideal for scout troops, family reunions,',
  },
  hero: {
    src: '/images/monongahela/entrance-sign.jpg',
    alt: '',
  },
  gallery: [],
  paragraphs: [
    'Jess Judy Group Campground is a primitive group camping area located in Smoke Hole Canyon along State Route 2, just south of Big Bend Campground and adjacent to the South Branch of the Potomac River. Set within the hardwood forests of the Allegheny Mountains, the site provides a quiet, natural setting well-suited for organized groups.',
    'Designed to accommodate larger gatherings, the campground features three reservable group sites, each capable of hosting up to 40 people. It is an ideal location for scout troops, family reunions, church groups, and outdoor education programs seeking a more rustic experience.',
    'Each site is equipped with fire rings, picnic tables, and lantern posts. The campground also includes four single-unit vault toilets. As a primitive facility, Jess Judy does not offer electric service or on-site drinking water; however, potable water and a dump station are available nearby at Big Bend Campground. The dump station includes an underground holding tank and is supported by a wastewater treatment system (filtered drain field).',
    'Recreational opportunities are abundant in the surrounding area. The nearby river provides excellent fishing and canoeing, while the North Fork Mountain Trail—located close by—offers outstanding hiking and mountain biking. Additional trail access can be found throughout Smoke Hole Canyon.',
    'The campground is not accessible and typically operates from early April through the end of October, aligning with the primary recreation season in the region.',
  ],
  features: [
    'Reservable group sites',
    'Large capacity for organizations',
    'Picnic pavilions',
    'Vault restrooms',
    'Campfire rings',
    'Forest trail access',
  ],
  stats: [
    { key: 'type', value: 'Group Only', label: 'Type' },
    { key: 'capacity', value: 'Large Groups', label: 'Capacity' },
    { key: 'season', value: 'May–Oct', label: 'Season' },
  ],
  season: {
    isSeasonal: true,
    note: 'The campground is not accessible and typically operates from early April through the end of October, aligning with the primary recreation season in the region.',
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
      url: 'https://www.recreation.gov/camping/campgrounds/233725',
      kind: 'booking',
    },
    reserve: {
      label: 'Reserve Your Site',
      url: 'https://www.recreation.gov/camping/campgrounds/233725',
      kind: 'booking',
    },
    footer: {
      label: 'Book on Recreation.gov',
      url: 'https://www.recreation.gov/camping/campgrounds/233725',
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
      heading: 'About Jess Judy Group Campground',
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
