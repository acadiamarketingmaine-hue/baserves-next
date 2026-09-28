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
  /** Plain-text body; derived from `html` when omitted (HTML-only mail scores worse with Microsoft 365 filters). */
  text?: string
}

/** Readable plain-text version of an HTML email body. */
function htmlToText(html: string): string {
  return html
    .replace(/<(style|script)[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|tr|h[1-6]|li|table)>/gi, '\n')
    .replace(/<\/t[dh]>/gi, '\t')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/** Drops empty/duplicate addresses so a missing map entry can't produce an invalid header. */
function addressList(addresses: string[] | undefined): string | undefined {
  if (!addresses?.length) return undefined
  const cleaned = Array.from(new Set(addresses.map(a => a.trim()).filter(Boolean)))
  return cleaned.length ? cleaned.join(', ') : undefined
}

export async function sendMail({ to, subject, html, cc, bcc, replyTo, from, text }: SendMailOptions) {
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
    text: text || htmlToText(html),
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
