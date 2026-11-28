import type { PropertyContent } from '../types'

/**
 * Rogue River-Siskiyou National Forest hub, Oregon and California.
 * Page: /rogue-river-siskiyou-national-forest.
 *
 * Forest overview from the Forest Service only (FACTS.md, section B4). BA has
 * not given a start date or a site list for this contract, so the page states
 * neither: it says the recreation sites and booking links will be listed here
 * when the contract begins. Do not add a date or a campground to this file
 * until BA provides them.
 *
 * Gated by src/data/new-forests.ts (NEW_FORESTS_PUBLIC).
 */
export const rogueRiverSiskiyouNationalForest: PropertyContent = {
  slug: 'rogue-river-siskiyou-national-forest',
  name: 'Rogue River-Siskiyou National Forest',
  tagline: 'National Forest',
  locationLine: 'Southwestern Oregon and California',
  summary:
    'The Rogue River-Siskiyou National Forest covers nearly 1.8 million acres of southwestern Oregon and extends into California.',
  seo: {
    title: 'Rogue River-Siskiyou National Forest | BA Services',
    description:
      'Nearly 1.8 million acres of southwestern Oregon and California forest. BA Services recreation sites and booking links will be listed here soon.',
  },
  hero: {
    src: '/images/rogue-river-siskiyou/fourmile-lake.jpg',
    alt: 'Fourmile Lake on the High Cascades Ranger District, with a snow-capped peak above the forest',
  },
  gallery: [],
  paragraphs: [
    'The Rogue River-Siskiyou National Forest covers nearly 1.8 million acres in southwestern Oregon and extends into California, across seven counties in the two states. It is the only national forest in the Forest Service\'s Pacific Northwest Region that extends into California.',
    'The forest has eight congressionally designated wilderness areas, with over 340,000 acres of wilderness in all, and six Wild and Scenic Rivers, roughly 260 miles of streams in total. The Forest Service describes it as the most floristically diverse national forest in the country.',
    'The Rogue River National Forest, called the Crater National Forest until 1932, was established by President Theodore Roosevelt in 1908. The Siskiyou Forest Reserve was established in 1905 and became the Siskiyou National Forest in 1907. The two have been administered together since 2004.',
    'BA Services\' recreation sites and booking links for this contract will be listed here when the contract begins.',
  ],
  features: [
    'Eight wilderness areas',
    'Six Wild and Scenic Rivers',
    'Mt. McLoughlin',
    'Mount Ashland',
    'Elk River',
    'Chetco River',
    'Mt. Ashland Ski Area',
  ],
  stats: [
    { key: 'acres', value: 'Nearly 1.8M', label: 'Acres' },
    { key: 'wilderness', value: '8', label: 'Wilderness areas' },
    { key: 'rivers', value: '6', label: 'Wild and Scenic Rivers' },
    { key: 'districts', value: '5', label: 'Ranger districts' },
  ],
  season: { isSeasonal: false },
  notices: [],
  ctas: {
    hero: {
      label: 'Contact BA Services',
      url: '/contact',
      kind: 'internal',
    },
    footerExperiences: {
      label: 'View All Experiences',
      url: '/experiences',
      kind: 'internal',
    },
    forestService: {
      label: 'Forest Service: Rogue River-Siskiyou',
      url: 'https://www.fs.usda.gov/r06/rogue-siskiyou',
      kind: 'external',
    },
  },
  sections: {
    about: {
      heading: 'About the Rogue River-Siskiyou National Forest',
    },
    forestFacts: {
      heading: 'Across the forest',
    },
    landmarks: {
      heading: 'Landmarks',
      items: [
        {
          key: 'mcloughlin',
          title: 'Mt. McLoughlin',
          meta: '9,495 ft',
          body: 'The peak rises to 9,495 feet in the Sky Lakes Wilderness, on the High Cascades Ranger District.',
          photo: {
            src: '/images/rogue-river-siskiyou/mt-mcloughlin.jpg',
            alt: 'Mt. McLoughlin rising above the Sky Lakes Wilderness seen over shrubs and tall conifers',
          },
        },
        {
          key: 'ashland',
          title: 'Mount Ashland',
          meta: '7,533 ft',
          body: 'The Forest Service lists Mount Ashland as the highest point in Oregon west of the Cascades. Mt. Ashland Ski Area, the only ski area on the forest, is here.',
          photo: {
            src: '/images/rogue-river-siskiyou/shasta-from-mt-ashland.jpg',
            alt: 'Mt. Shasta in the distance under an orange sky, seen past trees on Mt. Ashland',
          },
        },
      ],
    },
    campgrounds: {
      heading: 'Campgrounds and booking',
      intro:
        'BA Services\' recreation sites and booking links for this contract will be listed here when the contract begins.',
    },
    offices: {
      heading: 'Forest Service offices',
      intro:
        'The forest has five ranger districts. Gold Beach, High Cascades, Siskiyou Mountains, Wild Rivers and Powers cover communities including Prospect, Jacksonville, Grants Pass, Cave Junction, Gold Beach and Powers.',
      items: [
        { key: 'supervisor', title: 'Supervisor\'s Office', body: '3040 Biddle Road, Medford, OR 97504. (541) 618-2200.' },
        { key: 'gold-beach', title: 'Gold Beach Ranger District', body: '29279 Ellensburg Avenue, Gold Beach, OR 97444. (541) 247-3600.' },
        { key: 'high-cascades', title: 'High Cascades Ranger District', body: '47201 Highway 62, Prospect, OR 97536. (541) 560-3400.' },
        { key: 'powers', title: 'Powers Ranger District', body: '42861 Highway 242, Powers, OR 97466. (541) 439-6200.' },
        { key: 'siskiyou-mountains', title: 'Siskiyou Mountains Ranger District', body: '6941 Upper Applegate Road, Jacksonville, OR 97530. (541) 899-3800.' },
        { key: 'wild-rivers-cj', title: 'Wild Rivers Ranger District, Cave Junction', body: '26568 Redwood Highway, Cave Junction, OR 97523. (541) 592-4000.' },
        { key: 'wild-rivers-gp', title: 'Wild Rivers Ranger District, Grants Pass', body: '2164 Northeast Spalding Avenue, Grants Pass, OR 97526. (541) 471-6500.' },
      ],
    },
    closingCta: {
      heading: 'Check back soon',
      intro:
        'BA Services\' recreation sites and booking links for this contract will be listed here when the contract begins.',
    },
  },
}
