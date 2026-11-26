import type { PropertyContent } from '../types'

/**
 * Ozark-St. Francis National Forests hub, Arkansas.
 * Page: /ozark-st-francis-national-forest.
 *
 * Facts come only from FACTS.md (section B3 and the White Rock sources). BA
 * Services takes over the concession on January 1, 2027 (Andrew Dalton,
 * June 23 2026); nothing here says BA operates or manages anything today.
 *
 * Gated by src/data/new-forests.ts (NEW_FORESTS_PUBLIC).
 */
export const ozarkStFrancisNationalForest: PropertyContent = {
  slug: 'ozark-st-francis-national-forest',
  name: 'Ozark-St. Francis National Forests',
  tagline: 'National Forests',
  locationLine: 'Arkansas',
  summary:
    'The Ozark-St. Francis National Forests cover more than 1.2 million acres of Arkansas. BA Services takes over the concession at White Rock Mountain on January 1, 2027.',
  seo: {
    title: 'Ozark-St. Francis National Forests | Arkansas | BA Services',
    description:
      'The Ozark-St. Francis National Forests cover more than 1.2 million acres across Arkansas. BA Services takes over the White Rock Mountain concession on January 1, 2027.',
  },
  hero: {
    src: '/images/ozark-st-francis/blanchard-springs.jpg',
    alt: 'A spring-fed stream running over rocks below a mossy bluff at Blanchard Springs in the Ozark National Forest',
  },
  gallery: [],
  paragraphs: [
    'The Ozark-St. Francis National Forests cover more than 1.2 million acres across Arkansas. The Ozark National Forest, mostly in the northwest of the state, covers more than a million acres in the Boston Mountains and at the southern end of the Springfield Plateau. Its forest is mostly upland oak and hickory, with scattered pine.',
    'The St. Francis National Forest is a separate forest of more than 20,000 acres on the east central edge of the state. The Forest Service says it is the only place in the National Forest System where the public can experience the Mississippi River from the shoreline.',
    'On these forests most campgrounds are first come, first served. White Rock Mountain is one of the places where sites, cabins and a lodge are reserved on Recreation.gov, and it is where BA Services takes over the concession on January 1, 2027.',
  ],
  features: [
    'Boston Mountains',
    'Upland oak and hickory forest',
    'Ozark Highlands Trail',
    'Blanchard Springs Caverns',
    'Mississippi River shoreline at St. Francis',
    'Six ranger districts',
  ],
  stats: [
    { key: 'acres', value: '1.2 million+', label: 'Acres across Arkansas' },
    { key: 'districts', value: '6', label: 'Ranger districts' },
    { key: 'start', value: 'Jan 1, 2027', label: 'BA Services takes over' },
  ],
  season: { isSeasonal: false },
  notices: [],
  ctas: {
    hero: {
      label: 'See White Rock Mountain',
      url: '/ozark-st-francis-national-forest/white-rock-mountain',
      kind: 'internal',
    },
    book: {
      label: 'Book on Recreation.gov',
      url: 'https://www.recreation.gov/camping/campgrounds/255177',
      kind: 'booking',
    },
    footerExperiences: {
      label: 'View All Experiences',
      url: '/experiences',
      kind: 'internal',
    },
    forestService: {
      label: 'Forest Service: Ozark-St. Francis',
      url: 'https://www.fs.usda.gov/r08/ozark-stfrancis',
      kind: 'external',
    },
  },
  sections: {
    about: {
      heading: 'About the Ozark-St. Francis National Forests',
    },
    forestFacts: {
      heading: 'Across the forests',
    },
    ourSite: {
      heading: 'White Rock Mountain',
      paragraphs: [
        'White Rock Mountain Recreation Area is in the Boston Mountain Ranger District of the Ozark National Forest, 2,309 feet above sea level. The CCC built its stone lodge and three cabins in the 1930s, and there are nine campsites, a rim trail with overlooks, day-use parking and overnight parking for hikers on the Ozark Highlands Trail.',
        'Weddings and photography at the overlook are arranged by email, and everything else is booked on Recreation.gov.',
      ],
      items: [
        {
          key: 'photo',
          photo: {
            src: '/images/ozark-st-francis/white-rock-overlook-sunset.jpg',
            alt: 'A stone shelter on the White Rock Mountain rim at sunset, with the Ozark hills beyond',
          },
        },
      ],
    },
    around: {
      heading: 'Around the forests',
      intro:
        'Two more places to know about when planning a trip.',
      items: [
        {
          key: 'blanchard',
          title: 'Blanchard Springs Caverns',
          body: 'The Forest Service office for the caverns is in Fifty-Six, Arkansas, and cavern tours are reserved on Recreation.gov.',
          photo: {
            src: '/images/ozark-st-francis/mirror-lake.jpg',
            alt: 'Mirror Lake, a green pond between wooded hills at Blanchard Springs in the Ozark National Forest',
          },
        },
        {
          key: 'shores',
          title: 'Shores Lake',
          body: 'A few miles from White Rock Mountain, with fishing, swimming, non-motorized boating and a pavilion that can be reserved.',
          photo: {
            src: '/images/ozark-st-francis/shores-lake-picnic-pavilion.jpg',
            alt: 'A picnic pavilion near the water at Shores Lake in the Ozark National Forest',
          },
        },
      ],
    },
    goodToKnow: {
      heading: 'Good to know',
      intro: 'Forest Service information for planning a visit.',
      items: [
        {
          key: 'reservations',
          title: 'Which campgrounds can be reserved?',
          items: [
            'Most campgrounds on the Ozark-St. Francis National Forests are first come, first served.',
            'The Forest Service lists Cove Lake and White Rock as the reservable campgrounds, with cabins at both, all through Recreation.gov.',
            'Blanchard Springs Caverns tour reservations are also made through Recreation.gov.',
          ],
        },
        {
          key: 'dogs',
          title: 'Are dogs allowed?',
          items: [
            'In campgrounds, picnic areas, parking areas and trailheads, dogs must be on a leash and under control.',
            'On trails, dogs must be under verbal or physical restraint.',
          ],
        },
        {
          key: 'offices',
          title: 'Where are the Forest Service offices?',
          items: [
            'Supervisor\'s Office: 605 W Main St, Russellville, AR 72801, (479) 964-7200.',
            'Big Piney Ranger District: 12000 AR-27, Hector, AR 72843, (479) 284-3150.',
            'Boston Mountain Ranger District: 1803 N 18th St, Ozark, AR 72949, (479) 667-2191. This district includes White Rock Mountain.',
            'Mt. Magazine Ranger District: 3001 E Walnut St, Paris, AR 72855, (479) 963-3076.',
            'Pleasant Hill Ranger District: 2591 AR-21, Clarksville, AR 72830, (479) 754-8864.',
            'St. Francis Ranger District: 2955 Great River Rd, Marianna, AR 72360, (870) 295-5278.',
            'Sylamore Ranger District: 1001 E Main St, Mountain View, AR 72560, (870) 269-3228.',
          ],
        },
      ],
    },
    closingCta: {
      heading: 'Plan your trip',
      intro:
        'White Rock Mountain has its own page with lodging, camping, trails and practical details.',
    },
  },
}
