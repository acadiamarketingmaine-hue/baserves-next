import type { PropertyContent } from '../types'

/**
 * Moved verbatim out of src/app/long-lake-outdoor-center/page.tsx.
 *
 * That bespoke page shadows the `long-lake-outdoor-center` entry in
 * src/app/[slug]/page.tsx, so these are the values that actually render. The
 * shadowed [slug] entry said different things (different hero, tagline,
 * location line and stats) - recorded in
 * design-audit/website-editor-inventory.md, not reconciled here.
 *
 * Not lifted yet, because the copy is interleaved with JSX: the wedding-packet
 * sentence ("Download the <a>wedding packet</a> for full details ...") and the
 * SVG icons on the event-type cards, which stay in the page and are matched to
 * this content by key.
 */
export const longLakeOutdoorCenter: PropertyContent = {
  slug: 'long-lake-outdoor-center',
  name: 'Long Lake Outdoor Center',
  tagline: 'Historic CCC Property',
  locationLine: 'Yankee Springs, Michigan',
  summary:
    'Historic CCC-built outdoor center in Yankee Springs Recreation Area. 16 cabins, 4 bunkhouses, 120-seat lodge with stone fireplaces, commercial kitchen, and private lake access. Weddings, retreats, and group camps in season.',
  seo: {
    title: 'Long Lake Outdoor Center | Yankee Springs, Michigan | BA Services',
    description:
      'Historic CCC-built outdoor center in Yankee Springs Recreation Area. 16 cabins, 4 bunkhouses, 120-seat lodge with stone fireplaces, commercial kitchen, and private lake access. Weddings, retreats, and group camps in season.',
  },
  hero: {
    src: '/images/long-lake/fall-aerial.jpg',
    alt: 'Long Lake Outdoor Center aerial view in autumn',
  },
  gallery: [
    { src: '/images/long-lake/fall-aerial.jpg', alt: 'Aerial view of Long Lake Outdoor Center in fall' },
    { src: '/images/long-lake/lodge.jpg', alt: 'The historic lodge at Long Lake' },
    { src: '/images/long-lake/cabins.jpg', alt: 'CCC-built cabins at Long Lake' },
    { src: '/images/long-lake/lake.jpg', alt: 'Long Lake waterfront' },
    { src: '/images/long-lake/wedding-ceremony.jpg', alt: 'Wedding ceremony at Long Lake' },
    { src: '/images/long-lake/dock.jpg', alt: 'Dock on Long Lake' },
    { src: '/images/long-lake/kitchen.jpg', alt: 'Commercial kitchen in the lodge' },
    { src: '/images/long-lake/interior.jpg', alt: 'Lodge interior with stone fireplace' },
    { src: '/images/long-lake/grounds.jpg', alt: 'Grounds and pathways at Long Lake' },
    { src: '/images/long-lake/bathhouse.jpg', alt: 'Historic bathhouse' },
    { src: '/images/long-lake/biking.jpg', alt: 'Biking trails near Long Lake' },
    { src: '/images/long-lake/winter.jpg', alt: 'Long Lake Outdoor Center in winter' },
  ],
  paragraphs: [
    'Long Lake Outdoor Center (LLOC) is a historic group retreat facility located within Yankee Springs Recreation Area in Barry County, Michigan. Situated along the eastern shore of Long Lake, a 146-acre lake, the center offers a scenic and well-preserved setting.',
    "Originally constructed in 1939 by the Civilian Conservation Corps as part of the National Park Service's Recreation Demonstration Area program, Long Lake Outdoor Center is listed on the National Register of Historic Places.",
    'The center accommodates approximately 120 people with 16 cabins divided between the Hill Unit and the Lake Unit, four bunkhouses, and a central lodge with dining space. A commercial kitchen supports group meals and catering. The Hill Unit features cabins in a semi-circle around a central fire pit. The Lake Unit is set near the shoreline with cabins overlooking the lake.',
    "Long Lake Outdoor Center operates seasonally, with swimming, fishing, and hiking through the warmer months and vibrant fall foliage before the season closes. Contact us for this season's opening and closing dates.",
  ],
  features: [
    'Private Lake Access',
    'Dock & Waterfront',
    '120-Seat Lodge',
    'Commercial Kitchen',
    '2 Stone Fireplaces',
    '16 Cabins',
    '4 Bunkhouses',
    'Seasonal Facility',
    'ADA Accessible',
  ],
  stats: [
    { key: 'capacity', value: '120', label: 'Capacity' },
    { key: 'cabins', value: '16', label: 'Cabins' },
    { key: 'bunkhouses', value: '4', label: 'Bunkhouses' },
    { key: 'established', value: '1939', label: 'Est.' },
  ],
  season: {
    isSeasonal: true,
    label: 'Seasonal Facility',
    note: "Long Lake Outdoor Center operates seasonally, with swimming, fishing, and hiking through the warmer months and vibrant fall foliage before the season closes. Contact us for this season's opening and closing dates.",
  },
  notices: [],
  ctas: {
    hero: {
      label: 'Book Your Stay',
      url: 'https://escape.baserves.com/long-lake-outdoor-center',
      kind: 'booking',
    },
    sidebar: {
      label: 'Check Availability',
      url: 'https://escape.baserves.com/long-lake-outdoor-center',
      kind: 'booking',
    },
    footerPrimary: {
      label: 'Book Your Stay',
      url: 'https://escape.baserves.com/long-lake-outdoor-center',
      kind: 'booking',
    },
    footerSecondary: {
      label: 'Explore Yankee Springs',
      url: '/yankee-springs-recreation-area',
      kind: 'internal',
    },
    weddingPacket: {
      label: 'wedding packet',
      url: '/downloads/long-lake/weddings.pdf',
      kind: 'internal',
    },
  },
  sections: {
    about: {
      heading: 'About Long Lake Outdoor Center',
    },
    cccCallout: {
      heading: 'A Legacy of the CCC',
      paragraphs: [
        "The Civilian Conservation Corps constructed Long Lake Outdoor Center in 1939 as part of Franklin Roosevelt's New Deal. Young men enrolled in the CCC built the cabins, lodge, and bathhouse using native stone and timber harvested from the surrounding forest. The property's enduring craftsmanship earned it a place on the National Registry of Historic Sites — a testament to the skill and dedication of the workers who shaped it nearly a century ago.",
      ],
    },
    amenities: {
      heading: 'Amenities',
    },
    planYourEvent: {
      heading: 'Plan Your Event',
      intro:
        'From weddings to group camps, Long Lake Outdoor Center is the perfect setting for your next gathering.',
    },
    lodging: {
      heading: 'Lodging',
      intro:
        '16 cabins and 4 bunkhouses accommodate up to 120 guests in a range of historic, CCC-built structures.',
      items: [
        {
          key: 'hill-cabins',
          title: 'Hill Cabins',
          body: 'Perched on a wooded hillside above the lake, the Hill Cabins offer a shaded, secluded setting with easy access to the lodge and communal areas. Built with CCC-era stone and timber construction.',
          photo: {
            src: '/images/long-lake/cabins.jpg',
            alt: 'Hill Cabins at Long Lake Outdoor Center',
          },
        },
        {
          key: 'lake-cabins',
          title: 'Lake Cabins',
          body: 'Situated along the waterfront, the Lake Cabins provide direct views of Long Lake and quick access to the dock, swimming area, and waterfront activities.',
          photo: {
            src: '/images/long-lake/lake.jpg',
            alt: 'Lake Cabins at Long Lake Outdoor Center',
          },
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
          body: 'Cozy bunkhouse ideal for small groups, with open sleeping quarters and easy access to the lodge and lake.',
        },
        {
          key: 'road-house',
          title: 'Road House',
          meta: '12',
          body: 'Mid-size bunkhouse perfect for scout troops, youth groups, or extended families looking for shared accommodations.',
        },
        {
          key: 'infirmary',
          title: 'Infirmary',
          meta: '10',
          body: 'Features its own private bathroom, making it a great choice for families or groups needing additional comfort and convenience.',
          badge: 'Private bathroom',
        },
        {
          key: 'mansion-house',
          title: 'Mansion House',
          meta: '20',
          body: 'The largest bunkhouse on the property, featuring a charming fireplace and room for big groups. Ideal for reunions and large parties.',
          badge: 'Fireplace',
        },
      ],
    },
    lodge: {
      heading: 'The Lodge',
      paragraphs: [
        'The centerpiece of Long Lake Outdoor Center, the Lodge seats 120 in a grand great room anchored by two massive stone fireplaces. Original CCC stonework and exposed timber beams give the space a warm, rustic character that makes every gathering feel special.',
        "A full commercial kitchen adjoins the great room, supporting catered meals, potluck dinners, and self-service group cooking. Whether you're hosting a wedding reception, a corporate retreat, or a camp-wide meal, the Lodge provides the space and atmosphere to bring people together.",
      ],
      items: [
        { key: 'photo', photo: { src: '/images/long-lake/dining-hall.png', alt: 'The Lodge at Long Lake Outdoor Center' } },
        { key: 'seats', title: '120', body: 'Seats' },
        { key: 'fireplaces', title: '2', body: 'Stone Fireplaces' },
        { key: 'kitchen', title: 'Full', body: 'Commercial Kitchen' },
      ],
    },
    weddings: {
      heading: 'Weddings & Events',
      intro:
        "Long Lake Outdoor Center is one of Michigan's most unique event venues — a historic lakeside property with lodging, dining, and ceremony spaces all in one place.",
      paragraphs: [
        'Exchange vows on the lakefront or beneath the trees, then celebrate in the 120-seat lodge with its stone fireplaces and rustic charm. The 2-night rental includes exclusive use of the entire property — cabins, bunkhouses, lodge, kitchen, and grounds — so your guests can stay on-site for a true destination wedding.',
      ],
      items: [
        {
          key: 'photo',
          photo: {
            src: '/images/long-lake/wedding-ceremony.jpg',
            alt: 'Wedding ceremony at Long Lake Outdoor Center',
          },
        },
        {
          key: 'package',
          title: 'Wedding Package',
          meta: '2-night rental: $3,300 (2026) · $3,800 (2027) · $4,300 (2028)',
        },
      ],
    },
    eventTypes: {
      items: [
        {
          key: 'weddings',
          title: 'Weddings',
          body: 'Two-night wedding package: $3,300 for 2026 weddings, $3,800 for 2027, $4,300 from 2028. Ceremony and reception spaces with lakeside views, historic lodge, and full catering kitchen.',
        },
        {
          key: 'group-camps',
          title: 'Group Camps',
          body: 'Accommodate up to 120 guests across cabins and bunkhouses. Perfect for scout troops, church groups, and outdoor education programs.',
        },
        {
          key: 'retreats',
          title: 'Retreats',
          body: 'A secluded, historic setting for corporate retreats, team-building events, and wellness getaways surrounded by nature.',
        },
        {
          key: 'family-reunions',
          title: 'Family Reunions',
          body: 'Bring the whole family together in a lakeside setting with plenty of room, shared meals in the lodge, and outdoor activities for all ages.',
        },
      ],
    },
    photoGallery: {
      heading: 'Photo Gallery',
    },
    downloads: {
      heading: 'Resources & Downloads',
      intro:
        'Download our guides for detailed information on rates, event planning, and camp rules.',
      items: [
        {
          key: 'about-us',
          title: 'About Us',
          href: '/downloads/long-lake/about-us.pdf',
          body: 'Learn about the history and mission of Long Lake Outdoor Center.',
        },
        {
          key: 'camp-rules',
          title: 'Camp Rules',
          href: '/downloads/long-lake/camp-rules.pdf',
          body: 'Rules and guidelines for your stay.',
        },
        {
          key: 'group-camps',
          title: 'Group Camps',
          href: '/downloads/long-lake/group-camps.pdf',
          body: 'Information and pricing for group camp bookings.',
        },
        {
          key: 'rentals',
          title: 'Rentals',
          href: '/downloads/long-lake/rentals.pdf',
          body: 'Cabin, bunkhouse, and facility rental details.',
        },
        {
          key: 'weddings',
          title: 'Weddings',
          href: '/downloads/long-lake/weddings.pdf',
          body: 'Wedding packages, pricing, and venue details.',
        },
      ],
    },
    scopeOfServices: {
      heading: 'Scope of Services',
      intro:
        'BA Services serves as the contracted concessionaire for the Long Lake and Chief Noonday Outdoor Centers, operating under a lease with the Michigan Department of Natural Resources. The company is responsible for the restoration, operation, maintenance, and day-to-day management of these historic recreation facilities.',
      items: [
        {
          key: 'badge',
          title: 'Concession Management',
        },
        {
          key: 'operations',
          title: 'Facility Operations & Guest Services',
          body: 'BA Services manages all daily operations to ensure a seamless and enjoyable visitor experience.',
          items: [
            'Managing reservations and guest check-in processes',
            'Providing customer service and visitor assistance',
            'Overseeing lodging accommodations, cabins, and group-use facilities',
            'Coordinating events, group rentals, and recreational activities',
          ],
        },
        {
          key: 'restoration',
          title: 'Restoration & Facility Readiness',
          body: 'Bringing facilities back into safe, usable conditions while preserving their historic character.',
          items: [
            'Assessing existing structures and identifying repair needs',
            'Developing and submitting project plans for cabins and buildings',
            'Coordinating improvements to restore facilities for public use',
            'Addressing safety concerns and infrastructure limitations (e.g., water systems, structural repairs)',
          ],
        },
        {
          key: 'maintenance',
          title: 'Maintenance & Repairs',
          body: 'Maintaining all buildings, systems, and equipment across both sites to keep facilities safe and operational.',
          items: [
            'Routine inspections and preventative maintenance',
            'Repairs to electrical, plumbing, HVAC, and mechanical systems',
            'Emergency response to facility or safety issues',
            'Securing buildings and monitoring safety systems',
          ],
        },
        {
          key: 'groundskeeping',
          title: 'Groundskeeping & Sanitation',
          body: 'Maintaining the appearance and cleanliness of the property as a daily priority.',
          items: [
            'Landscaping, mowing, and vegetation management',
            'Trash removal and site cleanup',
            'Cleaning restrooms, common areas, and outdoor spaces',
            'Supporting event setup and site logistics',
          ],
        },
        {
          key: 'staffing',
          title: 'Staffing & On-Site Management',
          body: 'Trained personnel covering all functional areas with cross-trained support for efficiency and responsiveness.',
          items: [
            'Area Manager overseeing overall operations and compliance',
            'Maintenance staff handling repairs and infrastructure',
            'Grounds and janitorial teams maintaining cleanliness',
            'Administrative staff supporting reservations and guest services',
          ],
        },
        {
          key: 'compliance',
          title: 'Lease Compliance & Stewardship',
          body: 'Full responsibility for operations, compliance, and stewardship of state-owned assets.',
          items: [
            'Retains sole control and management of the premises',
            'Ensures compliance with all DNR rules, state laws, and lease requirements',
            'Protects natural, cultural, and historic resources',
            'Coordinates with the DNR on improvements and long-term planning',
          ],
        },
      ],
    },
    closingCta: {
      heading: 'Host Your Next Event at Long Lake',
      intro:
        'A historic CCC property with private lake access, lodging for 120, and a full season of open dates. Start planning your wedding, retreat, or group camp today.',
    },
  },
}
