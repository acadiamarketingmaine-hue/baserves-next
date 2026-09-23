import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import { getPropertyContent } from '@/content'
import NoticeBanner from '@/content/NoticeBanner'

const SLUG = 'monongahela-national-forest'

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
    alternates: { canonical: '/monongahela-national-forest' },
    openGraph: og('/monongahela-national-forest'),
  }
}

// The words and photos live in src/content/defaults/monongahela-national-forest.ts.
// Only the markup stays here: the icons are JSX and cannot be serialised, and
// the six campground links inside the About prose keep their <Link> and <li>
// and read their labels from the content layer.

export default async function MonongahelaNationalForestPage() {
  const content = (await getPropertyContent(SLUG))!
  const heroLinks = content.sections.heroLinks.items ?? []
  const aboutLinks = content.sections.about.items ?? []
  const ecologyHighlights =
    (content.sections.ecologicalDiversity.items ?? []).find((i) => i.key === 'highlights')?.items ?? []
  const exploreLinks = content.sections.readyToExplore.items ?? []
  const wildernessAreas = content.sections.wildernessAreas.items ?? []
  const notableDestinations = content.sections.notableDestinations.items ?? []
  const bloomingSchedule = content.sections.bloomingSchedule.items ?? []
  const birdingPhoto = (content.sections.birding.items ?? []).find((i) => i.key === 'photo')!.photo!
  const campgroundMaps = content.sections.campgroundMaps.items ?? []
  const wildernessMaps = content.sections.wildernessMaps.items ?? []
  const guides = content.sections.guides.items ?? []
  const scopeItems = content.sections.scopeOfServices.items ?? []
  const scopeBadge = scopeItems.find((i) => i.key === 'badge')
  const scopeOfWork = scopeItems.filter((c) => c.items)
  const footerLinks = content.sections.closingCta.items ?? []

  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url="/monongahela-national-forest"
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
                key={cg.key}
                href={cg.href!}
                {...(cg.href!.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-forest-DEFAULT text-white text-sm font-semibold rounded-lg hover:bg-forest-dark transition-colors"
              >
                {cg.title}
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{content.sections.about.heading}</h2>
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
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  {aboutLinks.map((cg) => (
                    <li key={cg.key}><Link href={cg.href!} className="text-green-700 hover:text-green-900 underline">{cg.title}</Link></li>
                  ))}
                </ul>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {content.paragraphs[4]}
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {content.paragraphs[5]}
                </p>
              </div>

              {/* Ecological Diversity Callout */}
              <div className="mt-10 bg-green-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{content.sections.ecologicalDiversity.heading}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {content.sections.ecologicalDiversity.paragraphs?.[0]}
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  {ecologyHighlights.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{content.sections.activities.heading}</h3>
                <ul className="space-y-3">
                  {content.features.map((activity) => (
                    <li key={activity} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-forest-DEFAULT rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">{content.sections.readyToExplore.heading}</h3>
                <p className="text-white/90 mb-6">
                  {content.sections.readyToExplore.intro}
                </p>
                <div className="space-y-2">
                  {exploreLinks.map((cg) => (
                    <a key={cg.key} href={cg.href!} {...(cg.href!.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="block w-full text-center py-2.5 bg-white text-forest-DEFAULT text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                      {cg.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wilderness Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{content.sections.wildernessAreas.heading}</h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            {content.sections.wildernessAreas.intro}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wildernessAreas.map((area) => (
              <div key={area.key} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{area.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{area.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Destinations */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{content.sections.notableDestinations.heading}</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {notableDestinations.map((dest) => (
              <div key={dest.key} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="relative h-64">
                  <Image
                    src={dest.photo!.src}
                    alt={dest.photo!.alt}
                    fill
                    sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 text-gray-900 font-semibold rounded-full text-sm">
                    {dest.meta}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{dest.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{dest.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blooming Schedule */}
      <section className="py-16 bg-green-50">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.sections.bloomingSchedule.heading}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {content.sections.bloomingSchedule.intro}
              </p>
              <a
                href={content.ctas.bloomingGuide.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-forest-DEFAULT text-white font-semibold rounded-lg hover:bg-forest-dark transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {content.ctas.bloomingGuide.label}
              </a>
            </div>
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {bloomingSchedule.map((entry) => (
                  <div key={entry.key} className="bg-white rounded-xl p-5 flex gap-4 items-start">
                    <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{entry.title!.slice(0, 3).toUpperCase()}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{entry.title}</h4>
                      <p className="text-gray-600 text-sm">{entry.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Birding */}
      <section className="py-16">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image
                src={birdingPhoto.src}
                alt={birdingPhoto.alt}
                fill
                sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.sections.birding.heading}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {content.sections.birding.paragraphs?.[0]}
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                {content.sections.birding.paragraphs?.[1]}
              </p>
              <a
                href={content.ctas.birdChecklist.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-forest-DEFAULT text-white font-semibold rounded-lg hover:bg-forest-dark transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {content.ctas.birdChecklist.label}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Resources & Downloads */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{content.sections.resources.heading}</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            {content.sections.resources.intro}
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Campground Maps */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{content.sections.campgroundMaps.heading}</h3>
              <ul className="space-y-3">
                {campgroundMaps.map((map) => (
                  <li key={map.key}>
                    <a
                      href={map.href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-green-700 hover:text-green-900 transition-colors text-sm"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {map.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Wilderness Maps */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{content.sections.wildernessMaps.heading}</h3>
              <ul className="space-y-3">
                {wildernessMaps.map((map) => (
                  <li key={map.key}>
                    <a
                      href={map.href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-700 hover:text-blue-900 transition-colors text-sm"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {map.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Guides & References */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{content.sections.guides.heading}</h3>
              <ul className="space-y-3">
                {guides.map((guide) => (
                  <li key={guide.key}>
                    <a
                      href={guide.href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-amber-700 hover:text-amber-900 transition-colors text-sm"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {guide.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.sections.scopeOfServices.heading}</h2>
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
            {footerLinks.map((cg) => (
              <a key={cg.key} href={cg.href!} {...(cg.href!.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="btn-primary bg-white text-forest-DEFAULT hover:bg-gray-100 text-sm">
                {cg.title}
              </a>
            ))}
            <Link href={content.ctas.footerExperiences.url} className="btn-primary bg-white/10 text-white hover:bg-white/20">
              {content.ctas.footerExperiences.label}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
