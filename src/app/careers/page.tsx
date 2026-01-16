import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

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
  description: 'Join our team and help create memorable outdoor experiences. View current job openings.',
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
              professionals who are passionate about creating memorable experiences for visitors.
            </p>
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
              We're always looking for talented individuals to join our team.
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
                    href="mailto:careers@baserves.com"
                    className="px-6 py-2 bg-forest-DEFAULT text-white font-semibold rounded-lg hover:bg-forest-light transition-colors"
                  >
                    Apply Now
                  </a>
                </div>
                <p className="text-gray-600">{position.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Don't see a position that fits? We're always interested in hearing from passionate individuals.
            </p>
            <a href="mailto:careers@baserves.com" className="btn-secondary">
              Send Your Resume
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="headline-lg text-gray-900 mb-6">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join a team that's passionate about the outdoors and dedicated to creating
                exceptional experiences for visitors from all walks of life.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="mailto:careers@baserves.com" className="btn-primary">
                  Contact HR
                </a>
                <Link href="/about" className="btn-secondary">
                  Learn More About Us
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/Canal-Bridge-Entrance-1-2048x1365.jpg"
                alt="Join our team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
