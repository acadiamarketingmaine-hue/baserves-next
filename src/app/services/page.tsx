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
  bandTint,
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

const operatingSteps = [
  {
    step: '01',
    title: 'Site Assessment & Mobilization',
    body: 'We audit utilities, grounds, bathhouses, and seasonal traffic patterns before opening day so crews arrive equipped for the exact demands of each park or rest area.',
  },
  {
    step: '02',
    title: 'Daily Grounds, Facilities & Visitor Operations',
    body: 'On-site managers and field technicians handle daily cleaning, landscaping, camper support, and rapid repairs without waiting on distant contractors.',
  },
  {
    step: '03',
    title: 'Compliance Reporting & Preventive Upkeep',
    body: 'Structured inspection logs, safety documentation, and preventive maintenance protect public infrastructure and keep agency partners informed all season.',
  },
]

export const metadata = {
  title: { absolute: 'Recreation Facility Management Services' },
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
        name="Recreation Facility Management Services"
        crumbName="Services"
        description="Campground maintenance, landscaping, rest area cleaning, and preventive repairs. BA Services manages federal, state, and DOT recreation facilities across America."
        type="CollectionPage"
        image="/images/Burlingame2-1536x1152.jpg"
      />

      <LakesideShell>
        {/* Band 1: Hook — Clean Above-the-Fold Hero */}
        <section className="relative pt-32 pb-20 bg-lake-spruce overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('/images/Burlingame2-1536x1152.jpg')" }}
            aria-hidden="true"
          />
          <div className={`relative z-10 ${frame}`}>
            <div className="max-w-3xl">
              <h1 className="font-lake-serif headline-xl text-white mb-4">
                Recreation Facility &amp; Campground Management
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-white/95 mb-5 leading-snug">
                Full-service operations for federal forests, state parks, and interstate rest areas.
              </h2>
              <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-2xl">
                BA Services staffs, maintains, and protects public recreation and transportation facilities nationwide with dedicated on-site crews.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/contact?topic=partnership" className={pillLight}>
                  Partnership Inquiries
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

        {/* Band 2: Visual Awe & Management Portfolio */}
        <section className="py-16 md:py-20 bg-white">
          <div className={frame}>
            <div className="max-w-3xl mb-10">
              <Eyebrow label="Management Portfolio" rule className="mb-4" />
              <h2 className={`${h2Class} text-lake-ink mb-4`}>Active Contracts &amp; Scope of Services</h2>
              <p className="text-lg md:text-xl text-lake-mute leading-relaxed">
                From U.S. Forest Service concessions to state DOT rest area contracts, we manage a diverse portfolio of public properties across America. Explore our active contracts below.
              </p>
            </div>
            <ServiceAccordion />
          </div>
        </section>

        {/* Band 3: Peak Interest & Concrete Operating Mechanism */}
        <section className={`py-16 md:py-24 ${bandTint}`}>
          <div className={frame}>
            <div className="max-w-3xl mb-12">
              <Eyebrow label="How We Operate" rule className="mb-4" />
              <h2 className={`${h2Class} text-lake-ink mb-4`}>
                How BA Services Keeps Public Sites Ready Every Day
              </h2>
              <p className="text-lg text-lake-mute leading-relaxed">
                Public recreation areas and highway rest stops face heavy seasonal demand. Our three-part operating model pairs local crews with disciplined preventive care.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {operatingSteps.map((item) => (
                <div
                  key={item.step}
                  className="bg-white border border-lake-line rounded-md p-6 md:p-8 flex flex-col"
                >
                  <span className="text-xs font-semibold tracking-widest text-lake-spruce uppercase mb-3">
                    Step {item.step}
                  </span>
                  <h3 className="font-lake-serif text-2xl text-lake-ink mb-3">
                    {item.title}
                  </h3>
                  <p className="text-lake-mute leading-relaxed text-[15px]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Band 4: Authority & Core Capabilities */}
        <section className="py-14 md:py-24 lg:py-[120px]">
          <div className={frame}>
            <div className="max-w-3xl mb-14 md:mb-20">
              <Eyebrow label="Core Capabilities" rule className="mb-4" />
              <h2 className={`${h2Class} text-lake-ink mb-4`}>
                Dedicated Divisions for Every Recreation Asset
              </h2>
              <p className="text-lg text-lake-mute leading-relaxed">
                Whether your agency needs full-season campground operations or 24/7 highway rest area sanitation, each division is staffed and equipped for the field. <Link href="/about" className="text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink">Learn more about BA Services</Link>.
              </p>
            </div>
            <div className="space-y-16 md:space-y-24">
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
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </SplitFeature>
              ))}
            </div>
          </div>
        </section>

        {/* Band 5: Inspire Frictionless Action */}
        <section className="relative isolate overflow-hidden py-16 md:py-24 bg-lake-spruce text-white">
          <div
            className="absolute inset-0 -z-10 bg-cover bg-center opacity-25"
            style={{ backgroundImage: "url('/images/monongahela/spruce-knob-panorama.jpg')" }}
            aria-hidden="true"
          />
          <div className={`${frame} text-center`}>
            <h2 className="font-lake-serif text-[36px] leading-[1.08] tracking-[-0.01em] md:text-[52px] lg:text-[60px] text-white">
              Need Professional Facility Management?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-[1.6] text-white/90 md:mt-6 md:text-[18px]">
              <Link href="/contact" className="underline decoration-1 underline-offset-[6px] hover:decoration-white">Contact our operations team</Link> to discuss your recreation area or agency contract. Looking to work outdoors? Explore our <Link href="/careers" className="underline decoration-1 underline-offset-[6px] hover:decoration-white">career opportunities</Link>, or <Link href="/leave-a-review" className="underline decoration-1 underline-offset-[6px] hover:decoration-white">leave a review</Link> of a recent visit.
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-center md:gap-4">
              <a href="tel:+12073077903" className={pillLight}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call +1 207 307-7903
              </a>
              <Link href="/contact?topic=partnership" className={pillGhostLight}>
                Request Partnership Info
              </Link>
            </div>
          </div>
        </section>
      </LakesideShell>

      <Footer />
    </main>
  )
}
