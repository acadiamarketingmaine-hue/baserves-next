import type { ReactNode } from 'react'
import { body, eyebrow as eyebrowClass, h2 } from './styles'

export interface SectionHeaderProps {
  eyebrow?: string
  heading: string
  intro?: ReactNode
  /** Put the intro beside the heading (desktop) instead of under it. */
  split?: boolean
  className?: string
}

/** Serif section heading with an optional label and one-paragraph intro. */
export default function SectionHeader({ eyebrow, heading, intro, split = true, className = '' }: SectionHeaderProps) {
  return (
    <div
      className={`${split ? 'lg:flex lg:items-end lg:justify-between lg:gap-16' : ''} mb-8 md:mb-12 ${className}`}
    >
      <div>
        {eyebrow && <p className={`${eyebrowClass} mb-4 text-lake-ember`}>{eyebrow}</p>}
        <h2 className={`${h2} text-lake-ink`}>{heading}</h2>
      </div>
      {intro && (
        <p className={`${body} mt-4 max-w-[440px] ${split ? 'lg:mt-0 lg:pb-2' : 'md:mt-6'}`}>{intro}</p>
      )}
    </div>
  )
}
