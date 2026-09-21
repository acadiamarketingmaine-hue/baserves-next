import type { PropertyContent } from '../types'

/**
 * Moved verbatim from the `washington-state-park` entry in
 * src/app/[slug]/page.tsx.
 *
 * NOTE: this slug also has a bespoke page at
 * src/app/washington-state-park/page.tsx, which wins the route. These values
 * are therefore NOT rendered anywhere today.
 */
export const washingtonStatePark: PropertyContent = {
  slug: 'washington-state-park',
  name: 'Washington State Park',
  tagline: 'Ancient Petroglyphs & Natural Beauty',
  locationLine: 'De Soto, MO',
  summary: "Discover Missouri's rich history and stunning landscapes",
  seo: {
    title: 'Washington State Park | BA Services',
    description:
      'Washington State Park, located along the Big River in Missouri, is renowned for its ancient Native American petroglyphs and diverse recreational opportunities. The park preserves over 350 prehistoric rock carvings, some dating back over 1,000 years, making it one of the most significant archaeological sites in the Midwest.',
  },
  hero: {
    src: '/images/Burlingame2-1536x1152.jpg',
    alt: 'Washington State Park',
  },
  gallery: [
    { src: '/images/Burlingame2-1536x1152.jpg', alt: 'Washington State Park gallery image 1' },
    { src: '/images/Burlingame1-2048x1365.jpg', alt: 'Washington State Park gallery image 2' },
    { src: '/images/long-lake/lodge.jpg', alt: 'Washington State Park gallery image 3' },
  ],
  paragraphs: [
    'Washington State Park, located along the Big River in Missouri, is renowned for its ancient Native American petroglyphs and diverse recreational opportunities. The park preserves over 350 prehistoric rock carvings, some dating back over 1,000 years, making it one of the most significant archaeological sites in the Midwest.',
    'Beyond its historical significance, the park offers excellent hiking trails, a swimming pool, and beautiful picnic areas. The campground provides both basic and electric sites nestled among the Ozark hills, perfect for families and outdoor enthusiasts looking to connect with nature and history.',
  ],
  features: [
    'Historic Petroglyphs',
    'Hiking',
    'Swimming Pool',
    'Camping',
    'Picnic Areas',
    'Nature Programs',
    'Fishing',
  ],
  stats: [
    { key: 'acres', value: '2,100+', label: 'acres' },
    { key: 'petroglyphs', value: '350+', label: 'petroglyphs' },
    { key: 'trails', value: '10+ miles', label: 'trails' },
  ],
  season: { isSeasonal: false },
  notices: [],
  ctas: {
    hero: {
      label: 'Book Your Stay',
      url: 'https://escape.baserves.com',
      kind: 'booking',
    },
    sidebar: {
      label: 'Check Availability',
      url: 'https://escape.baserves.com',
      kind: 'booking',
    },
  },
  sections: {},
}
