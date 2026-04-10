import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const apiKey = process.env.RESEND_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: 'Email not configured' }, { status: 500 })
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

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'BA Services <bookings@escape.baserves.com>',
        to: ['andrew@baserves.com'],
        bcc: ['acadiamarketingmaine@gmail.com'],
        reply_to: data.email,
        subject: `Partnership Inquiry: ${data.name}${data.organization ? ` — ${data.organization}` : ''}`,
        html,
      }),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
