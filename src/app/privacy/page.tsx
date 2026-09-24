import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import { ListenButton } from '@/components/reader'
import { LakesideShell, SectionActions, frame } from '@/components/property/lakeside'

export const metadata = {
  title: { absolute: 'Privacy Policy | BA Services' },
  description: 'Learn how BA Services collects, uses, and protects your personal information.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: og('/privacy'),
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url="/privacy"
        name="Privacy Policy | BA Services"
        crumbName="Privacy Policy"
        description="Learn how BA Services collects, uses, and protects your personal information."
      />

      <LakesideShell>
      <section className="pt-32 pb-20">
        <div className={frame}>
          <div className="max-w-3xl mx-auto">
            <h1 className="font-lake-serif text-[40px] md:text-[48px] text-lake-ink mb-6">Privacy Policy</h1>
            <div className="mb-8">
              <ListenButton />
            </div>

            <div className="max-w-none">
              <p className="text-lake-mute mb-6">
                Last updated: January 2026
              </p>

              <h2 className="font-lake-serif text-[24px] text-lake-ink mt-10 mb-4">Introduction</h2>
              <p className="text-lake-mute mb-4">
                BA Services ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>

              <h2 className="font-lake-serif text-[24px] text-lake-ink mt-10 mb-4">Information We Collect</h2>

              <h3 className="font-lake-serif text-[19px] text-lake-ink mt-8 mb-3">Personal Information</h3>
              <p className="text-lake-mute mb-4">
                We may collect personal information that you voluntarily provide, including:
              </p>
              <ul className="list-disc pl-6 text-lake-mute space-y-2 mb-6">
                <li>Name and contact information (email, phone, address)</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Reservation details and preferences</li>
                <li>Communication history with our team</li>
                <li>Account credentials</li>
              </ul>

              <h3 className="font-lake-serif text-[19px] text-lake-ink mt-8 mb-3">Automatically Collected Information</h3>
              <p className="text-lake-mute mb-4">
                When you visit our website, we may automatically collect:
              </p>
              <ul className="list-disc pl-6 text-lake-mute space-y-2 mb-6">
                <li>IP address and browser type</li>
                <li>Device information</li>
                <li>Pages visited and time spent</li>
                <li>Referring website</li>
                <li>Cookies and similar technologies</li>
              </ul>

              <h2 className="font-lake-serif text-[24px] text-lake-ink mt-10 mb-4">How We Use Your Information</h2>
              <p className="text-lake-mute mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-lake-mute space-y-2 mb-6">
                <li>Process and manage your reservations</li>
                <li>Communicate with you about your bookings</li>
                <li>Send promotional materials (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Respond to inquiries and provide support</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and enhance security</li>
              </ul>

              <h2 className="font-lake-serif text-[24px] text-lake-ink mt-10 mb-4">Information Sharing</h2>
              <p className="text-lake-mute mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-lake-mute space-y-2 mb-6">
                <li><strong>Service Providers:</strong> Third parties who help us operate our business (payment processors, email services)</li>
                <li><strong>Business Partners:</strong> Recreation area operators and management partners</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              </ul>
              <p className="text-lake-mute mb-4">
                We do not sell your personal information to third parties.
              </p>

              <h2 className="font-lake-serif text-[24px] text-lake-ink mt-10 mb-4">Data Security</h2>
              <p className="text-lake-mute mb-4">
                We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="font-lake-serif text-[24px] text-lake-ink mt-10 mb-4">Your Rights</h2>
              <p className="text-lake-mute mb-4">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc pl-6 text-lake-mute space-y-2 mb-6">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Delete your personal information</li>
                <li>Opt out of marketing communications</li>
                <li>Request data portability</li>
              </ul>

              <h2 className="font-lake-serif text-[24px] text-lake-ink mt-10 mb-4">Cookies</h2>
              <p className="text-lake-mute mb-4">
                We use cookies and similar technologies to enhance your experience. You can control cookie settings through your browser preferences. Disabling cookies may affect some website functionality.
              </p>

              <h2 className="font-lake-serif text-[24px] text-lake-ink mt-10 mb-4">Children's Privacy</h2>
              <p className="text-lake-mute mb-4">
                Our services are not directed to children under 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us.
              </p>

              <h2 className="font-lake-serif text-[24px] text-lake-ink mt-10 mb-4">Changes to This Policy</h2>
              <p className="text-lake-mute mb-4">
                We may update this Privacy Policy from time to time. The updated version will be indicated by the "Last updated" date at the top of this page.
              </p>

              <h2 className="font-lake-serif text-[24px] text-lake-ink mt-10 mb-4">Contact Us</h2>
              <p className="text-lake-mute mb-4">
                If you have questions about this Privacy Policy, please contact us:
              </p>
              <ul className="text-lake-mute space-y-2">
                <li><strong>Phone:</strong> <a href="tel:+12073077903" className="text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink">+1 207 307-7903</a></li>
                <li><strong>Email:</strong> <a href="mailto:privacy@baserves.com" className="text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink">privacy@baserves.com</a></li>
              </ul>
              <SectionActions
                className="mt-10"
                primary={{ label: 'Call +1 207 307-7903', url: 'tel:+12073077903', kind: 'external' }}
                secondary={[{ label: 'Email privacy@baserves.com', url: 'mailto:privacy@baserves.com', kind: 'external' }]}
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
