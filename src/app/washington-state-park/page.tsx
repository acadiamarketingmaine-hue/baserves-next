import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Washington State Park | De Soto, Missouri | BA Services',
  description: 'Explore Washington State Park in De Soto, Missouri. 2,157 acres along the Big River with 50 campsites, 11 cabins, ancient petroglyphs, swimming pool, 9.7 miles of trails, and 140 bird species.',
  alternates: { canonical: '/washington-state-park' },
}

const fishPDFs = [
  { name: 'Fishing the Big River', file: 'Fishing the Big River.pdf' },
  { name: 'Channel Catfish', file: 'Channel Catfish.pdf' },
  { name: 'Smallmouth Bass', file: 'Smallmouth Bass.pdf' },
  { name: 'Spotted Bass', file: 'Spotted Bass.pdf' },
  { name: 'Longear Sunfish', file: 'Longear Sunfish.pdf' },
  { name: 'Northern Rock Bass', file: 'Northern Rock Bass.pdf' },
  { name: 'Fish Habits & Habitat', file: 'Fish Habits & Habitat.pdf' },
  { name: 'Fishing Ethics', file: 'Fishing Ethics.pdf' },
  { name: 'Fishing Tips', file: 'Fishing Tips.pdf' },
  { name: 'Cleaning & Prepping Fish', file: 'Cleaning & Prepping Fish.pdf' },
  { name: 'Cooking Fish', file: 'Cooking Fish.pdf' },
  { name: 'Fish Handling & Release', file: 'Fish Handling & Release Guidelines.pdf' },
]

const galleryImages = [
  { src: '/images/washington-state-park/cabin-11-exterior.png', alt: 'Cabin 11 exterior at Washington State Park' },
  { src: '/images/washington-state-park/cabin-11-interior.png', alt: 'Cabin 11 interior' },
  { src: '/images/washington-state-park/pool.png', alt: 'Swimming pool at Washington State Park' },
  { src: '/images/washington-state-park/store.jpg', alt: 'Camp store at Washington State Park' },
]

export default function WashingtonStateParkPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/washington-state-park/cabin-11-exterior.png"
            alt="Washington State Park along the Big River in De Soto, Missouri"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 container-custom px-6 pb-16">
          <span className="inline-block px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full mb-4">
            Missouri State Park
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
            Washington State Park
          </h1>
          <div className="flex items-center text-white/80 mb-6">
            <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            De Soto, Missouri
          </div>
          <a
            href="https://www.washingtonstateparkmo.com/"
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
              { value: '2,157', label: 'Acres' },
              { value: '50', label: 'Campsites' },
              { value: '9.7 mi', label: 'Trails' },
              { value: '140', label: 'Bird Species' },
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Washington State Park</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Washington State Park encompasses 2,157.57 acres along the Big River in De Soto, Missouri. A destination for history and nature lovers alike, the park welcomed 307,643 visitors in 2021 — drawn by its ancient petroglyphs, scenic trails, and diverse wildlife.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The park is home to over 350 Native American petroglyphs, some dating back more than 1,000 years. These ancient rock carvings are among the most significant archaeological sites in the Midwest, offering a window into the lives and spiritual practices of the region&apos;s earliest inhabitants.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  With 50 campsites, 11 lodging cabins, a swimming pool, camp store, 9.7 miles of trails, and 140 recorded bird species, Washington State Park is a complete outdoor destination for families, birders, anglers, and history enthusiasts.
                </p>
              </div>

              {/* Petroglyphs Feature */}
              <div className="mt-10 bg-amber-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ancient Petroglyphs</h3>
                <p className="text-gray-600 leading-relaxed">
                  Washington State Park protects one of the largest collections of Native American petroglyphs in the state. More than 350 rock carvings, over 1,000 years old, are found throughout the park. These sacred markings — including spirals, animal figures, and abstract designs — are a testament to the rich cultural history of Missouri&apos;s indigenous peoples. Guided petroglyph tours are available seasonally.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Park Amenities</h3>
                <ul className="space-y-3">
                  {[
                    '50 Campsites',
                    '11 Lodging Cabins',
                    'Swimming Pool',
                    'Camp Store',
                    '9.7 Miles of Trails',
                    '140 Bird Species',
                    'Ancient Petroglyphs',
                    'Big River Access',
                    'Picnic Areas',
                    'Fishing',
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
                  Reserve your campsite or cabin at Washington State Park.
                </p>
                <a
                  href="https://www.washingtonstateparkmo.com/"
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

      {/* Lodging */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Cabins &amp; Lodging</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Washington State Park offers 11 lodging cabins nestled among the trees along the Big River. These cabins provide a comfortable home base for exploring the park&apos;s trails, petroglyphs, and natural beauty.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                In addition to cabins, the park has 50 campsites — some with electric hookups and others offering a more basic, back-to-nature experience. Whether you prefer the comfort of a cabin or the simplicity of a tent, Washington State Park has a spot for you.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4">
                  <div className="text-2xl font-bold text-forest-DEFAULT mb-1">11</div>
                  <div className="text-gray-600 text-sm">Lodging Cabins</div>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <div className="text-2xl font-bold text-forest-DEFAULT mb-1">50</div>
                  <div className="text-gray-600 text-sm">Campsites</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative h-64 rounded-2xl overflow-hidden">
                <Image src="/images/washington-state-park/cabin-11-exterior.png" alt="Cabin 11 exterior at Washington State Park" fill className="object-cover" />
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden">
                <Image src="/images/washington-state-park/cabin-11-interior.png" alt="Cabin 11 interior at Washington State Park" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fish of the Big River */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Fish of the Big River</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            A 12-part educational series on the fish species, fishing techniques, and conservation practices of the Big River. Download any guide below.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {fishPDFs.map((pdf) => (
              <a
                key={pdf.file}
                href={`/downloads/washington-state-park/fish-of-the-big-river/${pdf.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 hover:bg-blue-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm group-hover:text-blue-700 transition-colors">{pdf.name}</h3>
                  <p className="text-gray-500 text-xs">PDF</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Recreation */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Recreation</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">From the swimming pool to 9.7 miles of trails and 140 bird species, Washington State Park offers something for every outdoor enthusiast.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative h-56">
                <Image src="/images/washington-state-park/pool.png" alt="Swimming pool at Washington State Park" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Swimming Pool</h3>
                <p className="text-gray-600 text-sm">
                  Cool off at the park&apos;s swimming pool — a great spot for families during the warmer months. The pool provides a safe and refreshing way to enjoy a summer day at the park.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Trails</h3>
              <p className="text-gray-600 text-sm mb-4">
                Explore 9.7 miles of trails winding through the park&apos;s forests and along the Big River. Trails range from easy nature walks to more challenging hikes, with opportunities to see petroglyphs along the way.
              </p>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">9.7 miles</span>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Birding</h3>
              <p className="text-gray-600 text-sm mb-4">
                With 140 recorded bird species, Washington State Park is a birder&apos;s paradise. From warblers and woodpeckers to raptors and waterfowl, there&apos;s always something to spot along the trails and river.
              </p>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">140 species</span>
            </div>
          </div>
          <div className="mt-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative h-56">
                <Image src="/images/washington-state-park/store.jpg" alt="Camp store at Washington State Park" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Camp Store</h3>
                <p className="text-gray-600 text-sm">
                  Stock up on essentials, snacks, firewood, and souvenirs at the park&apos;s camp store. A convenient stop for campers and day visitors alike.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources & Downloads */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Resources &amp; Downloads</h2>
          <p className="text-gray-600 mb-8">Download park maps and checklists to plan your visit.</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <a
              href="/downloads/washington-state-park/park-map.pdf"
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
                <h3 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">Park Map</h3>
                <p className="text-gray-500 text-sm">PDF Download</p>
              </div>
            </a>
            <a
              href="/downloads/washington-state-park/birding-checklist.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-gray-50 rounded-2xl p-6 hover:bg-green-50 transition-colors group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">Birding Checklist</h3>
                <p className="text-gray-500 text-sm">PDF Download — 140 Species</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Photo Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
            Plan Your Visit to Washington State Park
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Ancient petroglyphs, the Big River, and 2,157 acres of Missouri wilderness await. Reserve your campsite or cabin today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.washingtonstateparkmo.com/"
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
