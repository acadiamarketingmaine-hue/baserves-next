import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Long Lake Outdoor Center | Yankee Springs, Michigan | BA Services',
  description: 'Historic CCC-built outdoor center in Yankee Springs Recreation Area. 16 cabins, 4 bunkhouses, 120-seat lodge with stone fireplaces, commercial kitchen, and private lake access. Weddings, retreats, and group camps year-round.',
  alternates: { canonical: '/long-lake-outdoor-center' },
}

const bunkhouses = [
  {
    name: 'Stage House',
    sleeps: 8,
    description: 'Cozy bunkhouse ideal for small groups, with open sleeping quarters and easy access to the lodge and lake.',
    highlight: null,
  },
  {
    name: 'Road House',
    sleeps: 12,
    description: 'Mid-size bunkhouse perfect for scout troops, youth groups, or extended families looking for shared accommodations.',
    highlight: null,
  },
  {
    name: 'Infirmary',
    sleeps: 10,
    description: 'Features its own private bathroom, making it a great choice for families or groups needing additional comfort and convenience.',
    highlight: 'Private bathroom',
  },
  {
    name: 'Mansion House',
    sleeps: 20,
    description: 'The largest bunkhouse on the property, featuring a charming fireplace and room for big groups. Ideal for reunions and large parties.',
    highlight: 'Fireplace',
  },
]

const amenities = [
  'Private Lake Access',
  'Dock & Waterfront',
  '120-Seat Lodge',
  'Commercial Kitchen',
  '2 Stone Fireplaces',
  '16 Cabins',
  '4 Bunkhouses',
  'Year-Round Facility',
  'ADA Accessible',
]

const eventTypes = [
  {
    name: 'Weddings',
    description: '$2,800 for a 2-night rental. Ceremony and reception spaces with lakeside views, historic lodge, and full catering kitchen.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    name: 'Group Camps',
    description: 'Accommodate up to 120 guests across cabins and bunkhouses. Perfect for scout troops, church groups, and outdoor education programs.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    name: 'Retreats',
    description: 'A secluded, historic setting for corporate retreats, team-building events, and wellness getaways surrounded by nature.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: 'Family Reunions',
    description: 'Bring the whole family together in a lakeside setting with plenty of room, shared meals in the lodge, and outdoor activities for all ages.',
    icon: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
]

const downloads = [
  { name: 'About Us', file: '/downloads/long-lake/about-us.pdf', description: 'Learn about the history and mission of Long Lake Outdoor Center.' },
  { name: 'Camp Rules', file: '/downloads/long-lake/camp-rules.pdf', description: 'Rules and guidelines for your stay.' },
  { name: 'Group Camps', file: '/downloads/long-lake/group-camps.pdf', description: 'Information and pricing for group camp bookings.' },
  { name: 'Rentals', file: '/downloads/long-lake/rentals.pdf', description: 'Cabin, bunkhouse, and facility rental details.' },
  { name: 'Weddings', file: '/downloads/long-lake/weddings.pdf', description: 'Wedding packages, pricing, and venue details.' },
]

const galleryPhotos = [
  { src: '/images/long-lake/fall-aerial.jpg', alt: 'Aerial view of Long Lake Outdoor Center in fall' },
  { src: '/images/long-lake/lodge.jpg', alt: 'The historic lodge at Long Lake' },
  { src: '/images/long-lake/cabins.jpg', alt: 'CCC-built cabins at Long Lake' },
  { src: '/images/long-lake/lake.jpg', alt: 'Long Lake waterfront' },
  { src: '/images/long-lake/wedding-ceremony.jpg', alt: 'Wedding ceremony at Long Lake' },
  { src: '/images/long-lake/dock.jpg', alt: 'Dock on Long Lake' },
  { src: '/images/long-lake/kitchen.jpg', alt: 'Commercial kitchen in the lodge' },
  { src: '/images/long-lake/interior.jpg', alt: 'Lodge interior with stone fireplace' },
  { src: '/images/long-lake/grounds.jpg', alt: 'Grounds and pathways at Long Lake' },
  { src: '/images/long-lake/bathhouse.jpg', alt: 'Historic bathhouse' },
  { src: '/images/long-lake/biking.jpg', alt: 'Biking trails near Long Lake' },
  { src: '/images/long-lake/winter.jpg', alt: 'Long Lake Outdoor Center in winter' },
]

const scopeOfWork = [
  {
    title: 'Facility Operations & Guest Services',
    description: 'BA Services manages all daily operations to ensure a seamless and enjoyable visitor experience.',
    items: [
      'Managing reservations and guest check-in processes',
      'Providing customer service and visitor assistance',
      'Overseeing lodging accommodations, cabins, and group-use facilities',
      'Coordinating events, group rentals, and recreational activities',
    ],
  },
  {
    title: 'Restoration & Facility Readiness',
    description: 'Bringing facilities back into safe, usable conditions while preserving their historic character.',
    items: [
      'Assessing existing structures and identifying repair needs',
      'Developing and submitting project plans for cabins and buildings',
      'Coordinating improvements to restore facilities for public use',
      'Addressing safety concerns and infrastructure limitations (e.g., water systems, structural repairs)',
    ],
  },
  {
    title: 'Maintenance & Repairs',
    description: 'Maintaining all buildings, systems, and equipment across both sites to keep facilities safe and operational.',
    items: [
      'Routine inspections and preventative maintenance',
      'Repairs to electrical, plumbing, HVAC, and mechanical systems',
      'Emergency response to facility or safety issues',
      'Securing buildings and monitoring safety systems',
    ],
  },
  {
    title: 'Groundskeeping & Sanitation',
    description: 'Maintaining the appearance and cleanliness of the property as a daily priority.',
    items: [
      'Landscaping, mowing, and vegetation management',
      'Trash removal and site cleanup',
      'Cleaning restrooms, common areas, and outdoor spaces',
      'Supporting event setup and site logistics',
    ],
  },
  {
    title: 'Staffing & On-Site Management',
    description: 'Trained personnel covering all functional areas with cross-trained support for efficiency and responsiveness.',
    items: [
      'Area Manager overseeing overall operations and compliance',
      'Maintenance staff handling repairs and infrastructure',
      'Grounds and janitorial teams maintaining cleanliness',
      'Administrative staff supporting reservations and guest services',
    ],
  },
  {
    title: 'Lease Compliance & Stewardship',
    description: 'Full responsibility for operations, compliance, and stewardship of state-owned assets.',
    items: [
      'Retains sole control and management of the premises',
      'Ensures compliance with all DNR rules, state laws, and lease requirements',
      'Protects natural, cultural, and historic resources',
      'Coordinates with the DNR on improvements and long-term planning',
    ],
  },
]

export default function LongLakePage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/long-lake/fall-aerial.jpg"
            alt="Long Lake Outdoor Center aerial view in autumn"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 container-custom px-6 pb-16">
          <span className="inline-block px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full mb-4">
            Historic CCC Property
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
            Long Lake Outdoor Center
          </h1>
          <div className="flex items-center text-white/80 mb-6">
            <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Yankee Springs, Michigan
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
              { value: '120', label: 'Capacity' },
              { value: '16', label: 'Cabins' },
              { value: '4', label: 'Bunkhouses' },
              { value: '1939', label: 'Est.' },
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Long Lake Outdoor Center</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Long Lake Outdoor Center is a historic group retreat facility located within Yankee Springs Recreation Area in Barry County, Michigan. Situated along the eastern shore of Long Lake, a 146-acre lake, the center offers a scenic and well-preserved setting.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Originally constructed in 1939 by the Civilian Conservation Corps as part of the National Park Service&apos;s Recreation Demonstration Area program, Long Lake Outdoor Center is listed on the National Register of Historic Places.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The center accommodates approximately 120 people with 16 cabins divided between the Hill Unit and the Lake Unit, four bunkhouses, and a central lodge with dining space. A commercial kitchen supports group meals and catering. The Hill Unit features cabins in a semi-circle around a central fire pit. The Lake Unit is set near the shoreline with cabins overlooking the lake.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Long Lake Outdoor Center operates year-round with swimming, fishing, and hiking in warmer months, vibrant fall foliage, and cross-country skiing and snowshoeing in winter.
                </p>
              </div>

              {/* CCC History Callout */}
              <div className="mt-10 bg-amber-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">A Legacy of the CCC</h3>
                <p className="text-gray-600 leading-relaxed">
                  The Civilian Conservation Corps constructed Long Lake Outdoor Center in 1939 as part of Franklin Roosevelt&apos;s New Deal. Young men enrolled in the CCC built the cabins, lodge, and bathhouse using native stone and timber harvested from the surrounding forest. The property&apos;s enduring craftsmanship earned it a place on the National Registry of Historic Sites &mdash; a testament to the skill and dedication of the workers who shaped it nearly a century ago.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
                <ul className="space-y-3">
                  {amenities.map((amenity) => (
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
                <h3 className="text-xl font-bold mb-4">Plan Your Event</h3>
                <p className="text-white/80 mb-6">
                  From weddings to group camps, Long Lake Outdoor Center is the perfect setting for your next gathering.
                </p>
                <a
                  href="https://escape.baserves.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-4 bg-white text-forest-DEFAULT font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Check Availability
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lodging */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Lodging</h2>
          <p className="text-gray-600 mb-10 max-w-2xl">16 cabins and 4 bunkhouses accommodate up to 120 guests in a range of historic, CCC-built structures.</p>

          {/* Cabins */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-56">
                <Image src="/images/long-lake/cabins.jpg" alt="Hill Cabins at Long Lake Outdoor Center" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Hill Cabins</h3>
                <p className="text-gray-600">
                  Perched on a wooded hillside above the lake, the Hill Cabins offer a shaded, secluded setting with easy access to the lodge and communal areas. Built with CCC-era stone and timber construction.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-56">
                <Image src="/images/long-lake/lake.jpg" alt="Lake Cabins at Long Lake Outdoor Center" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Lake Cabins</h3>
                <p className="text-gray-600">
                  Situated along the waterfront, the Lake Cabins provide direct views of Long Lake and quick access to the dock, swimming area, and waterfront activities.
                </p>
              </div>
            </div>
          </div>

          {/* Bunkhouses */}
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Bunkhouses</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {bunkhouses.map((bunk) => (
              <div key={bunk.name} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold text-gray-900">{bunk.name}</h4>
                  <span className="text-sm font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full">
                    Sleeps {bunk.sleeps}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{bunk.description}</p>
                {bunk.highlight && (
                  <div className="mt-3 flex items-center text-sm text-amber-700">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    {bunk.highlight}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Lodge */}
      <section className="py-16">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden">
              <Image src="/images/long-lake/lodge.jpg" alt="The Lodge at Long Lake Outdoor Center" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Lodge</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The centerpiece of Long Lake Outdoor Center, the Lodge seats 120 in a grand great room anchored by two massive stone fireplaces. Original CCC stonework and exposed timber beams give the space a warm, rustic character that makes every gathering feel special.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                A full commercial kitchen adjoins the great room, supporting catered meals, potluck dinners, and self-service group cooking. Whether you&apos;re hosting a wedding reception, a corporate retreat, or a camp-wide meal, the Lodge provides the space and atmosphere to bring people together.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-forest-DEFAULT">120</div>
                  <div className="text-gray-500 text-xs mt-1">Seats</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-forest-DEFAULT">2</div>
                  <div className="text-gray-500 text-xs mt-1">Stone Fireplaces</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-forest-DEFAULT">Full</div>
                  <div className="text-gray-500 text-xs mt-1">Commercial Kitchen</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weddings & Events */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Weddings &amp; Events</h2>
          <p className="text-gray-600 mb-10 max-w-2xl">Long Lake Outdoor Center is one of Michigan&apos;s most unique event venues &mdash; a historic lakeside property with lodging, dining, and ceremony spaces all in one place.</p>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image src="/images/long-lake/wedding-ceremony.jpg" alt="Wedding ceremony at Long Lake Outdoor Center" fill className="object-cover" />
            </div>
            <div>
              <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Wedding Package</h3>
                    <span className="text-green-700 font-semibold">$2,800 for 2-night rental</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Exchange vows on the lakefront or beneath the trees, then celebrate in the 120-seat lodge with its stone fireplaces and rustic charm. The 2-night rental includes exclusive use of the entire property &mdash; cabins, bunkhouses, lodge, kitchen, and grounds &mdash; so your guests can stay on-site for a true destination wedding.
                </p>
              </div>
              <p className="text-gray-600 text-sm">
                Download the <a href="/downloads/long-lake/weddings.pdf" className="text-forest-DEFAULT font-semibold hover:underline">wedding packet</a> for full details on ceremony locations, catering options, and rental inclusions.
              </p>
            </div>
          </div>

          {/* Event Types */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventTypes.map((event) => (
              <div key={event.name} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  {event.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{event.name}</h3>
                <p className="text-gray-600 text-sm">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Photo Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryPhotos.map((photo, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources & Downloads */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Resources &amp; Downloads</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">Download our guides for detailed information on rates, event planning, and camp rules.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {downloads.map((doc) => (
              <a
                key={doc.name}
                href={doc.file}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-forest-DEFAULT transition-colors">{doc.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">{doc.description}</p>
                    <span className="inline-flex items-center gap-1 text-forest-DEFAULT text-sm font-medium mt-2">
                      Download PDF
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Scope of Services */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-3xl mb-12">
            <span className="badge bg-forest-DEFAULT/10 text-forest-DEFAULT mb-4">Concession Management</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Scope of Services</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              BA Services serves as the contracted concessionaire for the Long Lake and Chief Noonday Outdoor Centers, operating under a lease with the Michigan Department of Natural Resources. The company is responsible for the restoration, operation, maintenance, and day-to-day management of these historic recreation facilities.
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
            Host Your Next Event at Long Lake
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            A historic CCC property with private lake access, lodging for 120, and year-round availability. Start planning your wedding, retreat, or group camp today.
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
            <Link href="/yankee-springs-recreation-area" className="btn-primary bg-white/10 text-white hover:bg-white/20">
              Explore Yankee Springs
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
