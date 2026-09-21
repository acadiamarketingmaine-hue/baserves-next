import type { PropertyContent } from '../types'

/**
 * Moved verbatim from the `monongahela-national-forest` entry in
 * src/app/[slug]/page.tsx.
 *
 * NOTE: this slug also has a bespoke page at
 * src/app/monongahela-national-forest/page.tsx, which wins the route. These
 * values are therefore NOT rendered anywhere today.
 */
export const monongahelaNationalForest: PropertyContent = {
  slug: 'monongahela-national-forest',
  name: 'Monongahela National Forest',
  tagline: 'Wild & Wonderful West Virginia',
  locationLine: 'Eastern West Virginia',
  summary: 'Over 900,000 acres of Appalachian wilderness',
  seo: {
    title: 'Monongahela National Forest | BA Services',
    description:
      'The Monongahela National Forest spans over 900,000 acres across the Allegheny Mountains of eastern West Virginia. This vast wilderness area is home to some of the most diverse ecosystems in the eastern United States, featuring spruce forests, highland bogs, and pristine mountain streams.',
  },
  hero: {
    src: '/images/monongahela/entrance-sign.jpg',
    alt: 'Monongahela National Forest',
  },
  gallery: [
    {
      src: '/images/monongahela/entrance-sign.jpg',
      alt: 'Monongahela National Forest gallery image 1',
    },
    {
      src: '/images/monongahela/spruce-knob-panorama.jpg',
      alt: 'Monongahela National Forest gallery image 2',
    },
    {
      src: '/images/monongahela/scenic-drive.jpg',
      alt: 'Monongahela National Forest gallery image 3',
    },
    {
      src: '/images/monongahela/spruce-knob-sign.jpg',
      alt: 'Monongahela National Forest gallery image 4',
    },
    {
      src: '/images/monongahela/seneca-rocks-sign.jpg',
      alt: 'Monongahela National Forest gallery image 5',
    },
    {
      src: '/images/monongahela/spruce-treetops.jpg',
      alt: 'Monongahela National Forest gallery image 6',
    },
  ],
  paragraphs: [
    'The Monongahela National Forest spans over 900,000 acres across the Allegheny Mountains of eastern West Virginia. This vast wilderness area is home to some of the most diverse ecosystems in the eastern United States, featuring spruce forests, highland bogs, and pristine mountain streams.',
    "Visitors can explore hundreds of miles of hiking trails, including portions of the Allegheny Trail and numerous wilderness areas. The forest offers exceptional opportunities for camping, fishing, hunting, rock climbing, and wildlife viewing. Several developed campgrounds provide convenient access to the forest's most scenic areas.",
  ],
  features: [
    'Hiking',
    'Camping',
    'Fishing',
    'Rock Climbing',
    'Wildlife Viewing',
    'Scenic Drives',
    'Winter Sports',
  ],
  stats: [
    { key: 'acres', value: '900,000+', label: 'acres' },
    { key: 'trails', value: '800+ miles', label: 'trails' },
    { key: 'wilderness', value: '5 areas', label: 'wilderness' },
  ],
  season: { isSeasonal: false },
  notices: [],
  ctas: {
    hero: {
      label: 'Book Your Stay',
      url: 'https://www.recreation.gov/gateways/1090',
      kind: 'booking',
    },
    sidebar: {
      label: 'Check Availability',
      url: 'https://www.recreation.gov/gateways/1090',
      kind: 'booking',
    },
  },
  sections: {},
}
