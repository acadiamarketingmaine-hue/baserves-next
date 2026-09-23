import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import { getPropertyContent } from '@/content'
import NoticeBanner from '@/content/NoticeBanner'

const SLUG = 'bankhead-national-forest'

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
    alternates: { canonical: '/bankhead-national-forest' },
    openGraph: og('/bankhead-national-forest'),
  }
}

// The words and photos live in src/content/defaults/bankhead-national-forest.ts.
// Only the markup stays here: the download icon is JSX and cannot be
// serialised, and the paragraphs that carry an inline <strong> keep the tag
// here and read their three text runs from the content layer by key.

/** The tint each download tile is painted in, keyed by the stored badge. */
function downloadTint(color: string | undefined): { wrap: string; icon: string } {
  if (color === 'blue') return { wrap: 'bg-blue-100', icon: 'text-blue-700' }
  if (color === 'green') return { wrap: 'bg-green-100', icon: 'text-green-700' }
  if (color === 'amber') return { wrap: 'bg-amber-100', icon: 'text-amber-700' }
  return { wrap: 'bg-red-100', icon: 'text-red-700' }
}

export default async function BankheadNationalForestPage() {
  const content = (await getPropertyContent(SLUG))!
  const heroLinks = [content.ctas.heroClearCreek, content.ctas.heroCorinth]
  const contact = content.sections.contact.items ?? []
  const contactDistrict = contact.find((i) => i.key === 'district')
  const contactAddress = contact.find((i) => i.key === 'address')
  const campgrounds = content.sections.campgrounds.items ?? []
  const recreationAreas = content.sections.otherRecreationAreas.items ?? []
  const birdingParagraphs = content.sections.birding.items ?? []
  const birdingCerulean = birdingParagraphs.find((i) => i.key === 'cerulean')!
  const birdingTrail = birdingParagraphs.find((i) => i.key === 'birding-trail')!
  const birdingTrailSites = content.sections.birdingTrailSites.items ?? []
  const sipseyItems = content.sections.sipseyWilderness.items ?? []
  const sipseyPhoto = sipseyItems.find((i) => i.key === 'photo')!.photo!
  const sipseyWildAndScenic = sipseyItems.find((i) => i.key === 'wild-and-scenic')!
  const rangeItems = content.sections.shootingRange.items ?? []
  const rangePhoto = rangeItems.find((i) => i.key === 'photo')!.photo!
  const rangeFacts = rangeItems.filter((i) => i.key !== 'photo')
  const quailItems = content.sections.quailHabitat.items ?? []
  const quailPhoto = quailItems.find((i) => i.key === 'photo')!.photo!
  const quailEmphasis = quailItems.find((i) => i.key === 'emphasis-areas')!
  const quailPines = quailItems.find((i) => i.key === 'pine-restoration')!
  const downloads = content.sections.downloads.items ?? []
  const galleryPhotos = content.gallery
  const scopeItems = content.sections.scopeOfServices.items ?? []
  const scopeBadge = scopeItems.find((i) => i.key === 'badge')
  const scopeOfWork = scopeItems.filter((c) => c.items)

  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url="/bankhead-national-forest"
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
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 container-custom px-6 pb-16">
          <span className="inline-block px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full mb-4">
            {content.tagline}
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-3">
            {content.name}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light italic mb-4">
            {content.summary}
          </p>
          <div className="flex items-center text-white/80 mb-6">
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{content.sections.about.heading}</h2>
              <div className="prose prose-lg max-w-none">
                {content.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-gray-600 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Natural Features */}
              <div className="mt-10 bg-green-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{content.sections.naturalFeatures.heading}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {content.sections.naturalFeatures.paragraphs?.[0]}
                </p>
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
                <h3 className="text-xl font-bold mb-4">{content.sections.contact.heading}</h3>
                <p className="text-white/80 mb-2">{contactDistrict?.body}</p>
                <p className="text-white/80 mb-1 text-sm">{contactAddress?.body}</p>
                <a href={content.ctas.rangerPhone.url} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {content.ctas.rangerPhone.label}
                </a>
                <div className="space-y-2">
                  <a href={content.ctas.sidebarClearCreek.url} className="block w-full text-center py-3 bg-white text-forest-DEFAULT text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                    {content.ctas.sidebarClearCreek.label}
                  </a>
                  <a href={content.ctas.sidebarCorinth.url} className="block w-full text-center py-3 bg-white text-forest-DEFAULT text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                    {content.ctas.sidebarCorinth.label}
                  </a>
                </div>
                <div className="space-y-2 mt-4 pt-4 border-t border-white/20">
                  <a href={content.ctas.reserveClearCreek.url} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-3 border border-white/60 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors">
                    {content.ctas.reserveClearCreek.label}
                  </a>
                  <a href={content.ctas.reserveCorinth.url} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-3 border border-white/60 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors">
                    {content.ctas.reserveCorinth.label}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campgrounds */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{content.sections.campgrounds.heading}</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            {content.sections.campgrounds.intro}
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {campgrounds.map((campground) => (
              <Link key={campground.key} href={campground.href!} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                  <div className="relative h-56">
                    <Image
                      src={campground.photo!.src}
                      alt={campground.photo!.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 text-gray-900 font-semibold rounded-full text-sm">
                      {campground.meta}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                      {campground.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{campground.body}</p>
                    <span className="inline-flex items-center gap-1 mt-4 text-green-700 font-semibold text-sm">
                      {campground.title}
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Other Recreation Areas */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{content.sections.otherRecreationAreas.heading}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recreationAreas.map((area) => (
                <div key={area.key} className="bg-white rounded-xl p-5 border border-gray-200 hover:border-green-300 transition-colors">
                  <h4 className="font-bold text-gray-900 mb-2">{area.title}</h4>
                  <p className="text-gray-600 text-sm">{area.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Birding */}
      <section className="py-16 bg-blue-50">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{content.sections.birding.heading}</h2>
                  <span className="text-blue-700 font-semibold text-sm">{content.sections.birding.intro}</span>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                {content.sections.birding.paragraphs?.[0]}
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                {birdingCerulean.items![0]}<strong className="text-gray-900">{birdingCerulean.items![1]}</strong>{birdingCerulean.items![2]}
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                {birdingTrail.items![0]}<strong className="text-gray-900">{birdingTrail.items![1]}</strong>{birdingTrail.items![2]}
              </p>
              <a
                href={content.ctas.birdingGuide.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {content.ctas.birdingGuide.label}
              </a>
            </div>

            {/* Birding Trail Sites */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{content.sections.birdingTrailSites.heading}</h3>
              <div className="space-y-4">
                {birdingTrailSites.map((site) => (
                  <div key={site.key} className="bg-white rounded-xl p-5 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                      {site.title}
                    </h4>
                    <p className="text-gray-600 text-sm">{site.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sipsey Wilderness */}
      <section className="py-16">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src={sipseyPhoto.src}
                alt={sipseyPhoto.alt}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.sections.sipseyWilderness.heading}</h2>
              <p className="text-lg text-green-700 font-semibold mb-4">
                {content.sections.sipseyWilderness.intro}
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                {content.sections.sipseyWilderness.paragraphs?.[0]}
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                {sipseyWildAndScenic.items![0]}<strong className="text-gray-900">{sipseyWildAndScenic.items![1]}</strong>{sipseyWildAndScenic.items![2]}
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                {content.sections.sipseyWilderness.paragraphs?.[1]}
              </p>
              <div className="flex gap-3">
                <a
                  href={content.ctas.sipseyWildernessMap.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {content.ctas.sipseyWildernessMap.label}
                </a>
                <a
                  href={content.ctas.sipseyCanoeMap.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {content.ctas.sipseyCanoeMap.label}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hurricane Creek Shooting Range */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.sections.shootingRange.heading}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {content.sections.shootingRange.paragraphs?.[0]}
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {rangeFacts.map((fact) => (
                  <div key={fact.key} className="bg-white rounded-xl p-4">
                    <h4 className="font-bold text-gray-900 mb-1">{fact.title}</h4>
                    <p className="text-gray-600 text-sm">{fact.body}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-sm">
                {content.sections.shootingRange.paragraphs?.[1]}
              </p>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image
                src={rangePhoto.src}
                alt={rangePhoto.alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quail Habitat */}
      <section className="py-16">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-2xl overflow-hidden order-2 lg:order-1">
              <Image
                src={quailPhoto.src}
                alt={quailPhoto.alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.sections.quailHabitat.heading}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {quailEmphasis.items![0]}<strong className="text-gray-900">{quailEmphasis.items![1]}</strong>{quailEmphasis.items![2]}
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                {quailPines.items![0]}<strong className="text-gray-900">{quailPines.items![1]}</strong>{quailPines.items![2]}
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                {content.sections.quailHabitat.paragraphs?.[0]}
              </p>
              <a
                href={content.ctas.quailHabitatGuide.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {content.ctas.quailHabitatGuide.label}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Resources & Downloads */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{content.sections.downloads.heading}</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            {content.sections.downloads.intro}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {downloads.map((item) => (
              <a
                key={item.key}
                href={item.href!}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-50 rounded-xl p-5 hover:bg-green-50 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${downloadTint(item.badge).wrap}`}>
                    <svg className={`w-5 h-5 ${downloadTint(item.badge).icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 group-hover:text-green-700 transition-colors">{item.title}</h4>
                    <p className="text-gray-500 text-xs">{item.body}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{content.sections.photoGallery.heading}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryPhotos.map((photo, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope of Services */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-3xl mb-12">
            <span className="inline-block px-4 py-2 bg-forest-DEFAULT/10 text-forest-DEFAULT text-sm font-semibold rounded-full mb-4">{scopeBadge?.title}</span>
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
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            {content.sections.closingCta.intro}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={content.ctas.footerClearCreek.url} className="btn-primary bg-white text-forest-DEFAULT hover:bg-gray-100">
              {content.ctas.footerClearCreek.label}
            </a>
            <a href={content.ctas.footerCorinth.url} className="btn-primary bg-white text-forest-DEFAULT hover:bg-gray-100">
              {content.ctas.footerCorinth.label}
            </a>
            <Link href={content.ctas.footerExperiences.url} className="btn-primary bg-white/10 text-white hover:bg-white/20">
              {content.ctas.footerExperiences.label}
            </Link>
          </div>
          <div className="mt-6 text-white/60 text-sm">
            {content.sections.closingCta.paragraphs?.[0]}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
