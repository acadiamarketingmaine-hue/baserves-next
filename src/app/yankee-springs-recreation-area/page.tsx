import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import { getPropertyContent, getSiteSettings } from '@/content'
import NoticeBanner from '@/content/NoticeBanner'
import {
  CardRow,
  ClosingCta,
  Gallery,
  Hero,
  IconChipList,
  IntroFacts,
  LakesideShell,
  RuledRows,
  SectionActions,
  SectionHeader,
  StickyBooking,
  bandTint,
  bandWhite,
  body,
  frame,
  h3,
  mapsUrl,
} from '@/components/property/lakeside'

const SLUG = 'yankee-springs-recreation-area'

// Matches the Yankee Springs Recreation Area entry in
// src/components/PropertyMap.tsx — the only place this property's
// coordinates are published. Never invent a pair.
const COORDS = { lat: 42.62, lng: -85.32 }

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPropertyContent(SLUG)
  return {
    title: content?.seo.title ? { absolute: content?.seo.title } : undefined,
    description: content?.seo.description,
    alternates: { canonical: '/yankee-springs-recreation-area' },
    openGraph: og('/yankee-springs-recreation-area'),
  }
}

const block = 'pb-14 md:pb-24 lg:pb-[120px]'

// Every word and photo below comes from
// src/content/defaults/yankee-springs-recreation-area.ts. Layout is the
// Lakeside template. This recreation area has two bookable outdoor centers
// (Chief Noonday and Long Lake), not one; both are carried through as real
// CTAs rather than picking a winner.
export default async function YankeeSpringsPage() {
  const content = (await getPropertyContent(SLUG))!
  const settings = await getSiteSettings()
  const { sections, ctas } = content
  const phone = content.phone ?? settings.phone

  const subProperties = sections.subProperties.items ?? []
  const lodging = sections.lodging.items ?? []
  const bunkhouses = sections.bunkhouses.items ?? []
  const activities = sections.activities.items ?? []

  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url="/yankee-springs-recreation-area"
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
            title: 'Plan Your Stay',
            text: 'Book a cabin at Chief Noonday or Long Lake, the two historic outdoor centers within the recreation area.',
            cta: ctas.heroChiefNoonday,
            phone,
          }}
        />

        <IntroFacts
          eyebrow={content.tagline}
          eyebrowRule
          heading={sections.about.heading}
          lead={content.summary}
          paragraphs={content.paragraphs}
          facts={content.stats}
        >
          <IconChipList items={content.features} className="mt-8" />
          <SectionActions
            className="mt-8 md:mt-10"
            primary={ctas.heroChiefNoonday}
            secondary={[
              { ...ctas.heroLongLake },
              { label: 'Get directions', url: mapsUrl(COORDS.lat, COORDS.lng), kind: 'external' },
            ]}
          />
        </IntroFacts>

        {/* Our Properties: the two historic outdoor centers within the
            recreation area. */}
        <section id="properties" className={`${block} pt-14 md:pt-24 lg:pt-[120px] scroll-mt-28`}>
          <div className={frame}>
            <SectionHeader heading={sections.subProperties.heading ?? 'Our Properties at Yankee Springs'} intro={sections.subProperties.intro} />
            <CardRow
              columns={2}
              shape="wide"
              items={subProperties.map((p) => ({ key: p.key, title: p.title, meta: p.badge, body: p.body, photo: p.photo, href: p.href }))}
            />
          </div>
        </section>

        {/* Historic Lodging: CCC-built cabins and bunkhouses. White band
            marks the "where to stay" block. */}
        <section id="lodging" className={`${block} ${bandWhite} scroll-mt-28`}>
          <div className={frame}>
            <SectionHeader heading={sections.lodging.heading ?? 'Historic Lodging'} intro={sections.lodging.intro} />
            <CardRow
              columns={2}
              shape="wide"
              items={lodging.map((c) => ({ key: c.key, title: c.title, body: c.body, photo: c.photo }))}
            />

            <h3 className={`${h3} mt-16 mb-6 text-lake-ink md:mt-20`}>{sections.bunkhouses.heading ?? 'Bunkhouses'}</h3>
            <RuledRows
              as="h4"
              rows={bunkhouses.map((b) => ({
                key: b.key,
                title: b.title,
                meta: b.meta ? `Sleeps ${b.meta}` : undefined,
                body: b.body,
                image: b.photo,
              }))}
            />

            <SectionActions
              className="mt-10"
              primary={ctas.sidebarLongLake}
              secondary={[{ ...ctas.sidebarChiefNoonday }]}
            />
          </div>
        </section>

        {/* Glacial Landscape: the geology behind the terrain, a genuine
            topic change worth its own tinted seam. */}
        <section className={`${block} ${bandTint} pt-14 md:pt-24 lg:pt-[120px]`}>
          <div className={frame}>
            <SectionHeader heading={sections.glacialCallout.heading ?? 'Glacial Landscape'} />
            <p className={`${body} max-w-3xl`}>{sections.glacialCallout.paragraphs?.[0]}</p>
          </div>
        </section>

        {/* Activities */}
        <section className="py-14 md:py-24 lg:py-[120px]">
          <div className={frame}>
            <SectionHeader heading={sections.activities.heading ?? 'Activities'} intro={sections.activities.intro} />
            <CardRow columns={3} items={activities.map((a) => ({ key: a.key, title: a.title, body: a.body }))} />
          </div>
        </section>

        {/* Photo Gallery */}
        <section className={`${bandWhite} py-14 md:py-24 lg:py-[120px]`}>
          <div className={frame}>
            <SectionHeader heading={sections.photoGallery.heading ?? 'Photo Gallery'} />
            <Gallery photos={content.gallery} />
          </div>
        </section>

        <ClosingCta
          photo={{ src: '/images/yankee-springs/mansion-house.jpg', alt: 'Mansion House bunkhouse at Yankee Springs' }}
          heading={sections.closingCta.heading ?? content.name}
          text={sections.closingCta.intro}
          primary={ctas.footerChiefNoonday}
          phone={phone}
          secondary={ctas.footerLongLake}
        />
        <StickyBooking name={content.name} cta={ctas.heroChiefNoonday} phone={phone} />
      </LakesideShell>

      <Footer />
    </main>
  )
}
