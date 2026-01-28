import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const PropertyMap = dynamic(() => import('@/components/PropertyMap'), { ssr: false })

const values = [
  {
    title: 'Environmental Stewardship',
    description: 'We are committed to preserving and protecting the natural environments we manage for future generations.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Visitor Experience',
    description: 'Every decision we make is guided by our commitment to providing exceptional experiences for our visitors.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Community Partnership',
    description: 'We work hand-in-hand with local communities to ensure our recreation areas benefit everyone.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Excellence in Service',
    description: 'We maintain the highest standards in facility management, safety, and customer service.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
]

const stats = [
  { number: '15+', label: 'Recreation Areas Managed' },
  { number: '10+', label: 'Years of Experience' },
  { number: '10K+', label: 'Happy Visitors Annually' },
  { number: '100+', label: 'Dedicated Team Members' },
]

export const metadata = {
  title: 'About Us | BA Serves',
  description: 'Learn about BA Serves and our mission to provide exceptional outdoor recreation experiences.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0">
          <Image
            src="/images/DSC_0110-2048x1365.jpg"
            alt="About BA Serves"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative container-custom px-6">
          <div className="max-w-3xl">
            <span className="badge bg-white/10 text-white mb-4">About Us</span>
            <h1 className="font-display headline-xl text-white mb-6">
              Connecting People with <span className="text-green-400">Nature</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              From the rolling forests of Alabama to the rugged landscapes of Missouri, we're
              dedicated to providing well-maintained facilities, pristine landscapes, and
              seamless visitor experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-forest-DEFAULT">
        <div className="container-custom px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="badge badge-forest mb-4">Our Mission</span>
              <h2 className="headline-lg text-gray-900 mb-6">
                Creating Memorable Outdoor Experiences
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  At BA Serves, we believe that everyone deserves access to beautiful, well-maintained
                  outdoor spaces. Our mission is to manage recreation areas that inspire connection
                  with nature while providing the amenities and services visitors need for a
                  comfortable experience.
                </p>
                <p>
                  We partner with federal, state, and local agencies to operate campgrounds, day-use
                  areas, and recreation facilities across the country. Our team of dedicated
                  professionals works tirelessly to ensure that every visitor leaves with memories
                  that last a lifetime.
                </p>
                <p>
                  Whether you're seeking a weekend camping trip, a day of hiking, or a peaceful
                  afternoon by the lake, our recreation areas offer something for everyone.
                </p>
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <PropertyMap />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-gray-50">
        <div className="container-custom px-6">
          <div className="text-center mb-16">
            <span className="badge badge-forest mb-4">Our Values</span>
            <h2 className="headline-lg text-gray-900 mb-4">What Guides Us</h2>
            <p className="subheadline max-w-2xl mx-auto">
              Our core values shape everything we do, from how we manage facilities to how we
              interact with visitors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-16 h-16 rounded-2xl bg-forest-DEFAULT/10 text-forest-DEFAULT flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-forest-DEFAULT">
        <div className="container-custom px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Visit one of our recreation areas and see firsthand why thousands of visitors choose BA Serves.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/experiences" className="btn-primary bg-white text-forest-DEFAULT hover:bg-gray-100">
              Explore Locations
            </Link>
            <Link href="/careers" className="btn-outline-white">
              Join Our Team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
