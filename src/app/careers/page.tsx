import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import EmploymentApplicationForm from '@/components/EmploymentApplicationForm'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import { jobPosting } from '@/lib/schema'
import { ListenButton } from '@/components/reader'
import {
  LakesideShell,
  Eyebrow,
  RuledRows,
  SectionActions,
  bandTint,
  frame,
  h2 as h2Class,
  pillLight,
} from '@/components/property/lakeside'

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

// JSON-LD JobPosting locations, from the `location` strings above (never invented).
const JOB_LOCATIONS: Record<string, { locality?: string; region?: string; name?: string }[]> = {
  'Multiple Locations': [{ name: 'Multiple BA Services locations' }],
  'Michigan & Indiana': [{ region: 'MI' }, { region: 'IN' }],
  'Long Lake Outdoor Center': [{ name: 'Long Lake Outdoor Center', locality: 'Middleville', region: 'MI' }],
}
const EMPLOYMENT_TYPE: Record<string, string> = { Seasonal: 'TEMPORARY', 'Full-Time': 'FULL_TIME', 'Part-Time': 'PART_TIME' }
// First commit that published these openings (git log --diff-filter=A -- src/app/careers/page.tsx).
const JOBS_DATE_POSTED = '2026-01-16'

export const metadata = {
  title: 'Careers',
  description: 'Join BA Services — seasonal and full-time outdoor jobs at campgrounds, state parks, and rest areas across 7 states. Apply online today.',
  alternates: {
    canonical: '/careers',
  },
  openGraph: og('/careers'),
}

export default function CareersPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url="/careers"
        name="Careers | BA Services"
        crumbName="Careers"
        description={metadata.description}
        image="/images/long-lake/fall-foliage.jpg"
        nodes={positions.map((p) =>
          jobPosting({
            url: '/careers',
            title: p.title,
            description: p.description,
            datePosted: JOBS_DATE_POSTED,
            employmentType: EMPLOYMENT_TYPE[p.type] ?? 'OTHER',
            locations: JOB_LOCATIONS[p.location] ?? [{ name: p.location }],
          }),
        )}
      />

      <LakesideShell>
        {/* Hero */}
        <section className="relative pt-32 pb-20">
          <div className="absolute inset-0">
            <Image
              src="/images/long-lake/fall-foliage.jpg"
              alt="Careers at BA Services"
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className={`relative ${frame}`}>
            <div className="max-w-3xl">
              <span className="badge bg-white/10 text-white mb-4">Careers</span>
              <h1 className="font-lake-serif headline-xl text-white mb-6">
                Join Our <span className="text-green-400">Team</span>
              </h1>
              <div className="mb-6">
                <ListenButton variant="light" />
              </div>
              <p className="text-xl text-white/90 leading-relaxed">
                Love the outdoors? Want to make a difference? Join our team of dedicated
                professionals who are passionate about creating memorable <Link href="/experiences" className="underline hover:text-white transition-colors">experiences</Link> for visitors.
              </p>
              <div className="mt-8">
                <a href="#apply" className={pillLight}>
                  Apply Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Download Application - TOP */}
        <section className="py-12 bg-white border-b border-lake-line">
          <div className={frame}>
            <div className="max-w-3xl mx-auto rounded-md border border-lake-spruce/20 bg-lake-spruce/5 p-8 text-center">
              <h2 className="font-lake-serif text-[24px] text-lake-ink mb-3">Download Employment Application</h2>
              <p className="text-lake-mute mb-6">
                Prefer to fill out a paper application? Download the PDF and email it to{' '}
                <a href="mailto:OfficeManager@BAServes.com" className="text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink">OfficeManager@BAServes.com</a>{' '}
                or fax it to 207-307-7902.
              </p>
              <a
                href="/employment-application.pdf"
                download="BA Services - Employment Application.pdf"
                className="inline-flex min-h-[56px] items-center gap-2 rounded-full bg-lake-spruce px-8 text-base font-medium text-lake-paper hover:bg-lake-spruce-dark transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce"
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
        <section className="py-16 bg-lake-spruce">
          <div className={frame}>
            <h2 className="font-lake-serif text-[32px] md:text-[40px] text-white text-center mb-12">Why Work With Us</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                  <p className="text-white/70 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-14 md:py-24 lg:py-[120px]">
          <div className={frame}>
            <div className="text-center mb-12">
              <Eyebrow label="Open Positions" rule className="mb-4 flex flex-col items-center" />
              <h2 className={`${h2Class} text-lake-ink mb-4`}>Current Opportunities</h2>
              <p className="max-w-2xl mx-auto text-[16px] leading-[1.65] text-lake-mute md:text-[17px]">
                We&apos;re always looking for talented individuals to join our team. Learn more about our <Link href="/services" className="text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink">management services</Link>.
              </p>
            </div>

            <div className="mx-auto max-w-3xl">
              <RuledRows
                twoUp={false}
                rows={positions.map((p) => ({
                  key: p.title,
                  title: p.title,
                  meta: p.type,
                  body: p.description,
                  badge: p.location,
                  href: '#apply',
                  linkLabel: 'Apply Now',
                }))}
              />
            </div>

            <p className="mt-10 text-center text-[16px] leading-[1.65] text-lake-mute md:text-[17px]">
              Don&apos;t see a position that fits? We&apos;re always interested in hearing from passionate individuals.
            </p>
            <SectionActions
              className="mt-6"
              align="center"
              primary={{ label: 'Apply Now', url: '#apply', kind: 'internal' }}
              secondary={[{ label: 'Contact us', url: '/contact', kind: 'internal' }]}
            />
          </div>
        </section>

        {/* Online Application Form */}
        <section id="apply" className={`py-16 ${bandTint} scroll-mt-28`}>
          <div className={frame}>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <Eyebrow label="Apply Online" rule className="mb-4 flex flex-col items-center" />
                <h2 className={`${h2Class} text-lake-ink mb-4`}>Employment Application</h2>
                <p className="text-lake-mute text-sm italic">
                  It is the policy of BA Services, Inc. to provide equal employment opportunities to all applicants and
                  employees without regard to any legally protected status such as race, color, religion, gender,
                  national origin, age, disability, or veteran status.
                </p>
              </div>
              <div className="rounded-md border border-lake-line bg-white p-6 md:p-8">
                <EmploymentApplicationForm />
              </div>
            </div>
          </div>
        </section>
      </LakesideShell>

      <Footer />
    </main>
  )
}
