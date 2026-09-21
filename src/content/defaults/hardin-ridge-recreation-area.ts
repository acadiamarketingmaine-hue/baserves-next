import type { PropertyContent } from '../types'

/**
 * Moved verbatim from the `hardin-ridge-recreation-area` entry in
 * src/app/[slug]/page.tsx.
 *
 * NOTE: this slug also has a bespoke page at
 * src/app/hardin-ridge-recreation-area/page.tsx, which wins the route. These
 * values are therefore NOT rendered anywhere today.
 */
export const hardinRidgeRecreationArea: PropertyContent = {
  slug: 'hardin-ridge-recreation-area',
  name: 'Hardin Ridge Recreation Area',
  tagline: 'Lakeside Camping on Monroe Lake',
  locationLine: 'Monroe County, IN | Hoosier National Forest',
  summary: "Experience the beauty of Indiana's largest lake",
  seo: {
    title: 'Hardin Ridge Recreation Area | BA Services',
    description:
      "Located on the shores of Monroe Lake, Indiana's largest man-made lake, Hardin Ridge Recreation Area offers an exceptional outdoor experience in the heart of Hoosier National Forest. The area features beautiful wooded campsites, a swimming beach, and direct access to over 10,000 acres of water.",
  },
  hero: {
    src: '/images/DSC_0103-2048x1365.jpg',
    alt: 'Hardin Ridge Recreation Area',
  },
  gallery: [
    { src: '/images/DSC_0103-2048x1365.jpg', alt: 'Hardin Ridge Recreation Area gallery image 1' },
    {
      src: '/images/monongahela/spruce-knob-panorama.jpg',
      alt: 'Hardin Ridge Recreation Area gallery image 2',
    },
    { src: '/images/DSC_0001-2048x1365.jpg', alt: 'Hardin Ridge Recreation Area gallery image 3' },
  ],
  paragraphs: [
    "Located on the shores of Monroe Lake, Indiana's largest man-made lake, Hardin Ridge Recreation Area offers an exceptional outdoor experience in the heart of Hoosier National Forest. The area features beautiful wooded campsites, a swimming beach, and direct access to over 10,000 acres of water.",
    "Whether you're looking to spend a weekend fishing, hiking the surrounding trails, or simply enjoying the tranquil lake views, Hardin Ridge provides the perfect setting. The campground offers both electric and non-electric sites, accommodating everything from tent campers to large RVs.",
  ],
  features: [
    'Boating',
    'Fishing',
    'Swimming Beach',
    'Hiking',
    'RV & Tent Camping',
    'Picnic Shelters',
    'Boat Ramp',
  ],
  stats: [
    { key: 'campsites', value: '200+', label: 'campsites' },
    { key: 'lakeSize', value: '10,750 acres', label: 'lake Size' },
    { key: 'trails', value: '12+ miles', label: 'trails' },
  ],
  season: { isSeasonal: false },
  notices: [],
  ctas: {
    hero: {
      label: 'Book Your Stay',
      url: 'https://www.recreation.gov/camping/campgrounds/232056',
      kind: 'booking',
    },
    sidebar: {
      label: 'Check Availability',
      url: 'https://www.recreation.gov/camping/campgrounds/232056',
      kind: 'booking',
    },
  },
  sections: {},
}
