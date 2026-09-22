import type { PropertyContent } from '../types'

/**
 * Moved verbatim out of src/app/bankhead-national-forest/page.tsx.
 *
 * That bespoke page shadows the `bankhead-national-forest` entry that used to
 * live here (lifted from src/app/[slug]/page.tsx and rendered nowhere), so
 * these are now the values that actually render. The shadowed [slug] values
 * disagreed on nearly everything - tagline, hero alt, gallery, every
 * paragraph, the stat labels, the features list and both CTAs (they pointed at
 * recreation.gov, the live page points at two internal experience pages).
 * Recorded in design-audit/website-editor-inventory.md, not reconciled here.
 *
 * VERBATIM WARTS, do not "fix" without a rendering check: the two campground
 * descriptions below already lived in a JS array in the page rather than as
 * JSX text, so their "&apos;" is never decoded and the live page really does
 * print "the Bankhead&apos;s largest recreation area". Changing it here
 * changes the live page.
 */
export const bankheadNationalForest: PropertyContent = {
  slug: 'bankhead-national-forest',
  name: 'Bankhead National Forest',
  tagline: 'National Forest',
  locationLine: 'Lawrence, Winston & Franklin Counties, Alabama — Cumberland Plateau',
  summary: 'The Land of a Thousand Waterfalls',
  seo: {
    title: 'Bankhead National Forest | Alabama | BA Services',
    description:
      'Explore Bankhead National Forest — "The Land of a Thousand Waterfalls." 180,000+ acres featuring the Sipsey Wilderness, 84 breeding bird species, campgrounds, and the Hurricane Creek Shooting Range.',
  },
  hero: {
    src: '/images/bankhead-forest.jpg',
    alt: 'Bankhead National Forest — The Land of a Thousand Waterfalls',
  },
  gallery: [
    { src: '/images/bankhead-forest.jpg', alt: 'Bankhead National Forest landscape' },
    { src: '/images/Bankhead-Waterfall.png', alt: 'Waterfall in the Sipsey Wilderness' },
    { src: '/images/bankhead-bicycle-trail.jpg', alt: 'Trail in Bankhead National Forest' },
    { src: '/images/clear-creek-bent-twig.jpg', alt: 'Clear Creek Recreation Area' },
    { src: '/images/clear-creek-acorn-camp.jpg', alt: 'Camping at Clear Creek' },
    { src: '/images/clear-creek-fox-loop.jpg', alt: 'Fox Loop at Clear Creek' },
    { src: '/images/clear-creek-fox-entrance.jpg', alt: 'Clear Creek campground entrance' },
  ],
  paragraphs: [
    'The William B. Bankhead National Forest spans more than 180,000 acres across the Cumberland Plateau of north Alabama, primarily within Winston and Lawrence Counties near Double Springs. Known as the “Land of a Thousand Waterfalls,” the forest is celebrated for its dramatic sandstone canyons, pristine streams, limestone bluffs, and dense hardwood forests, making it one of the most scenic natural landscapes in the southeastern United States.',
    'At the heart of the forest lies the Sipsey Wilderness, the largest designated wilderness area east of the Mississippi River. The Sipsey Fork, a federally designated Wild and Scenic River, winds through deep canyons, creating a striking landscape of cascading waterfalls, rock shelters, and towering old-growth trees. The forest\'s ecological richness and diverse habitats have also earned it recognition as an Important Bird Area by the American Bird Conservancy.',
    'The Bankhead Ranger District offers a wide range of year-round recreational opportunities, supported by the region\'s mild climate. While peak visitation typically occurs from mid-March through late October, the forest remains accessible throughout the year. Visitors can enjoy camping, picnicking, boating, water sports, hiking, mountain biking, horseback riding, off-highway vehicle (OHV) use, fishing, hunting, photography, and scenic driving.',
    'Two primary recreation areas—Clear Creek Recreation Area and Corinth Recreation Area—are located along Lewis Smith Lake, a 21,200-acre reservoir managed by Alabama Power Company. These sites provide convenient access to boating and water-based recreation, along with comfortable camping facilities that serve as base camps for exploring the surrounding forest. Additional amenities throughout the district include horse trails, a shooting range, and scenic byways.',
    'Easily accessible from major population centers such as Birmingham and Huntsville, Alabama, as well as Chattanooga, Nashville, and Memphis, most visitors reach the forest within a two- to three-hour drive. This accessibility, combined with its natural beauty and diverse recreational offerings, makes Bankhead National Forest a premier outdoor destination in the Southeast.',
  ],
  features: [
    'Hiking & Backpacking',
    'Birding (84 breeding species)',
    'Waterfall Hunting',
    'Canyon Exploration',
    'Camping',
    'Fishing',
    'Canoeing & Kayaking',
    'Horseback Riding',
    'Target Shooting',
    'Scenic Drives',
    'Wildlife Viewing',
    'Swimming',
  ],
  stats: [
    { key: 'acres', value: '180,000+', label: 'Acres' },
    { key: 'birdSpecies', value: '84', label: 'Bird Species' },
    { key: 'campgrounds', value: '2', label: 'Campgrounds' },
    { key: 'wilderness', value: 'Sipsey', label: 'Wilderness' },
  ],
  season: { isSeasonal: false },
  notices: [],
  ctas: {
    heroClearCreek: {
      label: 'Clear Creek Recreation Area',
      url: '/experiences/clear-creek-recreation-area',
      kind: 'internal',
    },
    heroCorinth: {
      label: 'Corinth Recreation Area',
      url: '/experiences/corinth-recreation-area',
      kind: 'internal',
    },
    rangerPhone: {
      label: '(205) 489-5111',
      url: 'tel:+12054895111',
      kind: 'external',
    },
    sidebarClearCreek: {
      label: 'Clear Creek Recreation Area',
      url: '/experiences/clear-creek-recreation-area',
      kind: 'internal',
    },
    sidebarCorinth: {
      label: 'Corinth Recreation Area',
      url: '/experiences/corinth-recreation-area',
      kind: 'internal',
    },
    birdingGuide: {
      label: 'Download Birding Guide (PDF)',
      url: '/downloads/bankhead-national-forest/birding-guide.pdf',
      kind: 'internal',
    },
    sipseyWildernessMap: {
      label: 'Wilderness Map',
      url: '/downloads/bankhead-national-forest/sipsey-wilderness-map.pdf',
      kind: 'internal',
    },
    sipseyCanoeMap: {
      label: 'Canoe Map',
      url: '/downloads/bankhead-national-forest/sipsey-canoe-map.pdf',
      kind: 'internal',
    },
    quailHabitatGuide: {
      label: 'Download Quail Habitat Guide (PDF)',
      url: '/downloads/bankhead-national-forest/quail-habitat.pdf',
      kind: 'internal',
    },
    footerClearCreek: {
      label: 'Clear Creek Recreation Area',
      url: '/experiences/clear-creek-recreation-area',
      kind: 'internal',
    },
    footerCorinth: {
      label: 'Corinth Recreation Area',
      url: '/experiences/corinth-recreation-area',
      kind: 'internal',
    },
    footerExperiences: {
      label: 'View All Experiences',
      url: '/experiences',
      kind: 'internal',
    },
  },
  sections: {
    about: {
      heading: 'About Bankhead National Forest',
    },
    naturalFeatures: {
      heading: 'Natural Features',
      paragraphs: [
        'The Bankhead sits atop the Cumberland Plateau, where millions of years of erosion have carved deep sandstone canyons laced with waterfalls. Old-growth forests cling to canyon walls, while pristine streams flow through the valley floors. Lewis Smith Lake, with over 500 miles of shoreline marked by high rock bluffs, borders the southern edge of the forest. The combination of geology, hydrology, and ecology creates one of the richest natural landscapes in the Southeast.',
      ],
    },
    activities: {
      heading: 'Activities',
    },
    contact: {
      heading: 'Contact & Info',
      items: [
        { key: 'district', body: 'Bankhead Ranger District' },
        { key: 'address', body: 'Highway 33, Double Springs, AL' },
      ],
    },
    campgrounds: {
      heading: 'Campgrounds',
      intro:
        'Two campgrounds managed by BA Services provide comfortable base camps for exploring the Bankhead National Forest.',
      items: [
        {
          key: 'clear-creek',
          title: 'Clear Creek Recreation Area',
          meta: '102 sites',
          // Verbatim: the live page really does render the undecoded entity here.
          body: 'Located on the shore of Lewis Smith Lake, Clear Creek is the Bankhead&apos;s largest recreation area. Features four camping loops with electric and water hookups, swimming beach, boat ramps, hiking trails, and group camping.',
          photo: { src: '/images/clear-creek-bent-twig.jpg', alt: 'Clear Creek Recreation Area' },
          href: '/experiences/clear-creek-recreation-area',
        },
        {
          key: 'corinth',
          title: 'Corinth Recreation Area',
          meta: '52 sites',
          body: 'A quieter campground offering full-hookup sites (water, electric, and sewer) in a peaceful wooded setting. Ideal for RV campers seeking a more relaxed atmosphere with modern amenities.',
          photo: { src: '/images/clear-creek-acorn-camp.jpg', alt: 'Corinth Recreation Area' },
          href: '/experiences/corinth-recreation-area',
        },
      ],
    },
    otherRecreationAreas: {
      heading: 'Other Recreation Areas',
      items: [
        {
          key: 'brushy-lake',
          title: 'Brushy Lake Recreation Area',
          body: 'Day-use area with fishing, picnicking, and nature trails around a scenic lake.',
        },
        {
          key: 'houston',
          title: 'Houston Recreation Area',
          body: 'Historic site with picnic facilities, trails, and access to nearby natural attractions.',
        },
        {
          key: 'natural-bridge',
          title: 'Natural Bridge Day Use Area',
          body: 'A unique geological formation — a natural sandstone bridge spanning 148 feet with a 60-foot clearance.',
        },
        {
          key: 'owl-creek',
          title: 'Owl Creek Horse Camp',
          body: 'Equestrian camping facility with horse stalls, water, and direct trail access.',
        },
        {
          key: 'flint-creek',
          title: 'Flint-Creek Multi-Use Trail',
          body: 'A multi-use trail system open to hiking, mountain biking, and horseback riding.',
        },
      ],
    },
    birding: {
      heading: 'Birding in the Bankhead',
      intro: 'American Bird Conservancy — Important Bird Area',
      paragraphs: [
        'With 84 breeding bird species recorded during the breeding season, the Bankhead National Forest is a premier birding destination in the Southeast. The American Bird Conservancy has designated it as an Important Bird Area, recognizing its critical role in supporting neotropical migrants and resident species.',
      ],
      // Paragraphs that carry an inline <strong>. The tag stays in the page;
      // the three text runs around it are stored here in order.
      items: [
        {
          key: 'cerulean',
          items: [
            'The forest is a stronghold for the ',
            'Cerulean Warbler',
            ', a species of conservation concern that nests in the old-growth canopy of the Sipsey Wilderness canyons. The deep, moist canyons and diverse forest structure provide ideal habitat for this declining species.',
          ],
        },
        {
          key: 'birding-trail',
          items: [
            'Four sites within the forest are part of the ',
            'North Alabama Birding Trail',
            ', each offering distinct habitats and birding opportunities throughout the year.',
          ],
        },
      ],
    },
    birdingTrailSites: {
      heading: 'North Alabama Birding Trail Sites',
      items: [
        {
          key: 'walston-ridge',
          title: 'Walston Ridge',
          body: 'Ridgetop habitat offering excellent views and opportunities to spot raptors, warblers, and vireos during migration and breeding season.',
        },
        {
          key: 'brushy-lake',
          title: 'Brushy Lake',
          body: 'Lakeside habitat attracting waterfowl, herons, and songbirds. A quiet spot for observing diverse species in a wetland setting.',
        },
        {
          key: 'northwest-road',
          title: 'Northwest Road',
          body: 'A forested corridor supporting a variety of woodland species including woodpeckers, thrushes, and the Cerulean Warbler.',
        },
        {
          key: 'sipsey-wilderness',
          title: 'Sipsey Wilderness',
          body: 'Deep canyon habitat with old-growth forests. A stronghold for the Cerulean Warbler and other neotropical migrants.',
        },
      ],
    },
    sipseyWilderness: {
      heading: 'Sipsey Wilderness',
      intro: 'Largest Wilderness Area East of the Mississippi',
      paragraphs: [
        'The Sipsey Wilderness encompasses over 25,000 acres of rugged sandstone canyons, old-growth forests, and cascading waterfalls. Deep, narrow canyons shelter some of the last remaining old-growth hardwood forests in Alabama, with trees towering over 100 feet above the canyon floors.',
        'Multiple trailheads provide access to a network of trails that explore the canyon bottoms, ridgetops, and creek crossings. Backpacking, day hiking, and fishing are all popular activities within the wilderness.',
      ],
      items: [
        {
          key: 'photo',
          photo: { src: '/images/Bankhead-Waterfall.png', alt: 'Waterfall in the Sipsey Wilderness' },
        },
        {
          key: 'wild-and-scenic',
          items: [
            'The Sipsey Fork — a designated ',
            'Wild and Scenic River',
            ' corridor — is the central artery of the wilderness. Its clear waters wind through dramatic sandstone gorges, past ancient rock shelters, and over countless waterfalls. The river corridor is popular for canoeing and kayaking, especially during spring flows.',
          ],
        },
      ],
    },
    shootingRange: {
      heading: 'Hurricane Creek Shooting Range',
      paragraphs: [
        'The Hurricane Creek Shooting Range is a public, accessible facility within the Bankhead National Forest offering year-round target shooting in a safe, managed environment. Whether you\'re sighting in a rifle before hunting season or practicing with a handgun, the range provides a well-maintained venue for shooters of all experience levels.',
        'Bring your own targets and ammunition. Paper targets only — no glass, electronics, or explosive targets. All shooters must follow posted range rules and safety guidelines.',
      ],
      items: [
        { key: 'distances', title: 'Target Distances', body: '25, 50, and 100 yard lanes' },
        { key: 'benches', title: 'Shooting Benches', body: '8 covered benches available' },
        { key: 'admission', title: 'Admission', body: '$3 per person' },
        { key: 'availability', title: 'Availability', body: 'Open year-round, ADA accessible' },
        {
          key: 'photo',
          photo: { src: '/images/bankhead-bicycle-trail.jpg', alt: 'Bankhead National Forest recreation area' },
        },
      ],
    },
    quailHabitat: {
      heading: 'Quail Habitat & Conservation',
      paragraphs: [
        'The conservation work here benefits not only quail but a wide range of species that depend on early successional and open-forest habitats, contributing to the overall biodiversity of the Bankhead.',
      ],
      items: [
        {
          key: 'photo',
          photo: { src: '/images/clear-creek-fox-loop.jpg', alt: 'Forest habitat in Bankhead National Forest' },
        },
        {
          key: 'emphasis-areas',
          items: [
            'The Bankhead National Forest is home to two designated ',
            'Quail Emphasis Areas',
            ' — Black Pond and Inmanfield — where the U.S. Forest Service is actively managing habitat to support the Northern Bobwhite and other grassland-dependent wildlife.',
          ],
        },
        {
          key: 'pine-restoration',
          items: [
            'These areas focus on ',
            'longleaf and shortleaf pine restoration',
            ', using prescribed fire and selective thinning to recreate the open, park-like forests that once covered much of the Southeast. The result is a mosaic of native grasses, wildflowers, and young pines that provides ideal nesting and foraging habitat for bobwhite quail.',
          ],
        },
      ],
    },
    downloads: {
      heading: 'Resources & Downloads',
      intro:
        'Download maps, guides, and resources to plan your visit to the Bankhead National Forest.',
      items: [
        {
          key: 'birding-guide',
          title: 'Birding Guide',
          body: 'Complete guide to birding in the Bankhead, including trail descriptions and species lists.',
          href: '/downloads/bankhead-national-forest/birding-guide.pdf',
          badge: 'blue',
        },
        {
          key: 'quail-habitat',
          title: 'Quail Habitat Guide',
          body: 'Information on Black Pond and Inmanfield Quail Emphasis Areas and conservation efforts.',
          href: '/downloads/bankhead-national-forest/quail-habitat.pdf',
          badge: 'green',
        },
        {
          key: 'sipsey-canoe-map',
          title: 'Sipsey Canoe Map',
          body: 'Paddling map for the Sipsey Fork Wild and Scenic River corridor.',
          href: '/downloads/bankhead-national-forest/sipsey-canoe-map.pdf',
          badge: 'blue',
        },
        {
          key: 'sipsey-wilderness-map',
          title: 'Sipsey Wilderness Map',
          body: 'Trail map for the Sipsey Wilderness, the largest eastern wilderness area.',
          href: '/downloads/bankhead-national-forest/sipsey-wilderness-map.pdf',
          badge: 'green',
        },
        {
          key: 'clear-creek-map',
          title: 'Clear Creek Campground Map',
          body: 'Detailed map of Clear Creek Recreation Area camping loops and facilities.',
          href: '/downloads/bankhead-national-forest/clear-creek-map.pdf',
          badge: 'amber',
        },
        {
          key: 'corinth-map',
          title: 'Corinth Campground Map',
          body: 'Map of Corinth Recreation Area campsites and amenities.',
          href: '/downloads/bankhead-national-forest/corinth-map.pdf',
          badge: 'amber',
        },
        {
          key: 'forest-visitor-rules',
          title: 'Forest Visitor Rules',
          body: 'Rules, regulations, and guidelines for visiting the Bankhead National Forest.',
          href: '/downloads/bankhead-national-forest/forest-visitor-rules.pdf',
          badge: 'red',
        },
      ],
    },
    photoGallery: {
      heading: 'Photo Gallery',
    },
    scopeOfServices: {
      heading: 'Scope of Services',
      intro:
        'BA Services delivers full-service recreation management for the William B. Bankhead National Forest under a U.S. Forest Service concession contract, operating and maintaining the Clear Creek and Corinth Recreation Areas to ensure safe, clean, and welcoming outdoor experiences.',
      items: [
        {
          key: 'badge',
          title: 'Statement of Work',
        },
        {
          key: 'guest-services',
          title: 'Guest Services & Public Engagement',
          body: 'Hospitality-driven visitor services that create welcoming, informative outdoor experiences at every touchpoint.',
          items: [
            'Campground check-in and reservation support',
            'Visitor assistance and information services',
            'Retail and recreational support services',
            'Promotion of safe, family-oriented experiences',
            'Public outreach and guest communication',
          ],
        },
        {
          key: 'operations',
          title: 'Operations & Maintenance',
          body: 'Full-spectrum operational and maintenance services keeping all facilities running efficiently to Forest Service standards.',
          items: [
            'Grounds and site maintenance',
            'Road, parking area, and trail upkeep',
            'Facility repairs and preventative maintenance',
            'Water system monitoring and compliance support',
            'Waste collection and disposal',
            'Janitorial and sanitation services',
          ],
        },
        {
          key: 'stewardship',
          title: 'Environmental Stewardship',
          body: 'Conservation-focused practices that protect natural resources while maintaining public access to recreation areas.',
          items: [
            'Environmental remediation and protection practices',
            'Bio-hazard cleaning and safe material handling',
            'Natural resource preservation',
            'Site-sensitive maintenance protocols',
            'Forest Service environmental compliance support',
          ],
        },
        {
          key: 'safety',
          title: 'Safety & Compliance',
          body: 'Strict adherence to federal, state, and local regulations governing recreation sites on National Forest land.',
          items: [
            'Site security and public safety oversight',
            'Health and sanitation regulatory compliance',
            'Routine inspections and quality control reporting',
            'Coordination with Forest Service personnel',
            'Special Use Permit performance standards',
          ],
        },
        {
          key: 'facility-operations',
          title: 'Facility Operations',
          body: 'End-to-end management of recreation infrastructure across the Clear Creek and Corinth Recreation Areas.',
          items: [
            'Campgrounds and overnight facilities',
            'Day-use areas and picnic sites',
            'Swim beaches and boat launches',
            'Parking areas and access roads',
            'Accessibility and visitor experience standards',
          ],
        },
        {
          key: 'workforce',
          title: 'Workforce & Management',
          body: 'Experienced management and trained on-site personnel delivering consistent, professional service across all locations.',
          items: [
            'Staffing, training, and supervision',
            'Quality control and inspections',
            'Coordination with the U.S. Forest Service',
            'Continuous operational improvement',
            'On-site oversight and accountability',
          ],
        },
      ],
    },
    closingCta: {
      heading: 'Discover the Land of a Thousand Waterfalls',
      intro:
        'From the depths of the Sipsey Wilderness to the shores of Lewis Smith Lake, the Bankhead National Forest offers over 180,000 acres of Alabama\'s finest natural landscapes.',
      paragraphs: [
        'Bankhead Ranger District: (205) 489-5111 — Highway 33, Double Springs, AL',
      ],
    },
  },
}
