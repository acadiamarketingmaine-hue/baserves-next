import type { ReactNode } from 'react'
import type { Stat } from '@/content'
import { body, eyebrow as eyebrowClass, frame, sectionPad } from './styles'

export interface IntroFactsProps {
  id?: string
  /** Small ember label, e.g. "Est. 1939". */
  eyebrow?: string
  /** Short moss line under the label; rendered as the section's <h2>. */
  heading?: string
  /** The big serif lead. */
  lead: string
  /** Supporting paragraphs under the lead. */
  paragraphs?: string[]
  facts: Stat[]
  /** Anything else for the right column (e.g. an amenities list). */
  children?: ReactNode
}

/** Label + lead, then a hairline-ruled row of facts. */
export default function IntroFacts({ id, eyebrow, heading, lead, paragraphs = [], facts, children }: IntroFactsProps) {
  return (
    <section id={id} className={sectionPad}>
      <div className={frame}>
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4 lg:pt-3">
            {eyebrow && <p className={`${eyebrowClass} text-lake-ember`}>{eyebrow}</p>}
            {heading && <h2 className="mt-3 text-[15px] font-medium text-lake-moss">{heading}</h2>}
          </div>
          <div className="lg:col-span-8">
            <p className="font-lake-serif text-[30px] leading-[1.18] tracking-[-0.01em] text-lake-ink [text-wrap:pretty] md:text-[40px] lg:text-[46px]">
              {lead}
            </p>
            {paragraphs.length > 0 && (
              <div className="mt-8 grid gap-5 md:mt-12 md:grid-cols-2 md:gap-x-12">
                {paragraphs.map((p) => (
                  <p key={p} className={body}>
                    {p}
                  </p>
                ))}
              </div>
            )}
            {children}
          </div>
        </div>

        {facts.length > 0 && (
          <dl
            className="mt-12 border-t border-lake-line md:mt-20 md:grid md:border-b md:py-8"
            style={{ gridTemplateColumns: `repeat(${facts.length}, minmax(0, 1fr))` }}
          >
            {facts.map((fact) => (
              <div
                key={fact.key}
                className="flex items-baseline justify-between gap-4 border-b border-lake-line py-4 md:block md:border-0 md:py-0 md:pr-6"
              >
                <dt className={`${eyebrowClass} text-[11px] text-lake-moss`}>{fact.label}</dt>
                <dd className="font-lake-serif text-[24px] leading-tight text-lake-ink md:mt-3 md:text-[32px]">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  )
}
