import { eyebrow as eyebrowClass } from './styles'

export interface EyebrowProps {
  label: string
  /** Colour, for use on paper (default) or the dark spruce band. */
  tone?: 'ember' | 'ember-light'
  /** Adds the short rule above the label. Off by default — use it to mark
   * the handful of section openers that most need to read as a fresh start,
   * not on every eyebrow on the page. */
  rule?: boolean
  className?: string
}

/**
 * The small caps label above a section heading. With `rule`, a short ember
 * line sits above it — a second, quieter cue (beyond spacing) that a new
 * section has started.
 */
export default function Eyebrow({ label, tone = 'ember', rule = false, className = '' }: EyebrowProps) {
  const color = tone === 'ember' ? 'text-lake-ember' : 'text-lake-ember-light'
  const ruleColor = tone === 'ember' ? 'bg-lake-ember' : 'bg-lake-ember-light'
  return (
    <div className={className}>
      {rule && <span aria-hidden="true" className={`mb-3 block h-[2px] w-8 ${ruleColor}`} />}
      <p className={`${eyebrowClass} ${color}`}>{label}</p>
    </div>
  )
}
