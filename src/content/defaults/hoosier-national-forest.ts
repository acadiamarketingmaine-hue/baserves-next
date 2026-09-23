import type { PropertyContent } from '../types'

/**
 * Moved verbatim out of src/app/hoosier-national-forest/page.tsx.
 *
 * This page has no photo gallery, so `gallery` is empty: the hero is its only
 * photograph. The three recreation-area cards carry their own.
 *
 * VERBATIM WART, do not "fix" without a rendering check: the three hero
 * recreation-area buttons are internal links to pages on this same site, but
 * they carry target="_blank" and open in a new tab. Recorded in
 * design-audit/website-editor-inventory.md.
 */
export const hoosierNationalForest: PropertyContent = {
  slug: 'hoosier-national-forest',
  name: 'Hoosier National Forest',
  tagline: 'Indiana National Forest',
  locationLine: 'Southern Indiana — US Forest Service',
  summary:
    'Explore Hoosier National Forest in southern Indiana. Three recreation areas with camping, swimming, fishing, boating, and hundreds of miles of trails.',
  seo: {
    title: 'Hoosier National Forest | Southern Indiana | BA Services',
    description:
      'Explore Hoosier National Forest in southern Indiana. Three recreation areas with camping, swimming, fishing, boating, and hundreds of miles of trails.',
  },
  hero: {
    src: '/images/hardin-ridge/aerial.jpg',
    alt: 'Hoosier National Forest, Southern Indiana',
  },
  gallery: [],
  paragraphs: [
    'Hoosier National Forest spans approximately 200,000 acres across nine counties in south-central Indiana, making it the state\'s only national forest and a vital public resource in a region where limited land is publicly accessible. Managed by the U.S. Forest Service, the forest stretches across Monroe, Brown, Lawrence, Martin, Orange, Perry, Crawford, Dubois, and Jackson counties, offering a diverse landscape of rolling hills, dense hardwood forests, sandstone bluffs, caves, and winding waterways.',
    'The forest is organized into two ranger districts—Brownstown and Tell City—with administrative offices located in Bedford and Tell City. Positioned within a 200-mile radius of more than seven million people, Hoosier National Forest serves as a highly accessible destination for visitors from major metropolitan areas including Indianapolis, Chicago, Cincinnati, Louisville, and beyond.',
    'Recreational opportunities are extensive and varied. More than 260 miles of trails support hiking, horseback riding, and mountain biking, while lakes and reservoirs provide opportunities for boating, fishing, swimming, and paddling. The forest is also home to Indiana\'s only designated wilderness area, the Charles C. Deam Wilderness, as well as notable destinations such as Hemlock Cliffs, Hickory Ridge Lookout Tower, and scenic overlooks along the Ohio River Scenic Byway.',
    'Three primary developed recreation areas—Hardin Ridge, Indian-Celina Lakes, and Tipsaw Lake—serve as focal points for visitor activity. Hardin Ridge Recreation Area is located on the shoreline of Monroe Lake, Indiana\'s largest reservoir, and provides access to boating, water sports, and fishing, along with nearby amenities managed by the Indiana Department of Natural Resources and the U.S. Army Corps of Engineers. Indian-Celina Lakes and Tipsaw Lake Recreation Areas, located in the southern portion of the forest, offer quieter settings centered around smaller Forest Service-managed lakes, popular for kayaking, fishing, camping, and relaxation.',
    'Beyond these developed sites, the forest includes additional campgrounds, dispersed recreation areas, and culturally significant sites such as the Pioneer Mothers Memorial Forest and the Lick Creek African American Settlement. Nearby attractions—including Brown County State Park, Marengo Cave, Lincoln Boyhood Memorial, and the French Lick and West Baden resorts—further enhance the region\'s appeal as a destination.',
    'Hoosier National Forest offers year-round recreation shaped by a four-season climate. Summers are warm and ideal for lake activities, spring brings mild temperatures and seasonal rains, fall is known for vibrant foliage and excellent camping conditions, and winters are generally mild with occasional snowfall.',
    'Through a balance of recreation, conservation, and public stewardship, Hoosier National Forest provides a diverse and accessible outdoor experience, serving both local communities and visitors from across the Midwest.',
  ],
  features: [
    'Hiking & Backpacking',
    'Camping',
    'Fishing',
    'Swimming',
    'Boating & Kayaking',
    'Mountain Biking',
    'Horseback Riding',
    'Rock Climbing',
    'Wildlife Watching',
    'Hunting',
  ],
  stats: [
    { key: 'acres', value: '200,000', label: 'Acres' },
    { key: 'trails', value: '260+', label: 'Miles Trails' },
    { key: 'recreationAreas', value: '3', label: 'Recreation Areas' },
    { key: 'open', value: 'Year-Round', label: 'Open' },
  ],
  season: { isSeasonal: false, label: 'Year-Round' },
  notices: [],
  ctas: {
    heroHardinRidge: {
      label: 'Hardin Ridge',
      url: '/hardin-ridge-recreation-area',
      kind: 'internal',
    },
    heroIndianCelina: {
      label: 'Indian-Celina Lakes',
      url: '/indian-celina-lakes-recreation-area',
      kind: 'internal',
    },
    heroTipsaw: {
      label: 'Tipsaw Lake',
      url: '/tipsaw-lake-recreation-area',
      kind: 'internal',
    },
    sidebar: {
      label: 'View Recreation Areas',
      url: '#recreation-areas',
      kind: 'internal',
    },
    footerHardinRidge: {
      label: 'Hardin Ridge',
      url: '/hardin-ridge-recreation-area',
      kind: 'internal',
    },
    footerIndianCelina: {
      label: 'Indian-Celina Lakes',
      url: '/indian-celina-lakes-recreation-area',
      kind: 'internal',
    },
    footerTipsaw: {
      label: 'Tipsaw Lake',
      url: '/tipsaw-lake-recreation-area',
      kind: 'internal',
    },
  },
  sections: {
    about: {
      heading: 'About Hoosier National Forest',
    },
    deamWilderness: {
      heading: 'Charles C. Deam Wilderness',
      paragraphs: [
        'At 13,000 acres, the Charles C. Deam Wilderness Area is Indiana\'s only federally designated wilderness. Named for Indiana\'s first state forester, the area features rugged ridgelines, deep ravines, and old-growth forest remnants along the southern shore of Monroe Lake. No motorized vehicles or mechanized equipment are permitted, preserving a truly wild experience for hikers and backpackers.',
      ],
    },
    thingsToDo: {
      heading: 'Things to Do',
    },
    planYourVisit: {
      heading: 'Plan Your Visit',
      intro:
        'Explore three recreation areas offering camping, swimming, fishing, and hundreds of miles of trails in southern Indiana.',
    },
    recreationAreas: {
      heading: 'Recreation Areas',
      intro:
        'Three developed recreation areas serve as gateways into Hoosier National Forest, each offering campgrounds, water access, and miles of trails.',
      items: [
        {
          key: 'hardin-ridge',
          title: 'Hardin Ridge Recreation Area',
          href: '/hardin-ridge-recreation-area',
          body: '195 campsites on Monroe Lake — Indiana\'s largest reservoir. Features a swimming beach, boat ramp, and over 12 miles of trails winding through hardwood forest.',
          photo: { src: '/images/hardin-ridge-entrance-sign.jpg', alt: 'Hardin Ridge Recreation Area' },
          badge: 'Monroe Lake',
        },
        {
          key: 'indian-celina',
          title: 'Indian-Celina Lakes Recreation Area',
          href: '/indian-celina-lakes-recreation-area',
          body: 'Two scenic lakes nestled in the forest with an accessible fishing pier, camping, boat launch, and hiking trails through rolling southern Indiana terrain.',
          photo: { src: '/images/indian-celina-entrance-sign.jpg', alt: 'Indian-Celina Lakes Recreation Area' },
          badge: 'Twin Lakes',
        },
        {
          key: 'tipsaw-lake',
          title: 'Tipsaw Lake Recreation Area',
          href: '/tipsaw-lake-recreation-area',
          body: '131-acre lake with 35+ campsites, a swimming beach, amphitheater, and over 8 miles of trails through some of the most rugged terrain in the forest.',
          photo: { src: '/images/tipsaw-lake/lake-view.jpg', alt: 'Tipsaw Lake Recreation Area' },
          badge: 'Lake Recreation',
        },
      ],
    },
    activities: {
      heading: 'Activities',
      intro:
        '200,000 acres of hardwood forests, lakes, and sandstone bluffs provide year-round recreation across southern Indiana.',
      items: [
        {
          key: 'hiking',
          title: 'Hiking & Backpacking',
          body: 'Over 260 miles of trails traverse hardwood forests, sandstone bluffs, and ridgelines. Routes range from easy lakeside loops to multi-day backcountry treks through the Deam Wilderness.',
        },
        {
          key: 'fishing',
          title: 'Fishing',
          body: 'Cast a line in Monroe Lake, Tipsaw Lake, Indian Lake, or Celina Lake. Species include largemouth bass, bluegill, catfish, and crappie. Accessible fishing piers available.',
        },
        {
          key: 'swimming',
          title: 'Swimming',
          body: 'Sandy beaches at Hardin Ridge and Tipsaw Lake provide refreshing summer swimming with designated swim areas, changing facilities, and nearby picnic grounds.',
        },
        {
          key: 'boating',
          title: 'Boating',
          body: 'Boat ramps at Monroe Lake, Tipsaw Lake, and Indian-Celina Lakes provide access for canoes, kayaks, and motorized boats. Monroe Lake alone covers 10,750 acres.',
        },
        {
          key: 'camping',
          title: 'Camping',
          body: 'Hundreds of campsites across three recreation areas, from developed sites with electric hookups to primitive backcountry camping in the Deam Wilderness.',
        },
        {
          key: 'wildlife-viewing',
          title: 'Wildlife Viewing',
          body: 'The forest supports white-tailed deer, wild turkey, bald eagles, Indiana bats, and over 100 bird species. Fall migration and spring wildflower seasons are especially rewarding.',
        },
      ],
    },
    scopeOfServices: {
      heading: 'Scope of Services',
      intro:
        'BA Services provides comprehensive concession services for the Hoosier National Forest under a U.S. Forest Service contract — managing the full operation, maintenance, and visitor services across designated campgrounds, cabins, and day-use recreation areas.',
      items: [
        {
          key: 'badge',
          title: 'Statement of Work',
        },
        {
          key: 'operations',
          title: 'Recreation Area Operations',
          body: 'Full operation of campgrounds, cabins, beaches, and day-use areas throughout the Hoosier National Forest.',
          items: [
            'Operate campgrounds, cabins, beaches, and day-use areas on approved seasonal schedules',
            'Adjust operations based on weather, safety conditions, and visitor demand',
            'Coordinate closely with the U.S. Forest Service on all operational decisions',
            'Manage extended operating seasons at select sites',
            'Provide cabin accommodations and strategic amenities that complement the natural setting',
          ],
        },
        {
          key: 'visitor-services',
          title: 'Visitor Services & Guest Experience',
          body: 'Front-line customer service and visitor engagement rooted in traditional camping values.',
          items: [
            'Campground hosts, gate attendants, and on-site staff providing front-line service',
            'Visitor information, education, and assistance throughout each stay',
            'Fee collection and Recreation.gov reservation coordination',
            'Text-based support and modern communication tools',
            'Respectful, family-oriented outdoor experience rooted in traditional camping values',
          ],
        },
        {
          key: 'maintenance',
          title: 'Facility Maintenance & Cleanliness',
          body: 'Rigorous maintenance protocols that meet or exceed National Forest Service quality standards.',
          items: [
            'Restroom and sanitation system maintenance',
            'Campsite, picnic area, and common space upkeep',
            'Road, trail, and signage maintenance',
            'Daily and scheduled cleaning to ensure high standards',
            'Pre-season, mid-season, and post-season facility inspections',
          ],
        },
        {
          key: 'staffing',
          title: 'Staffing & On-Site Management',
          body: 'A full team of trained personnel providing continuous presence at key recreation sites.',
          items: [
            'Area Managers and Unit Managers',
            'Campground Hosts and Gate Attendants',
            'Maintenance Technicians and Security Staff',
            '24/7 staffing presence at key recreation sites during operating seasons',
            'Recruiting and training staff to meet federal service, safety, and hospitality standards',
          ],
        },
        {
          key: 'safety',
          title: 'Safety, Security & Emergency Response',
          body: 'Comprehensive safety programs including inspections, fire prevention, and emergency coordination.',
          items: [
            'Regular safety inspections and hazard mitigation for trees, infrastructure, and facilities',
            'Fire prevention and response protocols',
            'Campground security, rule enforcement, and incident reporting',
            'Emergency response coordination with appropriate agencies',
            'Continuous visitor and employee safety assurance',
          ],
        },
        {
          key: 'stewardship',
          title: 'Environmental Stewardship',
          body: 'Responsible operations that protect natural resources and preserve the forest atmosphere.',
          items: [
            'Protect natural resources through responsible operations and maintenance practices',
            'Vegetation management and wildlife interaction protocols',
            'Waste system management and recycling programs',
            'Eco-friendly and sustainability initiatives',
            'Preserve the non-commercialized forest atmosphere valued by visitors',
          ],
        },
        {
          key: 'partnership',
          title: 'Forest Service Partnership',
          body: 'Transparent, collaborative partnership with the U.S. Forest Service as the primary on-the-ground operator.',
          items: [
            'Serve as primary on-the-ground partner to the U.S. Forest Service',
            'Regular inspections, reporting, and performance evaluations',
            'Full compliance with federal regulations and concession requirements',
            'Adherence to approved operating plans',
            'Collaborative, transparent working relationship with Forest Service personnel',
          ],
        },
        {
          key: 'quality-standards',
          title: 'Quality Standards & Visitor Enhancement',
          body: 'Proven results-driven model that transforms recreation sites into welcoming, well-managed destinations.',
          items: [
            'Meet or exceed National Quality Standards for Recreation Management',
            'Full compliance with U.S. Forest Service operating requirements',
            'Federal employment, safety, and civil rights standards adherence',
            'Informational materials and forest-specific visitor guides',
            'Initial facility improvement followed by ongoing high standards of maintenance',
          ],
        },
      ],
    },
    closingCta: {
      heading: 'Discover Hoosier National Forest',
      intro:
        '200,000 acres of southern Indiana wilderness with three recreation areas, hundreds of miles of trails, and Indiana\'s only designated wilderness. Start exploring today.',
    },
  },
}
