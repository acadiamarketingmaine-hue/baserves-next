import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Yankee Springs Recreation Area | Barry County, Michigan | BA Services',
  description: 'Explore Yankee Springs Recreation Area in Barry County, Michigan. 5,200+ acres, 200+ campsites, 30+ miles of trails, historic CCC cabins, and year-round outdoor recreation.',
  alternates: { canonical: '/yankee-springs-recreation-area' },
}

const lodging = [
  {
    name: 'Hill Cabins',
    description: 'Set among the trees on a wooded hillside, the Hill Cabins offer a quiet, elevated retreat. Built by the CCC in the 1930s, these rustic structures feature native stone and timber construction.',
    image: '/images/yankee-springs/hill-cabins.jpg',
  },
  {
    name: 'Lake Cabins',
    description: 'Positioned along the waterfront, the Lake Cabins provide direct lake views and quick access to the dock, swimming, and fishing. Ideal for guests who want to wake up steps from the water.',
    image: '/images/yankee-springs/lake-cabins.jpg',
  },
]

const bunkhouses = [
  {
    name: 'Stage House',
    sleeps: 8,
    description: 'Compact bunkhouse suited for small groups with open sleeping quarters.',
    image: '/images/yankee-springs/stage-house.jpg',
  },
  {
    name: 'Road House',
    sleeps: 12,
    description: 'Mid-size bunkhouse great for scout troops and youth groups.',
    image: '/images/yankee-springs/road-house.jpg',
  },
  {
    name: 'Infirmary',
    sleeps: 10,
    description: 'Features its own private bathroom for added comfort and convenience.',
    image: '/images/yankee-springs/infirmary.jpg',
  },
  {
    name: 'Mansion House',
    sleeps: 20,
    description: 'The largest bunkhouse, with a charming fireplace and room for big groups.',
    image: '/images/yankee-springs/mansion-house.jpg',
  },
]

const activities = [
  {
    name: 'Hiking',
    description: 'Over 30 miles of trails wind through forests, wetlands, and glacial landforms. Routes range from easy lakeside walks to rugged backcountry treks.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    name: 'Mountain Biking',
    description: 'Yankee Springs is a premier Michigan mountain biking destination with miles of singletrack through rolling, glacially carved terrain.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: 'Fishing',
    description: 'Multiple lakes offer excellent fishing for bass, bluegill, pike, and panfish. Launch from shore or bring your own boat to explore the water.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    name: 'Swimming',
    description: 'Sandy beaches on Deep Lake and Gun Lake provide refreshing summer swimming with designated swim areas and picnic facilities.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: 'Winter Sports',
    description: 'When snow blankets the landscape, trails open for cross-country skiing, snowshoeing, and fat-tire biking through a winter wonderland.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    name: 'Boating',
    description: 'Bring your canoe, kayak, or small motorboat and explore the recreation area&apos;s lakes. Boat launches are available at multiple access points.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      </svg>
    ),
  },
]

const subProperties = [
  {
    name: 'Chief Noonday Outdoor Center',
    href: '/chief-noonday-outdoor-center',
    description: 'A rustic outdoor center within the recreation area, offering cabins and group camping for youth programs, retreats, and family gatherings.',
    image: '/images/yankee-springs/lake-cabins.jpg',
    badge: 'Outdoor Center',
  },
  {
    name: 'Long Lake Outdoor Center',
    href: '/long-lake-outdoor-center',
    description: 'Historic CCC property with 16 cabins, 4 bunkhouses, a 120-seat lodge, and private lake access. Ideal for weddings, retreats, and group camps.',
    image: '/images/yankee-springs/hill-cabins.jpg',
    badge: 'Historic CCC Property',
  },
]

const galleryPhotos = [
  { src: '/images/yankee-springs/hill-cabins.jpg', alt: 'Historic Hill Cabins at Yankee Springs' },
  { src: '/images/yankee-springs/lake-cabins.jpg', alt: 'Waterfront Lake Cabins' },
  { src: '/images/yankee-springs/mansion-house.jpg', alt: 'Mansion House bunkhouse' },
  { src: '/images/yankee-springs/stage-house.jpg', alt: 'Stage House bunkhouse' },
  { src: '/images/yankee-springs/road-house.jpg', alt: 'Road House bunkhouse' },
  { src: '/images/yankee-springs/infirmary.jpg', alt: 'Infirmary bunkhouse' },
]

export default function YankeeSpringsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/yankee-springs/hill-cabins.jpg"
            alt="Yankee Springs Recreation Area, Michigan"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 container-custom px-6 pb-16">
          <span className="inline-block px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full mb-4">
            Michigan Recreation Area
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
            Yankee Springs Recreation Area
          </h1>
          <div className="flex items-center text-white/80 mb-6">
            <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Barry County, Michigan
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://escape.baserves.com/chief-noonday-outdoor-center"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-forest-DEFAULT text-white font-semibold rounded-lg hover:bg-forest-dark transition-colors"
            >
              Reserve Chief Noonday Outdoor Center
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="https://escape.baserves.com/long-lake-outdoor-center"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
            >
              Reserve Long Lake Outdoor Center
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
              { value: '5,200+', label: 'Acres' },
              { value: '200+', label: 'Campsites' },
              { value: '30+', label: 'Miles Trails' },
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Yankee Springs</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Yankee Springs Recreation Area encompasses more than 5,200 acres in Barry County, Michigan, offering one of the state&apos;s most diverse and historically rich outdoor destinations. Shaped by glacial activity thousands of years ago, the landscape features rolling hills, kettle lakes, bogs, and dense hardwood forests.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The area&apos;s unique geology, formed within the Jackson Interlobe where glaciers once collided, produced a rugged terrain of sandy soils, steep slopes, and scattered lakes. Beginning in the 1930s, the federal Recreational Demonstration Area program&mdash;supported by the National Park Service and constructed in part by the Civilian Conservation Corps&mdash;helped establish Yankee Springs as a model for public recreation and conservation.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Today, Yankee Springs offers more than 30 miles of multi-use trails for hiking, mountain biking, and horseback riding, while over 10 lakes provide opportunities for swimming, fishing, and boating. Two designated swimming areas, accessible fishing piers, and numerous picnic shelters enhance the visitor experience.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  The recreation area features two historic outdoor centers&mdash;Chief Noonday Outdoor Center and Long Lake Outdoor Center&mdash;both originally developed in the 1930s. Notable features include Devil&apos;s Soupbowl, a distinctive glacial formation, and Graves Hill Overlook with sweeping views. Open in all seasons for summer boating to winter sports.
                </p>
              </div>

              <div className="mt-10 bg-green-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Glacial Landscape</h3>
                <p className="text-gray-600 leading-relaxed">
                  Yankee Springs sits within a region shaped by the Wisconsin glaciation. The rolling terrain, kettle lakes, and esker ridges create a varied landscape that supports exceptional biodiversity. Devil&apos;s Soup Bowl &mdash; a deep, bowl-shaped depression formed by a buried ice block &mdash; is one of the park&apos;s most iconic geological features and a must-see stop along the trail system.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Things to Do</h3>
                <ul className="space-y-3">
                  {['Hiking & Backpacking', 'Mountain Biking', 'Fishing', 'Swimming', 'Boating & Kayaking', 'Cross-Country Skiing', 'Snowshoeing', 'Horseback Riding', 'Wildlife Watching', 'Camping'].map((item) => (
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
                  Book a cabin, bunkhouse, or campsite in the Yankee Springs Recreation Area.
                </p>
                <a
                  href="https://escape.baserves.com/chief-noonday-outdoor-center"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 bg-white text-forest-DEFAULT font-semibold rounded-xl hover:bg-gray-100 transition-colors mb-3"
                >
                  Reserve Chief Noonday OC
                </a>
                <a
                  href="https://escape.baserves.com/long-lake-outdoor-center"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
                >
                  Reserve Long Lake OC
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Historic Lodging */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Historic Lodging</h2>
          <p className="text-gray-600 mb-10 max-w-2xl">Stay in cabins and bunkhouses built by the Civilian Conservation Corps in the 1930s, nestled within the recreation area&apos;s forests and lakeshores.</p>

          {/* Cabins */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {lodging.map((cabin) => (
              <div key={cabin.name} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-56">
                  <Image src={cabin.image} alt={cabin.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{cabin.name}</h3>
                  <p className="text-gray-600">{cabin.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bunkhouses */}
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Bunkhouses</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bunkhouses.map((bunk) => (
              <div key={bunk.name} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-40">
                  <Image src={bunk.image} alt={bunk.name} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-gray-900">{bunk.name}</h4>
                    <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded-full">
                      Sleeps {bunk.sleeps}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{bunk.description}</p>
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
          <p className="text-gray-600 mb-10 max-w-2xl">Over 5,200 acres of forests, lakes, and trails provide year-round recreation for every interest and skill level.</p>
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

      {/* Sub-Properties */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Properties at Yankee Springs</h2>
          <p className="text-gray-600 mb-10 max-w-2xl">Two historic outdoor centers within the recreation area offer lodging, event spaces, and group facilities.</p>
          <div className="grid md:grid-cols-2 gap-8">
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
                    Learn More
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

      {/* Photo Gallery */}
      <section className="py-16">
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
            Explore Yankee Springs Recreation Area
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            5,200+ acres of Michigan wilderness with historic cabins, miles of trails, and year-round adventure. Book your stay today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://escape.baserves.com/chief-noonday-outdoor-center"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-white text-forest-DEFAULT hover:bg-gray-100"
            >
              Reserve Chief Noonday Outdoor Center
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="https://escape.baserves.com/long-lake-outdoor-center"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-white/10 text-white hover:bg-white/20"
            >
              Reserve Long Lake Outdoor Center
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
