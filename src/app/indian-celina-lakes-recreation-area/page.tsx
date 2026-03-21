import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Indian-Celina Lakes Recreation Area | Hoosier National Forest, Indiana | BA Services',
  description: 'Explore Indian-Celina Lakes Recreation Area in Hoosier National Forest. Two scenic lakes with camping, accessible fishing pier, boat launch, and hiking trails.',
  alternates: { canonical: '/indian-celina-lakes-recreation-area' },
}

const facilities = [
  {
    name: 'Accessible Fishing Pier',
    description: 'Celina Lake features a fully accessible fishing pier, making it easy for anglers of all abilities to cast a line and enjoy the calm waters stocked with bass, bluegill, and catfish.',
    image: '/images/indian-celina/fishing-pier.jpg',
  },
  {
    name: 'Campground',
    description: 'Multiple loops of well-maintained campsites are nestled among mature hardwoods, offering a mix of shaded and open sites with fire rings, picnic tables, and lantern posts.',
    image: '/images/indian-celina/campsite1.jpg',
  },
  {
    name: 'Boat Launch',
    description: 'Indian Lake provides a boat launch for canoes, kayaks, and small watercraft. Electric motors only are permitted, keeping the lake peaceful and pristine for all visitors.',
    image: '/images/indian-celina/boat-launch.jpg',
  },
  {
    name: 'Restroom & Shower House',
    description: 'Modern restroom and shower house facilities are centrally located within the campground, providing hot showers, flush toilets, and accessible stalls for camper convenience.',
    image: '/images/indian-celina/shower-house.jpg',
  },
]

const activities = [
  {
    name: 'Hiking',
    description: 'The Two Lakes Loop trail winds between Indian Lake and Celina Lake through rolling hills and hardwood forest, offering scenic views and a moderate trek through the heart of the recreation area.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    name: 'Fishing',
    description: 'Both lakes offer excellent fishing opportunities. Celina Lake features an accessible fishing pier, while Indian Lake provides shoreline access for bass, bluegill, catfish, and panfish.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    name: 'Boating',
    description: 'Bring your canoe, kayak, or small electric-motor boat to Indian Lake. The quiet-water policy keeps the lake serene and perfect for a peaceful paddle through forested shorelines.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      </svg>
    ),
  },
  {
    name: 'Camping',
    description: 'Multiple campground loops offer sites for tents and RVs among mature hardwood forest. Each site includes a fire ring and picnic table, with modern shower facilities nearby.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: 'Wildlife Watching',
    description: 'The surrounding Hoosier National Forest teems with wildlife. White-tailed deer, wild turkey, barred owls, and a wide variety of songbirds call these woods home year-round.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
]

const galleryPhotos = [
  { src: '/images/indian-celina/lake-aerial.jpg', alt: 'Aerial view of Indian-Celina Lakes' },
  { src: '/images/indian-celina/fishing-pier.jpg', alt: 'Accessible Fishing Pier on Celina Lake' },
  { src: '/images/indian-celina/boat-launch.jpg', alt: 'Boat launch on Indian Lake' },
  { src: '/images/indian-celina/campsite1.jpg', alt: 'Campsite among the hardwoods' },
  { src: '/images/indian-celina/campsite2.jpg', alt: 'Campsite with fire ring' },
  { src: '/images/indian-celina/entrance.jpg', alt: 'Indian-Celina Lakes entrance sign' },
  { src: '/images/indian-celina/gatehouse.jpg', alt: 'Entrance gatehouse' },
  { src: '/images/indian-celina/shower-house.jpg', alt: 'Restroom and shower house' },
  { src: '/images/indian-celina/trail-sign.jpg', alt: 'Two Lakes Loop trail sign' },
  { src: '/images/indian-celina/lake-view.jpg', alt: 'Scenic lake view' },
]

export default function IndianCelinaLakesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/indian-celina/lake-aerial.jpg"
            alt="Indian-Celina Lakes Recreation Area, Hoosier National Forest, Indiana"
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
            Indian-Celina Lakes Recreation Area
          </h1>
          <div className="flex items-center text-white/80 mb-2">
            <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Perry County, Southern Indiana
          </div>
          <Link href="/hoosier-national-forest" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-6">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Part of Hoosier National Forest
          </Link>
          <div className="block">
            <a
              href="https://www.recreation.gov/camping/campgrounds/232027"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-forest-DEFAULT text-white font-semibold rounded-lg hover:bg-forest-dark transition-colors"
            >
              Reserve on Recreation.gov
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
              { value: '2', label: 'Lakes' },
              { value: '80+', label: 'Campsites' },
              { value: 'Trail', label: 'Loops' },
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Indian-Celina Lakes</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Tucked into the hills of southern Indiana&apos;s Perry County, Indian-Celina Lakes Recreation Area is one of the Hoosier National Forest&apos;s best-kept secrets. Two scenic lakes &mdash; Indian Lake and Celina Lake &mdash; anchor a peaceful campground surrounded by dense hardwood forest, rolling terrain, and abundant wildlife.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The recreation area offers a genuinely tranquil experience compared to more heavily visited sites in the forest. Whether you&apos;re casting from the accessible fishing pier on Celina Lake, paddling Indian Lake under a canopy of trees, or hiking the Two Lakes Loop trail that connects both waterbodies, the pace here is slower and the crowds are thinner.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Multiple campground loops wind through mature forest, providing well-spaced sites with fire rings and picnic tables. Modern restroom and shower house facilities make extended stays comfortable, while the gatehouse entrance adds a sense of arrival to this quiet corner of the Hoosier National Forest.
                </p>
              </div>

              <div className="mt-10 bg-green-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Two Lakes, One Destination</h3>
                <p className="text-gray-600 leading-relaxed">
                  Indian Lake and Celina Lake each offer a distinct character. Indian Lake is the larger of the two, featuring a boat launch for canoes, kayaks, and electric-motor watercraft. Celina Lake is smaller and quieter, anchored by its fully accessible fishing pier &mdash; a favorite among families and anglers who appreciate the easy shoreline access and consistently good fishing for bass, bluegill, and catfish.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Things to Do</h3>
                <ul className="space-y-3">
                  {['Hiking (Two Lakes Loop)', 'Fishing', 'Boating & Paddling', 'Camping', 'Wildlife Watching', 'Photography', 'Picnicking', 'Nature Study'].map((item) => (
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
                  Reserve a campsite at Indian-Celina Lakes Recreation Area and enjoy the peaceful side of Hoosier National Forest.
                </p>
                <a
                  href="https://www.recreation.gov/camping/campgrounds/232027"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-4 bg-white text-forest-DEFAULT font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Reserve on Recreation.gov
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
          <p className="text-gray-600 mb-10 max-w-2xl">Well-maintained amenities make Indian-Celina Lakes a comfortable base camp for exploring the Hoosier National Forest.</p>

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
          <p className="text-gray-600 mb-10 max-w-2xl">Two lakes, forested trails, and quiet woodlands provide year-round recreation in the heart of southern Indiana.</p>
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
            Discover Indian-Celina Lakes
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Two peaceful lakes, forested campsites, accessible fishing, and miles of trails await in this quiet corner of Hoosier National Forest. Plan your visit today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.recreation.gov/camping/campgrounds/232027"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-white text-forest-DEFAULT hover:bg-gray-100"
            >
              Reserve on Recreation.gov
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <Link href="/hoosier-national-forest" className="btn-primary bg-white/10 text-white hover:bg-white/20">
              Explore Hoosier National Forest
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
