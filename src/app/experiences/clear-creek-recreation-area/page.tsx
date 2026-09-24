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
  SplitFeature,
  StickyBooking,
  bandTint,
  bandWhite,
  body,
  frame,
  h3,
  mapsUrl,
} from '@/components/property/lakeside'

export const metadata: Metadata = {
  title: { absolute: 'Clear Creek Recreation Area | Bankhead National Forest | BA Services' },
  description: 'Explore Clear Creek Recreation Area on Lewis Smith Lake in Bankhead National Forest. 102 campsites across 4 loops, swimming beach, boat ramps, hiking trails, and group camping.',
  alternates: { canonical: '/experiences/clear-creek-recreation-area' },
  openGraph: og('/experiences/clear-creek-recreation-area'),
}

// Matches the Clear Creek Recreation Area entry in src/components/PropertyMap.tsx
// — the only place this property's coordinates are published. Never invent a pair.
const COORDS = { lat: 34.27, lng: -87.33 }
const BOOK = { label: 'Book on Recreation.gov', url: 'https://www.recreation.gov/camping/campgrounds/231990', kind: 'booking' as const }

const stats = [
  { key: 'campsites', value: '102', label: 'Campsites' },
  { key: 'loops', value: '4', label: 'Camping Loops' },
  { key: 'bathhouses', value: '5', label: 'Bathhouses' },
  { key: 'trails', value: '2', label: 'Trails' },
  { key: 'lake', value: '21,200 acres', label: 'Lewis Smith Lake' },
]

const siteAmenities = ['Electricity Hookup', 'Water Hookup', 'Sewer Hookup', 'Paved Parking Spurs', 'Picnic Tables', 'Grills & Fire Rings', 'Tent Pads', 'Lantern Poles', 'ADA Accessible Sites']

const campingLoops = [
  { key: 'fox', title: 'Fox Loop', body: 'Scenic loop with electric and water hookups, paved parking spurs, and close access to the campground boat ramp.', photo: { src: '/images/clear-creek-fox-entrance.jpg', alt: 'Fox Loop' } },
  { key: 'hoot-owl', title: 'Hoot Owl Loop', body: 'Spacious sites with electric and water hookups, tent pads, picnic tables, and grills. Near the bicycle trail.', photo: { src: '/images/clear-creek-hoot-owl-loop.jpg', alt: 'Hoot Owl Loop' } },
  { key: 'fawn', title: 'Fawn Loop', body: 'Family-friendly loop featuring both single and double sites. Convenient access to bathhouses with warm showers.', photo: { src: '/images/clear-creek-fawn-loop.jpg', alt: 'Fawn Loop' } },
  { key: 'bear', title: 'Bear Loop', body: 'Quiet loop at the far end of the campground, ideal for those seeking a more secluded camping experience.', photo: { src: '/images/clear-creek-overview.jpg', alt: 'Bear Loop' } },
]

const dayUseFeatures = [
  { key: 'swimming', title: 'Swimming Beach', body: 'Designated swimming area with roped buoys. Swim at your own risk — no lifeguard on duty.' },
  { key: 'boat-ramp', title: 'Double-Lane Boat Ramp', body: 'Launch your watercraft with ease on Lewis Smith Lake. Day-use and camper boat ramps available.' },
  { key: 'shelters', title: 'Group Shelters', body: 'Three reservable group shelters — Oak Leaf, Bay Leaf, and Elm Leaf — perfect for reunions and events.' },
  { key: 'picnic', title: 'Picnic Area', body: 'Large picnic area with tables and grills in a shaded lakeside setting.' },
  { key: 'playground', title: 'Playground', body: "Children's playground, basketball and volleyball courts, and horseshoe pit for campers." },
  { key: 'bathhouses', title: 'Bathhouses', body: 'Five bathhouses with warm showers and dressing rooms serve the camping and day-use areas.' },
]

const specialCamps = [
  { key: 'bent-twig', title: 'Bent Twig Camp', body: 'A secluded group camping area nestled among the trees, perfect for scout troops and organized groups seeking a more primitive camping experience in the Bankhead National Forest.', photo: { src: '/images/clear-creek-bent-twig.jpg', alt: 'Bent Twig Camp at Clear Creek' } },
  { key: 'acorn', title: 'Acorn Camp', body: 'Another group camping option at Clear Creek, Acorn Camp provides a rustic, wooded setting with fire rings and picnic facilities for organized groups and family reunions.', photo: { src: '/images/clear-creek-acorn-camp.jpg', alt: 'Acorn Camp at Clear Creek' } },
  { key: 'fox-entrance', title: 'Fox Loop Entrance', body: "The gateway to one of Clear Creek's most popular camping loops, Fox Loop features electric and water hookups with close access to the campground boat ramp on Lewis Smith Lake.", photo: { src: '/images/clear-creek-fox-loop.jpg', alt: 'Fox Loop entrance at Clear Creek' } },
]

const attractions = [
  { key: 'natural-bridge', title: 'The Little Natural Bridge', body: 'A unique geological formation within the Bankhead National Forest.' },
  { key: 'pine-torch', title: 'Pine Torch Church', body: 'A historic 19th-century church nestled in the forest.' },
  { key: 'jail', title: 'Houston Civil War Jail', body: 'A preserved Civil War-era jail with historical significance.' },
  { key: 'sipsey', title: 'Sipsey Wilderness', body: 'The largest wilderness area east of the Mississippi — known as "The Land of a Thousand Waterfalls."' },
]

const downloads = [
  { key: 'clear-creek-map', title: 'Clear Creek Map', href: '/downloads/bankhead-national-forest/clear-creek-map.pdf' },
  { key: 'corinth-map', title: 'Corinth Map', href: '/downloads/bankhead-national-forest/corinth-map.pdf' },
  { key: 'birding-guide', title: 'Birding Guide', href: '/downloads/bankhead-national-forest/birding-guide.pdf' },
  { key: 'sipsey-map', title: 'Sipsey Wilderness Map', href: '/downloads/bankhead-national-forest/sipsey-wilderness-map.pdf' },
  { key: 'sipsey-canoe-map', title: 'Sipsey Canoe Map', href: '/downloads/bankhead-national-forest/sipsey-canoe-map.pdf' },
  { key: 'quail-habitat', title: 'Quail Habitat Guide', href: '/downloads/bankhead-national-forest/quail-habitat.pdf' },
  { key: 'visitor-rules', title: 'Forest Visitor Rules', href: '/downloads/bankhead-national-forest/forest-visitor-rules.pdf' },
]

const galleryPhotos = [
  { src: '/images/clear-creek-overview.jpg', alt: 'Clear Creek Recreation Area entrance sign' },
  { src: '/images/clear-creek-swimming.jpg', alt: 'Swimming beach on Lewis Smith Lake' },
  { src: '/images/clear-creek-shelter.jpg', alt: 'Shaded walkway and steps in the Clear Creek day-use area' },
  { src: '/images/clear-creek-camping.jpg', alt: 'Campground road and direction sign at Clear Creek' },
  { src: '/images/clear-creek-hoot-owl-loop.jpg', alt: 'Hoot Owl camping loop' },
  { src: '/images/clear-creek-fawn-loop.jpg', alt: 'Information board in the Fawn camping loop' },
  { src: '/images/clear-creek-bent-twig.jpg', alt: 'Bent Twig Camp' },
  { src: '/images/clear-creek-acorn-camp.jpg', alt: 'Acorn Camp' },
  { src: '/images/clear-creek-fox-loop.jpg', alt: 'Fox Loop' },
  { src: '/images/clear-creek-fox-entrance.jpg', alt: 'Fox Loop entrance' },
]

const rules = [
  'Quiet hours are 10pm to 7am. Children under 17 must be on campsite by 10pm.',
  'All tires must be parked on asphalt surfaces — not gravel or grass. Parking on vacant campsites is prohibited.',
  'No alcoholic beverages allowed.',
  'All pets must be on a leash at all times. Pets are prohibited on the beach and in the swimming area.',
  'Fires belong in grills only. Ashes must be wet down before disposal. Never put ashes on the ground.',
  'Swimming only in designated areas within roped buoys. No lifeguard on duty.',
  'Single campsites: 6 people, 2 vehicles. Double sites: 12 people, 4 vehicles.',
  'Check-out time is 12:00 PM. Check-in time is 2:00 PM.',
  'Campsites must be occupied the first night and cannot be left unattended for over 24 hours.',
  'Motorized vehicles must be street-legal and operated by a licensed driver.',
  'Golden Age and Golden Access Passports honored for camping fees. Holder must be present.',
]

export default function ClearCreekPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url="/experiences/clear-creek-recreation-area"
        name="Clear Creek Recreation Area | Bankhead National Forest | BA Services"
        crumbName="Clear Creek Recreation Area"
        description="Explore Clear Creek Recreation Area on Lewis Smith Lake in Bankhead National Forest. 102 campsites across 4 loops, swimming beach, boat ramps, hiking trails, and group camping."
        image="/images/clear-creek-swimming.jpg"
        crumbs={[{ name: 'Experiences', url: '/experiences' }]}
      />

      <LakesideShell>
        <Hero
          photo={{ src: '/images/clear-creek-swimming.jpg', alt: 'Swimming beach on Lewis Smith Lake at Clear Creek Recreation Area' }}
          eyebrow="Lewis Smith Lake, Winston County, Alabama"
          title="Clear Creek Recreation Area"
          subline="Alabama's Premier Lakeside Campground"
          booking={{
            title: 'Clear Creek Recreation Area',
            text: 'The largest and one of the most popular recreation areas within Bankhead National Forest, on the shores of a 21,200-acre reservoir.',
            cta: BOOK,
          }}
        />

        <IntroFacts
          eyebrowRule
          heading="About Clear Creek"
          lead="Clear Creek Recreation Area, constructed in 1986, is the largest and one of the most popular recreation areas within Bankhead National Forest."
          paragraphs={[
            'Located in Winston County approximately 13 miles north of Jasper, Alabama, the site sits along the shores of Lewis Smith Lake, a 21,200-acre reservoir, and provides direct access to a wide range of water-based recreation.',
            'The area is a premier destination for boating, water skiing, personal watercraft use, and fishing, with the lake supporting species such as largemouth bass, striped bass, and crappies. Its accessibility and modern amenities make it a favored destination, drawing repeat visitors from across the region.',
          ]}
          facts={stats}
        >
          <SectionActions
            className="mt-8 md:mt-10"
            primary={BOOK}
            secondary={[{ label: 'Get directions', url: mapsUrl(COORDS.lat, COORDS.lng), kind: 'external' }]}
          />
          <p className="mt-4 text-sm text-lake-mute">
            Reserve your campsite at Clear Creek Recreation Area through Recreation.gov. Bankhead Ranger District: (205) 489-5111
          </p>
        </IntroFacts>

        {/* Campground Facilities & Access */}
        <section className={`py-14 md:py-24 lg:py-[120px] ${bandWhite}`}>
          <div className={frame}>
            <SectionHeader heading="Campground Facilities" />
            <div className="grid gap-5 md:grid-cols-2 md:gap-x-12">
              <p className={body}>
                The campground is organized into four paved loops and includes 102 RV campsites, including 32 double sites and 11 pull-through sites. All campsites are level and spacious, with paved parking spurs, picnic tables, fire rings, and lantern posts. Each site provides water service and both 30-amp and 50-amp electrical hookups. Single sites accommodate up to six people and two vehicles, while double sites can accommodate up to twelve people and four vehicles.
              </p>
              <p className={body}>
                Two reservable group camping areas accommodate up to 25 tent campers each and share access to bathhouse facilities. Camping is by reservation only through Recreation.gov. An entry-controlled entrance station with an electronic gate manages campground access. Visitors are required to pack out trash from campsites and dispose of it in designated dumpsters located near the dump station. Check-in begins at 2:00 p.m., check-out is no later than 12:00 p.m., and Clear Creek opens on the second Friday of March and closes October 31st.
              </p>
            </div>
            <IconChipList className="mt-10" items={siteAmenities} />

            <h3 className={`${h3} mb-4 mt-16 text-lake-ink md:mt-20`}>Day-Use Amenities</h3>
            <div className="grid gap-5 md:grid-cols-2 md:gap-x-12">
              <p className={body}>
                The day-use area is centered around a popular swimming beach, supported by a bathhouse with showers and changing facilities. Adjacent to the beach is a reservable 50-person picnic pavilion, while a larger picnic area includes 53 family units connected by paved walkways. Two additional 50-person pavilions are located on a scenic point overlooking the lake.
              </p>
              <p className={body}>
                A year-round boat launch with boat and trailer parking provides convenient lake access. Additional amenities include a children&apos;s playground and a 1.5-mile paved bicycle trail connecting the campground to the day-use area. The nearby 2.5-mile Raven Cliffs Trail offers additional hiking opportunities through the surrounding forest.
              </p>
            </div>

            <h3 className={`${h3} mb-4 mt-16 text-lake-ink md:mt-20`}>Natural Features</h3>
            <p className={body}>
              The Bankhead National Forest is located in northwestern Alabama, and its prominent feature is the Sipsey Wilderness &mdash; known as &ldquo;The Land of a Thousand Waterfalls.&rdquo; It&apos;s an area of abundant streams, old-growth forests, limestone bluffs, and lush canyons. Lewis Smith Lake boasts more than 500 miles of shoreline marked by high rock bluffs. The water is clear and deep and provides excellent fishing for Kentucky Spotted Bass and Hybrid Striped Bass.
            </p>
          </div>
        </section>

        {/* Camping Loops */}
        <section className="py-14 md:py-24 lg:py-[120px]">
          <div className={frame}>
            <SectionHeader heading="Camping Loops" intro="102 campsites across four loops, featuring single and double units with electric and water hookups." />
            <CardRow columns={2} shape="wide" items={campingLoops} />
          </div>
        </section>

        {/* Group Camping */}
        <section className={`py-14 md:py-24 lg:py-[120px] ${bandTint}`}>
          <div className={frame}>
            <SplitFeature
              photo={{ src: '/images/clear-creek-acorn-camp.jpg', alt: 'Picnic tables at Acorn Camp, a Clear Creek group camping area' }}
              heading="Group Camping"
              paragraphs={[
                'Clear Creek offers two group camping units, each capable of accommodating up to 25 persons. These are ideal for family reunions, scout troops, church groups, and other organizations looking for a shared outdoor experience.',
                'Group sites include tent-only, non-electric accommodations in a more natural setting, perfect for those who want a traditional camping experience with their group.',
              ]}
            />
          </div>
        </section>

        {/* Day-Use Area */}
        <section className="py-14 md:py-24 lg:py-[120px]">
          <div className={frame}>
            <SectionHeader heading="Day-Use Area" intro="Full-day access to the swimming beach, boat ramps, shelters, and picnic areas on Lewis Smith Lake." />
            <CardRow columns={3} items={dayUseFeatures} />
          </div>
        </section>

        {/* Special Camp Areas */}
        <section className={`py-14 md:py-24 lg:py-[120px] ${bandWhite}`}>
          <div className={frame}>
            <SectionHeader heading="Special Camp Areas" intro="Clear Creek offers unique camping experiences beyond the standard loops." />
            <CardRow columns={3} items={specialCamps} />
          </div>
        </section>

        {/* Trails */}
        <section className="py-14 md:py-24 lg:py-[120px]">
          <div className={frame}>
            <SectionHeader heading="Trails" />
            <RuledRows
              rows={[
                { key: 'raven', title: 'Raven Interpretive Trail', meta: '2.5 miles', body: 'Wind through the forest on this interpretive trail that highlights the natural features and ecology of the Bankhead National Forest.' },
                { key: 'bicycle', title: '1.25-mile Paved Bicycle & Walking Trail', meta: '1.25 miles', body: 'A paved multi-use trail perfect for biking, walking, or jogging through the scenic campground area.', image: { src: '/images/bankhead-bicycle-trail.jpg', alt: 'Paved bicycle trail at Clear Creek' } },
              ]}
            />
          </div>
        </section>

        {/* Nearby Attractions */}
        <section className={`py-14 md:py-24 lg:py-[120px] ${bandWhite}`}>
          <div className={frame}>
            <SectionHeader heading="Nearby Attractions" />
            <CardRow columns={4} items={attractions} />
          </div>
        </section>

        {/* Campground Rules */}
        <section className="py-14 md:py-24 lg:py-[120px]">
          <div className={frame}>
            <SectionHeader heading="Campground Rules" intro="Please review and follow these rules during your stay at Clear Creek Recreation Area." />
            <RuledRows rows={rules.map((r, i) => ({ key: `rule-${i}`, body: r }))} />
          </div>
        </section>

        {/* Seasonal Day Use Pass */}
        <section className={`py-14 md:py-24 lg:py-[120px] ${bandTint}`}>
          <div className={frame}>
            <SectionHeader heading="Seasonal Day Use Pass" intro="A Seasonal Day Use Pass is available for Clear Creek and Corinth Recreation Areas. The pass is valid from the date of purchase through December 31st of the year purchased and covers one vehicle with up to 5 people." />
            <IconChipList
              items={[
                'Valid for day-use activities only at Clear Creek & Corinth',
                'Non-transferable — valid only for the vehicle it was purchased for',
                'Windshield sticker must be displayed to be valid',
              ]}
            />
          </div>
        </section>

        {/* Resources & Downloads */}
        <section className="py-14 md:py-24 lg:py-[120px]">
          <div className={frame}>
            <SectionHeader heading="Resources & Downloads" intro="Download maps and guides for your visit to Bankhead National Forest." />
            <RuledRows rows={downloads.map((d) => ({ ...d, linkLabel: 'Download PDF' }))} />
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
          photo={{ src: '/images/clear-creek-swimming.jpg', alt: 'Swimming beach on Lewis Smith Lake at Clear Creek Recreation Area' }}
          heading="Plan Your Visit to Clear Creek"
          text="Reserve your campsite and experience the beauty of Lewis Smith Lake in Bankhead National Forest."
          primary={BOOK}
          secondary={{ label: 'View All Experiences', url: '/experiences', kind: 'internal' }}
        />
        <StickyBooking name="Clear Creek Recreation Area" cta={BOOK} />
      </LakesideShell>

      <Footer />
    </main>
  )
}
