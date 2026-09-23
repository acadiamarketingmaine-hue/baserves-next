import type { PropertyContent } from '../types'

/**
 * Moved verbatim out of
 * src/app/monongahela-national-forest/stuart-recreation-area/page.tsx.
 *
 * One of the six Cheat-Potomac campground pages, which all share a single
 * bespoke layout. The page is at /monongahela-national-forest/stuart-recreation-area,
 * not at /<slug>, so SLUG_TEMPLATE_SLUGS keeps /stuart-recreation-area answering 404
 * exactly as it does today.
 *
 * `locationLine` is empty and `gallery` is empty because this layout renders
 * neither: the entrance-sign photograph behind the hero (with an empty alt,
 * as a decorative background) is its only image.
 *
 * VERBATIM WART, do not "fix": the SEO description is cut off mid-sentence in
 * the source and really does end that way in the rendered <meta> tag and in
 * the page's JSON-LD. Recorded in design-audit/website-editor-inventory.md.
 */
export const stuartRecreationArea: PropertyContent = {
  slug: 'stuart-recreation-area',
  name: 'Stuart Recreation Area',
  tagline: 'Lakeside Camping and Recreation',
  locationLine: '',
  summary: 'Stuart Recreation Area offers family-friendly camping along the shores of a scenic mountain lake in the Monongahela National Forest. The area features both tent',
  seo: {
    title: 'Stuart Recreation Area | Monongahela National Forest | BA Services',
    description: 'Stuart Recreation Area offers family-friendly camping along the shores of a scenic mountain lake in the Monongahela National Forest. The area features both tent',
  },
  hero: {
    src: '/images/monongahela/entrance-sign.jpg',
    alt: '',
  },
  gallery: [],
  paragraphs: [
    'Stuart Recreation Area is a well-developed, family-friendly destination located along the Shavers Fork of the Cheat River, approximately six miles northeast of Elkins, West Virginia, at the junction of WV Route 6 and Forest Road 91 (Stuart Memorial Drive). Nestled in the Allegheny Mountains within the Monongahela National Forest, the site was originally constructed in the 1930s by the Civilian Conservation Corps and continues to offer a blend of historic character and modern amenities.',
    'The recreation area includes a campground, a group campground, and a day-use area, providing a wide range of overnight and day-use opportunities. The main campground features 26 campsites (25 single and 1 double), all with electric hookups, paved spurs, picnic tables, fire rings, and lantern posts. Most campsites and facilities are ADA accessible. Sanitary facilities include two single-unit vault toilets, one double-unit vault toilet, and a six-unit flush restroom with four accessible shower units.',
    'A separate group campground accommodates up to 40 people and includes fire rings, picnic tables, lantern posts, and two single-unit vault toilets. While there is no electric service at the group site, drinking water is available from the main campground. The group campground is not accessible.',
    'The day-use area is centered around picnicking and outdoor recreation along the river. It features three reservable pavilions: a large pavilion with electricity that can accommodate up to 100 people, and two non-electric pavilions—the Small Pavilion (capacity 50) and the Alpena Pavilion (capacity 25). Additional amenities include multiple picnic tables and pedestal grills, five parking areas accommodating approximately 25–40 vehicles each, a 14-acre open field, a river beach with easy water access, a volleyball net, and four restroom buildings, including changing rooms. Key facilities, including restrooms, parking areas, and the large and small pavilions—are accessible.',
    'A unique feature of the site is the historic Stuart House, a renovated cabin listed on the National Register of Historic Places and available to reserve. The fully furnished cabin includes a complete kitchen, one full bathroom, two living areas, a study room, and two bedrooms with a total of four beds. The cabin is equipped with electric heat and public water and is connected to the on-site wastewater system, though it does not have air conditioning.',
    'Recreational opportunities throughout the area include camping, fishing, swimming, hiking, and relaxing along the scenic river corridor.',
    'Support facilities include trash dumpsters located in both the campground and recreation area, with additional trash receptacles at pavilions and the group site. An RV dump station is located adjacent to the campground. The site is supported by an on-site wastewater treatment system utilizing a recirculating sand filter.',
    'Stuart Recreation Area offers a balanced mix of history, accessibility, and outdoor recreation, making it a versatile destination for families, groups, and individual visitors alike. Stuart typically operates from mid-April through late October, aligning with peak seasonal demand.',
  ],
  features: [
    'Lakeside campsites',
    'Swimming beach',
    'Fishing access',
    'Hiking trails',
    'Picnic areas',
    'Vault restrooms',
  ],
  stats: [
    { key: 'sites', value: '31', label: 'Sites' },
    { key: 'feature', value: 'Mountain Lake', label: 'Feature' },
    { key: 'season', value: 'May–Oct', label: 'Season' },
  ],
  season: {
    isSeasonal: true,
    note: 'Stuart typically operates from mid-April through late October, aligning with peak seasonal demand.',
  },
  notices: [],
  ctas: {
    parentForest: {
      label: 'Monongahela National Forest',
      url: '/monongahela-national-forest',
      kind: 'internal',
    },
    hero: {
      label: 'Book on Recreation.gov',
      url: 'https://www.recreation.gov/camping/campgrounds/232007',
      kind: 'booking',
    },
    reserve: {
      label: 'Reserve Your Site',
      url: 'https://www.recreation.gov/camping/campgrounds/232007',
      kind: 'booking',
    },
    footer: {
      label: 'Book on Recreation.gov',
      url: 'https://www.recreation.gov/camping/campgrounds/232007',
      kind: 'booking',
    },
    footerBack: {
      label: 'Back to Monongahela NF',
      url: '/monongahela-national-forest',
      kind: 'internal',
    },
  },
  sections: {
    about: {
      heading: 'About Stuart Recreation Area',
    },
    features: {
      heading: 'Features & Amenities',
    },
    closingCta: {
      heading: 'Ready to Visit?',
      intro:
        'Reservations are managed through Recreation.gov. Book your campsite today and experience the Monongahela National Forest.',
    },
  },
}
