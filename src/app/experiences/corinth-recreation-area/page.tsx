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
  title: { absolute: 'Corinth Recreation Area | Bankhead National Forest | BA Services' },
  description: 'Discover Corinth Recreation Area on Lewis Smith Lake in Bankhead National Forest. 52 full-hookup campsites, 10 tent sites, swimming beach, pavilion, and Bobwhite Trail.',
  alternates: { canonical: '/experiences/corinth-recreation-area' },
  openGraph: og('/experiences/corinth-recreation-area'),
}

// Matches the Corinth Recreation Area entry in src/components/PropertyMap.tsx
// — the only place this property's coordinates are published. Never invent a pair.
const COORDS = { lat: 34.15, lng: -87.15 }
const BOOK = { label: 'Book on Recreation.gov', url: 'https://www.recreation.gov/camping/campgrounds/232423', kind: 'booking' as const }

const stats = [
  { key: 'full-hookup', value: '52', label: 'Full-Hookup Sites' },
  { key: 'tent', value: '10', label: 'Tent Sites' },
  { key: 'pavilion', value: '100', label: 'Person Pavilion' },
  { key: 'trail', value: '1.3 mi', label: 'Bobwhite Trail' },
  { key: 'bathhouses', value: '4', label: 'Bathhouses' },
]

const fullHookupAmenities = ['Electricity Hookup', 'Water Hookup', 'Sewer Hookup', 'Full Hookups', 'Paved Parking Spurs', 'Picnic Tables', 'BBQ Grills', 'Fire Pits', 'Tent Pads', 'Lantern Poles', 'ADA Accessible']

const campingLoops = [
  { key: 'yellow-hammer', title: 'Yellow Hammer Loop', body: 'Spacious full-hookup sites (electric, water, and sewer) with paved parking spurs, picnic tables, grills, and tent pads. Bathhouses with warm showers nearby.', photo: { src: '/images/corinth-camping-loop.jpg', alt: 'Yellow Hammer Loop' } },
  { key: 'firefly', title: 'Firefly Loop', body: 'Full-hookup camping loop accommodating RVs of any size. Sites feature paved spurs, fire rings, lantern poles, and easy access to the lake.', photo: { src: '/images/corinth-firefly-loop.jpg', alt: 'Firefly Loop' } },
]

const dayUseFeatures = [
  { key: 'swimming', title: 'Swimming Beach', body: 'Designated swimming area with dressing rooms and warm showers. Swim at your own risk — no lifeguard on duty.' },
  { key: 'boat-ramp', title: 'Double-Lane Boat Ramp', body: 'Launch watercraft on Lewis Smith Lake. Excellent fishing for Kentucky Spotted Bass and Hybrid Striped Bass.' },
  { key: 'pavilion', title: 'Group Pavilion', body: 'Reservable 100-person pavilion perfect for reunions, weddings, and group events. Reserve through Recreation.gov.' },
  { key: 'picnic', title: 'Picnic Sites', body: '29 first-come, first-served picnic sites in a shaded lakeside setting.' },
  { key: 'bobwhite', title: 'Bobwhite Trail', body: '1.3-mile hiking trail through the forest. Interpretive programs hosted during the summer.' },
  { key: 'bathhouses', title: 'Bathhouses', body: 'Four bathhouses with warm showers serve the camping areas. Day-use visitors have access to dressing rooms.' },
]

const attractions = [
  { key: 'natural-bridge', title: 'The Little Natural Bridge', body: 'A unique geological formation within the Bankhead.' },
  { key: 'pine-torch', title: 'Pine Torch Church', body: 'A historic 19th-century church nestled in the forest.' },
  { key: 'jail', title: 'Houston Civil War Jail', body: 'A preserved Civil War-era jail with historical significance.' },
]

const otherRecreation = ['Brushy Lake Recreation Area', 'Houston Recreation Area', 'Clear Creek Recreation Area', 'Natural Bridge Day Use Area', 'Owl Creek Horse Camp & Trail System', 'Sipsey Wilderness', 'Hurricane Creek Shooting Range', 'Flint-Creek Multi-Use Trail']

const galleryPhotos = [
  { src: '/images/corinth-campground.jpg', alt: 'Fee and rules information board at Corinth Recreation Area' },
  { src: '/images/corinth-boat-ramp.jpg', alt: 'Boat ramp on Lewis Smith Lake' },
  { src: '/images/corinth-pavilion.jpg', alt: 'Group pavilion' },
  { src: '/images/corinth-camping-loop.jpg', alt: 'Camping loop at Corinth' },
  { src: '/images/corinth-firefly-loop.jpg', alt: 'Firefly Loop campsite' },
]

const rules = [
  'This is a National Forest. All vehicles must be parked on asphalt or gravel surfaces. Save the grass for others.',
  'No alcoholic beverages allowed.',
  'Please drive slowly — children at play.',
  'All pets must be on a leash at all times. Pets are prohibited on the beach and in the swimming area.',
  'Fires belong in grills only. Never put ashes or charcoal on the ground.',
  'Swimming only in designated areas within roped buoys. No lifeguard on duty.',
  'Campsites are for 6 people and 2 vehicles. Additional people require a second campsite.',
  'Check-out time is 12:00 PM.',
  'Bike riding around bath houses or after dark is prohibited.',
  'Motorized vehicles must be street-legal and operated by a licensed driver.',
  'Golden Age and Golden Access Passports honored for camping fees. Holder must be present.',
]

const downloads = [
  { key: 'corinth-map', title: 'Corinth Map', href: '/downloads/bankhead-national-forest/corinth-map.pdf' },
  { key: 'clear-creek-map', title: 'Clear Creek Map', href: '/downloads/bankhead-national-forest/clear-creek-map.pdf' },
  { key: 'birding-guide', title: 'Birding Guide', href: '/downloads/bankhead-national-forest/birding-guide.pdf' },
  { key: 'sipsey-map', title: 'Sipsey Wilderness Map', href: '/downloads/bankhead-national-forest/sipsey-wilderness-map.pdf' },
  { key: 'sipsey-canoe-map', title: 'Sipsey Canoe Map', href: '/downloads/bankhead-national-forest/sipsey-canoe-map.pdf' },
  { key: 'visitor-rules', title: 'Forest Visitor Rules', href: '/downloads/bankhead-national-forest/forest-visitor-rules.pdf' },
]

export default function CorinthPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url="/experiences/corinth-recreation-area"
        name="Corinth Recreation Area | Bankhead National Forest | BA Services"
        crumbName="Corinth Recreation Area"
        description="Discover Corinth Recreation Area on Lewis Smith Lake in Bankhead National Forest. 52 full-hookup campsites, 10 tent sites, swimming beach, pavilion, and Bobwhite Trail."
        image="/images/corinth-boat-ramp.jpg"
        crumbs={[{ name: 'Experiences', url: '/experiences' }]}
      />

      <LakesideShell>
        <Hero
          photo={{ src: '/images/corinth-boat-ramp.jpg', alt: 'Corinth Recreation Area on Lewis Smith Lake' }}
          eyebrow="Lewis Smith Lake, Winston County, Alabama"
          title="Corinth Recreation Area"
          subline="A modern, state-of-the-art campground on the shores of Lewis Smith Lake with full-hookup sites, a swimming beach, and the scenic Bobwhite Trail."
          booking={{
            title: 'Corinth Recreation Area',
            text: 'Camping is first come, first serve — no reservations required. The pavilion can be reserved through Recreation.gov.',
            cta: BOOK,
          }}
        />

        <IntroFacts
          eyebrowRule
          heading="About Corinth"
          lead="Corinth Recreation Area is a modern, well-developed campground located along the upper reaches of Lewis Smith Lake in Winston County, Alabama."
          paragraphs={[
            'Originally constructed in the 1960s and extensively renovated in 1998, the area offers a full range of recreational opportunities, including camping, picnicking, swimming, boating, and hiking in a scenic lakeside setting.',
          ]}
          facts={stats}
        >
          <SectionActions
            className="mt-8 md:mt-10"
            primary={BOOK}
            secondary={[{ label: 'Get directions', url: mapsUrl(COORDS.lat, COORDS.lng), kind: 'external' }]}
          />
          <p className="mt-4 text-sm text-lake-mute">Bankhead Ranger District: (205) 489-5111</p>
        </IntroFacts>

        {/* Campground Facilities & Directions */}
        <section className={`py-14 md:py-24 lg:py-[120px] ${bandWhite}`}>
          <div className={frame}>
            <SectionHeader heading="Campground Facilities" />
            <div className="grid gap-5 md:grid-cols-2 md:gap-x-12">
              <p className={body}>
                The campground is organized into two paved loops and includes 52 campsites, all designed to accommodate RV and family camping. Each site features water, 30-amp and 50-amp electrical service, and sewer hookups, along with paved parking spurs, picnic tables, fire rings, and lantern posts.
              </p>
              <p className={body}>
                In addition to the RV sites, Corinth offers eight rustic tent-only campsites, supported by nearby community water hydrants and bathhouse access. Four bathhouses with flush toilets and warm showers serve the camping areas, and a trailer dump station is located within the recreation area. Camping is by reservation only through Recreation.gov; check-in begins at 2:00 p.m., check-out is no later than 12:00 p.m.
              </p>
            </div>
            <IconChipList className="mt-10" items={fullHookupAmenities} />
            <div className="mt-12 border-t border-lake-line pt-8">
              <p className={body}>
                From Double Springs, travel 8 miles east on Hwy 278; turn right at the Corinth Recreation Area sign on County Road 57.
              </p>
              <p className="mt-2 text-sm text-lake-mute">
                Corinth Recreation Area, 2540 County Road 57, Double Springs, AL 35553 &bull; (205) 489-3165
              </p>
            </div>
          </div>
        </section>

        {/* Camping Loops */}
        <section className="py-14 md:py-24 lg:py-[120px]">
          <div className={frame}>
            <SectionHeader heading="Camping Loops" intro="52 full-hookup campsites across two loops, plus 10 tent-only sites. Sites can accommodate RVs of any size." />
            <CardRow columns={2} shape="wide" items={campingLoops} />
            <p className={`${body} mt-10`}>
              10 dedicated tent campsites are also available for those who prefer a more traditional camping experience. These sites offer a quieter, more natural setting while still providing access to all of the campground&apos;s facilities.
            </p>
          </div>
        </section>

        {/* Day-Use Area & Activities */}
        <section className={`py-14 md:py-24 lg:py-[120px] ${bandTint}`}>
          <div className={frame}>
            <SectionHeader heading="Day-Use Area & Activities" intro="Swimming, boating, picnicking, and hiking — all on the shores of Lewis Smith Lake." />
            <CardRow columns={3} items={dayUseFeatures} />
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="py-14 md:py-24 lg:py-[120px]">
          <div className={frame}>
            <SectionHeader heading="Photo Gallery" />
            <Gallery photos={galleryPhotos} />
          </div>
        </section>

        {/* Nearby Attractions / Other Recreation */}
        <section className={`py-14 md:py-24 lg:py-[120px] ${bandWhite}`}>
          <div className={frame}>
            <SectionHeader heading="Nearby Attractions" />
            <CardRow columns={3} items={attractions} />
            <h3 className="mt-16 font-lake-serif text-[26px] leading-tight text-lake-ink md:mt-20">More in Bankhead National Forest</h3>
            <IconChipList className="mt-6" items={otherRecreation} />
          </div>
        </section>

        {/* Campground Rules */}
        <section className="py-14 md:py-24 lg:py-[120px]">
          <div className={frame}>
            <SectionHeader heading="Campground Rules" intro="Please review and follow these rules during your stay at Corinth Recreation Area." />
            <RuledRows rows={rules.map((r, i) => ({ key: `rule-${i}`, body: r }))} />
          </div>
        </section>

        {/* Resources & Downloads */}
        <section className={`py-14 md:py-24 lg:py-[120px] ${bandWhite}`}>
          <div className={frame}>
            <SectionHeader heading="Resources & Downloads" intro="Download maps and guides for your visit to the Bankhead National Forest." />
            <RuledRows rows={downloads.map((d) => ({ ...d, linkLabel: 'Download PDF' }))} />
          </div>
        </section>

        <ClosingCta
          photo={{ src: '/images/corinth-boat-ramp.jpg', alt: 'Corinth Recreation Area on Lewis Smith Lake' }}
          heading="Plan Your Visit to Corinth"
          text="Experience the beauty of Lewis Smith Lake at this modern campground in the Bankhead National Forest."
          primary={BOOK}
          secondary={{ label: 'See Clear Creek Nearby', url: '/experiences/clear-creek-recreation-area', kind: 'internal' }}
        />
        <StickyBooking name="Corinth Recreation Area" cta={BOOK} />
      </LakesideShell>

      <Footer />
    </main>
  )
}
