import nodemailer from 'nodemailer'

// SMTP transport (SiteGround) — the same mailbox the booking system sends from.
// Lazy singleton so a build without credentials still succeeds.
let transporter: nodemailer.Transporter | null = null

function getTransporter() {
  if (!transporter) {
    const host = process.env.SMTP_HOST
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    if (!host || !user || !pass) {
      throw new Error('SMTP_HOST, SMTP_USER and SMTP_PASS must be set in environment variables')
    }
    const port = Number(process.env.SMTP_PORT || 465)
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    })
  }
  return transporter
}

export interface SendMailOptions {
  to: string[]
  subject: string
  html: string
  cc?: string[]
  bcc?: string[]
  replyTo?: string
  /**
   * Only override when the address is on a domain this SMTP account is
   * authorised to send as. Anything else fails SPF and lands in spam.
   */
  from?: string
}

/** Drops empty/duplicate addresses so a missing map entry can't produce an invalid header. */
function addressList(addresses: string[] | undefined): string | undefined {
  if (!addresses?.length) return undefined
  const cleaned = Array.from(new Set(addresses.map(a => a.trim()).filter(Boolean)))
  return cleaned.length ? cleaned.join(', ') : undefined
}

export async function sendMail({ to, subject, html, cc, bcc, replyTo, from }: SendMailOptions) {
  const recipients = addressList(to)
  if (!recipients) throw new Error('sendMail called with no recipients')

  const info = await getTransporter().sendMail({
    from: from || process.env.FROM_EMAIL || 'BA Services <hello@baservicesbookings.com>',
    to: recipients,
    cc: addressList(cc),
    bcc: addressList(bcc),
    replyTo,
    subject,
    html,
  })

  return { id: info.messageId }
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
