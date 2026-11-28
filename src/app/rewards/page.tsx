import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import { faq } from '@/lib/schema'
import { ListenButton } from '@/components/reader'
import {
  LakesideShell,
  Eyebrow,
  frame,
  h2 as h2Class,
  pillLight,
  pillGhostLight,
  bandTint,
  bandWhite,
} from '@/components/property/lakeside'

export const metadata = {
  title: { absolute: 'BA Services Camper Rewards Program | Earn Points on Every Stay' },
  description:
    'Earn points on every cabin, campsite, and watercraft booking across BA Services recreation areas in 9 states. Preview member perks and book your next stay.',
  alternates: {
    canonical: '/rewards',
  },
  openGraph: og('/rewards'),
}

const howItWorks = [
  {
    step: '01',
    title: 'Book Direct at Any Property',
    description:
      'Reserve cabins, RV sites, tent campsites, or watercraft rentals directly through BA Services across our national forest and state park destinations.',
  },
  {
    step: '02',
    title: 'Collect Points on Every Stay',
    description:
      'Once the program launches, eligible bookings automatically build your balance without coupon codes or extra paperwork.',
  },
  {
    step: '03',
    title: 'Redeem for Upgrades & Early Access',
    description:
      'Apply rewards toward cabin upgrades, complimentary watercraft add-ons, seasonal member rates, and priority peak-season booking windows.',
  },
]

const upcomingPerks = [
  {
    title: 'Earn Points on Every Stay',
    description: 'Collect points each time you book a cabin, campsite, or watercraft rental.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: 'Exclusive Member Discounts',
    description: 'Unlock special rates and seasonal offers available only to rewards members.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
  {
    title: 'Free Upgrades & Add-Ons',
    description: 'Redeem your points for cabin upgrades, free kayak rentals, and more.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
  },
  {
    title: 'Early Access & Priority Booking',
    description: 'Get first dibs on peak-season dates and new properties before everyone else.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

const rewardsFaqs = [
  {
    question: 'When does the BA Services Rewards program launch?',
    answer:
      'The rewards program is currently in development. Guests who book directly with BA Services or contact our team will be among the first notified when enrollment opens.',
  },
  {
    question: 'Which bookings will qualify for rewards points?',
    answer:
      'The program is being designed for cabins, campsites, and watercraft rentals booked across BA Services-managed recreation areas.',
  },
  {
    question: 'Do I need to wait for launch to book my next trip?',
    answer:
      'No. You can book cabins, campsites, and outdoor experiences right now across our national forest and state park properties.',
  },
  {
    question: 'How can I stay updated on the launch?',
    answer:
      'Reach out through our contact page or call +1 207 307-7903 if you have questions about upcoming group stays or member perks.',
  },
]

export default function RewardsPage() {
  return (
    <>
      <Navigation />
      <PageSchema
        url="/rewards"
        name="BA Services Camper Rewards Program | Earn Points on Every Stay"
        crumbName="Rewards"
        description={metadata.description}
        nodes={[faq('/rewards', rewardsFaqs)]}
      />
      <main className="pt-28">
        <LakesideShell>
          {/* Band 1 — Hook */}
          <section className="relative bg-lake-spruce py-20 md:py-24 overflow-hidden">
            <div className="absolute inset-0 opacity-10" aria-hidden="true">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                }}
              />
            </div>
            <div className={`${frame} max-w-4xl text-center relative`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Coming Soon
              </div>
              <h1 className="font-lake-serif headline-xl text-white mb-6">
                BA Services Camper Rewards
              </h1>
              <div className="mb-6 flex justify-center">
                <ListenButton variant="light" />
              </div>
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Earn points on every cabin, campsite, and watercraft booking across BA Services recreation areas — and unlock member-only upgrades and priority booking.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/experiences" className={pillLight}>
                  Book Your Next Adventure
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <Link href="/contact" className={pillGhostLight}>
                  Ask About Upcoming Perks
                </Link>
              </div>
            </div>
          </section>

          {/* Band 2 — Proof & Mechanism */}
          <section className={`py-14 md:py-20 ${bandWhite} border-b border-lake-line`}>
            <div className={frame}>
              <div className="max-w-2xl mb-12">
                <Eyebrow label="How It Works" rule className="mb-4" />
                <h2 className={`${h2Class} text-lake-ink mb-4`}>
                  Built for Returning Campers &amp; Families
                </h2>
                <p className="text-lake-mute text-[17px] leading-relaxed">
                  From weekend cabin getaways in Michigan to lakefront campgrounds in Indiana and Missouri, every stay moves you closer to member perks.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {howItWorks.map((item) => (
                  <div key={item.step} className="rounded-md border border-lake-line bg-lake-paper/40 p-6">
                    <span className="text-xs font-semibold tracking-widest uppercase text-lake-spruce">{item.step}</span>
                    <h3 className="font-lake-serif text-[21px] text-lake-ink mt-2 mb-2">{item.title}</h3>
                    <p className="text-lake-mute text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Band 3 — Perks Preview */}
          <section className="py-14 md:py-24">
            <div className={frame}>
              <div className="text-center mb-14">
                <Eyebrow label="Member Perks" rule className="mb-4 flex flex-col items-center" />
                <h2 className={`${h2Class} text-lake-ink mb-4`}>What to Expect at Launch</h2>
                <p className="text-lake-mute max-w-xl mx-auto">
                  Here&apos;s a preview of what&apos;s in store when the BA Services Rewards program goes live.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {upcomingPerks.map((perk) => (
                  <div
                    key={perk.title}
                    className="flex gap-5 rounded-md border border-lake-line bg-white p-6"
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-lake-spruce/10 text-lake-spruce flex items-center justify-center">
                      {perk.icon}
                    </div>
                    <div>
                      <h3 className="font-lake-serif text-[19px] text-lake-ink mb-1">{perk.title}</h3>
                      <p className="text-lake-mute text-sm leading-relaxed">{perk.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Band 4 — FAQ */}
          <section className={`py-14 md:py-20 ${bandWhite} border-t border-lake-line`}>
            <div className={`${frame} max-w-3xl`}>
              <div className="text-center mb-10">
                <Eyebrow label="Program Details" rule className="mb-4 flex flex-col items-center" />
                <h2 className={`${h2Class} text-lake-ink`}>Frequently Asked Questions</h2>
              </div>
              <div className="divide-y divide-lake-line border-t border-b border-lake-line">
                {rewardsFaqs.map((item) => (
                  <div key={item.question} className="py-6">
                    <h3 className="font-lake-serif text-[19px] text-lake-ink mb-2">{item.question}</h3>
                    <p className="text-lake-mute text-[15px] leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Band 5 — Closing Conversion Door */}
          <section className={`py-20 ${bandTint}`}>
            <div className={`${frame} max-w-2xl text-center`}>
              <h2 className="font-lake-serif text-[32px] md:text-[40px] text-lake-ink mb-4">
                Start Planning Your Next Stay
              </h2>
              <p className="text-lake-mute mb-8">
                The rewards program is currently in development. In the meantime, explore our campgrounds, cabins, and outdoor centers across 9 states.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/experiences"
                  className="inline-flex min-h-[56px] items-center gap-2 rounded-full bg-lake-spruce px-8 text-base font-medium text-lake-paper hover:bg-lake-spruce-dark transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce"
                >
                  Book Your Next Adventure
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <a
                  href="tel:+12073077903"
                  className="inline-flex min-h-[56px] items-center gap-2 rounded-full border border-lake-spruce/30 px-7 text-base font-medium text-lake-ink hover:border-lake-spruce transition-colors"
                >
                  Call +1 207 307-7903
                </a>
              </div>
            </div>
          </section>
        </LakesideShell>
      </main>
      <Footer />
    </>
  )
}
