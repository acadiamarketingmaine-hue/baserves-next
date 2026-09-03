import { NextRequest, NextResponse } from 'next/server'
import { sendMail, escapeHtml } from '@/lib/mailer'
import { recipientsForRestArea, recipientsForSite } from '@/data/managers'

export const dynamic = 'force-dynamic'

// This endpoint sends mail on an unauthenticated request, so cap how often one
// address can trigger it. Formspree used to absorb this for us.
const RATE_LIMIT = 5
const RATE_WINDOW = 10 * 60 * 1000
const recentSubmissions = new Map<string, { count: number; resetAt: number }>()

function withinRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = recentSubmissions.get(ip)
  if (!entry || now > entry.resetAt) {
    recentSubmissions.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

interface SubmittedReview {
  reviewType?: 'rest-area' | 'campground'
  restArea?: string
  site?: string
  // Rest area answers
  restroomCleanliness?: string
  maintenance?: string
  groundsCleanliness?: string
  vending?: string
  staffCourtesy?: string
  // Campground answers
  accommodationCleanliness?: string
  facilityCondition?: string
  bathhouseCleanliness?: string
  checkInExperience?: string
  // Shared
  feedback?: string
  followUp?: boolean
  name?: string
  phone?: string
  email?: string
}

const REST_AREA_QUESTIONS: [keyof SubmittedReview, string][] = [
  ['restroomCleanliness', 'Cleanliness of the restrooms'],
  ['maintenance', 'Overall maintenance of the facility'],
  ['groundsCleanliness', 'Cleanliness of the grounds and parking'],
  ['vending', 'Satisfaction with vending offerings'],
  ['staffCourtesy', 'Courtesy of our staff'],
]

const CAMPGROUND_QUESTIONS: [keyof SubmittedReview, string][] = [
  ['accommodationCleanliness', 'Cleanliness of the cabin or site'],
  ['facilityCondition', 'Condition and upkeep of the facilities'],
  ['bathhouseCleanliness', 'Cleanliness of the restrooms and shower house'],
  ['groundsCleanliness', 'Cleanliness of the grounds'],
  ['checkInExperience', 'Check-in and reservation experience'],
  ['staffCourtesy', 'Courtesy of our staff'],
]

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;white-space:nowrap;vertical-align:top;">${label}</td>
    <td style="padding:8px 12px;border:1px solid #e5e7eb;">${value}</td>
  </tr>`
}

function buildHtml(
  data: SubmittedReview,
  locationName: string,
  questions: [keyof SubmittedReview, string][],
  recipientNames: string[]
) {
  const answers = questions
    .filter(([key]) => data[key])
    .map(([key, label]) => row(label, escapeHtml(String(data[key]))))
    .join('')

  const contactRows = [
    data.name ? row('Name', escapeHtml(data.name)) : '',
    data.phone ? row('Phone', escapeHtml(data.phone)) : '',
    data.email
      ? row('Email', `<a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>`)
      : '',
  ].join('')

  const followUpBanner = data.followUp
    ? `<p style="margin:0 0 16px;padding:12px 16px;background:#fef3c7;border-left:4px solid #d97706;color:#92400e;font-weight:600;">
         This visitor asked to be contacted about their feedback.
       </p>`
    : ''

  const heading = data.reviewType === 'campground' ? 'Campground Feedback' : 'Rest Area Feedback'

  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:20px;">
      <h2 style="margin:0 0 4px;">${heading}</h2>
      <p style="margin:0 0 16px;color:#6b7280;font-size:14px;">${escapeHtml(locationName)}</p>
      ${followUpBanner}
      <table style="border-collapse:collapse;width:100%;">
        ${answers}
        ${data.feedback ? row('Comments', escapeHtml(data.feedback).replace(/\n/g, '<br>')) : ''}
        ${contactRows}
      </table>
      <p style="color:#6b7280;font-size:12px;margin-top:16px;">
        Submitted via the Leave a Review page on baserves.com.<br>
        Sent to: ${escapeHtml(recipientNames.join(', '))}
      </p>
    </div>
  `
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'
    if (!withinRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again shortly.' },
        { status: 429 }
      )
    }

    const data = (await request.json()) as SubmittedReview
    const isCampground = data.reviewType === 'campground'

    // Older clients only ever sent restArea, so treat a missing type as a rest area.
    const locationName = isCampground ? data.site : data.restArea
    if (!locationName) {
      return NextResponse.json(
        { error: isCampground ? 'Please choose a campground' : 'Please choose a rest area' },
        { status: 400 }
      )
    }

    const recipients = isCampground
      ? recipientsForSite(locationName)
      : recipientsForRestArea(locationName)

    const questions = isCampground ? CAMPGROUND_QUESTIONS : REST_AREA_QUESTIONS
    const subjectPrefix = isCampground ? 'Campground Feedback' : 'Rest Area Feedback'

    await sendMail({
      to: recipients.map(r => r.email),
      subject: `${subjectPrefix}: ${locationName}`,
      html: buildHtml(data, locationName, questions, recipients.map(r => `${r.name} (${r.role})`)),
      replyTo: data.email?.trim() || undefined,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Review submission error:', error)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
