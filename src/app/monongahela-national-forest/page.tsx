import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Monongahela National Forest | Eastern West Virginia | BA Services',
  description: 'Explore Monongahela National Forest — 921,000 acres of Allegheny Mountain wilderness with 800+ miles of trails, 5 wilderness areas, Spruce Knob, Seneca Rocks, highland bogs, and spruce forests.',
  alternates: { canonical: '/monongahela-national-forest' },
}

const wildernessAreas = [
  {
    name: 'Otter Creek Wilderness',
    description: 'Over 20,000 acres of rugged terrain with more than 40 miles of trails winding through dense hardwood forests, past waterfalls, and along Otter Creek. A premier backpacking destination.',
  },
  {
    name: 'Dolly Sods Wilderness',
    description: 'A high-altitude plateau featuring windswept landscapes, heath barrens, and sphagnum bogs reminiscent of the Canadian tundra. One of the most unique ecosystems in the eastern United States.',
  },
  {
    name: 'Cranberry Wilderness',
    description: 'The largest wilderness area in the forest at over 35,000 acres. Home to the famous Cranberry Glades, a series of botanical areas featuring plants normally found hundreds of miles to the north.',
  },
  {
    name: 'Laurel Fork North Wilderness',
    description: 'Remote and lightly traveled, this wilderness area protects the headwaters of Laurel Fork. Excellent native brook trout fishing in pristine mountain streams.',
  },
  {
    name: 'Laurel Fork South Wilderness',
    description: 'A wild landscape of dense forests, bogs, and open meadows along the southern reach of Laurel Fork. Popular with anglers and solitude seekers alike.',
  },
]

const notableDestinations = [
  {
    name: 'Spruce Knob',
    elevation: '4,863 ft',
    description: 'The highest point in West Virginia, offering 360-degree panoramic views from the observation tower. The summit features a stunted spruce forest shaped by harsh winds and a network of hiking trails. The Whispering Spruce Trail is a gentle half-mile loop at the summit.',
  },
  {
    name: 'Seneca Rocks',
    elevation: '4,606 ft',
    description: 'An iconic 900-foot Tuscarora quartzite fin rising dramatically above the North Fork River valley. One of the premier rock climbing destinations on the East Coast, with hundreds of established routes. The Sites Homestead Visitor Center provides interpretive exhibits and a 1.3-mile trail leads to the north peak.',
  },
]

const bloomingSchedule = [
  { month: 'May', highlights: 'Trilliums, violets, columbine, and early azaleas carpet the forest floor' },
  { month: 'June', highlights: 'Rhododendrons peak in stunning displays; mountain laurel and flame azaleas bloom at higher elevations' },
  { month: 'July', highlights: 'Wild orchids, black-eyed Susans, and the rare sundew in highland bogs' },
  { month: 'August', highlights: 'Wild blueberries ripen across the high plateaus; Joe-Pye weed and ironweed line streams' },
  { month: 'September', highlights: 'Goldenrod, asters, and gentians; early fall color begins at the highest elevations' },
  { month: 'October', highlights: 'Peak fall foliage transforms the Alleghenies into a mosaic of red, orange, and gold' },
  { month: 'November', highlights: 'Late-season color in sheltered valleys; witch hazel blooms as the last wildflower of the year' },
]

const scopeOfWork = [
  {
    title: 'Campground & Recreation Area Operations',
    description: 'Daily management of multiple campgrounds and recreation areas across the Cheat-Potomac Ranger District.',
    items: [
      'Opening, closing, and seasonal scheduling of facilities',
      'Managing reservations through Recreation.gov',
      'Operating fee stations and ensuring proper fee collection',
      'Providing on-site staff presence and visitor assistance',
      'Adjusting operations based on weather, safety, and Forest Service direction',
    ],
  },
  {
    title: 'Visitor Services & Customer Experience',
    description: 'Hospitality-focused public interaction ensuring a high-quality visitor experience at every site.',
    items: [
      'Greeting visitors and providing information, maps, and guidance',
      'Maintaining visible staff presence through patrols and campground hosts',
      'Offering educational materials and interpretive programs',
      'Supporting safe and enjoyable recreation through proactive engagement',
      'Promoting a family-oriented outdoor experience',
    ],
  },
  {
    title: 'Facility Maintenance & Grounds Management',
    description: 'Maintaining all physical assets to meet or exceed U.S. Forest Service standards.',
    items: [
      'Cleaning restrooms, campsites, and common areas',
      'Maintaining roads, trails, signage, and infrastructure',
      'Servicing water systems and utilities',
      'Performing repairs, painting, landscaping, and general upkeep',
      'Managing trash collection and sanitation',
    ],
  },
  {
    title: 'Staffing & On-Site Management',
    description: 'A structured team deployed to operate and oversee all sites with 24/7 peak-season coverage.',
    items: [
      'Area Managers and Unit Managers for overall supervision',
      'Campground Hosts for guest services and daily upkeep',
      'Maintenance Technicians for repairs and infrastructure support',
      'Gate Attendants for visitor entry and fee collection',
      'Interpretive staff for educational programming',
    ],
  },
  {
    title: 'Safety, Security & Compliance',
    description: 'Core safety and regulatory compliance responsibilities across all managed recreation sites.',
    items: [
      'Conducting routine safety inspections and hazard mitigation',
      'Enforcing campground rules and fire restrictions',
      'Implementing fire prevention and emergency response plans',
      'Coordinating with law enforcement and Forest Service personnel',
      'Ensuring compliance with federal, state, and environmental regulations',
    ],
  },
  {
    title: 'Environmental Stewardship',
    description: 'Operating with a commitment to protecting the natural resources of the Monongahela.',
    items: [
      'Managing vegetation and hazard trees',
      'Supporting wildlife awareness and protection efforts',
      'Maintaining water quality standards',
      'Promoting recycling and sustainable practices',
      'Minimizing environmental impact while enhancing visitor access',
    ],
  },
  {
    title: 'Revenue & Administrative Management',
    description: 'Full financial and administrative oversight of the concession operation.',
    items: [
      'Fee collection, reporting, and accounting',
      'Revenue tracking and financial reporting to the Forest Service',
      'Compliance with Special Use Permit requirements',
      'Managing contracts, insurance, and operational documentation',
    ],
  },
  {
    title: 'Additional Guest Services & Enhancements',
    description: 'Value-added services and amenities that improve the overall visitor experience.',
    items: [
      'Sale of firewood and convenience items',
      'Interpretive programs and educational outreach',
      'Optional amenities such as cabin rentals where applicable',
      'Communication tools for guest feedback and service requests',
    ],
  },
]

const campgroundMaps = [
  { name: 'Bear Heaven Recreation Area Map', file: '/downloads/monongahela-national-forest/campground-maps/bear-heaven.pdf' },
  { name: 'Cranberry Campground Map', file: '/downloads/monongahela-national-forest/campground-maps/cranberry.pdf' },
  { name: 'Island Campground Map', file: '/downloads/monongahela-national-forest/campground-maps/island.pdf' },
  { name: 'Kumbrabow State Forest Map', file: '/downloads/monongahela-national-forest/campground-maps/kumbrabow.pdf' },
  { name: 'Seneca Shadows Campground Map', file: '/downloads/monongahela-national-forest/campground-maps/seneca-shadows.pdf' },
  { name: 'Spruce Knob Lake Campground Map', file: '/downloads/monongahela-national-forest/campground-maps/spruce-knob-lake.pdf' },
]

const wildernessMaps = [
  { name: 'Dolly Sods Wilderness Map', file: '/downloads/monongahela-national-forest/wilderness-maps/dolly-sods.pdf' },
  { name: 'Otter Creek Wilderness Map', file: '/downloads/monongahela-national-forest/wilderness-maps/otter-creek.pdf' },
  { name: 'Cranberry Wilderness Map', file: '/downloads/monongahela-national-forest/wilderness-maps/cranberry.pdf' },
  { name: 'Laurel Fork Wilderness Map', file: '/downloads/monongahela-national-forest/wilderness-maps/laurel-fork.pdf' },
]

export default function MonongahelaNationalForestPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/monongahela/spruce-knob-panorama.jpg"
            alt="Panoramic mountain vista from Spruce Knob, Monongahela National Forest"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 container-custom px-6 pb-16">
          <span className="inline-block px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full mb-4">
            National Forest
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
            Monongahela National Forest
          </h1>
          <div className="flex items-center text-white/80 mb-6">
            <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Eastern West Virginia &mdash; Allegheny Mountains
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'Big Bend', href: '/monongahela-national-forest/big-bend-campground' },
              { name: 'Jess Judy Group', href: '/monongahela-national-forest/jess-judy-group-campground' },
              { name: 'Seneca Shadows', href: '/monongahela-national-forest/seneca-shadows-campground' },
              { name: 'Spruce Knob Lake', href: '/monongahela-national-forest/spruce-knob-lake-campground' },
              { name: 'Gatewood Group', href: '/monongahela-national-forest/gatewood-group-campground' },
              { name: 'Stuart Recreation Area', href: '/monongahela-national-forest/stuart-recreation-area' },
            ].map((cg) => (
              <a
                key={cg.name}
                href={cg.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-forest-DEFAULT text-white text-sm font-semibold rounded-lg hover:bg-forest-dark transition-colors"
              >
                {cg.name}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-forest-DEFAULT py-8">
        <div className="container-custom px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { value: '921,000', label: 'Acres' },
              { value: '800+', label: 'Miles of Trails' },
              { value: '5', label: 'Wilderness Areas' },
              { value: '4,863 ft', label: 'Peak Elevation' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Monongahela National Forest</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Spanning 921,000 acres across the Allegheny Mountains of eastern West Virginia, the Monongahela National Forest is one of the most ecologically diverse forests in the eastern United States. From highland bogs and spruce forests at the highest elevations to lush hardwood coves in sheltered valleys, the forest supports an extraordinary range of plant and animal life.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Over 800 miles of trails traverse the forest, including portions of the Allegheny Trail, one of West Virginia&apos;s premier long-distance hiking routes. Five federally designated wilderness areas protect some of the wildest landscapes remaining in the Appalachians, including the famous Dolly Sods plateau and the Cranberry Glades botanical area.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The forest is home to Spruce Knob, the highest point in West Virginia at 4,863 feet, and Seneca Rocks, an iconic rock formation that attracts climbers from across the country. Mountain streams offer world-class native brook trout fishing, while the diversity of habitats makes this forest a destination for birders, botanists, and wildlife enthusiasts throughout the year.
                </p>
              </div>

              {/* Ecological Diversity Callout */}
              <div className="mt-10 bg-green-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ecological Diversity</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The Monongahela is recognized as one of the most ecologically diverse national forests in the eastern United States. Its elevation range &mdash; from around 1,000 feet in river valleys to nearly 5,000 feet at Spruce Knob &mdash; creates a remarkable gradient of ecosystems within a single forest.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  {[
                    'Highland bogs with rare northern plant species',
                    'Red spruce forests at the highest elevations',
                    'Pristine mountain streams and waterfalls',
                    'Diverse hardwood forests with rich wildflower displays',
                    'Heath barrens and rock outcrops on exposed ridges',
                    'Cranberry Glades — a botanical wonder of the south',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Activities</h3>
                <ul className="space-y-3">
                  {[
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
                  ].map((activity) => (
                    <li key={activity} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-forest-DEFAULT rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Ready to Explore?</h3>
                <p className="text-white/80 mb-6">
                  Plan your trip to the Monongahela National Forest and experience one of the East&apos;s most spectacular wilderness destinations.
                </p>
                <div className="space-y-2">
                  {[
                    { name: 'Big Bend', href: '/monongahela-national-forest/big-bend-campground' },
                    { name: 'Seneca Shadows', href: '/monongahela-national-forest/seneca-shadows-campground' },
                    { name: 'Spruce Knob Lake', href: '/monongahela-national-forest/spruce-knob-lake-campground' },
                    { name: 'Stuart Rec Area', href: '/monongahela-national-forest/stuart-recreation-area' },
                    { name: 'Jess Judy Group', href: '/monongahela-national-forest/jess-judy-group-campground' },
                    { name: 'Gatewood Group', href: '/monongahela-national-forest/gatewood-group-campground' },
                  ].map((cg) => (
                    <a key={cg.name} href={cg.href} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-2.5 bg-white text-forest-DEFAULT text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                      {cg.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wilderness Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Five Federally Designated Wilderness Areas</h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            The Monongahela protects five wilderness areas totaling tens of thousands of acres &mdash; some of the wildest and most remote landscapes in the eastern United States. No motorized vehicles or mechanized equipment are permitted within wilderness boundaries.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wildernessAreas.map((area) => (
              <div key={area.name} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{area.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Destinations */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Notable Destinations</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {notableDestinations.map((dest, index) => (
              <div key={dest.name} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="relative h-64">
                  <Image
                    src={index === 0 ? '/images/monongahela/spruce-knob-sign.jpg' : '/images/monongahela/seneca-rocks-sign.jpg'}
                    alt={dest.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 text-gray-900 font-semibold rounded-full text-sm">
                    {dest.elevation}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{dest.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{dest.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blooming Schedule */}
      <section className="py-16 bg-green-50">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Blooming Schedule</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                From May through November, the Monongahela puts on a continuous botanical display. Rhododendrons, azaleas, orchids, blueberries, and hundreds of wildflower species bloom in succession as the seasons change &mdash; followed by one of the most spectacular fall foliage shows in the Appalachians.
              </p>
              <a
                href="/downloads/monongahela-national-forest/blooming-schedule.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-forest-DEFAULT text-white font-semibold rounded-lg hover:bg-forest-dark transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Full Blooming Guide (PDF)
              </a>
            </div>
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {bloomingSchedule.map((entry) => (
                  <div key={entry.month} className="bg-white rounded-xl p-5 flex gap-4 items-start">
                    <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{entry.month.slice(0, 3).toUpperCase()}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{entry.month}</h4>
                      <p className="text-gray-600 text-sm">{entry.highlights}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Birding */}
      <section className="py-16">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image
                src="/images/monongahela/spruce-treetops.jpg"
                alt="Spruce treetops and mountain views in Monongahela National Forest"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Birding in the Monongahela</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The diversity of habitats across the Monongahela &mdash; from spruce-fir forests and highland bogs to hardwood coves and riparian corridors &mdash; supports an exceptional variety of bird species. The forest is an important breeding area for neotropical migrants and northern species at the southern edge of their range.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                A comprehensive bird checklist is available for download, covering species found throughout the forest across all seasons. Whether you&apos;re tracking warblers through spruce stands at Dolly Sods or spotting raptors along the ridgelines, the Monongahela offers outstanding birding opportunities.
              </p>
              <a
                href="/downloads/monongahela-national-forest/bird-checklist.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Bird Checklist (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Resources & Downloads */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Resources &amp; Downloads</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Download maps, guides, and checklists to plan your visit to the Monongahela National Forest.
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Campground Maps */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Campground Maps</h3>
              <ul className="space-y-3">
                {campgroundMaps.map((map) => (
                  <li key={map.name}>
                    <a
                      href={map.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-green-700 hover:text-green-900 transition-colors text-sm"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {map.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Wilderness Maps */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Wilderness Maps</h3>
              <ul className="space-y-3">
                {wildernessMaps.map((map) => (
                  <li key={map.name}>
                    <a
                      href={map.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-700 hover:text-blue-900 transition-colors text-sm"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {map.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Guides & References */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Guides &amp; References</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/downloads/monongahela-national-forest/bird-checklist.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-amber-700 hover:text-amber-900 transition-colors text-sm"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Bird Checklist
                  </a>
                </li>
                <li>
                  <a
                    href="/downloads/monongahela-national-forest/blooming-schedule.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-amber-700 hover:text-amber-900 transition-colors text-sm"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Blooming Schedule
                  </a>
                </li>
                <li>
                  <a
                    href="/downloads/monongahela-national-forest/motor-vehicle-map.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-amber-700 hover:text-amber-900 transition-colors text-sm"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Motor Vehicle Use Map
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Scope of Services */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-3xl mb-12">
            <span className="inline-block px-4 py-2 bg-green-600/10 text-green-700 text-sm font-semibold rounded-full mb-4">
              Statement of Work
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Scope of Services</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              BA Services provides full-service management, operations, and maintenance for campground and day-use recreation facilities within the Monongahela National Forest under a USDA Forest Service concession contract &mdash; delivering turnkey services that ensure safe, clean, and enjoyable recreational experiences while protecting federal lands.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {scopeOfWork.map((category) => (
              <div key={category.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{category.description}</p>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start text-sm text-gray-700">
                      <svg className="w-4 h-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-forest-DEFAULT">
        <div className="container-custom px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-6">
            Experience the Wild Heart of West Virginia
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            From Spruce Knob&apos;s summit to the depths of Seneca Rocks, the Monongahela National Forest offers 921,000 acres of Appalachian wilderness waiting to be explored.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {[
              { name: 'Big Bend', href: '/monongahela-national-forest/big-bend-campground' },
              { name: 'Seneca Shadows', href: '/monongahela-national-forest/seneca-shadows-campground' },
              { name: 'Spruce Knob Lake', href: '/monongahela-national-forest/spruce-knob-lake-campground' },
              { name: 'Stuart Rec Area', href: '/monongahela-national-forest/stuart-recreation-area' },
              { name: 'Jess Judy Group', href: '/monongahela-national-forest/jess-judy-group-campground' },
              { name: 'Gatewood Group', href: '/monongahela-national-forest/gatewood-group-campground' },
            ].map((cg) => (
              <a key={cg.name} href={cg.href} target="_blank" rel="noopener noreferrer" className="btn-primary bg-white text-forest-DEFAULT hover:bg-gray-100 text-sm">
                {cg.name}
              </a>
            ))}
            <Link href="/experiences" className="btn-primary bg-white/10 text-white hover:bg-white/20">
              View All Experiences
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
