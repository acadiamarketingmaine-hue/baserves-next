import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Tipsaw Lake Recreation Area | Hoosier National Forest | BA Serves',
  description: 'Explore Tipsaw Lake Recreation Area in Perry County, Indiana. 131-acre lake, 47 campsites across 3 loops, 2 group camps, 5.9-mile hiking trail, swimming beach, and fishing in the Hoosier National Forest.',
  alternates: { canonical: '/tipsaw-lake-recreation-area' },
}

const campingLoops = [
  {
    name: 'Dogwood Loop',
    sites: 14,
    hookups: 'Electric hookups',
    highlight: 'Close to Beach',
    description: 'Fourteen individual campsites with electric hookups, nestled among hardwoods just a short walk from the swimming beach and bathhouse. Ideal for families who want easy access to the water.',
  },
  {
    name: 'Jackpine Loop',
    sites: 23,
    hookups: 'Electric hookups',
    highlight: 'Near Boat Ramp',
    description: 'The largest loop with 23 individual campsites and electric hookups. Located near the boat ramp, making it the perfect base camp for anglers and boaters exploring the 131-acre lake.',
  },
  {
    name: 'Catbrier Loop',
    sites: 10,
    hookups: '50-amp electric & water',
    highlight: 'Full RV Hookups',
    description: 'Ten spacious RV sites equipped with 50-amp electric and water hookups, designed for larger rigs and extended stays. Well-spaced sites with level pads and easy maneuvering.',
  },
]

const groupCamps = [
  {
    name: 'Goldenrod Group Camp',
    capacity: 65,
    description: 'A large group camping area that accommodates up to 65 people, perfect for family reunions, scout troops, church retreats, and corporate team-building events. Features shared facilities in a wooded setting.',
  },
  {
    name: 'Primrose Group Camp',
    capacity: 65,
    description: 'Accommodating up to 65 guests, Primrose offers a secluded group camping experience surrounded by the beauty of the Hoosier National Forest. Ideal for organizations seeking a memorable outdoor gathering.',
  },
]

const campgroundRules = [
  'Electric motors only on Tipsaw Lake — no gas-powered engines permitted.',
  'Quiet hours are 10:00 PM to 6:00 AM. Generators may only be used between 6:00 AM and 10:00 PM.',
  'All pets must be on a leash no longer than 6 feet at all times. Pets are not permitted on the swimming beach.',
  'Fires are allowed only in designated fire rings or grills. Never leave a fire unattended.',
  'Campsites are limited to 8 people and 2 vehicles per site unless otherwise posted.',
  'Check-in time is 2:00 PM. Check-out time is 12:00 PM noon.',
  'Do not carve, cut, or damage any living trees. Collecting dead and downed firewood is permitted.',
  'Pack out all trash and recyclables. Leave your campsite cleaner than you found it.',
  'Swim only in the designated beach area. No lifeguard on duty — swim at your own risk.',
  'Observe all posted speed limits and drive slowly through the campground.',
]

const downloads = [
  { name: 'Tipsaw Lake Map', href: '/downloads/hoosier-national-forest/maps/tipsaw-lake-map.pdf' },
  { name: 'Tipsaw Activity Guide', href: '/downloads/hoosier-national-forest/maps/tipsaw-lake-activity-guide.pdf' },
  { name: 'Tipsaw Lake Brochure', href: '/downloads/hoosier-national-forest/maps/tipsaw-lake-brochure.pdf' },
  { name: 'Trail Systems Map', href: '/downloads/hoosier-national-forest/maps/trail-systems.pdf' },
  { name: 'Recreation Areas Map', href: '/downloads/hoosier-national-forest/maps/recreation-areas.pdf' },
  { name: 'Rules & Regulations', href: '/downloads/hoosier-national-forest/rules-and-regulations.pdf' },
  { name: 'Forest Facts', href: '/downloads/hoosier-national-forest/general-info/forest-facts.pdf' },
  { name: 'FAQ', href: '/downloads/hoosier-national-forest/general-info/faq.pdf' },
]

export default function TipsawLakePage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/DSC_0001-2048x1365.jpg"
            alt="Tipsaw Lake Recreation Area in Hoosier National Forest"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 container-custom px-6 pb-16">
          <span className="inline-block px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full mb-4">
            Hoosier National Forest
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
            Tipsaw Lake Recreation Area
          </h1>
          <div className="flex items-center text-white/80 mb-6">
            <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Perry County, Indiana
          </div>
          <a
            href="https://escape.baserves.com"
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
              { value: '131', label: 'Acres' },
              { value: '47', label: 'Sites' },
              { value: '5.9 mi', label: 'Trail' },
              { value: '2', label: 'Group Camps' },
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
                  Nestled in the rolling hills of Perry County, Indiana, Tipsaw Lake Recreation Area is a serene escape within the Hoosier National Forest. The 131-acre lake, surrounded by dense hardwood forest, offers a peaceful retreat for campers, anglers, swimmers, and hikers looking to disconnect from everyday life.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The lake is reserved exclusively for electric motors, keeping the water calm and the atmosphere tranquil. Anglers will find excellent fishing for bass, bluegill, catfish, and crappie in these undisturbed waters. A boat ramp provides easy access for canoes, kayaks, and small fishing boats.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Three camping loops offer 47 individual sites ranging from tent-friendly electric sites to full-hookup RV pads, while two group camps can host gatherings of up to 65 people each. A 5.9-mile hiking trail loops around the entire lake, offering stunning views of the water and surrounding forest canopy.
                </p>
              </div>

              {/* Fishing callout */}
              <div className="mt-10 bg-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Fishing at Tipsaw Lake</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Tipsaw Lake is home to healthy populations of largemouth bass, bluegill, channel catfish, and crappie. The electric-motors-only rule keeps the lake quiet and undisturbed, creating ideal conditions for both shore fishing and boat angling. Bank fishing spots are accessible near the campground and day-use areas.
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
                <ul className="space-y-3">
                  {[
                    '47 Campsites (3 Loops)',
                    '2 Group Camps (65 each)',
                    'Swimming Beach',
                    'Bathhouse with Warm Showers',
                    'Boat Ramp (Electric Motors Only)',
                    'Fishing (Bass, Bluegill, Catfish)',
                    '5.9-Mile Hiking Trail',
                    'Picnic Shelters',
                    'Day-Use Areas',
                    'Electric Hookups',
                    '50-Amp / Water (Catbrier)',
                  ].map((item) => (
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
                  href="https://escape.baserves.com"
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

      {/* Camping Loops */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Camping Loops</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">47 campsites across three distinct loops, from tent-friendly electric sites near the beach to full-hookup RV pads in the Catbrier Loop.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {campingLoops.map((loop) => (
              <div key={loop.name} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{loop.name}</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                    {loop.sites} Sites
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                    {loop.hookups}
                  </span>
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full">
                    {loop.highlight}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{loop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Group Camping */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Group Camping</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">Two dedicated group camps, each accommodating up to 65 people, ideal for reunions, retreats, and organizational outings.</p>
          <div className="grid md:grid-cols-2 gap-8">
            {groupCamps.map((camp) => (
              <div key={camp.name} className="bg-green-50 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-7 h-7 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{camp.name}</h3>
                    <span className="text-green-700 font-semibold text-sm">Up to {camp.capacity} people</span>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{camp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beach & Recreation */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image src="/images/DSC_0103-2048x1365.jpg" alt="Swimming beach and recreation at Tipsaw Lake" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Beach &amp; Recreation</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Tipsaw Lake&apos;s swimming beach is a highlight of the recreation area, offering a sandy shoreline perfect for families and sunbathers. The adjacent bathhouse features warm showers and changing rooms, so you can rinse off after a swim or a day on the trail.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Beyond the beach, the day-use area includes picnic shelters with tables and grills, making it easy to plan a full day outdoors. Whether you&apos;re hosting a picnic, enjoying a lakeside lunch, or simply relaxing by the water, Tipsaw offers a welcoming setting for all ages.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Swimming Beach', icon: 'M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z' },
                  { label: 'Warm Showers', icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' },
                  { label: 'Picnic Shelters', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                  { label: 'Changing Rooms', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 bg-white rounded-xl p-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                    <span className="text-gray-900 font-medium text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trails */}
      <section className="py-16">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">5.9-Mile Hiking Trail</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The Tipsaw Lake Trail is a 5.9-mile loop that circles the entire lake, winding through a canopy of hardwood forest with periodic views of the water below. The trail passes through rolling terrain typical of the Hoosier National Forest, with gentle climbs and descents that make it accessible for hikers of varying skill levels.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Along the way, you&apos;ll encounter quiet coves, rocky outcrops, and shaded stretches that offer welcome relief on warm days. Wildlife sightings are common — keep an eye out for white-tailed deer, wild turkey, and a variety of songbirds. The trail is well-marked and can be completed in approximately 2.5 to 3.5 hours at a moderate pace.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-green-50 rounded-xl px-4 py-3">
                  <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <div>
                    <div className="text-green-900 font-bold">5.9 Miles</div>
                    <div className="text-green-700 text-xs">Loop Trail</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-4 py-3">
                  <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="text-blue-900 font-bold">2.5 &ndash; 3.5 hrs</div>
                    <div className="text-blue-700 text-xs">Moderate Pace</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 rounded-xl px-4 py-3">
                  <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                  <div>
                    <div className="text-amber-900 font-bold">Lake Views</div>
                    <div className="text-amber-700 text-xs">Full Circumnavigation</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image src="/images/DSC_0110-2048x1365.jpg" alt="Hiking trail around Tipsaw Lake" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Campground Rules */}
      <section className="py-16 bg-amber-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Campground Rules</h2>
          <p className="text-gray-600 mb-8">Please review and follow these rules during your stay at Tipsaw Lake Recreation Area.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {campgroundRules.map((rule, index) => (
              <div key={index} className="flex gap-3 bg-white rounded-xl p-4">
                <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-700 text-xs font-bold">{index + 1}</span>
                </div>
                <p className="text-gray-700 text-sm">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Maps &amp; Resources</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">Download maps, activity guides, and helpful information for planning your visit to Tipsaw Lake and the Hoosier National Forest.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {downloads.map((doc) => (
              <a
                key={doc.name}
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 hover:bg-green-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-200 transition-colors">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-gray-900 font-medium text-sm group-hover:text-green-800 transition-colors">{doc.name}</span>
                  <span className="block text-gray-400 text-xs">PDF</span>
                </div>
              </a>
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
            From quiet fishing on a 131-acre lake to hiking through Indiana&apos;s hardwood forests, Tipsaw Lake Recreation Area offers an unforgettable outdoor experience. Reserve your campsite today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://escape.baserves.com"
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
