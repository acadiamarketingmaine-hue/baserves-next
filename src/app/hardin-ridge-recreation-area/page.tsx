import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Hardin Ridge Recreation Area | Hoosier National Forest | BA Serves',
  description: 'Explore Hardin Ridge Recreation Area on Monroe Lake in Indiana. 203 campsites across 6 loops, 2 rental cabins, swimming beach, 3-lane boat ramp, and the Ted T. Turtle Trail in the Hoosier National Forest.',
  alternates: { canonical: '/hardin-ridge-recreation-area' },
}

const campgroundLoops = [
  {
    name: 'Loop 1 &ndash; Lakeside',
    description: 'The closest loop to the shoreline, featuring standard sites with electric hookups and easy access to the boat ramp and beach. Popular with anglers and water enthusiasts.',
  },
  {
    name: 'Loop 2 &ndash; Ridgetop',
    description: 'Elevated sites along the ridge offering partial views of Monroe Lake through the forest canopy. Electric hookups and shaded sites make this a favorite for summer camping.',
  },
  {
    name: 'Loop 3 &ndash; Forest',
    description: 'Tucked deeper into the Hoosier National Forest, this loop offers a more secluded camping experience. Well-spaced sites with electric hookups beneath mature hardwoods.',
  },
  {
    name: 'Loop 4 &ndash; Hillside',
    description: 'Terraced sites on the hillside with a mix of shade and sun. Close to the bathhouse facilities and ideal for families with children.',
  },
  {
    name: 'Loop 5 &ndash; Meadow',
    description: 'Open and airy sites at the edge of a meadow clearing, popular with larger RVs and trailers. Electric hookups and level pads throughout.',
  },
  {
    name: 'Walk-In Tent Loop',
    description: '36 walk-in tent-only sites offering the most primitive and secluded camping experience at Hardin Ridge. A short walk from the parking area into the forest canopy.',
  },
]

const fishSpecies = ['Largemouth Bass', 'Smallmouth Bass', 'Bluegill', 'Channel Catfish', 'Crappie', 'Walleye']

const downloads = [
  { name: 'Hardin Ridge Map', href: '/downloads/hoosier-national-forest/maps/hardin-ridge-map.pdf' },
  { name: 'Recreation Areas Map', href: '/downloads/hoosier-national-forest/maps/recreation-areas.pdf' },
  { name: 'Trail Systems Map', href: '/downloads/hoosier-national-forest/maps/trail-systems.pdf' },
  { name: 'Rules & Regulations', href: '/downloads/hoosier-national-forest/rules-and-regulations.pdf' },
  { name: 'Forest Facts', href: '/downloads/hoosier-national-forest/general-info/forest-facts.pdf' },
  { name: 'FAQ', href: '/downloads/hoosier-national-forest/general-info/faq.pdf' },
]

export default function HardinRidgePage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/DSC_0103-2048x1365.jpg"
            alt="Hardin Ridge Recreation Area on Monroe Lake"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 container-custom px-6 pb-16">
          <span className="inline-block px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full mb-4">
            Hoosier National Forest
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
            Hardin Ridge Recreation Area
          </h1>
          <div className="flex items-center text-white/80 mb-6">
            <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Monroe Lake, Indiana
          </div>
          <a
            href="https://escape.baserves.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-forest-DEFAULT text-white font-semibold rounded-lg hover:bg-forest-dark transition-colors"
          >
            Book Your Stay
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
              { value: '203', label: 'Sites' },
              { value: '10,750', label: 'Acres Lake' },
              { value: '2', label: 'Cabins' },
              { value: '6', label: 'Loops' },
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Hardin Ridge</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Hardin Ridge Recreation Area sits on the wooded shores of Monroe Lake &mdash; Indiana&apos;s largest body of water at 10,750 acres. Located within the Hoosier National Forest in Monroe County, this premier campground offers 203 campsites across six loops, two rental cabins, a swimming beach, a three-lane boat ramp, and miles of trails through rolling hardwood forest.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Monroe Lake is a haven for fishing, boating, and water sports. The lake supports healthy populations of largemouth and smallmouth bass, bluegill, channel catfish, crappie, and walleye. The three-lane boat ramp with courtesy dock makes launching easy, whether you&apos;re heading out for a day of fishing or a leisurely cruise across the lake.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  From the 300-foot swimming beach to the scenic overlook of Monroe Lake and the Ted T. Turtle interpretive nature trail, Hardin Ridge provides a well-rounded outdoor experience for families, anglers, hikers, and anyone seeking a retreat into southern Indiana&apos;s beautiful landscape.
                </p>
              </div>

              {/* Fishing callout */}
              <div className="mt-10 bg-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Fishing on Monroe Lake</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  As Indiana&apos;s largest lake, Monroe Lake offers some of the best freshwater fishing in the state. The 10,750-acre reservoir is known for its diverse fish populations and year-round angling opportunities. Whether you prefer casting from shore, trolling from a boat, or fly fishing in the quiet coves, Monroe Lake has something for every angler.
                </p>
                <div className="flex flex-wrap gap-3">
                  {fishSpecies.map((fish) => (
                    <span key={fish} className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium text-blue-800">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {fish}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
                <ul className="space-y-3">
                  {[
                    '203 Campsites (6 Loops)',
                    '167 Standard Sites',
                    '36 Walk-In Tent Sites',
                    '2 Rental Cabins',
                    '3-Lane Boat Ramp',
                    'Courtesy Dock',
                    '300-ft Swimming Beach',
                    'Bathhouse with Showers',
                    'Ted T. Turtle Trail (1.2 mi)',
                    'Monroe Lake Overlook',
                    'Group Shelter',
                    'ADA Accessible Facilities',
                  ].map((item) => (
                    <li key={item} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-forest-DEFAULT rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Ready to Visit?</h3>
                <p className="text-white/80 mb-6">
                  Reserve your campsite or cabin at Hardin Ridge Recreation Area on the shores of Indiana&apos;s largest lake.
                </p>
                <a
                  href="https://escape.baserves.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-4 bg-white text-forest-DEFAULT font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Book Your Stay
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campground Loops */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Campground Loops</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">203 campsites across six distinct loops, including 167 standard sites with electric hookups and 36 walk-in tent-only sites for a more primitive experience.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campgroundLoops.map((loop) => (
              <div key={loop.name} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-3" dangerouslySetInnerHTML={{ __html: loop.name }} />
                <p className="text-gray-600 text-sm leading-relaxed">{loop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cabins */}
      <section className="py-16">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Rental Cabins</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Two rental cabins at Hardin Ridge offer a comfortable alternative to tent or RV camping. Set among the hardwoods of the Hoosier National Forest, these cabins provide a cozy base for exploring Monroe Lake and the surrounding trails.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                The cabins are ideal for families or couples who want the outdoor experience with a few more comforts. With the campground&apos;s facilities, swimming beach, and boat ramp just steps away, the cabins give you the best of both worlds &mdash; a roof over your head and the forest at your doorstep.
              </p>
              <ul className="space-y-3">
                {[
                  'Comfortable lodging within the campground',
                  'Easy access to beach, boat ramp, and trails',
                  'Surrounded by mature hardwood forest',
                  'Great for families and couples',
                  'Close to Monroe Lake shoreline',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://escape.baserves.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-forest-DEFAULT text-white font-semibold rounded-lg hover:bg-forest-dark transition-colors"
              >
                Reserve a Cabin
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image src="/images/DSC_0001-2048x1365.jpg" alt="Rental cabin at Hardin Ridge Recreation Area" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Beach & Boat Ramp */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image src="/images/DSC_0110-2048x1365.jpg" alt="Swimming beach and boat ramp at Hardin Ridge" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Beach &amp; Boat Ramp</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The 300-foot swimming beach at Hardin Ridge is one of the most popular features of the recreation area. The sandy shoreline extends into the clear waters of Monroe Lake, providing a safe and inviting place for families to swim, wade, and play. A bathhouse with showers and changing facilities is located adjacent to the beach.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                For boaters, a modern three-lane boat ramp with a courtesy dock offers efficient launching and retrieval. Whether you&apos;re trailering a fishing boat, launching a pontoon for a family cruise, or dropping in a kayak, the ramp accommodates watercraft of all sizes for exploring Indiana&apos;s largest lake.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '300 ft', label: 'Beach' },
                  { value: '3', label: 'Boat Lanes' },
                  { value: '10,750', label: 'Acres of Lake' },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-xl p-4 text-center">
                    <div className="text-xl font-bold text-forest-DEFAULT">{item.value}</div>
                    <div className="text-gray-500 text-xs mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ted T. Turtle Trail */}
      <section className="py-16">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Ted T. Turtle Trail</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The Ted T. Turtle Trail is a 1.2-mile interpretive nature trail that winds through the hardwood forest surrounding Hardin Ridge. Named for the eastern box turtles commonly spotted along its path, the trail features educational markers that highlight the flora, fauna, and ecology of the Hoosier National Forest.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                The easy-to-moderate trail is perfect for families with children, nature enthusiasts, and anyone looking for a short, rewarding hike. Along the way, you&apos;ll learn about native tree species, forest wildlife, and the geological history of the region. The trail starts near the campground entrance and can be completed in about 30 to 45 minutes.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-green-50 rounded-xl px-4 py-3">
                  <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <div>
                    <div className="text-green-900 font-bold">1.2 Miles</div>
                    <div className="text-green-700 text-xs">Interpretive Trail</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-4 py-3">
                  <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="text-blue-900 font-bold">30 &ndash; 45 min</div>
                    <div className="text-blue-700 text-xs">Easy to Moderate</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 rounded-xl px-4 py-3">
                  <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <div>
                    <div className="text-amber-900 font-bold">Educational</div>
                    <div className="text-amber-700 text-xs">Interpretive Markers</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden bg-green-100">
              <Image src="/images/DSC_0001-2048x1365.jpg" alt="Ted T. Turtle interpretive nature trail at Hardin Ridge" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Lake Monroe Overlook Callout */}
      <section className="py-16 bg-gradient-to-br from-forest-DEFAULT to-forest-dark">
        <div className="container-custom px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-6">
              Lake Monroe Overlook
            </h2>
            <p className="text-xl text-white/80 leading-relaxed mb-4">
              Don&apos;t miss the scenic overlook at Hardin Ridge, offering panoramic views of Monroe Lake and the surrounding forested hills. This elevated vantage point is one of the best places in southern Indiana to take in the vast expanse of the state&apos;s largest lake.
            </p>
            <p className="text-white/70 leading-relaxed">
              The overlook is particularly stunning during autumn, when the surrounding hardwood forest transforms into a tapestry of red, orange, and gold. It&apos;s a short walk from the campground and well worth the visit at any time of day &mdash; especially at sunrise and sunset.
            </p>
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Maps &amp; Resources</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">Download maps and helpful information for planning your visit to Hardin Ridge and the Hoosier National Forest.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {downloads.map((doc) => (
              <a
                key={doc.name}
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 hover:bg-green-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-200 transition-colors">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-gray-900 font-medium text-sm group-hover:text-green-800 transition-colors">{doc.name}</span>
                  <span className="block text-gray-400 text-xs">PDF</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-forest-DEFAULT">
        <div className="container-custom px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-6">
            Experience Indiana&apos;s Largest Lake
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            With 203 campsites, two cozy cabins, and 10,750 acres of Monroe Lake at your doorstep, Hardin Ridge Recreation Area is southern Indiana&apos;s premier outdoor destination. Reserve your spot today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://escape.baserves.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-white text-forest-DEFAULT hover:bg-gray-100"
            >
              Book Your Stay
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
