import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import EmploymentApplicationForm from '@/components/EmploymentApplicationForm'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import { faq, jobPosting } from '@/lib/schema'
import { ListenButton } from '@/components/reader'
import {
  LakesideShell,
  Eyebrow,
  RuledRows,
  SectionActions,
  bandTint,
  bandWhite,
  frame,
  h2 as h2Class,
  pillLight,
  pillGhostLight,
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

const hiringSteps = [
  {
    step: '01',
    title: 'Submit Your Application',
    description: 'Complete the online application below in minutes, or download and email the PDF to OfficeManager@BAServes.com.',
  },
  {
    step: '02',
    title: 'Talk with Our Operations Team',
    description: 'A regional manager reviews your preferred states, season dates, and background to match you with the right property.',
  },
  {
    step: '03',
    title: 'Start On-Site with Paid Training',
    description: 'Get hands-on onboarding for guest services, facility upkeep, and safety standards before the season ramps up.',
  },
]

const careersFaqs = [
  {
    question: 'Do you hire both seasonal and year-round team members?',
    answer:
      'Yes. We hire seasonal campground hosts and groundskeepers for peak recreation seasons as well as full-time maintenance technicians and program coordinators.',
  },
  {
    question: 'Which states does BA Services hire in?',
    answer:
      'BA Services operates campgrounds, national forests, state parks, and DOT rest areas across 9 states: Alabama, Indiana, Iowa, Maine, Michigan, Missouri, Rhode Island, Utah, and West Virginia.',
  },
  {
    question: 'Can I submit a paper application instead of applying online?',
    answer:
      'Yes. Download the PDF employment application on this page and email it to OfficeManager@BAServes.com or fax it to 207-307-7902.',
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
  title: { absolute: 'Outdoor Careers with BA Services Across 9 States' },
  description: 'Join BA Services — seasonal and full-time outdoor jobs at campgrounds, state parks, and rest areas across 9 states. Apply online today.',
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
        name="Outdoor Careers with BA Services Across 9 States"
        crumbName="Careers"
        description={metadata.description}
        image="/images/long-lake/fall-foliage.jpg"
        nodes={[
          ...positions.map((p) =>
            jobPosting({
              url: '/careers',
              title: p.title,
              description: p.description,
              datePosted: JOBS_DATE_POSTED,
              employmentType: EMPLOYMENT_TYPE[p.type] ?? 'OTHER',
              locations: JOB_LOCATIONS[p.location] ?? [{ name: p.location }],
            }),
          ),
          faq('/careers', careersFaqs),
        ]}
      />

      <LakesideShell>
        {/* Band 1 — Hook */}
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
              <span className="badge bg-white/10 text-white mb-4">Careers Across 9 States</span>
              <h1 className="font-lake-serif headline-xl text-white mb-6">
                Build Your Career Outdoors
              </h1>
              <div className="mb-6">
                <ListenButton variant="light" />
              </div>
              <p className="text-xl text-white/90 leading-relaxed">
                Join our team of campground hosts, maintenance technicians, and recreation specialists creating memorable{' '}
                <Link href="/experiences" className="underline hover:text-white transition-colors">experiences</Link> across national forests, state parks, and rest areas.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href="#apply" className={pillLight}>
                  Apply Online Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>
                <a
                  href="/employment-application.pdf"
                  download="BA Services - Employment Application.pdf"
                  className={pillGhostLight}
                >
                  Download PDF Application
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Band 2 — Why Work With Us */}
        <section className="py-16 bg-lake-spruce">
          <div className={frame}>
            <h2 className="font-lake-serif text-[32px] md:text-[40px] text-white text-center mb-12">Why Work With Us</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                  <p className="text-white/75 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Band 3 — Open Positions & Hiring Process */}
        <section className="py-14 md:py-24">
          <div className={frame}>
            <div className="text-center mb-12">
              <Eyebrow label="Open Positions" rule className="mb-4 flex flex-col items-center" />
              <h2 className={`${h2Class} text-lake-ink mb-4`}>Current Opportunities</h2>
              <p className="max-w-2xl mx-auto text-[16px] leading-[1.65] text-lake-mute md:text-[17px]">
                We&apos;re hiring seasonal and full-time staff. Learn more about our{' '}
                <Link href="/services" className="text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink">management services</Link>.
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
              Don&apos;t see a position that fits? We&apos;re always interested in hearing from reliable outdoor professionals.
            </p>
            <SectionActions
              className="mt-6"
              align="center"
              primary={{ label: 'Apply Now', url: '#apply', kind: 'internal' }}
              secondary={[{ label: 'Contact us', url: '/contact', kind: 'internal' }]}
            />
          </div>
        </section>

        {/* Hiring Process */}
        <section className={`py-14 md:py-20 ${bandWhite} border-t border-b border-lake-line`}>
          <div className={frame}>
            <div className="max-w-2xl mb-10">
              <Eyebrow label="Hiring Process" rule className="mb-4" />
              <h2 className={`${h2Class} text-lake-ink`}>How Applying Works</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {hiringSteps.map((item) => (
                <div key={item.step} className="rounded-md border border-lake-line bg-lake-paper/40 p-6">
                  <span className="text-xs font-semibold tracking-widest uppercase text-lake-spruce">{item.step}</span>
                  <h3 className="font-lake-serif text-[21px] text-lake-ink mt-2 mb-2">{item.title}</h3>
                  <p className="text-lake-mute text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Band 4 — FAQ */}
        <section className="py-14 md:py-20">
          <div className={`${frame} max-w-3xl`}>
            <div className="text-center mb-10">
              <Eyebrow label="Applicant Questions" rule className="mb-4 flex flex-col items-center" />
              <h2 className={`${h2Class} text-lake-ink`}>Careers FAQ</h2>
            </div>
            <div className="divide-y divide-lake-line border-t border-b border-lake-line">
              {careersFaqs.map((item) => (
                <div key={item.question} className="py-6">
                  <h3 className="font-lake-serif text-[19px] text-lake-ink mb-2">{item.question}</h3>
                  <p className="text-lake-mute text-[15px] leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Band 5 — Online Application Form + Paper Download */}
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

              <div className="mt-8 rounded-md border border-lake-spruce/20 bg-white p-6 text-center">
                <h3 className="font-lake-serif text-[21px] text-lake-ink mb-2">Prefer a Paper Application?</h3>
                <p className="text-lake-mute text-sm mb-5">
                  Download the PDF and email it to{' '}
                  <a href="mailto:OfficeManager@BAServes.com" className="text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink">OfficeManager@BAServes.com</a>{' '}
                  or fax it to 207-307-7902.
                </p>
                <a
                  href="/employment-application.pdf"
                  download="BA Services - Employment Application.pdf"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-lake-spruce px-7 text-sm font-medium text-lake-paper hover:bg-lake-spruce-dark transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Application (PDF)
                </a>
              </div>
            </div>
          </div>
        </section>
      </LakesideShell>

      <Footer />
    </main>
  )
}
