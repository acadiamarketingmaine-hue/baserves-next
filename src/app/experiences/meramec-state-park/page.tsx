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
  HeritageBand,
  IconChipList,
  IntroFacts,
  LakesideShell,
  OfficialDisclosure,
  RuledRows,
  SectionActions,
  SectionHeader,
  SplitFeature,
  StickyBooking,
  bandTint,
  bandWhite,
  frame,
  mapsUrl,
} from '@/components/property/lakeside'

const SLUG = 'meramec-state-park'

// Matches the Meramec State Park entry in src/components/PropertyMap.tsx —
// the only place this property's coordinates are published. Never invent a pair.
const COORDS = { lat: 38.22, lng: -91.08 }

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
// Meramec keeps meramecpark.com as its booking destination throughout — the
// vendor's own site — per docs/ux-pass/decisions.md D1.
export default async function MeramecStateParkPage() {
  const content = (await getPropertyContent(SLUG))!
  const cabinCategories = content.sections.cabinLodging.items ?? []
  const caveItems = content.sections.fisherCave.items ?? []
  const cavePhoto = caveItems.find((i) => i.key === 'photo')!.photo!
  const caveChipLabels = caveItems.filter((i) => i.key !== 'photo').map((i) => i.title!).filter(Boolean)
  const watercraftItems = content.sections.watercraft.items ?? []
  const watercraftPhoto = watercraftItems.find((i) => i.key === 'photo')!.photo!
  const watercraftColumns = watercraftItems.find((i) => i.key === 'columns')!.items!
  const watercraftPricing = watercraftItems.filter((i) => i.key === 'canoe' || i.key === 'kayak')
  const facilities = content.sections.facilities.items ?? []
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
        crumbs={[{ name: 'Experiences', url: '/experiences' }]}
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

        {/* Cabin Lodging: the "where to stay" block, white band per the kit. */}
        <section id="lodging" className={`py-14 md:py-24 lg:py-[120px] ${bandWhite} scroll-mt-28`}>
          <div className={frame}>
            <SectionHeader heading={content.sections.cabinLodging.heading ?? 'Cabin Lodging'} intro={content.sections.cabinLodging.intro} />
            <CardRow
              columns={3}
              items={cabinCategories.map((c) => ({ key: c.key, title: c.title, body: c.body, meta: c.meta ? `${c.meta}/night` : undefined, photo: c.photo }))}
            />
            <SectionActions className="mt-10" primary={content.ctas.cabins} />
          </div>
        </section>

        {/* Fisher Cave: the park's one real "story" moment — a spruce
            heritage band, the same accent Long Lake uses for its CCC story. */}
        <HeritageBand
          photo={cavePhoto}
          eyebrow={content.sections.fisherCave.intro}
          eyebrowRule
          heading={content.sections.fisherCave.heading ?? 'Fisher Cave'}
          paragraphs={content.sections.fisherCave.paragraphs}
        />
        {caveChipLabels.length > 0 && (
          <section className="py-10">
            <div className={frame}>
              <IconChipList items={caveChipLabels} />
            </div>
          </section>
        )}

        {/* Float the Meramec River */}
        <section className={`py-14 md:py-24 lg:py-[120px] ${bandTint}`}>
          <div className={frame}>
            <SplitFeature
              reverse
              photo={watercraftPhoto}
              heading={content.sections.watercraft.heading ?? 'Float the Meramec River'}
              paragraphs={[content.sections.watercraft.intro, ...(content.sections.watercraft.paragraphs ?? [])].filter(
                (p): p is string => Boolean(p),
              )}
            >
              <div className="mt-6 overflow-hidden rounded-md border border-lake-line">
                <table className="w-full text-left text-[14px]">
                  <thead>
                    <tr className="bg-white">
                      {watercraftColumns.map((col) => (
                        <th key={col} className="px-4 py-3 font-medium text-lake-ink">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {watercraftPricing.map((craft) => (
                      <tr key={craft.key} className="border-t border-lake-line">
                        <td className="px-4 py-3 font-medium text-lake-ink">{craft.title}</td>
                        <td className="px-4 py-3 text-lake-mute">{craft.items?.[0]}</td>
                        <td className="px-4 py-3 text-lake-mute">{craft.items?.[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <SectionActions className="mt-6" primary={content.ctas.resourceWatercraft} />
            </SplitFeature>
          </div>
        </section>

        {/* Park Facilities */}
        <section className="py-14 md:py-24 lg:py-[120px]">
          <div className={frame}>
            <SectionHeader heading={content.sections.facilities.heading ?? 'Park Facilities'} intro={content.sections.facilities.intro} />
            <CardRow
              columns={3}
              items={facilities.map((f) => ({ key: f.key, title: f.title, body: f.body, photo: f.photo }))}
            />
          </div>
        </section>

        {content.gallery.length > 0 && (
          <section className={`py-14 md:py-24 lg:py-[120px] ${bandWhite}`}>
            <div className={frame}>
              <SectionHeader heading={content.sections.photoGallery.heading ?? 'Photo Gallery'} />
              <Gallery photos={content.gallery} />
            </div>
          </section>
        )}

        {/* Resources & Booking */}
        <section className="py-14 md:py-24 lg:py-[120px]">
          <div className={frame}>
            <SectionHeader heading={content.sections.resources.heading ?? 'Resources & Booking'} />
            <RuledRows
              rows={[
                { key: resourceBookLodging.key, title: content.ctas.resourceBookLodging.label, body: resourceBookLodging.body, href: content.ctas.resourceBookLodging.url, linkLabel: 'Book now' },
                { key: resourceWatercraft.key, title: content.ctas.resourceWatercraft.label, body: resourceWatercraft.body, href: content.ctas.resourceWatercraft.url, linkLabel: 'Book now' },
                { key: resourceParkInfo.key, title: resourceParkInfo.title, body: resourceParkInfo.body },
              ]}
            />
          </div>
        </section>

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
