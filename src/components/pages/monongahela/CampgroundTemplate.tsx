import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { PageSchema } from '@/components/SchemaMarkup'
import type { PropertyContent } from '@/content'
import NoticeBanner from '@/content/NoticeBanner'
import {
  CardRow,
  ClosingCta,
  Hero,
  IconChipList,
  IntroFacts,
  LakesideShell,
  SectionActions,
  SectionHeader,
  StickyBooking,
  bandTint,
  bandWhite,
  frame,
  telHref,
} from '@/components/property/lakeside'
import type { SiblingCampground } from './siblings'

export interface CampgroundTemplateProps {
  content: PropertyContent
  phone: string
  siblings: SiblingCampground[]
}

/** Vertical rhythm for the paper sections that follow one another (matches
 * long-lake-outdoor-center/page.tsx's local `block` constant). */
const block = 'pb-14 md:pb-24 lg:pb-[120px]'

/**
 * Shared Lakeside layout for the six Cheat-Potomac campground pages
 * (big-bend, gatewood, jess-judy, seneca-shadows, spruce-knob-lake, stuart).
 * They all share one bespoke structure and differ only in their own
 * content-layer data (src/content/defaults/<slug>.ts) and the sibling list
 * each page computes for itself. See docs/ux-pass/kit-v2.md.
 *
 * No Gallery/Mosaic/HeritageBand/OfficialDisclosure: none of these six pages
 * has a gallery, a mosaic set, a CCC heritage callout, or its own scope-of-
 * services text (that lives on the parent /monongahela-national-forest page
 * only). Each campground's only photo is its hero (the shared entrance-sign
 * photo — see photo-audit.md "Monongahela (Med)"), so card/row accents below
 * stay text-only rather than repeating that generic sign as a stand-in for a
 * specific place.
 */
export default function CampgroundTemplate({ content, phone, siblings }: CampgroundTemplateProps) {
  const { sections, ctas } = content
  const url = `/monongahela-national-forest/${content.slug}`

  return (
    <main className="min-h-screen">
      <Navigation />
      <PageSchema
        url={url}
        name={content.seo.title}
        crumbName={content.name}
        description={content.seo.description}
        image={content.hero.src}
        crumbs={[{ name: 'Monongahela National Forest', url: '/monongahela-national-forest' }]}
      />
      <NoticeBanner notices={content.notices} />

      <LakesideShell>
        <Hero
          photo={content.hero}
          eyebrow={ctas.parentForest.label}
          title={content.name}
          subline={content.tagline}
          booking={{
            title: content.name,
            text: content.tagline,
            cta: ctas.hero,
            phone,
          }}
        />

        <IntroFacts
          eyebrow={ctas.parentForest.label}
          eyebrowRule
          heading={sections.about.heading}
          lead={content.summary}
          paragraphs={content.paragraphs}
          facts={content.stats}
        >
          <SectionActions
            className="mt-8 md:mt-10"
            primary={ctas.reserve}
            secondary={phone ? [{ label: `Call ${phone}`, url: telHref(phone), kind: 'external' }] : []}
          />
        </IntroFacts>

        {/* Features & Amenities: a plain amenities <ul> in the old sidebar,
            now a lighter row of chips (kit-v2.md §B). A white band marks the
            shift from "about this place" prose into a scannable facts list. */}
        <section className={`${block} ${bandWhite}`}>
          <div className={frame}>
            <SectionHeader heading={sections.features.heading ?? 'Features & Amenities'} />
            <IconChipList items={content.features} />
          </div>
        </section>

        {/* Other Cheat-Potomac campgrounds: every campground links back to
            the forest (ClosingCta secondary, below) and out to its five
            siblings here — kit-v2.md: "each campground should link back and
            to its siblings." No card photos: all six campgrounds currently
            share one generic forest-entrance sign as their only image
            (photo-audit.md), so a per-card photo here would misrepresent
            which campground is which rather than help tell them apart. */}
        {siblings.length > 0 && (
          <section className={`${block} ${bandTint}`}>
            <div className={frame}>
              <SectionHeader
                heading="More Campgrounds in the Monongahela"
                intro="Explore the other campgrounds and recreation areas in the Monongahela National Forest."
              />
              <CardRow
                columns={3}
                items={siblings.map((s) => ({
                  key: s.slug,
                  title: s.name,
                  meta: s.stat ? `${s.stat.value} ${s.stat.label}` : undefined,
                  body: s.tagline,
                  href: s.href,
                  linkLabel: 'Explore',
                }))}
              />
            </div>
          </section>
        )}

        {/* ClosingCta's heading/text render white at desktop width whether or
            not a photo is given, so a photo is required here, not optional —
            the campground's own hero photo, bookending the page. */}
        <ClosingCta
          photo={content.hero}
          heading={sections.closingCta.heading ?? content.name}
          text={sections.closingCta.intro}
          primary={ctas.footer}
          phone={phone}
          secondary={ctas.footerBack}
        />

        <StickyBooking name={content.name} cta={ctas.reserve} phone={phone} />
      </LakesideShell>

      <Footer />
    </main>
  )
}
