import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import { ListenButton } from '@/components/reader'
import {
  LakesideShell,
  ClosingCta,
  Eyebrow,
  SectionActions,
  bandTint,
  frame,
  h2 as h2Class,
  body as bodyClass,
  pillLight,
  pillGhostLight,
} from '@/components/property/lakeside'

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
  title: 'About Us',
  description: 'BA Services, Inc. manages 15+ recreation areas across 7 states — campgrounds, national forests, state parks, and DOT rest areas with 100+ dedicated team members.',
  alternates: {
    canonical: '/about',
  },
  openGraph: og('/about'),
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url="/about"
        name="About Us | BA Services"
        crumbName="About Us"
        description="BA Services, Inc. manages 15+ recreation areas across 7 states — campgrounds, national forests, state parks, and DOT rest areas with 100+ dedicated team members."
        type="AboutPage"
        image="/images/monongahela/spruce-knob-panorama.jpg"
      />

      <LakesideShell>
        {/* Hero */}
        <section className="relative pt-32 pb-20">
          <div className="absolute inset-0">
            <Image
              src="/images/monongahela/spruce-knob-panorama.jpg"
              alt="About BA Services"
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className={`relative ${frame}`}>
            <div className="max-w-3xl">
              <span className="badge bg-white/10 text-white mb-4">About Us</span>
              <h1 className="font-lake-serif headline-xl text-white mb-6">
                Connecting People with <span className="text-green-400">Nature</span>
              </h1>
              <div className="mb-6">
                <ListenButton variant="light" />
              </div>
              <p className="text-xl text-white/90 leading-relaxed">
                From the rockbound coast of Maine to the salt flats of Utah, we&apos;re
                dedicated to offering well-kept facilities, unspoiled scenery, and
                seamless <Link href="/" className="underline hover:text-white transition-colors">experiences for every visitor</Link>.
              </p>
              <div className="mt-8">
                <Link href="/experiences" className={pillLight}>
                  Explore Locations
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-lake-spruce">
          <div className={frame}>
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
        <section className="py-14 md:py-24 lg:py-[120px]">
          <div className={frame}>
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div data-reveal="up">
                <Eyebrow label="Our Mission" rule className="mb-4" />
                <h2 className={`${h2Class} text-lake-ink`}>Creating Memorable Outdoor Experiences</h2>
                <div className="mt-6 space-y-4">
                  <p className={bodyClass}>
                    At BA Services, we believe that everyone deserves access to beautiful, well-maintained
                    outdoor spaces. Our mission is to manage recreation areas that inspire connection
                    with nature while providing the amenities and <Link href="/services" className="font-medium text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink">services</Link> visitors need for a
                    comfortable experience.
                  </p>
                  <p className={bodyClass}>
                    We partner with federal, state, and local agencies to operate campgrounds, day-use
                    areas, and recreation facilities across the country. Our team of dedicated
                    professionals works tirelessly to ensure that every visitor leaves with memories
                    that last a lifetime.
                  </p>
                  <p className={bodyClass}>
                    Whether you&apos;re seeking a weekend camping trip, a day of hiking, or a peaceful
                    afternoon by the lake, our recreation areas offer something for everyone. We invite you to{' '}
                    <Link href="/leave-a-review" className="font-medium text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink">share your experience</Link> after your visit.
                  </p>
                </div>
                <SectionActions
                  className="mt-8"
                  primary={{ label: 'Explore Locations', url: '/experiences', kind: 'internal' }}
                  secondary={[{ label: 'Contact us', url: '/contact', kind: 'internal' }]}
                />
              </div>
              <div data-reveal="fade" className="relative aspect-square overflow-hidden rounded-md">
                <PropertyMap />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className={`py-14 md:py-24 lg:py-[120px] ${bandTint}`}>
          <div className={frame}>
            <div className="text-center mb-16">
              <Eyebrow label="Our Values" className="mb-4 flex flex-col items-center" />
              <h2 className={`${h2Class} text-lake-ink mb-4`}>What Guides Us</h2>
              <p className={`${bodyClass} max-w-2xl mx-auto`}>
                Our core values shape everything we do, from how we manage facilities to how we
                interact with visitors.
              </p>
            </div>

            <div data-reveal="card" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div key={value.title} className="lk-card rounded-md border border-lake-line bg-white p-8">
                  <div className="w-16 h-16 rounded-full bg-lake-spruce/10 text-lake-spruce flex items-center justify-center mb-6">
                    {value.icon}
                  </div>
                  <h3 className="font-lake-serif text-[22px] leading-tight text-lake-ink mb-3">{value.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-lake-mute">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <ClosingCta
          photo={{ src: '/images/bankhead-bicycle-trail.jpg', alt: 'Paved recreation trail beside a lake in Bankhead National Forest' }}
          heading="Ready to Experience the Difference?"
          text="Visit one of our recreation areas and see firsthand why thousands of visitors choose BA Services."
          primary={{ label: 'Explore Locations', url: '/experiences', kind: 'internal' }}
          phone="+1 207 307-7903"
          secondary={{ label: 'Join Our Team', url: '/careers', kind: 'internal' }}
        />
      </LakesideShell>

      <Footer />
    </main>
  )
}
