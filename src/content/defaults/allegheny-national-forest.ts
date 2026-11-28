import type { PropertyContent } from '../types'

/**
 * Allegheny National Forest hub, Pennsylvania.
 * Page: /allegheny-national-forest.
 *
 * Facts come only from FACTS.md (Forest Service facts in B2, and the per-area
 * facts for the recreation areas named in A2). Recreation.gov links are the
 * current campground URLs, each checked to answer 200. No 2026 rates or season
 * dates are published. Beaver Meadows (decommissioned) and Twin Lakes (not run
 * by the outgoing concessionaire) are left out on purpose. BA Services takes
 * over the concession on January 1, 2027 (Andrew Dalton, June 23 2026);
 * nothing here says BA operates or manages anything today.
 *
 * Gated by src/data/new-forests.ts (NEW_FORESTS_PUBLIC).
 */
export const alleghenyNationalForest: PropertyContent = {
  slug: 'allegheny-national-forest',
  name: 'Allegheny National Forest',
  tagline: 'National Forest',
  locationLine: 'Northwestern Pennsylvania',
  summary:
    'Established in 1923, the Allegheny National Forest covers more than half a million acres in the northwest corner of Pennsylvania. BA Services takes over the concession on January 1, 2027.',
  seo: {
    title: 'Allegheny National Forest | Northwestern Pennsylvania | BA Services',
    description:
      'Campgrounds, cabins and boat launches in the Allegheny National Forest, Pennsylvania. BA Services takes over the concession on January 1, 2027. Reserve on Recreation.gov.',
  },
  hero: {
    src: '/images/allegheny/willow-bay-boats.jpg',
    alt: 'Fishing boats on the water at Willow Bay under a sky of scattered clouds',
  },
  gallery: [],
  paragraphs: [
    'The Allegheny National Forest is in the northwest corner of Pennsylvania. It was established in 1923, covers more than half a million acres, and carries the Forest Service motto "Land of Many Uses."',
    'The Forest Service counts more than 200 miles of hiking trails, 53 miles of cross-country ski trails and 18 miles of interpretive trails, along with over a hundred miles of trails designated for off-highway vehicles.',
    'Several of the recreation areas below sit on the Allegheny Reservoir and Kinzua Bay, including Willow Bay, Dewdrop, Kiasutha and Red Bridge. Buckaloons is on the Allegheny River, and Hearts Content protects a stand of old white pine, hemlock and beech.',
    'BA Services takes over the concession on January 1, 2027. The campgrounds and cabins that take reservations link to their Recreation.gov pages below. The others are first come, first served.',
  ],
  features: [
    'Camping',
    'Cabins',
    'Fishing',
    'Boating',
    'Canoeing',
    'Swimming',
    'Hiking',
    'Mountain biking',
    'Cross-country skiing',
    'Hunting',
    'Fall foliage',
  ],
  stats: [
    { key: 'established', value: '1923', label: 'Established' },
    { key: 'acres', value: '500,000+', label: 'Acres' },
    { key: 'hiking', value: '200+', label: 'Miles of hiking trails' },
    { key: 'start', value: 'Jan 1, 2027', label: 'BA Services takes over' },
  ],
  season: { isSeasonal: false },
  notices: [],
  ctas: {
    hero: {
      label: 'See the campgrounds',
      url: '#campgrounds',
      kind: 'internal',
    },
    recreationGov: {
      label: 'Find a site on Recreation.gov',
      url: 'https://www.recreation.gov/search?q=Allegheny%20National%20Forest',
      kind: 'booking',
    },
    footerExperiences: {
      label: 'View All Experiences',
      url: '/experiences',
      kind: 'internal',
    },
    forestService: {
      label: 'Forest Service: Allegheny National Forest',
      url: 'https://www.fs.usda.gov/r09/allegheny',
      kind: 'external',
    },
  },
  sections: {
    about: {
      heading: 'About the Allegheny National Forest',
    },
    activities: {
      heading: 'Things to do',
    },
    areas: {
      heading: 'Campgrounds and cabins you can reserve',
      intro:
        'Reserve these sites on Recreation.gov. Some sites at Hearts Content and Tracy Ridge are first come, first served.',
      items: [
        {
          key: 'buckaloons',
          title: 'Buckaloons Recreation Area',
          meta: 'Allegheny River',
          body: 'Family and group camping on the Allegheny River near Warren, with electric and non-electric sites, showers, a dump station, a pavilion and a concrete boat launch. The one-mile Seneca Interpretive Trail circles the area.',
          href: 'https://www.recreation.gov/camping/campgrounds/232003',
          photo: { src: '/images/allegheny/buckaloons-boat-launch.jpg', alt: 'A path leading down to the boat launch at Buckaloons Recreation Area' },
        },
        {
          key: 'dewdrop',
          title: 'Dewdrop Recreation Area',
          meta: 'Kinzua Bay',
          body: 'On the western shore of Kinzua Bay along the Longhouse National Scenic Byway, with family campsites, flush toilets, hot showers, a dump station and a boat launch for campers.',
          href: 'https://www.recreation.gov/camping/campgrounds/232036',
          photo: { src: '/images/allegheny/dewdrop-run.jpg', alt: 'Dewdrop Run flowing over rocks through woods at Dewdrop Recreation Area' },
        },
        {
          key: 'hearts-content',
          title: 'Hearts Content Recreation Area',
          meta: 'Scenic area',
          body: 'Next to the Hearts Content National Scenic Area, where white pine, hemlock and beech are 300 to 400 years old, and the Old Growth Trail runs about a mile. Two campsites have lean-to shelters, and there are vault toilets, a dump station and a group site.',
          href: 'https://www.recreation.gov/camping/campgrounds/251943',
          photo: { src: '/images/allegheny/hearts-content-campsite.jpg', alt: 'A campsite with a picnic table among tall trees at Hearts Content Recreation Area' },
        },
        {
          key: 'kiasutha',
          title: 'Kiasutha Recreation Area',
          meta: 'Kinzua Bay',
          body: 'On the western shore of Kinzua Bay, with electric, full-hookup and tent sites, flush toilets, hot showers, a dump station, a swimming beach and picnic area, and a concrete boat launch.',
          href: 'https://www.recreation.gov/camping/campgrounds/232065',
          photo: { src: '/images/allegheny/kiasutha-beach.jpg', alt: 'A stone-walled path under trees leading toward the beach at Kiasutha Recreation Area' },
        },
        {
          key: 'loleta',
          title: 'Loleta Recreation Area',
          meta: 'Near Marienville',
          body: 'About six miles south of Marienville, built around an old mill pond with swimming beaches. There are two camping loops, two group areas that must be reserved, and a beach bathhouse with flush toilets and hot showers. Millstone Creek has trout fishing, and the Clarion River is about four miles south.',
          href: 'https://www.recreation.gov/camping/campgrounds/232005',
          photo: { src: '/images/allegheny/loleta-pavilion.jpg', alt: 'A shingled picnic pavilion with tables at Loleta Recreation Area' },
        },
        {
          key: 'red-bridge',
          title: 'Red Bridge Recreation Area',
          meta: 'Kinzua Bay',
          body: 'On the eastern shore of Kinzua Bay on State Route 321, with electric and full-hookup sites, hot showers, vault and flush toilets, a dump station and three cabins.',
          href: 'https://www.recreation.gov/camping/campgrounds/232088',
          photo: { src: '/images/allegheny/red-bridge-fall.jpg', alt: 'A campsite in autumn woods at Red Bridge Recreation Area, with the water behind the trees' },
        },
        {
          key: 'tracy-ridge',
          title: 'Tracy Ridge Recreation Area',
          meta: 'Ridge top',
          body: 'A tree-shaded ridge-top campground about three miles east of the Allegheny Reservoir, with hand-pumped water and vault toilets. The Tracy Ridge Hiking Trail System links to the North Country National Scenic Trail and makes an 8.7-mile loop possible. Part of the season is reservable.',
          href: 'https://www.recreation.gov/camping/campgrounds/232126',
          photo: { src: '/images/allegheny/tracy-ridge-entrance.jpg', alt: 'The Tracy Ridge Recreation Area entrance sign beside a forest road' },
        },
        {
          key: 'willow-bay',
          title: 'Willow Bay Recreation Area',
          meta: 'Allegheny Reservoir',
          body: 'On the south shore of Willow Bay, about 15 miles west of Bradford, with electric sites, hot showers, flush and vault toilets, a dump station, a concrete boat launch with a courtesy dock, and 13 rustic cabins.',
          href: 'https://www.recreation.gov/camping/campgrounds/232127',
          photo: { src: '/images/allegheny/willow-bay-cabin.jpg', alt: 'A log cabin with a covered porch and picnic table under fall leaves at Willow Bay' },
        },
      ],
    },
    more: {
      heading: 'More places to camp and launch',
      intro:
        'Farnsworth Cabin takes reservations. The rest of these places are first come, first served.',
      items: [
        {
          key: 'farnsworth',
          title: 'Farnsworth Cabin',
          meta: 'Clarendon',
          body: 'A stone cabin built in the 1930s by the Civilian Conservation Corps, with two bedrooms, a bath, a kitchen, a dining room and a living room. It sits next to an active trout hatchery and a stocked stream.',
          href: 'https://www.recreation.gov/camping/campgrounds/234681',
        },
        {
          key: 'kelly-pines',
          title: 'Kelly Pines Campground',
          meta: 'First come, first served',
          body: 'A horse camp in the Spring Creek area, with sites that have tie-down stalls for equestrian campers and regular sites without stalls. A vault toilet, potable water and a manure bin are on site.',
        },
        {
          key: 'minister-creek',
          title: 'Minister Creek Campground',
          meta: 'First come, first served',
          body: 'Family campsites along Minister Creek, with vault toilets and hand-pumped water. The six-mile Minister Creek Hiking Trail loop joins the North Country National Scenic Trail.',
        },
        {
          key: 'pine-grove',
          title: 'Pine Grove Campground',
          meta: 'Boat or hike in',
          body: 'First come, first served. A third of a mile on foot from Forest Road 147, or by boat from Wolf Run Marina or Sugar Bay.',
        },
        {
          key: 'handsome-lake',
          title: 'Handsome Lake Campground',
          meta: 'Boat or hike in',
          body: 'First come, first served. A 5.2-mile hike, or by boat from the Roper Hollow launch.',
        },
        {
          key: 'hooks-brook',
          title: 'Hooks Brook Campground',
          meta: 'Boat or hike in',
          body: 'First come, first served. Reached only by boat or on foot, with the Willow Bay and Webbs Ferry launches closest.',
        },
        {
          key: 'hopewell',
          title: 'Hopewell Campground',
          meta: 'Boat or hike in',
          body: 'First come, first served. A six-mile hike, or by boat from the Roper Hollow launch.',
        },
        {
          key: 'morrison',
          title: 'Morrison Campground',
          meta: 'Boat or hike in',
          body: 'First come, first served. A hike of six to seven miles, or by boat from the Elijah Run launch.',
        },
        {
          key: 'launches',
          title: 'Boat launches',
          meta: 'Allegheny Reservoir',
          body: 'Elijah Run, Roper Hollow and Webb\'s Ferry give boat access to the reservoir. Roper Hollow is reached by a three-mile dirt road that is not suited to large boats.',
        },
      ],
    },
    goodToKnow: {
      heading: 'Good to know',
      intro: 'Planning information for a visit.',
      items: [
        {
          key: 'reservations',
          title: 'How do I reserve?',
          items: [
            'Reservable campgrounds and cabins are booked on Recreation.gov, or by phone at 1-877-444-6777.',
            'The boat-in and hike-in campgrounds, Kelly Pines and Minister Creek are first come, first served.',
            'The boat-in and hike-in campgrounds have vault toilets, no drinking water and no boat docks.',
          ],
        },
        {
          key: 'offices',
          title: 'Where are the Forest Service offices?',
          items: [
            'Forest headquarters: 4 Farm Colony Drive, Warren, PA 16365, 814-723-5150.',
            'Bradford Ranger District: 29 Forest Service Dr., Bradford, PA 16701, 814-362-4613.',
            'Marienville Ranger District: 131 Smokey Lane, Marienville, PA 16239, 814-927-6628.',
          ],
        },
      ],
    },
    closingCta: {
      heading: 'Plan your trip',
      intro:
        'Find a campsite or a cabin on Recreation.gov, or look through the campgrounds above.',
    },
  },
}
