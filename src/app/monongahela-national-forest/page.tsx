import type { Metadata } from 'next'
import Link from 'next/link'
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
  RuledRows,
  SectionActions,
  SectionHeader,
  SplitFeature,
  StickyBooking,
  body,
  bandTint,
  bandWhite,
  frame,
  h3,
  mapsUrl,
  telHref,
} from '@/components/property/lakeside'

const SLUG = 'monongahela-national-forest'

// Coordinates from src/components/PropertyMap.tsx (the only place this
// property's coordinates are published). Never invent a pair; none of the
// six campground sub-pages has its own entry there, so they get no
// directions button — see CampgroundTemplate.tsx.
const COORDS = { lat: 38.7, lng: -79.8 }

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
    alternates: { canonical: '/monongahela-national-forest' },
    openGraph: og('/monongahela-national-forest'),
  }
}

/** Vertical rhythm for the paper sections that follow one another (matches
 * long-lake-outdoor-center/page.tsx's local `block` constant). */
const block = 'pb-14 md:pb-24 lg:pb-[120px]'

// Every word and photo below comes from
// src/content/defaults/monongahela-national-forest.ts. Layout is the
// Lakeside template (kit-v2 rollout).
export default async function MonongahelaNationalForestPage() {
  const content = (await getPropertyContent(SLUG))!
  const settings = await getSiteSettings()
  const phone = content.phone ?? settings.phone
  const { sections, ctas } = content

  const aboutLinks = sections.about.items ?? []
  const ecologyHighlights = (sections.ecologicalDiversity.items ?? []).find((i) => i.key === 'highlights')?.items ?? []
  const campgroundLinks = sections.readyToExplore.items ?? []
  const wildernessAreas = sections.wildernessAreas.items ?? []
  const notableDestinations = sections.notableDestinations.items ?? []
  const bloomingSchedule = sections.bloomingSchedule.items ?? []
  const birdingPhoto = (sections.birding.items ?? []).find((i) => i.key === 'photo')?.photo
  const campgroundMaps = sections.campgroundMaps.items ?? []
  const wildernessMaps = sections.wildernessMaps.items ?? []
  const guides = sections.guides.items ?? []
  const scopeItems = sections.scopeOfServices.items ?? []
  const scopeBadge = scopeItems.find((i) => i.key === 'badge')
  const scopeOfWork = scopeItems.filter((c) => c.items)

  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url="/monongahela-national-forest"
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
          subline={content.summary}
          booking={{
            title: content.name,
            text: sections.readyToExplore.intro,
            cta: { label: 'See All Campgrounds', url: '#campgrounds', kind: 'internal' },
            phone,
          }}
        />

        <IntroFacts
          eyebrow={content.tagline}
          eyebrowRule
          heading={sections.about.heading}
          lead={content.summary}
          paragraphs={content.paragraphs.slice(0, 3)}
          facts={content.stats}
        >
          <div className="mt-8 max-w-[760px] md:mt-12">
            <p className={body}>{content.paragraphs[3]}</p>
            <ul className="mt-4 list-disc space-y-1.5 pl-5 marker:text-lake-moss">
              {aboutLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href!}
                    className="font-medium text-lake-ink underline decoration-lake-line decoration-1 underline-offset-4 hover:decoration-lake-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
            <p className={`${body} mt-6`}>{content.paragraphs[4]}</p>
            <p className={`${body} mt-6`}>{content.paragraphs[5]}</p>
          </div>
          <SectionActions
            className="mt-8 md:mt-10"
            primary={{ label: 'Get Directions', url: mapsUrl(COORDS.lat, COORDS.lng), kind: 'external' }}
            secondary={[{ label: 'See all campgrounds', url: '#campgrounds', kind: 'internal', style: 'link' }]}
          />
        </IntroFacts>

        {/* Ecological Diversity + Activities: two plain fact/checklist <ul>s
            in the old layout, now lighter rows of chips (kit-v2.md §B). A
            white band marks the shift from the About prose above. */}
        <section className={`${block} ${bandWhite}`}>
          <div className={frame}>
            <SectionHeader heading={sections.ecologicalDiversity.heading ?? 'Ecological Diversity'} intro={sections.ecologicalDiversity.paragraphs?.[0]} />
            <IconChipList items={ecologyHighlights} />

            <h3 className={`${h3} mt-16 mb-6 text-lake-ink md:mt-20`}>{sections.activities.heading ?? 'Activities'}</h3>
            <IconChipList items={content.features} />
          </div>
        </section>

        {/* Wilderness Areas */}
        <section className={`${block} ${bandTint}`}>
          <div className={frame}>
            <SectionHeader heading={sections.wildernessAreas.heading ?? 'Five Federally Designated Wilderness Areas'} intro={sections.wildernessAreas.intro} />
            <CardRow
              columns={3}
              shape="wide"
              items={wildernessAreas.map((area) => ({ key: area.key, title: area.title, body: area.body }))}
            />
          </div>
        </section>

        {/* Notable Destinations */}
        <section className={block}>
          <div className={frame}>
            <SectionHeader heading={sections.notableDestinations.heading ?? 'Notable Destinations'} />
            <CardRow
              columns={2}
              shape="wide"
              items={notableDestinations.map((dest) => ({
                key: dest.key,
                title: dest.title,
                meta: dest.meta,
                body: dest.body,
                photo: dest.photo,
              }))}
            />
          </div>
        </section>

        {/* Blooming Schedule */}
        <section className={block}>
          <div className={frame}>
            <SectionHeader heading={sections.bloomingSchedule.heading ?? 'Blooming Schedule'} intro={sections.bloomingSchedule.intro} />
            <RuledRows rows={bloomingSchedule.map((entry) => ({ key: entry.key, title: entry.title, body: entry.body }))} />
            <SectionActions className="mt-10" primary={ctas.bloomingGuide} />
          </div>
        </section>

        {/* Birding */}
        {birdingPhoto && (
          <section className={block}>
            <div className={frame}>
              <SplitFeature photo={birdingPhoto} heading={sections.birding.heading ?? 'Birding in the Monongahela'} paragraphs={sections.birding.paragraphs}>
                <SectionActions className="mt-8" primary={ctas.birdChecklist} />
              </SplitFeature>
            </div>
          </section>
        )}

        {/* Campgrounds: the forest's six Cheat-Potomac campground pages,
            gathered in one clear index — kit-v2.md: "the forest page should
            link clearly to each campground." No card photos: all six
            campgrounds currently share one generic forest-entrance sign as
            their only image (photo-audit.md "Monongahela (Med)" shot list),
            so a per-card photo here would misrepresent which campground is
            which rather than help tell them apart. */}
        <section id="campgrounds" className={`${block} ${bandTint} scroll-mt-28`}>
          <div className={frame}>
            <SectionHeader eyebrow={content.tagline} eyebrowRule heading={sections.readyToExplore.heading ?? 'Ready to Explore?'} intro={sections.readyToExplore.intro} />
            <CardRow
              columns={3}
              items={campgroundLinks.map((cg) => ({ key: cg.key, title: cg.title, href: cg.href, linkLabel: 'Explore' }))}
            />
          </div>
        </section>

        {/* Resources & Downloads */}
        <section className={`${block} ${bandWhite}`}>
          <div className={frame}>
            <SectionHeader heading={sections.resources.heading ?? 'Resources & Downloads'} intro={sections.resources.intro} />

            <h3 className={`${h3} mt-2 mb-6 text-lake-ink`}>{sections.campgroundMaps.heading ?? 'Campground Maps'}</h3>
            <RuledRows rows={campgroundMaps.map((m) => ({ key: m.key, title: m.title, href: m.href, linkLabel: 'Download PDF' }))} />

            <h3 className={`${h3} mt-16 mb-6 text-lake-ink md:mt-20`}>{sections.wildernessMaps.heading ?? 'Wilderness Maps'}</h3>
            <RuledRows rows={wildernessMaps.map((m) => ({ key: m.key, title: m.title, href: m.href, linkLabel: 'Download PDF' }))} />

            <h3 className={`${h3} mt-16 mb-6 text-lake-ink md:mt-20`}>{sections.guides.heading ?? 'Guides & References'}</h3>
            <RuledRows rows={guides.map((g) => ({ key: g.key, title: g.title, href: g.href, linkLabel: 'Download PDF' }))} />
          </div>
        </section>

        <ClosingCta
          photo={{ src: '/images/monongahela/scenic-drive.jpg', alt: 'A scenic mountain road through the Monongahela National Forest' }}
          heading={sections.closingCta.heading ?? content.name}
          text={sections.closingCta.intro}
          primary={ctas.footerExperiences}
          phone={phone}
          secondary={{ label: 'Browse all campgrounds', url: '#campgrounds', kind: 'internal' }}
        />
        <OfficialDisclosure
          label={scopeBadge?.title ?? 'Statement of Work'}
          title={sections.scopeOfServices.heading ?? 'Scope of Services'}
          intro={sections.scopeOfServices.intro}
          groups={scopeOfWork.map((c) => ({ key: c.key, title: c.title ?? '', body: c.body, items: c.items ?? [] }))}
        />
        <StickyBooking name={content.name} cta={ctas.footerExperiences} phone={phone} />
      </LakesideShell>

      <Footer />
    </main>
  )
}
