import { Suspense } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: 'Contact Us | BA Services',
  description: 'Get in touch with BA Services — careers, partnerships, or rest area feedback.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="relative pt-32 pb-16 bg-forest-DEFAULT">
        <div className="container-custom px-6">
          <div className="max-w-3xl">
            <span className="badge bg-white/10 text-white mb-4">Get in Touch</span>
            <h1 className="font-display headline-xl text-white mb-6">
              Contact <span className="text-green-400">Us</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
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
        </div>
      </section>

      <Footer />
    </main>
  )
}
