import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import { ListenButton } from '@/components/reader'
import { LakesideShell, SectionActions, frame } from '@/components/property/lakeside'

export const metadata = {
  title: { absolute: 'Refund Policy | BA Services' },
  description: 'Learn about our refund and cancellation policies for reservations.',
  alternates: {
    canonical: '/refund_returns',
  },
  openGraph: og('/refund_returns'),
}

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url="/refund_returns"
        name="Refund Policy | BA Services"
        crumbName="Refund Policy"
        description="Learn about our refund and cancellation policies for reservations."
      />

      <LakesideShell>
      <section className="pt-32 pb-20">
        <div className={frame}>
          <div className="max-w-3xl mx-auto">
            <h1 className="font-lake-serif text-[40px] md:text-[48px] text-lake-ink mb-6">Refund & Cancellation Policy</h1>
            <div className="mb-8">
              <ListenButton />
            </div>

            <div className="max-w-none">
              <p className="text-lake-mute mb-6">
                Last updated: January 2026
              </p>

              <h2 className="font-lake-serif text-[24px] text-lake-ink mt-10 mb-4">Cancellation Policy</h2>
              <p className="text-lake-mute mb-4">
                We understand that plans can change. Our cancellation policy is designed to be fair to both our guests and our operations.
              </p>

              <h3 className="font-lake-serif text-[19px] text-lake-ink mt-8 mb-3">Standard Reservations</h3>
              <ul className="list-disc pl-6 text-lake-mute space-y-2 mb-6">
                <li><strong>14+ days before arrival:</strong> Full refund minus a $10 processing fee</li>
                <li><strong>7-13 days before arrival:</strong> 50% refund</li>
                <li><strong>Less than 7 days before arrival:</strong> No refund</li>
              </ul>

              <h3 className="font-lake-serif text-[19px] text-lake-ink mt-8 mb-3">Group Reservations (10+ sites)</h3>
              <ul className="list-disc pl-6 text-lake-mute space-y-2 mb-6">
                <li><strong>30+ days before arrival:</strong> Full refund minus a $25 processing fee</li>
                <li><strong>14-29 days before arrival:</strong> 50% refund</li>
                <li><strong>Less than 14 days before arrival:</strong> No refund</li>
              </ul>

              <h2 className="font-lake-serif text-[24px] text-lake-ink mt-10 mb-4">How to Request a Refund</h2>
              <p className="text-lake-mute mb-4">
                To request a cancellation and refund, please:
              </p>
              <ol className="list-decimal pl-6 text-lake-mute space-y-2 mb-6">
                <li>Log into your account at escape.baserves.com</li>
                <li>Navigate to "My Reservations"</li>
                <li>Select the reservation you wish to cancel</li>
                <li>Click "Cancel Reservation" and follow the prompts</li>
              </ol>
              <p className="text-lake-mute mb-4">
                Alternatively, you can contact us at <a href="tel:+12073077903" className="text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink">+1 207 307-7903</a> or <a href="mailto:support@baserves.com" className="text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink">support@baserves.com</a>.
              </p>

              <h2 className="font-lake-serif text-[24px] text-lake-ink mt-10 mb-4">Refund Processing</h2>
              <p className="text-lake-mute mb-4">
                Approved refunds will be processed within 5-10 business days. Refunds will be credited to the original payment method used for the reservation.
              </p>

              <h2 className="font-lake-serif text-[24px] text-lake-ink mt-10 mb-4">Weather-Related Cancellations</h2>
              <p className="text-lake-mute mb-4">
                In the event of severe weather conditions that result in campground closures, guests will be offered the choice of:
              </p>
              <ul className="list-disc pl-6 text-lake-mute space-y-2 mb-6">
                <li>A full refund</li>
                <li>Credit towards a future reservation</li>
                <li>Rescheduling to available dates at no additional charge</li>
              </ul>

              <h2 className="font-lake-serif text-[24px] text-lake-ink mt-10 mb-4">No-Shows</h2>
              <p className="text-lake-mute mb-4">
                Guests who do not arrive on their scheduled check-in date without prior notification will forfeit their entire reservation payment. The site may be released for other guests after 24 hours.
              </p>

              <h2 className="font-lake-serif text-[24px] text-lake-ink mt-10 mb-4">Contact Us</h2>
              <p className="text-lake-mute mb-4">
                If you have questions about our refund policy, please contact us:
              </p>
              <ul className="text-lake-mute space-y-2">
                <li><strong>Phone:</strong> <a href="tel:+12073077903" className="text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink">+1 207 307-7903</a></li>
                <li><strong>Email:</strong> <a href="mailto:support@baserves.com" className="text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink">support@baserves.com</a></li>
              </ul>
              <SectionActions
                className="mt-10"
                primary={{ label: 'Call +1 207 307-7903', url: 'tel:+12073077903', kind: 'external' }}
                secondary={[{ label: 'Email support@baserves.com', url: 'mailto:support@baserves.com', kind: 'external' }]}
              />
            </div>
          </div>
        </div>
      </section>
      </LakesideShell>

      <Footer />
    </main>
  )
}
