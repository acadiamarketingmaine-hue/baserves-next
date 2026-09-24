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
  Hero,
  IconChipList,
  IntroFacts,
  LakesideShell,
  OfficialDisclosure,
  SectionActions,
  SectionHeader,
  SplitFeature,
  StickyBooking,
  bandTint,
  bandWhite,
  frame,
} from '@/components/property/lakeside'

const SLUG = 'hoosier-national-forest'

// Hoosier National Forest itself has no pin in src/components/PropertyMap.tsx
// (its three recreation areas do), so no coordinates are published for it —
// no "Get directions" button on this page. Never invent a pair.

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

const block = 'pb-14 md:pb-24 lg:pb-[120px]'

// Every word and photo below comes from
// src/content/defaults/hoosier-national-forest.ts. Layout is the Lakeside
// template. This page has no gallery of its own (content.gallery is empty —
// the recreation areas carry their own), so no Gallery section is rendered.
export default async function HoosierNationalForestPage() {
  const content = (await getPropertyContent(SLUG))!
  const settings = await getSiteSettings()
  const { sections, ctas } = content
  const phone = content.phone ?? settings.phone

  const recreationAreas = sections.recreationAreas.items ?? []
  const activities = sections.activities.items ?? []
  const scopeItems = sections.scopeOfServices.items ?? []
  const scopeBadge = scopeItems.find((i) => i.key === 'badge')
  const scopeOfWork = scopeItems.filter((c) => c.items)

  // Photo-audit.md's own recommendation for a Hoosier-level generic forest
  // shot: an unused, real Hoosier NF photo (from Indian-Celina, inside this
  // forest), not a stand-in for the Deam Wilderness itself.
  const forestPhoto = { src: '/images/indian-celina/fall-road.jpg', alt: 'Fall foliage along a road in Hoosier National Forest' }
  // Unused elsewhere on this page: a real Hardin Ridge view of Monroe Lake.
  const closingPhoto = { src: '/images/hardin-ridge/aerial.jpg', alt: 'Monroe Lake seen through the trees at Hardin Ridge, Hoosier National Forest' }

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

      <LakesideShell>
        <Hero
          photo={content.hero}
          eyebrow={content.locationLine}
          title={content.name}
          subline={content.tagline}
          booking={{
            title: sections.planYourVisit.heading ?? content.name,
            text: sections.planYourVisit.intro,
            cta: ctas.sidebar,
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
          <SectionActions className="mt-8 md:mt-10" primary={ctas.sidebar} />
        </IntroFacts>

        {/* Charles C. Deam Wilderness — Indiana's only designated wilderness,
            a real distinction, second and last ember rule on this page. */}
        <section className={`${block} ${bandTint} pt-14 md:pt-24 lg:pt-[120px]`}>
          <div className={frame}>
            <SplitFeature
              photo={forestPhoto}
              eyebrow="Wilderness Area"
              eyebrowRule
              heading={sections.deamWilderness.heading ?? 'Charles C. Deam Wilderness'}
              paragraphs={sections.deamWilderness.paragraphs}
            />
          </div>
        </section>

        {/* Recreation Areas: the three gateways into the forest. White band
            marks this "where to go" block. */}
        <section id="recreation-areas" className={`${block} ${bandWhite} pt-14 md:pt-24 lg:pt-[120px] scroll-mt-28`}>
          <div className={frame}>
            <SectionHeader heading={sections.recreationAreas.heading ?? 'Recreation Areas'} intro={sections.recreationAreas.intro} />
            <CardRow
              columns={3}
              items={recreationAreas.map((r) => ({ key: r.key, title: r.title, meta: r.badge, body: r.body, photo: r.photo, href: r.href }))}
            />
            <SectionActions
              className="mt-12"
              primary={ctas.footerHardinRidge}
              secondary={[{ ...ctas.footerIndianCelina }, { ...ctas.footerTipsaw }]}
            />
          </div>
        </section>

        {/* Activities */}
        <section className="py-14 md:py-24 lg:py-[120px]">
          <div className={frame}>
            <SectionHeader heading={sections.activities.heading ?? 'Activities'} intro={sections.activities.intro} />
            <CardRow columns={3} items={activities.map((a) => ({ key: a.key, title: a.title, body: a.body }))} />
          </div>
        </section>

        <ClosingCta
          photo={closingPhoto}
          heading={sections.closingCta.heading ?? content.name}
          text={sections.closingCta.intro}
          primary={ctas.footerHardinRidge}
          phone={phone}
          secondary={ctas.sidebar}
        />
        <OfficialDisclosure
          label={scopeBadge?.title ?? 'Statement of Work'}
          title={sections.scopeOfServices.heading ?? 'Scope of Services'}
          intro={sections.scopeOfServices.intro}
          groups={scopeOfWork.map((c) => ({ key: c.key, title: c.title ?? '', body: c.body, items: c.items ?? [] }))}
        />
        <StickyBooking name={content.name} cta={ctas.sidebar} phone={phone} />
      </LakesideShell>

      <Footer />
    </main>
  )
}
