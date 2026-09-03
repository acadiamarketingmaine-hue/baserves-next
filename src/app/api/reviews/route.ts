import { NextRequest, NextResponse } from 'next/server'
import { sendMail, escapeHtml } from '@/lib/mailer'
import { recipientsForRestArea } from '@/data/managers'

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

const QUESTIONS: [keyof SubmittedReview, string][] = [
  ['restroomCleanliness', 'Cleanliness of the restrooms'],
  ['maintenance', 'Overall maintenance of the facility'],
  ['groundsCleanliness', 'Cleanliness of the grounds and parking'],
  ['vending', 'Satisfaction with vending offerings'],
  ['staffCourtesy', 'Courtesy of our staff'],
]

interface SubmittedReview {
  restArea?: string
  restroomCleanliness?: string
  maintenance?: string
  groundsCleanliness?: string
  vending?: string
  staffCourtesy?: string
  feedback?: string
  followUp?: boolean
  name?: string
  phone?: string
  email?: string
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;white-space:nowrap;vertical-align:top;">${label}</td>
    <td style="padding:8px 12px;border:1px solid #e5e7eb;">${value}</td>
  </tr>`
}

function buildHtml(data: SubmittedReview, recipientNames: string[]) {
  const answers = QUESTIONS.filter(([key]) => data[key])
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

  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:20px;">
      <h2 style="margin:0 0 4px;">Rest Area Feedback</h2>
      <p style="margin:0 0 16px;color:#6b7280;font-size:14px;">${escapeHtml(data.restArea || 'Rest area not specified')}</p>
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

    if (!data.restArea) {
      return NextResponse.json({ error: 'Please choose a rest area' }, { status: 400 })
    }

    const recipients = recipientsForRestArea(data.restArea)

    await sendMail({
      to: recipients.map(r => r.email),
      subject: `Rest Area Feedback: ${data.restArea}`,
      html: buildHtml(data, recipients.map(r => `${r.name} (${r.role})`)),
      replyTo: data.email?.trim() || undefined,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Review submission error:', error)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
