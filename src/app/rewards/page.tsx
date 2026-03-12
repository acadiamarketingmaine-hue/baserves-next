import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Rewards | BA Serves',
  description: 'BA Serves rewards program - coming soon. Earn points on every booking and unlock exclusive perks.',
  alternates: {
    canonical: '/rewards',
  },
}

const upcomingPerks = [
  {
    title: 'Earn Points on Every Stay',
    description: 'Collect points each time you book a cabin, campsite, or watercraft rental.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: 'Exclusive Member Discounts',
    description: 'Unlock special rates and seasonal offers available only to rewards members.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
  {
    title: 'Free Upgrades & Add-Ons',
    description: 'Redeem your points for cabin upgrades, free kayak rentals, and more.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
  },
  {
    title: 'Early Access & Priority Booking',
    description: 'Get first dibs on peak-season dates and new properties before everyone else.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function RewardsPage() {
  return (
    <>
      <Navigation />
      <main className="pt-28">
        {/* Hero */}
        <section className="relative bg-forest-DEFAULT py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
          </div>
          <div className="max-w-4xl mx-auto text-center px-6 relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Coming Soon
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              BA Serves Rewards
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              We&apos;re building a rewards program to thank our loyal guests. Earn points on every booking and unlock exclusive perks across all BA Serves properties.
            </p>
          </div>
        </section>

        {/* Perks Preview */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What to Expect</h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Here&apos;s a preview of what&apos;s in store when the rewards program launches.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {upcomingPerks.map((perk) => (
                <div
                  key={perk.title}
                  className="flex gap-5 p-6 rounded-xl border border-gray-100 bg-gray-50/50"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-forest-DEFAULT/10 text-forest-DEFAULT flex items-center justify-center">
                    {perk.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{perk.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{perk.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-stone-50">
          <div className="max-w-2xl mx-auto text-center px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Be the First to Know
            </h2>
            <p className="text-gray-500 mb-8">
              The rewards program is currently in development. In the meantime, keep booking with us &mdash; your loyalty won&apos;t go unnoticed.
            </p>
            <Link
              href="https://escape.baserves.com"
              className="inline-flex items-center gap-2 px-8 py-3 bg-forest-DEFAULT text-white font-semibold rounded-lg hover:bg-forest-dark transition-colors"
            >
              Book Your Next Adventure
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
