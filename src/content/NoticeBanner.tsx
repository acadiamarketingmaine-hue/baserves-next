import type { Notice } from './types'
import { CONTENT_POLICY, todayInTimeZone, visibleNotices } from './overrides'

/**
 * The dated notice banner slot.
 *
 * Every property and the site settings ship an EMPTY list, so with nothing
 * published this renders `null` and adds not one byte of markup to the page.
 * That is the behaviour the three converted pages were built against and it
 * must not change: a page with no notice on it is byte-for-byte the page it
 * was before this feature existed.
 *
 * Once a camp publishes a notice, this is a real banner:
 *
 *   * `role="status"` — an assistive technology announces it politely when it
 *     appears, which is what a "the road is closed this weekend" banner is
 *     for, without stealing focus the way an alert would.
 *   * The severity is in the WORDS as well as the colour, in a visually
 *     hidden label, because "this is a closure and not a note" cannot be
 *     carried by a red border alone.
 *   * The dates are read in the property's own timezone, so a notice that ends
 *     today stops showing at the end of today at the campground rather than
 *     at 8pm local because the server thinks in UTC.
 *
 * `today` is a prop rather than a call to the clock so a test can pin it. When
 * it is not given the page becomes time-dependent, which is why the pages that
 * render notices revalidate on an interval instead of being frozen at build.
 */

/** Re-exported: this was the module that owned it before the split. */
export { visibleNotices } from './overrides'

const SEVERITY_CLASS: Record<Notice['severity'], string> = {
  info: 'bg-blue-50 text-blue-900 border-blue-200',
  warning: 'bg-amber-50 text-amber-900 border-amber-200',
  closure: 'bg-red-50 text-red-900 border-red-200',
}

/** What a screen reader says in place of the colour. */
const SEVERITY_LABEL: Record<Notice['severity'], string> = {
  info: 'Notice:',
  warning: 'Important:',
  closure: 'Closure:',
}

export default function NoticeBanner({
  notices,
  today,
}: {
  notices: Notice[]
  today?: string
}) {
  const on = visibleNotices(notices, today ?? todayInTimeZone(CONTENT_POLICY.timezone))
  if (on.length === 0) return null

  return (
    <div className="container-custom px-6 pt-6">
      {on.map((notice) => (
        <div
          key={notice.id}
          role="status"
          className={`mb-3 rounded-xl border px-4 py-3 text-sm ${SEVERITY_CLASS[notice.severity]}`}
        >
          <span className="sr-only">{SEVERITY_LABEL[notice.severity]} </span>
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
