import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import { ListenButton } from '@/components/reader'
import { LakesideShell, SectionActions, frame } from '@/components/property/lakeside'

export const metadata = {
  title: { absolute: 'SMS Terms & Conditions | BA Services' },
  description: 'Terms and conditions for BA Services SMS messaging services.',
  alternates: {
    canonical: '/sms-terms',
  },
  openGraph: og('/sms-terms'),
}

export default function SMSTermsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url="/sms-terms"
        name="SMS Terms & Conditions | BA Services"
        crumbName="SMS Terms & Conditions"
        description="Terms and conditions for BA Services SMS messaging services."
      />

      <LakesideShell>
      <section className="pt-32 pb-20">
        <div className={frame}>
          <div className="max-w-3xl mx-auto">
            <h1 className="font-lake-serif text-[40px] md:text-[48px] text-lake-ink mb-6">SMS Terms & Conditions</h1>
            <div className="mb-8">
              <ListenButton />
            </div>

            <div className="max-w-none">
              <p className="text-lake-mute mb-6">
                Last updated: January 2026
              </p>

              <h2 className="font-lake-serif text-[24px] text-lake-ink mt-10 mb-4">Overview</h2>
              <p className="text-lake-mute mb-4">
                By opting in to receive SMS messages from BA Services, you agree to the following terms and conditions. These terms govern your use of our SMS messaging service.
              </p>

              <h2 className="font-lake-serif text-[24px] text-lake-ink mt-10 mb-4">Message Types</h2>
              <p className="text-lake-mute mb-4">
                When you opt in to our SMS service, you may receive:
              </p>
              <ul className="list-disc pl-6 text-lake-mute space-y-2 mb-6">
                <li>Reservation confirmations and reminders</li>
                <li>Check-in and check-out notifications</li>
                <li>Important updates about your reservation</li>
                <li>Weather alerts affecting your campground</li>
                <li>Promotional offers (if opted in separately)</li>
              </ul>

              <h2 className="font-lake-serif text-[24px] text-lake-ink mt-10 mb-4">Message Frequency</h2>
              <p className="text-lake-mute mb-4">
                Message frequency varies based on your reservation activity. Transactional messages (confirmations, reminders) are sent as needed. Promotional messages are limited to no more than 4 per month.
              </p>

              <h2 className="font-lake-serif text-[24px] text-lake-ink mt-10 mb-4">Costs</h2>
              <p className="text-lake-mute mb-4">
                Message and data rates may apply. BA Services does not charge for SMS messages, but your mobile carrier may charge you for each message received. Please check with your carrier for details about your messaging plan.
              </p>

              <h2 className="font-lake-serif text-[24px] text-lake-ink mt-10 mb-4">How to Opt Out</h2>
              <p className="text-lake-mute mb-4">
                You can opt out of SMS messages at any time by:
              </p>
              <ul className="list-disc pl-6 text-lake-mute space-y-2 mb-6">
                <li>Replying STOP to any message</li>
                <li>Texting STOP to our shortcode</li>
                <li>Contacting us at <a href="mailto:support@baserves.com" className="text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink">support@baserves.com</a></li>
                <li>Calling <a href="tel:+12073077903" className="text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink">+1 207 307-7903</a></li>
              </ul>
              <p className="text-lake-mute mb-4">
                After opting out, you will receive one final confirmation message. You will no longer receive SMS messages from us unless you opt in again.
              </p>

              <h2 className="font-lake-serif text-[24px] text-lake-ink mt-10 mb-4">Help</h2>
              <p className="text-lake-mute mb-4">
                For help with our SMS service, reply HELP to any message or contact us:
              </p>
              <ul className="text-lake-mute space-y-2 mb-6">
                <li><strong>Phone:</strong> <a href="tel:+12073077903" className="text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink">+1 207 307-7903</a></li>
                <li><strong>Email:</strong> <a href="mailto:support@baserves.com" className="text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink">support@baserves.com</a></li>
              </ul>
              <SectionActions
                className="mb-2"
                primary={{ label: 'Call +1 207 307-7903', url: 'tel:+12073077903', kind: 'external' }}
                secondary={[{ label: 'Email support@baserves.com', url: 'mailto:support@baserves.com', kind: 'external' }]}
              />

              <h2 className="font-lake-serif text-[24px] text-lake-ink mt-10 mb-4">Privacy</h2>
              <p className="text-lake-mute mb-4">
                Your phone number and SMS preferences are protected under our Privacy Policy. We do not sell, rent, or share your phone number with third parties for marketing purposes.
              </p>

              <h2 className="font-lake-serif text-[24px] text-lake-ink mt-10 mb-4">Supported Carriers</h2>
              <p className="text-lake-mute mb-4">
                Our SMS service is supported by major carriers including AT&T, T-Mobile, Verizon, Sprint, and most regional carriers. Some features may not be available on all carriers.
              </p>

              <h2 className="font-lake-serif text-[24px] text-lake-ink mt-10 mb-4">Changes to Terms</h2>
              <p className="text-lake-mute mb-4">
                We reserve the right to modify these terms at any time. Continued use of the SMS service after changes constitutes acceptance of the modified terms.
              </p>
            </div>
          </div>
        </div>
      </section>
      </LakesideShell>

      <Footer />
    </main>
  )
}
