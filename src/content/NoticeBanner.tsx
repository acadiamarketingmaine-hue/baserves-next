import type { Notice } from './types'

/**
 * The dated notice banner slot.
 *
 * Nothing sets a notice today: every property and the site settings ship an
 * empty list, so this renders NOTHING and adds no markup to the page. That is
 * deliberate - the slot is placed now so that a later step can turn a banner on
 * from the editor without touching page code.
 *
 * `today` is passed in rather than read from the clock so that a build is
 * reproducible and a page that has no notices never becomes time-dependent.
 */
export function visibleNotices(notices: Notice[], today: string): Notice[] {
  return notices.filter((n) => {
    if (n.startsOn && today < n.startsOn) return false
    if (n.endsOn && today > n.endsOn) return false
    return true
  })
}

const SEVERITY_CLASS: Record<Notice['severity'], string> = {
  info: 'bg-blue-50 text-blue-900 border-blue-200',
  warning: 'bg-amber-50 text-amber-900 border-amber-200',
  closure: 'bg-red-50 text-red-900 border-red-200',
}

export default function NoticeBanner({
  notices,
  today,
}: {
  notices: Notice[]
  today?: string
}) {
  const on = visibleNotices(notices, today ?? new Date().toISOString().slice(0, 10))
  if (on.length === 0) return null

  return (
    <div className="container-custom px-6 pt-6">
      {on.map((notice) => (
        <div
          key={notice.id}
          className={`mb-3 rounded-xl border px-4 py-3 text-sm ${SEVERITY_CLASS[notice.severity]}`}
        >
          {notice.message}
          {notice.href && notice.linkLabel ? (
            <a href={notice.href} className="ml-2 font-semibold underline">
              {notice.linkLabel}
            </a>
          ) : null}
        </div>
      ))}
    </div>
  )
}
