import type { ReactNode } from 'react'
import Eyebrow from './Eyebrow'
import { body, h2 } from './styles'

export interface SectionHeaderProps {
  eyebrow?: string
  /** Adds the short ember rule above the eyebrow — see Eyebrow. */
  eyebrowRule?: boolean
  heading: string
  intro?: ReactNode
  /** Put the intro beside the heading (desktop) instead of under it. */
  split?: boolean
  className?: string
}

/** Serif section heading with an optional label and one-paragraph intro. */
export default function SectionHeader({
  eyebrow,
  eyebrowRule = false,
  heading,
  intro,
  split = true,
  className = '',
}: SectionHeaderProps) {
  return (
    <div
      data-reveal="up"
      className={`${split ? 'lg:flex lg:items-end lg:justify-between lg:gap-16' : ''} mb-8 md:mb-12 ${className}`}
    >
      <div>
        {eyebrow && <Eyebrow label={eyebrow} rule={eyebrowRule} className="mb-4" />}
        <h2 className={`${h2} text-lake-ink`}>{heading}</h2>
      </div>
      {intro && (
        <p className={`${body} mt-4 ${split ? 'max-w-[440px] lg:mt-0 lg:pb-2' : 'max-w-[720px] md:mt-6'}`}>{intro}</p>
      )}
    </div>
  )
}
