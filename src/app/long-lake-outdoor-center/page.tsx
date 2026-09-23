import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import { getPropertyContent } from '@/content'
import NoticeBanner from '@/content/NoticeBanner'

const SLUG = 'long-lake-outdoor-center'

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
    alternates: { canonical: '/long-lake-outdoor-center' },
    openGraph: og('/long-lake-outdoor-center'),
  }
}

// The words and photos live in src/content/defaults/long-lake-outdoor-center.ts.
// Only the icons stay here - they are JSX and cannot be serialised - and they
// are matched to the event-type copy by key.
const eventIcons: Record<string, JSX.Element> = {
  'weddings': (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
  ),
  'group-camps': (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
  ),
  'retreats': (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
  ),
  'family-reunions': (
      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
  ),
}

export default async function LongLakePage() {
  const content = (await getPropertyContent(SLUG))!
  const bunkhouses = content.sections.bunkhouses.items ?? []
  const amenities = content.features
  const eventTypes = content.sections.eventTypes.items ?? []
  const downloads = content.sections.downloads.items ?? []
  const galleryPhotos = content.gallery
  const scopeOfWork = (content.sections.scopeOfServices.items ?? []).filter((c) => c.items)
  const scopeBadge = (content.sections.scopeOfServices.items ?? []).find((c) => c.key === 'badge')
  const lodgingCabins = content.sections.lodging.items ?? []
  const lodgePhoto = (content.sections.lodge.items ?? []).find((i) => i.key === 'photo')!.photo!
  const lodgeTiles = (content.sections.lodge.items ?? []).filter((i) => i.key !== 'photo')
  const weddingPhoto = (content.sections.weddings.items ?? []).find((i) => i.key === 'photo')!.photo!
  const weddingPackage = (content.sections.weddings.items ?? []).find((i) => i.key === 'package')!

  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url="/long-lake-outdoor-center"
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
                <p className="text-gray-600 leading-relaxed mb-4">
                  {content.paragraphs[0]}
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {content.paragraphs[1]}
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {content.paragraphs[2]}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {content.paragraphs[3]}
                </p>
              </div>

              {/* CCC History Callout */}
              <div className="mt-10 bg-amber-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{content.sections.cccCallout.heading}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {content.sections.cccCallout.paragraphs?.[0]}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{content.sections.amenities.heading}</h3>
                <ul className="space-y-3">
                  {amenities.map((amenity) => (
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
                <h3 className="text-xl font-bold mb-4">{content.sections.planYourEvent.heading}</h3>
                <p className="text-white/90 mb-6">
                  {content.sections.planYourEvent.intro}
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
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{content.sections.lodging.heading}</h2>
          <p className="text-gray-600 mb-10 max-w-2xl">{content.sections.lodging.intro}</p>

          {/* Cabins */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-56">
                <Image src={lodgingCabins[0].photo!.src} alt={lodgingCabins[0].photo!.alt} fill sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{lodgingCabins[0].title}</h3>
                <p className="text-gray-600">
                  {lodgingCabins[0].body}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-56">
                <Image src={lodgingCabins[1].photo!.src} alt={lodgingCabins[1].photo!.alt} fill sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{lodgingCabins[1].title}</h3>
                <p className="text-gray-600">
                  {lodgingCabins[1].body}
                </p>
              </div>
            </div>
          </div>

          {/* Bunkhouses */}
          <h3 className="text-2xl font-bold text-gray-900 mb-6">{content.sections.bunkhouses.heading}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {bunkhouses.map((bunk) => (
              <div key={bunk.key} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold text-gray-900">{bunk.title}</h4>
                  <span className="text-sm font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full">
                    Sleeps {bunk.meta}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{bunk.body}</p>
                {bunk.badge && (
                  <div className="mt-3 flex items-center text-sm text-amber-700">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    {bunk.badge}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Lodge */}
      <section className="py-16">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden">
              <Image src={lodgePhoto.src} alt={lodgePhoto.alt} fill sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{content.sections.lodge.heading}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {content.sections.lodge.paragraphs?.[0]}
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                {content.sections.lodge.paragraphs?.[1]}
              </p>
              <div className="grid grid-cols-3 gap-4">
                {lodgeTiles.map((tile) => (
                <div key={tile.key} className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-forest-DEFAULT">{tile.title}</div>
                  <div className="text-gray-500 text-xs mt-1">{tile.body}</div>
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weddings & Events */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{content.sections.weddings.heading}</h2>
          <p className="text-gray-600 mb-10 max-w-2xl">{content.sections.weddings.intro}</p>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image src={weddingPhoto.src} alt={weddingPhoto.alt} fill sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div>
              <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{weddingPackage.title}</h3>
                    <span className="text-green-700 font-semibold">{weddingPackage.meta}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {content.sections.weddings.paragraphs?.[0]}
                </p>
              </div>
              <p className="text-gray-600 text-sm">
                Download the <a href={content.ctas.weddingPacket.url} className="text-forest-DEFAULT font-semibold hover:underline">{content.ctas.weddingPacket.label}</a> for full details on ceremony locations, catering options, and rental inclusions.
              </p>
            </div>
          </div>

          {/* Event Types */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventTypes.map((event) => (
              <div key={event.key} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  {eventIcons[event.key]}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm">{event.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{content.sections.photoGallery.heading}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryPhotos.map((photo, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" className="object-cover hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources & Downloads */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{content.sections.downloads.heading}</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">{content.sections.downloads.intro}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {downloads.map((doc) => (
              <a
                key={doc.key}
                href={doc.href!}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-forest-DEFAULT transition-colors">{doc.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{doc.body}</p>
                    <span className="inline-flex items-center gap-1 text-forest-DEFAULT text-sm font-medium mt-2">
                      Download PDF
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Scope of Services */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-3xl mb-12">
            <span className="badge bg-forest-DEFAULT/10 text-forest-DEFAULT mb-4">{scopeBadge?.title}</span>
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
            <a
              href={content.ctas.footerPrimary.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-white text-forest-DEFAULT hover:bg-gray-100"
            >
              {content.ctas.footerPrimary.label}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <Link href={content.ctas.footerSecondary.url} className="btn-primary bg-white/10 text-white hover:bg-white/20">
              {content.ctas.footerSecondary.label}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
