import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import { getPropertyContent, getSiteSettings, SLUG_TEMPLATE_SLUGS } from '@/content'
import NoticeBanner from '@/content/NoticeBanner'
import {
  ClosingCta,
  Gallery,
  Hero,
  IconChipList,
  IntroFacts,
  LakesideShell,
  SectionActions,
  SectionHeader,
  StickyBooking,
  bandWhite,
  frame,
} from '@/components/property/lakeside'

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

// This template currently only ever renders Chief Noonday Outdoor Center
// (see templateContent above). Its content has no `sections` (the camp
// hasn't been given the richer editor blocks the other properties have), so
// the page composes from the shared hero/about/gallery skeleton only — no
// Lodging/Lodge/Weddings blocks to build, per docs/ux-pass/kit-v2.md ("use
// ONLY existing content"). Chief Noonday also has no entry in
// src/components/PropertyMap.tsx, so there is no "Get directions" button —
// the kit says skip it rather than guess coordinates.
export default async function LocationPage({ params }: { params: { slug: string } }) {
  const content = await templateContent(params.slug)

  if (!content) notFound()

  const settings = await getSiteSettings()
  const phone = content.phone ?? settings.phone
  const built = content.stats.find((s) => s.key === 'built')
  const facts = content.stats.filter((s) => s.key !== 'built')

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

      <LakesideShell>
        <Hero
          photo={content.hero}
          eyebrow={content.locationLine}
          title={content.name}
          subline={content.tagline}
          booking={{
            title: content.name,
            text: content.summary,
            cta: content.ctas.hero,
            phone,
          }}
        />

        <IntroFacts
          eyebrow={built ? `${built.label} ${built.value}` : undefined}
          eyebrowRule
          heading="About Chief Noonday Outdoor Center"
          lead={content.summary}
          paragraphs={content.paragraphs}
          facts={facts}
        >
          <SectionActions className="mt-8 md:mt-10" primary={content.ctas.hero} />
        </IntroFacts>

        {/* Amenities: the plain checklist becomes chips, and a white band
            marks the shift from the intro story to "what's here". */}
        <section className={`py-14 md:py-24 lg:py-[120px] ${bandWhite}`}>
          <div className={frame}>
            <SectionHeader heading="Amenities" />
            <IconChipList items={content.features} />
            <SectionActions className="mt-10" primary={content.ctas.sidebar} />
          </div>
        </section>

        {content.gallery.length > 0 && (
          <section className="py-14 md:py-24 lg:py-[120px]">
            <div className={frame}>
              <SectionHeader heading="Photo Gallery" />
              <Gallery photos={content.gallery} />
            </div>
          </section>
        )}

        <ClosingCta
          heading={content.name}
          text={content.summary}
          primary={content.ctas.sidebar}
          phone={phone}
        />
        <StickyBooking name={content.name} cta={content.ctas.hero} phone={phone} />
      </LakesideShell>

      <Footer />
    </main>
  )
}
