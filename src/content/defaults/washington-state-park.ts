import type { PropertyContent } from '../types'

/**
 * Moved verbatim out of src/app/washington-state-park/page.tsx.
 *
 * That bespoke page shadows the `washington-state-park` entry that used to live
 * here (lifted from src/app/[slug]/page.tsx and rendered nowhere), so these are
 * now the values that actually render. The shadowed [slug] values disagreed on
 * the tagline, the location line, the hero photo (it pointed at a Burlingame
 * photograph), the whole gallery, both paragraphs, the acreage and trail
 * mileage, the amenity list and both CTAs (escape.baserves.com versus the
 * park's own washingtonstateparkmo.com). Recorded in
 * design-audit/website-editor-inventory.md, not reconciled here.
 */
export const washingtonStatePark: PropertyContent = {
  slug: 'washington-state-park',
  name: 'Washington State Park',
  tagline: 'Missouri State Park',
  locationLine: 'De Soto, Missouri',
  summary:
    'Explore Washington State Park in De Soto, Missouri. 2,157 acres along the Big River with 11 lodging cabins, ancient petroglyphs, swimming pool, 9.7 miles of trails, and 140 bird species.',
  seo: {
    title: 'Washington State Park | De Soto, Missouri | BA Services',
    description:
      'Explore Washington State Park in De Soto, Missouri. 2,157 acres along the Big River with 11 lodging cabins, ancient petroglyphs, swimming pool, 9.7 miles of trails, and 140 bird species.',
  },
  hero: {
    src: '/images/washington-thunderbird-lodge.png',
    alt: 'Stone Thunderbird Lodge at Washington State Park in De Soto, Missouri',
  },
  gallery: [
    { src: '/images/washington-thunderbird-lodge.png', alt: 'Thunderbird Lodge at Washington State Park' },
    { src: '/images/washington-state-park/cabin-11-interior.png', alt: 'Cabin 11 bedroom' },
    { src: '/images/washington-state-park/pool.png', alt: 'Swimming pool at Washington State Park' },
    { src: '/images/washington-state-park/store.jpg', alt: 'Camp store at Washington State Park' },
  ],
  paragraphs: [
    'Washington State Park encompasses approximately 2,157 acres along the Big River in De Soto, Missouri, just a short drive south of St. Louis along Highway 21. Located on the border of Jefferson and Washington Counties, the park is a popular destination for both outdoor recreation and cultural heritage, welcoming more than 300,000 visitors annually.',
    'Renowned for its historical significance, the park is home to more than 350 Native American petroglyphs—some over 1,000 years old—making it one of the most important archaeological sites in the Midwest. These ancient carvings offer a rare glimpse into the spiritual and cultural practices of the region\'s earliest inhabitants.',
    'The park\'s natural setting features rolling Ozark terrain, forested hills, and access to the Big River, providing a wide range of recreational opportunities. Visitors can enjoy hiking along nearly 10 miles of trails, fishing, swimming, floating the river, birdwatching among more than 140 recorded species, or simply relaxing in a scenic riverside environment.',
    'Washington State Park offers a variety of accommodations and visitor services. The park includes 11 lodging cabins, many originally constructed by the Civilian Conservation Corps (CCC). The recently renovated Thunderbird Lodge serves as a central hub for retail services, lodging check-in, and watercraft rentals.',
    'Additional amenities include a swimming pool, camp store, and food and beverage services. Concession operations are conducted under agreement with Missouri State Parks and include lodging, retail, food and beverage, swimming pool operations, and watercraft rentals.',
    'Washington State Park offers a balanced combination of history, recreation, and modern amenities—creating a well-rounded destination where visitors can connect with both the natural landscape and the deep cultural roots of the region.',
  ],
  features: [
    '11 Lodging Cabins',
    'Swimming Pool',
    'Camp Store',
    '9.7 Miles of Trails',
    '140 Bird Species',
    'Ancient Petroglyphs',
    'Big River Access',
    'Picnic Areas',
    'Fishing',
  ],
  stats: [
    { key: 'acres', value: '2,157', label: 'Acres' },
    { key: 'cabins', value: '11', label: 'Lodging Cabins' },
    { key: 'trails', value: '9.7 mi', label: 'Trails' },
    { key: 'birdSpecies', value: '140', label: 'Bird Species' },
  ],
  season: { isSeasonal: false },
  notices: [],
  ctas: {
    hero: {
      label: 'Book Your Stay',
      url: 'https://www.washingtonstateparkmo.com/',
      kind: 'booking',
    },
    sidebar: {
      label: 'Book Your Stay',
      url: 'https://www.washingtonstateparkmo.com/',
      kind: 'booking',
    },
    footer: {
      label: 'Book Your Stay',
      url: 'https://www.washingtonstateparkmo.com/',
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
      heading: 'About Washington State Park',
    },
    petroglyphs: {
      heading: 'Ancient Petroglyphs',
      paragraphs: [
        'Washington State Park protects one of the largest collections of Native American petroglyphs in the state. More than 350 rock carvings, over 1,000 years old, are found throughout the park. These sacred markings — including spirals, animal figures, and abstract designs — are a testament to the rich cultural history of Missouri\'s indigenous peoples. Guided petroglyph tours are available seasonally.',
      ],
    },
    amenities: {
      heading: 'Park Amenities',
    },
    readyToVisit: {
      heading: 'Ready to Visit?',
      intro: 'Reserve your cabin or watercraft at Washington State Park.',
    },
    lodging: {
      heading: 'Cabins & Lodging',
      paragraphs: [
        'Washington State Park offers 11 lodging cabins nestled among the trees along the Big River. These cabins provide a comfortable home base for exploring the park\'s trails, petroglyphs, and natural beauty.',
      ],
      items: [
        { key: 'cabin-count', meta: '11', body: 'Lodging Cabins' },
        {
          key: 'photo-exterior',
          photo: {
            src: '/images/washington-state-park/cabin-11-exterior.png',
            alt: 'Cabin 11 living room at Washington State Park',
          },
        },
        {
          key: 'photo-interior',
          photo: {
            src: '/images/washington-state-park/cabin-11-interior.png',
            alt: 'Cabin 11 bedroom at Washington State Park',
          },
        },
      ],
    },
    fishOfTheBigRiver: {
      heading: 'Fish of the Big River',
      intro:
        'A 12-part educational series on the fish species, fishing techniques, and conservation practices of the Big River. Download any guide below.',
      items: [
        { key: 'fishing-the-big-river', title: 'Fishing the Big River', href: '/downloads/washington-state-park/fish-of-the-big-river/Fishing the Big River.pdf' },
        { key: 'channel-catfish', title: 'Channel Catfish', href: '/downloads/washington-state-park/fish-of-the-big-river/Channel Catfish.pdf' },
        { key: 'smallmouth-bass', title: 'Smallmouth Bass', href: '/downloads/washington-state-park/fish-of-the-big-river/Smallmouth Bass.pdf' },
        { key: 'spotted-bass', title: 'Spotted Bass', href: '/downloads/washington-state-park/fish-of-the-big-river/Spotted Bass.pdf' },
        { key: 'longear-sunfish', title: 'Longear Sunfish', href: '/downloads/washington-state-park/fish-of-the-big-river/Longear Sunfish.pdf' },
        { key: 'northern-rock-bass', title: 'Northern Rock Bass', href: '/downloads/washington-state-park/fish-of-the-big-river/Northern Rock Bass.pdf' },
        { key: 'fish-habits-and-habitat', title: 'Fish Habits & Habitat', href: '/downloads/washington-state-park/fish-of-the-big-river/Fish Habits & Habitat.pdf' },
        { key: 'fishing-ethics', title: 'Fishing Ethics', href: '/downloads/washington-state-park/fish-of-the-big-river/Fishing Ethics.pdf' },
        { key: 'fishing-tips', title: 'Fishing Tips', href: '/downloads/washington-state-park/fish-of-the-big-river/Fishing Tips.pdf' },
        { key: 'cleaning-and-prepping-fish', title: 'Cleaning & Prepping Fish', href: '/downloads/washington-state-park/fish-of-the-big-river/Cleaning & Prepping Fish.pdf' },
        { key: 'cooking-fish', title: 'Cooking Fish', href: '/downloads/washington-state-park/fish-of-the-big-river/Cooking Fish.pdf' },
        { key: 'fish-handling-and-release', title: 'Fish Handling & Release', href: '/downloads/washington-state-park/fish-of-the-big-river/Fish Handling & Release Guidelines.pdf' },
      ],
    },
    recreation: {
      heading: 'Recreation',
      intro:
        'From the swimming pool to 9.7 miles of trails and 140 bird species, Washington State Park offers something for every outdoor enthusiast.',
      items: [
        {
          key: 'pool',
          title: 'Swimming Pool',
          body: 'Cool off at the park\'s swimming pool — a great spot for families during the warmer months. The pool provides a safe and refreshing way to enjoy a summer day at the park.',
          photo: { src: '/images/washington-state-park/pool.png', alt: 'Swimming pool at Washington State Park' },
        },
        {
          key: 'trails',
          title: 'Trails',
          body: 'Explore 9.7 miles of trails winding through the park\'s forests and along the Big River. Trails range from easy nature walks to more challenging hikes, with opportunities to see petroglyphs along the way.',
          badge: '9.7 miles',
        },
        {
          key: 'birding',
          title: 'Birding',
          body: 'With 140 recorded bird species, Washington State Park is a birder\'s paradise. From warblers and woodpeckers to raptors and waterfowl, there\'s always something to spot along the trails and river.',
          badge: '140 species',
        },
        {
          key: 'camp-store',
          title: 'Camp Store',
          body: 'Stock up on essentials, snacks, firewood, and souvenirs at the park\'s camp store. A convenient stop for campers and day visitors alike.',
          photo: { src: '/images/washington-state-park/store.jpg', alt: 'Camp store at Washington State Park' },
        },
      ],
    },
    downloads: {
      heading: 'Resources & Downloads',
      intro: 'Download park maps and checklists to plan your visit.',
      items: [
        {
          key: 'park-map',
          title: 'Park Map',
          body: 'PDF Download',
          href: '/downloads/washington-state-park/park-map.pdf',
          badge: 'red',
        },
        {
          key: 'birding-checklist',
          title: 'Birding Checklist',
          body: 'PDF Download — 140 Species',
          href: '/downloads/washington-state-park/birding-checklist.pdf',
          badge: 'blue',
        },
      ],
    },
    photoGallery: {
      heading: 'Photo Gallery',
    },
    scopeOfServices: {
      heading: 'Scope of Services',
      intro:
        'BA Services operates the full concession at Washington State Park — lodging, food service, retail, recreation, and facility maintenance — all managed under one coordinated system with a hands-on, service-first approach.',
      items: [
        {
          key: 'badge',
          title: 'Statement of Work',
        },
        {
          key: 'lodging',
          title: 'Lodging & Guest Accommodations',
          body: 'Full-service cabin and lodging operations designed for comfort, consistency, and a hassle-free guest experience.',
          items: [
            'Operation of cabins and overnight accommodations',
            'Housekeeping and facility maintenance to strict quality standards',
            'Guest reservations, check-in, and support',
            'Ongoing inspections for cleanliness, safety, and comfort',
          ],
        },
        {
          key: 'food-and-beverage',
          title: 'Food & Beverage Services',
          body: 'On-site restaurant and grill operations with tight controls, consistent quality, and attention to cost.',
          items: [
            'Management of on-site restaurant and grill operations',
            'Menu development focused on affordability, quality, and regional appeal',
            'Inventory control systems to reduce waste and maintain consistency',
            'Portion control standards to ensure value and efficiency',
          ],
        },
        {
          key: 'retail',
          title: 'Retail & Camp Store Operations',
          body: 'Clean, organized, and customer-friendly retail environments stocked with essentials and local goods.',
          items: [
            'Operation of gift shops and camp stores',
            'Stocking of essential camping supplies, recreation items, and local goods',
            'Merchandise selection reflecting the park and regional character',
            'Customer-friendly store layouts and signage',
          ],
        },
        {
          key: 'watercraft',
          title: 'Watercraft Rentals & Recreation',
          body: 'Streamlined watercraft rental operations that get guests on the water with minimal hassle.',
          items: [
            'Canoe, kayak, and raft rental operations',
            'Streamlined reservation systems for easy booking',
            'Safety briefings and equipment orientation for all guests',
            'Retail add-ons such as sunscreen, beverages, and gear',
          ],
        },
        {
          key: 'grounds',
          title: 'Grounds, Maintenance & Facilities',
          body: 'Comprehensive groundskeeping and facility maintenance across all concession areas, every day.',
          items: [
            'Landscaping and site upkeep',
            'Janitorial services for restrooms, public areas, and facilities',
            'Trash collection and sanitation services',
            'Preventative maintenance and repairs',
            'Daily inspections and rapid response to deficiencies',
          ],
        },
        {
          key: 'guest-services',
          title: 'Guest Services & Reservations',
          body: 'Centralized reservation management and visitor support from first contact to departure.',
          items: [
            'Centralized reservation management (online and phone)',
            'Check-in and check-out operations',
            'Visitor information and customer support',
            'Guest inquiry handling and issue resolution',
          ],
        },
        {
          key: 'quality-control',
          title: 'Quality Control & Oversight',
          body: 'A structured Quality Control Program with layered inspections and a 72-hour corrective action standard.',
          items: [
            'Daily on-site inspections by management',
            'Weekly operational reviews',
            'Monthly formal inspections by corporate leadership',
            '72-hour corrective action standard for identified issues',
          ],
        },
        {
          key: 'staffing',
          title: 'Staffing, Marketing & Engagement',
          body: 'Local on-site leadership backed by corporate oversight, plus active marketing to drive visitation.',
          items: [
            'On-Site Manager responsible for daily operations',
            'General Manager support from nearby Meramec State Park',
            'Corporate leadership providing resources and accountability',
            'Website, digital advertising, and social media engagement',
            'Group outreach for families, youth organizations, and tourists',
          ],
        },
      ],
    },
    closingCta: {
      heading: 'Plan Your Visit to Washington State Park',
      intro:
        'Ancient petroglyphs, the Big River, and 2,157 acres of Missouri wilderness await. Reserve your cabin or watercraft today.',
    },
  },
}
