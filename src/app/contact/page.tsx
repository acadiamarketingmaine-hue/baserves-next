import { Suspense } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import Image from 'next/image'

export const metadata = {
  title: 'Contact Us',
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
        name="Contact Us | BA Services"
        crumbName="Contact Us"
        description="Reach BA Services for career opportunities, partnership inquiries, or rest area feedback. Call +1-207-307-7903 or email us from Bangor, Maine."
        type="ContactPage"
        image="/images/bankhead-forest.jpg"
      />

      <section className="relative pt-32 pb-16 bg-forest-DEFAULT overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/bankhead-forest-1600.jpg" alt="" fill sizes="100vw" priority className="object-cover opacity-20" />
        </div>
        <div className="container-custom px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="badge bg-white/10 text-white mb-4">Get in Touch</span>
            <h1 className="font-display headline-xl text-white mb-6">
              Contact <span className="text-green-400">Us</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Whether you&apos;re interested in a career, exploring a partnership, or sharing feedback about one of our rest areas — we&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom px-6 max-w-4xl">
          <Suspense fallback={<div className="text-center py-8 text-gray-500">Loading...</div>}>
            <ContactForm />
          </Suspense>

          {/* Business address and contact details — Bar Harbor Bank card-brand review */}
          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900">Mailing Address</h3>
              <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                BA Services, Inc.<br />
                1257 Hammond Street<br />
                Bangor, ME 04401
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900">Phone</h3>
              <p className="text-gray-600 mt-1 text-sm">
                <a href="tel:+12073077903" className="text-forest-DEFAULT hover:underline">+1 207 307-7903</a>
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900">Email</h3>
              <p className="text-gray-600 mt-1 text-sm break-words">
                <a href="mailto:email@BAServes.com" className="text-forest-DEFAULT hover:underline">email@BAServes.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
