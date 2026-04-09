import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { intakeData, conversation } = await request.json()

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('No RESEND_API_KEY')
      return NextResponse.json({ error: 'Email not configured' }, { status: 500 })
    }

    const htmlBody = `
      <h2>New Lead from Treeko (Website Chat Assistant)</h2>
      <hr/>
      <h3>Contact Information</h3>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        ${Object.entries(intakeData).map(([key, value]) => `
          <tr>
            <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;width:40%;text-transform:capitalize;">${key.replace(/_/g, ' ')}</td>
            <td style="padding:8px 12px;border:1px solid #e5e7eb;">${value || 'Not provided'}</td>
          </tr>
        `).join('')}
      </table>
      <h3 style="margin-top:24px;">Conversation Transcript</h3>
      <div style="background:#f9fafb;padding:16px;border-radius:8px;font-size:14px;line-height:1.6;">
        ${conversation.map((msg: { role: string; text: string }) => `
          <p style="margin:8px 0;">
            <strong style="color:${msg.role === 'treeko' ? '#1a472a' : '#1565C0'};">${msg.role === 'treeko' ? 'Treeko' : 'Visitor'}:</strong>
            ${msg.text}
          </p>
        `).join('')}
      </div>
      <hr style="margin-top:24px;"/>
      <p style="color:#6b7280;font-size:12px;">This lead was captured by Treeko, the BA Services website assistant, at ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET.</p>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Treeko <bookings@escape.baserves.com>',
        to: ['andrew@baserves.com', 'acadiamarketingmaine@gmail.com'],
        subject: `New Lead from Treeko: ${intakeData.name || intakeData.organization || 'Website Visitor'}`,
        html: htmlBody,
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('Resend error:', errText)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Intake email error:', error)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
