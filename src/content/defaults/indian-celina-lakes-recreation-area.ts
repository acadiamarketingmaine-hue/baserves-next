import type { PropertyContent } from '../types'

/**
 * Moved verbatim out of src/app/indian-celina-lakes-recreation-area/page.tsx.
 *
 * Campsite count: 59, from Recreation.gov (campground 232027: North Face 34,
 * South Slope 25), checked Sep 24 2026. The page used to say 80+ in the stat
 * bar and 63 in the paragraph. The season stat reads Apr–Oct to match the
 * Operations and Access paragraph (UX pass, Sep 2026).
 */
export const indianCelinaLakesRecreationArea: PropertyContent = {
  slug: 'indian-celina-lakes-recreation-area',
  name: 'Indian-Celina Lakes Recreation Area',
  tagline: 'Indiana Recreation Area',
  locationLine: 'Perry County, Southern Indiana',
  summary:
    'Explore Indian-Celina Lakes Recreation Area in Hoosier National Forest. Two scenic lakes with camping, accessible fishing pier, boat launch, and hiking trails.',
  seo: {
    title: 'Indian-Celina Lakes Recreation Area | Hoosier National Forest, Indiana | BA Services',
    description:
      'Explore Indian-Celina Lakes Recreation Area in Hoosier National Forest. Two scenic lakes with camping, accessible fishing pier, boat launch, and hiking trails.',
  },
  hero: {
    src: '/images/indian-celina-entrance-sign.jpg',
    alt: 'Indian-Celina Lakes Recreation Area, Hoosier National Forest, Indiana',
  },
  gallery: [
    { src: '/images/indian-celina/entrance.jpg', alt: 'Indian-Celina Lakes entrance sign' },
    { src: '/images/indian-celina/restroom-shower.jpg', alt: 'Restroom and shower house facility' },
    { src: '/images/indian-celina/fall-road.jpg', alt: 'Fall foliage along the campground road' },
    { src: '/images/indian-celina/two-lakes-loop-sign.jpg', alt: 'Two Lakes Loop hiking trail sign' },
    { src: '/images/indian-celina/fishing-pier.jpg', alt: 'Accessible Fishing Pier on Celina Lake' },
    { src: '/images/indian-celina/boat-launch.jpg', alt: 'Boat launch on Indian Lake' },
    { src: '/images/indian-celina/campsite1.jpg', alt: 'Campsite among the hardwoods' },
    { src: '/images/indian-celina/campsite2.jpg', alt: 'Campsite with tents' },
    { src: '/images/indian-celina/gatehouse.jpg', alt: 'Entrance gatehouse' },
    { src: '/images/indian-celina/lake-view.jpg', alt: 'Scenic lake view from fishing pier' },
  ],
  paragraphs: [
    'Indian-Celina Lakes Recreation Area is a peaceful and scenic destination tucked into the rolling hills of Perry County in southern Indiana, within Hoosier National Forest. Located approximately three miles south of Interstate 64 along State Road 37 and about 15 miles north of Tell City, the area is easily accessible while still offering a quiet, less crowded alternative to more heavily visited recreation sites.',
    'Anchored by two beautiful lakes—Indian Lake and Celina Lake—the recreation area provides a tranquil setting for a wide range of outdoor activities. Visitors can enjoy paddling, fishing, and boating (electric motors only), as well as hiking through the surrounding hardwood forests and varied terrain. The area serves a broad regional market, drawing visitors from Indiana, Kentucky, and Ohio, with more than seven million people within a three-hour drive.',
  ],
  features: [
    'Hiking (Two Lakes Loop)',
    'Fishing',
    'Boating & Paddling',
    'Camping',
    'Wildlife Watching',
    'Photography',
    'Picnicking',
    'Nature Study',
  ],
  stats: [
    { key: 'lakes', value: '2', label: 'Lakes' },
    { key: 'campsites', value: '59', label: 'Campsites' },
    { key: 'trailLoops', value: 'Trail', label: 'Loops' },
    { key: 'open', value: 'Apr–Oct', label: 'Season' },
  ],
  season: {
    isSeasonal: true,
    note: 'Indian-Celina Lakes operates seasonally from early April through late October under a Forest Service special use permit.',
  },
  notices: [],
  ctas: {
    parentForest: {
      label: 'Part of Hoosier National Forest',
      url: '/hoosier-national-forest',
      kind: 'internal',
    },
    hero: {
      label: 'Reserve on Recreation.gov',
      url: 'https://www.recreation.gov/camping/campgrounds/232027',
      kind: 'booking',
    },
    sidebar: {
      label: 'Reserve on Recreation.gov',
      url: 'https://www.recreation.gov/camping/campgrounds/232027',
      kind: 'booking',
    },
    footer: {
      label: 'Reserve on Recreation.gov',
      url: 'https://www.recreation.gov/camping/campgrounds/232027',
      kind: 'booking',
    },
    footerForest: {
      label: 'Explore Hoosier National Forest',
      url: '/hoosier-national-forest',
      kind: 'internal',
    },
  },
  sections: {
    about: {
      heading: 'About Indian-Celina Lakes',
    },
    campgroundFacilities: {
      heading: 'Campground Facilities',
      paragraphs: [
        'The recreation area includes Celina Campground, which is organized into two loops, North Face and South Slope, offering a total of 59 campsites. Sites are well-spaced within a mature forest setting and are equipped with picnic tables, fire rings, lantern posts, and paved parking spurs suitable for a variety of camping units.',
        'The South Slope Loop features full electric service at all sites, while the North Face Loop includes a mix of electric and non-electric sites, as well as several walk-in tent sites. Modern amenities include two flush restroom and shower buildings, five vault toilets, and conveniently located water hydrants throughout the campground.',
      ],
    },
    recreationAmenities: {
      heading: 'Recreation Amenities',
      paragraphs: [
        'Celina Lake offers a boat ramp, parking area, accessible fishing pier, and a nearby amphitheater with seating, lighting, and audio-visual capabilities for interpretive programs. Indian Lake also features a boat ramp, parking area, and basic facilities, providing a quieter, more secluded experience.',
        'Trail opportunities are a highlight of the area. The Two Lakes Trail, a 12-mile loop, connects both lakes and offers options for extended backpacking or shorter hikes. A one-mile interpretive trail near the historic Rickenbaugh House provides insight into the cultural history of the area and connects to the larger trail system.',
      ],
    },
    culturalAndNatural: {
      heading: 'Cultural and Natural Features',
      paragraphs: [
        'The Rickenbaugh House, listed on the National Register of Historic Places, serves as a focal point for interpretive programming and reflects the area\'s cultural heritage. The surrounding forest supports diverse wildlife and offers a peaceful environment for nature study and relaxation.',
      ],
    },
    operationsAndAccess: {
      heading: 'Operations and Access',
      paragraphs: [
        'A gatehouse entrance provides managed access to the recreation area. Indian-Celina Lakes operates seasonally from early April through late October under a Forest Service special use permit. Recognized as one of the Top 100 Family Campgrounds, the area combines modern conveniences with a slower pace and a strong sense of seclusion.',
        'Indian-Celina Lakes Recreation Area offers a balance of accessibility, comfort, and quiet natural beauty—making it one of the Hoosier National Forest\'s most appealing and understated destinations.',
      ],
    },
    thingsToDo: {
      heading: 'Things to Do',
    },
    readyToVisit: {
      heading: 'Ready to Visit?',
      intro:
        'Reserve a campsite at Indian-Celina Lakes Recreation Area and enjoy the peaceful side of Hoosier National Forest.',
    },
    facilities: {
      heading: 'Facilities',
      intro:
        'Well-maintained amenities make Indian-Celina Lakes a comfortable base camp for exploring the Hoosier National Forest.',
      items: [
        {
          key: 'fishing-pier',
          title: 'Accessible Fishing Pier',
          body: 'Celina Lake features a fully accessible fishing pier, making it easy for anglers of all abilities to cast a line and enjoy the calm waters stocked with bass, bluegill, and catfish.',
          photo: { src: '/images/indian-celina/fishing-pier.jpg', alt: 'Accessible Fishing Pier' },
        },
        {
          key: 'campground',
          title: 'Campground',
          body: 'Multiple loops of well-maintained campsites are nestled among mature hardwoods, offering a mix of shaded and open sites with fire rings, picnic tables, and lantern posts.',
          photo: { src: '/images/indian-celina/campsite1.jpg', alt: 'Campground' },
        },
        {
          key: 'boat-launch',
          title: 'Boat Launch',
          body: 'Indian Lake provides a boat launch for canoes, kayaks, and small watercraft. Electric motors only are permitted, keeping the lake peaceful and pristine for all visitors.',
          photo: { src: '/images/indian-celina/boat-launch.jpg', alt: 'Boat Launch' },
        },
        {
          key: 'shower-house',
          title: 'Restroom & Shower House',
          body: 'Modern restroom and shower house facilities are centrally located within the campground, providing hot showers, flush toilets, and accessible stalls for camper convenience.',
          photo: { src: '/images/indian-celina/restroom-shower.jpg', alt: 'Restroom & Shower House' },
        },
      ],
    },
    activities: {
      heading: 'Activities',
      intro:
        'Two lakes, forested trails, and quiet woodlands provide year-round recreation in the heart of southern Indiana.',
      items: [
        {
          key: 'hiking',
          title: 'Hiking',
          body: 'The Two Lakes Loop trail winds between Indian Lake and Celina Lake through rolling hills and hardwood forest, offering scenic views and a moderate trek through the heart of the recreation area.',
        },
        {
          key: 'fishing',
          title: 'Fishing',
          body: 'Both lakes offer excellent fishing opportunities. Celina Lake features an accessible fishing pier, while Indian Lake provides shoreline access for bass, bluegill, catfish, and panfish.',
        },
        {
          key: 'boating',
          title: 'Boating',
          body: 'Bring your canoe, kayak, or small electric-motor boat to Indian Lake. The quiet-water policy keeps the lake serene and perfect for a peaceful paddle through forested shorelines.',
        },
        {
          key: 'camping',
          title: 'Camping',
          body: 'Multiple campground loops offer sites for tents and RVs among mature hardwood forest. Each site includes a fire ring and picnic table, with modern shower facilities nearby.',
        },
        {
          key: 'wildlife-watching',
          title: 'Wildlife Watching',
          body: 'The surrounding Hoosier National Forest teems with wildlife. White-tailed deer, wild turkey, barred owls, and a wide variety of songbirds call these woods home year-round.',
        },
      ],
    },
    photoGallery: {
      heading: 'Photo Gallery',
    },
    closingCta: {
      heading: 'Discover Indian-Celina Lakes',
      intro:
        'Two peaceful lakes, forested campsites, accessible fishing, and miles of trails await in this quiet corner of Hoosier National Forest. Plan your visit today.',
    },
  },
}
