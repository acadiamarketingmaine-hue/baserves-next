import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const services: Record<string, any> = {
  'campground-park-maintenance': {
    name: 'Campground & Park Maintenance',
    tagline: 'Comprehensive Facility Management',
    description: 'Professional maintenance services ensuring pristine facilities and grounds year-round.',
    longDescription: `Our campground and park maintenance services ensure that every facility under our care meets the highest standards of quality and safety. From routine groundskeeping to emergency repairs, our experienced team handles all aspects of facility maintenance.

We understand that well-maintained facilities are essential for positive visitor experiences. Our proactive approach to maintenance helps prevent issues before they arise, minimizing downtime and maximizing visitor satisfaction. Whether managing a small campground or a large recreation area, we tailor our services to meet your specific needs.`,
    features: [
      'Daily facility inspections',
      'Grounds maintenance and landscaping',
      'Building repairs and upkeep',
      'Utility system maintenance',
      'Seasonal preparation and winterization',
      'Emergency repair services',
    ],
    benefits: [
      'Reduced operational costs through preventive maintenance',
      'Extended facility lifespan',
      'Improved visitor satisfaction',
      'Compliance with safety regulations',
      '24/7 emergency support',
    ],
    image: '/images/DSC_0001-2048x1365.jpg',
  },
  'landscaping-and-groundskeeping': {
    name: 'Landscaping & Groundskeeping',
    tagline: 'Professional Landscape Services',
    description: 'Expert landscaping services maintaining natural beauty and visitor safety.',
    longDescription: `Our landscaping and groundskeeping services preserve and enhance the natural beauty of outdoor recreation areas. From trail maintenance to invasive species management, we ensure that every corner of your property looks its best while supporting ecological health.

Our team includes certified arborists, landscape professionals, and environmental specialists who understand the unique requirements of public recreation areas. We balance aesthetic appeal with ecological responsibility, creating sustainable landscapes that visitors can enjoy for generations.`,
    features: [
      'Trail clearing and maintenance',
      'Vegetation management',
      'Tree care and arborist services',
      'Erosion control',
      'Native plant restoration',
      'Seasonal plantings and displays',
    ],
    benefits: [
      'Enhanced visitor experience',
      'Improved safety along trails and pathways',
      'Environmental stewardship',
      'Reduced liability risks',
      'Sustainable landscape practices',
    ],
    image: '/images/DSC_0103-2048x1365.jpg',
  },
  'rest-area-cleaning-and-upkeep': {
    name: 'Rest Area Cleaning & Upkeep',
    tagline: 'Spotless Facilities, Happy Visitors',
    description: 'Thorough cleaning and upkeep ensuring visitor comfort and hygiene.',
    longDescription: `Clean facilities are fundamental to positive visitor experiences. Our rest area cleaning services ensure that restrooms, shelters, and common areas meet the highest standards of cleanliness and hygiene.

Our trained cleaning crews follow strict protocols and use environmentally-friendly products whenever possible. We schedule our services to minimize disruption while maintaining consistently clean facilities throughout operating hours.`,
    features: [
      'Restroom cleaning and sanitization',
      'Shelter and pavilion maintenance',
      'Trash collection and disposal',
      'Supply restocking',
      'Graffiti removal',
      'Pressure washing services',
    ],
    benefits: [
      'Consistently clean facilities',
      'Improved visitor satisfaction ratings',
      'Reduced complaints',
      'Health code compliance',
      'Environmentally responsible cleaning',
    ],
    image: '/images/DSC_0110-2048x1365.jpg',
  },
  'preventive-maintenance-and-repairs': {
    name: 'Preventive Maintenance & Repairs',
    tagline: 'Proactive Care for Your Facilities',
    description: 'Preventing issues before they impact your visitors.',
    longDescription: `Our preventive maintenance program identifies and addresses potential problems before they become costly emergencies. Regular inspections, scheduled maintenance, and detailed record-keeping ensure that your facilities remain in top condition year-round.

From HVAC systems to playground equipment, our certified technicians have the expertise to maintain all types of recreation facility infrastructure. We work with you to develop maintenance schedules that minimize operational disruptions while maximizing equipment longevity.`,
    features: [
      'Scheduled equipment inspections',
      'HVAC maintenance',
      'Plumbing and electrical systems',
      'Playground safety inspections',
      'Dock and boat ramp maintenance',
      'Fire safety equipment checks',
    ],
    benefits: [
      'Reduced emergency repair costs',
      'Extended equipment lifespan',
      'Improved safety compliance',
      'Minimized facility downtime',
      'Comprehensive maintenance records',
    ],
    image: '/images/Burlingame1-2048x1365.jpg',
  },
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services[params.slug]

  if (!service) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
          <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 bg-forest-DEFAULT text-white font-semibold rounded-lg hover:bg-forest-dark transition-colors">
            View All Services
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative container-custom px-6">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-sm font-medium rounded-full mb-4">Our Services</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {service.name}
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              {service.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
              <div className="prose prose-lg max-w-none">
                {service.longDescription.split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index} className="text-gray-600 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-6">What We Offer</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {service.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <svg className="w-6 h-6 text-forest-DEFAULT flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Benefits</h3>
                <ul className="space-y-4">
                  {service.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-forest-DEFAULT/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-forest-DEFAULT" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-forest-DEFAULT rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Request a Quote</h3>
                <p className="text-white/80 mb-6">
                  Interested in our {service.name.toLowerCase()} services? Contact us for a customized quote.
                </p>
                <Link
                  href="/contact"
                  className="block w-full text-center py-4 bg-white text-forest-DEFAULT font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Contact Us
                </Link>
                <a href="tel:+12073077903" className="flex items-center justify-center gap-2 mt-4 text-white/80 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +1 207 307-7903
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Let us help you maintain your recreation facilities to the highest standards.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-forest-DEFAULT text-white font-semibold rounded-lg hover:bg-forest-dark transition-colors">
              Get a Quote
            </Link>
            <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-forest-DEFAULT text-forest-DEFAULT font-semibold rounded-lg hover:bg-forest-DEFAULT hover:text-white transition-colors">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
