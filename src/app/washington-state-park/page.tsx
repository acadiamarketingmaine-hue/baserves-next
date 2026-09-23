import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import { getPropertyContent } from '@/content'
import NoticeBanner from '@/content/NoticeBanner'

const SLUG = 'washington-state-park'

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
    alternates: { canonical: '/washington-state-park' },
    openGraph: og('/washington-state-park'),
  }
}

// The words and photos live in src/content/defaults/washington-state-park.ts.
// Only the icons stay here - they are JSX and cannot be serialised - and the
// two icon-led recreation cards are matched to their copy by key.
const recreationIcons: Record<string, JSX.Element> = {
  trails: (
                <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
  ),
  birding: (
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
  ),
}

/** The tint each download tile is painted in, keyed by the stored badge. */
function downloadTint(color: string | undefined): { wrap: string; icon: string } {
  if (color === 'blue') return { wrap: 'bg-blue-100', icon: 'text-blue-600' }
  return { wrap: 'bg-red-100', icon: 'text-red-600' }
}

export default async function WashingtonStateParkPage() {
  const content = (await getPropertyContent(SLUG))!
  const lodgingItems = content.sections.lodging.items ?? []
  const cabinCount = lodgingItems.find((i) => i.key === 'cabin-count')!
  const cabinExterior = lodgingItems.find((i) => i.key === 'photo-exterior')!.photo!
  const cabinInterior = lodgingItems.find((i) => i.key === 'photo-interior')!.photo!
  const fishPDFs = content.sections.fishOfTheBigRiver.items ?? []
  const recreation = content.sections.recreation.items ?? []
  const pool = recreation.find((i) => i.key === 'pool')!
  const trails = recreation.find((i) => i.key === 'trails')!
  const birding = recreation.find((i) => i.key === 'birding')!
  const campStore = recreation.find((i) => i.key === 'camp-store')!
  const downloads = content.sections.downloads.items ?? []
  const galleryImages = content.gallery
  const scopeItems = content.sections.scopeOfServices.items ?? []
  const scopeBadge = scopeItems.find((i) => i.key === 'badge')
  const scopeOfWork = scopeItems.filter((c) => c.items)

  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url="/washington-state-park"
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
          <span className="inline-block px-4 py-2 bg-green-700 text-white text-sm font-semibold rounded-full mb-4">
            {content.tagline}
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
            {content.name}
          </h1>
          <div className="flex items-center text-white/80 mb-6">
            <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            {content.locationLine}
          </div>
          <a
            href={content.ctas.hero.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-forest-DEFAULT text-white font-semibold rounded-lg hover:bg-forest-dark transition-colors"
          >
            {content.ctas.hero.label}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
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

              {/* Petroglyphs Feature */}
              <div className="mt-10 bg-amber-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{content.sections.petroglyphs.heading}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {content.sections.petroglyphs.paragraphs?.[0]}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{content.sections.amenities.heading}</h3>
                <ul className="space-y-3">
                  {content.features.map((amenity) => (
                    <li key={amenity} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-forest-DEFAULT rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">{content.sections.readyToVisit.heading}</h3>
                <p className="text-white/80 mb-6">
                  {content.sections.readyToVisit.intro}
                </p>
                <a
                  href={content.ctas.sidebar.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-4 bg-white text-forest-DEFAULT font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  {content.ctas.sidebar.label}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lodging */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{content.sections.lodging.heading}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {content.sections.lodging.paragraphs?.[0]}
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4">
                  <div className="text-2xl font-bold text-forest-DEFAULT mb-1">{cabinCount.meta}</div>
                  <div className="text-gray-600 text-sm">{cabinCount.body}</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative h-64 rounded-2xl overflow-hidden">
                <Image src={cabinExterior.src} alt={cabinExterior.alt} fill className="object-cover" />
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden">
                <Image src={cabinInterior.src} alt={cabinInterior.alt} fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fish of the Big River */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{content.sections.fishOfTheBigRiver.heading}</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            {content.sections.fishOfTheBigRiver.intro}
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {fishPDFs.map((pdf) => (
              <a
                key={pdf.key}
                href={pdf.href!}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 hover:bg-blue-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm group-hover:text-blue-700 transition-colors">{pdf.title}</h3>
                  <p className="text-gray-500 text-xs">PDF</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Recreation */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{content.sections.recreation.heading}</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">{content.sections.recreation.intro}</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative h-56">
                <Image src={pool.photo!.src} alt={pool.photo!.alt} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{pool.title}</h3>
                <p className="text-gray-600 text-sm">
                  {pool.body}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                {recreationIcons[trails.key]}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{trails.title}</h3>
              <p className="text-gray-600 text-sm mb-4">
                {trails.body}
              </p>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">{trails.badge}</span>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                {recreationIcons[birding.key]}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{birding.title}</h3>
              <p className="text-gray-600 text-sm mb-4">
                {birding.body}
              </p>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">{birding.badge}</span>
            </div>
          </div>
          <div className="mt-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative h-56">
                <Image src={campStore.photo!.src} alt={campStore.photo!.alt} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{campStore.title}</h3>
                <p className="text-gray-600 text-sm">
                  {campStore.body}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources & Downloads */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{content.sections.downloads.heading}</h2>
          <p className="text-gray-600 mb-8">{content.sections.downloads.intro}</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {downloads.map((item) => (
              <a
                key={item.key}
                href={item.href!}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-gray-50 rounded-2xl p-6 hover:bg-green-50 transition-colors group"
              >
                <div className={`w-12 h-12 ${downloadTint(item.badge).wrap} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <svg className={`w-6 h-6 ${downloadTint(item.badge).icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.body}</p>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((photo, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover hover:scale-110 transition-transform duration-500" />
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
            <a
              href={content.ctas.footer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-white text-forest-DEFAULT hover:bg-gray-100"
            >
              {content.ctas.footer.label}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
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
