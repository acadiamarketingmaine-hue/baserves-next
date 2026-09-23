import type { PropertyContent } from '../types'

/**
 * Moved verbatim out of src/app/tipsaw-lake-recreation-area/page.tsx.
 *
 * That bespoke page shadows the `tipsaw-lake-recreation-area` entry that used
 * to live here (lifted from src/app/[slug]/page.tsx and rendered nowhere), so
 * these are now the values that actually render. The shadowed [slug] values
 * disagreed on the tagline, the location line, the hero photo and the whole
 * gallery (one of its three photographs was a Monongahela panorama), both
 * paragraphs, the stat labels, the feature list and both CTA labels. Recorded
 * in design-audit/website-editor-inventory.md, not reconciled here.
 *
 * The page also disagrees with itself and is left that way: the stat bar says
 * "Year-Round / Open", the Access and Operations paragraph says the area
 * "operates seasonally from early April through late October", and the trail
 * loop is 8+ miles in the stat bar, 5.9 miles in the Hiking card and 5.7 miles
 * in the Trails and Recreation paragraph.
 */
export const tipsawLakeRecreationArea: PropertyContent = {
  slug: 'tipsaw-lake-recreation-area',
  name: 'Tipsaw Lake Recreation Area',
  tagline: 'Indiana Recreation Area',
  locationLine: 'Perry County, Indiana',
  summary:
    'Explore Tipsaw Lake Recreation Area in Hoosier National Forest. 131-acre lake with camping, swimming beach, fishing, amphitheater, and 8+ miles of trails.',
  seo: {
    title: 'Tipsaw Lake Recreation Area | Perry County, Indiana | BA Services',
    description:
      'Explore Tipsaw Lake Recreation Area in Hoosier National Forest. 131-acre lake with camping, swimming beach, fishing, amphitheater, and 8+ miles of trails.',
  },
  hero: {
    src: '/images/tipsaw-lake/lake-view.jpg',
    alt: 'Tipsaw Lake Recreation Area in Hoosier National Forest, Perry County, Indiana',
  },
  gallery: [
    { src: '/images/tipsaw-lake/lake-view.jpg', alt: 'Scenic view of Tipsaw Lake' },
    { src: '/images/tipsaw-lake/beach-swimming.jpg', alt: 'Visitors enjoying the swimming beach' },
    { src: '/images/tipsaw-lake/campsite1.jpg', alt: 'Wooded campsite at Tipsaw Lake' },
    { src: '/images/tipsaw-lake/campsite2.jpg', alt: 'Campsite nestled in the forest' },
    { src: '/images/tipsaw-lake/entrance.jpg', alt: 'Tipsaw Lake Recreation Area entrance sign' },
    { src: '/images/tipsaw-lake/twin-oaks.jpg', alt: 'Twin Oaks facility' },
    { src: '/images/tipsaw-lake/rickenbaugh-house.jpg', alt: 'Historic Rickenbaugh House' },
    { src: '/images/tipsaw-lake/restroom.jpg', alt: 'Modern restroom and shower facility' },
    { src: '/images/tipsaw-lake/amphitheater.jpg', alt: 'Amphitheater with interpretive trail' },
  ],
  paragraphs: [
    'Tipsaw Lake Recreation Area is a scenic and well-developed destination located in Perry County, Indiana, within Hoosier National Forest. Situated approximately six miles south of Interstate 64 along State Road 37 and about 15 miles north of Tell City, the area is easily accessible while offering a peaceful and secluded forest setting. Located just three miles south of Indian-Celina Lakes Recreation Area, Tipsaw serves a broad regional market, drawing visitors from Indiana, Kentucky, and Ohio, with nearly seven million people within a three-hour drive.',
    'Centered around a 131-acre lake, Tipsaw offers a quiet, family-friendly environment where boating is limited to electric motors, preserving calm waters ideal for fishing, paddling, and swimming. Recognized as one of America\'s Top 100 Family Campgrounds, the area provides a well-rounded mix of overnight and day-use opportunities.',
  ],
  features: [
    'Hiking & Trail Running',
    'Fishing (Bass, Bluegill, Catfish)',
    'Swimming Beach',
    'Boating & Kayaking',
    'Camping (Tent & RV)',
    'Picnicking & Shelters',
    'Amphitheater Programs',
    'Playground',
    'Wildlife Watching',
    'Photography',
  ],
  stats: [
    { key: 'lake', value: '131 Acre', label: 'Lake' },
    { key: 'campsites', value: '35+', label: 'Campsites' },
    { key: 'trails', value: '8+', label: 'Miles Trails' },
    { key: 'open', value: 'Apr–Oct', label: 'Season' },
  ],
  season: {
    isSeasonal: true,
    note: 'Tipsaw Lake operates seasonally from early April through late October under a Forest Service special use permit.',
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
      url: 'https://www.recreation.gov/camping/campgrounds/232114',
      kind: 'booking',
    },
    sidebar: {
      label: 'Reserve on Recreation.gov',
      url: 'https://www.recreation.gov/camping/campgrounds/232114',
      kind: 'booking',
    },
    footer: {
      label: 'Reserve on Recreation.gov',
      url: 'https://www.recreation.gov/camping/campgrounds/232114',
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
      heading: 'About Tipsaw Lake',
    },
    campgroundFacilities: {
      heading: 'Campground Facilities',
      paragraphs: [
        'The recreation area includes multiple camping options across three primary loops—Jackpine, Dogwood, and Catbrier—along with two group camping areas. Jackpine Loop contains 21 electric sites, while Dogwood Loop offers 14 sites, including a small number with electric service. Both loops include one walk-in campsite and feature paved roads and parking spurs, with each site equipped with a picnic table, fire ring, lantern post, and space for tents or RVs.',
        'The Catbrier RV loop includes 11 sites, all with water and electric hookups, and accommodates a wide range of vehicle sizes.',
        'Two group camping areas—Primrose and Goldenrod—each accommodate up to 65 people and include electric service, picnic tables, fire rings, lantern posts, water fountains, and vault toilets.',
        'Modern amenities throughout the campground include two flush restroom and shower buildings, additional vault toilets, water fountains, and a conveniently located RV dump station just outside the campground. Trash dumpsters are distributed throughout the recreation area.',
      ],
    },
    dayUseAmenities: {
      heading: 'Day-Use Amenities',
      paragraphs: [
        'The day-use area centers around a sandy swimming beach, complete with a modern bathhouse, changing facilities, and nearby playground equipment. A picnic area includes two reservable shelters—one with electric service—along with picnic tables, grills, and restroom facilities.',
        'A large boat launch with ample parking provides convenient lake access for visitors. The lake itself supports fishing and quiet water recreation, enhancing its appeal for families and casual users.',
      ],
    },
    trailsAndRecreation: {
      heading: 'Trails and Recreation',
      paragraphs: [
        'Outdoor recreation extends beyond the lake, with the Tipsaw Lake Trail—a 5.7-mile loop—encircling the lake and offering excellent opportunities for hiking and biking through hardwood forest with scenic lake views. Additional trail connections and interpretive opportunities are available nearby, contributing to a broader network of forest exploration.',
      ],
    },
    accessAndOperations: {
      heading: 'Access and Operations',
      paragraphs: [
        'A gatehouse located along the entrance road manages access to the recreation area. Tipsaw Lake operates seasonally from early April through late October under a Forest Service special use permit.',
        'With its combination of calm waters, well-maintained facilities, and forested surroundings, Tipsaw Lake Recreation Area offers a balanced and inviting outdoor experience—well-suited for camping, group gatherings, and quiet recreation in southern Indiana.',
      ],
    },
    fishing: {
      heading: 'Fishing at Tipsaw Lake',
      paragraphs: [
        'Tipsaw Lake is home to healthy populations of largemouth bass, bluegill, channel catfish, and crappie. The electric-motors-only rule keeps the lake quiet and undisturbed, creating ideal conditions for both shore fishing and boat angling. Bank fishing spots are accessible near the campground and day-use areas, and a boat ramp provides easy launch access for canoes, kayaks, and small fishing boats.',
      ],
      items: [
        { key: 'largemouth-bass', title: 'Largemouth Bass' },
        { key: 'bluegill', title: 'Bluegill' },
        { key: 'channel-catfish', title: 'Channel Catfish' },
        { key: 'crappie', title: 'Crappie' },
      ],
    },
    thingsToDo: {
      heading: 'Things to Do',
    },
    readyToVisit: {
      heading: 'Ready to Visit?',
      intro:
        'Reserve your campsite at Tipsaw Lake Recreation Area and experience the beauty of Indiana\'s Hoosier National Forest.',
    },
    facilities: {
      heading: 'Facilities',
      intro:
        'From a sandy swimming beach to a renovated shelter house, Tipsaw Lake provides well-maintained facilities throughout the recreation area.',
      items: [
        {
          key: 'swimming-beach',
          title: 'Swimming Beach',
          body: 'A sandy shoreline on the 131-acre lake with designated swim areas, perfect for families and sunbathers. Adjacent bathhouse provides restrooms and changing rooms.',
          photo: { src: '/images/tipsaw-lake/beach.jpg', alt: 'Swimming Beach' },
        },
        {
          key: 'catbrier-shelter',
          title: 'Catbrier Shelter House',
          body: 'The recently renovated Catbrier shelter provides a covered gathering space with picnic tables and grills, ideal for family reunions, group picnics, and rainy-day gatherings.',
          photo: { src: '/images/tipsaw-lake/shelter.jpg', alt: 'Catbrier Shelter House' },
        },
        {
          key: 'amphitheater',
          title: 'Amphitheater',
          body: 'An outdoor amphitheater with tiered seating hosts ranger-led interpretive programs, nature talks, and community events. A connecting interpretive trail explores the surrounding forest ecology.',
          photo: { src: '/images/tipsaw-lake/amphitheater.jpg', alt: 'Amphitheater' },
        },
        {
          key: 'campgrounds',
          title: 'Campgrounds',
          body: 'Over 35 campsites spread across three loops accommodate tent campers and RV enthusiasts alike, with electric hookups and well-spaced pads nestled among hardwood forest.',
          photo: { src: '/images/tipsaw-lake/campsite1.jpg', alt: 'Campgrounds' },
        },
      ],
    },
    additionalFacilities: {
      items: [
        {
          key: 'twin-oaks',
          title: 'Twin Oaks',
          body: 'A versatile gathering space available for events, group meetings, and community programs within the recreation area.',
          photo: { src: '/images/tipsaw-lake/twin-oaks.jpg', alt: 'Twin Oaks facility' },
        },
        {
          key: 'rickenbaugh-house',
          title: 'Rickenbaugh House',
          body: 'A historic building within the recreation area that reflects the rich heritage of Perry County and the Hoosier National Forest.',
          photo: { src: '/images/tipsaw-lake/rickenbaugh-house.jpg', alt: 'Historic Rickenbaugh House' },
        },
        {
          key: 'restrooms',
          title: 'Restrooms & Showers',
          body: 'Modern restroom and shower facilities with warm water, conveniently located near campsites and the swimming beach.',
          photo: { src: '/images/tipsaw-lake/restroom.jpg', alt: 'Restroom and shower facility' },
        },
      ],
    },
    activities: {
      heading: 'Activities',
      intro:
        'A 131-acre lake, over 8 miles of trails, and the forests of the Hoosier National Forest provide year-round recreation for every interest.',
      items: [
        {
          key: 'hiking',
          title: 'Hiking',
          body: 'Over 8 miles of trails wind through rolling hardwood forests and along the lake shore, including the 5.9-mile Tipsaw Lake Trail loop with stunning water views at every turn.',
        },
        {
          key: 'fishing',
          title: 'Fishing',
          body: 'Tipsaw Lake supports healthy populations of largemouth bass, bluegill, channel catfish, and crappie. The electric-motors-only rule keeps the water calm and undisturbed for anglers.',
        },
        {
          key: 'swimming',
          title: 'Swimming',
          body: 'Cool off at the designated swimming beach with a sandy shoreline and shallow entry, great for families with children. Bathhouse with restrooms and changing rooms nearby.',
        },
        {
          key: 'boating',
          title: 'Boating',
          body: 'Launch canoes, kayaks, and small fishing boats from the boat ramp. Electric motors only are permitted on the lake, preserving a peaceful atmosphere on the water.',
        },
        {
          key: 'camping',
          title: 'Camping',
          body: 'Choose from over 35 sites across three loops: tent-friendly electric sites near the beach, shaded woodland spots, and full-hookup RV pads with 50-amp service and water.',
        },
        {
          key: 'picnicking',
          title: 'Picnicking',
          body: 'Covered shelters with tables and grills dot the day-use area, making it easy to host a lakeside lunch, family cookout, or group gathering surrounded by Indiana hardwoods.',
        },
      ],
    },
    photoGallery: {
      heading: 'Photo Gallery',
    },
    closingCta: {
      heading: 'Escape to Tipsaw Lake',
      intro:
        'A 131-acre lake, sandy swimming beach, over 8 miles of trails, and the tranquility of Indiana\'s Hoosier National Forest. Reserve your campsite today.',
    },
  },
}
