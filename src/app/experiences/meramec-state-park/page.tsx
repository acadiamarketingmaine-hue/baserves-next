import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Meramec State Park | Sullivan, Missouri | BA Services',
  description: 'Explore Meramec State Park along the Meramec River in Sullivan, Missouri. 19 cabins, motel lodging, 40+ caves, Fisher Cave tours, float trips, and CCC-built historic architecture across 6,896 acres.',
  alternates: { canonical: '/experiences/meramec-state-park' },
}

const cabinCategories = [
  {
    name: '1-Bedroom Cabins',
    price: '$140',
    description: 'Cozy one-bedroom cabins nestled in the Ozark forest, perfect for couples or small families. Each cabin features CCC-era rustic stone and timber architecture.',
    image: '/images/meramec-state-park/cabin-1.jpg',
  },
  {
    name: '2-Bedroom Cabins',
    price: '$170',
    description: 'Spacious two-bedroom cabins with room for the whole family. Enjoy the comfort of modern amenities wrapped in historic CCC craftsmanship.',
    image: '/images/meramec-state-park/cabin-5.jpg',
  },
  {
    name: 'Large Cabins',
    price: '$345',
    description: 'Our largest cabins are ideal for reunions, group getaways, and extended families. Generous living space with full kitchens and beautiful wooded surroundings.',
    image: '/images/meramec-state-park/cabin-12-13.jpg',
  },
]

const facilities = [
  {
    name: 'Riverstop Store & Float Rentals',
    description: 'Your launching point for Meramec River adventures. Rent canoes, kayaks, and rafts for scenic float trips. The store also carries camping supplies, snacks, ice, and souvenirs.',
    image: '/images/meramec-state-park/riverstop-store.jpg',
  },
  {
    name: 'Fireside Store & Grill',
    description: 'Full-service dining and camp store offering hot food, groceries, firewood, ice, and camping supplies. A convenient one-stop shop for everything you need during your stay.',
    image: '/images/meramec-state-park/fireside-store.jpg',
  },
  {
    name: 'Visitor Center',
    description: 'Discover the natural and cultural history of the park through nature exhibits and aquariums featuring native fish species. Helpful staff provide park information and trail recommendations.',
    image: '/images/meramec-entrance-sign.jpg',
  },
  {
    name: 'Hickory Ridge Motel',
    description: 'Comfortable motel lodging within the park. Standard rooms at $90/night and loft rooms (111, 202, 208) at $130/night. $20 extra person fee with a 2-night minimum stay.',
    image: '/images/meramec-state-park/hickory-ridge-motel.jpg',
  },
  {
    name: 'Conference Center',
    description: 'A versatile venue available for corporate retreats, meetings, workshops, and special events. Modern amenities in a stunning natural setting.',
    image: '/images/meramec-state-park/conference-center.jpg',
  },
  {
    name: 'Recreation Hall',
    description: 'A multi-purpose facility perfect for group gatherings, family reunions, and community events within the park.',
    image: '/images/meramec-state-park/recreation-hall.jpg',
  },
  {
    name: 'Overlook Pavilion',
    description: 'A scenic overlook pavilion available for events and gatherings, offering sweeping views of the Meramec River valley and surrounding Ozark hills.',
    image: '/images/meramec-state-park/overlook-pavilion.jpg',
  },
]

const watercraftPricing = [
  { type: 'Canoe', weekday: '$54', weekend: '$64' },
  { type: 'Kayak', weekday: '$42', weekend: '$47' },
]

const galleryImages = [
  { src: '/images/meramec-state-park/cabin-2.jpg', alt: 'Cabin at Meramec State Park' },
  { src: '/images/meramec-state-park/cabin-3.jpg', alt: 'Cabin surrounded by Ozark forest' },
  { src: '/images/meramec-state-park/cabin-4.jpg', alt: 'Stone and timber cabin exterior' },
  { src: '/images/meramec-state-park/cabin-6.jpg', alt: 'CCC-built cabin among the trees' },
  { src: '/images/meramec-state-park/cabin-7.jpg', alt: 'Cabin with wooded setting' },
  { src: '/images/meramec-state-park/cabin-8.jpg', alt: 'Park cabin in autumn' },
  { src: '/images/meramec-state-park/cabin-10.jpg', alt: 'Rustic cabin at Meramec' },
  { src: '/images/meramec-state-park/cabin-11.jpg', alt: 'Cabin view at Meramec State Park' },
  { src: '/images/meramec-state-park/cabin-14-15.jpg', alt: 'Paired cabins in the forest' },
  { src: '/images/meramec-state-park/cabin-16-17.jpg', alt: 'Adjacent cabins at Meramec' },
  { src: '/images/meramec-state-park/cabin-19.jpg', alt: 'Cabin 19 at Meramec State Park' },
  { src: '/images/meramec-state-park/watercraft-rentals.jpg', alt: 'Watercraft rentals on the Meramec River' },
  { src: '/images/meramec-state-park/riverstop-interior.jpg', alt: 'Inside the Riverstop Store' },
  { src: '/images/meramec-state-park/float-takeout.jpg', alt: 'Float trip takeout on the Meramec River' },
  { src: '/images/meramec-entrance-sign.jpg', alt: 'CCC monument at Meramec State Park' },
  { src: '/images/meramec-state-park/fireside-store.jpg', alt: 'Fireside Store & Grill' },
]

const scopeOfWork = [
  {
    title: 'Lodging & Conference Facilities',
    description: 'Full operation of cabins, motel, and event spaces with modern booking and year-round administrative support.',
    items: [
      'Operation of Hickory Ridge Motel, cabins, and conference center',
      'Online reservation system with advanced booking capabilities',
      'Seasonal operations with year-round administrative support',
      'Clean, comfortable, and well-maintained accommodations',
      'Pet-friendly lodging alongside designated allergen-free units',
    ],
  },
  {
    title: 'Food & Beverage Operations',
    description: 'Full management of dining services with high-quality, compliant food offerings and dietary-conscious menus.',
    items: [
      'Full management of the Fireside Grill restaurant',
      'Preparation and service of high-quality, safe food offerings',
      'Menu development including healthy and dietary-conscious choices',
      'Strict adherence to federal, state, and local health regulations',
    ],
  },
  {
    title: 'Retail Services',
    description: 'Visitor-friendly retail operations with camping supplies, merchandise, and locally sourced Missouri products.',
    items: [
      'Operation of the Fireside Store and River Stop Store',
      'Sale of camping supplies, merchandise, and convenience items',
      'Clean, organized, and visitor-friendly retail environments',
      'Preference for locally sourced Missouri products where feasible',
    ],
  },
  {
    title: 'Watercraft Rentals & River Services',
    description: 'Fleet of 80+ vessels for float trips with full transportation services and safety-focused operations.',
    items: [
      'Canoe, kayak, and raft rentals with a fleet of 80+ vessels',
      'Transportation services for float trips',
      'Seasonal operations aligned with peak visitation periods',
      'Safety-focused operations with rental agreements and liability protocols',
    ],
  },
  {
    title: 'Operations & Management',
    description: 'End-to-end operational management with structured on-site leadership across every business unit.',
    items: [
      'Staffing, training, and supervision of all personnel',
      'Day-to-day facility operations across lodging, retail, food service, and recreation',
      'Inventory control, procurement, and vendor coordination',
      'Maintenance of all concession facilities in clean, safe condition',
      'Financial management, reporting, and contract compliance',
      'Structured on-site management team across each business unit',
    ],
  },
  {
    title: 'Quality Control & Guest Experience',
    description: 'Formal quality program with regular inspections, rapid response, and continuous improvement.',
    items: [
      'Daily, weekly, and monthly inspections of facilities and operations',
      'Rapid response to maintenance or service issues within 72 hours',
      'Ongoing staff training focused on professionalism and satisfaction',
      'Continuous improvement through audits, feedback, and reviews',
      'Customer service programs including feedback systems and on-site support',
    ],
  },
  {
    title: 'Additional Guest Services',
    description: 'Supplemental services that round out the full park experience for every visitor.',
    items: [
      'Firewood sales for campers during peak season',
      'Marketing and promotion of park activities, lodging, and events',
      'Customer feedback systems and on-site support',
      'Park-wide event coordination and visitor outreach',
    ],
  },
  {
    title: 'Community & Economic Impact',
    description: 'Supporting the local and state economy through employment, local partnerships, and tourism promotion.',
    items: [
      'Hiring local employees whenever possible',
      'Partnering with local vendors and suppliers',
      'Promoting tourism through targeted marketing and outreach',
      'Driving visitation and revenue within Meramec State Park',
    ],
  },
]

export default function MeramecStateParkPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/meramec-state-park/cabin-2.jpg"
            alt="Meramec State Park cabin along the Meramec River in Sullivan, Missouri"
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
            Meramec State Park
          </h1>
          <div className="flex items-center text-white/80 mb-6">
            <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Sullivan, Missouri
          </div>
          <a
            href="https://www.meramecpark.com/"
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
              { value: '19', label: 'Cabins' },
              { value: '40+', label: 'Caves' },
              { value: '13 mi', label: 'Trails' },
              { value: '6,896', label: 'Acres' },
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Meramec State Park</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Meramec State Park encompasses 6,896 acres along the scenic Meramec River in the heart of the Missouri Ozarks. Located in Franklin County approximately 60 miles southwest of St. Louis, the park is easily accessible from Interstate 44 via the Sullivan/Hwy. 185 exit. Known for its striking natural beauty and wide range of recreational opportunities, Meramec is one of Missouri&apos;s most popular outdoor destinations.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The Meramec River serves as the centerpiece of the park, winding through a landscape of steep forested hills, limestone bluffs, and cool, spring-fed waters. The river offers excellent opportunities for floating, fishing, and swimming, with canoe, kayak, and raft rentals available for visitors seeking to experience the river firsthand.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The park&apos;s terrain is defined by rugged Ozark topography, featuring dense hardwood forests, pine stands, and more than 40 caves—one of the highest concentrations in the state. Thirteen miles of hiking trails traverse the park, leading visitors through wooded hollows, along riverbanks, and up to scenic overlooks.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Meramec State Park offers a variety of overnight accommodations to suit different preferences. Nineteen cabins range from cozy one-bedroom retreats to larger units suitable for groups, while the 22-room Hickory Ridge Motel provides comfortable, modern lodging in a hilltop setting.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Adjacent to the motel, the Hickory Ridge Conference Center accommodates up to 125 guests and serves as a venue for meetings, weddings, reunions, and other group events. Nearby, the Overlook Pavilion offers a scenic outdoor venue with sweeping views of the Meramec River valley.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Visitors enjoy hiking, camping, fishing, floating, caving, and picnicking. Additional amenities include a fully stocked Riverstop Store, dining options overlooking the river valley, and easy access to outdoor recreation equipment and services.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  With its combination of natural beauty, accessible location, and well-developed facilities, Meramec State Park offers a balanced blend of adventure and comfort.
                </p>
              </div>

              {/* CCC History */}
              <div className="mt-10 bg-green-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Civilian Conservation Corps Legacy</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Meramec State Park was built by the Civilian Conservation Corps beginning in 1933. Two CCC camps operated within the park &mdash; the 739th Company and the 2728th Company &mdash; and over 2,500 young men contributed to shaping the park&apos;s infrastructure during the Great Depression era.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  These workers constructed the stone shelters, trails, roads, and the iconic lodge that still stand today. The CCC legacy is visible throughout the park in its distinctive rustic stone and timber architecture, a testament to the craftsmanship and dedication of a generation that helped build America&apos;s public lands.
                </p>
              </div>

              {/* Natural Area */}
              <div className="mt-8 bg-amber-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Meramec Upland Forest Natural Area</h3>
                <p className="text-gray-600 leading-relaxed">
                  Within the park lies the 461-acre Meramec Upland Forest Natural Area, a designated old-growth forest that has remained largely undisturbed for centuries. This rare remnant of the original Ozark woodland harbors towering oaks, hickories, and a rich understory of native wildflowers. It is one of the finest examples of upland forest in Missouri and provides critical habitat for a wide array of wildlife.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Park Amenities</h3>
                <ul className="space-y-3">
                  {[
                    '19 Cabins',
                    'Hickory Ridge Motel',
                    'Riverstop Store & Float Rentals',
                    'Fireside Store & Grill',
                    'Visitor Center & Aquariums',
                    'Fisher Cave Tours',
                    'Conference Center',
                    'Overlook Pavilion',
                    'Recreation Hall',
                    '13 Miles of Trails',
                    'Picnic Areas & Shelters',
                    'Swimming & Fishing',
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
                  Book a cabin or motel room at Meramec State Park and experience the Ozarks.
                </p>
                <a
                  href="https://www.meramecpark.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-4 bg-white text-forest-DEFAULT font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Check Availability
                </a>
                <div className="mt-4 text-center text-white/70 text-sm">
                  2-night minimum stay required
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lodging - Cabins */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Cabin Lodging</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            19 cabins nestled in the Ozark forest, featuring CCC-era stone and timber architecture. $20 pet fee and $20 extra person fee apply. 2-night minimum stay.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {cabinCategories.map((cabin) => (
              <div key={cabin.name} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-56">
                  <Image src={cabin.image} alt={cabin.name} fill className="object-cover" />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 text-gray-900 font-bold rounded-full text-sm">
                    {cabin.price}/night
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{cabin.name}</h3>
                  <p className="text-gray-600">{cabin.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="https://www.meramecpark.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-forest-DEFAULT text-white font-semibold rounded-lg hover:bg-forest-dark transition-colors"
            >
              View All Cabins & Book
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Fisher Cave */}
      <section className="py-16">
        <div className="container-custom px-6">
          <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-white">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 text-sm font-semibold rounded-full mb-4">
                  Guided Cave Tours
                </span>
                <h2 className="text-3xl font-bold mb-6">Fisher Cave</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  Fisher Cave is one of more than 40 caves within Meramec State Park, and it is the only one open to the public for guided tours. This remarkable cave features stunning calcite crystal deposits, ancient bear claw marks scratched into the walls, towering 30-foot columns, and unique geological formations shaped over millions of years.
                </p>
                <p className="text-white/80 leading-relaxed mb-6">
                  Seasonal guided tours take visitors deep into the cave to witness these natural wonders up close. The cave maintains a constant cool temperature year-round, making it a refreshing destination on hot summer days.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="text-white/70 text-sm">Calcite Crystals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <span className="text-white/70 text-sm">30-Foot Columns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-white/70 text-sm">Seasonal Tours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </div>
                    <span className="text-white/70 text-sm">Bear Claw Marks</span>
                  </div>
                </div>
              </div>
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <Image
                  src="/images/meramec-state-park/cabin-19.jpg"
                  alt="Fisher Cave at Meramec State Park"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Watercraft Rentals */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image
                src="/images/meramec-state-park/watercraft-rentals.jpg"
                alt="Watercraft rentals for floating the Meramec River"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Float the Meramec River</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Experience the beauty of the Meramec River from the water. The Riverstop Store offers canoe, kayak, and raft rentals for scenic float trips past limestone bluffs, gravel bars, and forested riverbanks.
              </p>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Watercraft Rental Rates</h3>
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Watercraft</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Weekday</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Weekend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {watercraftPricing.map((craft) => (
                        <tr key={craft.type} className="border-t border-gray-200">
                          <td className="py-3 px-4 text-gray-900 font-medium">{craft.type}</td>
                          <td className="py-3 px-4 text-gray-600">{craft.weekday}</td>
                          <td className="py-3 px-4 text-gray-600">{craft.weekend}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  Rafts also available in various sizes. Visit the Riverstop Store for full pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Park Facilities</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Meramec State Park offers a full range of facilities to make your visit comfortable and memorable.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility) => (
              <div key={facility.name} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="relative h-48">
                  <Image src={facility.image} alt={facility.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{facility.name}</h3>
                  <p className="text-gray-600 text-sm">{facility.description}</p>
                </div>
              </div>
            ))}
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

      {/* Resources & Downloads */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Resources &amp; Booking</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a
              href="https://www.meramecpark.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-6 hover:border-green-300 transition-colors group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors">Book Cabins &amp; Motel</h3>
                <p className="text-gray-500 text-sm">Reserve your lodging at escape.baserves.com</p>
              </div>
            </a>
            <a
              href="https://www.meramecpark.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-6 hover:border-green-300 transition-colors group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">Watercraft Rentals</h3>
                <p className="text-gray-500 text-sm">Reserve canoes, kayaks &amp; rafts online</p>
              </div>
            </a>
            <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-6">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Park Information</h3>
                <p className="text-gray-500 text-sm">Visit the Visitor Center for maps, exhibits &amp; trail info</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scope of Services */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-3xl mb-12">
            <span className="inline-block px-4 py-2 bg-forest-DEFAULT/10 text-forest-DEFAULT text-sm font-semibold rounded-full mb-4">Statement of Work</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Scope of Services</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              BA Services operates the concession services at Meramec State Park under a long-term partnership with the Missouri Department of Natural Resources, delivering comprehensive lodging, dining, retail, and recreational experiences across the park.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {scopeOfWork.map((category) => (
              <div key={category.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{category.description}</p>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start text-sm text-gray-700">
                      <svg className="w-4 h-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-forest-DEFAULT">
        <div className="container-custom px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-6">
            Plan Your Visit to Meramec State Park
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Book a cabin or motel room and discover the caves, trails, and river beauty of Missouri&apos;s Ozarks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.meramecpark.com/"
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
