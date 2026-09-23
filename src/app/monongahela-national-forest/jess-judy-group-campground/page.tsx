import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import { getPropertyContent } from '@/content'
import NoticeBanner from '@/content/NoticeBanner'
import Image from 'next/image'

const SLUG = 'jess-judy-group-campground'

/**
 * This page reads the content layer, so it must not be frozen at build time:
 * once a camp publishes an edit, a page that only changes when somebody
 * deploys is a page the editor cannot reach. Five minutes is the floor — the
 * publish webhook (POST /api/revalidate) drops this slug's cache tag and makes
 * a change visible in seconds, and this is what happens when that webhook does
 * not arrive. Kept as a literal because Next.js reads it statically; the same
 * number is CONTENT_POLICY.revalidateSeconds.
 */
export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPropertyContent(SLUG)
  return {
    title: content?.seo.title ? { absolute: content?.seo.title } : undefined,
    description: content?.seo.description,
    alternates: { canonical: '/monongahela-national-forest/jess-judy-group-campground' },
    openGraph: og('/monongahela-national-forest/jess-judy-group-campground'),
  }
}

// The words live in src/content/defaults/jess-judy-group-campground.ts. Only the
// icons stay here - they are JSX and cannot be serialised.

export default async function JessJudyGroupCampgroundPage() {
  const content = (await getPropertyContent(SLUG))!

  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url="/monongahela-national-forest/jess-judy-group-campground"
        name={content.seo.title}
        crumbName={content.name}
        description={content.seo.description}
        image={content.hero.src}
        crumbs={[{ name: "Monongahela National Forest", url: "/monongahela-national-forest" }]}
      />
      <NoticeBanner notices={content.notices} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-forest-DEFAULT overflow-hidden">
        <div className="absolute inset-0">
          <Image src={content.hero.src} alt={content.hero.alt} fill sizes="100vw" priority className="object-cover opacity-20" />
        </div>
        <div className="container-custom px-6 relative z-10">
          <div className="max-w-3xl">
            <Link href={content.ctas.parentForest.url} className="inline-flex items-center gap-2 text-green-300 hover:text-white text-sm mb-4 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              {content.ctas.parentForest.label}
            </Link>
            <h1 className="font-display headline-xl text-white mb-4">
              {content.name}
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              {content.tagline}
            </p>
            <a
              href={content.ctas.hero.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              {content.ctas.hero.label}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 py-8">
        <div className="container-custom px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {content.stats.map((stat) => (
            <div key={stat.key} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{content.sections.about.heading}</h2>
              {content.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-600 leading-relaxed mb-6">
                {paragraph}
              </p>
              ))}
              <a
                href={content.ctas.reserve.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                {content.ctas.reserve.label}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{content.sections.features.heading}</h3>
              <ul className="space-y-3">
                {content.features.map((feature) => (
                <li key={feature} className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {feature}
                </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{content.sections.closingCta.heading}</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            {content.sections.closingCta.intro}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={content.ctas.footer.url} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
              {content.ctas.footer.label}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
            <Link href={content.ctas.footerBack.url} className="btn-secondary">
              {content.ctas.footerBack.label}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
