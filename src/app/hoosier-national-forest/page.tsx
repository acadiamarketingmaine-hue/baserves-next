import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import { getPropertyContent } from '@/content'
import NoticeBanner from '@/content/NoticeBanner'

const SLUG = 'hoosier-national-forest'

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
    alternates: { canonical: '/hoosier-national-forest' },
    openGraph: og('/hoosier-national-forest'),
  }
}

// The words and photos live in src/content/defaults/hoosier-national-forest.ts.
// Only the icons stay here - they are JSX and cannot be serialised - and they
// are matched to the activity copy by key.
const activityIcons: Record<string, JSX.Element> = {
  hiking: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
  ),
  fishing: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
  ),
  swimming: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
  ),
  boating: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      </svg>
  ),
  camping: (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
      </svg>
  ),
  'wildlife-viewing': (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
  ),
}

export default async function HoosierNationalForestPage() {
  const content = (await getPropertyContent(SLUG))!
  const heroLinks = [content.ctas.heroHardinRidge, content.ctas.heroIndianCelina, content.ctas.heroTipsaw]
  const subProperties = content.sections.recreationAreas.items ?? []
  const activities = content.sections.activities.items ?? []
  const scopeItems = content.sections.scopeOfServices.items ?? []
  const scopeBadge = scopeItems.find((i) => i.key === 'badge')
  const scopeOfWork = scopeItems.filter((c) => c.items)

  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url="/hoosier-national-forest"
        name={content.seo.title}
        crumbName={content.name}
        description={content.seo.description}
        image={content.hero.src}
      />
      <NoticeBanner notices={content.notices} />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src={content.hero.src}
            alt={content.hero.alt}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 container-custom px-6 pb-16">
          <span className="inline-block px-4 py-2 bg-green-700 text-white text-sm font-semibold rounded-full mb-4">
            {content.tagline}
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
            {content.name}
          </h1>
          <div className="flex items-center text-white/90 mb-6">
            <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            {content.locationLine}
          </div>
          <div className="flex flex-wrap gap-2">
            {heroLinks.map((cg) => (
              <a
                key={cg.label}
                href={cg.url}
                {...(cg.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-forest-DEFAULT text-white text-sm font-semibold rounded-lg hover:bg-forest-dark transition-colors"
              >
                {cg.label}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-forest-DEFAULT py-8">
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

      {/* Overview */}
      <section className="py-16">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{content.sections.about.heading}</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  {content.paragraphs[0]}
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {content.paragraphs[1]}
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {content.paragraphs[2]}
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {content.paragraphs[3]}
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {content.paragraphs[4]}
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {content.paragraphs[5]}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {content.paragraphs[6]}
                </p>
              </div>

              <div className="mt-10 bg-green-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{content.sections.deamWilderness.heading}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {content.sections.deamWilderness.paragraphs?.[0]}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{content.sections.thingsToDo.heading}</h3>
                <ul className="space-y-3">
                  {content.features.map((item) => (
                    <li key={item} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-forest-DEFAULT rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">{content.sections.planYourVisit.heading}</h3>
                <p className="text-white/90 mb-6">
                  {content.sections.planYourVisit.intro}
                </p>
                <Link
                  href={content.ctas.sidebar.url}
                  className="block w-full text-center py-4 bg-white text-forest-DEFAULT font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  {content.ctas.sidebar.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recreation Areas (Sub-Properties) */}
      <section id="recreation-areas" className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{content.sections.recreationAreas.heading}</h2>
          <p className="text-gray-600 mb-10 max-w-2xl">{content.sections.recreationAreas.intro}</p>
          <div className="grid md:grid-cols-3 gap-8">
            {subProperties.map((property) => (
              <Link
                key={property.key}
                href={property.href!}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
              >
                <div className="relative h-64">
                  <Image src={property.photo!.src} alt={property.photo!.alt} fill sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-green-700 text-white text-xs font-semibold rounded-full">
                    {property.badge}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-forest-DEFAULT transition-colors">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{property.body}</p>
                  <span className="inline-flex items-center gap-2 text-forest-DEFAULT font-semibold text-sm">
                    Explore
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{content.sections.activities.heading}</h2>
          <p className="text-gray-600 mb-10 max-w-2xl">{content.sections.activities.intro}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <div key={activity.key} className="bg-gray-50 rounded-2xl p-6 hover:bg-green-50 transition-colors">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  {activityIcons[activity.key]}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{activity.title}</h3>
                <p className="text-gray-600 text-sm">{activity.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope of Services */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-3xl mb-12">
            <span className="inline-block px-4 py-2 bg-green-600/10 text-green-700 text-sm font-semibold rounded-full mb-4">
              {scopeBadge?.title}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content.sections.scopeOfServices.heading}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {content.sections.scopeOfServices.intro}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {scopeOfWork.map((category) => (
              <div key={category.key} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{category.body}</p>
                <ul className="space-y-2">
                  {category.items!.map((item) => (
                    <li key={item} className="flex items-start text-sm text-gray-700">
                      <svg className="w-4 h-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-forest-DEFAULT">
        <div className="container-custom px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-6">
            {content.sections.closingCta.heading}
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            {content.sections.closingCta.intro}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={content.ctas.footerHardinRidge.url}
              className="btn-primary bg-white text-forest-DEFAULT hover:bg-gray-100"
            >
              {content.ctas.footerHardinRidge.label}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href={content.ctas.footerIndianCelina.url} className="btn-primary bg-white/10 text-white hover:bg-white/20">
              {content.ctas.footerIndianCelina.label}
            </Link>
            <Link href={content.ctas.footerTipsaw.url} className="btn-primary bg-white/10 text-white hover:bg-white/20">
              {content.ctas.footerTipsaw.label}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
