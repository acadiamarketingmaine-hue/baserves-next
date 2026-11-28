import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import { ListenButton } from '@/components/reader'
import { ORIGIN, ID, abs, ref, stateId, offer, faq } from '@/lib/schema'
import {
  LakesideShell,
  SectionHeader,
  RuledRows,
  ClosingCta,
  frame,
  bandWhite,
  pillLight,
  pillGhostLight,
  textLink,
  eyebrow as eyebrowClass,
} from '@/components/property/lakeside'

export const metadata = {
  title: { absolute: 'BA Services Pricing | Cabin, Campground & Wedding Rates' },
  description:
    'Every published BA Services rate in one place: Meramec cabins and motel, canoe and kayak rentals, Bankhead range admission, and Long Lake weddings.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: og('/pricing'),
}

/**
 * One source of truth: every row is a rate printed on its own park page
 * (never invented). The visible board and the Offer schema both read this.
 */
type RateRow = {
  /** Schema offer name — states the site and the unit. */
  name: string
  /** Label as shown on the board. */
  label: string
  /** Small line under the label (what the price is per, conditions). */
  note?: string
  /** Numeric price for the schema, plain USD. */
  amount: string
  /** Prefix the display price with "From" (printed minimums). */
  from?: boolean
}

type RateGroup = {
  id: string
  title: string
  place: string
  rows: RateRow[]
  footnote?: string
  link: { label: string; href: string }
}

const RATE_GROUPS: RateGroup[] = [
  {
    id: 'meramec-lodging',
    title: 'Meramec State Park — Lodging',
    place: 'Sullivan, Missouri',
    rows: [
      { name: 'Meramec State Park 1-Bedroom Cabin (per night)', label: '1-Bedroom Cabin', note: 'Per night · sleeps couples or small families', amount: '140' },
      { name: 'Meramec State Park 2-Bedroom Cabin (per night)', label: '2-Bedroom Cabin', note: 'Per night · room for the whole family', amount: '170' },
      { name: 'Meramec State Park Large Cabin (per night)', label: 'Large Cabin', note: 'Per night · reunions and group getaways', amount: '345' },
      { name: 'Hickory Ridge Motel Standard Room (per night)', label: 'Hickory Ridge Motel — Standard Room', note: 'Per night', amount: '90' },
      { name: 'Hickory Ridge Motel Loft Room (per night)', label: 'Hickory Ridge Motel — Loft Room', note: 'Per night · rooms 111, 202, 208', amount: '130' },
    ],
    footnote: '$20 pet fee and $20 extra-person fee apply. Two-night minimum stay.',
    link: { label: 'See the cabins at Meramec', href: '/experiences/meramec-state-park' },
  },
  {
    id: 'meramec-watercraft',
    title: 'Meramec State Park — Watercraft Rentals',
    place: 'On the Meramec River',
    rows: [
      { name: 'Meramec canoe rental — weekday', label: 'Canoe — Weekday', amount: '54' },
      { name: 'Meramec canoe rental — weekend', label: 'Canoe — Weekend', amount: '64' },
      { name: 'Meramec kayak rental — weekday', label: 'Kayak — Weekday', amount: '42' },
      { name: 'Meramec kayak rental — weekend', label: 'Kayak — Weekend', amount: '47' },
    ],
    footnote: 'Also available in various sizes — visit the Riverstop Store for full pricing.',
    link: { label: 'Plan a float on the Meramec', href: '/experiences/meramec-state-park' },
  },
  {
    id: 'day-use',
    title: 'Day-Use & Shelters',
    place: 'Alabama & Indiana',
    rows: [
      { name: 'Hurricane Creek Shooting Range admission (per person)', label: 'Hurricane Creek Shooting Range', note: 'Per person · 8 covered benches, open year-round', amount: '3' },
      { name: 'Hardin Ridge Picnic Shelters (per day)', label: 'Hardin Ridge Picnic Shelters', note: 'Per day · Monroe Lake, Indiana', amount: '50', from: true },
      { name: 'Tipsaw Lake Pavilion (per day)', label: 'Tipsaw Lake Pavilion', note: 'Per day · Perry County, Indiana', amount: '40', from: true },
    ],
    footnote: 'The range is ADA accessible. Shelters are reservable for picnics and gatherings.',
    link: { label: 'Browse all experiences', href: '/experiences' },
  },
  {
    id: 'long-lake-weddings',
    title: 'Long Lake Outdoor Center — Weddings',
    place: 'Middleville, Michigan',
    rows: [
      { name: 'Long Lake wedding weekend, 2027', label: 'Wedding Weekend, 2027', note: 'Friday 3pm setup, Saturday wedding, out by 11am Sunday · cleaning included', amount: '3800' },
      { name: 'Long Lake wedding weekend, 2028', label: 'Wedding Weekend, 2028', note: 'Friday 3pm setup, Saturday wedding, out by 11am Sunday · cleaning included', amount: '4300' },
      { name: 'Long Lake one-evening wedding, 2027', label: 'One Evening, 2027', note: '3pm arrival, party until midnight, out by 11am', amount: '1500' },
      { name: 'Long Lake third-day add-on', label: 'Add a Third Day', note: 'Before or after your weekend', amount: '1500' },
    ],
    footnote: 'Entire camp, exclusive use: 16 cabins and 4 bunkhouses sleeping up to 120.',
    link: { label: 'See the Long Lake wedding page', href: '/long-lake-outdoor-center/weddings' },
  },
]

const priceLabel = (r: RateRow) => `${r.from ? 'From ' : ''}$${Number(r.amount).toLocaleString('en-US')}`

/** FAQs — the visible answers below and the FAQPage schema read this same list. */
const pricingFaqs = [
  {
    question: 'How much does it cost to stay at Meramec State Park?',
    answer:
      'One-bedroom cabins are $140 a night, two-bedroom cabins are $170, and the large cabins are $345. At the Hickory Ridge Motel inside the park, standard rooms are $90 a night and loft rooms are $130. A $20 pet fee and a $20 extra-person fee apply, with a two-night minimum stay.',
  },
  {
    question: 'How much are canoe and kayak rentals on the Meramec River?',
    answer:
      'Canoes rent for $54 on weekdays and $64 on weekends. Kayaks are $42 on weekdays and $47 on weekends. Additional sizes are priced at the Riverstop Store in the park.',
  },
  {
    question: 'What does a wedding weekend at Long Lake Outdoor Center cost?',
    answer:
      'A full wedding weekend is $3,800 in 2027 and $4,300 in 2028, running from Friday at 3pm through Sunday at 11am with cleaning included. A one-evening wedding in 2027 is $1,500, and adding a third day before or after your weekend is $1,500.',
  },
  {
    question: 'How much does the shooting range cost at Bankhead National Forest?',
    answer:
      'Admission to the Hurricane Creek Shooting Range is $3 per person. The range has eight covered benches, is open year-round, and is ADA accessible.',
  },
  {
    question: 'Can I get a refund if my trip changes?',
    answer:
      'Standard reservations cancelled 14 or more days before arrival receive a full refund minus a $10 processing fee; seven to 13 days out is a 50% refund; inside seven days is not refundable. Group reservations of 10 or more sites follow the same pattern with 30 or more days (full refund minus a $25 processing fee), 14 to 29 days (50%), and no refund inside 14 days. If severe weather closes a campground, you choose a full refund, credit toward a future reservation, or rescheduling at no extra charge.',
  },
  {
    question: 'Where are the rates for the other parks and campgrounds?',
    answer:
      'Every park page on this site prints its own rates for campsites, cabins, group shelters, and rentals before you pick dates, so the figure you read on the park page is the figure you book at. If a page does not show a rate, call +1 207 307-7903 and our team will confirm it.',
  },
]

/** Schema offers — built from the same rows, so nothing is ever invented. */
const rateOffers = RATE_GROUPS.flatMap((g) =>
  g.rows.map((r) =>
    offer({
      name: r.name,
      price: r.amount,
      url: g.link.href,
      description: `${priceLabel(r)} — as printed on ${g.title}${r.note ? ` (${r.note})` : ''}`,
    })
  )
)

function RateBoard({ group }: { group: RateGroup }) {
  return (
    <div id={group.id} className="scroll-mt-28">
      <p className={`${eyebrowClass} text-lake-moss`}>{group.place}</p>
      <h3 className="mt-2 font-lake-serif text-[26px] leading-[1.15] text-lake-ink md:text-[32px]">{group.title}</h3>
      <dl className="mt-5 border-t border-lake-line">
        {group.rows.map((r) => (
          <div key={r.name} className="flex items-baseline justify-between gap-6 border-b border-lake-line py-4">
            <div className="min-w-0">
              <dt className="text-[15px] font-medium text-lake-ink md:text-base">{r.label}</dt>
              {r.note && <dd className="mt-0.5 text-sm text-lake-mute">{r.note}</dd>}
            </div>
            <dd className="shrink-0 font-lake-serif text-[24px] leading-none text-lake-ink md:text-[28px]">{priceLabel(r)}</dd>
          </div>
        ))}
      </dl>
      {group.footnote && <p className="mt-4 text-sm leading-relaxed text-lake-mute">{group.footnote}</p>}
      <Link href={group.link.href} className={`${textLink} mt-2 text-[15px]`}>
        {group.link.label} →
      </Link>
    </div>
  )
}

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url="/pricing"
        name="BA Services Pricing & Rates"
        crumbName="Pricing"
        description="Every published BA Services rate in one place: Meramec cabins and motel, canoe and kayak rentals, Bankhead range admission, and Long Lake weddings."
        image="/images/meramec-state-park/cabin-2.jpg"
        mainEntity={`${ORIGIN}/pricing#rates`}
        nodes={[
          {
            '@type': 'Service',
            '@id': `${ORIGIN}/pricing#rates`,
            name: 'Published Recreation Rates',
            serviceType: 'Recreation Area Reservations',
            description:
              'The cabin, motel, watercraft, shooting-range, shelter, and wedding rates BA Services publishes for the recreation areas it manages, with the same figures printed on every park page.',
            url: abs('/pricing'),
            provider: ref(ID.business),
            areaServed: [
              ref(stateId('al')),
              ref(stateId('in')),
              ref(stateId('mi')),
              ref(stateId('mo')),
            ],
            offers: rateOffers,
          },
          faq('/pricing', pricingFaqs),
        ]}
      />

      <LakesideShell>
        {/* Band 1 — Hook */}
        <section className="relative pt-32 pb-20 bg-lake-spruce overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('/images/meramec-state-park/cabin-2.jpg')" }}
            aria-hidden="true"
          />
          <div className={`relative z-10 ${frame}`}>
            <div className="max-w-3xl">
              <h1 className="font-lake-serif headline-xl text-white mb-4">
                Know the Price Before You Pack.
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-white/95 mb-5 leading-snug">
                Every published rate for the parks BA Services manages.
              </h2>
              <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-2xl">
                Cabins and a motel at Meramec State Park, canoe and kayak rentals, shooting-range
                admission at Bankhead, reservable shelters in Indiana, and wedding weekends at Long
                Lake — the same figures printed on every park page, gathered in one place.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/experiences" className={pillLight}>
                  Browse Parks &amp; Campgrounds
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a href="tel:+12073077903" className={pillGhostLight}>
                  Call +1 207 307-7903
                </a>
              </div>
              <div className="mt-6">
                <ListenButton variant="light" />
              </div>
            </div>
          </div>
        </section>

        {/* Band 2 — Awe: what the money reserves, with real row photos */}
        <section className="py-16 md:py-20">
          <div className={frame}>
            <SectionHeader
              heading="What your money reserves"
              intro="Historic CCC cabins, a motel by the river, canoes on a floatable state park river, a year-round range, and a whole camp for a wedding — each rate below is printed on its park page."
            />
            <div className="mt-10">
              <RuledRows
                rows={[
                  {
                    key: 'cabins',
                    title: 'Cabins at Meramec',
                    meta: 'From $140/night',
                    body: 'Stone-and-timber cabins from the 1930s, from one-bedroom retreats to large cabins for reunions. Two-night minimum.',
                    image: { src: '/images/meramec-state-park/cabin-2.jpg', alt: 'A rustic cabin at Meramec State Park' },
                    href: '/experiences/meramec-state-park',
                    linkLabel: 'See cabin rates',
                  },
                  {
                    key: 'motel',
                    title: 'Hickory Ridge Motel',
                    meta: 'From $90/night',
                    body: 'Standard and loft rooms inside Meramec State Park, near the river, the trails, and the Fireside Store.',
                    image: { src: '/images/meramec-state-park/hickory-ridge-motel.jpg', alt: 'The Hickory Ridge Motel at Meramec State Park' },
                    href: '/experiences/meramec-state-park',
                    linkLabel: 'See motel rates',
                  },
                  {
                    key: 'watercraft',
                    title: 'Canoe & Kayak Rentals',
                    meta: 'From $42',
                    body: 'Weekday and weekend rates on the Meramec River: canoes $54–$64, kayaks $42–$47.',
                    image: { src: '/images/meramec-state-park/watercraft-rentals.jpg', alt: 'Watercraft rentals at Meramec State Park' },
                    href: '/experiences/categories/kayak-and-watercraft-rentals',
                    linkLabel: 'Browse watercraft',
                  },
                  {
                    key: 'weddings',
                    title: 'Wedding Weekends at Long Lake',
                    meta: 'From $1,500',
                    body: 'The entire camp for your wedding, exclusive use: 16 cabins, four bunkhouses, lodge, and dining hall seating 120.',
                    image: { src: '/images/long-lake/weddings/dining-hall.jpg', alt: 'The dining hall, with timber trusses and a stone fireplace' },
                    href: '/long-lake-outdoor-center/weddings',
                    linkLabel: 'See wedding rates',
                  },
                  {
                    key: 'range',
                    title: 'Shooting Range at Bankhead',
                    meta: '$3 per person',
                    body: 'Eight covered benches at the Hurricane Creek range in Bankhead National Forest, open year-round and ADA accessible.',
                    image: { src: '/images/bankhead-bicycle-trail.jpg', alt: 'A trail through Bankhead National Forest' },
                    href: '/bankhead-national-forest',
                    linkLabel: 'See Bankhead details',
                  },
                  {
                    key: 'shelters',
                    title: 'Picnic Shelters & Pavilions',
                    meta: 'From $40/day',
                    body: 'Reservable day-use shelters at Hardin Ridge and Tipsaw Lake in southern Indiana.',
                    image: { src: '/images/hardin-ridge/shelter.jpg', alt: 'A picnic shelter at Hardin Ridge Recreation Area' },
                    href: '/experiences/categories/lookout-pavillions',
                    linkLabel: 'Browse pavilions',
                  },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Band 3 — Peak interest: the mechanism */}
        <section className={`py-16 md:py-20 ${bandWhite}`}>
          <div className={frame}>
            <SectionHeader
              heading="How the rate works"
              intro="Four things to know before you book anything on this site."
            />
            <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-4 md:gap-12">
              <div>
                <h3 className="font-lake-serif text-[22px] leading-snug text-lake-ink md:text-[24px]">The printed rate is the rate</h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-lake-mute md:text-base">
                  Every figure here is the same one printed on that park&rsquo;s page. Rates are never quoted — they are published, and you read them before dates.
                </p>
              </div>
              <div>
                <h3 className="font-lake-serif text-[22px] leading-snug text-lake-ink md:text-[24px]">Extras are stated up front</h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-lake-mute md:text-base">
                  Cabin and motel stays carry a two-night minimum, a $20 pet fee, and a $20 extra-person fee. Watercraft have weekday and weekend rates. Nothing is hidden.
                </p>
              </div>
              <div>
                <h3 className="font-lake-serif text-[22px] leading-snug text-lake-ink md:text-[24px]">Book where the rate lives</h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-lake-mute md:text-base">
                  Each park page carries its own reservations and full inventory. Or call +1 207 307-7903 and our team will set the dates up with you.
                </p>
              </div>
              <div>
                <h3 className="font-lake-serif text-[22px] leading-snug text-lake-ink md:text-[24px]">Plans change on published terms</h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-lake-mute md:text-base">
                  Cancellations follow a clear ladder — full refund minus $10 at 14+ days, 50% at 7 to 13 days — and weather closures earn a refund, credit, or free reschedule.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Band 4 — Deep specifics: the board + AI-ready answers */}
        <section className="py-16 md:py-20">
          <div className={frame}>
            <SectionHeader
              heading="The full rate board"
              intro="Grouped by park, with the fee notes exactly as the park pages state them."
            />
            <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-x-16">
              {RATE_GROUPS.map((g) => (
                <RateBoard key={g.id} group={g} />
              ))}
            </div>
            <div className="mt-12 border-t border-lake-line pt-8">
              <h3 className="font-lake-serif text-[22px] leading-snug text-lake-ink md:text-[24px]">Every other park, campground &amp; rest area</h3>
              <p className="mt-3 max-w-2xl text-[15px] leading-[1.65] text-lake-mute md:text-base">
                Campsite prices, cabin weeks, and group shelters for all remaining BA Services
                locations print on their own park pages — before dates, before checkout. If a page
                does not show a rate, call and our team will confirm it.
              </p>
              <Link href="/experiences" className={`${textLink} mt-2`}>
                Browse all parks &amp; campgrounds →
              </Link>
            </div>
          </div>
        </section>

        {/* Band 5 — FAQ (visible text mirrored by FAQPage schema) */}
        <section className={`py-16 md:py-20 ${bandWhite}`}>
          <div className={frame}>
            <div className="max-w-3xl mx-auto">
              <SectionHeader
                heading="Pricing questions, answered"
                intro="The questions our reservation team fields most, answered with the published figures."
                split={false}
              />
              <div className="mt-10 divide-y divide-lake-line border-t border-b border-lake-line">
                {pricingFaqs.map((f) => (
                  <div key={f.question} className="py-6">
                    <h3 className="font-lake-serif text-[19px] text-lake-ink mb-2">{f.question}</h3>
                    <p className="text-lake-mute text-[15px] leading-relaxed">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Band 6 — Inspire frictionless action */}
        <ClosingCta
          photo={{ src: '/images/long-lake/fall-aerial.jpg', alt: 'Long Lake Outdoor Center and the surrounding forest in autumn, from above' }}
          heading="Pick your dates. The price is already printed."
          text="Choose your park, read its rate, and reserve — or call and we will set it up together."
          primary={{ label: 'Browse Parks & Campgrounds', url: '/experiences', kind: 'internal' }}
          phone="+1 207 307-7903"
          secondary={{ label: 'Read the refund & cancellation policy', url: '/refund_returns', kind: 'internal' }}
        />
      </LakesideShell>

      <Footer />
    </main>
  )
}
