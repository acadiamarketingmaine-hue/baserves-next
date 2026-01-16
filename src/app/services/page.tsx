import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const services = [
  {
    name: 'Campground & Park Maintenance',
    slug: 'campground-park-maintenance',
    description: 'Comprehensive maintenance services ensuring pristine facilities and grounds year-round for recreation areas of all sizes.',
    features: [
      'Facility inspections and repairs',
      'Utility system maintenance',
      'Road and trail upkeep',
      'Equipment maintenance',
      'Emergency response services',
    ],
    image: '/images/Playground-Gallery-Pic-2048x1365.jpg',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    name: 'Landscaping & Groundskeeping',
    slug: 'landscaping-and-groundskeeping',
    description: 'Professional landscaping services maintaining natural beauty and visitor safety across recreation areas.',
    features: [
      'Lawn care and mowing',
      'Tree and shrub maintenance',
      'Native plant management',
      'Erosion control',
      'Seasonal cleanup',
    ],
    image: '/images/Burlingame1-2048x1365.jpg',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    name: 'Rest Area Cleaning & Upkeep',
    slug: 'rest-area-cleaning-and-upkeep',
    description: 'Thorough cleaning and upkeep of rest areas ensuring visitor comfort, hygiene, and satisfaction.',
    features: [
      'Restroom sanitization',
      'Trash removal and recycling',
      'Picnic area maintenance',
      'Water fountain upkeep',
      'Signage maintenance',
    ],
    image: '/images/DSC_0103-2048x1365.jpg',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
  },
  {
    name: 'Preventive Maintenance & Repairs',
    slug: 'preventive-maintenance-and-repairs',
    description: 'Proactive maintenance and repairs preventing issues before they impact visitors or facilities.',
    features: [
      'Scheduled inspections',
      'Preventive repairs',
      'System upgrades',
      'Safety compliance',
      'Documentation and reporting',
    ],
    image: '/images/DSC_0110-2048x1365.jpg',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

export const metadata = {
  title: 'Services | BA Serves',
  description: 'Professional recreation area management services including maintenance, landscaping, cleaning, and repairs.',
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-forest-DEFAULT">
        <div className="container-custom px-6">
          <div className="max-w-3xl">
            <span className="badge bg-white/10 text-white mb-4">What We Do</span>
            <h1 className="font-display headline-xl text-white mb-6">
              Professional Recreation Area <span className="text-green-400">Management</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Beyond providing unforgettable outdoor experiences, we offer comprehensive management
              services to keep recreation areas pristine and welcoming for all visitors.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section">
        <div className="container-custom px-6">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.slug}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="w-16 h-16 rounded-2xl bg-forest-DEFAULT/10 text-forest-DEFAULT flex items-center justify-center mb-6">
                    {service.icon}
                  </div>
                  <h2 className="headline-md text-gray-900 mb-4">{service.name}</h2>
                  <p className="text-xl text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/services/${service.slug}`} className="btn-secondary">
                    Learn More
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
                <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom px-6 text-center">
          <h2 className="headline-lg text-gray-900 mb-6">
            Need Professional Management Services?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Contact us to discuss how we can help maintain and improve your recreation area.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+12073077903" className="btn-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call +1 207 307-7903
            </a>
            <a href="mailto:info@baserves.com" className="btn-secondary">
              Send Email
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
