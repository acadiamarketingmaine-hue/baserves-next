import type { Cta } from '@/content'
import Arrow from './Arrow'
import { externalProps, pillGhost, pillPrimary, textLink } from './styles'

export interface SectionActionsProps {
  /** The one primary action for this section — spruce, rounded-full. */
  primary: Cta
  /** 0-2 quieter follow-on actions. Every destination must already exist
   * (an existing CTA, a real anchor/tel/maps link) — never invent a URL. */
  secondary?: (Cta & { style?: 'outline' | 'link' })[]
  /** Left-aligns under body copy (default) or centres for a standalone block. */
  align?: 'left' | 'center'
  className?: string
}

/**
 * One primary button plus up to two secondary actions, all ≥44px tall. Drop
 * this at the natural "what next" point in a section — see
 * docs/ux-pass/kit-v2.md for placement guidance (after intro facts, places
 * to stay, groups/events, location, gallery, closing).
 */
export default function SectionActions({ primary, secondary = [], align = 'left', className = '' }: SectionActionsProps) {
  return (
    <div
      className={`flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:flex-wrap ${
        align === 'center' ? 'justify-center text-center sm:justify-center' : ''
      } ${className}`}
    >
      <a href={primary.url} {...externalProps(primary.url)} className={pillPrimary}>
        {primary.label}
      </a>
      {secondary.slice(0, 2).map((action) =>
        action.style === 'link' ? (
          <a key={action.label} href={action.url} {...externalProps(action.url)} className={textLink}>
            {action.label}
            <Arrow className="h-4 w-4" />
          </a>
        ) : (
          <a key={action.label} href={action.url} {...externalProps(action.url)} className={pillGhost}>
            {action.label}
          </a>
        ),
      )}
    </div>
  )
}
