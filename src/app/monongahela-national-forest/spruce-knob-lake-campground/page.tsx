import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Spruce Knob Lake Campground | Monongahela National Forest | BA Services',
  description: 'Spruce Knob Lake Campground is perched at high elevation near the summit of Spruce Knob — the highest point in West Virginia at 4,863 feet. The campground surro',
  alternates: { canonical: '/monongahela-national-forest/spruce-knob-lake-campground' },
}

export default function SpruceKnobLakeCampgroundPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-forest-DEFAULT overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/monongahela/entrance-sign.jpg" alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="container-custom px-6 relative z-10">
          <div className="max-w-3xl">
            <Link href="/monongahela-national-forest" className="inline-flex items-center gap-2 text-green-300 hover:text-white text-sm mb-4 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Monongahela National Forest
            </Link>
            <h1 className="font-display headline-xl text-white mb-4">
              Spruce Knob Lake Campground
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              High-Elevation Camping Near West Virginia's Highest Peak
            </p>
            <a
              href="https://www.recreation.gov/camping/campgrounds/234132"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Book on Recreation.gov
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 py-8">
        <div className="container-custom px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">42</div>
              <div className="text-white/60 text-sm">Sites</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">~4,000 ft</div>
              <div className="text-white/60 text-sm">Elevation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">May–Oct</div>
              <div className="text-white/60 text-sm">Season</div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Spruce Knob Lake Campground</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Spruce Knob Lake Campground is perched at high elevation near the summit of Spruce Knob — the highest point in West Virginia at 4,863 feet. The campground surrounds a scenic mountain lake and offers a cool, quiet retreat with access to the Spruce Knob summit, highland spruce forests, and panoramic Allegheny Mountain views.
              </p>
              <a
                href="https://www.recreation.gov/camping/campgrounds/234132"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Reserve Your Site
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Features &amp; Amenities</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Mountain lake setting
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Near WV highest point (4,863 ft)
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Fishing in Spruce Knob Lake
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Hiking to Spruce Knob summit
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Vault restrooms
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Cool high-elevation climate
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Visit?</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Reservations are managed through Recreation.gov. Book your campsite today and experience the Monongahela National Forest.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://www.recreation.gov/camping/campgrounds/234132" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
              Book on Recreation.gov
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
            <Link href="/monongahela-national-forest" className="btn-secondary">
              Back to Monongahela NF
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
