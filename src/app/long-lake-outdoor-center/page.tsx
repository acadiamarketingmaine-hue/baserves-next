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
  IntroFacts,
  LakesideShell,
  Mosaic,
  RuledRows,
  SectionHeader,
  SplitFeature,
  body,
  eyebrow,
  externalProps,
  frame,
  h3,
  pillPrimary,
} from '@/components/property/lakeside'

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

/** Vertical rhythm for the paper sections that follow one another. */
const block = 'pb-14 md:pb-24 lg:pb-[120px]'

// Every word and photo below comes from src/content/defaults/long-lake-outdoor-center.ts
// (merged with any published edits). The layout is the Lakeside template.
export default async function LongLakePage() {
  const content = (await getPropertyContent(SLUG))!
  const settings = await getSiteSettings()
  const phone = content.phone ?? settings.phone
  const { sections, ctas } = content

  const established = content.stats.find((s) => s.key === 'established')
  const facts = content.stats.filter((s) => s.key !== 'established')
  const mosaicPhotos = (sections.mosaic?.items ?? []).flatMap((i) => (i.photo ? [i.photo] : []))
  const lodgingCabins = sections.lodging.items ?? []
  const bunkhouses = sections.bunkhouses.items ?? []
  const lodgePhoto = (sections.lodge.items ?? []).find((i) => i.key === 'photo')?.photo
  const lodgeTiles = (sections.lodge.items ?? []).filter((i) => i.key !== 'photo')
  const weddingPhoto = (sections.weddings.items ?? []).find((i) => i.key === 'photo')?.photo
  const weddingPackage = (sections.weddings.items ?? []).find((i) => i.key === 'package')
  const eventTypes = sections.eventTypes.items ?? []
  const heritagePhoto = (sections.cccCallout.items ?? []).find((i) => i.key === 'photo')?.photo
  const downloads = sections.downloads.items ?? []
  const scopeOfWork = (sections.scopeOfServices.items ?? []).filter((c) => c.items)
  const scopeBadge = (sections.scopeOfServices.items ?? []).find((c) => c.key === 'badge')
  const closingPhoto = (sections.closingCta.items ?? []).find((i) => i.key === 'photo')?.photo

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

      <LakesideShell>
        <Hero
          photo={content.hero}
          eyebrow={content.locationLine}
          title={content.name}
          subline={content.tagline}
          booking={{
            title: sections.planYourEvent.heading ?? content.name,
            text: sections.planYourEvent.intro,
            cta: ctas.hero,
            phone,
          }}
        />

        <IntroFacts
          eyebrow={established ? `${established.label} ${established.value}` : undefined}
          heading={sections.about.heading}
          lead={sections.about.intro ?? content.summary}
          paragraphs={content.paragraphs}
          facts={facts}
        />

        {mosaicPhotos.length > 0 && (
          <Mosaic photos={mosaicPhotos} caption={sections.mosaic?.intro} className={block} />
        )}

        {/* Lodging: the two cabin units, the bunkhouses and the amenities */}
        <section id="lodging" className={`${block} scroll-mt-28`}>
          <div className={frame}>
            <SectionHeader heading={sections.lodging.heading ?? 'Lodging'} intro={sections.lodging.intro} />
            <CardRow
              columns={2}
              shape="wide"
              items={lodgingCabins.map((c) => ({ key: c.key, title: c.title, body: c.body, photo: c.photo }))}
            />

            <h3 className={`${h3} mt-16 mb-6 text-lake-ink md:mt-20`}>{sections.bunkhouses.heading}</h3>
            <RuledRows
              as="h4"
              rows={bunkhouses.map((b) => ({
                key: b.key,
                title: b.title,
                meta: b.meta ? `Sleeps ${b.meta}` : undefined,
                body: b.body,
                badge: b.badge,
              }))}
            />

            <h3 className={`${h3} mt-16 mb-6 text-lake-ink md:mt-20`}>{sections.amenities.heading}</h3>
            <ul className="grid border-t border-lake-line sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3">
              {content.features.map((f) => (
                <li key={f} className="border-b border-lake-line py-4 text-[16px] text-lake-ink">
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <a href={ctas.sidebar.url} {...externalProps(ctas.sidebar.url)} className={pillPrimary}>
                {ctas.sidebar.label}
              </a>
              {content.season.label && (
                <p className="text-[15px] text-lake-mute">{content.season.label}</p>
              )}
            </div>
          </div>
        </section>

        {/* The Lodge */}
        <section id="lodge" className={`${block} scroll-mt-28`}>
          <div className={frame}>
            <SplitFeature photo={lodgePhoto} heading={sections.lodge.heading ?? 'The Lodge'} paragraphs={sections.lodge.paragraphs}>
              {lodgeTiles.length > 0 && (
                <dl className="mt-8 grid grid-cols-3 border-y border-lake-line py-5">
                  {lodgeTiles.map((tile) => (
                    <div key={tile.key} className="pr-3">
                      <dt className={`${eyebrow} text-[11px] text-lake-moss`}>{tile.body}</dt>
                      <dd className="mt-2 font-lake-serif text-[28px] leading-none text-lake-ink md:text-[32px]">{tile.title}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </SplitFeature>
          </div>
        </section>

        {/* Ways to use the camp */}
        <section className={block}>
          <div className={frame}>
            <SectionHeader heading={sections.eventTypes.heading ?? 'Events'} intro={sections.eventTypes.intro} />
            <CardRow
              columns={4}
              items={eventTypes.map((e) => ({ key: e.key, title: e.title, body: e.body, photo: e.photo, href: e.href }))}
            />
          </div>
        </section>

        {/* Weddings & Events */}
        <section id="weddings" className={`${block} scroll-mt-28`}>
          <div className={frame}>
            <SplitFeature
              reverse
              photo={weddingPhoto}
              heading={sections.weddings.heading ?? 'Weddings'}
              paragraphs={[sections.weddings.intro, ...(sections.weddings.paragraphs ?? [])].filter(
                (p): p is string => Boolean(p),
              )}
            >
              {weddingPackage && (
                <div className="mt-8 border-y border-lake-line py-5">
                  <h3 className="font-lake-serif text-[26px] leading-tight text-lake-ink">{weddingPackage.title}</h3>
                  <p className="mt-2 text-[15px] font-medium text-lake-moss">{weddingPackage.meta}</p>
                </div>
              )}
              <p className={`${body} mt-6`}>
                Download the{' '}
                <a
                  href={ctas.weddingPacket.url}
                  className="font-medium text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce"
                >
                  {ctas.weddingPacket.label}
                </a>{' '}
                for full details on ceremony locations, catering options, and rental inclusions.
              </p>
            </SplitFeature>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className={block}>
          <div className={frame}>
            <SectionHeader heading={sections.photoGallery.heading ?? 'Photos'} />
            <Gallery photos={content.gallery} />
          </div>
        </section>

        <HeritageBand
          photo={heritagePhoto}
          eyebrow={sections.cccCallout.intro}
          heading={sections.cccCallout.heading ?? ''}
          paragraphs={sections.cccCallout.paragraphs}
        />

        {/* Resources & Downloads */}
        <section className="py-14 md:py-24 lg:py-[120px]">
          <div className={frame}>
            <SectionHeader heading={sections.downloads.heading ?? 'Downloads'} intro={sections.downloads.intro} />
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

        {/* Scope of Services */}
        <section className={block}>
          <div className={frame}>
            <SectionHeader
              split={false}
              eyebrow={scopeBadge?.title}
              heading={sections.scopeOfServices.heading ?? 'Scope of Services'}
              intro={sections.scopeOfServices.intro}
            />
            <div className="grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {scopeOfWork.map((category) => (
                <div key={category.key}>
                  <h3 className="font-lake-serif text-[26px] leading-tight text-lake-ink">{category.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-lake-mute">{category.body}</p>
                  <ul className="mt-4 border-t border-lake-line">
                    {category.items!.map((item) => (
                      <li key={item} className="border-b border-lake-line py-3 text-[15px] leading-[1.5] text-lake-ink">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ClosingCta
          photo={closingPhoto}
          heading={sections.closingCta.heading ?? content.name}
          text={sections.closingCta.intro}
          primary={ctas.footerPrimary}
          phone={phone}
          secondary={ctas.footerSecondary}
        />
      </LakesideShell>

      <Footer />
    </main>
  )
}
