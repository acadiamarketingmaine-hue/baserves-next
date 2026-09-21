import type { PropertyContent } from '../types'

/**
 * Moved verbatim from the `chief-noonday-outdoor-center` entry in
 * src/app/[slug]/page.tsx.
 *
 * This is the ONLY slug in that map with no bespoke page shadowing it, so it is
 * the only content in this file that the [slug] template actually renders.
 */
export const chiefNoondayOutdoorCenter: PropertyContent = {
  slug: 'chief-noonday-outdoor-center',
  name: 'Chief Noonday Outdoor Center',
  tagline: 'Premier Group Camping in Michigan',
  locationLine: 'Middleville, MI',
  summary: 'Exceptional facilities for group outdoor adventures',
  seo: {
    title: 'Chief Noonday Outdoor Center | BA Services',
    description:
      'Chief Noonday Outdoor Center (CNOC) is a historic group camp and retreat facility located within Yankee Springs Recreation Area in Barry County, Michigan. Named for a prominent Potawatomi leader, the center reflects both the cultural heritage of the region and the legacy of early conservation efforts.',
  },
  hero: {
    src: '/images/chief-noonday/deer-lodge.jpg',
    alt: 'Chief Noonday Outdoor Center',
  },
  gallery: [
    {
      src: '/images/chief-noonday/deer-lodge.jpg',
      alt: 'Chief Noonday Outdoor Center gallery image 1',
    },
    {
      src: '/images/chief-noonday/long-house.jpg',
      alt: 'Chief Noonday Outdoor Center gallery image 2',
    },
    {
      src: '/images/chief-noonday/mess-hall.jpg',
      alt: 'Chief Noonday Outdoor Center gallery image 3',
    },
  ],
  paragraphs: [
    'Chief Noonday Outdoor Center (CNOC) is a historic group camp and retreat facility located within Yankee Springs Recreation Area in Barry County, Michigan. Named for a prominent Potawatomi leader, the center reflects both the cultural heritage of the region and the legacy of early conservation efforts.',
    "Originally developed in 1938 as part of the National Park Service's Recreation Demonstration Area program, the site is listed on the National Register of Historic Places. Its layout and architecture follow a naturalistic design philosophy, integrating buildings with the surrounding terrain.",
    'The facility includes multiple cabin clusters, a central lodge, dining and gathering spaces, and expansive outdoor areas suited for scout outings, church retreats, family reunions, and team-building programs.',
    'Currently four semi-rustic cabins are available along Chief Noonday Lake: Bear Den (sleeps 6, stone fireplace, three bunk beds), Chickadee Cabin (sleeps 4, two bunk beds), Crane House/Jee-Jak Wigwam (sleeps 8, stone fireplace, three bunk beds, roll-out bed), and Deer Lodge (sleeps 8, stone fireplace, three bunk beds, roll-out bed). Each cabin includes electricity, electric heat, mini fridge, microwave, coffee maker. Outdoor features include picnic table, fire pit, grill, with hand water pump and vault toilet nearby.',
  ],
  features: [
    'Group Cabins',
    'Dining Hall',
    'Meeting Spaces',
    'Lake Access',
    'Hiking Trails',
    'Campfire Areas',
    'Sports Fields',
  ],
  stats: [
    { key: 'capacity', value: '300+ guests', label: 'capacity' },
    { key: 'cabins', value: '12+', label: 'cabins' },
    { key: 'acres', value: '100+', label: 'acres' },
  ],
  season: { isSeasonal: false },
  notices: [],
  ctas: {
    hero: {
      label: 'Book Your Stay',
      url: 'https://escape.baserves.com/chief-noonday-outdoor-center',
      kind: 'booking',
    },
    sidebar: {
      label: 'Check Availability',
      url: 'https://escape.baserves.com/chief-noonday-outdoor-center',
      kind: 'booking',
    },
  },
  sections: {},
  phone: '616-644-9459',
}
