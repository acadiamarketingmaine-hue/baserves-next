import { NextRequest, NextResponse } from 'next/server'
import { sendMail, escapeHtml } from '@/lib/mailer'
import { CONTACT_POLICY, clientIp, guardSubmission } from '@/lib/form-guard'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Honeypot, time to fill, per-connection limit and Cloudflare Turnstile
    // (src/lib/form-guard.ts).
    const guard = await guardSubmission(CONTACT_POLICY, data, clientIp(request.headers), { secret: process.env.TURNSTILE_SECRET_KEY })
    if (guard.action === 'drop') {
      console.warn(`Contact form: ${guard.reason}, dropping submission`)
      return NextResponse.json({ success: true })
    }
    if (guard.action === 'reject') {
      console.warn(`Contact form: ${guard.reason}`)
      return NextResponse.json({ error: guard.error }, { status: guard.status })
    }

    const esc = (v: unknown) => (typeof v === 'string' ? escapeHtml(v) : '')
    const html = `
      <h2>New Partnership Inquiry from baserves.com</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;">Name</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${esc(data.name)}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;">Organization</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${esc(data.organization) || 'Not provided'}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;">Email</td><td style="padding:8px 12px;border:1px solid #e5e7eb;"><a href="mailto:${esc(data.email)}">${esc(data.email)}</a></td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;">Phone</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${esc(data.phone) || 'Not provided'}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;">Property Type</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${esc(data.propertyType) || 'Not specified'}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;">Location</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${esc(data.location) || 'Not provided'}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;">Message</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${esc(data.message)}</td></tr>
      </table>
      <p style="color:#6b7280;font-size:12px;margin-top:16px;">Submitted via baserves.com Contact Us page</p>
    `

    await sendMail({
      to: ['andrew@baserves.com'],
      bcc: ['acadiamarketingmaine@gmail.com'],
      replyTo: data.email,
      subject: `Partnership Inquiry: ${data.name}${data.organization ? ` — ${data.organization}` : ''}`,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
