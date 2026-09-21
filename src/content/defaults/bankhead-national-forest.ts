import type { PropertyContent } from '../types'

/**
 * Moved verbatim from the `bankhead-national-forest` entry in
 * src/app/[slug]/page.tsx.
 *
 * NOTE: this slug also has a bespoke page at
 * src/app/bankhead-national-forest/page.tsx, which wins the route. These values
 * are therefore NOT rendered anywhere today.
 */
export const bankheadNationalForest: PropertyContent = {
  slug: 'bankhead-national-forest',
  name: 'Bankhead National Forest',
  tagline: "Alabama's Land of a Thousand Waterfalls",
  locationLine: 'Lawrence, Winston & Franklin Counties, AL',
  summary: 'Explore canyons, waterfalls, pristine wilderness, and incredible birding',
  seo: {
    title: 'Bankhead National Forest | BA Services',
    description:
      'The William B. Bankhead National Forest spans over 180,000 acres across Lawrence, Winston, and Franklin counties within the Cumberland Plateau region of North Alabama. Known as "The Land of a Thousand Waterfalls," it features dramatic sandstone canyons, pristine streams, old-growth forests, limestone bluffs, and lush canyons.',
  },
  hero: {
    src: '/images/bankhead-forest.jpg',
    alt: 'Bankhead National Forest',
  },
  gallery: [
    { src: '/images/bankhead-forest.jpg', alt: 'Bankhead National Forest gallery image 1' },
    { src: '/images/Bankhead-Waterfall.png', alt: 'Bankhead National Forest gallery image 2' },
    { src: '/images/bankhead-bicycle-trail.jpg', alt: 'Bankhead National Forest gallery image 3' },
    { src: '/images/clear-creek-overview.jpg', alt: 'Bankhead National Forest gallery image 4' },
    { src: '/images/corinth-campground.jpg', alt: 'Bankhead National Forest gallery image 5' },
  ],
  paragraphs: [
    'The William B. Bankhead National Forest spans over 180,000 acres across Lawrence, Winston, and Franklin counties within the Cumberland Plateau region of North Alabama. Known as "The Land of a Thousand Waterfalls," it features dramatic sandstone canyons, pristine streams, old-growth forests, limestone bluffs, and lush canyons.',
    'The Sipsey Wilderness, located within the forest, is the largest wilderness area east of the Mississippi River. The Sipsey Fork is a designated Wild and Scenic River corridor, famous for its nesting Cerulean Warblers. The American Bird Conservancy designated the Bankhead as an Important Bird Area — 84 species of birds have been recorded during the breeding season, making it part of the North Alabama Birding Trail.',
    'The forest is home to two premier campgrounds managed by BA Services: Clear Creek Recreation Area (102 sites on Lewis Smith Lake) and Corinth Recreation Area (52 full-hookup sites). Other highlights include Brushy Lake and Houston Recreation Areas, Natural Bridge Day Use Area, Owl Creek Horse Camp, the Flint-Creek Multi-Use Trail, and the Hurricane Creek Shooting Range — an accessible, year-round facility with eight shooting benches marked at 25, 50, and 100 yards.',
    'Visit the Ranger Station on Highway 33 in Double Springs for maps, birding brochures and checklists, and current sighting reports. Call (205) 489-5111 for more information.',
  ],
  features: [
    'Sipsey Wilderness',
    'Birding (84 species)',
    'Waterfalls',
    'Canyon Hiking',
    'Camping',
    'Fishing',
    'Shooting Range',
    'Horse Trails',
    'Scenic Drives',
  ],
  stats: [
    { key: 'acres', value: '180,000+', label: 'acres' },
    { key: 'birdSpecies', value: '84 breeding', label: 'bird Species' },
    { key: 'wilderness', value: 'Sipsey 25K acres', label: 'wilderness' },
    { key: 'campgrounds', value: '2 managed', label: 'campgrounds' },
  ],
  season: { isSeasonal: false },
  notices: [],
  ctas: {
    hero: {
      label: 'Book Your Stay',
      url: 'https://www.recreation.gov',
      kind: 'booking',
    },
    sidebar: {
      label: 'Check Availability',
      url: 'https://www.recreation.gov',
      kind: 'booking',
    },
  },
  sections: {},
}
