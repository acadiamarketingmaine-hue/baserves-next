import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { iowaRestAreas } from '@/data/iowa-rest-areas'

const RestAreaMap = dynamic(() => import('@/components/RestAreaMap'), { ssr: false })

export const metadata = {
  title: 'Iowa DOT Rest Area Management | BA Services',
  description: 'BA Services manages rest area facilities along I-29 in Sergeant Bluff, Iowa for the Iowa Department of Transportation.',
  alternates: { canonical: '/services/iowa-dot' },
}

const services = [
  'Restroom cleaning and sanitization',
  'Building and facility maintenance',
  'Grounds maintenance and landscaping',
  'Snow and ice removal',
  'Trash collection and recycling',
  'Parking lot and sidewalk upkeep',
  'Signage and lighting maintenance',
  'Emergency response and repairs',
]

export default function IowaDotPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-forest-DEFAULT">
        <div className="container-custom px-6">
          <div className="max-w-3xl">
            <span className="badge bg-white/10 text-white mb-4">Government Contract</span>
            <h1 className="font-display headline-xl text-white mb-6">
              Iowa <span className="text-green-400">Rest Area</span> Management
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              BA Services partners with the Iowa Department of Transportation to maintain safe, clean, and welcoming rest areas along the I-29 corridor in western Iowa.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 py-8">
        <div className="container-custom px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { value: '2', label: 'Rest Areas' },
              { value: 'I-29', label: 'Corridor' },
              { value: '24/7', label: 'Service' },
              { value: 'Iowa DOT', label: 'Contract' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Rest Area Locations</h2>
          <p className="text-gray-600 mb-8">Both facilities are located at Sergeant Bluff along Interstate 29, serving northbound and southbound travelers.</p>
          <RestAreaMap
            restAreas={iowaRestAreas}
            center={[42.375, -96.354]}
            zoom={13}
          />
        </div>
      </section>

      {/* Rest Areas List */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Managed Facilities</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {iowaRestAreas.map((ra) => (
              <div key={`${ra.name}-${ra.direction}`} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{ra.name}</h3>
                    <p className="text-sm text-gray-500">{ra.city}, Iowa</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                    {ra.direction}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                    Route: {ra.route} {ra.direction}
                  </div>
                </div>
                <a
                  href={ra.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-forest-DEFAULT hover:text-forest-dark transition-colors"
                >
                  View on Google Maps
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Services We Provide</h2>
              <p className="text-gray-600 mb-6">
                Our team delivers comprehensive facility management services to ensure Iowa travelers have a safe, clean, and comfortable rest stop experience year-round.
              </p>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {service}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About This Contract</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                The Iowa Department of Transportation entrusts BA Services with the operation and maintenance of rest area facilities along the I-29 corridor near Sioux City. Our dedicated team ensures these facilities meet the highest standards of cleanliness, safety, and traveler satisfaction.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From daily cleaning and grounds maintenance to seasonal snow removal and emergency repairs, we provide full-service facility management that keeps Iowa&apos;s rest areas welcoming for the millions of travelers who pass through each year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Interested in Our DOT Services?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Contact us to learn more about our rest area management capabilities and how we can support your transportation infrastructure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+12073077903" className="btn-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Call +1 207 307-7903
            </a>
            <Link href="/services" className="btn-secondary">
              All Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
