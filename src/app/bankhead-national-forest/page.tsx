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
  HeritageBand,
  Hero,
  IconChipList,
  IntroFacts,
  LakesideShell,
  RuledRows,
  OfficialDisclosure,
  SectionActions,
  SectionHeader,
  SplitFeature,
  StickyBooking,
  body,
  bandTint,
  bandWhite,
  eyebrow,
  frame,
  mapsUrl,
} from '@/components/property/lakeside'

const SLUG = 'bankhead-national-forest'

// Matches the Bankhead National Forest entry in src/components/PropertyMap.tsx
// — the only place this property's coordinates are published. Never invent a pair.
const COORDS = { lat: 34.2, lng: -87.35 }

// Resources & Downloads row photos: only rows that have a real, unused
// Bankhead photo get one (photo-audit.md: no stock, never repeat a photo
// already used prominently elsewhere on this page). The other five rows
// render as plain text rows, exactly as before.
const DOWNLOAD_IMAGES: Record<string, { src: string; alt: string }> = {
  'clear-creek-map': { src: '/images/clear-creek-acorn-camp.jpg', alt: 'Picnic tables at Acorn Camp, Clear Creek' },
  'forest-visitor-rules': { src: '/images/clear-creek-fox-entrance.jpg', alt: 'Clear Creek campground entrance' },
}

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

const block = 'pb-14 md:pb-24 lg:pb-[120px]'

// Every word and photo below comes from
// src/content/defaults/bankhead-national-forest.ts. Layout is the Lakeside
// template; the paragraphs that carry an inline <strong> keep that markup
// here and read their three text runs from the content layer by key.
export default async function BankheadNationalForestPage() {
  const content = (await getPropertyContent(SLUG))!
  const settings = await getSiteSettings()
  const { sections, ctas } = content
  const rangerPhone = ctas.rangerPhone?.label ?? settings.phone

  const campgrounds = sections.campgrounds.items ?? []
  const recreationAreas = sections.otherRecreationAreas.items ?? []

  const birdingItems = sections.birding.items ?? []
  const birdingCerulean = birdingItems.find((i) => i.key === 'cerulean')!
  const birdingTrail = birdingItems.find((i) => i.key === 'birding-trail')!
  const birdingTrailSites = sections.birdingTrailSites.items ?? []

  const sipseyItems = sections.sipseyWilderness.items ?? []
  const sipseyPhoto = sipseyItems.find((i) => i.key === 'photo')!.photo!
  const sipseyWildAndScenic = sipseyItems.find((i) => i.key === 'wild-and-scenic')!

  const rangeItems = sections.shootingRange.items ?? []
  const rangePhoto = rangeItems.find((i) => i.key === 'photo')!.photo!
  const rangeFacts = rangeItems.filter((i) => i.key !== 'photo')

  const quailItems = sections.quailHabitat.items ?? []
  const quailPhoto = quailItems.find((i) => i.key === 'photo')!.photo!
  const quailEmphasis = quailItems.find((i) => i.key === 'emphasis-areas')!
  const quailPines = quailItems.find((i) => i.key === 'pine-restoration')!

  const downloads = sections.downloads.items ?? []
  const scopeItems = sections.scopeOfServices.items ?? []
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

      <LakesideShell>
        <Hero
          photo={content.hero}
          eyebrow={content.locationLine}
          title={content.name}
          subline={content.tagline}
          booking={{
            title: content.name,
            text: content.summary,
            cta: ctas.reserveClearCreek,
            phone: rangerPhone,
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
            primary={ctas.reserveClearCreek}
            secondary={[{ label: 'Get directions', url: mapsUrl(COORDS.lat, COORDS.lng), kind: 'external' }]}
          />
        </IntroFacts>

        {/* Campgrounds: the two BA Services-run sites. White band marks the
            "where to stay" block, as on Long Lake. */}
        <section id="campgrounds" className={`${block} ${bandWhite} scroll-mt-28`}>
          <div className={frame}>
            <SectionHeader heading={sections.campgrounds.heading ?? 'Campgrounds'} intro={sections.campgrounds.intro} />
            <CardRow
              columns={2}
              shape="wide"
              items={campgrounds.map((c) => ({ key: c.key, title: c.title, meta: c.meta, body: c.body, photo: c.photo, href: c.href }))}
            />
            <SectionActions
              className="mt-10"
              primary={ctas.reserveClearCreek}
              secondary={[{ ...ctas.reserveCorinth }]}
            />
          </div>
        </section>

        {/* Other Recreation Areas: day-use sites, not separately bookable. */}
        <section className={`${block} pt-14 md:pt-24 lg:pt-[120px]`}>
          <div className={frame}>
            <SectionHeader heading={sections.otherRecreationAreas.heading ?? 'Other Recreation Areas'} />
            <CardRow columns={3} items={recreationAreas.map((r) => ({ key: r.key, title: r.title, body: r.body }))} />
          </div>
        </section>

        {/* Natural Features */}
        <section className="pb-14 md:pb-24 lg:pb-[120px]">
          <div className={frame}>
            <SplitFeature
              photo={{ src: '/images/DSC_0103-2048x1365.jpg', alt: 'Raven Trail sign and wooden steps into the forest' }}
              heading={sections.naturalFeatures.heading ?? 'Natural Features'}
              paragraphs={sections.naturalFeatures.paragraphs}
            />
          </div>
        </section>

        {/* Birding: an Important Bird Area, a real distinction worth its own
            seam and a second ember rule. */}
        <section id="birding" className={`${block} ${bandTint} pt-14 md:pt-24 lg:pt-[120px] scroll-mt-28`}>
          <div className={frame}>
            <SectionHeader eyebrow={sections.birding.intro} eyebrowRule heading={sections.birding.heading ?? 'Birding in the Bankhead'} />
            <div className="grid gap-5 md:grid-cols-2 md:gap-x-12">
              <p className={body}>{sections.birding.paragraphs?.[0]}</p>
              <div className="grid gap-5">
                <p className={body}>
                  {birdingCerulean.items![0]}
                  <strong className="text-lake-ink">{birdingCerulean.items![1]}</strong>
                  {birdingCerulean.items![2]}
                </p>
                <p className={body}>
                  {birdingTrail.items![0]}
                  <strong className="text-lake-ink">{birdingTrail.items![1]}</strong>
                  {birdingTrail.items![2]}
                </p>
              </div>
            </div>
            <h3 className="mt-16 mb-6 font-lake-serif text-[26px] leading-[1.15] text-lake-ink md:mt-20 md:text-[32px]">
              {sections.birdingTrailSites.heading}
            </h3>
            <CardRow columns={4} items={birdingTrailSites.map((s) => ({ key: s.key, title: s.title, body: s.body }))} />
          </div>
        </section>

        {/* Sipsey Wilderness: the flagship feature — spruce heritage band,
            third and last ember rule. */}
        <HeritageBand
          id="sipsey-wilderness"
          photo={sipseyPhoto}
          eyebrow={sections.sipseyWilderness.intro}
          eyebrowRule
          heading={sections.sipseyWilderness.heading ?? 'Sipsey Wilderness'}
          paragraphs={sections.sipseyWilderness.paragraphs}
        />
        <section className="pt-10 pb-14 md:pb-24 lg:pb-[120px]">
          <div className={frame}>
            <p className={`${body} max-w-3xl`}>
              {sipseyWildAndScenic.items![0]}
              <strong className="text-lake-ink">{sipseyWildAndScenic.items![1]}</strong>
              {sipseyWildAndScenic.items![2]}
            </p>
          </div>
        </section>

        {/* Hurricane Creek Shooting Range */}
        <section className="pb-14 md:pb-24 lg:pb-[120px]">
          <div className={frame}>
            <SplitFeature photo={rangePhoto} heading={sections.shootingRange.heading ?? 'Hurricane Creek Shooting Range'} paragraphs={sections.shootingRange.paragraphs}>
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-lake-line py-5 md:grid-cols-4">
                {rangeFacts.map((f) => (
                  <div key={f.key}>
                    <dt className={`${eyebrow} text-[11px] text-lake-moss`}>{f.title}</dt>
                    <dd className="mt-2 font-lake-serif text-[19px] leading-tight text-lake-ink">{f.body}</dd>
                  </div>
                ))}
              </dl>
            </SplitFeature>
          </div>
        </section>

        {/* Quail Habitat & Conservation */}
        <section className="pb-14 md:pb-24 lg:pb-[120px]">
          <div className={frame}>
            <SplitFeature reverse photo={quailPhoto} heading={sections.quailHabitat.heading ?? 'Quail Habitat & Conservation'} paragraphs={sections.quailHabitat.paragraphs}>
              <p className={`${body} mt-5`}>
                {quailEmphasis.items![0]}
                <strong className="text-lake-ink">{quailEmphasis.items![1]}</strong>
                {quailEmphasis.items![2]}
              </p>
              <p className={`${body} mt-5`}>
                {quailPines.items![0]}
                <strong className="text-lake-ink">{quailPines.items![1]}</strong>
                {quailPines.items![2]}
              </p>
            </SplitFeature>
          </div>
        </section>

        {/* Resources & Downloads. Two of seven rows get a real, unused
            Bankhead photo (see DOWNLOAD_IMAGES); the rest render as plain
            rows, exactly as before. */}
        <section className="pb-14 md:pb-24 lg:pb-[120px]">
          <div className={frame}>
            <SectionHeader heading={sections.downloads.heading ?? 'Resources & Downloads'} intro={sections.downloads.intro} />
            <RuledRows
              rows={downloads.map((d) => ({
                key: d.key,
                title: d.title,
                body: d.body,
                href: d.href,
                linkLabel: 'Download PDF',
                image: DOWNLOAD_IMAGES[d.key],
              }))}
            />
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
          photo={sipseyPhoto}
          heading={sections.closingCta.heading ?? content.name}
          text={`${sections.closingCta.intro} ${sections.closingCta.paragraphs?.[0] ?? ''}`.trim()}
          primary={ctas.reserveClearCreek}
          phone={rangerPhone}
          secondary={ctas.footerExperiences}
        />
        <OfficialDisclosure
          label={scopeBadge?.title ?? 'Statement of Work'}
          title={sections.scopeOfServices.heading ?? 'Scope of Services'}
          intro={sections.scopeOfServices.intro}
          groups={scopeOfWork.map((c) => ({ key: c.key, title: c.title ?? '', body: c.body, items: c.items ?? [] }))}
        />
        <StickyBooking name={content.name} cta={ctas.reserveClearCreek} phone={rangerPhone} />
      </LakesideShell>

      <Footer />
    </main>
  )
}
