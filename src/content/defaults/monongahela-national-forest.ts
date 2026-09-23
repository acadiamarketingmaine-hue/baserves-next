import type { PropertyContent } from '../types'

/**
 * Moved verbatim out of src/app/monongahela-national-forest/page.tsx.
 *
 * That bespoke page shadows the `monongahela-national-forest` entry that used
 * to live here (lifted from src/app/[slug]/page.tsx and rendered nowhere), so
 * these are now the values that actually render. The shadowed [slug] values
 * disagreed on the tagline, the location line, the gallery, both paragraphs,
 * the stat labels, the feature list and both CTAs. Recorded in
 * design-audit/website-editor-inventory.md, not reconciled here.
 *
 * This page has no photo gallery, so `gallery` is empty: the hero, the two
 * Notable Destinations photographs and the birding photograph are its only
 * images, and each lives with the block that shows it.
 *
 * VERBATIM WART, do not "fix" without a rendering check: the hero, sidebar and
 * closing campground buttons are internal links to pages on this same site but
 * carry target="_blank" and open in a new tab. The same six links inside the
 * About prose are ordinary internal links and do not.
 */
export const monongahelaNationalForest: PropertyContent = {
  slug: 'monongahela-national-forest',
  name: 'Monongahela National Forest',
  tagline: 'National Forest',
  locationLine: 'Eastern West Virginia — Allegheny Mountains',
  summary:
    'Explore Monongahela National Forest — 921,000 acres of Allegheny Mountain wilderness with 800+ miles of trails, 5 wilderness areas, Spruce Knob, Seneca Rocks, highland bogs, and spruce forests.',
  seo: {
    title: 'Monongahela National Forest | Eastern West Virginia | BA Services',
    description:
      'Explore Monongahela National Forest — 921,000 acres of Allegheny Mountain wilderness with 800+ miles of trails, 5 wilderness areas, Spruce Knob, Seneca Rocks, highland bogs, and spruce forests.',
  },
  hero: {
    src: '/images/monongahela/spruce-knob-panorama.jpg',
    alt: 'Panoramic mountain vista from Spruce Knob, Monongahela National Forest',
  },
  gallery: [],
  paragraphs: [
    'Spanning nearly one million acres across ten counties in the Allegheny Mountains of eastern West Virginia, the Monongahela National Forest, established in 1920 and known locally as “the Mon”, stands among the most ecologically diverse and scenically rich landscapes in the central Appalachians. Elevations range from roughly 1,000 feet to the summit of Spruce Knob, the state\'s highest point at 4,863 feet, shaping a remarkable variety of ecosystems from windswept highland bogs and red spruce forests to sheltered hardwood coves deep in the valleys.',
    'This working forest plays a vital role in both conservation and local livelihoods, providing clean water, wildlife habitat, timber, grazing, and mineral resources, while supporting regional economies. At the same time, it offers exceptional recreation across more than 800 miles of trails, including segments of the renowned Allegheny Trail. Five federally designated wilderness areas protect some of the wildest remaining Appalachian terrain, including the distinctive Dolly Sods plateau and the unique Cranberry Glades botanical area.',
    'Natural landmarks such as Seneca Rocks, an iconic vertical formation drawing climbers from across the country, add to the forest\'s appeal, while cold mountain streams sustain native brook trout fisheries. The diversity of habitats makes the Monongahela a year-round destination for birders, botanists, and outdoor enthusiasts alike.',
    'The Cheat-Potomac Ranger District, located in the northern portion of the forest, exemplifies the Monongahela\'s accessibility and breadth of recreational opportunity. Within this district, visitors will find a collection of well-situated recreation sites that serve as gateways to the surrounding landscape:',
    'While peak visitation typically runs from Memorial Day through Labor Day, the district supports year-round use across its varied terrain. Visitors can enjoy camping, hiking, hunting, fishing, mountain biking, rock climbing, picnicking, scenic driving, swimming, and boating.',
    'Across this diverse landscape, the Monongahela National Forest maintains a careful balance of rugged natural beauty, productive land use, and lasting public enjoyment. Explore your Forest!',
  ],
  features: [
    'Hiking & Backpacking',
    'Rock Climbing',
    'Fishing (Native Brook Trout)',
    'Hunting',
    'Camping',
    'Scenic Drives',
    'Wildlife Viewing',
    'Birding',
    'Botanical Exploration',
    'Cross-Country Skiing',
    'Mountain Biking',
    'Horseback Riding',
  ],
  stats: [
    { key: 'acres', value: '921,000', label: 'Acres' },
    { key: 'trails', value: '800+', label: 'Miles of Trails' },
    { key: 'wildernessAreas', value: '5', label: 'Wilderness Areas' },
    { key: 'peakElevation', value: '4,863 ft', label: 'Peak Elevation' },
  ],
  season: { isSeasonal: false },
  notices: [],
  ctas: {
    bloomingGuide: {
      label: 'Download Full Blooming Guide (PDF)',
      url: '/downloads/monongahela-national-forest/blooming-schedule.pdf',
      kind: 'internal',
    },
    birdChecklist: {
      label: 'Download Bird Checklist (PDF)',
      url: '/downloads/monongahela-national-forest/bird-checklist.pdf',
      kind: 'internal',
    },
    footerExperiences: {
      label: 'View All Experiences',
      url: '/experiences',
      kind: 'internal',
    },
  },
  sections: {
    heroLinks: {
      items: [
        { key: 'big-bend', title: 'Big Bend', href: '/monongahela-national-forest/big-bend-campground' },
        { key: 'jess-judy', title: 'Jess Judy Group', href: '/monongahela-national-forest/jess-judy-group-campground' },
        { key: 'seneca-shadows', title: 'Seneca Shadows', href: '/monongahela-national-forest/seneca-shadows-campground' },
        { key: 'spruce-knob-lake', title: 'Spruce Knob Lake', href: '/monongahela-national-forest/spruce-knob-lake-campground' },
        { key: 'gatewood', title: 'Gatewood Group', href: '/monongahela-national-forest/gatewood-group-campground' },
        { key: 'stuart', title: 'Stuart Recreation Area', href: '/monongahela-national-forest/stuart-recreation-area' },
      ],
    },
    about: {
      heading: 'About Monongahela National Forest',
      items: [
        { key: 'big-bend', title: 'Big Bend Campground', href: '/monongahela-national-forest/big-bend-campground' },
        { key: 'jess-judy', title: 'Jess Judy Group Campground', href: '/monongahela-national-forest/jess-judy-group-campground' },
        { key: 'seneca-shadows', title: 'Seneca Shadows Campground', href: '/monongahela-national-forest/seneca-shadows-campground' },
        { key: 'spruce-knob-lake', title: 'Spruce Knob Lake Campground', href: '/monongahela-national-forest/spruce-knob-lake-campground' },
        { key: 'gatewood', title: 'Gatewood Group Campground', href: '/monongahela-national-forest/gatewood-group-campground' },
        { key: 'stuart', title: 'Stuart Recreation Area', href: '/monongahela-national-forest/stuart-recreation-area' },
      ],
    },
    ecologicalDiversity: {
      heading: 'Ecological Diversity',
      paragraphs: [
        'The Monongahela is recognized as one of the most ecologically diverse national forests in the eastern United States. Its elevation range — from around 1,000 feet in river valleys to nearly 5,000 feet at Spruce Knob — creates a remarkable gradient of ecosystems within a single forest.',
      ],
      items: [
        {
          key: 'highlights',
          items: [
            'Highland bogs with rare northern plant species',
            'Red spruce forests at the highest elevations',
            'Pristine mountain streams and waterfalls',
            'Diverse hardwood forests with rich wildflower displays',
            'Heath barrens and rock outcrops on exposed ridges',
            'Cranberry Glades — a botanical wonder of the south',
          ],
        },
      ],
    },
    activities: {
      heading: 'Activities',
    },
    readyToExplore: {
      heading: 'Ready to Explore?',
      intro:
        'Plan your trip to the Monongahela National Forest and experience one of the East\'s most spectacular wilderness destinations.',
      items: [
        { key: 'big-bend', title: 'Big Bend', href: '/monongahela-national-forest/big-bend-campground' },
        { key: 'seneca-shadows', title: 'Seneca Shadows', href: '/monongahela-national-forest/seneca-shadows-campground' },
        { key: 'spruce-knob-lake', title: 'Spruce Knob Lake', href: '/monongahela-national-forest/spruce-knob-lake-campground' },
        { key: 'stuart', title: 'Stuart Rec Area', href: '/monongahela-national-forest/stuart-recreation-area' },
        { key: 'jess-judy', title: 'Jess Judy Group', href: '/monongahela-national-forest/jess-judy-group-campground' },
        { key: 'gatewood', title: 'Gatewood Group', href: '/monongahela-national-forest/gatewood-group-campground' },
      ],
    },
    wildernessAreas: {
      heading: 'Five Federally Designated Wilderness Areas',
      intro:
        'The Monongahela protects five wilderness areas totaling tens of thousands of acres — some of the wildest and most remote landscapes in the eastern United States. No motorized vehicles or mechanized equipment are permitted within wilderness boundaries.',
      items: [
        {
          key: 'otter-creek',
          title: 'Otter Creek Wilderness',
          body: 'Over 20,000 acres of rugged terrain with more than 40 miles of trails winding through dense hardwood forests, past waterfalls, and along Otter Creek. A premier backpacking destination.',
        },
        {
          key: 'dolly-sods',
          title: 'Dolly Sods Wilderness',
          body: 'A high-altitude plateau featuring windswept landscapes, heath barrens, and sphagnum bogs reminiscent of the Canadian tundra. One of the most unique ecosystems in the eastern United States.',
        },
        {
          key: 'cranberry',
          title: 'Cranberry Wilderness',
          body: 'The largest wilderness area in the forest at over 35,000 acres. Home to the famous Cranberry Glades, a series of botanical areas featuring plants normally found hundreds of miles to the north.',
        },
        {
          key: 'laurel-fork-north',
          title: 'Laurel Fork North Wilderness',
          body: 'Remote and lightly traveled, this wilderness area protects the headwaters of Laurel Fork. Excellent native brook trout fishing in pristine mountain streams.',
        },
        {
          key: 'laurel-fork-south',
          title: 'Laurel Fork South Wilderness',
          body: 'A wild landscape of dense forests, bogs, and open meadows along the southern reach of Laurel Fork. Popular with anglers and solitude seekers alike.',
        },
      ],
    },
    notableDestinations: {
      heading: 'Notable Destinations',
      items: [
        {
          key: 'spruce-knob',
          title: 'Spruce Knob',
          meta: '4,863 ft',
          body: 'The highest point in West Virginia, offering 360-degree panoramic views from the observation tower. The summit features a stunted spruce forest shaped by harsh winds and a network of hiking trails. The Whispering Spruce Trail is a gentle half-mile loop at the summit.',
          photo: { src: '/images/monongahela/spruce-knob-sign.jpg', alt: 'Spruce Knob roadside sign: highest point in West Virginia' },
        },
        {
          key: 'seneca-rocks',
          title: 'Seneca Rocks',
          meta: '4,606 ft',
          body: 'An iconic 900-foot Tuscarora quartzite fin rising dramatically above the North Fork River valley. One of the premier rock climbing destinations on the East Coast, with hundreds of established routes. The Sites Homestead Visitor Center provides interpretive exhibits and a 1.3-mile trail leads to the north peak.',
          photo: { src: '/images/monongahela/seneca-rocks-sign.jpg', alt: 'Seneca Rocks Discovery Center sign' },
        },
      ],
    },
    bloomingSchedule: {
      heading: 'Blooming Schedule',
      intro:
        'From May through November, the Monongahela puts on a continuous botanical display. Rhododendrons, azaleas, orchids, blueberries, and hundreds of wildflower species bloom in succession as the seasons change — followed by one of the most spectacular fall foliage shows in the Appalachians.',
      items: [
        { key: 'may', title: 'May', body: 'Trilliums, violets, columbine, and early azaleas carpet the forest floor' },
        { key: 'june', title: 'June', body: 'Rhododendrons peak in stunning displays; mountain laurel and flame azaleas bloom at higher elevations' },
        { key: 'july', title: 'July', body: 'Wild orchids, black-eyed Susans, and the rare sundew in highland bogs' },
        { key: 'august', title: 'August', body: 'Wild blueberries ripen across the high plateaus; Joe-Pye weed and ironweed line streams' },
        { key: 'september', title: 'September', body: 'Goldenrod, asters, and gentians; early fall color begins at the highest elevations' },
        { key: 'october', title: 'October', body: 'Peak fall foliage transforms the Alleghenies into a mosaic of red, orange, and gold' },
        { key: 'november', title: 'November', body: 'Late-season color in sheltered valleys; witch hazel blooms as the last wildflower of the year' },
      ],
    },
    birding: {
      heading: 'Birding in the Monongahela',
      paragraphs: [
        'The diversity of habitats across the Monongahela — from spruce-fir forests and highland bogs to hardwood coves and riparian corridors — supports an exceptional variety of bird species. The forest is an important breeding area for neotropical migrants and northern species at the southern edge of their range.',
        'A comprehensive bird checklist is available for download, covering species found throughout the forest across all seasons. Whether you\'re tracking warblers through spruce stands at Dolly Sods or spotting raptors along the ridgelines, the Monongahela offers outstanding birding opportunities.',
      ],
      items: [
        {
          key: 'photo',
          photo: {
            src: '/images/monongahela/spruce-treetops.jpg',
            alt: 'Spruce treetops and mountain views in Monongahela National Forest',
          },
        },
      ],
    },
    resources: {
      heading: 'Resources & Downloads',
      intro:
        'Download maps, guides, and checklists to plan your visit to the Monongahela National Forest.',
    },
    campgroundMaps: {
      heading: 'Campground Maps',
      items: [
        { key: 'seneca-shadows', title: 'Seneca Shadows Campground Map', href: '/downloads/monongahela-national-forest/campground-maps/seneca-shadows.pdf' },
        { key: 'spruce-knob-lake', title: 'Spruce Knob Lake Campground Map', href: '/downloads/monongahela-national-forest/campground-maps/spruce-knob-lake.pdf' },
      ],
    },
    wildernessMaps: {
      heading: 'Wilderness Maps',
      items: [
        { key: 'dolly-sods', title: 'Dolly Sods Wilderness Map', href: '/downloads/monongahela-national-forest/wilderness-maps/dolly-sods.pdf' },
      ],
    },
    guides: {
      heading: 'Guides & References',
      items: [
        { key: 'bird-checklist', title: 'Bird Checklist', href: '/downloads/monongahela-national-forest/bird-checklist.pdf' },
        { key: 'blooming-schedule', title: 'Blooming Schedule', href: '/downloads/monongahela-national-forest/blooming-schedule.pdf' },
        { key: 'motor-vehicle-map', title: 'Motor Vehicle Use Map', href: '/downloads/monongahela-national-forest/motor-vehicle-map.pdf' },
      ],
    },
    scopeOfServices: {
      heading: 'Scope of Services',
      intro:
        'BA Services provides full-service management, operations, and maintenance for campground and day-use recreation facilities within the Monongahela National Forest under a USDA Forest Service concession contract — delivering turnkey services that ensure safe, clean, and enjoyable recreational experiences while protecting federal lands.',
      items: [
        {
          key: 'badge',
          title: 'Statement of Work',
        },
        {
          key: 'operations',
          title: 'Campground & Recreation Area Operations',
          body: 'Daily management of multiple campgrounds and recreation areas across the Cheat-Potomac Ranger District.',
          items: [
            'Opening, closing, and seasonal scheduling of facilities',
            'Managing reservations through Recreation.gov',
            'Operating fee stations and ensuring proper fee collection',
            'Providing on-site staff presence and visitor assistance',
            'Adjusting operations based on weather, safety, and Forest Service direction',
          ],
        },
        {
          key: 'visitor-services',
          title: 'Visitor Services & Customer Experience',
          body: 'Hospitality-focused public interaction ensuring a high-quality visitor experience at every site.',
          items: [
            'Greeting visitors and providing information, maps, and guidance',
            'Maintaining visible staff presence through patrols and campground hosts',
            'Offering educational materials and interpretive programs',
            'Supporting safe and enjoyable recreation through proactive engagement',
            'Promoting a family-oriented outdoor experience',
          ],
        },
        {
          key: 'maintenance',
          title: 'Facility Maintenance & Grounds Management',
          body: 'Maintaining all physical assets to meet or exceed U.S. Forest Service standards.',
          items: [
            'Cleaning restrooms, campsites, and common areas',
            'Maintaining roads, trails, signage, and infrastructure',
            'Servicing water systems and utilities',
            'Performing repairs, painting, landscaping, and general upkeep',
            'Managing trash collection and sanitation',
          ],
        },
        {
          key: 'staffing',
          title: 'Staffing & On-Site Management',
          body: 'A structured team deployed to operate and oversee all sites with 24/7 peak-season coverage.',
          items: [
            'Area Managers and Unit Managers for overall supervision',
            'Campground Hosts for guest services and daily upkeep',
            'Maintenance Technicians for repairs and infrastructure support',
            'Gate Attendants for visitor entry and fee collection',
            'Interpretive staff for educational programming',
          ],
        },
        {
          key: 'safety',
          title: 'Safety, Security & Compliance',
          body: 'Core safety and regulatory compliance responsibilities across all managed recreation sites.',
          items: [
            'Conducting routine safety inspections and hazard mitigation',
            'Enforcing campground rules and fire restrictions',
            'Implementing fire prevention and emergency response plans',
            'Coordinating with law enforcement and Forest Service personnel',
            'Ensuring compliance with federal, state, and environmental regulations',
          ],
        },
        {
          key: 'stewardship',
          title: 'Environmental Stewardship',
          body: 'Operating with a commitment to protecting the natural resources of the Monongahela.',
          items: [
            'Managing vegetation and hazard trees',
            'Supporting wildlife awareness and protection efforts',
            'Maintaining water quality standards',
            'Promoting recycling and sustainable practices',
            'Minimizing environmental impact while enhancing visitor access',
          ],
        },
        {
          key: 'revenue',
          title: 'Revenue & Administrative Management',
          body: 'Full financial and administrative oversight of the concession operation.',
          items: [
            'Fee collection, reporting, and accounting',
            'Revenue tracking and financial reporting to the Forest Service',
            'Compliance with Special Use Permit requirements',
            'Managing contracts, insurance, and operational documentation',
          ],
        },
        {
          key: 'guest-services',
          title: 'Additional Guest Services & Enhancements',
          body: 'Value-added services and amenities that improve the overall visitor experience.',
          items: [
            'Sale of firewood and convenience items',
            'Interpretive programs and educational outreach',
            'Optional amenities such as cabin rentals where applicable',
            'Communication tools for guest feedback and service requests',
          ],
        },
      ],
    },
    closingCta: {
      heading: 'Experience the Wild Heart of West Virginia',
      intro:
        'From Spruce Knob\'s summit to the depths of Seneca Rocks, the Monongahela National Forest offers 921,000 acres of Appalachian wilderness waiting to be explored.',
      items: [
        { key: 'big-bend', title: 'Big Bend', href: '/monongahela-national-forest/big-bend-campground' },
        { key: 'seneca-shadows', title: 'Seneca Shadows', href: '/monongahela-national-forest/seneca-shadows-campground' },
        { key: 'spruce-knob-lake', title: 'Spruce Knob Lake', href: '/monongahela-national-forest/spruce-knob-lake-campground' },
        { key: 'stuart', title: 'Stuart Rec Area', href: '/monongahela-national-forest/stuart-recreation-area' },
        { key: 'jess-judy', title: 'Jess Judy Group', href: '/monongahela-national-forest/jess-judy-group-campground' },
        { key: 'gatewood', title: 'Gatewood Group', href: '/monongahela-national-forest/gatewood-group-campground' },
      ],
    },
  },
}
