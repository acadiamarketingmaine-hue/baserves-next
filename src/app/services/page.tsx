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
    image: '/images/long-lake/fall-foliage.jpg',
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
    image: '/images/monongahela/spruce-knob-panorama.jpg',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

export const metadata = {
  title: 'Services | BA Services',
  description: 'Professional recreation area management services including maintenance, landscaping, cleaning, and repairs.',
  alternates: {
    canonical: '/services',
  },
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-forest-DEFAULT overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/bankhead-forest.jpg" alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="container-custom px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="badge bg-white/10 text-white mb-4">What We Do</span>
            <h1 className="font-display headline-xl text-white mb-6">
              Professional Property & Facility <span className="text-green-400">Management</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              From campgrounds and national forests to interstate rest areas, we deliver comprehensive management
              services across recreation and transportation infrastructure. <Link href="/about" className="underline hover:text-white transition-colors">Learn more about our company</Link> and mission.
            </p>
          </div>
        </div>
      </section>

      {/* DOT Contracts — Top of page */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <span className="badge bg-forest-DEFAULT/10 text-forest-DEFAULT mb-4">Government Contracts</span>
          <h2 className="headline-lg text-gray-900 mb-4">DOT Rest Area Management</h2>
          <p className="text-xl text-gray-600 max-w-3xl mb-10">
            We partner with state Departments of Transportation to operate and maintain rest area facilities, ensuring safe and welcoming stops for millions of travelers.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Link href="/services/iowa-dot" className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-forest-DEFAULT transition-colors">Iowa DOT</h3>
                    <p className="text-sm text-gray-500">Department of Transportation</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">Rest area facilities along the I-29 corridor near Sioux City, serving northbound and southbound travelers.</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="font-semibold text-gray-900">2</span> Rest Areas
                  <span className="text-gray-300">|</span>
                  <span className="font-semibold text-gray-900">I-29</span> Corridor
                </div>
              </div>
            </Link>
            <Link href="/services/utah-dot" className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-forest-DEFAULT transition-colors">Utah DOT</h3>
                    <p className="text-sm text-gray-500">Department of Transportation</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">Statewide rest area management across 28 facilities spanning I-15, I-80, I-70, and scenic byways through three regions.</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="font-semibold text-gray-900">28</span> Rest Areas
                  <span className="text-gray-300">|</span>
                  <span className="font-semibold text-gray-900">3</span> Regions
                  <span className="text-gray-300">|</span>
                  <span className="font-semibold text-gray-900">Statewide</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Scope of Services */}
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Scope of Services</h3>
          <p className="text-gray-600 max-w-3xl mb-8">
            Our DOT contracts cover comprehensive facility management across all aspects of rest area operations.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Facility Management', items: ['Daily operations & administration', 'Full staffing & workforce management', 'Quality control & oversight'] },
              { title: 'Janitorial & Sanitation', items: ['Restroom cleaning & disinfecting', 'Supply replenishment', 'Deep cleaning cycles'] },
              { title: 'Grounds & Maintenance', items: ['Lawn care & landscaping', 'Snow & ice removal', 'Preventive maintenance programs'] },
              { title: 'Compliance & Safety', items: ['24/7 emergency availability', 'Performance monitoring', 'Environmental compliance'] },
            ].map((cat) => (
              <div key={cat.title} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-900 text-sm mb-3">{cat.title}</h4>
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start text-xs text-gray-600">
                      <svg className="w-3.5 h-3.5 mr-1.5 mt-0.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
      <section className="py-20 bg-white">
        <div className="container-custom px-6 text-center">
          <h2 className="headline-lg text-gray-900 mb-6">
            Need Professional Management Services?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            <Link href="/contact" className="text-forest-DEFAULT underline hover:text-forest-light transition-colors">Contact us</Link> to discuss how we can help maintain and improve your recreation area. We're always looking for talented people to <Link href="/careers" className="text-forest-DEFAULT underline hover:text-forest-light transition-colors">join our team</Link>. Visit our <Link href="/" className="text-forest-DEFAULT underline hover:text-forest-light transition-colors">homepage</Link> to discover all our offerings, or <Link href="/leave-a-review" className="text-forest-DEFAULT underline hover:text-forest-light transition-colors">leave a review</Link> of our work.
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
