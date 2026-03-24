import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Burlingame State Park & Campground | Rhode Island | BA Services',
  description: 'Explore Burlingame State Park in Charlestown, RI. 755 campsites, 20 rustic cabins, Watchaug Pond swimming, hiking trails, and a rich history dating back to 1702.',
  alternates: { canonical: '/experiences/burlingame-state-park' },
}

const campAreas = [
  { name: 'Main Camp Area', description: 'Central camping area with a variety of site types close to the park entrance and facilities.' },
  { name: '400 Area', description: 'West-central area with sites for tents, small trailers, and large RVs.' },
  { name: '500 Area', description: 'Southwest section featuring a yurt and sites along Fish Camp Road.' },
  { name: 'Legiontown Camp Area', description: 'Southeast area with the camp store, recreation building, athletic field, basketball and volleyball courts, cabins, and playground.' },
  { name: 'Mills Camp Area', description: 'Southern area with well-spaced sites along Burlingame Park Road.' },
  { name: 'Fish Camp Area', description: 'Northeast area near Watchaug Pond, popular with anglers.' },
]

const wildlife = {
  mammals: ['White-tailed deer', 'Eastern cottontail', 'Gray squirrel', 'Eastern chipmunk', 'Muskrat', 'Mink', 'Raccoon', 'Red fox', 'River otter', 'Short-tailed weasel'],
  birds: ['Canada Goose', 'Wood duck', 'Broad-winged hawk', 'Great horned owl', 'Downy woodpecker', 'Blue jay', 'White-breasted nuthatch', 'House wren', 'Hermit thrush', 'Cedar waxwing', 'Red-eyed vireo', 'Ovenbird', 'Scarlet tanager', 'Chipping sparrow', 'Wintering bald eagles on Watchaug Pond'],
  reptiles: ['Wood frog', 'Spring peeper', 'Green frog', 'Redback salamander', 'Spotted salamander', 'Eastern box turtle', 'Northern water snake', 'Eastern garter snake'],
}

const cabinInfo = [
  'Cabins are rustic with no utilities (no water or electric)',
  'Two bunk beds with springs/board base — mattresses and bedding NOT provided',
  'Air mattresses are strongly recommended',
  'Maximum 4 persons per cabin; cabin sites limited to 6 persons total',
  'One tent per cabin is allowed',
  'Located in the Legiontown Camp Area (Cabins C, F, H, I, J, K)',
]

const keyPolicies = [
  { title: 'Check In / Check Out', detail: 'Check-in: 1:00 PM | Check-out: 11:00 AM' },
  { title: 'Quiet Hours', detail: '10:00 PM to 7:00 AM' },
  { title: 'Minimum Stay', detail: '2 nights during Peak Season (Memorial Day to Labor Day); 3 nights on holiday weekends' },
  { title: 'Maximum Stay', detail: '14 nights during Peak Season; 21 nights during Off-Peak' },
  { title: 'Pets', detail: 'Cats and dogs welcome (max 2 per site). Must be leashed at all times. Rabies vaccination required. Not permitted at RI State Beaches.' },
  { title: 'Alcohol', detail: 'No alcoholic beverages permitted in the campground.' },
  { title: 'Firewood', detail: 'Do not bring firewood from out of state — buy local to prevent spread of invasive pests.' },
  { title: 'Reservations', detail: 'Up to 12 months in advance. Same-day reservations available before 12:00 PM directly at the campground.' },
  { title: 'Age Requirement', detail: 'Must be 18+ to rent a campsite. Under 18 must be accompanied by an adult.' },
  { title: 'Occupancy', detail: 'One family per campsite. Non-family groups limited to 6 persons per site. First night occupancy required.' },
]

export default function BurlingamePage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/Burlingame1-2048x1365.jpg"
            alt="Burlingame State Park & Campground"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 container-custom px-6 pb-16">
          <span className="inline-block px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full mb-4">
            Rhode Island State Parks
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
            Burlingame State Park
          </h1>
          <div className="flex items-center text-white/80 mb-6">
            <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Charlestown, Rhode Island
          </div>
          <a
            href="https://www.reserveamerica.com/explore/burlingame-state-park/RI/252711/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-forest-DEFAULT text-white font-semibold rounded-lg hover:bg-forest-dark transition-colors"
          >
            Reserve Burlingame
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
              { value: '755', label: 'Campsites' },
              { value: '20', label: 'Cabins' },
              { value: '3,100+', label: 'Acres' },
              { value: '1934', label: 'Established' },
              { value: '6', label: 'Camp Areas' },
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Burlingame</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Burlingame State Park encompasses over 3,100 acres in Charlestown, Rhode Island, making it the state&apos;s largest camping facility. Named after Edwin A. Burlingame, the long-standing chair of the Metropolitan Park Commission, the park has evolved from a wildlife preserve in 1930 to Rhode Island&apos;s premier campground with 755 campsites and 20 rustic cabins.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Located next to Watchaug Pond, the spacious campground features a boat ramp, freshwater beach, hiking trails, playground, and a recreation center with arcade games. Six distinct camping areas — Main Camp, 400 Area, 500 Area, Legiontown, Mills Camp, and Fish Camp — offer sites for tents, small trailers, large RVs, and motorhomes.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  The area north of Buckeye Brook Road, abutting the Pawcatuck River, is primarily a hunting area. Watchaug Pond has become notable in recent years as a place to spot wintering bald eagles.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Activities</h3>
                <ul className="space-y-3">
                  {['755 Campsites', '20 Rustic Cabins', 'Freshwater Swimming', 'Fishing', 'Boating', 'Hiking Trails', 'Playground', 'Athletic Field', 'Basketball & Volleyball', 'Camp Store', 'Recreation Center'].map((item) => (
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
                <h3 className="text-xl font-bold mb-4">Contact</h3>
                <p className="text-white/80 mb-2">1 Burlingame State Park Road</p>
                <p className="text-white/80 mb-4">Charlestown, RI 02813</p>
                <a href="tel:+14013227337" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (401) 322-7337
                </a>
                <a
                  href="https://www.reserveamerica.com/explore/burlingame-state-park/RI/252711/overview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-4 bg-white text-forest-DEFAULT font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Reserve Burlingame
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 bg-amber-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">A Rich History</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Early Origins (1702&ndash;1930)</h3>
                <p className="text-gray-600 leading-relaxed">
                  For nearly two centuries, the area along Rhode Island&apos;s Atlantic coast was home to the Narragansett Planters — large farms raising sheep, cattle, and the famous Narragansett Pacer horses. The shoreline crescent of sandy beaches backed by salt ponds went largely unappreciated for recreation until the late 19th century. Following the Audubon Society&apos;s creation of the Kimball Wildlife Sanctuary in 1927, the Metropolitan Park Commission began acquiring woodland around Watchaug Pond.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Becoming a State Park (1930&ndash;1934)</h3>
                <p className="text-gray-600 leading-relaxed">
                  The park was assembled from adjacent parcels, including a private club lodge (Chomowauke Lodge) and 498 acres. U.S. Senator Theodore Francis Green was the last private member. In 1930, the land began as a wildlife preserve; by 1934, it opened as Burlingame State Reservation — Rhode Island&apos;s first camping ground. It was named after Commission chair Edwin A. Burlingame.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">The CCC Era (1933&ndash;1942)</h3>
                <p className="text-gray-600 leading-relaxed">
                  During the Depression, Burlingame became home to the 141st Company of the Civilian Conservation Corps — the first and state headquarters of five CCC camps in Rhode Island. Young men built roads, trails, fireplaces, campsites, and picnic areas, while making recreational improvements to Watchaug Pond beaches. The CCC was disbanded in 1942 to support the war effort.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">World War II &amp; Beyond</h3>
                <p className="text-gray-600 leading-relaxed">
                  Because of its proximity to the Charlestown Naval Air Station, Burlingame served multiple wartime roles: housing Naval personnel, serving as an army camp, a rest stop for British Navy personnel, and even a prisoner of war camp. After the war, &ldquo;Legion Town&rdquo; re-used CCC facilities as an American Legion youth summer camp from 1946 to 1961. For many years, all Christmas trees used at the State House came from Burlingame.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Modern Era (1991&ndash;Present)</h3>
                <p className="text-gray-600 leading-relaxed">
                  A four-phase upgrade of camping sites, sanitary infrastructure, and maintenance amenities began in 1991, using National Park Service grants and state Recreation Area Development Funds to improve facilities dating back to the 1930s. Federal EPA and DEM funds have been used to study Watchaug Pond&apos;s yearly cycle, ensuring the cleanliness of the pond is maintained.
                </p>
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden">
                <Image src="/images/burlingame-aerial.jpg" alt="Aerial view of Burlingame State Park" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Camp Areas */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Camping Areas</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">Six distinct areas across the 3,100-acre park, with sites for tents (A), small trailers (B), large trailers &amp; motorhomes (C/M).</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campAreas.map((area) => (
              <div key={area.name} className="bg-gray-50 rounded-2xl p-6 hover:bg-green-50 transition-colors">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{area.name}</h3>
                <p className="text-gray-600 text-sm">{area.description}</p>
              </div>
            ))}
          </div>
          {/* Campground Map */}
          <div className="mt-8 bg-white rounded-2xl p-4 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 px-2">Campground Map</h3>
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden">
              <Image src="/images/burlingame-map.png" alt="Burlingame State Park campground map" fill className="object-contain bg-white" />
            </div>
            <p className="text-gray-500 text-xs mt-3 px-2">Map legend: A = Tents Only, B = Small Trailers, C = Large Trailers &amp; Motorhomes, M = Motorhomes</p>
          </div>
        </div>
      </section>

      {/* Cabins */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Rustic Cabins</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                20 rustic cabins are located in the Legiontown Camp Area, offering a unique camping experience with a roof over your head. Perfect for those who want to be close to nature without a tent.
              </p>
              <ul className="space-y-3">
                {cabinInfo.map((info, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">{info}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image src="/images/Burlingame2-1536x1152.jpg" alt="Camping at Burlingame" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Wildlife */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Wildlife at Burlingame</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">With 80+ nesting bird species and diverse mammals, reptiles, and amphibians, Burlingame is a wildlife haven.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-green-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Mammals</h3>
              <ul className="space-y-2">
                {wildlife.mammals.map((animal) => (
                  <li key={animal} className="text-gray-600 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-600 rounded-full flex-shrink-0" />
                    {animal}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Birds (80+ nesting species)</h3>
              <ul className="space-y-2">
                {wildlife.birds.map((bird) => (
                  <li key={bird} className="text-gray-600 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                    {bird}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-amber-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Amphibians &amp; Reptiles</h3>
              <ul className="space-y-2">
                {wildlife.reptiles.map((animal) => (
                  <li key={animal} className="text-gray-600 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full flex-shrink-0" />
                    {animal}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Photo Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { src: '/images/Burlingame1-2048x1365.jpg', alt: 'Burlingame State Park entrance' },
              { src: '/images/Burlingame2-1536x1152.jpg', alt: 'Campsite at Burlingame' },
              { src: '/images/burlingame-aerial.jpg', alt: 'Aerial view of Burlingame' },
              { src: '/images/Playground-Gallery-Pic-2048x1365.jpg', alt: 'Playground at Burlingame' },
              { src: '/images/burlingame-map.png', alt: 'Campground map' },
            ].map((photo, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Policies */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Key Campground Policies</h2>
          <p className="text-gray-600 mb-8">Important policies for your visit to Burlingame State Campground.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {keyPolicies.map((policy, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-bold text-gray-900 mb-1">{policy.title}</h3>
                <p className="text-gray-600 text-sm">{policy.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-amber-50 rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">Additional Notes</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>No utilities available in the campground (cabins are rustic with no water or electric).</li>
              <li>Septic dump station available at no charge for registered campers.</li>
              <li>Generators permitted between 8:00 AM and 8:00 PM only.</li>
              <li>No fireworks or firearms permitted. Smoking prohibited within 200 feet of beaches, playgrounds, and facilities.</li>
              <li>All visitors must vacate the campground by 10:00 PM.</li>
              <li>Do not bring firewood from out of state — buy local firewood near the campground.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Resources & Downloads */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Resources &amp; Downloads</h2>
          <p className="text-gray-600 mb-8">Download maps, policies, and other helpful documents for your visit.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Park Map (Color)', file: '/downloads/burlingame-state-park/park-map-color.pdf' },
              { name: 'Campground Reference Map', file: '/downloads/burlingame-state-park/campground-reference-map.pdf' },
              { name: 'Picnic Grove Map', file: '/downloads/burlingame-state-park/picnic-grove-map.pdf' },
              { name: 'Campground Policies', file: '/downloads/burlingame-state-park/campground-policies.pdf' },
            ].map((doc) => (
              <a
                key={doc.name}
                href={doc.file}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
              >
                <svg className="w-8 h-8 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z"/>
                </svg>
                <span className="text-sm font-medium text-gray-900">{doc.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-forest-DEFAULT">
        <div className="container-custom px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-6">
            Experience Rhode Island&apos;s Premier Campground
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            From its CCC-era origins to today, Burlingame State Park offers 755 campsites on the shores of Watchaug Pond. Reserve your spot today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.reserveamerica.com/explore/burlingame-state-park/RI/252711/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-white text-forest-DEFAULT hover:bg-gray-100"
            >
              Reserve Burlingame
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
