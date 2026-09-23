import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import { getPropertyContent } from '@/content'
import NoticeBanner from '@/content/NoticeBanner'

const SLUG = 'meramec-state-park'

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
    alternates: { canonical: '/experiences/meramec-state-park' },
    openGraph: og('/experiences/meramec-state-park'),
  }
}

// The words and photos live in src/content/defaults/meramec-state-park.ts.
// Only the icons stay here - they are JSX and cannot be serialised - and the
// four Fisher Cave chips are matched to their copy by key.
const caveIcons: Record<string, JSX.Element> = {
  calcite: (
                      <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
  ),
  columns: (
                      <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
  ),
  seasonal: (
                      <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
  ),
  'bear-claws': (
                      <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
  ),
}

export default async function MeramecStateParkPage() {
  const content = (await getPropertyContent(SLUG))!
  const cabinCategories = content.sections.cabinLodging.items ?? []
  const caveItems = content.sections.fisherCave.items ?? []
  const caveChips = caveItems.filter((i) => i.key !== 'photo')
  const cavePhoto = caveItems.find((i) => i.key === 'photo')!.photo!
  const watercraftItems = content.sections.watercraft.items ?? []
  const watercraftPhoto = watercraftItems.find((i) => i.key === 'photo')!.photo!
  const watercraftRatesHeading = watercraftItems.find((i) => i.key === 'rates-heading')!
  const watercraftColumns = watercraftItems.find((i) => i.key === 'columns')!.items!
  const watercraftPricing = watercraftItems.filter((i) => i.key === 'canoe' || i.key === 'kayak')
  const facilities = content.sections.facilities.items ?? []
  const galleryImages = content.gallery
  const resources = content.sections.resources.items ?? []
  const resourceBookLodging = resources.find((i) => i.key === 'book-lodging')!
  const resourceWatercraft = resources.find((i) => i.key === 'watercraft')!
  const resourceParkInfo = resources.find((i) => i.key === 'park-information')!
  const scopeItems = content.sections.scopeOfServices.items ?? []
  const scopeBadge = scopeItems.find((i) => i.key === 'badge')
  const scopeOfWork = scopeItems.filter((c) => c.items)

  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url="/experiences/meramec-state-park"
        name={content.seo.title}
        crumbName={content.name}
        description={content.seo.description}
        image={content.hero.src}
        crumbs={[{ name: "Experiences", url: "/experiences" }]}
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

              {/* CCC History */}
              <div className="mt-10 bg-green-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{content.sections.cccLegacy.heading}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {content.sections.cccLegacy.paragraphs?.[0]}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {content.sections.cccLegacy.paragraphs?.[1]}
                </p>
              </div>

              {/* Natural Area */}
              <div className="mt-8 bg-amber-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{content.sections.naturalArea.heading}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {content.sections.naturalArea.paragraphs?.[0]}
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
                <div className="mt-4 text-center text-white/70 text-sm">
                  {content.sections.readyToVisit.paragraphs?.[0]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lodging - Cabins */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{content.sections.cabinLodging.heading}</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            {content.sections.cabinLodging.intro}
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {cabinCategories.map((cabin) => (
              <div key={cabin.key} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-56">
                  <Image src={cabin.photo!.src} alt={cabin.photo!.alt} fill sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, 100vw" className="object-cover" />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 text-gray-900 font-bold rounded-full text-sm">
                    {cabin.meta}/night
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{cabin.title}</h3>
                  <p className="text-gray-600">{cabin.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href={content.ctas.cabins.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-forest-DEFAULT text-white font-semibold rounded-lg hover:bg-forest-dark transition-colors"
            >
              {content.ctas.cabins.label}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Fisher Cave */}
      <section className="py-16">
        <div className="container-custom px-6">
          <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-white">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 text-sm font-semibold rounded-full mb-4">
                  {content.sections.fisherCave.intro}
                </span>
                <h2 className="text-3xl font-bold mb-6">{content.sections.fisherCave.heading}</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  {content.sections.fisherCave.paragraphs?.[0]}
                </p>
                <p className="text-white/80 leading-relaxed mb-6">
                  {content.sections.fisherCave.paragraphs?.[1]}
                </p>
                <div className="flex flex-wrap gap-4">
                  {caveChips.map((chip) => (
                    <div key={chip.key} className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
                        {caveIcons[chip.key]}
                      </div>
                      <span className="text-white/70 text-sm">{chip.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <Image
                  src={cavePhoto.src}
                  alt={cavePhoto.alt}
                  fill
                  sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Watercraft Rentals */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image
                src={watercraftPhoto.src}
                alt={watercraftPhoto.alt}
                fill
                sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{content.sections.watercraft.heading}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {content.sections.watercraft.intro}
              </p>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{watercraftRatesHeading.title}</h3>
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{watercraftColumns[0]}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{watercraftColumns[1]}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{watercraftColumns[2]}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {watercraftPricing.map((craft) => (
                        <tr key={craft.key} className="border-t border-gray-200">
                          <td className="py-3 px-4 text-gray-900 font-medium">{craft.title}</td>
                          <td className="py-3 px-4 text-gray-600">{craft.items![0]}</td>
                          <td className="py-3 px-4 text-gray-600">{craft.items![1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  {content.sections.watercraft.paragraphs?.[0]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{content.sections.facilities.heading}</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            {content.sections.facilities.intro}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility) => (
              <div key={facility.key} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="relative h-48">
                  <Image src={facility.photo!.src} alt={facility.photo!.alt} fill sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{facility.title}</h3>
                  <p className="text-gray-600 text-sm">{facility.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{content.sections.photoGallery.heading}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((photo, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" className="object-cover hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources & Downloads */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{content.sections.resources.heading}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a
              href={content.ctas.resourceBookLodging.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-6 hover:border-green-300 transition-colors group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors">{content.ctas.resourceBookLodging.label}</h3>
                <p className="text-gray-500 text-sm">{resourceBookLodging.body}</p>
              </div>
            </a>
            <a
              href={content.ctas.resourceWatercraft.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-6 hover:border-green-300 transition-colors group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{content.ctas.resourceWatercraft.label}</h3>
                <p className="text-gray-500 text-sm">{resourceWatercraft.body}</p>
              </div>
            </a>
            <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-6">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{resourceParkInfo.title}</h3>
                <p className="text-gray-500 text-sm">{resourceParkInfo.body}</p>
              </div>
            </div>
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
