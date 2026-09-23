import { frame, eyebrow } from './styles'

export interface OfficialGroup {
  key: string
  title: string
  body?: string
  items: string[]
}

export interface OfficialDisclosureProps {
  /** Small caps label above the title, e.g. "Concession management". */
  label?: string
  title: string
  intro?: string
  groups: OfficialGroup[]
}

const plus = (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-5 w-5 shrink-0 text-lake-moss transition-transform duration-200 group-open:rotate-45"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
)

/**
 * Official, reference-style content (contracts, scope of services) kept on the
 * page but collapsed by default, so it is available to anyone who wants it
 * without interrupting the page's story. Native <details> works without JS
 * and keeps the text in the HTML for search.
 */
export default function OfficialDisclosure({ label, title, intro, groups }: OfficialDisclosureProps) {
  return (
    <section className="border-t border-lake-line bg-[#ECE7DC]">
      <div className={`${frame} py-10 md:py-14`}>
        <details className="group">
          <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-6 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lake-spruce [&::-webkit-details-marker]:hidden">
            <span className="flex flex-col gap-1">
              {label && <span className={`${eyebrow} text-lake-moss`}>{label}</span>}
              <span className="text-lg font-medium text-lake-ink md:text-xl">{title}</span>
            </span>
            <span className="flex items-center gap-3 text-sm text-lake-mute">
              <span className="hidden sm:inline group-open:hidden">Show details</span>
              <span className="hidden sm:group-open:inline">Hide details</span>
              {plus}
            </span>
          </summary>

          <div className="mt-6 max-w-4xl">
            {intro && <p className="mb-6 text-[15px] leading-[1.65] text-lake-mute">{intro}</p>}
            <div className="border-t border-lake-line">
              {groups.map((g) => (
                <details key={g.key} className="group/item border-b border-lake-line">
                  <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-6 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce [&::-webkit-details-marker]:hidden">
                    <span className="text-[15px] font-medium text-lake-ink">{g.title}</span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 shrink-0 text-lake-moss transition-transform duration-200 group-open/item:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </summary>
                  <div className="pb-5">
                    {g.body && <p className="mb-3 text-[14px] leading-[1.6] text-lake-mute">{g.body}</p>}
                    <ul className="list-disc space-y-1.5 pl-5 text-[14px] leading-[1.55] text-lake-ink marker:text-lake-moss">
                      {g.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </details>
      </div>
    </section>
  )
}
