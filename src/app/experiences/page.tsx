import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { KayakIcon, CampIcon, CarIcon, HikeIcon, BuildingIcon, MountainIcon } from '@/components/Icons'

const locations = [
,
]

const categories = [
  { name: 'Campground Rentals', icon: <CampIcon className="w-8 h-8" />, count: 25, slug: 'campground-rentals', image: '/images/DSC_0001-2048x1365.jpg' },
  { name: 'Conference Centers', icon: <BuildingIcon className="w-8 h-8" />, count: 4, slug: 'conference-center-rentals', image: '/images/long-lake/lodge.jpg' },
  { name: 'Hiking Trails', icon: <HikeIcon className="w-8 h-8" />, count: 30, slug: 'hiking', image: '/images/Burlingame1-2048x1365.jpg' },
  { name: 'Kayak & Watercraft', icon: <KayakIcon className="w-8 h-8" />, count: 12, slug: 'kayak-and-watercraft-rentals', image: '/images/Canal-Bridge-Entrance-1-2048x1365.jpg' },
  { name: 'Lookout Pavilions', icon: <MountainIcon className="w-8 h-8" />, count: 2, slug: 'lookout-pavillions', image: '/images/monongahela/entrance-sign.jpg' },
  { name: 'Scenic Drives', icon: <CarIcon className="w-8 h-8" />, count: 8, slug: 'scenic-drives', image: '/images/monongahela/entrance-sign.jpg' },
]

export const metadata = {
  title: 'Experiences',
  description: 'Explore 12+ recreation areas managed by BA Services — campgrounds, national forests, and state parks across AL, IN, ME, MI, MO, RI, and WV. Book your stay today.',
  alternates: {
    canonical: '/experiences',
  },
}

export default function ExperiencesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-forest-DEFAULT overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/bankhead-forest.jpg" alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="container-custom px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="badge bg-white/10 text-white mb-4">Our Locations</span>
            <h1 className="font-display headline-xl text-white mb-6">
              Explore Our <span className="text-green-400">Recreation Areas</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              From coast to coast, discover pristine outdoor destinations managed with care and dedication
              to preserving natural beauty while providing exceptional visitor experiences. <Link href="/about" className="underline hover:text-white transition-colors">Learn about our story</Link> and the <Link href="/services" className="underline hover:text-white transition-colors">services</Link> that make it possible.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse by Experience</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/experiences/categories/${category.slug}`}
                className="group relative overflow-hidden rounded-xl aspect-square"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                  <span className="text-3xl mb-2">{category.icon}</span>
                  <span className="font-semibold text-center text-sm">{category.name}</span>
                  <span className="text-xs text-white/70 mt-1">{category.count} locations</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Locations */}
      <section className="section">
        <div className="container-custom px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">All Recreation Areas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location) => (
              <Link
                key={location.name}
                href={`/${location.slug}`}
                className="location-card group"
              >
                <div className="location-card-image">
                  <Image
                    src={location.image}
                    alt={location.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="location-card-overlay" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                      {location.tagline}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {location.features.slice(0, 3).map((feature) => (
                      <span key={feature} className="text-xs text-gray-500">
                        {feature} •
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-forest-DEFAULT transition-colors">
                    {location.name}
                  </h3>
                  <p className="text-gray-600 text-sm italic mb-3">{location.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    {location.location}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-forest-DEFAULT">
        <div className="container-custom px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Book your stay at one of our pristine recreation areas today. <Link href="/contact" className="underline hover:text-white transition-colors">Reach out</Link> with any questions, <Link href="/leave-a-review" className="underline hover:text-white transition-colors">share your feedback</Link> after your visit, or explore <Link href="/careers" className="underline hover:text-white transition-colors">career opportunities</Link> with our team. Return to our <Link href="/" className="underline hover:text-white transition-colors">homepage</Link> to see everything we offer.
          </p>
          <a
            href="https://escape.baserves.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary bg-white text-forest-DEFAULT hover:bg-gray-100"
          >
            Book Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
