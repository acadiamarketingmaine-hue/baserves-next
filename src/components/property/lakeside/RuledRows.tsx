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
}

export interface RuledRowsProps {
  rows: RuledRow[]
  /** Two columns from md up. */
  twoUp?: boolean
  /** Heading level for row titles. */
  as?: 'h3' | 'h4'
}

/** Hairline-ruled rows: serif title, value on the right, one line of detail. */
export default function RuledRows({ rows, twoUp = true, as: Title = 'h3' }: RuledRowsProps) {
  return (
    <ul className={`grid border-t border-lake-line ${twoUp ? 'md:grid-cols-2 md:gap-x-12' : ''}`}>
      {rows.map((row) => {
        const inner = (
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
                <Arrow />
              </span>
            )}
          </>
        )
        return (
          <li key={row.key} className="border-b border-lake-line">
            {row.href ? (
              <a
                href={row.href}
                {...externalProps(row.href)}
                className="group block py-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce"
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
