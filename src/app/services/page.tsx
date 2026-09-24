import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ServiceAccordion from '@/components/ServiceAccordion'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import { ListenButton } from '@/components/reader'
import {
  LakesideShell,
  Eyebrow,
  SplitFeature,
  IconChipList,
  frame,
  h2 as h2Class,
  pillLight,
  pillGhostLight,
} from '@/components/property/lakeside'

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
  },
]

export const metadata = {
  title: 'Services',
  description: 'Campground maintenance, landscaping, rest area cleaning, and preventive repairs. BA Services manages federal, state, and DOT recreation facilities across America.',
  alternates: {
    canonical: '/services',
  },
  openGraph: og('/services'),
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url="/services"
        name="Services | BA Services"
        crumbName="Services"
        description="Campground maintenance, landscaping, rest area cleaning, and preventive repairs. BA Services manages federal, state, and DOT recreation facilities across America."
        type="CollectionPage"
        image="/images/Burlingame2-1536x1152.jpg"
      />

      <LakesideShell>
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-lake-spruce overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/images/Burlingame2-1536x1152.jpg" alt="" fill sizes="100vw" priority className="object-cover opacity-20" />
          </div>
          <div className={`relative z-10 ${frame}`}>
            <div className="max-w-3xl">
              <span className="badge bg-white/10 text-white mb-4">What We Do</span>
              <h1 className="font-lake-serif headline-xl text-white mb-6">
                Professional Property & Facility <span className="text-green-400">Management</span>
              </h1>
              <div className="mb-6">
                <ListenButton variant="light" />
              </div>
              <p className="text-xl text-white/90 leading-relaxed">
                From campgrounds and national forests to interstate rest areas, we deliver comprehensive management
                services across recreation and transportation infrastructure. <Link href="/about" className="underline hover:text-white transition-colors">Learn more about our company</Link> and mission.
              </p>
              <div className="mt-8">
                <Link href="/contact?topic=partnership" className={pillLight}>
                  Partnership Inquiries
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Management Portfolio */}
        <section className="py-16 bg-white">
          <div className={frame}>
            <div className="max-w-3xl mb-10">
              <Eyebrow label="Management Portfolio" rule className="mb-4" />
              <h2 className={`${h2Class} text-lake-ink mb-4`}>Active Contracts & Scope of Services</h2>
              <p className="text-xl text-lake-mute leading-relaxed">
                From federal land concessions to state DOT contracts, we manage a diverse portfolio of properties and facilities across America. Explore our active contracts below.
              </p>
            </div>
            <ServiceAccordion />
          </div>
        </section>

        {/* Services List */}
        <section className="py-14 md:py-24 lg:py-[120px]">
          <div className={`${frame} space-y-16 md:space-y-24`}>
            {services.map((service, index) => (
              <SplitFeature
                key={service.slug}
                reverse={index % 2 === 1}
                photo={{ src: service.image, alt: service.name }}
                heading={service.name}
                paragraphs={[service.description]}
              >
                <IconChipList items={service.features} className="mt-6" />
                <div className="mt-8">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex min-h-[44px] items-center gap-1.5 font-medium text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce"
                  >
                    More about {service.name}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </SplitFeature>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative isolate overflow-hidden py-14 md:flex md:min-h-[560px] md:items-center md:py-24">
          <div className="absolute inset-0 -z-10">
            <Image src="/images/bankhead-bicycle-trail.jpg" alt="Paved recreation trail beside a lake in Bankhead National Forest" fill sizes="100vw" className="object-cover" />
            <div aria-hidden="true" className="absolute inset-0 bg-black/55" />
          </div>
          <div className={`${frame} text-center md:text-white`}>
            <h2 className="font-lake-serif text-[36px] leading-[1.08] tracking-[-0.01em] md:text-[52px] lg:text-[60px]">
              Need Professional Management Services?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-[1.6] text-lake-mute md:mt-6 md:text-[18px] md:text-white/95">
              <Link href="/contact" className="underline decoration-1 underline-offset-[6px] hover:decoration-white">Contact us</Link> to discuss how we can help maintain and improve your recreation area. We&apos;re always looking for talented people to <Link href="/careers" className="underline decoration-1 underline-offset-[6px] hover:decoration-white">join our team</Link>. Visit our <Link href="/" className="underline decoration-1 underline-offset-[6px] hover:decoration-white">homepage</Link> to discover all our offerings, or <Link href="/leave-a-review" className="underline decoration-1 underline-offset-[6px] hover:decoration-white">leave a review</Link> of our work.
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-center md:gap-4">
              <a href="tel:+12073077903" className={`${pillLight}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call +1 207 307-7903
              </a>
              <a href="mailto:info@baserves.com" className={pillGhostLight}>
                Send Email
              </a>
            </div>
          </div>
        </section>
      </LakesideShell>

      <Footer />
    </main>
  )
}
