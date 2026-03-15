import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import EmploymentApplicationForm from '@/components/EmploymentApplicationForm'

const benefits = [
  { title: 'Work Outdoors', description: 'Spend your days in beautiful natural settings' },
  { title: 'Competitive Pay', description: 'Fair compensation for your hard work' },
  { title: 'Growth Opportunities', description: 'Advance your career with us' },
  { title: 'Team Environment', description: 'Work with passionate, like-minded people' },
  { title: 'Training Provided', description: 'Learn new skills on the job' },
  { title: 'Seasonal & Full-Time', description: 'Flexible employment options' },
]

const positions = [
  {
    title: 'Campground Host',
    location: 'Multiple Locations',
    type: 'Seasonal',
    description: 'Serve as the friendly face of our campgrounds, assisting visitors and maintaining a welcoming atmosphere.',
  },
  {
    title: 'Maintenance Technician',
    location: 'Michigan & Indiana',
    type: 'Full-Time',
    description: 'Keep our facilities in top condition through preventive maintenance and repairs.',
  },
  {
    title: 'Groundskeeper',
    location: 'Multiple Locations',
    type: 'Seasonal',
    description: 'Maintain the natural beauty of our recreation areas through landscaping and grounds maintenance.',
  },
  {
    title: 'Recreation Program Coordinator',
    location: 'Long Lake Outdoor Center',
    type: 'Full-Time',
    description: 'Plan and lead outdoor education programs and activities for groups of all ages.',
  },
]

export const metadata = {
  title: 'Careers | BA Serves',
  description: 'Join our team and help create memorable outdoor experiences. Apply online or download our employment application.',
  alternates: {
    canonical: '/careers',
  },
}

export default function CareersPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0">
          <Image
            src="/images/Playground-Gallery-Pic-2048x1365.jpg"
            alt="Careers at BA Serves"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative container-custom px-6">
          <div className="max-w-3xl">
            <span className="badge bg-white/10 text-white mb-4">Careers</span>
            <h1 className="font-display headline-xl text-white mb-6">
              Join Our <span className="text-green-400">Team</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Love the outdoors? Want to make a difference? Join our team of dedicated
              professionals who are passionate about creating memorable <Link href="/experiences" className="underline hover:text-white transition-colors">experiences</Link> for visitors.
            </p>
          </div>
        </div>
      </section>

      {/* Download Application - TOP */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container-custom px-6">
          <div className="max-w-3xl mx-auto bg-forest-DEFAULT/5 border border-forest-DEFAULT/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Download Employment Application</h2>
            <p className="text-gray-600 mb-6">
              Prefer to fill out a paper application? Download the PDF and email it to{' '}
              <a href="mailto:OfficeManager@BAServes.com" className="text-forest-DEFAULT hover:underline">OfficeManager@BAServes.com</a>{' '}
              or fax it to 207-307-7902.
            </p>
            <a
              href="/employment-application.pdf"
              download="BA Services - Employment Application.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 bg-forest-DEFAULT text-white font-semibold rounded-lg hover:bg-forest-light transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Application (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-forest-DEFAULT">
        <div className="container-custom px-6">
          <h2 className="text-2xl font-bold text-white text-center mb-12">Why Work With Us</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                <p className="text-white/60 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section">
        <div className="container-custom px-6">
          <div className="text-center mb-12">
            <span className="badge badge-forest mb-4">Open Positions</span>
            <h2 className="headline-lg text-gray-900 mb-4">Current Opportunities</h2>
            <p className="subheadline max-w-2xl mx-auto">
              We&apos;re always looking for talented individuals to join our team. Learn more about our <Link href="/services">management services</Link>.
            </p>
          </div>

          <div className="space-y-6 max-w-3xl mx-auto">
            {positions.map((position) => (
              <div
                key={position.title}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-forest-DEFAULT/30 transition-colors"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{position.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {position.location}
                      </span>
                      <span className="px-3 py-1 bg-forest-DEFAULT/10 text-forest-DEFAULT rounded-full text-xs font-medium">
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <a
                    href="#apply"
                    className="px-6 py-2 bg-forest-DEFAULT text-white font-semibold rounded-lg hover:bg-forest-light transition-colors"
                  >
                    Apply Now
                  </a>
                </div>
                <p className="text-gray-600">{position.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Don&apos;t see a position that fits? We&apos;re always interested in hearing from passionate individuals.{' '}
              <a href="#apply" className="text-forest-DEFAULT underline hover:text-forest-light transition-colors">Apply below</a> or{' '}
              <Link href="/contact" className="text-forest-DEFAULT underline hover:text-forest-light transition-colors">contact us</Link> to start a conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Online Application Form */}
      <section id="apply" className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="badge badge-forest mb-4">Apply Online</span>
              <h2 className="headline-lg text-gray-900 mb-4">Employment Application</h2>
              <p className="text-gray-500 text-sm italic">
                It is the policy of BA Services, Inc. to provide equal employment opportunities to all applicants and
                employees without regard to any legally protected status such as race, color, religion, gender,
                national origin, age, disability, or veteran status.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
              <EmploymentApplicationForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
