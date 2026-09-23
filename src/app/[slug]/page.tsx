import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import { getPropertyContent, getSiteSettings, SLUG_TEMPLATE_SLUGS } from '@/content'
import NoticeBanner from '@/content/NoticeBanner'

// Content comes from src/content. Of the slugs it knows about, only
// chief-noonday-outdoor-center reaches this template: every other one has a
// bespoke page that wins the route, or lives at a URL that is not /<slug> at
// all. SLUG_TEMPLATE_SLUGS is the list this template answers for, and
// everything else 404s here exactly as it does today - see the comment on the
// constant for why this route cannot simply serve whatever has defaults.

/** The content this template renders, or undefined if the slug is not its to serve. */
async function templateContent(slug: string) {
  if (!SLUG_TEMPLATE_SLUGS.includes(slug)) return undefined
  return getPropertyContent(slug)
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const content = await templateContent(params.slug)
  if (!content) {
    return {
      title: { absolute: 'Location Not Found | BA Services' },
      alternates: { canonical: `/${params.slug}` },
      openGraph: og(`/${params.slug}`),
    }
  }
  return {
    title: content.seo.title ? { absolute: content.seo.title } : undefined,
    description: content.seo.description,
    alternates: { canonical: `/${params.slug}` },
    openGraph: og(`/${params.slug}`),
  }
}

export default async function LocationPage({ params }: { params: { slug: string } }) {
  const content = await templateContent(params.slug)

  if (!content) notFound()

  const site = await getSiteSettings()

  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url={`/${params.slug}`}
        routeKey="/[slug]"
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
                <div className="text-white/70 text-sm capitalize">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Description */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Location</h2>
              <div className="prose prose-lg max-w-none">
                {content.paragraphs.map((paragraph: string, index: number) => (
                  <p key={index} className="text-gray-600 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Gallery */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Photo Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {content.gallery.map((photo, index: number) => (
                    <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, 50vw"
                        className="object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Features */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Activities & Amenities</h3>
                <ul className="space-y-3">
                  {content.features.map((feature: string) => (
                    <li key={feature} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Booking Card */}
              <div className="bg-forest-DEFAULT rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Ready to Visit?</h3>
                <p className="text-white/80 mb-6">
                  Book your stay and experience everything {content.name} has to offer.
                </p>
                <a
                  href={content.ctas.sidebar.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-4 bg-white text-forest-DEFAULT font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  {content.ctas.sidebar.label}
                </a>
                <a href={`tel:${(content.phone || site.phone).replace(/[^+\d]/g, '')}`} className="flex items-center justify-center gap-2 mt-4 text-white/80 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call {content.phone ? content.phone : site.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
