import Image from 'next/image'
import type { Photo } from '@/content'
import Arrow from './Arrow'
import { externalProps, eyebrow as eyebrowClass } from './styles'

export interface RuledRow {
  key: string
  title?: string
  body?: string
  /** Right-hand value on the title line, e.g. "Sleeps 8". */
  meta?: string
  /** A small note under the body, e.g. "Private bathroom". */
  badge?: string
  /** Makes the whole row a link (e.g. a PDF). */
  href?: string
  /** Text after the body on a linked row, e.g. "Download PDF". */
  linkLabel?: string
  /**
   * A small photo at the start of the row (the accent that separates one row
   * from the next). Use a real photo that matches the row's meaning — never
   * a stock or invented image. Omit it and the row reads as plain text, as
   * before.
   */
  image?: Photo
}

export interface RuledRowsProps {
  rows: RuledRow[]
  /** Two columns from md up. */
  twoUp?: boolean
  /** Heading level for row titles. */
  as?: 'h3' | 'h4'
}

/** Hairline-ruled rows: serif title, value on the right, one line of detail.
 * A row with an `image` gets a small rounded photo at its start — the accent
 * that makes each row read as its own thing, not just another line in a
 * list. */
export default function RuledRows({ rows, twoUp = true, as: Title = 'h3' }: RuledRowsProps) {
  return (
    <ul className={`grid border-t border-lake-line ${twoUp ? 'md:grid-cols-2 md:gap-x-12' : ''}`}>
      {rows.map((row) => {
        const text = (
          <>
            <div className="flex items-baseline justify-between gap-4">
              {row.title && <Title className="font-lake-serif text-[26px] leading-tight text-lake-ink">{row.title}</Title>}
              {row.meta && <span className={`${eyebrowClass} shrink-0 text-lake-moss`}>{row.meta}</span>}
            </div>
            {row.body && <p className="mt-2 text-[15px] leading-[1.6] text-lake-mute md:text-base">{row.body}</p>}
            {row.badge && <p className={`${eyebrowClass} mt-3 text-lake-ember`}>{row.badge}</p>}
            {row.href && row.linkLabel && (
              <span className="mt-3 inline-flex items-center gap-1.5 text-[15px] font-medium text-lake-ink group-hover:underline group-hover:underline-offset-4">
                {row.linkLabel}
                <Arrow className="lk-nudge h-4 w-4" />
              </span>
            )}
          </>
        )
        const inner = row.image ? (
          <div className="flex items-start gap-4 md:gap-5">
            <div
              data-reveal="wipe"
              className="lk-zoom relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl md:h-[104px] md:w-[104px] lg:h-[120px] lg:w-[120px]"
            >
              <Image
                src={row.image.src}
                alt={row.image.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 120px, (min-width: 768px) 104px, 72px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">{text}</div>
          </div>
        ) : (
          text
        )
        return (
          <li key={row.key} className="border-b border-lake-line">
            {row.href ? (
              <a
                href={row.href}
                {...externalProps(row.href)}
                className="lk-card group block py-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce"
              >
                {inner}
              </a>
            ) : (
              <div className="py-6">{inner}</div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
