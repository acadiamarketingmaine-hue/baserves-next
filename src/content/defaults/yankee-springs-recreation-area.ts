import type { PropertyContent } from '../types'

/**
 * Moved verbatim out of src/app/yankee-springs-recreation-area/page.tsx.
 *
 * That bespoke page shadows the `yankee-springs-recreation-area` entry in
 * src/app/[slug]/page.tsx, so these are the values that actually render. The
 * shadowed [slug] entry disagrees (wrong hero photo, and a single booking link
 * that points at Chief Noonday) - recorded in
 * design-audit/website-editor-inventory.md, not reconciled here.
 *
 * The Boating activity text is a plain JS string, not JSX, so an HTML entity
 * in it prints literally. It used to show "area&apos;s lakes"; it now uses a
 * real apostrophe (UX sweep, Sep 2026).
 */
export const yankeeSpringsRecreationArea: PropertyContent = {
  slug: 'yankee-springs-recreation-area',
  name: 'Yankee Springs Recreation Area',
  tagline: 'Michigan Recreation Area',
  locationLine: 'Barry County, Michigan',
  summary:
    'Explore Yankee Springs Recreation Area in Barry County, Michigan. 5,200+ acres, 200+ campsites, 30+ miles of trails, historic CCC cabins, and year-round outdoor recreation.',
  seo: {
    title: 'Yankee Springs Recreation Area | Barry County, Michigan | BA Services',
    description:
      'Explore Yankee Springs Recreation Area in Barry County, Michigan. 5,200+ acres, 200+ campsites, 30+ miles of trails, historic CCC cabins, and year-round outdoor recreation.',
  },
  hero: {
    src: '/images/yankee-springs/hill-cabins.jpg',
    alt: 'Yankee Springs Recreation Area, Michigan',
  },
  gallery: [
    { src: '/images/yankee-springs/hill-cabins.jpg', alt: 'Historic Hill Cabins at Yankee Springs' },
    { src: '/images/yankee-springs/lake-cabins.jpg', alt: 'Waterfront Lake Cabins' },
    { src: '/images/yankee-springs/mansion-house.jpg', alt: 'Mansion House bunkhouse' },
    { src: '/images/yankee-springs/stage-house.jpg', alt: 'Stage House bunkhouse' },
    { src: '/images/yankee-springs/road-house.jpg', alt: 'Road House bunkhouse' },
    { src: '/images/yankee-springs/infirmary.jpg', alt: 'Infirmary bunkhouse' },
  ],
  paragraphs: [
    "Yankee Springs Recreation Area encompasses more than 5,200 acres in Barry County, Michigan, offering one of the state's most diverse and historically rich outdoor destinations. Shaped by glacial activity thousands of years ago, the landscape features rolling hills, kettle lakes, bogs, and dense hardwood forests.",
    "The area's unique geology, formed within the Jackson Interlobe where glaciers once collided, produced a rugged terrain of sandy soils, steep slopes, and scattered lakes. Beginning in the 1930s, the federal Recreational Demonstration Area program—supported by the National Park Service and constructed in part by the Civilian Conservation Corps—helped establish Yankee Springs as a model for public recreation and conservation.",
    'Today, Yankee Springs offers more than 30 miles of multi-use trails for hiking, mountain biking, and horseback riding, while over 10 lakes provide opportunities for swimming, fishing, and boating. Two designated swimming areas, accessible fishing piers, and numerous picnic shelters enhance the visitor experience.',
    "The recreation area features two historic outdoor centers—Chief Noonday Outdoor Center and Long Lake Outdoor Center—both originally developed in the 1930s. Notable features include Devil's Soupbowl, a distinctive glacial formation, and Graves Hill Overlook with sweeping views. Open in all seasons for summer boating to winter sports.",
  ],
  features: [
    'Hiking & Backpacking',
    'Mountain Biking',
    'Fishing',
    'Swimming',
    'Boating & Kayaking',
    'Cross-Country Skiing',
    'Snowshoeing',
    'Horseback Riding',
    'Wildlife Watching',
    'Camping',
  ],
  stats: [
    { key: 'acres', value: '5,200+', label: 'Acres' },
    { key: 'campsites', value: '200+', label: 'Campsites' },
    { key: 'trails', value: '30+', label: 'Miles Trails' },
    { key: 'cabinsAndCamps', value: 'Seasonal', label: 'Cabins & Camps' },
  ],
  season: {
    isSeasonal: true,
    label: 'Seasonal',
    note: 'The cabins and group camps are open in season.',
  },
  notices: [],
  ctas: {
    heroChiefNoonday: {
      label: 'Reserve Chief Noonday Outdoor Center',
      url: 'https://escape.baserves.com/chief-noonday-outdoor-center',
      kind: 'booking',
    },
    heroLongLake: {
      label: 'Reserve Long Lake Outdoor Center',
      url: 'https://escape.baserves.com/long-lake-outdoor-center',
      kind: 'booking',
    },
    sidebarChiefNoonday: {
      label: 'Reserve at Chief Noonday',
      url: 'https://escape.baserves.com/chief-noonday-outdoor-center',
      kind: 'booking',
    },
    sidebarLongLake: {
      label: 'Reserve at Long Lake',
      url: 'https://escape.baserves.com/long-lake-outdoor-center',
      kind: 'booking',
    },
    footerChiefNoonday: {
      label: 'Reserve Chief Noonday Outdoor Center',
      url: 'https://escape.baserves.com/chief-noonday-outdoor-center',
      kind: 'booking',
    },
    footerLongLake: {
      label: 'Reserve Long Lake Outdoor Center',
      url: 'https://escape.baserves.com/long-lake-outdoor-center',
      kind: 'booking',
    },
  },
  sections: {
    about: {
      heading: 'About Yankee Springs',
    },
    glacialCallout: {
      heading: 'Glacial Landscape',
      paragraphs: [
        "Yankee Springs sits within a region shaped by the Wisconsin glaciation. The rolling terrain, kettle lakes, and esker ridges create a varied landscape that supports exceptional biodiversity. Devil's Soup Bowl — a deep, bowl-shaped depression formed by a buried ice block — is one of the park's most iconic geological features and a must-see stop along the trail system.",
      ],
    },
    thingsToDo: {
      heading: 'Things to Do',
    },
    readyToVisit: {
      heading: 'Ready to Visit?',
      intro: 'Book a cabin, bunkhouse, or campsite in the Yankee Springs Recreation Area.',
    },
    subProperties: {
      heading: 'Our Properties at Yankee Springs',
      intro:
        'Two historic outdoor centers within the recreation area offer lodging, event spaces, and group facilities.',
      items: [
        {
          key: 'chief-noonday',
          title: 'Chief Noonday Outdoor Center',
          href: '/chief-noonday-outdoor-center',
          body: 'A rustic outdoor center within the recreation area, offering cabins and group camping for youth programs, retreats, and family gatherings.',
          photo: {
            src: '/images/chief-noonday/deer-lodge.jpg',
            alt: 'Deer Lodge at Chief Noonday Outdoor Center',
          },
          badge: 'Outdoor Center',
        },
        {
          key: 'long-lake',
          title: 'Long Lake Outdoor Center',
          href: '/long-lake-outdoor-center',
          body: 'Historic CCC property with 16 cabins, 4 bunkhouses, a 120-seat lodge, and private lake access. Ideal for weddings, retreats, and group camps.',
          photo: {
            src: '/images/long-lake/weddings/lake-dock-wide.jpg',
            alt: 'Long Lake waterfront and dock at Long Lake Outdoor Center',
          },
          badge: 'Historic CCC Property',
        },
      ],
    },
    lodging: {
      heading: 'Historic Lodging',
      intro:
        "Stay in cabins and bunkhouses built by the Civilian Conservation Corps in the 1930s, nestled within the recreation area's forests and lakeshores.",
      items: [
        {
          key: 'hill-cabins',
          title: 'Hill Cabins',
          body: 'Set among the trees on a wooded hillside, the Hill Cabins offer a quiet, elevated retreat. Built by the CCC in the 1930s, these rustic structures feature native stone and timber construction.',
          photo: { src: '/images/yankee-springs/hill-cabins.jpg', alt: 'Hill Cabins' },
        },
        {
          key: 'lake-cabins',
          title: 'Lake Cabins',
          body: 'Positioned along the waterfront, the Lake Cabins provide direct lake views and quick access to the dock, swimming, and fishing. Ideal for guests who want to wake up steps from the water.',
          photo: { src: '/images/yankee-springs/lake-cabins.jpg', alt: 'Lake Cabins' },
        },
      ],
    },
    bunkhouses: {
      heading: 'Bunkhouses',
      items: [
        {
          key: 'stage-house',
          title: 'Stage House',
          meta: '8',
          body: 'Compact bunkhouse suited for small groups with open sleeping quarters.',
          photo: { src: '/images/yankee-springs/stage-house.jpg', alt: 'Stage House' },
        },
        {
          key: 'road-house',
          title: 'Road House',
          meta: '12',
          body: 'Mid-size bunkhouse great for scout troops and youth groups.',
          photo: { src: '/images/yankee-springs/road-house.jpg', alt: 'Road House' },
        },
        {
          key: 'infirmary',
          title: 'Infirmary',
          meta: '10',
          body: 'Features its own private bathroom for added comfort and convenience.',
          photo: { src: '/images/yankee-springs/infirmary.jpg', alt: 'Infirmary' },
        },
        {
          key: 'mansion-house',
          title: 'Mansion House',
          meta: '20',
          body: 'The largest bunkhouse, with a charming fireplace and room for big groups.',
          photo: { src: '/images/yankee-springs/mansion-house.jpg', alt: 'Mansion House' },
        },
      ],
    },
    activities: {
      heading: 'Activities',
      intro:
        'Over 5,200 acres of forests, lakes, and trails provide year-round recreation for every interest and skill level.',
      items: [
        {
          key: 'hiking',
          title: 'Hiking',
          body: 'Over 30 miles of trails wind through forests, wetlands, and glacial landforms. Routes range from easy lakeside walks to rugged backcountry treks.',
        },
        {
          key: 'mountain-biking',
          title: 'Mountain Biking',
          body: 'Yankee Springs is a premier Michigan mountain biking destination with miles of singletrack through rolling, glacially carved terrain.',
        },
        {
          key: 'fishing',
          title: 'Fishing',
          body: 'Multiple lakes offer excellent fishing for bass, bluegill, pike, and panfish. Launch from shore or bring your own boat to explore the water.',
        },
        {
          key: 'swimming',
          title: 'Swimming',
          body: 'Sandy beaches on Deep Lake and Gun Lake provide refreshing summer swimming with designated swim areas and picnic facilities.',
        },
        {
          key: 'winter-sports',
          title: 'Winter Sports',
          body: 'When snow blankets the landscape, trails open for cross-country skiing, snowshoeing, and fat-tire biking through a winter wonderland.',
        },
        {
          key: 'boating',
          // Verbatim: the live page really does render the undecoded entity here.
          title: 'Boating',
          body: 'Bring your canoe, kayak, or small motorboat and explore the recreation area\'s lakes. Boat launches are available at multiple access points.',
        },
      ],
    },
    photoGallery: {
      heading: 'Photo Gallery',
    },
    closingCta: {
      heading: 'Explore Yankee Springs Recreation Area',
      intro:
        '5,200+ acres of Michigan wilderness with historic cabins, miles of trails. The cabins and group camps are open in season. Book your stay today.',
    },
  },
}
