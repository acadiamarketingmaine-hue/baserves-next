import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { PageSchema } from '@/components/SchemaMarkup'
import { og } from '@/lib/seo'
import { ListenButton } from '@/components/reader'
import {
  LakesideShell,
  Eyebrow,
  frame,
  bandTint,
  h2 as h2Class,
  pillLight,
  pillGhostLight,
} from '@/components/property/lakeside'

export const metadata: Metadata = {
  title: { absolute: 'Small Business Connection | BA Services' },
  description: 'BA Services lists trusted local service businesses across Maine and New England that share a commitment to quality work and honest pricing.',
  alternates: { canonical: '/small-business-connection' },
  openGraph: og('/small-business-connection'),
  robots: { index: true, follow: true },
}

const pillars = [
  {
    title: 'Local Maine & New England Roots',
    body: 'Every business in this directory is rooted in the communities we live and work in across Maine and New England.',
  },
  {
    title: 'Verified Trade & Service Standards',
    body: 'From home comfort and electrical to property maintenance and specialty trades, these teams stand behind their workmanship.',
  },
  {
    title: 'Direct, Honest Communication',
    body: 'Clear estimates, reliable scheduling, and accountable local owners who answer the phone when you need help.',
  },
]

const partners = [
  {
    href: 'https://www.newenglandepoxyllc.com',
    label: 'New England Epoxy & Concrete Polishing | Epoxy & Concrete Coating Pros Serving All of Maine',
  },
  {
    href: 'https://www.somaineheatpumps.com',
    label: 'Heat Pumps Portland Maine | Expert Installation & Service',
  },
  {
    href: 'https://www.seethroughwindowcleaning.com',
    label: 'See Through Window Cleaning | Belfast, Maine',
  },
  {
    href: 'https://www.acadiamarketingmaine.com',
    label: 'Acadia Marketing | Full-Funnel Growth Systems for Service Businesses',
  },
  {
    href: 'https://www.bigboytruckingme.com',
    label: 'Big Boy Trucking LLC | Heavy-Duty Hauling & Cleanup | Dayton, Maine',
  },
  {
    href: 'https://www.rjcplumbing.com',
    label: "RJC Plumbing | Plumbing Brunswick Maine | Augusta's Trusted Plumber",
  },
  {
    href: 'https://www.septicadvisor.com',
    label: 'Trusted Septic System Service South Portland, ME | Septic Advisor',
  },
  {
    href: 'https://www.nasonshomesolutions.com',
    label: "Nason's Home Solutions | Insulation, Mold Removal & Waterproofing in Maine",
  },
  {
    href: 'https://www.themadtinter.com',
    label: 'The Mad Tinter | Professional Window Tinting & Ceramic Coatings in Maine',
  },
  {
    href: 'https://www.allagashplumbing.com',
    label: 'Allagash Plumbing & Heating | Brunswick & Freeport Maine Plumber',
  },
  {
    href: 'https://www.cardenkennels.com',
    label: 'Carden Kennels | Premier Pet Boarding & Daycare in Bangor & Holden, Maine',
  },
  {
    href: 'https://www.winmechanical.com',
    label: 'Win Mechanical | HVAC & Plumbing Services in Maine',
  },
  {
    href: 'https://www.mainewindowwashing.com',
    label: 'Streak Free Solutions | Window Washing & Gutter Cleaning in Bangor, Maine',
  },
  {
    href: 'https://www.cardinalext.com',
    label: 'Cardinal Exteriors | Premium Siding, Roofing & Windows | Portland, Maine',
  },
  {
    href: 'https://www.samstrumphbuilders.com',
    label: 'Sam Strumph Builders | Custom Home Builder in Southern Maine',
  },
  {
    href: 'https://www.maineheatpumpcleaning.com',
    label: 'Maine Heat Pump Cleaning | Heat Pump Service',
  },
  {
    href: 'https://www.goodnowelectric.com',
    label: 'Goodnow Electric | Licensed Electrician in Southern Maine',
  },
  {
    href: 'https://aceshighlandshvacplumb.com',
    label: 'Aces Highlands | HVAC Portland Maine | Plumbing & Electrical',
  },
  {
    href: 'https://www.campbellspests.com',
    label: "Campbell's Pest Control | Pest Control Services in Maine",
  },
  {
    href: 'https://www.gardenguyslandscaping.com',
    label: 'Garden Guys Landscaping | Professional Landscaping in Southern Maine',
  },
  {
    href: 'https://www.jandrmechanicalservices.com',
    label: 'J&R Mechanical Services | HVAC Augusta Maine | Heating and Cooling Augusta Maine',
  },
]

export default function SmallBusinessConnectionPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url="/small-business-connection"
        name="Small Business Connection | BA Services"
        crumbName="Small Business Connection"
        description="BA Services lists trusted local service businesses across Maine and New England that share a commitment to quality work and honest pricing."
      />

      <LakesideShell>
        {/* Band 1: Hook — Clean Above-the-Fold Hero */}
        <section className="relative pt-32 pb-20 bg-lake-spruce overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('/images/long-lake/fall-foliage.jpg')" }}
            aria-hidden="true"
          />
          <div className={`relative z-10 ${frame}`}>
            <div className="max-w-3xl">
              <h1 className="font-lake-serif headline-xl text-white mb-4">
                Small Business Connection
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-white/95 mb-5 leading-snug">
                Trusted Maine and New England service businesses in our partner network.
              </h2>
              <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-2xl">
                We are proud to stand alongside independent local companies that share our commitment to quality work, honest pricing, and dependable service.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href="#partner-directory" className={pillLight}>
                  Browse Partner Network
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>
                <Link href="/contact" className={pillGhostLight}>
                  Contact BA Services
                </Link>
              </div>
              <div className="mt-6">
                <ListenButton variant="light" />
              </div>
            </div>
          </div>
        </section>

        {/* Band 2: Authority & Shared Standards */}
        <section className={`py-14 md:py-20 ${bandTint}`}>
          <div className={frame}>
            <div className="max-w-3xl mb-10">
              <Eyebrow label="Maine & New England" rule className="mb-4" />
              <h2 className={`${h2Class} text-lake-ink mb-4`}>
                Built on Local Craftsmanship &amp; Accountability
              </h2>
              <p className="text-lg text-lake-mute leading-relaxed">
                Operating parks and facilities across the region depends on reliable local trades and service providers. Every partner listed below reflects that same standard.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="bg-white border border-lake-line rounded-md p-6">
                  <h3 className="font-lake-serif text-xl text-lake-ink mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-lake-mute leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Band 3: Partner Directory */}
        <section id="partner-directory" className="py-16 md:py-24 bg-white">
          <div className={frame}>
            <div className="max-w-3xl mb-10">
              <Eyebrow label="Partner Directory" rule className="mb-4" />
              <h2 className={`${h2Class} text-lake-ink mb-4`}>
                Businesses in the Network
              </h2>
              <p className="text-lg text-lake-mute leading-relaxed">
                Explore trusted local contractors, home service specialists, and small businesses serving Maine and New England.
              </p>
            </div>
            <ul className="grid md:grid-cols-2 gap-4 list-none p-0 m-0">
              {partners.map((partner) => (
                <li key={partner.href}>
                  <a
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 rounded-md border border-lake-line bg-white px-5 py-4 min-h-[60px] text-lake-ink hover:border-lake-spruce hover:bg-lake-spruce/[0.03] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce"
                  >
                    <span className="font-medium leading-snug group-hover:text-lake-spruce transition-colors">
                      {partner.label}
                    </span>
                    <svg
                      className="w-4 h-4 shrink-0 text-lake-mute group-hover:text-lake-spruce transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Band 4: Inspire Frictionless Action */}
        <section className="py-16 md:py-20 bg-lake-spruce text-white">
          <div className={`${frame} text-center`}>
            <h2 className="font-lake-serif text-3xl md:text-5xl text-white mb-4">
              Need Recreation Facility Management?
            </h2>
            <p className="mx-auto max-w-2xl text-white/90 text-base md:text-lg leading-relaxed mb-8">
              Talk with the BA Services team about park operations, campground management, or agency partnerships across Maine and nationwide.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:+12073077903" className={pillLight}>
                Call +1 207 307-7903
              </a>
              <Link href="/services" className={pillGhostLight}>
                Explore Our Services
              </Link>
            </div>
          </div>
        </section>
      </LakesideShell>

      <Footer />
    </main>
  )
}
