import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { BuildingIcon } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Clear Creek Recreation Area | Bankhead National Forest | BA Services',
  description: 'Explore Clear Creek Recreation Area on Lewis Smith Lake in Bankhead National Forest. 102 campsites across 4 loops, swimming beach, boat ramps, hiking trails, and group camping.',
  alternates: { canonical: '/experiences/clear-creek-recreation-area' },
}

const campingLoops = [
  {
    name: 'Fox Loop',
    description: 'Scenic loop with electric and water hookups, paved parking spurs, and close access to the campground boat ramp.',
    image: '/images/clear-creek-camping.jpg',
  },
  {
    name: 'Hoot Owl Loop',
    description: 'Spacious sites with electric and water hookups, tent pads, picnic tables, and grills. Near the bicycle trail.',
    image: '/images/clear-creek-hoot-owl-loop.jpg',
  },
  {
    name: 'Fawn Loop',
    description: 'Family-friendly loop featuring both single and double sites. Convenient access to bathhouses with warm showers.',
    image: '/images/clear-creek-fawn-loop.jpg',
  },
  {
    name: 'Bear Loop',
    description: 'Quiet loop at the far end of the campground, ideal for those seeking a more secluded camping experience.',
    image: '/images/clear-creek-overview.jpg',
  },
]

const dayUseFeatures = [
  { name: 'Swimming Beach', description: 'Designated swimming area with roped buoys. Swim at your own risk — no lifeguard on duty.', icon: '🏊' },
  { name: 'Double-Lane Boat Ramp', description: 'Launch your watercraft with ease on Lewis Smith Lake. Day-use and camper boat ramps available.', icon: '🚤' },
  { name: 'Group Shelters', description: 'Three reservable group shelters — Oak Leaf, Bay Leaf, and Elm Leaf — perfect for reunions and events.', icon: <BuildingIcon className="w-8 h-8" /> },
  { name: 'Picnic Area', description: 'Large picnic area with tables and grills in a shaded lakeside setting.', icon: '🧺' },
  { name: 'Playground', description: 'Children\'s playground, basketball and volleyball courts, and horseshoe pit for campers.', icon: '🎪' },
  { name: 'Bathhouses', description: 'Five bathhouses with warm showers and dressing rooms serve the camping and day-use areas.', icon: '🚿' },
]

const trails = [
  {
    name: 'Raven Interpretive Trail',
    distance: '2.5 miles',
    description: 'Wind through the forest on this interpretive trail that highlights the natural features and ecology of the Bankhead National Forest.',
  },
  {
    name: 'Paved Bicycle & Walking Trail',
    distance: '1.25 miles',
    description: 'A paved multi-use trail perfect for biking, walking, or jogging through the scenic campground area.',
  },
]

const nearbyAttractions = [
  { name: 'The Little Natural Bridge', description: 'A unique geological formation within the Bankhead National Forest.' },
  { name: 'Pine Torch Church', description: 'A historic 19th-century church nestled in the forest.' },
  { name: 'Houston Civil War Jail', description: 'A preserved Civil War-era jail with historical significance.' },
  { name: 'Sipsey Wilderness', description: 'The largest wilderness area east of the Mississippi — known as "The Land of a Thousand Waterfalls."' },
]

const rules = [
  'Quiet hours are 10pm to 7am. Children under 17 must be on campsite by 10pm.',
  'All tires must be parked on asphalt surfaces — not gravel or grass. Parking on vacant campsites is prohibited.',
  'No alcoholic beverages allowed.',
  'All pets must be on a leash at all times. Pets are prohibited on the beach and in the swimming area.',
  'Fires belong in grills only. Ashes must be wet down before disposal. Never put ashes on the ground.',
  'Swimming only in designated areas within roped buoys. No lifeguard on duty.',
  'Single campsites: 6 people, 2 vehicles. Double sites: 12 people, 4 vehicles.',
  'Check-out time is 12:00 PM. Check-in time is 2:00 PM.',
  'Campsites must be occupied the first night and cannot be left unattended for over 24 hours.',
  'Motorized vehicles must be street-legal and operated by a licensed driver.',
  'Golden Age and Golden Access Passports honored for camping fees. Holder must be present.',
]

export default function ClearCreekPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/clear-creek-overview.jpg"
            alt="Clear Creek Recreation Area on Lewis Smith Lake"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 container-custom px-6 pb-16">
          <span className="inline-block px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full mb-4">
            Bankhead National Forest
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
            Clear Creek Recreation Area
          </h1>
          <div className="flex items-center text-white/80 mb-6">
            <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Lewis Smith Lake, Winston County, Alabama
          </div>
          <a
            href="https://www.recreation.gov/camping/campgrounds/231990"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-forest-DEFAULT text-white font-semibold rounded-lg hover:bg-forest-dark transition-colors"
          >
            Book on Recreation.gov
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-forest-DEFAULT py-8">
        <div className="container-custom px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { value: '102', label: 'Campsites' },
              { value: '4', label: 'Camping Loops' },
              { value: '5', label: 'Bathhouses' },
              { value: '2', label: 'Trails' },
              { value: '131 acres', label: 'Lewis Smith Lake' },
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Clear Creek</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  The Clear Creek Recreation Area has become one of Alabama&apos;s most popular recreation areas and has many repeat visitors. As the Bankhead National Forest&apos;s largest recreation area, Clear Creek is located on the shore of Lewis Smith Lake and offers facilities for individual and group camping, picnicking, swimming, boat launching, hiking, and biking.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Four camping loops contain 102 campsites, including single and double units, with electrical and water hookups. Five bathhouses with warm showers serve the camping areas. A boat ramp and children&apos;s playground are provided for campers. In addition, there are group camps with two units that can each accommodate 25 persons.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The day-use area contains a swimming beach, bathroom facilities with dressing rooms and warm showers, three group shelters, a large picnic area, and a double-lane boat ramp. ADA accessible sites are available throughout.
                </p>
              </div>

              {/* Natural Features */}
              <div className="mt-10 bg-green-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Natural Features</h3>
                <p className="text-gray-600 leading-relaxed">
                  The Bankhead National Forest is located in northwestern Alabama, and its prominent feature is the Sipsey Wilderness — known as &ldquo;The Land of a Thousand Waterfalls.&rdquo; It&apos;s an area of abundant streams, old-growth forests, limestone bluffs, and lush canyons. Lewis Smith Lake boasts more than 500 miles of shoreline marked by high rock bluffs. The water is clear and deep and provides excellent fishing for Kentucky Spotted Bass and Hybrid Striped Bass.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Site Amenities</h3>
                <ul className="space-y-3">
                  {['Electricity Hookup', 'Water Hookup', 'Sewer Hookup', 'Paved Parking Spurs', 'Picnic Tables', 'Grills & Fire Rings', 'Tent Pads', 'Lantern Poles', 'ADA Accessible Sites'].map((amenity) => (
                    <li key={amenity} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-forest-DEFAULT rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Ready to Visit?</h3>
                <p className="text-white/80 mb-6">
                  Reserve your campsite at Clear Creek Recreation Area through Recreation.gov.
                </p>
                <a
                  href="https://www.recreation.gov/camping/campgrounds/231990"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-4 bg-white text-forest-DEFAULT font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Check Availability
                </a>
                <div className="mt-4 text-center text-white/70 text-sm">
                  Bankhead Ranger District: (205) 489-5111
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Camping Loops */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Camping Loops</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">102 campsites across four loops, featuring single and double units with electric and water hookups.</p>
          <div className="grid md:grid-cols-2 gap-8">
            {campingLoops.map((loop) => (
              <div key={loop.name} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-56">
                  <Image src={loop.image} alt={loop.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{loop.name}</h3>
                  <p className="text-gray-600">{loop.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Group Camping */}
      <section className="py-16">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image src="/images/clear-creek-group-camping.jpg" alt="Group camping at Clear Creek" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Group Camping</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Clear Creek offers two group camping units, each capable of accommodating up to 25 persons. These are ideal for family reunions, scout troops, church groups, and other organizations looking for a shared outdoor experience.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Group sites include tent-only, non-electric accommodations in a more natural setting, perfect for those who want a traditional camping experience with their group.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Day-Use Area */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Day-Use Area</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">Full-day access to the swimming beach, boat ramps, shelters, and picnic areas on Lewis Smith Lake.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dayUseFeatures.map((feature) => (
              <div key={feature.name} className="bg-white rounded-2xl p-6 shadow-sm">
                <span className="text-3xl mb-3 block">{feature.icon}</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.name}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Camp Areas */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Special Camp Areas</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">Clear Creek offers unique camping experiences beyond the standard loops.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-56">
                <Image src="/images/clear-creek-bent-twig.jpg" alt="Bent Twig Camp at Clear Creek" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Bent Twig Camp</h3>
                <p className="text-gray-600 text-sm">A secluded group camping area nestled among the trees, perfect for scout troops and organized groups seeking a more primitive camping experience in the Bankhead National Forest.</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-56">
                <Image src="/images/clear-creek-acorn-camp.jpg" alt="Acorn Camp at Clear Creek" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Acorn Camp</h3>
                <p className="text-gray-600 text-sm">Another group camping option at Clear Creek, Acorn Camp provides a rustic, wooded setting with fire rings and picnic facilities for organized groups and family reunions.</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-56">
                <Image src="/images/clear-creek-fox-loop.jpg" alt="Fox Loop entrance at Clear Creek" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Fox Loop Entrance</h3>
                <p className="text-gray-600 text-sm">The gateway to one of Clear Creek&apos;s most popular camping loops, Fox Loop features electric and water hookups with close access to the campground boat ramp on Lewis Smith Lake.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources & Downloads */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Resources &amp; Downloads</h2>
          <p className="text-gray-600 mb-8">Download maps and guides for your visit to Bankhead National Forest.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Clear Creek Map', file: '/downloads/bankhead-national-forest/clear-creek-map.pdf' },
              { name: 'Corinth Map', file: '/downloads/bankhead-national-forest/corinth-map.pdf' },
              { name: 'Birding Guide', file: '/downloads/bankhead-national-forest/birding-guide.pdf' },
              { name: 'Sipsey Wilderness Map', file: '/downloads/bankhead-national-forest/sipsey-wilderness-map.pdf' },
              { name: 'Sipsey Canoe Map', file: '/downloads/bankhead-national-forest/sipsey-canoe-map.pdf' },
              { name: 'Quail Habitat Guide', file: '/downloads/bankhead-national-forest/quail-habitat.pdf' },
              { name: 'Forest Visitor Rules', file: '/downloads/bankhead-national-forest/forest-visitor-rules.pdf' },
            ].map((doc) => (
              <a
                key={doc.name}
                href={doc.file}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
              >
                <svg className="w-8 h-8 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z"/>
                </svg>
                <span className="text-sm font-medium text-gray-900">{doc.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Photo Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { src: '/images/clear-creek-overview.jpg', alt: 'Clear Creek Recreation Area overview' },
              { src: '/images/clear-creek-swimming.jpg', alt: 'Swimming beach on Lewis Smith Lake' },
              { src: '/images/clear-creek-boat-ramp.jpg', alt: 'Boat ramp on Lewis Smith Lake' },
              { src: '/images/clear-creek-shelter.jpg', alt: 'Group shelter at Clear Creek' },
              { src: '/images/clear-creek-camping.jpg', alt: 'Campsite at Clear Creek' },
              { src: '/images/clear-creek-hoot-owl-loop.jpg', alt: 'Hoot Owl camping loop' },
              { src: '/images/clear-creek-fawn-loop.jpg', alt: 'Fawn camping loop' },
              { src: '/images/clear-creek-group-camping.jpg', alt: 'Group camping area' },
              { src: '/images/clear-creek-bent-twig.jpg', alt: 'Bent Twig Camp' },
              { src: '/images/clear-creek-acorn-camp.jpg', alt: 'Acorn Camp' },
              { src: '/images/clear-creek-fox-loop.jpg', alt: 'Fox Loop' },
              { src: '/images/clear-creek-fox-entrance.jpg', alt: 'Fox Loop entrance' },
            ].map((photo, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trails */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Trails</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {trails.map((trail) => (
              <div key={trail.name} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{trail.name}</h3>
                    <span className="text-green-700 font-semibold text-sm">{trail.distance}</span>
                  </div>
                </div>
                <p className="text-gray-600">{trail.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
              <Image src="/images/bankhead-bicycle-trail.jpg" alt="Paved bicycle trail at Clear Creek" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="px-4 py-2 bg-white/90 text-gray-900 font-semibold rounded-full text-sm">
                  1.25-mile Paved Bicycle & Walking Trail
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Attractions */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Nearby Attractions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nearbyAttractions.map((attraction) => (
              <div key={attraction.name} className="border border-gray-200 rounded-2xl p-6 hover:border-green-300 transition-colors">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{attraction.name}</h3>
                <p className="text-gray-600 text-sm">{attraction.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="py-16 bg-amber-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Campground Rules</h2>
          <p className="text-gray-600 mb-8">Please review and follow these rules during your stay at Clear Creek Recreation Area.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {rules.map((rule, index) => (
              <div key={index} className="flex gap-3 bg-white rounded-xl p-4">
                <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-700 text-xs font-bold">{index + 1}</span>
                </div>
                <p className="text-gray-700 text-sm">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Day Use Pass */}
      <section className="py-16">
        <div className="container-custom px-6">
          <div className="bg-green-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Seasonal Day Use Pass</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              A Seasonal Day Use Pass is available for Clear Creek and Corinth Recreation Areas. The pass is valid from the date of purchase through December 31st of the year purchased and covers one vehicle with up to 5 people.
            </p>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Valid for day-use activities only at Clear Creek &amp; Corinth
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Non-transferable — valid only for the vehicle it was purchased for
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Windshield sticker must be displayed to be valid
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-forest-DEFAULT">
        <div className="container-custom px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-6">
            Plan Your Visit to Clear Creek
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Reserve your campsite and experience the beauty of Lewis Smith Lake in Bankhead National Forest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.recreation.gov/camping/campgrounds/231990"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-white text-forest-DEFAULT hover:bg-gray-100"
            >
              Reserve on Recreation.gov
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
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
