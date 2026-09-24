/** A generic check mark — decorative only, not a claim about any one item. */
function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  )
}

export interface IconChipListProps {
  /** The facts/amenities themselves, verbatim — no new copy is added. */
  items: string[]
  className?: string
}

/**
 * A wrapped row of small chips (an icon tile + label) for a flat list of
 * facts or amenities — an alternative to a plain ruled list when the section
 * wants a lighter, more "finished" feel. Purely decorative icon; the words
 * are exactly what's passed in.
 */
export default function IconChipList({ items, className = '' }: IconChipListProps) {
  return (
    <ul className={`flex flex-wrap gap-2.5 ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-2 rounded-full border border-lake-line bg-white py-2 pl-2 pr-4 text-[14px] text-lake-ink"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lake-spruce/10 text-lake-spruce">
            <CheckIcon />
          </span>
          {item}
        </li>
      ))}
    </ul>
  )
}
