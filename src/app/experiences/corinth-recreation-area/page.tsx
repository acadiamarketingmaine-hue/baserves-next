import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Corinth Recreation Area | Bankhead National Forest | BA Services',
  description: 'Discover Corinth Recreation Area on Lewis Smith Lake in Bankhead National Forest. 52 full-hookup campsites, 10 tent sites, swimming beach, pavilion, and Bobwhite Trail.',
  alternates: { canonical: '/experiences/corinth-recreation-area' },
}

const campingLoops = [
  {
    name: 'Yellow Hammer Loop',
    description: 'Spacious full-hookup sites (electric, water, and sewer) with paved parking spurs, picnic tables, grills, and tent pads. Bathhouses with warm showers nearby.',
    image: '/images/corinth-camping-loop.jpg',
  },
  {
    name: 'Firefly Loop',
    description: 'Full-hookup camping loop accommodating RVs of any size. Sites feature paved spurs, fire rings, lantern poles, and easy access to the lake.',
    image: '/images/corinth-firefly-loop.jpg',
  },
]

const dayUseFeatures = [
  { name: 'Swimming Beach', description: 'Designated swimming area with dressing rooms and warm showers. Swim at your own risk — no lifeguard on duty.', icon: '🏊' },
  { name: 'Double-Lane Boat Ramp', description: 'Launch watercraft on Lewis Smith Lake. Excellent fishing for Kentucky Spotted Bass and Hybrid Striped Bass.', icon: '🚤' },
  { name: 'Group Pavilion', description: 'Reservable 100-person pavilion perfect for reunions, weddings, and group events. Reserve through Recreation.gov.', icon: '🏛️' },
  { name: 'Picnic Sites', description: '29 first-come, first-served picnic sites in a shaded lakeside setting.', icon: '🧺' },
  { name: 'Bobwhite Trail', description: '1.3-mile hiking trail through the forest. Interpretive programs hosted during the summer.', icon: '🥾' },
  { name: 'Bathhouses', description: 'Four bathhouses with warm showers serve the camping areas. Day-use visitors have access to dressing rooms.', icon: '🚿' },
]

const rules = [
  'This is a National Forest. All vehicles must be parked on asphalt or gravel surfaces. Save the grass for others.',
  'No alcoholic beverages allowed.',
  'Please drive slowly — children at play.',
  'All pets must be on a leash at all times. Pets are prohibited on the beach and in the swimming area.',
  'Fires belong in grills only. Never put ashes or charcoal on the ground.',
  'Swimming only in designated areas within roped buoys. No lifeguard on duty.',
  'Campsites are for 6 people and 2 vehicles. Additional people require a second campsite.',
  'Check-out time is 12:00 PM.',
  'Bike riding around bath houses or after dark is prohibited.',
  'Motorized vehicles must be street-legal and operated by a licensed driver.',
  'Golden Age and Golden Access Passports honored for camping fees. Holder must be present.',
]

const otherRecreation = [
  'Brushy Lake Recreation Area',
  'Houston Recreation Area',
  'Clear Creek Recreation Area',
  'Natural Bridge Day Use Area',
  'Owl Creek Horse Camp & Trail System',
  'Sipsey Wilderness',
  'Hurricane Creek Shooting Range',
  'Flint-Creek Multi-Use Trail',
]

export default function CorinthPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/corinth-boat-ramp.jpg"
            alt="Corinth Recreation Area on Lewis Smith Lake"
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
            Corinth Recreation Area
          </h1>
          <div className="flex items-center text-white/80 mb-6">
            <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Lewis Smith Lake, Winston County, Alabama
          </div>
          <p className="text-xl text-white/80 max-w-2xl mb-6">
            A modern, state-of-the-art campground on the shores of Lewis Smith Lake with full-hookup sites, a swimming beach, and the scenic Bobwhite Trail.
          </p>
          <a
            href="https://www.recreation.gov/camping/campgrounds/232423"
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
              { value: '52', label: 'Full-Hookup Sites' },
              { value: '10', label: 'Tent Sites' },
              { value: '100', label: 'Person Pavilion' },
              { value: '1.3 mi', label: 'Bobwhite Trail' },
              { value: '4', label: 'Bathhouses' },
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Corinth</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  The Corinth Recreation Area is a modern, state-of-the-art campground located on the shores of Lewis Smith Lake. It offers facilities for individual and group camping, picnicking, swimming, and boat launching.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Two camping loops contain 52 campsites with electrical, water, and sewer hookups. Four bathhouses with warm showers serve the camping areas. A boat ramp is provided for campers. In addition, 10 tent campsites are available for those seeking a more traditional camping experience.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The day-use area features dressing rooms and warm showers, 29 picnic sites, a reservable 100-person pavilion, a swimming beach, and a double-lane boat ramp. ADA accessible sites are available. Hikers can access the 1.3-mile Bobwhite Trail, and interpretive programs are hosted during the summer months.
                </p>
              </div>

              <div className="mt-10 bg-green-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Directions</h3>
                <p className="text-gray-600 leading-relaxed">
                  From Double Springs, travel 8 miles east on Hwy 278; turn right at the Corinth Recreation Area sign on County Road 57.
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  Corinth Recreation Area, 2540 County Road 57, Double Springs, AL 35553 &bull; (205) 489-3165
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Full Hookup Amenities</h3>
                <ul className="space-y-3">
                  {['Electricity Hookup', 'Water Hookup', 'Sewer Hookup', 'Full Hookups', 'Paved Parking Spurs', 'Picnic Tables', 'BBQ Grills', 'Fire Pits', 'Tent Pads', 'Lantern Poles', 'ADA Accessible'].map((amenity) => (
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
                <p className="text-white/80 mb-4">
                  Camping is first come, first serve — no reservations required. The pavilion can be reserved through Recreation.gov.
                </p>
                <a
                  href="https://www.recreation.gov/camping/campgrounds/232423"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-4 bg-white text-forest-DEFAULT font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  View on Recreation.gov
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
          <p className="text-gray-600 mb-8 max-w-2xl">52 full-hookup campsites across two loops, plus 10 tent-only sites. Sites can accommodate RVs of any size.</p>
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
          <div className="mt-8 bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Tent Camping</h3>
            <p className="text-gray-600">
              10 dedicated tent campsites are available for those who prefer a more traditional camping experience. These sites offer a quieter, more natural setting while still providing access to all of the campground&apos;s facilities.
            </p>
          </div>
        </div>
      </section>

      {/* Day-Use Area */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Day-Use Area & Activities</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">Swimming, boating, picnicking, and hiking — all on the shores of Lewis Smith Lake.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dayUseFeatures.map((feature) => (
              <div key={feature.name} className="bg-gray-50 rounded-2xl p-6">
                <span className="text-3xl mb-3 block">{feature.icon}</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.name}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Photo Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { src: '/images/corinth-campground.jpg', alt: 'Corinth Recreation Area' },
              { src: '/images/corinth-swimming.jpg', alt: 'Swimming beach at Corinth' },
              { src: '/images/corinth-boat-ramp.jpg', alt: 'Boat ramp on Lewis Smith Lake' },
              { src: '/images/corinth-pavilion.jpg', alt: 'Group pavilion' },
              { src: '/images/corinth-camping-loop.jpg', alt: 'Camping loop at Corinth' },
              { src: '/images/corinth-firefly-loop.jpg', alt: 'Firefly Loop campsite' },
            ].map((photo, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Attractions / Other Recreation */}
      <section className="py-16">
        <div className="container-custom px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Nearby Attractions</h2>
              <div className="space-y-4">
                {[
                  { name: 'The Little Natural Bridge', desc: 'A unique geological formation within the Bankhead.' },
                  { name: 'Pine Torch Church', desc: 'A historic 19th-century church nestled in the forest.' },
                  { name: 'Houston Civil War Jail', desc: 'A preserved Civil War-era jail with historical significance.' },
                ].map((item) => (
                  <div key={item.name} className="border border-gray-200 rounded-xl p-4">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">More in Bankhead National Forest</h2>
              <ul className="space-y-3">
                {otherRecreation.map((item) => (
                  <li key={item} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="py-16 bg-amber-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Campground Rules</h2>
          <p className="text-gray-600 mb-8">Please review and follow these rules during your stay at Corinth Recreation Area.</p>
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

      {/* Resources & Downloads */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Resources &amp; Downloads</h2>
          <p className="text-gray-600 mb-8">Download maps and guides for your visit to the Bankhead National Forest.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Corinth Map', file: '/downloads/bankhead-national-forest/corinth-map.pdf' },
              { name: 'Clear Creek Map', file: '/downloads/bankhead-national-forest/clear-creek-map.pdf' },
              { name: 'Birding Guide', file: '/downloads/bankhead-national-forest/birding-guide.pdf' },
              { name: 'Sipsey Wilderness Map', file: '/downloads/bankhead-national-forest/sipsey-wilderness-map.pdf' },
              { name: 'Sipsey Canoe Map', file: '/downloads/bankhead-national-forest/sipsey-canoe-map.pdf' },
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

      {/* CTA */}
      <section className="py-20 bg-forest-DEFAULT">
        <div className="container-custom px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-6">
            Plan Your Visit to Corinth
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Experience the beauty of Lewis Smith Lake at this modern campground in the Bankhead National Forest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.recreation.gov/camping/campgrounds/232423"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-white text-forest-DEFAULT hover:bg-gray-100"
            >
              View on Recreation.gov
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <Link href="/experiences/clear-creek-recreation-area" className="btn-primary bg-white/10 text-white hover:bg-white/20">
              See Clear Creek Nearby
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
