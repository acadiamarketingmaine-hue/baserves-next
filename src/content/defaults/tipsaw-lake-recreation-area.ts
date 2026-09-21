import type { PropertyContent } from '../types'

/**
 * Moved verbatim from the `tipsaw-lake-recreation-area` entry in
 * src/app/[slug]/page.tsx.
 *
 * NOTE: this slug also has a bespoke page at
 * src/app/tipsaw-lake-recreation-area/page.tsx, which wins the route. These
 * values are therefore NOT rendered anywhere today.
 */
export const tipsawLakeRecreationArea: PropertyContent = {
  slug: 'tipsaw-lake-recreation-area',
  name: 'Tipsaw Lake Recreation Area',
  tagline: 'Scenic Lakeside Camping & Outdoor Adventure in Indiana',
  locationLine: 'Perry County, IN | Hoosier National Forest',
  summary: 'A perfect getaway for families, anglers, and outdoor enthusiasts',
  seo: {
    title: 'Tipsaw Lake Recreation Area | BA Services',
    description:
      'Nestled in the heart of Hoosier National Forest, Tipsaw Lake Recreation Area offers a serene escape into nature. With 131 acres of pristine lake waters and over 8 miles of scenic trails, this destination provides the perfect backdrop for your outdoor adventures.',
  },
  hero: {
    src: '/images/DSC_0001-2048x1365.jpg',
    alt: 'Tipsaw Lake Recreation Area',
  },
  gallery: [
    { src: '/images/DSC_0001-2048x1365.jpg', alt: 'Tipsaw Lake Recreation Area gallery image 1' },
    { src: '/images/DSC_0103-2048x1365.jpg', alt: 'Tipsaw Lake Recreation Area gallery image 2' },
    {
      src: '/images/monongahela/spruce-knob-panorama.jpg',
      alt: 'Tipsaw Lake Recreation Area gallery image 3',
    },
  ],
  paragraphs: [
    'Nestled in the heart of Hoosier National Forest, Tipsaw Lake Recreation Area offers a serene escape into nature. With 131 acres of pristine lake waters and over 8 miles of scenic trails, this destination provides the perfect backdrop for your outdoor adventures.',
    "Whether you're casting a line for bass and bluegill, hiking through the rolling hills, or simply relaxing by the water, Tipsaw Lake delivers an authentic Indiana wilderness experience. Our well-maintained campsites accommodate both tent campers and RV enthusiasts, with modern amenities that don't compromise the natural beauty.",
  ],
  features: [
    'Boating',
    'Fishing',
    'Hiking',
    'Swimming',
    'RV & Tent Camping',
    'Picnic Areas',
    'Wildlife Viewing',
  ],
  stats: [
    { key: 'campsites', value: '35+', label: 'campsites' },
    { key: 'lakeSize', value: '131 acres', label: 'lake Size' },
    { key: 'trails', value: '8+ miles', label: 'trails' },
  ],
  season: { isSeasonal: false },
  notices: [],
  ctas: {
    hero: {
      label: 'Book Your Stay',
      url: 'https://www.recreation.gov/camping/campgrounds/232114',
      kind: 'booking',
    },
    sidebar: {
      label: 'Check Availability',
      url: 'https://www.recreation.gov/camping/campgrounds/232114',
      kind: 'booking',
    },
  },
  sections: {},
}
