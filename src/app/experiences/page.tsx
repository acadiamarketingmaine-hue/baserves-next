import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import { ORIGIN, faq } from '@/lib/schema'
import {
  CardRow,
  ClosingCta,
  Eyebrow,
  Hero,
  LakesideShell,
  SectionHeader,
  StickyBooking,
  bandTint,
  bandWhite,
  frame,
  h2 as h2Class,
} from '@/components/property/lakeside'
import { resolveBookingCta } from '@/components/pages/experiences/bookingLinks'
import LocationCard from '@/components/pages/experiences/LocationCard'
import { listedNewForests } from '@/data/new-forests'

const locations = [
  {
    name: 'Bankhead National Forest',
    tagline: 'The Land of a Thousand Waterfalls',
    description: '180,000+ acres of canyons, waterfalls, old-growth forests, and exceptional birding',
    location: 'Lawrence, Winston & Franklin Counties, AL',
    image: '/images/bankhead-bicycle-trail.jpg',
    slug: 'bankhead-national-forest',
  },
  {
    name: 'Clear Creek Recreation Area',
    tagline: "Alabama's Premier Lakeside Campground",
    description: '102 campsites on Lewis Smith Lake with swimming, trails, and group camping',
    location: 'Bankhead National Forest, AL',
    image: '/images/clear-creek-swimming.jpg',
    slug: 'experiences/clear-creek-recreation-area',
  },
  {
    name: 'Corinth Recreation Area',
    tagline: 'Modern Full-Hookup Campground',
    description: '52 full-hookup sites and 10 tent sites on Lewis Smith Lake',
    location: 'Bankhead National Forest, AL',
    image: '/images/corinth-boat-ramp.jpg',
    slug: 'experiences/corinth-recreation-area',
  },
  {
    name: 'Tipsaw Lake Recreation Area',
    tagline: 'Lakeside Camping in Hoosier National Forest',
    description: '49 campsites on a 131-acre lake with beach, trails, and group camping',
    location: 'Perry County, IN',
    image: '/images/tipsaw-lake/beach-swimming.jpg',
    slug: 'tipsaw-lake-recreation-area',
  },
  {
    name: 'Hardin Ridge Recreation Area',
    tagline: "Lakeside Camping on Monroe Lake",
    description: "195 campsites on Indiana's largest lake with beach, boat ramp, and cabins",
    location: 'Monroe County, IN',
    image: '/images/hardin-ridge/overlook.jpg',
    slug: 'hardin-ridge-recreation-area',
  },
  {
    name: 'Canal Bridge Campground',
    tagline: 'Scenic Riverside Camping in Maine',
    description: '36 campsites on the Saco River with White Mountain views',
    location: 'Fryeburg, ME',
    image: '/images/canal-bridge/beach-1.jpg',
    slug: 'experiences/canal-bridge',
  },
  {
    name: 'Yankee Springs Recreation Area',
    tagline: "Michigan's Ultimate Outdoor Escape",
    description: '5,200+ acres with 200+ campsites, 30+ miles of trails, and year-round recreation',
    location: 'Barry County, MI',
    image: '/images/yankee-springs/hill-cabins.jpg',
    slug: 'yankee-springs-recreation-area',
  },
  {
    name: 'Long Lake Outdoor Center',
    tagline: 'Historic CCC Property Since 1939',
    description: '16 cabins, 4 bunkhouses, and a 120-seat lodge on the National Registry',
    location: 'Yankee Springs, MI',
    image: '/images/long-lake/fall-aerial.jpg',
    slug: 'long-lake-outdoor-center',
  },
  {
    name: 'Meramec State Park',
    tagline: "Missouri's Scenic CCC-Built State Park",
    description: '19 cabins, 40+ caves, motel, and river float rentals along the Meramec River',
    location: 'Sullivan, MO',
    image: '/images/meramec-state-park/cabin-2.jpg',
    slug: 'experiences/meramec-state-park',
  },
  {
    name: 'Washington State Park',
    tagline: 'Ancient Petroglyphs & Natural Beauty',
    description: '2,157 acres with 11 cabins, pool, 140 bird species, and Fish of the Big River series',
    location: 'De Soto, MO',
    image: '/images/washington-thunderbird-lodge.png',
    slug: 'washington-state-park',
  },
  {
    name: 'Burlingame State Park',
    tagline: "Rhode Island's Premier Campground Since 1934",
    description: '755 campsites, 20 cabins, and a rich history on Watchaug Pond',
    location: 'Charlestown, RI',
    image: '/images/Burlingame2-1536x1152.jpg',
    slug: 'experiences/burlingame-state-park',
  },
  {
    name: 'Monongahela National Forest',
    tagline: 'Wild & Wonderful West Virginia',
    description: '921,000 acres with 800+ miles of trails, 5 wilderness areas, and Spruce Knob',
    location: 'Eastern West Virginia',
    image: '/images/monongahela/spruce-knob-panorama.jpg',
    slug: 'monongahela-national-forest',
  },
  // Listed once NEW_FORESTS_PUBLIC is switched on.
  ...listedNewForests().map((f) => ({
    name: f.name,
    tagline: f.tagline,
    description: f.description,
    location: f.state,
    image: f.image,
    slug: f.href.slice(1),
  })),
]

const categories = [
  { name: 'Campground Rentals', count: 25, slug: 'campground-rentals', image: '/images/indian-celina/campsite2.jpg' },
  { name: 'Conference Centers', count: 4, slug: 'conference-center-rentals', image: '/images/long-lake/weddings/dining-hall.jpg' },
  { name: 'Hiking Trails', count: 30, slug: 'hiking', image: '/images/DSC_0103-2048x1365.jpg' },
  { name: 'Kayak & Watercraft', count: 12, slug: 'kayak-and-watercraft-rentals', image: '/images/burlingame-kayaks.png' },
  { name: 'Lookout Pavilions', count: 2, slug: 'lookout-pavillions', image: '/images/meramec-state-park/overlook-pavilion.jpg' },
  { name: 'Scenic Drives', count: 8, slug: 'scenic-drives', image: '/images/monongahela/scenic-drive.jpg' },
]

const bookingSteps = [
  {
    step: '01',
    title: 'Choose Your Destination',
    description: 'Browse 12+ recreation areas across seven states — lakeside campgrounds, national forests, state parks, and historic CCC lodges.',
  },
  {
    step: '02',
    title: 'Reserve Online in Minutes',
    description: 'Check live site, cabin, and watercraft availability with clear published rates and instant confirmation.',
  },
  {
    step: '03',
    title: 'Arrive Ready to Unwind',
    description: 'Pull into maintained campsites, clean bathhouses, and welcoming on-site campground hosts ready to help.',
  },
]

const experienceFaqs = [
  {
    question: 'How do I reserve a campsite, cabin, or boat rental?',
    answer:
      'Pick any recreation area below and click its direct booking link to check live dates, view site photos and rates, and confirm your stay online.',
  },
  {
    question: 'Which states have BA Services recreation areas?',
    answer:
      'BA Services manages campgrounds, cabins, and outdoor recreation areas across Alabama, Indiana, Maine, Michigan, Missouri, Rhode Island, and West Virginia.',
  },
  {
    question: 'Are full-hookup RV sites, group camps, and watercraft rentals available?',
    answer:
      'Yes. Depending on the park, we offer full-hookup RV sites, tent loops, rustic cabins, group camps, conference lodges, and kayak or pontoon rentals.',
  },
]

export const metadata = {
  title: 'Experiences',
  description: 'Explore 12+ BA Services recreation areas — campgrounds, national forests, and state parks across AL, IN, ME, MI, MO, RI, and WV. Reserve your stay online.',
  alternates: {
    canonical: '/experiences',
  },
  openGraph: og('/experiences'),
}

export default async function ExperiencesPage() {
  const locationCards = await Promise.all(
    locations.map(async (loc) => ({
      ...loc,
      href: `/${loc.slug}`,
      book: await resolveBookingCta(`/${loc.slug}`),
    })),
  )

  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url="/experiences"
        name="Experiences | BA Services"
        crumbName="Experiences"
        description={metadata.description}
        type="CollectionPage"
        image="/images/Burlingame1-2048x1365.jpg"
        nodes={[
          {
            '@type': 'ItemList',
            '@id': `${ORIGIN}/experiences#parks`,
            name: 'BA Services Recreation Areas and Parks',
            numberOfItems: locations.length,
            itemListElement: locations.map((loc, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              item: {
                '@type': 'Park',
                name: loc.name,
                description: loc.description,
                url: `${ORIGIN}/${loc.slug}`,
              },
            })),
          },
          faq('/experiences', experienceFaqs),
        ]}
      />

      <LakesideShell>
        <Hero
          photo={{ src: '/images/Burlingame1-2048x1365.jpg', alt: 'Watchaug Pond, one of the twelve recreation areas BA Services manages' }}
          eyebrow="Our Locations"
          title="Explore Our Recreation Areas"
          subline="From coast to coast, discover pristine outdoor destinations managed with care and dedication to preserving natural beauty while providing exceptional visitor experiences."
          booking={{
            title: 'Find Your Experience',
            text: 'Twelve recreation areas across seven states — campgrounds, national forests, and state parks.',
            cta: { label: 'Reserve / Check Availability', url: '#all-recreation-areas', kind: 'internal' },
            phone: '+1 207 307-7903',
          }}
        />

        {/* Categories */}
        <section className={`py-14 md:py-24 lg:py-[120px] ${bandWhite}`}>
          <div className={frame}>
            <SectionHeader eyebrowRule eyebrow="Browse" heading="Browse by Experience" />
            <CardRow
              columns={3}
              shape="wide"
              items={categories.map((c) => ({
                key: c.slug,
                title: c.name,
                meta: `${c.count} locations`,
                photo: { src: c.image, alt: c.name },
                href: `/experiences/categories/${c.slug}`,
                linkLabel: 'Explore',
              }))}
            />
          </div>
        </section>

        {/* Peak Interest & Mechanism — How Your Stay Works */}
        <section className={`py-14 md:py-20 ${bandTint} border-t border-b border-lake-line`}>
          <div className={frame}>
            <div className="max-w-2xl mb-10">
              <Eyebrow label="How Booking Works" rule className="mb-4" />
              <h2 className={`${h2Class} text-lake-ink`}>From Discovery to Campsite in Three Steps</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bookingSteps.map((s) => (
                <div key={s.step} className="rounded-xl border border-lake-line bg-white p-6">
                  <span className="font-mono text-xs font-semibold tracking-wider text-lake-spruce">{s.step}</span>
                  <h3 className="mt-2 font-lake-serif text-[22px] text-lake-ink">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.65] text-lake-mute">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Locations */}
        <section id="all-recreation-areas" className="py-14 md:py-24 lg:py-[120px] scroll-mt-28">
          <div className={frame}>
            <SectionHeader
              heading="All Recreation Areas"
              intro={
                <>
                  Learn about <Link href="/about" className="underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink">our story</Link> and the{' '}
                  <Link href="/services" className="underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink">services</Link> that make it possible.
                </>
              }
            />
            <ul className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {locationCards.map((loc) => (
                <LocationCard
                  key={loc.name}
                  photo={{ src: loc.image, alt: loc.name }}
                  title={loc.name}
                  meta={loc.location}
                  body={loc.description}
                  exploreHref={loc.href}
                  book={loc.book}
                  sizes="(min-width: 1024px) 520px, (min-width: 768px) 60vw, 120vw"
                />
              ))}
            </ul>
          </div>
        </section>

        {/* AI-Ready Answers — Frequently Asked Questions */}
        <section className={`py-14 md:py-20 ${bandWhite} border-t border-lake-line`}>
          <div className={frame}>
            <div className="max-w-3xl mx-auto">
              <Eyebrow label="Quick Answers" rule className="mb-4" />
              <h2 className={`${h2Class} text-lake-ink mb-8`}>Frequently Asked Questions</h2>
              <div className="divide-y divide-lake-line border-t border-b border-lake-line">
                {experienceFaqs.map((item) => (
                  <div key={item.question} className="py-6">
                    <h3 className="font-lake-serif text-[21px] text-lake-ink">{item.question}</h3>
                    <p className="mt-2 text-[15px] leading-[1.65] text-lake-mute">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="pb-14 md:pb-16">
          <div className={frame}>
            <p className="text-center text-sm text-lake-mute">
              <Link href="/contact" className="underline decoration-lake-line decoration-1 underline-offset-4 hover:decoration-lake-ink">
                Reach out
              </Link>{' '}
              with any questions, or explore{' '}
              <Link href="/careers" className="underline decoration-lake-line decoration-1 underline-offset-4 hover:decoration-lake-ink">
                career opportunities
              </Link>{' '}
              with our team. Return to our{' '}
              <Link href="/" className="underline decoration-lake-line decoration-1 underline-offset-4 hover:decoration-lake-ink">
                homepage
              </Link>{' '}
              to see everything we offer.
            </p>
          </div>
        </section>

        <ClosingCta
          photo={{ src: '/images/Burlingame1-2048x1365.jpg', alt: 'Watchaug Pond, one of the twelve recreation areas BA Services manages' }}
          heading="Ready to Start Your Adventure?"
          text="Book your stay at one of our pristine recreation areas today."
          primary={{ label: 'Reserve / Check Availability', url: '#all-recreation-areas', kind: 'internal' }}
          phone="+1 207 307-7903"
          secondary={{ label: 'Leave a review after your visit', url: '/leave-a-review', kind: 'internal' }}
        />
        <StickyBooking
          name="BA Services"
          cta={{ label: 'Reserve / Check Availability', url: '#all-recreation-areas', kind: 'internal' }}
          phone="+1 207 307-7903"
        />
      </LakesideShell>

      <Footer />
    </main>
  )
}
