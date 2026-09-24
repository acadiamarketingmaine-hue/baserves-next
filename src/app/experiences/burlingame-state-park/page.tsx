import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import {
  CardRow,
  ClosingCta,
  Gallery,
  Hero,
  IconChipList,
  IntroFacts,
  LakesideShell,
  OfficialDisclosure,
  RuledRows,
  SectionActions,
  SectionHeader,
  SplitFeature,
  StickyBooking,
  bandTint,
  bandWhite,
  frame,
  h3,
  mapsUrl,
} from '@/components/property/lakeside'

export const metadata: Metadata = {
  title: { absolute: 'Burlingame State Park & Campground | Rhode Island | BA Services' },
  description: 'Explore Burlingame State Park in Charlestown, RI. 755 campsites, 20 rustic cabins, Watchaug Pond swimming, hiking trails, and a rich history dating back to 1702.',
  alternates: { canonical: '/experiences/burlingame-state-park' },
  openGraph: og('/experiences/burlingame-state-park'),
}

// Matches the Burlingame State Park entry in src/components/PropertyMap.tsx —
// the only place this property's coordinates are published. Never invent a pair.
const COORDS = { lat: 41.38, lng: -71.72 }
const PHONE = '(401) 322-7337'
const RESERVE = { label: 'Reserve Burlingame', url: 'https://www.reserveamerica.com/explore/burlingame-state-park/RI/252711/overview', kind: 'booking' as const }

const stats = [
  { key: 'campsites', value: '755', label: 'Campsites' },
  { key: 'cabins', value: '20', label: 'Cabins' },
  { key: 'acres', value: '3,100+', label: 'Acres' },
  { key: 'established', value: '1934', label: 'Established' },
  { key: 'campAreas', value: '6', label: 'Camp Areas' },
]

const activities = ['755 Campsites', '20 Rustic Cabins', 'Freshwater Swimming', 'Fishing', 'Boating', 'Hiking Trails', 'Playground', 'Athletic Field', 'Basketball & Volleyball', 'Camp Store', 'Recreation Center']

const history = [
  {
    key: 'origins',
    title: 'Early Origins (1702–1930)',
    body: 'For nearly two centuries, the area along Rhode Island’s Atlantic coast was home to the Narragansett Planters — large farms raising sheep, cattle, and the famous Narragansett Pacer horses. The shoreline crescent of sandy beaches backed by salt ponds went largely unappreciated for recreation until the late 19th century. Following the Audubon Society’s creation of the Kimball Wildlife Sanctuary in 1927, the Metropolitan Park Commission began acquiring woodland around Watchaug Pond.',
  },
  {
    key: 'state-park',
    title: 'Becoming a State Park (1930–1934)',
    body: 'The park was assembled from adjacent parcels, including a private club lodge (Chomowauke Lodge) and 498 acres. U.S. Senator Theodore Francis Green was the last private member. In 1930, the land began as a wildlife preserve; by 1934, it opened as Burlingame State Reservation — Rhode Island’s first camping ground. It was named after Commission chair Edwin A. Burlingame.',
  },
  {
    key: 'ccc',
    title: 'The CCC Era (1933–1942)',
    body: 'During the Depression, Burlingame became home to the 141st Company of the Civilian Conservation Corps — the first and state headquarters of five CCC camps in Rhode Island. Young men built roads, trails, fireplaces, campsites, and picnic areas, while making recreational improvements to Watchaug Pond beaches. The CCC was disbanded in 1942 to support the war effort.',
  },
  {
    key: 'wwii',
    title: 'World War II & Beyond',
    body: 'Because of its proximity to the Charlestown Naval Air Station, Burlingame served multiple wartime roles: housing Naval personnel, serving as an army camp, a rest stop for British Navy personnel, and even a prisoner of war camp. After the war, “Legion Town” re-used CCC facilities as an American Legion youth summer camp from 1946 to 1961. For many years, all Christmas trees used at the State House came from Burlingame.',
  },
  {
    key: 'modern',
    title: 'Modern Era (1991–Present)',
    body: 'A four-phase upgrade of camping sites, sanitary infrastructure, and maintenance amenities began in 1991, using National Park Service grants and state Recreation Area Development Funds to improve facilities dating back to the 1930s. Federal EPA and DEM funds have been used to study Watchaug Pond’s yearly cycle, ensuring the cleanliness of the pond is maintained.',
    image: { src: '/images/burlingame-lakefront.png', alt: 'Lakefront at Burlingame State Park' },
  },
]

const campAreas = [
  { key: 'main', title: 'Main Camp Area', body: 'Central camping area with a variety of site types close to the park entrance and facilities.' },
  { key: '400', title: '400 Area', body: 'West-central area with sites for tents, small trailers, and large RVs.' },
  { key: '500', title: '500 Area', body: 'Southwest section featuring a yurt and sites along Fish Camp Road.' },
  { key: 'legiontown', title: 'Legiontown Camp Area', body: 'Southeast area with the camp store, recreation building, athletic field, basketball and volleyball courts, cabins, and playground.' },
  { key: 'mills', title: 'Mills Camp Area', body: 'Southern area with well-spaced sites along Burlingame Park Road.' },
  { key: 'fish', title: 'Fish Camp Area', body: 'Northeast area near Watchaug Pond, popular with anglers.' },
]

const cabinInfo = [
  'No utilities (no water or electric)',
  'Two bunk beds — mattresses and bedding NOT provided',
  'Air mattresses strongly recommended',
  'Max 4 persons per cabin; site limited to 6',
  'One tent per cabin allowed',
  'Legiontown Camp Area (Cabins C, F, H, I, J, K)',
]

const mammals = ['White-tailed deer', 'Eastern cottontail', 'Gray squirrel', 'Eastern chipmunk', 'Muskrat', 'Mink', 'Raccoon', 'Red fox', 'River otter', 'Short-tailed weasel']
const birds = ['Canada Goose', 'Wood duck', 'Broad-winged hawk', 'Great horned owl', 'Downy woodpecker', 'Blue jay', 'White-breasted nuthatch', 'House wren', 'Hermit thrush', 'Cedar waxwing', 'Red-eyed vireo', 'Ovenbird', 'Scarlet tanager', 'Chipping sparrow', 'Wintering bald eagles on Watchaug Pond']
const reptiles = ['Wood frog', 'Spring peeper', 'Green frog', 'Redback salamander', 'Spotted salamander', 'Eastern box turtle', 'Northern water snake', 'Eastern garter snake']

const galleryPhotos = [
  { src: '/images/burlingame-entrance-sign.jpg', alt: 'Burlingame State Park entrance sign' },
  { src: '/images/burlingame-beach.png', alt: 'Beach and swimming at Watchaug Pond' },
  { src: '/images/burlingame-picnic-area.png', alt: 'Picnic area with tables under trees' },
  { src: '/images/burlingame-cabin.png', alt: 'Rustic log cabin at Burlingame' },
  { src: '/images/burlingame-kayaks.png', alt: 'Kayaks on the shore of Watchaug Pond' },
  { src: '/images/burlingame-swimming.png', alt: 'Swimmers at Watchaug Pond beach' },
  { src: '/images/burlingame-lakefront.png', alt: 'Lakefront view with picnic tables' },
]

const keyPolicies = [
  { key: 'checkin', title: 'Check In / Check Out', body: 'Check-in: 1:00 PM | Check-out: 11:00 AM' },
  { key: 'quiet', title: 'Quiet Hours', body: '10:00 PM to 7:00 AM' },
  { key: 'min-stay', title: 'Minimum Stay', body: '2 nights during Peak Season (Memorial Day to Labor Day); 3 nights on holiday weekends' },
  { key: 'max-stay', title: 'Maximum Stay', body: '14 nights during Peak Season; 21 nights during Off-Peak' },
  { key: 'pets', title: 'Pets', body: 'Cats and dogs welcome (max 2 per site). Must be leashed at all times. Rabies vaccination required. Not permitted at RI State Beaches.' },
  { key: 'alcohol', title: 'Alcohol', body: 'No alcoholic beverages permitted in the campground.' },
  { key: 'firewood', title: 'Firewood', body: 'Do not bring firewood from out of state — buy local to prevent spread of invasive pests.' },
  { key: 'reservations', title: 'Reservations', body: 'Up to 12 months in advance. Same-day reservations available before 12:00 PM directly at the campground.' },
  { key: 'age', title: 'Age Requirement', body: 'Must be 18+ to rent a campsite. Under 18 must be accompanied by an adult.' },
  { key: 'occupancy', title: 'Occupancy', body: 'One family per campsite. Non-family groups limited to 6 persons per site. First night occupancy required.' },
]

const additionalNotes = [
  { key: 'utilities', body: 'No utilities available in the campground (cabins are rustic with no water or electric).' },
  { key: 'septic', body: 'Septic dump station available at no charge for registered campers.' },
  { key: 'generators', body: 'Generators permitted between 8:00 AM and 8:00 PM only.' },
  { key: 'fireworks', body: 'No fireworks or firearms permitted. Smoking prohibited within 200 feet of beaches, playgrounds, and facilities.' },
  { key: 'curfew', body: 'All visitors must vacate the campground by 10:00 PM.' },
  { key: 'local-wood', body: 'Do not bring firewood from out of state — buy local firewood near the campground.' },
]

const downloads = [
  { key: 'park-map-color', title: 'Park Map (Color)', href: '/downloads/burlingame-state-park/park-map-color.pdf' },
  { key: 'campground-reference-map', title: 'Campground Reference Map', href: '/downloads/burlingame-state-park/campground-reference-map.pdf' },
  { key: 'picnic-grove-map', title: 'Picnic Grove Map', href: '/downloads/burlingame-state-park/picnic-grove-map.pdf' },
  { key: 'campground-policies', title: 'Campground Policies', href: '/downloads/burlingame-state-park/campground-policies.pdf' },
]

const scopeOfWork = [
  {
    key: 'operations',
    title: 'Full-Service Campground Operations',
    body: 'Day-to-day management of nearly 700 campsites, cabins, restroom facilities, and common-use areas under agreement with RI DEM.',
    items: ['24/7 gatehouse and entrance operations', 'Guest check-in, verification, and security', 'Reservation system management via State platform', 'Staffing and supervision of all operational personnel', 'Customer service aligned with State Park standards', 'Coordination with park officials and law enforcement'],
  },
  {
    key: 'retail',
    title: 'Camp Store & Retail Services',
    body: 'On-site Camp Store providing essential goods, convenience items, and rental services for campers.',
    items: ['Groceries, beverages, ice, and packaged foods', 'Camping supplies such as fuel and basic gear', 'Optional rental services (kayaks, canoes, bicycles)', 'Vending operations and merchandise sales', 'Compliance with state health and safety standards', 'Focus on locally sourced products when possible'],
  },
  {
    key: 'recreation-center',
    title: 'Recreation Center Management',
    body: 'Operation of the campground entertainment hub with family-friendly indoor activities and programming.',
    items: ['Arcade-style games (pinball, video games, air hockey)', 'Flexible recreational programming', 'Safe, family-friendly indoor activity space', 'All programming subject to State approval'],
  },
  {
    key: 'grounds',
    title: 'Grounds Maintenance & Facility Management',
    body: 'Maintaining cleanliness, safety, and functionality across all campground facilities and common areas.',
    items: ['Daily cleaning and housekeeping across campsites and cabins', 'Restroom and shower sanitation (multiple cleanings daily)', 'Trash removal and recycling management', 'Landscaping, mowing, debris removal, and site upkeep', 'Maintenance of concession buildings and equipment'],
  },
  {
    key: 'infrastructure',
    title: 'Infrastructure & Capital Improvements',
    body: 'Direct investment in ongoing campground improvement, modernization, and regulatory compliance.',
    items: ['Annual capital improvement contributions', 'Utilities management for concession facilities', 'Procurement and maintenance of operational equipment', 'Compliance with permitting and building codes'],
  },
  {
    key: 'environmental',
    title: 'Environmental Stewardship & Compliance',
    body: 'Strict adherence to environmental and regulatory standards within the state park environment.',
    items: ['Recycling and waste reduction programs', 'Compliance with state health, safety, and environmental regulations', 'Support for green initiatives and sustainable operations', 'Coordination with DEM on conservation priorities'],
  },
  {
    key: 'financial',
    title: 'Financial & Contractual Responsibilities',
    body: 'Revenue-generating concession agreement aligned with the State’s financial and recreational objectives.',
    items: ['Percentage of gross revenues paid to the State', 'Annual capital improvement funding', 'Full operational cost and staffing coverage', 'Funding of Environmental Police Officer details'],
  },
  {
    key: 'expanded',
    title: 'Expanded Services & Guest Experience',
    body: 'Additional responsibilities under the extended agreement through 2027, including expanded guest services.',
    items: ['Walk-in reservations and check-ins for East Beach Campground', 'Expanded guest services due to State staffing limitations', 'Extended operational coverage and customer access', 'Clean, safe, and well-managed facilities'],
  },
]

export default function BurlingamePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url="/experiences/burlingame-state-park"
        name="Burlingame State Park & Campground | Rhode Island | BA Services"
        crumbName="Burlingame State Park & Campground"
        description="Explore Burlingame State Park in Charlestown, RI. 755 campsites, 20 rustic cabins, Watchaug Pond swimming, hiking trails, and a rich history dating back to 1702."
        image="/images/Burlingame1-2048x1365.jpg"
        crumbs={[{ name: 'Experiences', url: '/experiences' }]}
      />

      <LakesideShell>
        <Hero
          photo={{ src: '/images/Burlingame1-2048x1365.jpg', alt: 'Watchaug Pond at Burlingame State Park & Campground' }}
          eyebrow="Charlestown, Rhode Island"
          title="Burlingame State Park"
          subline="Rhode Island's Premier Campground Since 1934"
          booking={{
            title: 'Burlingame State Park',
            text: 'Burlingame State Park encompasses over 3,100 acres in Charlestown, Rhode Island, making it the state’s largest camping facility.',
            cta: RESERVE,
            phone: PHONE,
          }}
        />

        <IntroFacts eyebrowRule heading="About Burlingame" lead="Rhode Island's largest camping facility, on the shores of Watchaug Pond." facts={stats}>
          <p className="mt-6 text-[16px] leading-[1.65] text-lake-mute md:text-[17px]">
            Named after Edwin A. Burlingame, the long-standing chair of the Metropolitan Park Commission, the park has evolved from a wildlife preserve in 1930 to Rhode Island&apos;s premier campground with 755 campsites and 20 rustic cabins.
          </p>
          <p className="mt-4 text-[16px] leading-[1.65] text-lake-mute md:text-[17px]">
            Located next to Watchaug Pond, the spacious campground features a boat ramp, freshwater beach, hiking trails, playground, and a recreation center with arcade games. Six distinct camping areas &mdash; Main Camp, 400 Area, 500 Area, Legiontown, Mills Camp, and Fish Camp &mdash; offer sites for tents, small trailers, large RVs, and motorhomes. The area north of Buckeye Brook Road, abutting the Pawcatuck River, is primarily a hunting area, and Watchaug Pond has become notable in recent years as a place to spot wintering bald eagles.
          </p>
          <SectionActions
            className="mt-8"
            primary={RESERVE}
            secondary={[{ label: 'Get directions', url: mapsUrl(COORDS.lat, COORDS.lng), kind: 'external' }]}
          />
        </IntroFacts>

        {/* Activities */}
        <section className={`py-14 md:py-24 lg:py-[120px] ${bandWhite}`}>
          <div className={frame}>
            <SectionHeader heading="Activities" />
            <IconChipList items={activities} />
          </div>
        </section>

        {/* A Rich History: real timeline rows, the fresh-start rule for this page's story moment. */}
        <section className="py-14 md:py-24 lg:py-[120px]">
          <div className={frame}>
            <SectionHeader eyebrow="Since 1702" eyebrowRule heading="A Rich History" />
            <RuledRows
              rows={history.map((h) => ({ key: h.key, title: h.title, body: h.body, image: h.image }))}
            />
          </div>
        </section>

        {/* Camping Areas */}
        <section className={`py-14 md:py-24 lg:py-[120px] ${bandWhite}`}>
          <div className={frame}>
            <SectionHeader
              heading="Camping Areas"
              intro="Six distinct areas across the 3,100-acre park, with sites for tents (A), small trailers (B), large trailers & motorhomes (C/M)."
            />
            <CardRow columns={3} items={campAreas} />
            <SectionActions
              className="mt-10"
              primary={RESERVE}
              secondary={[{ label: 'View campground map', url: '/images/burlingame-campground-map.png', kind: 'external', style: 'link' }]}
            />
          </div>
        </section>

        {/* Rustic Cabins */}
        <section id="cabins" className="py-14 md:py-24 lg:py-[120px] scroll-mt-28">
          <div className={frame}>
            <SplitFeature
              photo={{ src: '/images/Burlingame2-1536x1152.jpg', alt: 'Rocky shoreline of Watchaug Pond at Burlingame' }}
              heading="Rustic Cabins"
              paragraphs={[
                '20 rustic cabins are located in the Legiontown Camp Area, offering a unique camping experience with a roof over your head. Perfect for those who want to be close to nature without a tent.',
              ]}
            >
              <IconChipList className="mt-6" items={cabinInfo} />
            </SplitFeature>
          </div>
        </section>

        {/* Wildlife */}
        <section className={`py-14 md:py-24 lg:py-[120px] ${bandTint}`}>
          <div className={frame}>
            <SectionHeader heading="Wildlife at Burlingame" intro="With 80+ nesting bird species and diverse mammals, reptiles, and amphibians, Burlingame is a wildlife haven." />
            <div className="grid gap-10 md:grid-cols-3">
              <div>
                <h3 className={`${h3} mb-4 text-lake-ink`}>Mammals</h3>
                <IconChipList items={mammals} />
              </div>
              <div>
                <h3 className={`${h3} mb-4 text-lake-ink`}>Birds (80+ nesting species)</h3>
                <IconChipList items={birds} />
              </div>
              <div>
                <h3 className={`${h3} mb-4 text-lake-ink`}>Amphibians & Reptiles</h3>
                <IconChipList items={reptiles} />
              </div>
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="py-14 md:py-24 lg:py-[120px]">
          <div className={frame}>
            <SectionHeader heading="Photo Gallery" />
            <Gallery photos={galleryPhotos} />
          </div>
        </section>

        {/* Key Policies */}
        <section className={`py-14 md:py-24 lg:py-[120px] ${bandWhite}`}>
          <div className={frame}>
            <SectionHeader heading="Key Campground Policies" intro="Important policies for your visit to Burlingame State Campground." />
            <RuledRows rows={keyPolicies} />
            <h3 className={`${h3} mb-4 mt-16 text-lake-ink md:mt-20`}>Additional Notes</h3>
            <RuledRows twoUp={false} rows={additionalNotes} />
          </div>
        </section>

        {/* Resources & Downloads */}
        <section className="py-14 md:py-24 lg:py-[120px]">
          <div className={frame}>
            <SectionHeader heading="Resources & Downloads" intro="Download maps, policies, and other helpful documents for your visit." />
            <RuledRows rows={downloads.map((d) => ({ ...d, linkLabel: 'Download PDF' }))} />
          </div>
        </section>

        <ClosingCta
          photo={{ src: '/images/burlingame-picnic-area.png', alt: 'Picnic area with tables under trees at Burlingame State Park' }}
          heading="Experience Rhode Island's Premier Campground"
          text="From its CCC-era origins to today, Burlingame State Park offers 755 campsites on the shores of Watchaug Pond. Reserve your spot today."
          primary={RESERVE}
          secondary={{ label: 'View All Experiences', url: '/experiences', kind: 'internal' }}
        />
        <OfficialDisclosure
          label="Statement of Work"
          title="Scope of Services"
          intro="BA Services serves as the contracted concessionaire for Burlingame State Campground, delivering comprehensive campground operations, retail services, and recreational amenities under agreement with the Rhode Island Department of Environmental Management."
          groups={scopeOfWork}
        />
        <StickyBooking name="Burlingame State Park" cta={RESERVE} phone={PHONE} />
      </LakesideShell>

      <Footer />
    </main>
  )
}
