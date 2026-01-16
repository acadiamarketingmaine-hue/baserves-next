import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

// This will be replaced with Sanity data
const locations: Record<string, any> = {
  'tipsaw-lake-recreation-area': {
    name: 'Tipsaw Lake Recreation Area',
    tagline: 'Scenic Lakeside Camping & Outdoor Adventure in Indiana',
    description: 'A perfect getaway for families, anglers, and outdoor enthusiasts',
    longDescription: `Nestled in the heart of Hoosier National Forest, Tipsaw Lake Recreation Area offers a serene escape into nature. With 131 acres of pristine lake waters and over 8 miles of scenic trails, this destination provides the perfect backdrop for your outdoor adventures.

Whether you're casting a line for bass and bluegill, hiking through the rolling hills, or simply relaxing by the water, Tipsaw Lake delivers an authentic Indiana wilderness experience. Our well-maintained campsites accommodate both tent campers and RV enthusiasts, with modern amenities that don't compromise the natural beauty.`,
    location: 'Perry County, IN | Hoosier National Forest',
    features: ['Boating', 'Fishing', 'Hiking', 'Swimming', 'RV & Tent Camping', 'Picnic Areas', 'Wildlife Viewing'],
    stats: { campsites: '35+', lakeSize: '131 acres', trails: '8+ miles' },
    image: '/images/DSC_0001-2048x1365.jpg',
    gallery: [
      '/images/DSC_0001-2048x1365.jpg',
      '/images/DSC_0103-2048x1365.jpg',
      '/images/DSC_0110-2048x1365.jpg',
    ],
  },
  'yankee-springs-recreation-area': {
    name: 'Yankee Springs Recreation Area',
    tagline: "Michigan's Ultimate Outdoor Escape",
    description: 'A year-round haven for outdoor lovers, families, and adventure seekers',
    longDescription: `Spanning over 5,200 acres of diverse Michigan landscape, Yankee Springs Recreation Area stands as one of the Midwest's premier outdoor destinations. From tranquil lakes to challenging mountain biking trails, this recreation area offers something for every type of adventurer.

With over 200 campsites and 30+ miles of trails winding through forests, wetlands, and rolling terrain, Yankee Springs provides endless opportunities for exploration. Year-round activities include swimming, fishing, hiking, mountain biking, cross-country skiing, and snowmobiling.`,
    location: 'Barry County, MI',
    features: ['Boating', 'Fishing', 'Hiking', 'Mountain Biking', 'RV & Tent Camping', 'Swimming Beach', 'Winter Sports'],
    stats: { campsites: '200+', trails: '30+ miles', acres: '5,200+' },
    image: '/images/Burlingame1-2048x1365.jpg',
    gallery: [
      '/images/Burlingame1-2048x1365.jpg',
      '/images/Burlingame2-1536x1152.jpg',
      '/images/Playground-Gallery-Pic-2048x1365.jpg',
    ],
  },
  'experiences/canal-bridge': {
    name: 'Canal Bridge Campground',
    tagline: 'Scenic Riverside Camping in Maine',
    description: 'A peaceful retreat for paddlers, anglers, and nature lovers',
    longDescription: `Situated along the scenic Saco River in Fryeburg, Maine, Canal Bridge Campground offers a unique riverside camping experience. With direct waterfront access and stunning views of the White Mountains, this location is perfect for those seeking both relaxation and adventure.

Kayakers and canoeists will find easy river access, while anglers can try their luck with the abundant trout and bass. The campground's proximity to hiking trails and local attractions makes it an ideal base for exploring the natural beauty of western Maine.`,
    location: 'Fryeburg, ME',
    features: ['Kayaking', 'Fishing', 'Hiking', 'Wildlife Viewing', 'RV & Tent Camping', 'River Access', 'Mountain Views'],
    stats: { sites: 'Multiple', waterfront: 'Waterfront Access', river: 'Saco River' },
    image: '/images/Canal-Bridge-Entrance-1-2048x1365.jpg',
    gallery: [
      '/images/Canal-Bridge-Entrance-1-2048x1365.jpg',
      '/images/Canal-Bridge-Entrance-10-2048x1365.jpg',
      '/images/Canal-Bridge-Entrance-11-2048x1365.jpg',
    ],
  },
}

export default function LocationPage({ params }: { params: { slug: string } }) {
  const location = locations[params.slug]

  if (!location) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Location Not Found</h1>
          <p className="text-gray-600 mb-8">The location you're looking for doesn't exist.</p>
          <Link href="/experiences" className="btn-primary">
            View All Locations
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src={location.image}
            alt={location.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 container-custom px-6 pb-16">
          <span className="inline-block px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full mb-4">
            {location.tagline}
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
            {location.name}
          </h1>
          <div className="flex items-center text-white/80 mb-6">
            <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            {location.location}
          </div>
          <a
            href="https://escape.baserves.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
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
            {Object.entries(location.stats).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{value as string}</div>
                <div className="text-white/70 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Description */}
            <div className="lg:col-span-2">
              <h2 className="headline-md text-gray-900 mb-6">About This Location</h2>
              <div className="prose prose-lg max-w-none">
                {location.longDescription.split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index} className="text-gray-600 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Gallery */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Photo Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {location.gallery.map((image: string, index: number) => (
                    <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                      <Image
                        src={image}
                        alt={`${location.name} gallery image ${index + 1}`}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Features */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Activities & Amenities</h3>
                <ul className="space-y-3">
                  {location.features.map((feature: string) => (
                    <li key={feature} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Booking Card */}
              <div className="bg-forest-DEFAULT rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Ready to Visit?</h3>
                <p className="text-white/80 mb-6">
                  Book your stay and experience everything {location.name} has to offer.
                </p>
                <a
                  href="https://escape.baserves.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-4 bg-white text-forest-DEFAULT font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Check Availability
                </a>
                <a href="tel:+12073077903" className="flex items-center justify-center gap-2 mt-4 text-white/80 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call +1 207 307-7903
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
