import type { Cta } from '@/content'
import SectionHeader from './SectionHeader'
import SectionActions from './SectionActions'
import { bandTint, bandWhite, body, frame, h3 } from './styles'

export interface ParkFaqItem {
  question: string
  answer: string
}

export interface ParkFaqBandProps {
  eyebrow?: string
  heading?: string
  intro?: string
  items: ParkFaqItem[]
  /** Alternate band background to match surrounding Lakeside sections. */
  tone?: 'tint' | 'white'
  cta?: Cta
  phone?: string
}

/**
 * Visible, AI-ready seasonal planning & visitor FAQ band for recreation areas
 * and state park guides. Always paired with `faq(url, items)` in PageSchema so
 * structured FAQPage JSON-LD matches visible page content 1:1.
 */
export default function ParkFaqBand({
  eyebrow = 'Seasonal guide & visitor FAQs',
  heading = 'Planning your stay',
  intro,
  items,
  tone = 'tint',
  cta,
}: ParkFaqBandProps) {
  if (!items.length) return null

  return (
    <section
      aria-label={heading}
      className={`${tone === 'tint' ? bandTint : bandWhite} py-14 md:py-24 lg:py-[112px]`}
    >
      <div className={frame}>
        <SectionHeader eyebrow={eyebrow} eyebrowRule heading={heading} intro={intro} />
        <dl className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-8">
          {items.map((item) => (
            <div
              key={item.question}
              className="rounded-2xl border border-lake-line bg-lake-paper p-6 md:p-8"
            >
              <dt>
                <h3 className={`${h3} text-[22px] md:text-[24px]`}>{item.question}</h3>
              </dt>
              <dd className={`${body} mt-3`}>{item.answer}</dd>
            </div>
          ))}
        </dl>
        {cta && <SectionActions className="mt-10 md:mt-12" primary={cta} />}
      </div>
    </section>
  )
}
