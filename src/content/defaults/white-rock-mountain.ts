import type { PropertyContent } from '../types'

/**
 * White Rock Mountain Recreation Area, Ozark National Forest, Arkansas.
 * Page: /ozark-st-francis-national-forest/white-rock-mountain
 * (src/app/ozark-st-francis-national-forest/white-rock-mountain/page.tsx).
 *
 * Every fact here comes from /Users/johnphair/Downloads/ba-forest-capture-2026-11-26/FACTS.md
 * or from the Recreation.gov listing for facility 255177. Where the sources
 * disagree the Recreation.gov figure is used or the figure is left out
 * (elevation, lodge and group-site capacity, trail lengths). No 2026 rates, fees
 * or season dates are published: BA Services sets its own for 2027.
 *
 * Photos are federal public-domain images only; see
 * docs/ux-pass/new-forests-2027-photo-credits.md.
 *
 * Gated by src/data/new-forests.ts (NEW_FORESTS_PUBLIC).
 */
export const whiteRockMountain: PropertyContent = {
  slug: 'white-rock-mountain',
  name: 'White Rock Mountain',
  tagline: 'Lodge, cabins and campground on a mountaintop in the Ozarks',
  locationLine: 'Boston Mountain Ranger District, Arkansas',
  summary:
    'White Rock Mountain Recreation Area sits 2,309 feet above sea level in the Ozark National Forest, with a 1930s stone lodge, three stone cabins, nine campsites and a rim trail with scenic overlooks.',
  seo: {
    title: 'White Rock Mountain Recreation Area | BA Services',
    description:
      'Stay at White Rock Mountain in Arkansas' Ozark National Forest: a stone lodge, three cabins, nine campsites and overlook trails. Reserve on Recreation.gov.',
  },
  hero: {
    src: '/images/ozark-st-francis/white-rock-overlook-sunset.jpg',
    alt: 'A stone shelter on the White Rock Mountain rim at sunset, with the Ozark hills beyond',
  },
  gallery: [],
  paragraphs: [
    'On top of White Rock Mountain, the Civilian Conservation Corps built a large stone lodge and three rustic stone cabins in the 1930s. A volunteer group, the Friends of White Rock, began renovating them in 1987, and they were restored by 1991. The mountain is named for the lichen on its sheer bluffs, which looks white from a distance.',
    'The grounds are open year round. The recreation area is about 58 acres, with a lodge, three cabins, a nine-site primitive campground, picnic sites, a day-use overlook and overnight parking for hikers on the Ozark Highlands Trail.',
    'BA Services takes over the White Rock Mountain concession on January 1, 2027. The lodge, the cabins and the campsites are reserved on Recreation.gov.',
  ],
  features: [
    'Hiking',
    'Backpacking',
    'Camping',
    'Scenic overlooks',
    'Star gazing',
    'Photography',
    'Wildlife viewing',
    'Birding',
    'Picnic area',
    'Weddings at the overlook',
  ],
  stats: [
    { key: 'elevation', value: '2,309 ft', label: 'Elevation' },
    { key: 'lodging', value: '4', label: 'Lodge and cabins' },
    { key: 'campsites', value: '9', label: 'Campsites' },
    { key: 'open', value: 'Year round', label: 'Grounds open' },
  ],
  season: { isSeasonal: false },
  notices: [],
  ctas: {
    parentForest: {
      label: 'Ozark-St. Francis National Forests',
      url: '/ozark-st-francis-national-forest',
      kind: 'internal',
    },
    hero: {
      label: 'Book on Recreation.gov',
      url: 'https://www.recreation.gov/camping/campgrounds/255177',
      kind: 'booking',
    },
    reserve: {
      label: 'Book on Recreation.gov',
      url: 'https://www.recreation.gov/camping/campgrounds/255177',
      kind: 'booking',
    },
    footer: {
      label: 'Book on Recreation.gov',
      url: 'https://www.recreation.gov/camping/campgrounds/255177',
      kind: 'booking',
    },
    footerBack: {
      label: 'Back to Ozark-St. Francis National Forests',
      url: '/ozark-st-francis-national-forest',
      kind: 'internal',
    },
  },
  sections: {
    about: {
      heading: 'About White Rock Mountain',
    },
    lodging: {
      heading: 'The lodge and three cabins',
      intro:
        'All four buildings are stone, built by the CCC and heated by wood stoves. Each is booked as a whole on Recreation.gov.',
      items: [
        {
          key: 'lodge',
          title: 'The Lodge',
          meta: 'Sleeps 16',
          body: 'Three bedrooms, a full kitchen, a living room with a wood stove and original CCC furnishings, and a patio with a grill and a fire pit. All rooms are on one level.',
        },
        {
          key: 'cabin-a',
          title: 'Cabin A',
          meta: 'Sleeps 6',
          body: 'Two bedrooms, a stone-walled living room with a wood stove, a kitchen, and a bathroom with a cast iron tub and shower. The patio has a grill and a fire pit.',
        },
        {
          key: 'cabin-b',
          title: 'Cabin B',
          meta: 'Sleeps 6',
          body: 'One bedroom with a full-size bunk bed and a full-size bed, a rock-walled living room with a wood stove, a kitchen, and a bathroom with a cast iron tub. The patio has a grill and a fire bowl.',
        },
        {
          key: 'cabin-c',
          title: 'Cabin C',
          meta: 'Sleeps 4',
          body: 'One bedroom with a queen bed, two twin rollaway beds, a wood stove, a kitchen and a bathroom with a cast iron tub. Cabin C is the cabin closest to the bluffs.',
        },
      ],
    },
    provided: {
      heading: 'What is in the cabins, and what to bring',
      items: [
        {
          key: 'provided',
          title: 'Provided',
          items: [
            'Electricity and running water',
            'Bathrooms',
            'Fully equipped kitchens',
            'Heat from wood stoves',
            'Fans, with no air conditioning',
            'A grill at each cabin',
          ],
        },
        {
          key: 'bring',
          title: 'Bring',
          items: [
            'Sheets, pillows and blankets',
            'Towels and washcloths',
            'Charcoal for the grills',
            'Groceries, because the nearest store is about an hour away',
          ],
        },
      ],
    },
    campground: {
      heading: 'The campground',
      intro:
        'Nine primitive sites with no electric or water hookups. Eight family sites have tent pads and fire pits, and one site is a group site.',
      items: [
        { key: 'sites-1-2', title: 'Sites 1 and 2', meta: 'Up to 8 people', body: 'Family sites with a fire ring, a grill and a picnic table.' },
        { key: 'sites-3-8', title: 'Sites 3 to 8', meta: 'Up to 6 people', body: 'Family sites with a fire ring, a grill and a picnic table. Sites 5 to 8 are on the bluff side.' },
        { key: 'site-9', title: 'Site 9, group site', meta: 'Up to 12 people', body: 'The campground\'s group site, with room for several tents.' },
        { key: 'facilities', title: 'Facilities', body: 'A vault toilet that is accessible, and parking at each site. There is no dump station.' },
        { key: 'rules', title: 'No hookups, no generators', body: 'Sites do not have electric or water hookups, and generators are not allowed.' },
      ],
    },
    dayUse: {
      heading: 'Day use and Ozark Highlands Trail parking',
      paragraphs: [
        'The overlook is open to day visitors from sunrise to sunset, with parking, picnic sites with tables and grills, and a vault restroom that is accessible. Guests with a cabin or campsite reservation do not pay the day-use fee.',
        'Hikers on the Ozark Highlands Trail and the Shores Lake loop can park overnight; every vehicle checks in at the office first. No fires are allowed in the day-use area, and the park closes at sunset.',
      ],
    },
    trails: {
      heading: 'Trails',
      intro:
        'Trail lengths are the figures shown on the Recreation.gov listing.',
      items: [
        { key: 'rim', title: 'White Rock Rim Trail', meta: 'About 2 miles', body: 'An easy loop around the rim of the mountaintop, passing four shelters built by the CCC.' },
        { key: 'loop', title: 'White Rock and Shores Lake Loop', meta: 'About 17 miles', body: 'A loop from White Rock down to Shores Lake and back. The west side of the mountain has seasonal falls, creek crossings and bluffs.' },
        { key: 'oht', title: 'Ozark Highlands Trail', meta: '170 miles', body: 'The long-distance trail crosses the Ozark National Forest, and White Rock Mountain has overnight parking for hikers who use it.' },
      ],
    },
    shoresLake: {
      heading: 'Shores Lake and the country nearby',
      paragraphs: [
        'Shores Lake is a few miles down the road, with fishing, swimming and non-motorized boating, and a pavilion that can be reserved.',
        'Devil\'s Canyon and Fern Gully are about 20 minutes south, near Fern, and High Bank Twin Falls is about 45 minutes away on a 0.4 mile trail, with the best flow from mid-October to early June. Climbing and rappelling are not allowed at White Rock, and ATVs are not permitted in the park.',
      ],
      items: [
        {
          key: 'photo',
          photo: {
            src: '/images/ozark-st-francis/shores-lake-swim-beach.jpg',
            alt: 'The swim beach and day use area at Shores Lake in the Ozark National Forest',
          },
        },
      ],
    },
    weddings: {
      heading: 'Weddings and photography at the overlook',
      paragraphs: [
        'Weddings are held at the overlook, and every wedding must be registered ahead of time. Email BA Services with your name and contact information, the number of guests, the number of vehicles and two preferred dates.',
        'The Sunset Pavilion is the ceremony site. It has no electricity and no running water, and it is open to the public at all times. For a reception, the lodge patio is comfortable for up to 30 guests, and only 16 can stay overnight. Bring battery packs for lights, because generators are not allowed.',
        'Commercial photography needs a permit, scheduled at least two weeks ahead by email, with proof of liability insurance. Lodge and cabin stays are booked separately on Recreation.gov.',
      ],
    },
    goodToKnow: {
      heading: 'Good to know',
      intro: 'Practical answers for planning a stay. Recreation.gov shows the current terms for each booking.',
      items: [
        {
          key: 'pets',
          title: 'Are dogs allowed?',
          items: [
            'Dogs are welcome and must be on a leash at all times, including on trails.',
            'Pets need current shots and flea control, and cannot be left unattended or tied outside unattended.',
            'Pets are not allowed on the furniture and cannot be bathed in the cabins or the lodge. Owners pick up after their pets.',
            'Cabin and lodge stays with pets require a refundable pet deposit, paid at check-in. It is lost for excessive hair or mud, damage, uncontrolled barking or a pet left unattended.',
          ],
        },
        {
          key: 'getting-there',
          title: 'How do I get there?',
          items: [
            'From Interstate 40 at Mulberry, Arkansas, the route goes north on Arkansas 215 and then onto Forest Service roads up the mountain.',
            'Search for White Rock Mountain Recreation Area in your map app and choose a suggested route.',
            'Every road to the mountain includes gravel. A car or a motorcycle can make it, though some visitors are more comfortable in an SUV or a truck.',
            'Check the Forest Service alerts for road closures before you travel.',
          ],
        },
        {
          key: 'reservations',
          title: 'How do I reserve?',
          items: [
            'The lodge, the three cabins and the nine campsites are reserved on Recreation.gov.',
            'Reservations on Recreation.gov have a two-night minimum.',
            'Rates, check-in times and cancellation terms are shown on Recreation.gov when you book.',
          ],
        },
        {
          key: 'weather',
          title: 'What is the weather like?',
          items: [
            'The mountain runs cooler than the valleys below, and winter can bring hard freezes. Pack for the season.',
            'The lodge and cabins have no air conditioning, and the elevation helps keep them cool in summer.',
          ],
        },
        {
          key: 'safety',
          title: 'What should I know about the bluffs and wildlife?',
          items: [
            'The bluffs are high cliffs. Children must be supervised at all times.',
            'Bears live in the area but are rarely seen on top of the mountain. Keep food in a locked bin or in your vehicle.',
          ],
        },
        {
          key: 'rules',
          title: 'What are the rules?',
          items: [
            'Quiet hours are in effect around the clock.',
            'No smoking indoors, and no tents or hammocks around the cabins.',
            'Fires only in designated areas. Fireworks are not allowed.',
            'No hunting within the recreation area, and no climbing or rappelling.',
            'OHVs and ATVs are not permitted in the park.',
            'Campground guests do not use the cabin amenities.',
          ],
        },
      ],
    },
    closingCta: {
      heading: 'Plan your stay',
      intro:
        'Reserve the lodge, a cabin or a campsite on Recreation.gov. Weddings and photography are arranged by email.',
    },
  },
}
