import { Suspense } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import { ListenButton } from '@/components/reader'
import { LakesideShell, SectionActions, Eyebrow, frame, h2 as h2Class, pillLight, pillGhostLight } from '@/components/property/lakeside'

export const metadata = {
  title: { absolute: 'Contact BA Services in Bangor, Maine' },
  description: 'Reach BA Services for career opportunities, partnership inquiries, or rest area feedback. Call +1-207-307-7903 or email us from Bangor, Maine.',
  alternates: { canonical: '/contact' },
  openGraph: og('/contact'),
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url="/contact"
        name="Contact BA Services in Bangor, Maine"
        crumbName="Contact Us"
        description="Reach BA Services for career opportunities, partnership inquiries, or rest area feedback. Call +1-207-307-7903 or email us from Bangor, Maine."
        type="ContactPage"
        image="/images/long-lake/weddings/lake-dock-wide.jpg"
      />

      <LakesideShell>
        <section className="relative pt-32 pb-16 bg-lake-spruce overflow-hidden">
          {/* CSS background keeps the lakeside wash without a priority fill Image as LCP */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('/images/long-lake/weddings/lake-dock-wide.jpg')" }}
            aria-hidden="true"
          />
          <div className={`relative z-10 ${frame}`}>
            <div className="max-w-3xl">
              <span className="badge bg-white/10 text-white mb-4">Bangor, Maine Headquarters</span>
              <h1 className="font-lake-serif headline-xl text-white mb-6">
                Speak Directly With BA Services
              </h1>
              <div className="mb-6">
                <ListenButton variant="light" />
              </div>
              <p className="text-xl text-white/90 leading-relaxed">
                Reach our team for campground reservations support, agency management partnerships,
                seasonal careers, or rest area feedback across our nine-state footprint.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href="tel:+12073077903" className={pillLight}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call +1 207 307-7903
                </a>
                <Link href="/experiences" className={pillGhostLight}>
                  Browse Campgrounds
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-24 lg:py-[120px]">
          <div className={`${frame} max-w-4xl`}>
            <Suspense fallback={<div className="text-center py-8 text-lake-mute">Loading...</div>}>
              <ContactForm />
            </Suspense>

            {/* Business address and contact details — Bar Harbor Bank card-brand review */}
            <div className="mt-16 pt-12 border-t border-lake-line">
              <Eyebrow label="Direct Channels" rule className="mb-4" />
              <h2 className={`${h2Class} text-lake-ink mb-6`}>Headquarters &amp; Office Hours</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="rounded-md border border-lake-line bg-white p-6">
                  <h3 className="font-lake-serif text-[18px] text-lake-ink">Mailing Address</h3>
                  <p className="text-lake-mute mt-1 text-sm leading-relaxed">
                    BA Services, Inc.<br />
                    1257 Hammond Street<br />
                    Bangor, ME 04401
                  </p>
                </div>
                <div className="rounded-md border border-lake-line bg-white p-6">
                  <h3 className="font-lake-serif text-[18px] text-lake-ink">Phone</h3>
                  <p className="text-lake-mute mt-1 text-sm">
                    <a href="tel:+12073077903" className="text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink">+1 207 307-7903</a>
                  </p>
                  <p className="text-lake-mute mt-2 text-xs">Monday to Friday, 9:00 AM to 5:00 PM ET</p>
                </div>
                <div className="rounded-md border border-lake-line bg-white p-6">
                  <h3 className="font-lake-serif text-[18px] text-lake-ink">Email</h3>
                  <p className="text-lake-mute mt-1 text-sm break-words">
                    <a href="mailto:andrew@baserves.com" className="text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink">andrew@baserves.com</a>
                  </p>
                </div>
              </div>
            </div>

            <SectionActions
              className="mt-10"
              primary={{ label: 'Call +1 207 307-7903', url: 'tel:+12073077903', kind: 'external' }}
              secondary={[
                { label: 'Explore Locations', url: '/experiences', kind: 'internal' },
                { label: 'Email us', url: 'mailto:andrew@baserves.com', kind: 'external' },
              ]}
            />
          </div>
        </section>
      </LakesideShell>

      <Footer />
    </main>
  )
}
