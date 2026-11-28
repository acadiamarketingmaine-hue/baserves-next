import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import { ID, ORIGIN, offer, ref, type Node } from '@/lib/schema'
import { ClosingCta, Hero, IntroFacts, LakesideShell, SectionActions, SectionHeader, StickyBooking, bandWhite, frame } from '@/components/property/lakeside'
import { resolveBookingCta } from '@/components/pages/experiences/bookingLinks'
import LocationCard from '@/components/pages/experiences/LocationCard'

const categoryData: Record<string, any> = {
  'kayak-and-watercraft-rentals': {
    detailLabel: 'Duration',
    priceLabel: 'Rates',
    name: 'Kayak & Watercraft Rentals',
    description: 'Get out on the water with our selection of kayaks, canoes, rafts, and paddleboards available at multiple locations.',
    image: '/images/burlingame-kayaks.png',
    experiences: [
      { name: 'Meramec River Float Trips', location: 'Meramec State Park, Sullivan, MO', duration: 'Half day – Full day', price: 'Canoe from $54 / Kayak from $42', image: '/images/Meramec-State-Park-Overview-Image.jpg', href: '/experiences/meramec-state-park' },
      { name: 'Washington State Park Watercraft', location: 'Washington State Park, De Soto, MO', duration: 'Hourly / Half day', price: 'Contact for rates', image: '/images/washington-state-park/store.jpg', href: '/washington-state-park' },
      { name: 'Burlingame State Park Boating', location: 'Burlingame State Park, Charlestown, RI', duration: 'Daily', price: 'Contact for rates', image: '/images/Burlingame1-2048x1365.jpg', href: '/experiences/burlingame-state-park' },
    ],
  },
  'campground-rentals': {
    detailLabel: 'Stays',
    priceLabel: 'Sites',
    name: 'Campground Rentals',
    description: 'From primitive tent sites to full-hookup RV spots and rustic cabins, find the perfect stay for your outdoor adventure.',
    image: '/images/corinth-boat-ramp.jpg',
    experiences: [
      { name: 'Clear Creek Recreation Area', location: 'Bankhead National Forest, AL', duration: 'Nightly', price: '102 sites — 4 loops', image: '/images/clear-creek-swimming.jpg', href: '/experiences/clear-creek-recreation-area' },
      { name: 'Corinth Recreation Area', location: 'Bankhead National Forest, AL', duration: 'Nightly', price: '52 full-hookup + 10 tent', image: '/images/corinth-boat-ramp.jpg', href: '/experiences/corinth-recreation-area' },
      { name: 'Burlingame State Park', location: 'Charlestown, RI', duration: 'Nightly', price: '755 sites + 20 cabins', image: '/images/Burlingame2-1536x1152.jpg', href: '/experiences/burlingame-state-park' },
      { name: 'Canal Bridge Campground', location: 'Fryeburg, ME', duration: 'Nightly', price: '36 sites + 5 tent', image: '/images/canal-bridge/beach-1.jpg', href: '/experiences/canal-bridge' },
      { name: 'Meramec State Park', location: 'Sullivan, MO', duration: 'Nightly', price: '19 cabins + motel', image: '/images/meramec-state-park/cabin-2.jpg', href: '/experiences/meramec-state-park' },
      { name: 'Washington State Park', location: 'De Soto, MO', duration: 'Nightly', price: 'Cabins + campsites', image: '/images/washington-state-park/cabin-11-exterior.png', href: '/washington-state-park' },
      { name: 'Tipsaw Lake Recreation Area', location: 'Perry County, IN', duration: 'Nightly', price: '49 sites — 3 loops', image: '/images/tipsaw-lake/beach-swimming.jpg', href: '/tipsaw-lake-recreation-area' },
      { name: 'Hardin Ridge Recreation Area', location: 'Monroe County, IN', duration: 'Nightly', price: '195 sites', image: '/images/hardin-ridge/overlook.jpg', href: '/hardin-ridge-recreation-area' },
      { name: 'Indian-Celina Lakes Recreation Area', location: 'Perry County, IN', duration: 'Nightly', price: '59 sites', image: '/images/indian-celina/lake-view.jpg', href: '/indian-celina-lakes-recreation-area' },
      { name: 'Yankee Springs Recreation Area', location: 'Barry County, MI', duration: 'Nightly', price: '200+ sites', image: '/images/yankee-springs/hill-cabins.jpg', href: '/yankee-springs-recreation-area' },
      { name: 'Long Lake Outdoor Center', location: 'Middleville, MI', duration: 'Nightly / Weekly', price: '16 cabins + lodge', image: '/images/long-lake/fall-aerial.jpg', href: '/long-lake-outdoor-center' },
      { name: 'Monongahela National Forest', location: 'Eastern West Virginia', duration: 'Nightly', price: 'Multiple campgrounds', image: '/images/monongahela/spruce-knob-panorama.jpg', href: '/monongahela-national-forest' },
    ],
  },
  hiking: {
    detailLabel: 'Size',
    priceLabel: 'Cost',
    name: 'Hiking Trails',
    description: 'Discover hundreds of miles of scenic trails through forests, along lakeshores, and into wilderness areas.',
    image: '/images/bankhead-bicycle-trail.jpg',
    experiences: [
      { name: 'Monongahela National Forest Trails', location: 'Eastern West Virginia', duration: '800+ miles', price: 'Free', image: '/images/monongahela/spruce-treetops.jpg', href: '/monongahela-national-forest' },
      { name: 'Sipsey Wilderness Trails', location: 'Bankhead National Forest, AL', duration: '25,000 acres', price: 'Free', image: '/images/Bankhead-Waterfall.png', href: '/bankhead-national-forest' },
      { name: 'Yankee Springs Trail System', location: 'Barry County, MI', duration: '30+ miles', price: 'Free', image: '/images/yankee-springs/hill-cabins.jpg', href: '/yankee-springs-recreation-area' },
      { name: 'Hardin Ridge Trails', location: 'Monroe County, IN', duration: '12+ miles', price: 'Free', image: '/images/hardin-ridge/overlook.jpg', href: '/hardin-ridge-recreation-area' },
      { name: 'Indian-Celina Two Lakes Loop', location: 'Perry County, IN', duration: 'Trail loops', price: 'Free', image: '/images/indian-celina/trail-sign.jpg', href: '/indian-celina-lakes-recreation-area' },
      { name: 'Meramec State Park Trails', location: 'Sullivan, MO', duration: '16 miles', price: 'Free', image: '/images/meramec-entrance-sign.jpg', href: '/experiences/meramec-state-park' },
      { name: 'Washington State Park Trails', location: 'De Soto, MO', duration: '10+ miles', price: 'Free', image: '/images/washington-state-park/cabin-11-exterior.png', href: '/washington-state-park' },
      { name: 'Tipsaw Lake Trails', location: 'Perry County, IN', duration: '8+ miles', price: 'Free', image: '/images/tipsaw-lake/amphitheater.jpg', href: '/tipsaw-lake-recreation-area' },
      { name: 'Raven Interpretive Trail', location: 'Clear Creek, Bankhead NF, AL', duration: '2.5 miles', price: 'Free', image: '/images/DSC_0103-2048x1365.jpg', href: '/experiences/clear-creek-recreation-area' },
      { name: 'Burlingame State Park Trails', location: 'Charlestown, RI', duration: 'Multiple trails', price: 'Free', image: '/images/burlingame-entrance-sign.jpg', href: '/experiences/burlingame-state-park' },
    ],
  },
  'scenic-drives': {
    detailLabel: 'Drive',
    priceLabel: 'Cost',
    name: 'Scenic Drives',
    description: 'Scenic drives on BA Services land, including the 43-mile Highland Scenic Highway in Monongahela National Forest and forest roads in Alabama and Indiana.',
    image: '/images/monongahela/scenic-drive.jpg',
    experiences: [
      { name: 'Highland Scenic Highway', location: 'Monongahela National Forest, WV', duration: '43 miles', price: 'Free', image: '/images/monongahela/scenic-drive.jpg', href: '/monongahela-national-forest' },
      { name: 'Bankhead National Forest Scenic Drive', location: 'Northwest Alabama', duration: '2-3 hours', price: 'Free', image: '/images/corinth-boat-ramp.jpg', href: '/bankhead-national-forest' },
      { name: 'Hoosier National Forest Drive', location: 'Southern Indiana', duration: '2-3 hours', price: 'Free', image: '/images/indian-celina/fall-road.jpg', href: '/hardin-ridge-recreation-area' },
    ],
  },
  'conference-center-rentals': {
    detailLabel: 'Booking',
    priceLabel: 'Details',
    name: 'Conference Center Rentals',
    description: 'Conference and event space at Long Lake Outdoor Center, Meramec State Park, and the 100-person Corinth Pavilion in Bankhead National Forest.',
    image: '/images/long-lake/weddings/dining-hall.jpg',
    experiences: [
      { name: 'Long Lake Outdoor Center', location: 'Middleville, MI', duration: 'Daily / Weekly', price: 'Contact for rates', image: '/images/long-lake/weddings/dining-hall.jpg', href: '/long-lake-outdoor-center' },
      { name: 'Meramec State Park Conference Center', location: 'Sullivan, MO', duration: 'Daily', price: 'Contact for rates', image: '/images/meramec-state-park/conference-center.jpg', href: '/experiences/meramec-state-park' },
      { name: 'Corinth Pavilion', location: 'Bankhead National Forest, AL', duration: 'Daily', price: '100-person capacity', image: '/images/corinth-pavilion.jpg', href: '/experiences/corinth-recreation-area' },
    ],
  },
  'lookout-pavillions': {
    detailLabel: 'Booking',
    priceLabel: 'Details',
    name: 'Lookout Pavilions',
    description: 'Reserve scenic overlooks and covered pavilions for picnics, gatherings, and enjoying panoramic views.',
    image: '/images/meramec-state-park/overlook-pavilion.jpg',
    experiences: [
      { name: 'Meramec Overlook Pavilion', location: 'Meramec State Park, Sullivan, MO', duration: 'Daily', price: 'Contact for rates', image: '/images/meramec-state-park/overlook-pavilion.jpg', href: '/experiences/meramec-state-park' },
      { name: 'Hardin Ridge Picnic Shelters', location: 'Monroe Lake, IN', duration: 'Daily', price: 'From $50', image: '/images/hardin-ridge/shelter.jpg', href: '/hardin-ridge-recreation-area' },
      { name: 'Clear Creek Group Shelters', location: 'Bankhead National Forest, AL', duration: 'Daily', price: 'Reservable', image: '/images/clear-creek-shelter.jpg', href: '/experiences/clear-creek-recreation-area' },
      { name: 'Tipsaw Lake Pavilion', location: 'Perry County, IN', duration: 'Daily', price: 'From $40', image: '/images/tipsaw-lake/shelter.jpg', href: '/tipsaw-lake-recreation-area' },
    ],
  },
}

/**
 * Offers only from rates the card actually prints on this page ("Free" → 0;
 * "Contact for rates" / site counts → no Offer). Never invent a price.
 */
function printedOffers(category: any): Node[] {
  const offers: Node[] = []
  for (const exp of category.experiences as any[]) {
    const price: string = String(exp.price ?? '')
    if (/^free$/i.test(price.trim())) {
      offers.push(offer({ name: `${exp.name} — ${price}`, price: '0', url: exp.href }))
      continue
    }
    const re = /\$\s?([\d,]+(?:\.\d{2})?)/g
    const amounts: number[] = []
    let m: RegExpExecArray | null
    while ((m = re.exec(price)) !== null) {
      const n = Number(m[1].replace(/,/g, ''))
      if (Number.isFinite(n)) amounts.push(n)
    }
    if (!amounts.length) continue
    offers.push(offer({ name: `${exp.name} — ${price}`, price: String(Math.min(...amounts)), url: exp.href }))
  }
  return offers
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {  const category = categoryData[params.category]
  if (!category) {
    return {
      title: { absolute: 'Category Not Found | BA Services' },
      alternates: { canonical: `/experiences/categories/${params.category}` },
      openGraph: og(`/experiences/categories/${params.category}`),
    }
  }
  return {
    title: { absolute: `${category.name} | BA Services` },
    description: category.description,
    alternates: { canonical: `/experiences/categories/${params.category}` },
    openGraph: og(`/experiences/categories/${params.category}`),
  }
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const category = categoryData[params.category]

  if (!category) notFound()

  const cards = await Promise.all(
    (category.experiences as any[]).map(async (exp) => ({
      ...exp,
      book: await resolveBookingCta(exp.href),
    })),
  )
  const offers = printedOffers(category)

  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url={`/experiences/categories/${params.category}`}
        routeKey="/experiences/categories/[category]"
        name={`${category.name} | BA Services`}
        crumbName={category.name}
        description={category.description}
        type="CollectionPage"
        image={category.image}
        crumbs={[{ name: 'Experiences', url: '/experiences' }]}
        mainEntity={`${ORIGIN}/experiences/categories/${params.category}#service`}
        nodes={[
          {
            '@type': 'Service',
            '@id': `${ORIGIN}/experiences/categories/${params.category}#service`,
            name: category.name,
            serviceType: 'Recreation Area Services',
            description: category.description,
            url: `/experiences/categories/${params.category}`,
            provider: ref(ID.business),
            ...(offers.length ? { offers } : {}),
          },
        ]}
      />

      <LakesideShell>
        <Hero
          photo={{ src: category.image, alt: category.name }}
          eyebrow="Experiences"
          title={category.name}
          subline={category.description}
          booking={{
            title: `Reserve ${category.name}`,
            cta: {
              label: params.category === 'campground-rentals' ? 'Reserve / Check Availability' : 'Explore & Reserve',
              url: '#available-experiences',
              kind: 'internal',
            },
          }}
        />

        <IntroFacts
          eyebrowRule
          heading={`Why Book ${category.name} With BA Services`}
          lead={category.description}
          facts={[{ key: 'count', value: String(category.experiences.length), label: 'Locations' }]}
        >
          <SectionActions
            className="mt-8 md:mt-10"
            primary={{ label: 'Explore & Reserve', url: '#available-experiences', kind: 'internal' }}
            secondary={[{ label: 'View All Experiences', url: '/experiences', kind: 'internal', style: 'link' }]}
          />
        </IntroFacts>

        {/* Available Experiences: a photo-led grid with real Explore + Book actions. */}
        <section id="available-experiences" className={`py-14 md:py-24 lg:py-[120px] ${bandWhite} scroll-mt-28`}>
          <div className={frame}>
            <SectionHeader heading="Explore & Reserve by Location" />
            <ul className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {cards.map((exp) => (
                <LocationCard
                  key={exp.name}
                  photo={{ src: exp.image, alt: exp.name }}
                  title={exp.name}
                  meta={exp.location}
                  body={`${category.detailLabel}: ${exp.duration} · ${category.priceLabel}: ${exp.price}`}
                  exploreHref={exp.href}
                  book={exp.book}
                  sizes="(min-width: 1024px) 520px, (min-width: 768px) 60vw, 120vw"
                />
              ))}
            </ul>
          </div>
        </section>

        <ClosingCta
          photo={{ src: category.image, alt: category.name }}
          heading={`Ready to Book ${category.name}?`}
          text="Compare locations, check open dates, and reserve your spot online in minutes."
          primary={{ label: 'Choose a Location', url: '#available-experiences', kind: 'internal' }}
          secondary={{ label: 'Contact Our Team', url: '/contact', kind: 'internal' }}
        />
        <StickyBooking
          name={category.name}
          cta={{
            label: params.category === 'campground-rentals' ? 'Reserve / Check Availability' : 'Explore & Reserve',
            url: '#available-experiences',
            kind: 'internal',
          }}
        />
      </LakesideShell>

      <Footer />
    </main>
  )
}
