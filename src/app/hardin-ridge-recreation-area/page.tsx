import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Hardin Ridge Recreation Area | Monroe County, Indiana | BA Serves',
  description: 'Explore Hardin Ridge Recreation Area on Monroe Lake in Hoosier National Forest. 200+ campsites, swimming beach, boat ramp, and 12+ miles of trails.',
  alternates: { canonical: '/hardin-ridge-recreation-area' },
}

const facilities = [
  {
    name: 'Campsites',
    description: '200+ campsites spread across multiple loops, including electric and non-electric sites as well as carry-in tent sites for a more primitive experience in the Hoosier National Forest.',
    image: '/images/hardin-ridge/campsite.jpg',
  },
  {
    name: 'Accessible Boat Dock & Ramp',
    description: 'A fully accessible boat dock and ramp provide easy launching into Monroe Lake, whether you are trailering a fishing boat, dropping in a kayak, or heading out on a pontoon cruise.',
    image: '/images/hardin-ridge/boat-dock.jpg',
  },
  {
    name: 'Shelter Houses',
    description: 'Shelter houses with views of Monroe Lake are available for group gatherings, family reunions, picnics, and special events within the recreation area.',
    image: '/images/hardin-ridge/shelter.jpg',
  },
  {
    name: 'Restroom & Bath House',
    description: 'Modern restroom and bath house facilities with showers and changing areas are conveniently located throughout the campground loops.',
    image: '/images/hardin-ridge/bathhouse.jpg',
  },
]

const activities = [
  {
    name: 'Hiking',
    description: 'Over 12 miles of trails wind through the rolling hardwood forests of the Hoosier National Forest, from interpretive nature walks to longer woodland treks.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    name: 'Fishing',
    description: 'Monroe Lake supports excellent populations of largemouth bass, smallmouth bass, bluegill, channel catfish, crappie, and walleye. Cast from shore or launch from the boat ramp.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    name: 'Swimming',
    description: 'The sandy swimming beach on Monroe Lake is one of the most popular features at Hardin Ridge, offering a safe and inviting place for families to cool off all summer long.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: 'Boating',
    description: 'Explore 10,750 acres of Monroe Lake by canoe, kayak, pontoon, or motorboat. The accessible boat dock and ramp make launching easy for watercraft of all sizes.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      </svg>
    ),
  },
  {
    name: 'Wildlife Watching',
    description: 'The forests and shoreline of Monroe Lake attract white-tailed deer, wild turkey, bald eagles, great blue herons, and a rich variety of songbirds throughout the year.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    name: 'Camping',
    description: 'From full-hookup electric sites to primitive carry-in tent camping, Hardin Ridge offers 200+ campsites across multiple loops to suit every style of outdoor stay.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
]

const galleryPhotos = [
  { src: '/images/hardin-ridge/beach.jpg', alt: 'Swimming beach on Monroe Lake at Hardin Ridge' },
  { src: '/images/hardin-ridge/boat-dock.jpg', alt: 'Accessible boat dock and ramp' },
  { src: '/images/hardin-ridge/cabin-front.jpg', alt: 'Cabin front at Hardin Ridge' },
  { src: '/images/hardin-ridge/cabin-interior.jpg', alt: 'Cabin interior' },
  { src: '/images/hardin-ridge/overlook.jpg', alt: 'Monroe Lake overlook and interpretive sign' },
  { src: '/images/hardin-ridge/aerial.jpg', alt: 'Aerial view of Hardin Ridge Recreation Area' },
  { src: '/images/hardin-ridge/campsite.jpg', alt: 'Campsite in the Hoosier National Forest' },
  { src: '/images/hardin-ridge/shelter.jpg', alt: 'Shelter house with Monroe Lake view' },
  { src: '/images/hardin-ridge/entrance.jpg', alt: 'Hardin Ridge entrance sign' },
  { src: '/images/hardin-ridge/bathhouse.jpg', alt: 'Restroom and bath house facilities' },
]

export default function HardinRidgePage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/hardin-ridge/beach.jpg"
            alt="Hardin Ridge Recreation Area beach on Monroe Lake, Indiana"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 container-custom px-6 pb-16">
          <span className="inline-block px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full mb-4">
            Indiana Recreation Area
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
            Hardin Ridge Recreation Area
          </h1>
          <div className="flex items-center text-white/80 mb-2">
            <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Monroe County, Indiana
          </div>
          <Link href="/hoosier-national-forest" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-6">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Part of Hoosier National Forest
          </Link>
          <div>
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
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-forest-DEFAULT py-8">
        <div className="container-custom px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { value: '200+', label: 'Campsites' },
              { value: '10,750', label: 'Acre Lake' },
              { value: '12+', label: 'Miles Trails' },
              { value: 'Year-Round', label: 'Open' },
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
                  Hardin Ridge Recreation Area sits on the wooded shores of Monroe Lake &mdash; Indiana&apos;s largest man-made lake at 10,750 acres. Located within the Hoosier National Forest in Monroe County, this premier recreation area offers over 200 campsites across multiple loops, a swimming beach, an accessible boat dock and ramp, and more than 12 miles of hiking trails through rolling hardwood forest.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Monroe Lake is a haven for fishing, boating, and water sports. The lake supports healthy populations of largemouth and smallmouth bass, bluegill, channel catfish, crappie, and walleye. The accessible boat dock and ramp make launching easy, whether you&apos;re heading out for a day of fishing or a leisurely cruise across Indiana&apos;s largest lake.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  From the sandy swimming beach to shelter houses with Monroe Lake views, carry-in campsites tucked into the forest, and modern bath house facilities, Hardin Ridge provides a well-rounded outdoor experience for families, anglers, hikers, and anyone seeking a retreat into southern Indiana&apos;s beautiful landscape.
                </p>
              </div>

              <div className="mt-10 bg-green-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Hoosier National Forest</h3>
                <p className="text-gray-600 leading-relaxed">
                  Hardin Ridge is nestled within the Hoosier National Forest, which covers over 200,000 acres of southern Indiana&apos;s hill country. The forest&apos;s rolling terrain, carved by ancient rivers and glacial meltwater, creates a varied landscape of ridgetops, ravines, and lake shoreline that supports exceptional biodiversity and year-round recreation opportunities.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Things to Do</h3>
                <ul className="space-y-3">
                  {['Hiking & Trail Walking', 'Fishing', 'Swimming', 'Boating & Kayaking', 'Camping (Electric & Primitive)', 'Carry-In Tent Camping', 'Wildlife Watching', 'Picnicking', 'Group Gatherings', 'Nature Photography'].map((item) => (
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
                  Check Availability
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Facilities</h2>
          <p className="text-gray-600 mb-10 max-w-2xl">Hardin Ridge offers well-maintained facilities on the shores of Monroe Lake, from spacious campsites and an accessible boat ramp to shelter houses and modern bath houses.</p>

          <div className="grid md:grid-cols-2 gap-8">
            {facilities.map((facility) => (
              <div key={facility.name} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-56">
                  <Image src={facility.image} alt={facility.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{facility.name}</h3>
                  <p className="text-gray-600">{facility.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Activities</h2>
          <p className="text-gray-600 mb-10 max-w-2xl">With 10,750 acres of lake, 12+ miles of trails, and the forests of the Hoosier National Forest, Hardin Ridge provides year-round recreation for every interest.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <div key={activity.name} className="bg-gray-50 rounded-2xl p-6 hover:bg-green-50 transition-colors">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  {activity.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{activity.name}</h3>
                <p className="text-gray-600 text-sm">{activity.description}</p>
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
            {galleryPhotos.map((photo, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover hover:scale-110 transition-transform duration-500" />
              </div>
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
            200+ campsites, a swimming beach, accessible boat ramp, and 12+ miles of trails on the shores of Monroe Lake. Hardin Ridge Recreation Area is southern Indiana&apos;s premier outdoor destination.
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
            <Link href="/hoosier-national-forest" className="btn-primary bg-white/10 text-white hover:bg-white/20">
              Hoosier National Forest
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
