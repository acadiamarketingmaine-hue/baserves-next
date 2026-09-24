import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import { getPropertyContent } from '@/content'
import NoticeBanner from '@/content/NoticeBanner'
import {
  CardRow,
  ClosingCta,
  Gallery,
  Hero,
  IconChipList,
  IntroFacts,
  LakesideShell,
  OfficialDisclosure,
  RuledRows,
  SectionActions,
  SectionHeader,
  StickyBooking,
  bandTint,
  bandWhite,
  frame,
  mapsUrl,
} from '@/components/property/lakeside'

const SLUG = 'washington-state-park'

// Matches the Washington State Park entry in src/components/PropertyMap.tsx —
// the only place this property's coordinates are published. Never invent a pair.
const COORDS = { lat: 38.09, lng: -90.68 }

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
// The layout is the Lakeside template (docs/ux-pass/kit-v2.md). Washington
// has no `phone` in its content and none was ever shown on this page before,
// so no call buttons are added here — the kit only wires a phone button off
// a real value already on the page.
export default async function WashingtonStateParkPage() {
  const content = (await getPropertyContent(SLUG))!
  const lodgingItems = content.sections.lodging.items ?? []
  const cabinExterior = lodgingItems.find((i) => i.key === 'photo-exterior')!.photo!
  const cabinInterior = lodgingItems.find((i) => i.key === 'photo-interior')!.photo!
  const fishPDFs = content.sections.fishOfTheBigRiver.items ?? []
  const recreation = content.sections.recreation.items ?? []
  const pool = recreation.find((i) => i.key === 'pool')!
  const trails = recreation.find((i) => i.key === 'trails')!
  const birding = recreation.find((i) => i.key === 'birding')!
  const campStore = recreation.find((i) => i.key === 'camp-store')!
  const downloads = content.sections.downloads.items ?? []
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

      <LakesideShell>
        <Hero
          photo={content.hero}
          eyebrow={content.locationLine}
          title={content.name}
          subline={content.tagline}
          booking={{
            title: content.sections.readyToVisit.heading ?? content.name,
            text: content.sections.readyToVisit.intro,
            cta: content.ctas.hero,
          }}
        />

        <IntroFacts
          eyebrowRule
          heading={content.sections.about.heading}
          lead={content.summary}
          paragraphs={content.paragraphs}
          facts={content.stats}
        >
          <SectionActions
            className="mt-8 md:mt-10"
            primary={content.ctas.hero}
            secondary={[{ label: 'Get directions', url: mapsUrl(COORDS.lat, COORDS.lng), kind: 'external' }]}
          />
        </IntroFacts>

        {/* Ancient Petroglyphs: the park's one real "story" moment, so it
            gets its own accent band and eyebrow rule — a second, quieter
            fresh-start cue alongside the intro's. */}
        <section className={`py-14 md:py-24 lg:py-[120px] ${bandTint}`}>
          <div className={frame}>
            <SectionHeader
              eyebrow={content.sections.petroglyphs.heading}
              eyebrowRule
              heading="More Than 350 Ancient Carvings"
              intro={content.sections.petroglyphs.paragraphs?.[0]}
              split={false}
            />
          </div>
        </section>

        {/* Lodging: the "where to stay" block gets a white band, per the kit. */}
        <section id="lodging" className={`py-14 md:py-24 lg:py-[120px] ${bandWhite} scroll-mt-28`}>
          <div className={frame}>
            <SectionHeader heading={content.sections.lodging.heading ?? 'Cabins & Lodging'} intro={content.sections.lodging.paragraphs?.[0]} />
            <CardRow
              columns={2}
              shape="wide"
              items={[
                { key: 'exterior', title: 'Cabin Exterior', photo: cabinExterior },
                { key: 'interior', title: 'Cabin Interior', photo: cabinInterior },
              ]}
            />
            <SectionActions className="mt-10" primary={content.ctas.sidebar} />
          </div>
        </section>

        {/* Recreation */}
        <section className="py-14 md:py-24 lg:py-[120px]">
          <div className={frame}>
            <SectionHeader heading={content.sections.recreation.heading ?? 'Recreation'} intro={content.sections.recreation.intro} />
            <CardRow
              columns={4}
              items={[
                { key: pool.key, title: pool.title, body: pool.body, photo: pool.photo },
                { key: trails.key, title: trails.title, body: trails.body, meta: trails.badge },
                { key: birding.key, title: birding.title, body: birding.body, meta: birding.badge },
                { key: campStore.key, title: campStore.title, body: campStore.body, photo: campStore.photo },
              ]}
            />
          </div>
        </section>

        {/* Fish of the Big River: a 12-part download series. */}
        <section className={`py-14 md:py-24 lg:py-[120px] ${bandWhite}`}>
          <div className={frame}>
            <SectionHeader heading={content.sections.fishOfTheBigRiver.heading ?? 'Fish of the Big River'} intro={content.sections.fishOfTheBigRiver.intro} />
            <RuledRows
              rows={fishPDFs.map((pdf) => ({
                key: pdf.key,
                title: pdf.title,
                href: pdf.href,
                linkLabel: 'Download PDF',
              }))}
            />
          </div>
        </section>

        {/* Resources & Downloads */}
        <section className="py-14 md:py-24 lg:py-[120px]">
          <div className={frame}>
            <SectionHeader heading={content.sections.downloads.heading ?? 'Resources & Downloads'} intro={content.sections.downloads.intro} />
            <RuledRows
              rows={downloads.map((d) => ({
                key: d.key,
                title: d.title,
                body: d.body,
                href: d.href,
                linkLabel: 'Download PDF',
              }))}
            />
          </div>
        </section>

        {content.gallery.length > 0 && (
          <section className="py-14 md:py-24 lg:py-[120px]">
            <div className={frame}>
              <SectionHeader heading={content.sections.photoGallery.heading ?? 'Photo Gallery'} />
              <Gallery photos={content.gallery} />
            </div>
          </section>
        )}

        <ClosingCta
          heading={content.sections.closingCta.heading ?? content.name}
          text={content.sections.closingCta.intro}
          primary={content.ctas.footer}
          secondary={content.ctas.footerExperiences}
        />
        <OfficialDisclosure
          label={scopeBadge?.title ?? 'Statement of Work'}
          title={content.sections.scopeOfServices.heading ?? 'Scope of Services'}
          intro={content.sections.scopeOfServices.intro}
          groups={scopeOfWork.map((c) => ({ key: c.key, title: c.title ?? '', body: c.body, items: c.items ?? [] }))}
        />
        <StickyBooking name={content.name} cta={content.ctas.hero} />
      </LakesideShell>

      <Footer />
    </main>
  )
}
