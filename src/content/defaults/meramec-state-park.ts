import type { PropertyContent } from '../types'

/**
 * Moved verbatim out of src/app/experiences/meramec-state-park/page.tsx.
 *
 * This property's page is NOT at /<slug>: it lives under /experiences/, and
 * the `meramec-state-park` entry in src/app/experiences/[slug]/page.tsx is
 * shadowed by it. Nothing in the content layer should make /meramec-state-park
 * start answering - see SLUG_TEMPLATE_SLUGS in ../slugs.ts.
 *
 * Two things on this page disagree with themselves and are recorded, not
 * fixed, in design-audit/website-editor-inventory.md: the "Book Cabins &
 * Motel" tile tells the visitor to reserve "at escape.baserves.com" while its
 * link goes to meramecpark.com, and the Fisher Cave photograph is cabin-19.jpg
 * with the alt text "Fisher Cave at Meramec State Park".
 */
export const meramecStatePark: PropertyContent = {
  slug: 'meramec-state-park',
  name: 'Meramec State Park',
  tagline: 'Missouri State Park',
  locationLine: 'Sullivan, Missouri',
  summary:
    'Explore Meramec State Park along the Meramec River in Sullivan, Missouri. 19 cabins, motel lodging, 40+ caves, Fisher Cave tours, float trips, and CCC-built historic architecture across 6,896 acres.',
  seo: {
    title: 'Meramec State Park | Sullivan, Missouri | BA Services',
    description:
      'Explore Meramec State Park along the Meramec River in Sullivan, Missouri. 19 cabins, motel lodging, 40+ caves, Fisher Cave tours, float trips, and CCC-built historic architecture across 6,896 acres.',
  },
  hero: {
    src: '/images/meramec-state-park/cabin-2.jpg',
    alt: 'Meramec State Park cabin along the Meramec River in Sullivan, Missouri',
  },
  gallery: [
    { src: '/images/meramec-state-park/cabin-2.jpg', alt: 'Cabin at Meramec State Park' },
    { src: '/images/meramec-state-park/cabin-3.jpg', alt: 'Cabin surrounded by Ozark forest' },
    { src: '/images/meramec-state-park/cabin-4.jpg', alt: 'Stone and timber cabin exterior' },
    { src: '/images/meramec-state-park/cabin-6.jpg', alt: 'CCC-built cabin among the trees' },
    { src: '/images/meramec-state-park/cabin-7.jpg', alt: 'Cabin with wooded setting' },
    { src: '/images/meramec-state-park/cabin-8.jpg', alt: 'Park cabin in autumn' },
    { src: '/images/meramec-state-park/cabin-10.jpg', alt: 'Rustic cabin at Meramec' },
    { src: '/images/meramec-state-park/cabin-11.jpg', alt: 'Cabin view at Meramec State Park' },
    { src: '/images/meramec-state-park/cabin-14-15.jpg', alt: 'Paired cabins in the forest' },
    { src: '/images/meramec-state-park/cabin-16-17.jpg', alt: 'Adjacent cabins at Meramec' },
    { src: '/images/meramec-state-park/cabin-19.jpg', alt: 'Cabin 19 at Meramec State Park' },
    { src: '/images/meramec-state-park/watercraft-rentals.jpg', alt: 'Watercraft rentals on the Meramec River' },
    { src: '/images/meramec-state-park/riverstop-interior.jpg', alt: 'Inside the Riverstop Store' },
    { src: '/images/meramec-state-park/float-takeout.jpg', alt: 'Float trip takeout on the Meramec River' },
    { src: '/images/meramec-entrance-sign.jpg', alt: 'CCC monument at Meramec State Park' },
    { src: '/images/meramec-state-park/fireside-store.jpg', alt: 'Fireside Store & Grill' },
  ],
  paragraphs: [
    'Meramec State Park encompasses 6,896 acres along the scenic Meramec River in the heart of the Missouri Ozarks. Located in Franklin County approximately 60 miles southwest of St. Louis, the park is easily accessible from Interstate 44 via the Sullivan/Hwy. 185 exit. Known for its striking natural beauty and wide range of recreational opportunities, Meramec is one of Missouri\'s most popular outdoor destinations.',
    'The Meramec River serves as the centerpiece of the park, winding through a landscape of steep forested hills, limestone bluffs, and cool, spring-fed waters. The river offers excellent opportunities for floating, fishing, and swimming, with canoe, kayak, and raft rentals available for visitors seeking to experience the river firsthand.',
    'The park\'s terrain is defined by rugged Ozark topography, featuring dense hardwood forests, pine stands, and more than 40 caves—one of the highest concentrations in the state. Thirteen miles of hiking trails traverse the park, leading visitors through wooded hollows, along riverbanks, and up to scenic overlooks.',
    'Meramec State Park offers a variety of overnight accommodations to suit different preferences. Nineteen cabins range from cozy one-bedroom retreats to larger units suitable for groups, while the 22-room Hickory Ridge Motel provides comfortable, modern lodging in a hilltop setting.',
    'Adjacent to the motel, the Hickory Ridge Conference Center accommodates up to 125 guests and serves as a venue for meetings, weddings, reunions, and other group events. Nearby, the Overlook Pavilion offers a scenic outdoor venue with sweeping views of the Meramec River valley.',
    'Visitors enjoy hiking, camping, fishing, floating, caving, and picnicking. Additional amenities include a fully stocked Riverstop Store, dining options overlooking the river valley, and easy access to outdoor recreation equipment and services.',
    'With its combination of natural beauty, accessible location, and well-developed facilities, Meramec State Park offers a balanced blend of adventure and comfort.',
  ],
  features: [
    '19 Cabins',
    'Hickory Ridge Motel',
    'Riverstop Store & Float Rentals',
    'Fireside Store & Grill',
    'Visitor Center & Aquariums',
    'Fisher Cave Tours',
    'Conference Center',
    'Overlook Pavilion',
    'Recreation Hall',
    '13 Miles of Trails',
    'Picnic Areas & Shelters',
    'Swimming & Fishing',
  ],
  stats: [
    { key: 'cabins', value: '19', label: 'Cabins' },
    { key: 'caves', value: '40+', label: 'Caves' },
    { key: 'trails', value: '13 mi', label: 'Trails' },
    { key: 'acres', value: '6,896', label: 'Acres' },
  ],
  season: { isSeasonal: false },
  notices: [],
  ctas: {
    hero: {
      label: 'Book Your Stay',
      url: 'https://www.meramecpark.com/',
      kind: 'booking',
    },
    sidebar: {
      label: 'Check Availability',
      url: 'https://www.meramecpark.com/',
      kind: 'booking',
    },
    cabins: {
      label: 'View All Cabins & Book',
      url: 'https://www.meramecpark.com/',
      kind: 'booking',
    },
    resourceBookLodging: {
      label: 'Book Cabins & Motel',
      url: 'https://www.meramecpark.com/',
      kind: 'booking',
    },
    resourceWatercraft: {
      label: 'Watercraft Rentals',
      url: 'https://www.meramecpark.com/',
      kind: 'booking',
    },
    footer: {
      label: 'Book Your Stay',
      url: 'https://www.meramecpark.com/',
      kind: 'booking',
    },
    footerExperiences: {
      label: 'View All Experiences',
      url: '/experiences',
      kind: 'internal',
    },
  },
  sections: {
    about: {
      heading: 'About Meramec State Park',
    },
    cccLegacy: {
      heading: 'Civilian Conservation Corps Legacy',
      paragraphs: [
        'Meramec State Park was built by the Civilian Conservation Corps beginning in 1933. Two CCC camps operated within the park — the 739th Company and the 2728th Company — and over 2,500 young men contributed to shaping the park\'s infrastructure during the Great Depression era.',
        'These workers constructed the stone shelters, trails, roads, and the iconic lodge that still stand today. The CCC legacy is visible throughout the park in its distinctive rustic stone and timber architecture, a testament to the craftsmanship and dedication of a generation that helped build America\'s public lands.',
      ],
    },
    naturalArea: {
      heading: 'Meramec Upland Forest Natural Area',
      paragraphs: [
        'Within the park lies the 461-acre Meramec Upland Forest Natural Area, a designated old-growth forest that has remained largely undisturbed for centuries. This rare remnant of the original Ozark woodland harbors towering oaks, hickories, and a rich understory of native wildflowers. It is one of the finest examples of upland forest in Missouri and provides critical habitat for a wide array of wildlife.',
      ],
    },
    amenities: {
      heading: 'Park Amenities',
    },
    readyToVisit: {
      heading: 'Ready to Visit?',
      intro: 'Book a cabin or motel room at Meramec State Park and experience the Ozarks.',
      paragraphs: ['2-night minimum stay required'],
    },
    cabinLodging: {
      heading: 'Cabin Lodging',
      intro:
        '19 cabins nestled in the Ozark forest, featuring CCC-era stone and timber architecture. $20 pet fee and $20 extra person fee apply. 2-night minimum stay.',
      items: [
        {
          key: 'one-bedroom',
          title: '1-Bedroom Cabins',
          meta: '$140',
          body: 'Cozy one-bedroom cabins nestled in the Ozark forest, perfect for couples or small families. Each cabin features CCC-era rustic stone and timber architecture.',
          photo: { src: '/images/meramec-state-park/cabin-1.jpg', alt: '1-Bedroom Cabins' },
        },
        {
          key: 'two-bedroom',
          title: '2-Bedroom Cabins',
          meta: '$170',
          body: 'Spacious two-bedroom cabins with room for the whole family. Enjoy the comfort of modern amenities wrapped in historic CCC craftsmanship.',
          photo: { src: '/images/meramec-state-park/cabin-5.jpg', alt: '2-Bedroom Cabins' },
        },
        {
          key: 'large',
          title: 'Large Cabins',
          meta: '$345',
          body: 'Our largest cabins are ideal for reunions, group getaways, and extended families. Generous living space with full kitchens and beautiful wooded surroundings.',
          photo: { src: '/images/meramec-state-park/cabin-12-13.jpg', alt: 'Large Cabins' },
        },
      ],
    },
    fisherCave: {
      heading: 'Fisher Cave',
      intro: 'Guided Cave Tours',
      paragraphs: [
        'Fisher Cave is one of more than 40 caves within Meramec State Park, and it is the only one open to the public for guided tours. This remarkable cave features stunning calcite crystal deposits, ancient bear claw marks scratched into the walls, towering 30-foot columns, and unique geological formations shaped over millions of years.',
        'Seasonal guided tours take visitors deep into the cave to witness these natural wonders up close. The cave maintains a constant cool temperature year-round, making it a refreshing destination on hot summer days.',
      ],
      items: [
        { key: 'calcite', title: 'Calcite Crystals' },
        { key: 'columns', title: '30-Foot Columns' },
        { key: 'seasonal', title: 'Seasonal Tours' },
        { key: 'bear-claws', title: 'Bear Claw Marks' },
        {
          key: 'photo',
          photo: { src: '/images/meramec-state-park/cabin-19.jpg', alt: 'Fisher Cave at Meramec State Park' },
        },
      ],
    },
    watercraft: {
      heading: 'Float the Meramec River',
      intro:
        'Experience the beauty of the Meramec River from the water. The Riverstop Store offers canoe, kayak, and raft rentals for scenic float trips past limestone bluffs, gravel bars, and forested riverbanks.',
      paragraphs: ['Rafts also available in various sizes. Visit the Riverstop Store for full pricing.'],
      items: [
        {
          key: 'photo',
          photo: {
            src: '/images/meramec-state-park/watercraft-rentals.jpg',
            alt: 'Watercraft rentals for floating the Meramec River',
          },
        },
        { key: 'rates-heading', title: 'Watercraft Rental Rates' },
        { key: 'columns', items: ['Watercraft', 'Weekday', 'Weekend'] },
        { key: 'canoe', title: 'Canoe', items: ['$54', '$64'] },
        { key: 'kayak', title: 'Kayak', items: ['$42', '$47'] },
      ],
    },
    facilities: {
      heading: 'Park Facilities',
      intro:
        'Meramec State Park offers a full range of facilities to make your visit comfortable and memorable.',
      items: [
        {
          key: 'riverstop',
          title: 'Riverstop Store & Float Rentals',
          body: 'Your launching point for Meramec River adventures. Rent canoes, kayaks, and rafts for scenic float trips. The store also carries camping supplies, snacks, ice, and souvenirs.',
          photo: { src: '/images/meramec-state-park/riverstop-store.jpg', alt: 'Riverstop Store & Float Rentals' },
        },
        {
          key: 'fireside',
          title: 'Fireside Store & Grill',
          body: 'Full-service dining and camp store offering hot food, groceries, firewood, ice, and camping supplies. A convenient one-stop shop for everything you need during your stay.',
          photo: { src: '/images/meramec-state-park/fireside-store.jpg', alt: 'Fireside Store & Grill' },
        },
        {
          key: 'visitor-center',
          title: 'Visitor Center',
          body: 'Discover the natural and cultural history of the park through nature exhibits and aquariums featuring native fish species. Helpful staff provide park information and trail recommendations.',
          photo: { src: '/images/meramec-entrance-sign.jpg', alt: 'Visitor Center' },
        },
        {
          key: 'hickory-ridge-motel',
          title: 'Hickory Ridge Motel',
          body: 'Comfortable motel lodging within the park. Standard rooms at $90/night and loft rooms (111, 202, 208) at $130/night. $20 extra person fee with a 2-night minimum stay.',
          photo: { src: '/images/meramec-state-park/hickory-ridge-motel.jpg', alt: 'Hickory Ridge Motel' },
        },
        {
          key: 'conference-center',
          title: 'Conference Center',
          body: 'A versatile venue available for corporate retreats, meetings, workshops, and special events. Modern amenities in a stunning natural setting.',
          photo: { src: '/images/meramec-state-park/conference-center.jpg', alt: 'Conference Center' },
        },
        {
          key: 'recreation-hall',
          title: 'Recreation Hall',
          body: 'A multi-purpose facility perfect for group gatherings, family reunions, and community events within the park.',
          photo: { src: '/images/meramec-state-park/recreation-hall.jpg', alt: 'Recreation Hall' },
        },
        {
          key: 'overlook-pavilion',
          title: 'Overlook Pavilion',
          body: 'A scenic overlook pavilion available for events and gatherings, offering sweeping views of the Meramec River valley and surrounding Ozark hills.',
          photo: { src: '/images/meramec-state-park/overlook-pavilion.jpg', alt: 'Overlook Pavilion' },
        },
      ],
    },
    photoGallery: {
      heading: 'Photo Gallery',
    },
    resources: {
      heading: 'Resources & Booking',
      items: [
        {
          key: 'book-lodging',
          // Verbatim: the tile names a different booking host than its own link.
          body: 'Reserve your lodging at escape.baserves.com',
        },
        {
          key: 'watercraft',
          body: 'Reserve canoes, kayaks & rafts online',
        },
        {
          key: 'park-information',
          title: 'Park Information',
          body: 'Visit the Visitor Center for maps, exhibits & trail info',
        },
      ],
    },
    scopeOfServices: {
      heading: 'Scope of Services',
      intro:
        'BA Services operates the concession services at Meramec State Park under a long-term partnership with the Missouri Department of Natural Resources, delivering comprehensive lodging, dining, retail, and recreational experiences across the park.',
      items: [
        {
          key: 'badge',
          title: 'Statement of Work',
        },
        {
          key: 'lodging',
          title: 'Lodging & Conference Facilities',
          body: 'Full operation of cabins, motel, and event spaces with modern booking and year-round administrative support.',
          items: [
            'Operation of Hickory Ridge Motel, cabins, and conference center',
            'Online reservation system with advanced booking capabilities',
            'Seasonal operations with year-round administrative support',
            'Clean, comfortable, and well-maintained accommodations',
            'Pet-friendly lodging alongside designated allergen-free units',
          ],
        },
        {
          key: 'food-and-beverage',
          title: 'Food & Beverage Operations',
          body: 'Full management of dining services with high-quality, compliant food offerings and dietary-conscious menus.',
          items: [
            'Full management of the Fireside Grill restaurant',
            'Preparation and service of high-quality, safe food offerings',
            'Menu development including healthy and dietary-conscious choices',
            'Strict adherence to federal, state, and local health regulations',
          ],
        },
        {
          key: 'retail',
          title: 'Retail Services',
          body: 'Visitor-friendly retail operations with camping supplies, merchandise, and locally sourced Missouri products.',
          items: [
            'Operation of the Fireside Store and River Stop Store',
            'Sale of camping supplies, merchandise, and convenience items',
            'Clean, organized, and visitor-friendly retail environments',
            'Preference for locally sourced Missouri products where feasible',
          ],
        },
        {
          key: 'watercraft',
          title: 'Watercraft Rentals & River Services',
          body: 'Fleet of 80+ vessels for float trips with full transportation services and safety-focused operations.',
          items: [
            'Canoe, kayak, and raft rentals with a fleet of 80+ vessels',
            'Transportation services for float trips',
            'Seasonal operations aligned with peak visitation periods',
            'Safety-focused operations with rental agreements and liability protocols',
          ],
        },
        {
          key: 'operations',
          title: 'Operations & Management',
          body: 'End-to-end operational management with structured on-site leadership across every business unit.',
          items: [
            'Staffing, training, and supervision of all personnel',
            'Day-to-day facility operations across lodging, retail, food service, and recreation',
            'Inventory control, procurement, and vendor coordination',
            'Maintenance of all concession facilities in clean, safe condition',
            'Financial management, reporting, and contract compliance',
            'Structured on-site management team across each business unit',
          ],
        },
        {
          key: 'quality-control',
          title: 'Quality Control & Guest Experience',
          body: 'Formal quality program with regular inspections, rapid response, and continuous improvement.',
          items: [
            'Daily, weekly, and monthly inspections of facilities and operations',
            'Rapid response to maintenance or service issues within 72 hours',
            'Ongoing staff training focused on professionalism and satisfaction',
            'Continuous improvement through audits, feedback, and reviews',
            'Customer service programs including feedback systems and on-site support',
          ],
        },
        {
          key: 'guest-services',
          title: 'Additional Guest Services',
          body: 'Supplemental services that round out the full park experience for every visitor.',
          items: [
            'Firewood sales for campers during peak season',
            'Marketing and promotion of park activities, lodging, and events',
            'Customer feedback systems and on-site support',
            'Park-wide event coordination and visitor outreach',
          ],
        },
        {
          key: 'community',
          title: 'Community & Economic Impact',
          body: 'Supporting the local and state economy through employment, local partnerships, and tourism promotion.',
          items: [
            'Hiring local employees whenever possible',
            'Partnering with local vendors and suppliers',
            'Promoting tourism through targeted marketing and outreach',
            'Driving visitation and revenue within Meramec State Park',
          ],
        },
      ],
    },
    closingCta: {
      heading: 'Plan Your Visit to Meramec State Park',
      intro:
        'Book a cabin or motel room and discover the caves, trails, and river beauty of Missouri\'s Ozarks.',
    },
  },
}
