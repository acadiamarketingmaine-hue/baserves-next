import { NextRequest, NextResponse } from 'next/server'
import { sendMail } from '@/lib/mailer'

// Spam guards. Deliberately no third-party service and no new dependency, and
// nothing here changes what a real visitor sees or has to do.
const MIN_FILL_MS = 3000        // a human cannot read and complete this form faster
const RATE_LIMIT_MAX = 5        // submissions per IP...
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // ...per 10 minutes

// Per-instance memory. A serverless cold start clears it, which is fine: this
// is here to stop a flood from one source, not to be an audit log.
const recentByIp = new Map<string, number[]>()

function isRateLimited(ip: string) {
  const now = Date.now()
  const hits = (recentByIp.get(ip) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS)
  hits.push(now)
  recentByIp.set(ip, hits)

  // Opportunistic cleanup so the map cannot grow without bound.
  if (recentByIp.size > 500) {
    for (const [key, times] of recentByIp) {
      if (!times.some(t => now - t < RATE_LIMIT_WINDOW_MS)) recentByIp.delete(key)
    }
  }

  return hits.length > RATE_LIMIT_MAX
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // 1. Honeypot: a field hidden from real visitors. Anything in it is a bot.
    if (typeof data.website === 'string' && data.website.trim() !== '') {
      console.warn('Contact form: honeypot tripped, dropping submission')
      return NextResponse.json({ success: true })
    }

    // 2. Time to submit. Bots post instantly.
    const elapsedMs = Number(data.elapsedMs)
    if (Number.isFinite(elapsedMs) && elapsedMs < MIN_FILL_MS) {
      console.warn(`Contact form: submitted in ${elapsedMs}ms, dropping submission`)
      return NextResponse.json({ success: true })
    }

    // 3. Per-IP rate limit.
    const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim()
      || request.headers.get('x-real-ip')
      || 'unknown'
    if (isRateLimited(ip)) {
      console.warn('Contact form: rate limit hit')
      return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 })
    }

    const html = `
      <h2>New Partnership Inquiry from baserves.com</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;">Name</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${data.name}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;">Organization</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${data.organization || 'Not provided'}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;">Email</td><td style="padding:8px 12px;border:1px solid #e5e7eb;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;">Phone</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${data.phone || 'Not provided'}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;">Property Type</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${data.propertyType || 'Not specified'}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;">Location</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${data.location || 'Not provided'}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;">Message</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${data.message}</td></tr>
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
