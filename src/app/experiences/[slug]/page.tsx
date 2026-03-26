import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

// Experience data - will be replaced with Sanity CMS
const experiences: Record<string, any> = {
  'canal-bridge': {
    name: 'Canal Bridge Campground',
    tagline: 'Scenic Riverside Camping in Maine',
    description: 'A peaceful family campground on the Saco River',
    longDescription: `Situated along the scenic Saco River in Fryeburg, Maine, Canal Bridge Campground is a family campground offering 36 campsites (including site 30a) plus 5 dedicated tent sites. With direct waterfront access and stunning views of the White Mountains, this location is perfect for those seeking both relaxation and adventure.

Kayakers and canoeists will find easy river access, while anglers can try their luck with the abundant trout and bass. The campground features a bath house that doubles as a storm shelter during severe weather, and firewood and ice are available for purchase at the office or through your camp host. Check-in is at 2:00 PM and check-out is at 12:00 PM. Quiet hours are from 10:00 PM to 7:00 AM, and all children under 17 must be on their campsite by 10:00 PM.

Two vehicles are allowed per campsite, with overflow parking available at the entrance. All pets must be on a leash at all times. Fires are permitted only in fire pits. No fireworks allowed. To make a reservation, call 207.935.2286.`,
    location: 'Fryeburg, ME',
    features: ['Kayaking', 'Fishing', 'Hiking', 'Wildlife Viewing', 'RV & Tent Camping', 'River Access', 'Mountain Views', 'Bath House', 'Pet Friendly'],
    stats: { campsites: '36', tentSites: '5', river: 'Saco River' },
    image: '/images/Canal-Bridge-Entrance-1-2048x1365.jpg',
    gallery: [
      '/images/Canal-Bridge-Entrance-1-2048x1365.jpg',
      '/images/Canal-Bridge-Entrance-10-2048x1365.jpg',
      '/images/Canal-Bridge-Entrance-11-2048x1365.jpg',
      '/images/canal-bridge-bath-house.jpg',
    ],
    bookingUrl: 'tel:+12079352286',
  },
  'corinth-recreation-area': {
    name: 'Corinth Recreation Area',
    tagline: 'Bankhead National Forest Camping',
    description: 'Modern state-of-the-art campground on Lewis Smith Lake',
    longDescription: `Corinth Recreation Area is a modern, state-of-the-art campground located on the shores of Lewis Smith Lake in the Bankhead National Forest. Two camping loops contain 52 campsites with full hookups (electric, water, and sewer), plus 10 tent-only sites. Four bathhouses with warm showers serve the camping areas.

The day-use area features a swimming beach, dressing rooms with warm showers, 29 picnic sites, a reservable 100-person pavilion, and a double-lane boat ramp. The lake provides excellent fishing for Kentucky Spotted Bass and Hybrid Striped Bass. Hikers can access the 1.3-mile Bobwhite Trail, and interpretive programs are hosted during the summer.

Nearby attractions within the Bankhead National Forest include the Little Natural Bridge, the 19th-century Pine Torch Church, and the Houston Civil War Jail. The forest is also home to the Sipsey Wilderness — "The Land of a Thousand Waterfalls."`,
    location: 'Bankhead National Forest, AL',
    features: ['Full Hookup Camping', 'Tent Camping', 'Swimming Beach', 'Boat Ramp', 'Group Pavilion', 'Hiking', 'Fishing', 'ADA Accessible'],
    stats: { sites: '52 + 10 tent', pavilion: '100-person', trail: '1.3 miles' },
    image: '/images/corinth-campground.jpg',
    gallery: [
      '/images/corinth-campground.jpg',
      '/images/corinth-swimming.jpg',
      '/images/corinth-boat-ramp.jpg',
      '/images/corinth-pavilion.jpg',
      '/images/corinth-camping-loop.jpg',
      '/images/corinth-firefly-loop.jpg',
    ],
    bookingUrl: 'https://www.recreation.gov/camping/campgrounds/232423',
  },
  'meramec-state-park': {
    name: 'Meramec State Park',
    tagline: 'Missouri\'s Scenic State Park',
    description: 'Over 6,800 acres of outdoor adventures along the Meramec River',
    longDescription: `Meramec State Park is one of Missouri's most scenic state parks, spanning more than 6,800 acres along the Meramec River. The park offers exceptional opportunities for hiking, fishing, camping, and paddling.

The campground provides a variety of camping options from basic tent sites to full-hookup RV sites. Visitors can explore miles of trails, paddle the river, or enjoy the park's diverse ecosystems that support abundant wildlife, making it a favorite destination for nature enthusiasts.`,
    location: 'Sullivan, MO',
    features: ['Camping', 'Hiking', 'Canoeing', 'Fishing', 'Swimming', 'Visitor Center'],
    stats: { acres: '6,800+', trails: '16 miles' },
    image: '/images/DSC_0103-2048x1365.jpg',
    gallery: [
      '/images/DSC_0103-2048x1365.jpg',
      '/images/monongahela/spruce-knob-panorama.jpg',
      '/images/DSC_0001-2048x1365.jpg',
    ],
    bookingUrl: 'https://escape.baserves.com',
  },
  'celina-lakes-recreation-area': {
    name: 'Indian-Celina Lakes Recreation Area',
    tagline: 'Twin Lakes in Hoosier National Forest',
    description: 'Peaceful lakeside camping in southern Indiana',
    longDescription: `Indian-Celina Lakes Recreation Area offers a tranquil escape in the heart of Hoosier National Forest. These twin lakes provide excellent fishing opportunities for bass, bluegill, and catfish, while the surrounding forest offers scenic hiking trails.

The campground features well-maintained sites with access to both lakes. Whether you prefer to spend your days fishing from the shore, paddling the calm waters, or exploring the forest trails, Indian-Celina Lakes provides a peaceful retreat from everyday life.`,
    location: 'Hoosier National Forest, IN',
    features: ['Fishing', 'Camping', 'Hiking', 'Boating', 'Wildlife Viewing', 'Picnic Areas', 'Swimming'],
    stats: { lakes: '2', sites: '60+', forest: 'Hoosier NF' },
    image: '/images/Burlingame1-2048x1365.jpg',
    gallery: [
      '/images/Burlingame1-2048x1365.jpg',
      '/images/Burlingame2-1536x1152.jpg',
      '/images/DSC_0001-2048x1365.jpg',
    ],
    bookingUrl: 'https://www.recreation.gov/camping/campgrounds/232027',
  },
  'clear-creek-recreation-area': {
    name: 'Clear Creek Recreation Area',
    tagline: 'Alabama\'s Premier Lakeside Campground',
    description: 'The Bankhead National Forest\'s largest recreation area on Lewis Smith Lake',
    longDescription: `Clear Creek Recreation Area is the Bankhead National Forest's largest recreation area, located on the shore of Lewis Smith Lake. With 102 campsites across four loops (Fox, Hoot Owl, Fawn, and Bear), it offers electric and water hookups, five bathhouses with warm showers, and ADA accessible facilities.

The day-use area features a swimming beach, three group shelters, a large picnic area, a double-lane boat ramp, and a children's playground with basketball and volleyball courts. Two group camping units each accommodate up to 25 persons.

Explore the 2.5-mile Raven Interpretive Trail or the 1.25-mile paved bicycle trail. Lewis Smith Lake boasts 500+ miles of shoreline with excellent fishing. Nearby attractions include the Sipsey Wilderness ("The Land of a Thousand Waterfalls"), the Little Natural Bridge, and the historic Pine Torch Church.`,
    location: 'Bankhead National Forest, AL',
    features: ['102 Campsites', 'Swimming Beach', 'Boat Ramp', 'Group Camping', 'Hiking Trails', 'Bicycle Trail', 'Playground', 'ADA Accessible'],
    stats: { campsites: '102', loops: '4', trails: '2', lake: 'Lewis Smith' },
    image: '/images/clear-creek-overview.jpg',
    gallery: [
      '/images/clear-creek-overview.jpg',
      '/images/clear-creek-swimming.jpg',
      '/images/clear-creek-boat-ramp.jpg',
      '/images/clear-creek-shelter.jpg',
      '/images/clear-creek-camping.jpg',
      '/images/clear-creek-hoot-owl-loop.jpg',
    ],
    bookingUrl: 'https://www.recreation.gov/camping/campgrounds/231990',
  },
  'burlingame-state-park': {
    name: 'Burlingame State Park & Campground',
    tagline: 'Rhode Island\'s Premier Camping Destination Since 1934',
    description: '755 campsites, 20 cabins, and a rich history on Watchaug Pond',
    longDescription: `Burlingame State Park encompasses over 3,100 acres in Charlestown, Rhode Island — the state's largest camping facility. Established in 1934 as Rhode Island's first campground, the park has roots dating to 1930 and was shaped by the Civilian Conservation Corps during the Depression era.

The park features 755 campsites across six areas (Main Camp, 400 Area, 500 Area, Legiontown, Mills Camp, and Fish Camp), plus 20 rustic cabins in the Legiontown area. Amenities include a freshwater beach and boat ramp on Watchaug Pond, hiking trails, a playground, recreation center, camp store, athletic field, and basketball and volleyball courts.

Wildlife is abundant: white-tailed deer, river otters, and 80+ nesting bird species including wintering bald eagles on Watchaug Pond. The area north of Buckeye Brook Road provides hunting opportunities along the Pawcatuck River.`,
    location: 'Charlestown, RI',
    features: ['755 Campsites', '20 Rustic Cabins', 'Swimming', 'Fishing', 'Boating', 'Hiking', 'Playground', 'Camp Store', 'Wildlife Viewing'],
    stats: { campsites: '755', cabins: '20', acres: '3,100+', established: '1934' },
    image: '/images/Burlingame1-2048x1365.jpg',
    gallery: [
      '/images/Burlingame1-2048x1365.jpg',
      '/images/Burlingame2-1536x1152.jpg',
      '/images/long-lake/lodge.jpg',
      '/images/burlingame-aerial.jpg',
    ],
    bookingUrl: 'https://www.reserveamerica.com/explore/burlingame-state-park/RI/252711/overview',
  },
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const experience = experiences[params.slug]
  if (!experience) {
    return {
      title: 'Experience Not Found | BA Services',
      alternates: { canonical: `/experiences/${params.slug}` },
    }
  }
  return {
    title: `${experience.name} | BA Services`,
    description: experience.longDescription?.split('\n\n')[0] || experience.description,
    alternates: { canonical: `/experiences/${params.slug}` },
  }
}

export default function ExperiencePage({ params }: { params: { slug: string } }) {
  const experience = experiences[params.slug]

  if (!experience) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Experience Not Found</h1>
          <p className="text-gray-600 mb-8">The experience you're looking for doesn't exist.</p>
          <Link href="/experiences" className="inline-flex items-center gap-2 px-6 py-3 bg-forest-DEFAULT text-white font-semibold rounded-lg hover:bg-forest-dark transition-colors">
            View All Experiences
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
            src={experience.image}
            alt={experience.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 container-custom px-6 pb-16">
          <span className="inline-block px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full mb-4">
            {experience.tagline}
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
            {experience.name}
          </h1>
          <div className="flex items-center text-white/80 mb-6">
            <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            {experience.location}
          </div>
          <a
            href={experience.bookingUrl}
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
            {Object.entries(experience.stats).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{value as string}</div>
                <div className="text-white/70 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Description */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Experience</h2>
              <div className="prose prose-lg max-w-none">
                {experience.longDescription.split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index} className="text-gray-600 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Gallery */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Photo Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {experience.gallery.map((image: string, index: number) => (
                    <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                      <Image
                        src={image}
                        alt={`${experience.name} gallery image ${index + 1}`}
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
                  {experience.features.map((feature: string) => (
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
                  Book your stay and experience everything {experience.name} has to offer.
                </p>
                <a
                  href={experience.bookingUrl}
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
