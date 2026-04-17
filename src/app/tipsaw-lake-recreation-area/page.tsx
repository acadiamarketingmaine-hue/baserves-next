import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Tipsaw Lake Recreation Area | Perry County, Indiana | BA Services',
  description: 'Explore Tipsaw Lake Recreation Area in Hoosier National Forest. 131-acre lake with camping, swimming beach, fishing, amphitheater, and 8+ miles of trails.',
  alternates: { canonical: '/tipsaw-lake-recreation-area' },
}

const facilities = [
  {
    name: 'Swimming Beach',
    description: 'A sandy shoreline on the 131-acre lake with designated swim areas, perfect for families and sunbathers. Adjacent bathhouse provides restrooms and changing rooms.',
    image: '/images/tipsaw-lake/beach.jpg',
  },
  {
    name: 'Catbrier Shelter House',
    description: 'The recently renovated Catbrier shelter provides a covered gathering space with picnic tables and grills, ideal for family reunions, group picnics, and rainy-day gatherings.',
    image: '/images/tipsaw-lake/shelter.jpg',
  },
  {
    name: 'Amphitheater',
    description: 'An outdoor amphitheater with tiered seating hosts ranger-led interpretive programs, nature talks, and community events. A connecting interpretive trail explores the surrounding forest ecology.',
    image: '/images/tipsaw-lake/amphitheater.jpg',
  },
  {
    name: 'Campgrounds',
    description: 'Over 35 campsites spread across three loops accommodate tent campers and RV enthusiasts alike, with electric hookups and well-spaced pads nestled among hardwood forest.',
    image: '/images/tipsaw-lake/campsite1.jpg',
  },
]

const activities = [
  {
    name: 'Hiking',
    description: 'Over 8 miles of trails wind through rolling hardwood forests and along the lake shore, including the 5.9-mile Tipsaw Lake Trail loop with stunning water views at every turn.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    name: 'Fishing',
    description: 'Tipsaw Lake supports healthy populations of largemouth bass, bluegill, channel catfish, and crappie. The electric-motors-only rule keeps the water calm and undisturbed for anglers.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    name: 'Swimming',
    description: 'Cool off at the designated swimming beach with a sandy shoreline and shallow entry, great for families with children. Bathhouse with restrooms and changing rooms nearby.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: 'Boating',
    description: 'Launch canoes, kayaks, and small fishing boats from the boat ramp. Electric motors only are permitted on the lake, preserving a peaceful atmosphere on the water.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      </svg>
    ),
  },
  {
    name: 'Camping',
    description: 'Choose from over 35 sites across three loops: tent-friendly electric sites near the beach, shaded woodland spots, and full-hookup RV pads with 50-amp service and water.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: 'Picnicking',
    description: 'Covered shelters with tables and grills dot the day-use area, making it easy to host a lakeside lunch, family cookout, or group gathering surrounded by Indiana hardwoods.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
]

const galleryPhotos = [
  { src: '/images/tipsaw-lake/lake-view.jpg', alt: 'Scenic view of Tipsaw Lake' },
  { src: '/images/tipsaw-lake/beach-swimming.jpg', alt: 'Visitors enjoying the swimming beach' },
  { src: '/images/tipsaw-lake/campsite1.jpg', alt: 'Wooded campsite at Tipsaw Lake' },
  { src: '/images/tipsaw-lake/campsite2.jpg', alt: 'Campsite nestled in the forest' },
  { src: '/images/tipsaw-lake/entrance.jpg', alt: 'Tipsaw Lake Recreation Area entrance sign' },
  { src: '/images/tipsaw-lake/twin-oaks.jpg', alt: 'Twin Oaks facility' },
  { src: '/images/tipsaw-lake/rickenbaugh-house.jpg', alt: 'Historic Rickenbaugh House' },
  { src: '/images/tipsaw-lake/restroom.jpg', alt: 'Modern restroom and shower facility' },
  { src: '/images/tipsaw-lake/amphitheater.jpg', alt: 'Amphitheater with interpretive trail' },
]

export default function TipsawLakePage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/tipsaw-lake/lake-view.jpg"
            alt="Tipsaw Lake Recreation Area in Hoosier National Forest, Perry County, Indiana"
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
            Tipsaw Lake Recreation Area
          </h1>
          <div className="flex items-center text-white/80 mb-2">
            <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Perry County, Indiana
          </div>
          <Link href="/hoosier-national-forest" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-6 text-sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Part of Hoosier National Forest
          </Link>
          <div className="block">
            <a
              href="https://www.recreation.gov/camping/campgrounds/232114"
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
              { value: '131 Acre', label: 'Lake' },
              { value: '35+', label: 'Campsites' },
              { value: '8+', label: 'Miles Trails' },
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Tipsaw Lake</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Tipsaw Lake Recreation Area is a scenic and well-developed destination located in Perry County, Indiana, within Hoosier National Forest. Situated approximately six miles south of Interstate 64 along State Road 37 and about 15 miles north of Tell City, the area is easily accessible while offering a peaceful and secluded forest setting. Located just three miles south of Indian-Celina Lakes Recreation Area, Tipsaw serves a broad regional market, drawing visitors from Indiana, Kentucky, and Ohio, with nearly seven million people within a three-hour drive.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Centered around a 131-acre lake, Tipsaw offers a quiet, family-friendly environment where boating is limited to electric motors, preserving calm waters ideal for fishing, paddling, and swimming. Recognized as one of America&apos;s Top 100 Family Campgrounds, the area provides a well-rounded mix of overnight and day-use opportunities.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Campground Facilities</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The recreation area includes multiple camping options across three primary loops—Jackpine, Dogwood, and Catbrier—along with two group camping areas. Jackpine Loop contains 21 electric sites, while Dogwood Loop offers 14 sites, including a small number with electric service. Both loops include one walk-in campsite and feature paved roads and parking spurs, with each site equipped with a picnic table, fire ring, lantern post, and space for tents or RVs.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The Catbrier RV loop includes 11 sites, including a host site, all with water and electric hookups, and accommodates a wide range of vehicle sizes. Three host sites in Jackpine Loop provide full utility hookups.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Two group camping areas—Primrose and Goldenrod—each accommodate up to 65 people and include electric service, picnic tables, fire rings, lantern posts, water fountains, and vault toilets.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Modern amenities throughout the campground include two flush restroom and shower buildings, additional vault toilets, water fountains, and a conveniently located RV dump station just outside the campground. Trash dumpsters are distributed throughout the recreation area.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Day-Use Amenities</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The day-use area centers around a sandy swimming beach, complete with a modern bathhouse, changing facilities, and nearby playground equipment. A picnic area includes two reservable shelters—one with electric service—along with picnic tables, grills, and restroom facilities.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  A large boat launch with ample parking provides convenient lake access for visitors. The lake itself supports fishing and quiet water recreation, enhancing its appeal for families and casual users.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Trails and Recreation</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Outdoor recreation extends beyond the lake, with the Tipsaw Lake Trail—a 5.7-mile loop—encircling the lake and offering excellent opportunities for hiking and biking through hardwood forest with scenic lake views. Additional trail connections and interpretive opportunities are available nearby, contributing to a broader network of forest exploration.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Access and Operations</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  A gatehouse located along the entrance road manages access to the recreation area. Tipsaw Lake operates seasonally from early April through late October under a Forest Service special use permit.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  With its combination of calm waters, well-maintained facilities, and forested surroundings, Tipsaw Lake Recreation Area offers a balanced and inviting outdoor experience—well-suited for camping, group gatherings, and quiet recreation in southern Indiana.
                </p>
              </div>

              {/* Fishing callout */}
              <div className="mt-10 bg-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Fishing at Tipsaw Lake</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Tipsaw Lake is home to healthy populations of largemouth bass, bluegill, channel catfish, and crappie. The electric-motors-only rule keeps the lake quiet and undisturbed, creating ideal conditions for both shore fishing and boat angling. Bank fishing spots are accessible near the campground and day-use areas, and a boat ramp provides easy launch access for canoes, kayaks, and small fishing boats.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Largemouth Bass', 'Bluegill', 'Channel Catfish', 'Crappie'].map((fish) => (
                    <span key={fish} className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium text-blue-800">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {fish}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Things to Do</h3>
                <ul className="space-y-3">
                  {['Hiking & Trail Running', 'Fishing (Bass, Bluegill, Catfish)', 'Swimming Beach', 'Boating & Kayaking', 'Camping (Tent & RV)', 'Picnicking & Shelters', 'Amphitheater Programs', 'Playground', 'Wildlife Watching', 'Photography'].map((item) => (
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
                  Reserve your campsite at Tipsaw Lake Recreation Area and experience the beauty of Indiana&apos;s Hoosier National Forest.
                </p>
                <a
                  href="https://www.recreation.gov/camping/campgrounds/232114"
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
          <p className="text-gray-600 mb-10 max-w-2xl">From a sandy swimming beach to a renovated shelter house, Tipsaw Lake provides well-maintained facilities throughout the recreation area.</p>
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

          {/* Additional Facilities */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-40">
                <Image src="/images/tipsaw-lake/twin-oaks.jpg" alt="Twin Oaks facility" fill className="object-cover" />
              </div>
              <div className="p-5">
                <h4 className="text-lg font-bold text-gray-900 mb-1">Twin Oaks</h4>
                <p className="text-gray-600 text-sm">A versatile gathering space available for events, group meetings, and community programs within the recreation area.</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-40">
                <Image src="/images/tipsaw-lake/rickenbaugh-house.jpg" alt="Historic Rickenbaugh House" fill className="object-cover" />
              </div>
              <div className="p-5">
                <h4 className="text-lg font-bold text-gray-900 mb-1">Rickenbaugh House</h4>
                <p className="text-gray-600 text-sm">A historic building within the recreation area that reflects the rich heritage of Perry County and the Hoosier National Forest.</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-40">
                <Image src="/images/tipsaw-lake/restroom.jpg" alt="Restroom and shower facility" fill className="object-cover" />
              </div>
              <div className="p-5">
                <h4 className="text-lg font-bold text-gray-900 mb-1">Restrooms &amp; Showers</h4>
                <p className="text-gray-600 text-sm">Modern restroom and shower facilities with warm water, conveniently located near campsites and the swimming beach.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Activities</h2>
          <p className="text-gray-600 mb-10 max-w-2xl">A 131-acre lake, over 8 miles of trails, and the forests of the Hoosier National Forest provide year-round recreation for every interest.</p>
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
            Escape to Tipsaw Lake
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            A 131-acre lake, sandy swimming beach, over 8 miles of trails, and the tranquility of Indiana&apos;s Hoosier National Forest. Reserve your campsite today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.recreation.gov/camping/campgrounds/232114"
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
