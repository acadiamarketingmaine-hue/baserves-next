import Image from 'next/image'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { og } from '@/lib/seo'
import { PageSchema } from '@/components/SchemaMarkup'
import { siteSettings } from '@/content/defaults/site'
import type { Blurb, PropertyContent, Section } from '@/content/types'
import { newForestRobots } from '@/data/new-forests'
import {
  CardRow,
  ClosingCta,
  Hero,
  IconChipList,
  IntroFacts,
  LakesideShell,
  RuledRows,
  SectionActions,
  SectionHeader,
  body,
  bandTint,
  bandWhite,
  frame,
  h3,
} from '@/components/property/lakeside'

/** Metadata for a gated page: noindex,nofollow until NEW_FORESTS_PUBLIC. */
export function newForestMetadata(content: PropertyContent, path: string): Metadata {
  const robots = newForestRobots(path)
  return {
    title: { absolute: content.seo.title },
    description: content.seo.description,
    alternates: { canonical: path },
    openGraph: og(path),
    // Only set when closed: an explicit `undefined` would wipe the site default.
    ...(robots ? { robots } : {}),
  }
}

/** One block of a page, laid out by the shape of what is in it. */
function Block({ id, section, items }: { id: string; section: Section; items: Blurb[] }) {
  const lists = items.filter((i) => i.items)
  const cards = items.filter((i) => i.title && i.photo)
  const rows = items.filter((i) => i.title && !i.photo && !i.items)
  const sidePhoto = items.find((i) => i.photo && !i.title)?.photo
  const prose = section.paragraphs ?? []
  return (
    <>
      {section.heading && <SectionHeader heading={section.heading} intro={section.intro} />}
      {prose.length > 0 && (
        <div className={sidePhoto ? 'grid gap-8 lg:grid-cols-2 lg:gap-12' : 'max-w-[760px]'}>
          <div className="space-y-5">
            {prose.map((p) => (
              <p key={p} className={body}>
                {p}
              </p>
            ))}
          </div>
          {sidePhoto && (
            <div data-reveal="wipe" className="lk-zoom relative aspect-[3/2] overflow-hidden rounded-md">
              <Image src={sidePhoto.src} alt={sidePhoto.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
          )}
        </div>
      )}
      {cards.length > 0 && (
        <CardRow
          columns={cards.length === 2 || cards.length === 4 || cards.length === 8 ? 2 : 3}
          shape="wide"
          items={cards.map((c) => ({
            ...c,
            linkLabel: c.href?.includes('recreation.gov') ? 'Reserve on Recreation.gov' : undefined,
          }))}
        />
      )}
      {rows.length > 0 && (
        <RuledRows
          rows={rows.map((r) => ({
            ...r,
            linkLabel: r.href?.includes('recreation.gov') ? 'Reserve on Recreation.gov' : undefined,
          }))}
        />
      )}
      {lists.length > 0 && (
        <div data-block={id} className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {lists.map((group) => (
            <div key={group.key} className="border-t border-lake-line pt-6">
              <h3 className={`${h3} text-lake-ink`}>{group.title}</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-lake-moss">
                {group.items!.map((line) => (
                  <li key={line} className="text-[15px] leading-[1.6] text-lake-mute md:text-base">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

/**
 * The page for a new National Forest contract (and White Rock Mountain). Every
 * word and photo comes from its file in src/content/defaults. These pages are
 * not in the website editor yet, so they read the defaults directly.
 */
export default function NewForestPage({ content, path }: { content: PropertyContent; path: string }) {
  const { sections, ctas } = content
  const phone = content.phone ?? siteSettings.phone
  const heroCta = ctas.hero
  const closing = ctas.book ?? ctas.reserve ?? ctas.recreationGov ?? ctas.hero
  const back = ctas.footerBack ?? ctas.footerExperiences
  // Sections with a place of their own: the intro, the feature chips and the closing band.
  const CHIPS = ['activities', 'forestFacts']
  const blocks = Object.entries(sections).filter(([key]) => !['about', 'closingCta', ...CHIPS].includes(key))
  const chips = CHIPS.map((key) => sections[key]).find(Boolean)

  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url={path}
        name={content.seo.title}
        crumbName={content.name}
        description={content.seo.description}
        image={content.hero.src}
      />

      <LakesideShell>
        <Hero
          photo={content.hero}
          eyebrow={content.locationLine}
          title={content.name}
          subline={content.summary}
          booking={{ title: content.name, text: sections.closingCta?.intro, cta: heroCta, phone }}
        />

        <IntroFacts
          eyebrow={content.tagline}
          eyebrowRule
          heading={sections.about.heading}
          lead={content.summary}
          paragraphs={content.paragraphs}
          facts={content.stats}
        >
          {ctas.parentForest && <SectionActions className="mt-8 md:mt-10" primary={ctas.parentForest} />}
        </IntroFacts>

        <section className={`py-14 md:py-24 ${bandWhite}`}>
          <div className={frame}>
            <SectionHeader heading={chips?.heading ?? 'Things to do'} />
            <IconChipList items={content.features} />
          </div>
        </section>

        {blocks.map(([key, section], i) => (
          <section
            key={key}
            // "#campgrounds" is where the hero button lands.
            id={key === 'areas' ? 'campgrounds' : key}
            className={`scroll-mt-24 py-14 md:py-24 ${i % 2 === 1 ? bandTint : ''}`}
          >
            <div className={frame}>
              <Block id={key} section={section} items={section.items ?? []} />
              {key === 'ourSite' && <SectionActions className="mt-8 md:mt-10" primary={heroCta} />}
              {(key === 'goodToKnow' || key === 'offices') && ctas.forestService && (
                <SectionActions className="mt-8 md:mt-10" primary={ctas.forestService} />
              )}
            </div>
          </section>
        ))}

        <ClosingCta
          photo={content.hero}
          heading={sections.closingCta?.heading ?? 'Plan your trip'}
          text={sections.closingCta?.intro}
          primary={closing}
          phone={phone}
          secondary={back}
        />
      </LakesideShell>

      <Footer />
    </main>
  )
}
