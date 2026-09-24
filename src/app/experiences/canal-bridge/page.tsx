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
  StickyBooking,
  bandTint,
  bandWhite,
  body,
  frame,
  mapsUrl,
} from '@/components/property/lakeside'

export const metadata: Metadata = {
  title: { absolute: 'Canal Bridge Campground | Saco River, Fryeburg, Maine | BA Services' },
  description: 'Discover Canal Bridge Campground on the Saco River in Fryeburg, Maine. 36 numbered campsites, river frontage for kayaking, canoeing, and fishing with stunning White Mountain views.',
  alternates: { canonical: '/experiences/canal-bridge' },
  openGraph: og('/experiences/canal-bridge'),
}

// Matches the Canal Bridge Campground entry in src/components/PropertyMap.tsx
// — the only place this property's coordinates are published. Never invent a pair.
const COORDS = { lat: 44.02, lng: -70.97 }
const PHONE = '207.935.2286'
const BOOK = { label: 'Book Your Stay', url: 'https://canalbridgeme.com/', kind: 'booking' as const }

const stats = [
  { key: 'sites', value: '36', label: 'Sites' },
  { key: 'river', value: 'Saco', label: 'River' },
  { key: 'mountains', value: 'White', label: 'Mountains' },
]

const campsiteImages = [
  { key: 'site-1', title: 'Site 1', image: { src: '/images/canal-bridge/site-1.jpg', alt: 'Campsite 1 at Canal Bridge' } },
  { key: 'site-6', title: 'Site 6', image: { src: '/images/canal-bridge/site-6.jpg', alt: 'Campsite 6 at Canal Bridge' } },
  { key: 'site-12', title: 'Site 12', image: { src: '/images/canal-bridge/site-12.jpg', alt: 'Campsite 12 at Canal Bridge' } },
  { key: 'site-18', title: 'Site 18', image: { src: '/images/canal-bridge/site-18.jpg', alt: 'Campsite 18 at Canal Bridge' } },
  { key: 'site-24', title: 'Site 24', image: { src: '/images/canal-bridge/site-24.jpg', alt: 'Campsite 24 at Canal Bridge' } },
  { key: 'site-30', title: 'Site 30', image: { src: '/images/canal-bridge/site-30.jpg', alt: 'Campsite 30 at Canal Bridge' } },
  { key: 'site-36', title: 'Site 36', image: { src: '/images/canal-bridge/site-36.jpg', alt: 'Campsite 36 at Canal Bridge' } },
]

const amenities = ['Saco River Frontage', 'Bath House (Storm Shelter)', 'Firewood Available', 'Ice Available', 'Camp Host On-Site', 'Office / Check-In', 'Fire Pits at Sites', 'Picnic Tables', 'Overflow Parking', 'White Mountain Views']

const rules = [
  { key: 'checkin', title: 'Check-In / Check-Out', body: 'Check-in: 2:00 PM | Check-out: 12:00 PM' },
  { key: 'quiet', title: 'Quiet Hours', body: '10:00 PM to 7:00 AM. Children under 17 must be on campsite by 10:00 PM.' },
  { key: 'pets', title: 'Pets', body: 'Pets must be leashed at all times. Please clean up after your pet.' },
  { key: 'fires', title: 'Fires', body: 'Fires only in designated fire pits. Absolutely no fireworks.' },
  { key: 'vehicles', title: 'Vehicles', body: '2 vehicles per campsite. Overflow parking available at the entrance.' },
  { key: 'reservations', title: 'Reservations', body: 'Call 207.935.2286 to reserve.' },
]

const galleryPhotos = [
  { src: '/images/canal-bridge/entrance.jpg', alt: 'Canal Bridge Campground entrance' },
  { src: '/images/canal-bridge/site-1.jpg', alt: 'Campsite 1' },
  { src: '/images/canal-bridge/site-6.jpg', alt: 'Campsite 6' },
  { src: '/images/canal-bridge/site-12.jpg', alt: 'Campsite 12' },
  { src: '/images/canal-bridge/site-18.jpg', alt: 'Campsite 18' },
  { src: '/images/canal-bridge/site-24.jpg', alt: 'Campsite 24' },
  { src: '/images/canal-bridge/site-30.jpg', alt: 'Campsite 30' },
  { src: '/images/canal-bridge/site-36.jpg', alt: 'Campsite 36' },
  { src: '/images/canal-bridge/beach-1.jpg', alt: 'Beach area on the Saco River' },
  { src: '/images/canal-bridge/beach-2.jpg', alt: 'Sandy beach along the Saco River' },
]

const scopeOfWork = [
  {
    key: 'operations',
    title: 'Full-Service Campground Operations',
    body: 'Complete day-to-day management of Canal Bridge Campground under concession agreement with the Town of Fryeburg.',
    items: ['Management of all campground activities and services', 'Operation of the registration office and guest check-in', 'Oversight of reservations and camper relations', 'Staffing, supervision, and scheduling of all personnel', 'Standards meeting or exceeding Town of Fryeburg requirements', 'Structured operations for consistent, high-quality service'],
  },
  {
    key: 'staffing',
    title: 'On-Site Management & Staffing',
    body: 'A structured management team with continuous on-site presence throughout the operating season.',
    items: ['Contract Manager overseeing performance and compliance', 'General Manager coordinating daily operations', 'On-site personnel for registration, maintenance, and security', 'Staff present throughout the full operating season', 'Continuous oversight and accountability', 'Responsive management at all times'],
  },
  {
    key: 'guest-services',
    title: 'Guest Services & Visitor Experience',
    body: 'A welcoming, family-friendly environment with daily office hours and 24-hour emergency availability.',
    items: ['Daily registration office hours (7:00 AM – 9:00 PM)', 'Direct communication and assistance to campers', 'Clear campground rules and expectations', '24-hour emergency contact availability', 'Smooth guest experience from arrival to departure', 'Family-oriented atmosphere and visitor support'],
  },
  {
    key: 'maintenance',
    title: 'Maintenance & Groundskeeping',
    body: 'Full responsibility for maintaining campground condition, cleanliness, and safety.',
    items: ['Bathhouse cleaning and upkeep (minimum twice daily)', 'Routine campground inspections for cleanliness and safety', 'Lawn care, landscaping, and debris removal', 'Beach cleaning and upkeep along the Saco River', 'Trash and dumpster management', 'All equipment and supplies provided by BA Services'],
  },
  {
    key: 'safety',
    title: 'Safety & Security',
    body: 'On-site security monitoring, nightly patrols, and coordination with local law enforcement.',
    items: ['On-site security monitoring and rule enforcement', 'Nightly quiet hours (10:00 PM – 7:00 AM) with regular patrols', 'Immediate response to disturbances or safety concerns', 'Coordination with local law enforcement when necessary', 'Routine rounds to ensure a respectful atmosphere', 'Family-oriented safety standards maintained at all times'],
  },
  {
    key: 'improvements',
    title: 'Facility Improvements & Investment',
    body: 'Direct capital investment in campground upgrades to restore and elevate Canal Bridge as a premier destination.',
    items: ['Installation of new registration office and entrance gate', 'Campsite upgrades including fire pits and site markers', 'Addition of recreational amenities (volleyball, horseshoe pits)', 'Ongoing improvements to enhance guest experience', 'Long-term investment in campground quality', 'Designed to elevate Canal Bridge as a premier local destination'],
  },
  {
    key: 'financial',
    title: 'Financial Responsibility & Reporting',
    body: 'Transparent management of all financial and administrative functions with weekly reporting to the Town.',
    items: ['Collection of camping fees and deposits', 'Payment of operational expenses and utilities', 'Obtaining required licenses and permits', 'Weekly reporting of attendance and activity to the Town', 'Full transparency and accountability', 'Administrative compliance throughout the contract term'],
  },
]

export default function CanalBridgePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url="/experiences/canal-bridge"
        name="Canal Bridge Campground | Saco River, Fryeburg, Maine | BA Services"
        crumbName="Canal Bridge Campground"
        description="Discover Canal Bridge Campground on the Saco River in Fryeburg, Maine. 36 numbered campsites, river frontage for kayaking, canoeing, and fishing with stunning White Mountain views."
        image="/images/canal-bridge/beach-1.jpg"
        crumbs={[{ name: 'Experiences', url: '/experiences' }]}
      />

      <LakesideShell>
        <Hero
          photo={{ src: '/images/canal-bridge/beach-1.jpg', alt: 'Sandy beach on the Saco River at Canal Bridge Campground in Fryeburg, Maine' }}
          eyebrow="Saco River, Fryeburg, Maine"
          title="Canal Bridge Campground"
          subline="Scenic Riverside Camping in Maine"
          booking={{
            title: 'Canal Bridge Campground',
            text: 'With 36 numbered campsites (including 30a), the campground provides the perfect balance of accessibility and seclusion for campers of all kinds.',
            cta: BOOK,
            phone: PHONE,
          }}
        />

        <IntroFacts
          eyebrowRule
          heading="About Canal Bridge Campground"
          lead="Nestled along the banks of the Saco River in Fryeburg, Maine, Canal Bridge Campground offers a peaceful retreat surrounded by the natural beauty of western Maine."
          paragraphs={[
            "The Saco River frontage is the heart of Canal Bridge. Guests enjoy direct access to kayaking, canoeing, and fishing for trout and bass right from the campground. Whether you're paddling downstream on a lazy afternoon or casting a line at sunrise, the river is always calling.",
            "Beyond the river, Canal Bridge is framed by stunning views of the White Mountains. From your campsite, you can watch the sun set over the peaks — a daily reminder of why Maine's western highlands are one of New England's best-kept secrets.",
          ]}
          facts={stats}
        >
          <SectionActions
            className="mt-8 md:mt-10"
            primary={BOOK}
            secondary={[{ label: 'Get directions', url: mapsUrl(COORDS.lat, COORDS.lng), kind: 'external' }]}
          />
          <p className="mt-4 text-sm text-lake-mute">Reserve your campsite at Canal Bridge Campground on the Saco River.</p>
        </IntroFacts>

        {/* River & Beach Access */}
        <section className={`py-14 md:py-24 lg:py-[120px] ${bandWhite}`}>
          <div className={frame}>
            <SectionHeader
              eyebrow="The Saco River"
              eyebrowRule
              heading="River & Beach Access"
              intro="The Saco River is one of Maine's most beloved waterways, known for its gentle currents, sandy beaches, and crystal-clear water. Canal Bridge's river frontage gives you unmatched access to paddle, swim, and fish throughout your stay."
            />
            <p className={`${body} mb-10`}>
              Canal Bridge&apos;s Saco River frontage offers sandy beaches, gentle currents, and some of the best paddling and fishing in western Maine.
            </p>
            <CardRow
              columns={2}
              shape="wide"
              items={[
                { key: 'beach-1', title: 'Saco River Beach', photo: { src: '/images/canal-bridge/beach-1.jpg', alt: 'Beach area along the Saco River at Canal Bridge' } },
                { key: 'beach-2', title: 'River Access Point', photo: { src: '/images/canal-bridge/beach-2.jpg', alt: 'Sandy river beach for swimming and kayaking' } },
              ]}
            />
            <div className="mt-12 md:mt-16">
              <CardRow
                columns={3}
                items={[
                  { key: 'kayaking', title: 'Kayaking & Canoeing', body: "Paddle the Saco right from your campsite. Launch directly from the campground and paddle the Saco's gentle currents. The river is perfect for all skill levels, from beginners to experienced paddlers." },
                  { key: 'fishing', title: 'Fishing', body: 'The Saco River is home to trout and bass. Cast your line from the bank or wade into the shallows for a true Maine fishing experience.' },
                  { key: 'swimming', title: 'Swimming', body: "Cool off in the Saco's crystal-clear water at the campground's sandy beach areas. A perfect way to spend a warm summer afternoon." },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section className={`py-14 md:py-24 lg:py-[120px] ${bandTint}`}>
          <div className={frame}>
            <SectionHeader heading="Amenities" />
            <IconChipList items={amenities} />
          </div>
        </section>

        {/* Our Campsites: a real photo per numbered site. */}
        <section className="py-14 md:py-24 lg:py-[120px]">
          <div className={frame}>
            <SectionHeader heading="Our Campsites" intro="36 numbered sites (including 30a) spread across the campground along the Saco River." />
            <RuledRows rows={campsiteImages} />
          </div>
        </section>

        {/* Campground Rules */}
        <section className={`py-14 md:py-24 lg:py-[120px] ${bandWhite}`}>
          <div className={frame}>
            <SectionHeader heading="Campground Rules" intro="Please review and follow these rules during your stay at Canal Bridge Campground." />
            <RuledRows rows={rules} />
          </div>
        </section>

        {/* Resources & Downloads */}
        <section className="py-14 md:py-24 lg:py-[120px]">
          <div className={frame}>
            <SectionHeader heading="Resources & Downloads" intro="Download the campground map to plan your visit." />
            <RuledRows rows={[{ key: 'map', title: 'Campground Map', href: '/downloads/canal-bridge/campground-map.pdf', linkLabel: 'Download PDF' }]} />
          </div>
        </section>

        {/* Photo Gallery */}
        <section className={`py-14 md:py-24 lg:py-[120px] ${bandWhite}`}>
          <div className={frame}>
            <SectionHeader heading="Photo Gallery" />
            <Gallery photos={galleryPhotos} />
          </div>
        </section>

        <ClosingCta
          photo={{ src: '/images/canal-bridge/beach-1.jpg', alt: 'Sandy beach on the Saco River at Canal Bridge Campground' }}
          heading="Plan Your Stay at Canal Bridge"
          text="Experience the Saco River, White Mountain views, and the peace of a Maine campground. Reserve your site today."
          primary={BOOK}
          phone={PHONE}
          secondary={{ label: 'View All Experiences', url: '/experiences', kind: 'internal' }}
        />
        <OfficialDisclosure
          label="Statement of Work"
          title="Scope of Services"
          intro="BA Services provides full-service campground management, maintenance, and guest services for Canal Bridge Campground under concession agreement with the Town of Fryeburg."
          groups={scopeOfWork}
        />
        <StickyBooking name="Canal Bridge Campground" cta={BOOK} phone={PHONE} />
      </LakesideShell>

      <Footer />
    </main>
  )
}
