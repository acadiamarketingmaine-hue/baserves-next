import type { PropertyContent } from '../types'

/**
 * Moved verbatim out of src/app/hardin-ridge-recreation-area/page.tsx.
 *
 * That bespoke page shadows the `hardin-ridge-recreation-area` entry that used
 * to live here (lifted from src/app/[slug]/page.tsx and rendered nowhere), so
 * these are now the values that actually render. The shadowed [slug] values
 * disagreed on the tagline, the location line, the hero photo and the whole
 * gallery (one of its three photographs was a Monongahela panorama, another a
 * Tipsaw photograph), both paragraphs, the stat labels, the feature list and
 * both CTA labels. Recorded in design-audit/website-editor-inventory.md, not
 * reconciled here.
 *
 * UX pass, Sep 2026: the season stat now reads Apr–Oct to match the Access and
 * Operations paragraph, and every campsite count is 195, from Recreation.gov
 * (campground 232056, checked Sep 24 2026). The page used to say 200+ and 208.
 * Still open: the hero photograph is the entrance sign
 * carrying the alt text "Hardin Ridge Recreation Area beach on Monroe Lake,
 * Indiana".
 */
export const hardinRidgeRecreationArea: PropertyContent = {
  slug: 'hardin-ridge-recreation-area',
  name: 'Hardin Ridge Recreation Area',
  tagline: 'Indiana Recreation Area',
  locationLine: 'Monroe County, Indiana',
  summary:
    'Explore Hardin Ridge Recreation Area on Monroe Lake in Hoosier National Forest. 195 campsites, swimming beach, boat ramp, and 12+ miles of trails.',
  seo: {
    title: 'Hardin Ridge Recreation Area | Monroe County, Indiana | BA Services',
    description:
      'Explore Hardin Ridge Recreation Area on Monroe Lake in Hoosier National Forest. 195 campsites, swimming beach, boat ramp, and 12+ miles of trails.',
  },
  hero: {
    src: '/images/hardin-ridge/boat-dock.jpg',
    alt: 'Boat dock and ramp on Monroe Lake at Hardin Ridge Recreation Area, Indiana',
  },
  gallery: [
    { src: '/images/hardin-ridge/beach.jpg', alt: 'Swimming beach on Monroe Lake at Hardin Ridge' },
    { src: '/images/hardin-ridge/boat-dock.jpg', alt: 'Accessible boat dock and ramp' },
    { src: '/images/hardin-ridge/cabin-front.jpg', alt: 'Cabin front at Hardin Ridge' },
    { src: '/images/hardin-ridge/cabin-interior.jpg', alt: 'Cabin interior' },
    { src: '/images/hardin-ridge/overlook.jpg', alt: 'Monroe Lake overlook and interpretive sign' },
    { src: '/images/hardin-ridge/aerial.jpg', alt: 'Aerial view of Hardin Ridge Recreation Area' },
    { src: '/images/hardin-ridge/campsite.jpg', alt: 'Campsite in the Hoosier National Forest' },
    { src: '/images/hardin-ridge/shelter.jpg', alt: 'Shelter house with Monroe Lake view' },
    { src: '/images/hardin-ridge/entrance.jpg', alt: 'Hardin Ridge entrance sign' },
    { src: '/images/hardin-ridge/bathhouse.jpg', alt: 'Restroom and bath house facilities' },
  ],
  paragraphs: [
    'Hardin Ridge Recreation Area is a premier destination within Hoosier National Forest, located on the wooded shores of Monroe Lake in Monroe County, Indiana. Situated approximately 12 miles south of Bloomington and 60 miles south of Indianapolis, the area is easily accessible and serves a large visitor base, with more than two million people within a two-hour drive and over seven million within a 200-mile radius.',
    'Set along Indiana\'s largest lake, Hardin Ridge offers a well-rounded outdoor experience combining scenic beauty with modern amenities. The recreation area has been recognized as one of America\'s top campgrounds and continues to be a popular destination for families, anglers, and outdoor enthusiasts.',
  ],
  features: [
    'Hiking & Trail Walking',
    'Fishing',
    'Swimming',
    'Boating & Kayaking',
    'Camping (Electric & Primitive)',
    'Carry-In Tent Camping',
    'Wildlife Watching',
    'Picnicking',
    'Group Gatherings',
    'Nature Photography',
  ],
  stats: [
    { key: 'campsites', value: '195', label: 'Campsites' },
    { key: 'lake', value: '10,750', label: 'Acre Lake' },
    { key: 'trails', value: '12+', label: 'Miles Trails' },
    { key: 'open', value: 'Apr–Oct', label: 'Season' },
  ],
  season: {
    isSeasonal: true,
    note: 'Hardin Ridge operates seasonally from early April through mid- to late October under a Forest Service special use permit.',
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
      url: 'https://www.recreation.gov/camping/campgrounds/232056',
      kind: 'booking',
    },
    sidebar: {
      label: 'Reserve on Recreation.gov',
      url: 'https://www.recreation.gov/camping/campgrounds/232056',
      kind: 'booking',
    },
    footer: {
      label: 'Reserve on Recreation.gov',
      url: 'https://www.recreation.gov/camping/campgrounds/232056',
      kind: 'booking',
    },
    footerForest: {
      label: 'Hoosier National Forest',
      url: '/hoosier-national-forest',
      kind: 'internal',
    },
  },
  sections: {
    about: {
      heading: 'About Hardin Ridge',
    },
    campgroundFacilities: {
      heading: 'Campground Facilities',
      paragraphs: [
        'The campground consists of six forested loops with a total of 195 campsites, including several accessible sites and nine host sites. Campsites are designed to accommodate a variety of camping styles, from RVs to walk-in tent sites. Most sites include a picnic table, fire ring with grill, lantern hook, and designated tent space, with many offering electric hookups and some providing water service.',
        'Interior roads and most parking spurs are paved and level, accommodating a wide range of recreational vehicles. Modern restroom and shower facilities are available throughout the campground, supplemented by vault toilets in select locations. A centralized RV dump station is provided for campers, and trash dumpsters are conveniently located in each loop.',
      ],
    },
    recreationAmenities: {
      heading: 'Recreation Amenities',
      paragraphs: [
        'Hardin Ridge provides extensive access to Monroe Lake, a 10,750-acre reservoir known for boating, fishing, and water sports. The lake supports a variety of fish species, including bass, bluegill, crappie, catfish, and walleye. A three-lane boat launch with parking for approximately 75 vehicles and trailers, along with an accessible courtesy dock, makes lake access convenient.',
        'The recreation area also features a 300-foot seasonal swimming beach with a changing facility, playground, and nearby host site. Two large picnic areas offer open green space, grills, and shelters—one with electrical service—while three reservable shelter houses provide gathering space for groups.',
        'Trails wind throughout the area, including a 1.5-mile recreation trail and a 1.2-mile interpretive trail leading to the lake. An accessible amphitheater with lighting and audio-visual capabilities supports educational and evening programs.',
      ],
    },
    additionalFeatures: {
      heading: 'Additional Features',
      paragraphs: [
        'Two semi-primitive lakeside rental cabins provide a more private overnight option, each equipped with electricity, a picnic table, and fire ring, with shared restroom facilities nearby.',
        'The recreation area is supported by city water and an on-site wastewater treatment system. Additional administrative facilities, including a maintenance area and staff housing, are located within the site but are not accessible to the public.',
      ],
    },
    accessAndOperations: {
      heading: 'Access and Operations',
      paragraphs: [
        'Hardin Ridge operates seasonally from early April through mid- to late October under a Forest Service special use permit. A staffed entrance station manages visitor access. A private residential area lies beyond the entrance gate; while residents maintain legal access to their properties, general recreation use remains subject to standard fees and regulations.',
        'Hardin Ridge Recreation Area offers a balanced blend of accessibility, modern infrastructure, and natural beauty, making it one of the most significant and well-utilized recreation sites within Hoosier National Forest.',
      ],
    },
    hoosierCallout: {
      heading: 'Hoosier National Forest',
      paragraphs: [
        'Hardin Ridge is nestled within the Hoosier National Forest, which covers over 200,000 acres of southern Indiana\'s hill country. The forest\'s rolling terrain, carved by ancient rivers and glacial meltwater, creates a varied landscape of ridgetops, ravines, and lake shoreline that supports exceptional biodiversity and year-round recreation opportunities.',
      ],
    },
    thingsToDo: {
      heading: 'Things to Do',
    },
    readyToVisit: {
      heading: 'Ready to Visit?',
      intro:
        'Reserve your campsite or cabin at Hardin Ridge Recreation Area on the shores of Indiana\'s largest lake.',
    },
    facilities: {
      heading: 'Facilities',
      intro:
        'Hardin Ridge offers well-maintained facilities on the shores of Monroe Lake, from spacious campsites and an accessible boat ramp to shelter houses and modern bath houses.',
      items: [
        {
          key: 'campsites',
          title: 'Campsites',
          body: '195 campsites spread across multiple loops, including electric and non-electric sites as well as carry-in tent sites for a more primitive experience in the Hoosier National Forest.',
          photo: { src: '/images/hardin-ridge/campsite.jpg', alt: 'Campsites' },
        },
        {
          key: 'boat-dock',
          title: 'Accessible Boat Dock & Ramp',
          body: 'A fully accessible boat dock and ramp provide easy launching into Monroe Lake, whether you are trailering a fishing boat, dropping in a kayak, or heading out on a pontoon cruise.',
          photo: { src: '/images/hardin-ridge/boat-dock.jpg', alt: 'Accessible Boat Dock & Ramp' },
        },
        {
          key: 'shelter-houses',
          title: 'Shelter Houses',
          body: 'Shelter houses with views of Monroe Lake are available for group gatherings, family reunions, picnics, and special events within the recreation area.',
          photo: { src: '/images/hardin-ridge/shelter.jpg', alt: 'Shelter Houses' },
        },
        {
          key: 'bath-house',
          title: 'Restroom & Bath House',
          body: 'Modern restroom and bath house facilities with showers and changing areas are conveniently located throughout the campground loops.',
          photo: { src: '/images/hardin-ridge/bathhouse.jpg', alt: 'Restroom & Bath House' },
        },
      ],
    },
    activities: {
      heading: 'Activities',
      intro:
        'With 10,750 acres of lake, 12+ miles of trails, and the forests of the Hoosier National Forest, Hardin Ridge provides year-round recreation for every interest.',
      items: [
        {
          key: 'hiking',
          title: 'Hiking',
          body: 'Over 12 miles of trails wind through the rolling hardwood forests of the Hoosier National Forest, from interpretive nature walks to longer woodland treks.',
        },
        {
          key: 'fishing',
          title: 'Fishing',
          body: 'Monroe Lake supports excellent populations of largemouth bass, smallmouth bass, bluegill, channel catfish, crappie, and walleye. Cast from shore or launch from the boat ramp.',
        },
        {
          key: 'swimming',
          title: 'Swimming',
          body: 'The sandy swimming beach on Monroe Lake is one of the most popular features at Hardin Ridge, offering a safe and inviting place for families to cool off all summer long.',
        },
        {
          key: 'boating',
          title: 'Boating',
          body: 'Explore 10,750 acres of Monroe Lake by canoe, kayak, pontoon, or motorboat. The accessible boat dock and ramp make launching easy for watercraft of all sizes.',
        },
        {
          key: 'wildlife-watching',
          title: 'Wildlife Watching',
          body: 'The forests and shoreline of Monroe Lake attract white-tailed deer, wild turkey, bald eagles, great blue herons, and a rich variety of songbirds throughout the year.',
        },
        {
          key: 'camping',
          title: 'Camping',
          body: 'From full-hookup electric sites to primitive carry-in tent camping, Hardin Ridge offers 195 campsites across multiple loops to suit every style of outdoor stay.',
        },
      ],
    },
    photoGallery: {
      heading: 'Photo Gallery',
    },
    closingCta: {
      heading: 'Experience Indiana\'s Largest Lake',
      intro:
        '195 campsites, a swimming beach, accessible boat ramp, and 12+ miles of trails on the shores of Monroe Lake. Hardin Ridge Recreation Area is southern Indiana\'s premier outdoor destination.',
    },
  },
}
