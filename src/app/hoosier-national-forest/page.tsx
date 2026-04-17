import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Hoosier National Forest | Southern Indiana | BA Services',
  description: 'Explore Hoosier National Forest in southern Indiana. Three recreation areas with camping, swimming, fishing, boating, and hundreds of miles of trails.',
  alternates: { canonical: '/hoosier-national-forest' },
}

const subProperties = [
  {
    name: 'Hardin Ridge Recreation Area',
    href: '/hardin-ridge-recreation-area',
    description: '200+ campsites on Monroe Lake — Indiana\'s largest reservoir. Features a swimming beach, boat ramp, and over 12 miles of trails winding through hardwood forest.',
    image: '/images/hardin-ridge-entrance-sign.jpg',
    badge: 'Monroe Lake',
  },
  {
    name: 'Indian-Celina Lakes Recreation Area',
    href: '/indian-celina-lakes-recreation-area',
    description: 'Two scenic lakes nestled in the forest with an accessible fishing pier, camping, boat launch, and hiking trails through rolling southern Indiana terrain.',
    image: '/images/indian-celina-entrance-sign.jpg',
    badge: 'Twin Lakes',
  },
  {
    name: 'Tipsaw Lake Recreation Area',
    href: '/tipsaw-lake-recreation-area',
    description: '131-acre lake with 35+ campsites, a swimming beach, amphitheater, and over 8 miles of trails through some of the most rugged terrain in the forest.',
    image: '/images/tipsaw-lake/lake-view.jpg',
    badge: 'Lake Recreation',
  },
]

const scopeOfWork = [
  {
    title: 'Recreation Area Operations',
    description: 'Full operation of campgrounds, cabins, beaches, and day-use areas throughout the Hoosier National Forest.',
    items: [
      'Operate campgrounds, cabins, beaches, and day-use areas on approved seasonal schedules',
      'Adjust operations based on weather, safety conditions, and visitor demand',
      'Coordinate closely with the U.S. Forest Service on all operational decisions',
      'Manage extended operating seasons at select sites',
      'Provide cabin accommodations and strategic amenities that complement the natural setting',
    ],
  },
  {
    title: 'Visitor Services & Guest Experience',
    description: 'Front-line customer service and visitor engagement rooted in traditional camping values.',
    items: [
      'Campground hosts, gate attendants, and on-site staff providing front-line service',
      'Visitor information, education, and assistance throughout each stay',
      'Fee collection and Recreation.gov reservation coordination',
      'Text-based support and modern communication tools',
      'Respectful, family-oriented outdoor experience rooted in traditional camping values',
    ],
  },
  {
    title: 'Facility Maintenance & Cleanliness',
    description: 'Rigorous maintenance protocols that meet or exceed National Forest Service quality standards.',
    items: [
      'Restroom and sanitation system maintenance',
      'Campsite, picnic area, and common space upkeep',
      'Road, trail, and signage maintenance',
      'Daily and scheduled cleaning to ensure high standards',
      'Pre-season, mid-season, and post-season facility inspections',
    ],
  },
  {
    title: 'Staffing & On-Site Management',
    description: 'A full team of trained personnel providing continuous presence at key recreation sites.',
    items: [
      'Area Managers and Unit Managers',
      'Campground Hosts and Gate Attendants',
      'Maintenance Technicians and Security Staff',
      '24/7 staffing presence at key recreation sites during operating seasons',
      'Recruiting and training staff to meet federal service, safety, and hospitality standards',
    ],
  },
  {
    title: 'Safety, Security & Emergency Response',
    description: 'Comprehensive safety programs including inspections, fire prevention, and emergency coordination.',
    items: [
      'Regular safety inspections and hazard mitigation for trees, infrastructure, and facilities',
      'Fire prevention and response protocols',
      'Campground security, rule enforcement, and incident reporting',
      'Emergency response coordination with appropriate agencies',
      'Continuous visitor and employee safety assurance',
    ],
  },
  {
    title: 'Environmental Stewardship',
    description: 'Responsible operations that protect natural resources and preserve the forest atmosphere.',
    items: [
      'Protect natural resources through responsible operations and maintenance practices',
      'Vegetation management and wildlife interaction protocols',
      'Waste system management and recycling programs',
      'Eco-friendly and sustainability initiatives',
      'Preserve the non-commercialized forest atmosphere valued by visitors',
    ],
  },
  {
    title: 'Forest Service Partnership',
    description: 'Transparent, collaborative partnership with the U.S. Forest Service as the primary on-the-ground operator.',
    items: [
      'Serve as primary on-the-ground partner to the U.S. Forest Service',
      'Regular inspections, reporting, and performance evaluations',
      'Full compliance with federal regulations and concession requirements',
      'Adherence to approved operating plans',
      'Collaborative, transparent working relationship with Forest Service personnel',
    ],
  },
  {
    title: 'Quality Standards & Visitor Enhancement',
    description: 'Proven results-driven model that transforms recreation sites into welcoming, well-managed destinations.',
    items: [
      'Meet or exceed National Quality Standards for Recreation Management',
      'Full compliance with U.S. Forest Service operating requirements',
      'Federal employment, safety, and civil rights standards adherence',
      'Informational materials and forest-specific visitor guides',
      'Initial facility improvement followed by ongoing high standards of maintenance',
    ],
  },
]

const activities = [
  {
    name: 'Hiking & Backpacking',
    description: 'Over 260 miles of trails traverse hardwood forests, sandstone bluffs, and ridgelines. Routes range from easy lakeside loops to multi-day backcountry treks through the Deam Wilderness.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    name: 'Fishing',
    description: 'Cast a line in Monroe Lake, Tipsaw Lake, Indian Lake, or Celina Lake. Species include largemouth bass, bluegill, catfish, and crappie. Accessible fishing piers available.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    name: 'Swimming',
    description: 'Sandy beaches at Hardin Ridge and Tipsaw Lake provide refreshing summer swimming with designated swim areas, changing facilities, and nearby picnic grounds.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: 'Boating',
    description: 'Boat ramps at Monroe Lake, Tipsaw Lake, and Indian-Celina Lakes provide access for canoes, kayaks, and motorized boats. Monroe Lake alone covers 10,750 acres.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      </svg>
    ),
  },
  {
    name: 'Camping',
    description: 'Hundreds of campsites across three recreation areas, from developed sites with electric hookups to primitive backcountry camping in the Deam Wilderness.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
      </svg>
    ),
  },
  {
    name: 'Wildlife Viewing',
    description: 'The forest supports white-tailed deer, wild turkey, bald eagles, Indiana bats, and over 100 bird species. Fall migration and spring wildflower seasons are especially rewarding.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
]

export default function HoosierNationalForestPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/hardin-ridge/aerial.jpg"
            alt="Hoosier National Forest, Southern Indiana"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 container-custom px-6 pb-16">
          <span className="inline-block px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full mb-4">
            Indiana National Forest
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
            Hoosier National Forest
          </h1>
          <div className="flex items-center text-white/80 mb-6">
            <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Southern Indiana &mdash; US Forest Service
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'Hardin Ridge', href: '/hardin-ridge-recreation-area' },
              { name: 'Indian-Celina Lakes', href: '/indian-celina-lakes-recreation-area' },
              { name: 'Tipsaw Lake', href: '/tipsaw-lake-recreation-area' },
            ].map((cg) => (
              <a
                key={cg.name}
                href={cg.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-forest-DEFAULT text-white text-sm font-semibold rounded-lg hover:bg-forest-dark transition-colors"
              >
                {cg.name}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-forest-DEFAULT py-8">
        <div className="container-custom px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { value: '200,000', label: 'Acres' },
              { value: '260+', label: 'Miles Trails' },
              { value: '3', label: 'Recreation Areas' },
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Hoosier National Forest</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Hoosier National Forest spans approximately 200,000 acres across nine counties in south-central Indiana, making it the state&apos;s only national forest and a vital public resource in a region where limited land is publicly accessible. Managed by the U.S. Forest Service, the forest stretches across Monroe, Brown, Lawrence, Martin, Orange, Perry, Crawford, Dubois, and Jackson counties, offering a diverse landscape of rolling hills, dense hardwood forests, sandstone bluffs, caves, and winding waterways.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The forest is organized into two ranger districts&mdash;Brownstown and Tell City&mdash;with administrative offices located in Bedford and Tell City. Positioned within a 200-mile radius of more than seven million people, Hoosier National Forest serves as a highly accessible destination for visitors from major metropolitan areas including Indianapolis, Chicago, Cincinnati, Louisville, and beyond.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Recreational opportunities are extensive and varied. More than 260 miles of trails support hiking, horseback riding, and mountain biking, while lakes and reservoirs provide opportunities for boating, fishing, swimming, and paddling. The forest is also home to Indiana&apos;s only designated wilderness area, the Charles C. Deam Wilderness, as well as notable destinations such as Hemlock Cliffs, Hickory Ridge Lookout Tower, and scenic overlooks along the Ohio River Scenic Byway.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Three primary developed recreation areas&mdash;Hardin Ridge, Indian-Celina Lakes, and Tipsaw Lake&mdash;serve as focal points for visitor activity. Hardin Ridge Recreation Area is located on the shoreline of Monroe Lake, Indiana&apos;s largest reservoir, and provides access to boating, water sports, and fishing, along with nearby amenities managed by the Indiana Department of Natural Resources and the U.S. Army Corps of Engineers. Indian-Celina Lakes and Tipsaw Lake Recreation Areas, located in the southern portion of the forest, offer quieter settings centered around smaller Forest Service-managed lakes, popular for kayaking, fishing, camping, and relaxation.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Beyond these developed sites, the forest includes additional campgrounds, dispersed recreation areas, and culturally significant sites such as the Pioneer Mothers Memorial Forest and the Lick Creek African American Settlement. Nearby attractions&mdash;including Brown County State Park, Marengo Cave, Lincoln Boyhood Memorial, and the French Lick and West Baden resorts&mdash;further enhance the region&apos;s appeal as a destination.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Hoosier National Forest offers year-round recreation shaped by a four-season climate. Summers are warm and ideal for lake activities, spring brings mild temperatures and seasonal rains, fall is known for vibrant foliage and excellent camping conditions, and winters are generally mild with occasional snowfall.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Through a balance of recreation, conservation, and public stewardship, Hoosier National Forest provides a diverse and accessible outdoor experience, serving both local communities and visitors from across the Midwest.
                </p>
              </div>

              <div className="mt-10 bg-green-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Charles C. Deam Wilderness</h3>
                <p className="text-gray-600 leading-relaxed">
                  At 13,000 acres, the Charles C. Deam Wilderness Area is Indiana&apos;s only federally designated wilderness. Named for Indiana&apos;s first state forester, the area features rugged ridgelines, deep ravines, and old-growth forest remnants along the southern shore of Monroe Lake. No motorized vehicles or mechanized equipment are permitted, preserving a truly wild experience for hikers and backpackers.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Things to Do</h3>
                <ul className="space-y-3">
                  {['Hiking & Backpacking', 'Camping', 'Fishing', 'Swimming', 'Boating & Kayaking', 'Mountain Biking', 'Horseback Riding', 'Rock Climbing', 'Wildlife Watching', 'Hunting'].map((item) => (
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
                <h3 className="text-xl font-bold mb-4">Plan Your Visit</h3>
                <p className="text-white/80 mb-6">
                  Explore three recreation areas offering camping, swimming, fishing, and hundreds of miles of trails in southern Indiana.
                </p>
                <Link
                  href="#recreation-areas"
                  className="block w-full text-center py-4 bg-white text-forest-DEFAULT font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  View Recreation Areas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recreation Areas (Sub-Properties) */}
      <section id="recreation-areas" className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Recreation Areas</h2>
          <p className="text-gray-600 mb-10 max-w-2xl">Three developed recreation areas serve as gateways into Hoosier National Forest, each offering campgrounds, water access, and miles of trails.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {subProperties.map((property) => (
              <Link
                key={property.name}
                href={property.href}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
              >
                <div className="relative h-64">
                  <Image src={property.image} alt={property.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                    {property.badge}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-forest-DEFAULT transition-colors">
                    {property.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{property.description}</p>
                  <span className="inline-flex items-center gap-2 text-forest-DEFAULT font-semibold text-sm">
                    Explore
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Activities</h2>
          <p className="text-gray-600 mb-10 max-w-2xl">200,000 acres of hardwood forests, lakes, and sandstone bluffs provide year-round recreation across southern Indiana.</p>
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

      {/* Scope of Services */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-3xl mb-12">
            <span className="inline-block px-4 py-2 bg-green-600/10 text-green-700 text-sm font-semibold rounded-full mb-4">
              Statement of Work
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Scope of Services</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              BA Services provides comprehensive concession services for the Hoosier National Forest under a U.S. Forest Service contract &mdash; managing the full operation, maintenance, and visitor services across designated campgrounds, cabins, and day-use recreation areas.
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
            Discover Hoosier National Forest
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            200,000 acres of southern Indiana wilderness with three recreation areas, hundreds of miles of trails, and Indiana&apos;s only designated wilderness. Start exploring today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/hardin-ridge-recreation-area"
              className="btn-primary bg-white text-forest-DEFAULT hover:bg-gray-100"
            >
              Hardin Ridge
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/indian-celina-lakes-recreation-area" className="btn-primary bg-white/10 text-white hover:bg-white/20">
              Indian-Celina Lakes
            </Link>
            <Link href="/tipsaw-lake-recreation-area" className="btn-primary bg-white/10 text-white hover:bg-white/20">
              Tipsaw Lake
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
