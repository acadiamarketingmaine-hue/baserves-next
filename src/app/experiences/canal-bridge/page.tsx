import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Canal Bridge Campground | Saco River, Fryeburg, Maine | BA Services',
  description: 'Discover Canal Bridge Campground on the Saco River in Fryeburg, Maine. 36 numbered campsites, river frontage for kayaking, canoeing, and fishing with stunning White Mountain views.',
  alternates: { canonical: '/experiences/canal-bridge' },
}

const campsiteImages = [
  { src: '/images/canal-bridge/site-1.jpg', alt: 'Campsite 1 at Canal Bridge', label: 'Site 1' },
  { src: '/images/canal-bridge/site-6.jpg', alt: 'Campsite 6 at Canal Bridge', label: 'Site 6' },
  { src: '/images/canal-bridge/site-12.jpg', alt: 'Campsite 12 at Canal Bridge', label: 'Site 12' },
  { src: '/images/canal-bridge/site-18.jpg', alt: 'Campsite 18 at Canal Bridge', label: 'Site 18' },
  { src: '/images/canal-bridge/site-24.jpg', alt: 'Campsite 24 at Canal Bridge', label: 'Site 24' },
  { src: '/images/canal-bridge/site-30.jpg', alt: 'Campsite 30 at Canal Bridge', label: 'Site 30' },
  { src: '/images/canal-bridge/site-36.jpg', alt: 'Campsite 36 at Canal Bridge', label: 'Site 36' },
]

const rules = [
  { title: 'Check-In / Check-Out', detail: 'Check-in: 2:00 PM | Check-out: 12:00 PM' },
  { title: 'Quiet Hours', detail: '10:00 PM to 7:00 AM. Children under 17 must be on campsite by 10:00 PM.' },
  { title: 'Pets', detail: 'Pets must be leashed at all times. Please clean up after your pet.' },
  { title: 'Fires', detail: 'Fires only in designated fire pits. Absolutely no fireworks.' },
  { title: 'Vehicles', detail: '2 vehicles per campsite. Overflow parking available at the entrance.' },
  { title: 'Reservations', detail: 'Call 207.935.2286 to reserve.' },
]

const galleryImages = [
  { src: '/images/canal-bridge/entrance.jpg', alt: 'Canal Bridge Campground entrance' },
  { src: '/images/canal-bridge/site-1.jpg', alt: 'Campsite 1' },
  { src: '/images/canal-bridge/site-6.jpg', alt: 'Campsite 6' },
  { src: '/images/canal-bridge/site-12.jpg', alt: 'Campsite 12' },
  { src: '/images/canal-bridge/site-18.jpg', alt: 'Campsite 18' },
  { src: '/images/canal-bridge/site-24.jpg', alt: 'Campsite 24' },
  { src: '/images/canal-bridge/site-30.jpg', alt: 'Campsite 30' },
  { src: '/images/canal-bridge/site-36.jpg', alt: 'Campsite 36' },
  { src: '/images/canal-bridge/beach-1.jpg', alt: 'Beach area on the Saco River' },
  { src: '/images/canal-bridge/beach-2.jpg', alt: 'Sandy beach along the Saco River' },
]

export default function CanalBridgePage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/canal-bridge/entrance.jpg"
            alt="Canal Bridge Campground on the Saco River in Fryeburg, Maine"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 container-custom px-6 pb-16">
          <span className="inline-block px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full mb-4">
            Maine Campground
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
            Canal Bridge Campground
          </h1>
          <div className="flex items-center text-white/80 mb-6">
            <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Saco River, Fryeburg, Maine
          </div>
          <a
            href="https://canalbridgeme.com/"
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
              { value: '36', label: 'Sites' },
              { value: 'Saco', label: 'River' },
              { value: 'White', label: 'Mountains' },
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Canal Bridge Campground</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Nestled along the banks of the Saco River in Fryeburg, Maine, Canal Bridge Campground offers a peaceful retreat surrounded by the natural beauty of western Maine. With 36 numbered campsites (including 30a), the campground provides the perfect balance of accessibility and seclusion for campers of all kinds.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The Saco River frontage is the heart of Canal Bridge. Guests enjoy direct access to kayaking, canoeing, and fishing for trout and bass right from the campground. Whether you&apos;re paddling downstream on a lazy afternoon or casting a line at sunrise, the river is always calling.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Beyond the river, Canal Bridge is framed by stunning views of the White Mountains. From your campsite, you can watch the sun set over the peaks — a daily reminder of why Maine&apos;s western highlands are one of New England&apos;s best-kept secrets.
                </p>
              </div>

              {/* River Features */}
              <div className="mt-10 bg-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Saco River Activities</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The Saco River is one of Maine&apos;s most beloved waterways, known for its gentle currents, sandy beaches, and crystal-clear water. Canal Bridge&apos;s river frontage gives you unmatched access to paddle, swim, and fish throughout your stay.
                </p>
                <div className="grid sm:grid-cols-3 gap-4 mt-6">
                  {[
                    { activity: 'Kayaking & Canoeing', desc: 'Paddle the Saco right from your campsite' },
                    { activity: 'Fishing', desc: 'Trout and bass in the Saco River' },
                    { activity: 'Swimming', desc: 'Sandy beaches along the river' },
                  ].map((item) => (
                    <div key={item.activity} className="bg-white rounded-xl p-4">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">{item.activity}</h4>
                      <p className="text-gray-600 text-xs">{item.desc}</p>
                    </div>
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
                    'Saco River Frontage',
                    'Bath House (Storm Shelter)',
                    'Firewood Available',
                    'Ice Available',
                    'Camp Host On-Site',
                    'Office / Check-In',
                    'Fire Pits at Sites',
                    'Picnic Tables',
                    'Overflow Parking',
                    'White Mountain Views',
                  ].map((amenity) => (
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
                  Reserve your campsite at Canal Bridge Campground on the Saco River.
                </p>
                <a
                  href="https://canalbridgeme.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-4 bg-white text-forest-DEFAULT font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Reserve Online
                </a>
                <a href="tel:+12079352286" className="flex items-center justify-center gap-2 mt-4 text-white/80 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  207.935.2286
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campsite Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Campsites</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">36 numbered sites (including 30a) spread across the campground along the Saco River.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campsiteImages.map((site) => (
              <div key={site.label} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-56">
                  <Image src={site.src} alt={site.alt} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900">{site.label}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beach & River */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Beach &amp; River Access</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">Canal Bridge&apos;s Saco River frontage offers sandy beaches, gentle currents, and some of the best paddling and fishing in western Maine.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image src="/images/canal-bridge/beach-1.jpg" alt="Beach area along the Saco River at Canal Bridge" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="px-4 py-2 bg-white/90 text-gray-900 font-semibold rounded-full text-sm">
                  Saco River Beach
                </span>
              </div>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image src="/images/canal-bridge/beach-2.jpg" alt="Sandy river beach for swimming and kayaking" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="px-4 py-2 bg-white/90 text-gray-900 font-semibold rounded-full text-sm">
                  River Access Point
                </span>
              </div>
            </div>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Kayaking &amp; Canoeing</h3>
              <p className="text-gray-600 text-sm">Launch directly from the campground and paddle the Saco&apos;s gentle currents. The river is perfect for all skill levels, from beginners to experienced paddlers.</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Fishing</h3>
              <p className="text-gray-600 text-sm">The Saco River is home to trout and bass. Cast your line from the bank or wade into the shallows for a true Maine fishing experience.</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Swimming</h3>
              <p className="text-gray-600 text-sm">Cool off in the Saco&apos;s crystal-clear water at the campground&apos;s sandy beach areas. A perfect way to spend a warm summer afternoon.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Campground Rules */}
      <section className="py-16 bg-amber-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Campground Rules</h2>
          <p className="text-gray-600 mb-8">Please review and follow these rules during your stay at Canal Bridge Campground.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {rules.map((rule, index) => (
              <div key={index} className="flex gap-3 bg-white rounded-xl p-4">
                <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-700 text-xs font-bold">{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{rule.title}</h3>
                  <p className="text-gray-700 text-sm">{rule.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources & Downloads */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Resources &amp; Downloads</h2>
          <p className="text-gray-600 mb-8">Download the campground map to plan your visit.</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <a
              href="/downloads/canal-bridge/campground-map.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-gray-50 rounded-2xl p-6 hover:bg-green-50 transition-colors group"
            >
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">Campground Map</h3>
                <p className="text-gray-500 text-sm">PDF Download</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Photo Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((photo, index) => (
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
            Plan Your Stay at Canal Bridge
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Experience the Saco River, White Mountain views, and the peace of a Maine campground. Reserve your site today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://canalbridgeme.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-white text-forest-DEFAULT hover:bg-gray-100"
            >
              Reserve Online
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
