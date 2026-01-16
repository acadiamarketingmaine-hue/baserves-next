import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const locations = [
  {
    name: 'Tipsaw Lake Recreation Area',
    tagline: 'Scenic Lakeside Camping & Outdoor Adventure in Indiana',
    description: 'A perfect getaway for families, anglers, and outdoor enthusiasts',
    location: 'Perry County, IN | Hoosier National Forest',
    features: ['Boating', 'Fishing', 'Hiking', 'Swimming', 'RV & Tent Camping'],
    stats: { campsites: '35+', lakeSize: '131 acres', trails: '8+ miles' },
    image: '/images/DSC_0001-2048x1365.jpg',
    slug: 'tipsaw-lake-recreation-area'
  },
  {
    name: 'Yankee Springs Recreation Area',
    tagline: "Michigan's Ultimate Outdoor Escape",
    description: 'A year-round haven for outdoor lovers, families, and adventure seekers',
    location: 'Barry County, MI',
    features: ['Boating', 'Fishing', 'Hiking', 'Mountain Biking', 'RV & Tent Camping'],
    stats: { campsites: '200+', trails: '30+ miles', acres: '5,200+' },
    image: '/images/Burlingame1-2048x1365.jpg',
    slug: 'yankee-springs-recreation-area'
  },
  {
    name: 'Canal Bridge Campground',
    tagline: 'Scenic Riverside Camping in Maine',
    description: 'A peaceful retreat for paddlers, anglers, and nature lovers',
    location: 'Fryeburg, ME',
    features: ['Kayaking', 'Fishing', 'Hiking', 'Wildlife Viewing', 'RV & Tent Camping'],
    stats: { sites: 'Multiple', waterfront: 'Waterfront', river: 'Saco River' },
    image: '/images/Canal-Bridge-Entrance-1-2048x1365.jpg',
    slug: 'experiences/canal-bridge'
  },
  {
    name: 'Hardin Ridge Recreation Area',
    tagline: 'Indiana Lakeside Paradise',
    description: 'Premier camping and recreation on Monroe Lake',
    location: 'Monroe County, IN | Hoosier National Forest',
    features: ['Boating', 'Fishing', 'Hiking', 'Swimming', 'RV & Tent Camping'],
    stats: { campsites: '200+', lake: 'Monroe Lake', trails: '12+ miles' },
    image: '/images/DSC_0103-2048x1365.jpg',
    slug: 'hardin-ridge-recreation-area'
  },
  {
    name: 'Long Lake Outdoor Center',
    tagline: 'Year-Round Outdoor Education',
    description: 'Where adventure meets learning in Michigan',
    location: 'Barry County, MI',
    features: ['Group Camping', 'Outdoor Education', 'Team Building', 'Nature Programs'],
    stats: { capacity: '150+', programs: '20+', acres: '300+' },
    image: '/images/Playground-Gallery-Pic-2048x1365.jpg',
    slug: 'long-lake-outdoor-center'
  },
  {
    name: 'Monongahela National Forest',
    tagline: 'Wild & Wonderful West Virginia',
    description: 'Pristine wilderness in the Appalachian Mountains',
    location: 'West Virginia',
    features: ['Hiking', 'Camping', 'Wildlife Viewing', 'Scenic Drives', 'Fishing'],
    stats: { acres: '921,000', trails: '825+ miles', peaks: '5 peaks 4,000+ft' },
    image: '/images/DSC_0110-2048x1365.jpg',
    slug: 'monongahela-national-forest'
  },
]

const categories = [
  { name: 'Cave Tours', icon: '🦇', count: 5, slug: 'cave-tours', image: '/images/20210323_093823-2048x1536.jpg' },
  { name: 'Kayak & Watercraft', icon: '🚣', count: 12, slug: 'kayak-and-watercraft-rentals', image: '/images/Canal-Bridge-Entrance-1-2048x1365.jpg' },
  { name: 'Campground Rentals', icon: '⛺', count: 25, slug: 'campground-rentals', image: '/images/DSC_0001-2048x1365.jpg' },
  { name: 'Scenic Drives', icon: '🚗', count: 8, slug: 'scenic-drives', image: '/images/DSC_0110-2048x1365.jpg' },
  { name: 'Hiking Trails', icon: '🥾', count: 30, slug: 'hiking', image: '/images/Burlingame1-2048x1365.jpg' },
  { name: 'Conference Centers', icon: '🏛️', count: 4, slug: 'conference-center-rentals', image: '/images/Playground-Gallery-Pic-2048x1365.jpg' },
]

export const metadata = {
  title: 'Experiences | BA Serves',
  description: 'Explore our recreation areas and outdoor experiences across America.',
}

export default function ExperiencesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-forest-DEFAULT">
        <div className="container-custom px-6">
          <div className="max-w-3xl">
            <span className="badge bg-white/10 text-white mb-4">Our Locations</span>
            <h1 className="font-display headline-xl text-white mb-6">
              Explore Our <span className="text-green-400">Recreation Areas</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              From coast to coast, discover pristine outdoor destinations managed with care and dedication
              to preserving natural beauty while providing exceptional visitor experiences.
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
            Book your stay at one of our pristine recreation areas today.
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
