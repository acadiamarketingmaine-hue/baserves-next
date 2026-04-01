import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Bankhead National Forest | Alabama | BA Services',
  description: 'Explore Bankhead National Forest — "The Land of a Thousand Waterfalls." 180,000+ acres featuring the Sipsey Wilderness, 84 breeding bird species, campgrounds, and the Hurricane Creek Shooting Range.',
  alternates: { canonical: '/bankhead-national-forest' },
}

const birdingTrailSites = [
  {
    name: 'Walston Ridge',
    description: 'Ridgetop habitat offering excellent views and opportunities to spot raptors, warblers, and vireos during migration and breeding season.',
  },
  {
    name: 'Brushy Lake',
    description: 'Lakeside habitat attracting waterfowl, herons, and songbirds. A quiet spot for observing diverse species in a wetland setting.',
  },
  {
    name: 'Northwest Road',
    description: 'A forested corridor supporting a variety of woodland species including woodpeckers, thrushes, and the Cerulean Warbler.',
  },
  {
    name: 'Sipsey Wilderness',
    description: 'Deep canyon habitat with old-growth forests. A stronghold for the Cerulean Warbler and other neotropical migrants.',
  },
]

const campgrounds = [
  {
    name: 'Clear Creek Recreation Area',
    sites: '102 sites',
    description: 'Located on the shore of Lewis Smith Lake, Clear Creek is the Bankhead&apos;s largest recreation area. Features four camping loops with electric and water hookups, swimming beach, boat ramps, hiking trails, and group camping.',
    image: '/images/clear-creek-bent-twig.jpg',
    link: '/experiences/clear-creek-recreation-area',
  },
  {
    name: 'Corinth Recreation Area',
    sites: '52 sites',
    description: 'A quieter campground offering full-hookup sites (water, electric, and sewer) in a peaceful wooded setting. Ideal for RV campers seeking a more relaxed atmosphere with modern amenities.',
    image: '/images/clear-creek-acorn-camp.jpg',
    link: '/experiences/corinth-recreation-area',
  },
]

const recreationAreas = [
  { name: 'Brushy Lake Recreation Area', description: 'Day-use area with fishing, picnicking, and nature trails around a scenic lake.' },
  { name: 'Houston Recreation Area', description: 'Historic site with picnic facilities, trails, and access to nearby natural attractions.' },
  { name: 'Natural Bridge Day Use Area', description: 'A unique geological formation — a natural sandstone bridge spanning 148 feet with a 60-foot clearance.' },
  { name: 'Owl Creek Horse Camp', description: 'Equestrian camping facility with horse stalls, water, and direct trail access.' },
  { name: 'Flint-Creek Multi-Use Trail', description: 'A multi-use trail system open to hiking, mountain biking, and horseback riding.' },
]

const downloads = [
  { name: 'Birding Guide', description: 'Complete guide to birding in the Bankhead, including trail descriptions and species lists.', file: '/downloads/bankhead-national-forest/birding-guide.pdf', color: 'blue' },
  { name: 'Quail Habitat Guide', description: 'Information on Black Pond and Inmanfield Quail Emphasis Areas and conservation efforts.', file: '/downloads/bankhead-national-forest/quail-habitat.pdf', color: 'green' },
  { name: 'Sipsey Canoe Map', description: 'Paddling map for the Sipsey Fork Wild and Scenic River corridor.', file: '/downloads/bankhead-national-forest/sipsey-canoe-map.pdf', color: 'blue' },
  { name: 'Sipsey Wilderness Map', description: 'Trail map for the Sipsey Wilderness, the largest eastern wilderness area.', file: '/downloads/bankhead-national-forest/sipsey-wilderness-map.pdf', color: 'green' },
  { name: 'Clear Creek Campground Map', description: 'Detailed map of Clear Creek Recreation Area camping loops and facilities.', file: '/downloads/bankhead-national-forest/clear-creek-map.pdf', color: 'amber' },
  { name: 'Corinth Campground Map', description: 'Map of Corinth Recreation Area campsites and amenities.', file: '/downloads/bankhead-national-forest/corinth-map.pdf', color: 'amber' },
  { name: 'Forest Visitor Rules', description: 'Rules, regulations, and guidelines for visiting the Bankhead National Forest.', file: '/downloads/bankhead-national-forest/forest-visitor-rules.pdf', color: 'red' },
]

export default function BankheadNationalForestPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/bankhead-forest.jpg"
            alt="Bankhead National Forest — The Land of a Thousand Waterfalls"
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
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-3">
            Bankhead National Forest
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light italic mb-4">
            The Land of a Thousand Waterfalls
          </p>
          <div className="flex items-center text-white/80 mb-6">
            <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Lawrence, Winston &amp; Franklin Counties, Alabama &mdash; Cumberland Plateau
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'Clear Creek Recreation Area', href: 'https://www.recreation.gov/camping/campgrounds/231990' },
              { name: 'Corinth Recreation Area', href: 'https://www.recreation.gov/camping/campgrounds/232423' },
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
              { value: '180,000+', label: 'Acres' },
              { value: '84', label: 'Bird Species' },
              { value: '2', label: 'Campgrounds' },
              { value: 'Sipsey', label: 'Wilderness' },
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Bankhead National Forest</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  The William B. Bankhead National Forest spans over 180,000 acres across the Cumberland Plateau region of North Alabama. Known as &ldquo;The Land of a Thousand Waterfalls,&rdquo; the forest features dramatic sandstone canyons, pristine streams, old-growth forests, limestone bluffs, and lush canyons that make it one of the most scenic natural areas in the southeastern United States.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  At its heart lies the Sipsey Wilderness &mdash; the largest wilderness area east of the Mississippi River. The Sipsey Fork, a designated Wild and Scenic River corridor, carves through deep sandstone canyons, creating a landscape of cascading waterfalls, rock shelters, and towering old-growth hardwoods. The forest&apos;s rich biodiversity has earned it designation as an Important Bird Area by the American Bird Conservancy.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Two premier campgrounds managed by BA Services &mdash; Clear Creek Recreation Area and Corinth Recreation Area &mdash; provide comfortable base camps for exploring the forest. Additional recreation areas, horse trails, a shooting range, and scenic drives offer something for every outdoor enthusiast.
                </p>
              </div>

              {/* Natural Features */}
              <div className="mt-10 bg-green-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Natural Features</h3>
                <p className="text-gray-600 leading-relaxed">
                  The Bankhead sits atop the Cumberland Plateau, where millions of years of erosion have carved deep sandstone canyons laced with waterfalls. Old-growth forests cling to canyon walls, while pristine streams flow through the valley floors. Lewis Smith Lake, with over 500 miles of shoreline marked by high rock bluffs, borders the southern edge of the forest. The combination of geology, hydrology, and ecology creates one of the richest natural landscapes in the Southeast.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Activities</h3>
                <ul className="space-y-3">
                  {[
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
                <h3 className="text-xl font-bold mb-4">Contact &amp; Info</h3>
                <p className="text-white/80 mb-2">Bankhead Ranger District</p>
                <p className="text-white/80 mb-1 text-sm">Highway 33, Double Springs, AL</p>
                <a href="tel:+12054895111" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (205) 489-5111
                </a>
                <div className="space-y-2">
                  <a href="https://www.recreation.gov/camping/campgrounds/231990" target="_blank" rel="noopener noreferrer" className="block w-full text-center py-3 bg-white text-forest-DEFAULT text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                    Clear Creek Recreation Area
                  </a>
                  <a href="https://www.recreation.gov/camping/campgrounds/232423" target="_blank" rel="noopener noreferrer" className="block w-full text-center py-3 bg-white text-forest-DEFAULT text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                    Corinth Recreation Area
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Birding */}
      <section className="py-16 bg-blue-50">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Birding in the Bankhead</h2>
                  <span className="text-blue-700 font-semibold text-sm">American Bird Conservancy &mdash; Important Bird Area</span>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                With 84 breeding bird species recorded during the breeding season, the Bankhead National Forest is a premier birding destination in the Southeast. The American Bird Conservancy has designated it as an Important Bird Area, recognizing its critical role in supporting neotropical migrants and resident species.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                The forest is a stronghold for the <strong className="text-gray-900">Cerulean Warbler</strong>, a species of conservation concern that nests in the old-growth canopy of the Sipsey Wilderness canyons. The deep, moist canyons and diverse forest structure provide ideal habitat for this declining species.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Four sites within the forest are part of the <strong className="text-gray-900">North Alabama Birding Trail</strong>, each offering distinct habitats and birding opportunities throughout the year.
              </p>
              <a
                href="/downloads/bankhead-national-forest/birding-guide.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Birding Guide (PDF)
              </a>
            </div>

            {/* Birding Trail Sites */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">North Alabama Birding Trail Sites</h3>
              <div className="space-y-4">
                {birdingTrailSites.map((site) => (
                  <div key={site.name} className="bg-white rounded-xl p-5 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                      {site.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{site.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sipsey Wilderness */}
      <section className="py-16">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/images/Bankhead-Waterfall.png"
                alt="Waterfall in the Sipsey Wilderness"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Sipsey Wilderness</h2>
              <p className="text-lg text-green-700 font-semibold mb-4">
                Largest Wilderness Area East of the Mississippi
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                The Sipsey Wilderness encompasses over 25,000 acres of rugged sandstone canyons, old-growth forests, and cascading waterfalls. Deep, narrow canyons shelter some of the last remaining old-growth hardwood forests in Alabama, with trees towering over 100 feet above the canyon floors.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                The Sipsey Fork &mdash; a designated <strong className="text-gray-900">Wild and Scenic River</strong> corridor &mdash; is the central artery of the wilderness. Its clear waters wind through dramatic sandstone gorges, past ancient rock shelters, and over countless waterfalls. The river corridor is popular for canoeing and kayaking, especially during spring flows.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Multiple trailheads provide access to a network of trails that explore the canyon bottoms, ridgetops, and creek crossings. Backpacking, day hiking, and fishing are all popular activities within the wilderness.
              </p>
              <div className="flex gap-3">
                <a
                  href="/downloads/bankhead-national-forest/sipsey-wilderness-map.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Wilderness Map
                </a>
                <a
                  href="/downloads/bankhead-national-forest/sipsey-canoe-map.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Canoe Map
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hurricane Creek Shooting Range */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Hurricane Creek Shooting Range</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The Hurricane Creek Shooting Range is a public, accessible facility within the Bankhead National Forest offering year-round target shooting in a safe, managed environment. Whether you&apos;re sighting in a rifle before hunting season or practicing with a handgun, the range provides a well-maintained venue for shooters of all experience levels.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 mb-1">Target Distances</h4>
                  <p className="text-gray-600 text-sm">25, 50, and 100 yard lanes</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 mb-1">Shooting Benches</h4>
                  <p className="text-gray-600 text-sm">8 covered benches available</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 mb-1">Admission</h4>
                  <p className="text-gray-600 text-sm">$3 per person</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 mb-1">Availability</h4>
                  <p className="text-gray-600 text-sm">Open year-round, ADA accessible</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm">
                Bring your own targets and ammunition. Paper targets only &mdash; no glass, electronics, or explosive targets. All shooters must follow posted range rules and safety guidelines.
              </p>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image
                src="/images/bankhead-bicycle-trail.jpg"
                alt="Bankhead National Forest recreation area"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quail Habitat */}
      <section className="py-16">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-2xl overflow-hidden order-2 lg:order-1">
              <Image
                src="/images/clear-creek-fox-loop.jpg"
                alt="Forest habitat in Bankhead National Forest"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Quail Habitat &amp; Conservation</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The Bankhead National Forest is home to two designated <strong className="text-gray-900">Quail Emphasis Areas</strong> &mdash; Black Pond and Inmanfield &mdash; where the U.S. Forest Service is actively managing habitat to support the Northern Bobwhite and other grassland-dependent wildlife.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                These areas focus on <strong className="text-gray-900">longleaf and shortleaf pine restoration</strong>, using prescribed fire and selective thinning to recreate the open, park-like forests that once covered much of the Southeast. The result is a mosaic of native grasses, wildflowers, and young pines that provides ideal nesting and foraging habitat for bobwhite quail.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                The conservation work here benefits not only quail but a wide range of species that depend on early successional and open-forest habitats, contributing to the overall biodiversity of the Bankhead.
              </p>
              <a
                href="/downloads/bankhead-national-forest/quail-habitat.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Quail Habitat Guide (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Campgrounds */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Campgrounds</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Two campgrounds managed by BA Services provide comfortable base camps for exploring the Bankhead National Forest.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {campgrounds.map((campground) => (
              <Link key={campground.name} href={campground.link} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                  <div className="relative h-56">
                    <Image
                      src={campground.image}
                      alt={campground.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 text-gray-900 font-semibold rounded-full text-sm">
                      {campground.sites}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                      {campground.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{campground.description}</p>
                    <span className="inline-flex items-center gap-1 mt-4 text-green-700 font-semibold text-sm">
                      Learn more
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Other Recreation Areas */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Other Recreation Areas</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recreationAreas.map((area) => (
                <div key={area.name} className="bg-white rounded-xl p-5 border border-gray-200 hover:border-green-300 transition-colors">
                  <h4 className="font-bold text-gray-900 mb-2">{area.name}</h4>
                  <p className="text-gray-600 text-sm">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources & Downloads */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Resources &amp; Downloads</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Download maps, guides, and resources to plan your visit to the Bankhead National Forest.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {downloads.map((item) => (
              <a
                key={item.name}
                href={item.file}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-50 rounded-xl p-5 hover:bg-green-50 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    item.color === 'blue' ? 'bg-blue-100' :
                    item.color === 'green' ? 'bg-green-100' :
                    item.color === 'amber' ? 'bg-amber-100' :
                    'bg-red-100'
                  }`}>
                    <svg className={`w-5 h-5 ${
                      item.color === 'blue' ? 'text-blue-700' :
                      item.color === 'green' ? 'text-green-700' :
                      item.color === 'amber' ? 'text-amber-700' :
                      'text-red-700'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 group-hover:text-green-700 transition-colors">{item.name}</h4>
                    <p className="text-gray-500 text-xs">{item.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Photo Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { src: '/images/bankhead-forest.jpg', alt: 'Bankhead National Forest landscape' },
              { src: '/images/Bankhead-Waterfall.png', alt: 'Waterfall in the Sipsey Wilderness' },
              { src: '/images/bankhead-bicycle-trail.jpg', alt: 'Trail in Bankhead National Forest' },
              { src: '/images/clear-creek-bent-twig.jpg', alt: 'Clear Creek Recreation Area' },
              { src: '/images/clear-creek-acorn-camp.jpg', alt: 'Camping at Clear Creek' },
              { src: '/images/clear-creek-fox-loop.jpg', alt: 'Fox Loop at Clear Creek' },
              { src: '/images/clear-creek-fox-entrance.jpg', alt: 'Clear Creek campground entrance' },
            ].map((photo, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-forest-DEFAULT">
        <div className="container-custom px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-6">
            Discover the Land of a Thousand Waterfalls
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            From the depths of the Sipsey Wilderness to the shores of Lewis Smith Lake, the Bankhead National Forest offers over 180,000 acres of Alabama&apos;s finest natural landscapes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.recreation.gov/camping/campgrounds/231990" target="_blank" rel="noopener noreferrer" className="btn-primary bg-white text-forest-DEFAULT hover:bg-gray-100">
              Clear Creek Recreation Area
            </a>
            <a href="https://www.recreation.gov/camping/campgrounds/232423" target="_blank" rel="noopener noreferrer" className="btn-primary bg-white text-forest-DEFAULT hover:bg-gray-100">
              Corinth Recreation Area
            </a>
            <Link href="/experiences" className="btn-primary bg-white/10 text-white hover:bg-white/20">
              View All Experiences
            </Link>
          </div>
          <div className="mt-6 text-white/60 text-sm">
            Bankhead Ranger District: (205) 489-5111 &mdash; Highway 33, Double Springs, AL
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
