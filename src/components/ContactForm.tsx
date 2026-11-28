'use client'

import { useState, useEffect, useRef } from 'react'
import TurnstileWidget from '@/components/TurnstileWidget'
import Link from 'next/link'
import { BriefcaseIcon, HandshakeIcon, ClipboardIcon } from '@/components/Icons'

const topics = [
  { id: 'partnership', label: 'Partnerships & Inquiries', icon: <HandshakeIcon className="w-6 h-6" />, description: 'Explore a management partnership or send a message' },
  { id: 'careers', label: 'Careers', icon: <BriefcaseIcon className="w-6 h-6" />, description: 'Apply for a position with BA Services' },
  { id: 'feedback', label: 'Rest Stop Feedback', icon: <ClipboardIcon className="w-6 h-6" />, description: 'Share feedback about a rest area', href: '/leave-a-review' },
]

export default function ContactForm() {
  const [topic, setTopic] = useState<'partnership' | 'careers'>('partnership')

  // Read topic from URL params on mount without useSearchParams() so the form stays server-rendered
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('topic')
    if (t === 'feedback') {
      window.location.replace('/leave-a-review')
      return
    }
    if (t === 'careers' || t === 'partnership') {
      setTopic(t)
    }
  }, [])
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Partnership form
  const [partnerForm, setPartnerForm] = useState({ name: '', email: '', phone: '', organization: '', propertyType: '', location: '', message: '' })

  // Spam guards (see src/app/api/contact/route.ts). Invisible to real visitors:
  // a honeypot field only a bot will fill, and how long the form was open.
  const [honeypot, setHoneypot] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [turnstileReset, setTurnstileReset] = useState(0)
  const [partnerError, setPartnerError] = useState('')
  const formOpenedAt = useRef<number>(Date.now())
  useEffect(() => {
    if (topic === 'partnership') formOpenedAt.current = Date.now()
  }, [topic])

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPartnerError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: 'partnership',
          ...partnerForm,
          website: honeypot,
          elapsedMs: Date.now() - formOpenedAt.current,
          turnstileToken,
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setPartnerError(body.error || 'Something went wrong. Please try again, or call (207) 307-7903.')
        setTurnstileReset(n => n + 1)
        return
      }
      setSubmitted(true)
    } catch {
      setPartnerError('Something went wrong. Please try again, or call (207) 307-7903.')
      setTurnstileReset(n => n + 1)
    }
    finally { setSubmitting(false) }
  }


  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Thank you!</h2>
        <p className="text-gray-600 mb-6">We&apos;ve received your submission and will be in touch soon.</p>
        <button onClick={() => { setSubmitted(false); setTopic('partnership') }} className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-lake-ink/40 px-8 text-base font-medium text-lake-ink hover:bg-lake-ink/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce">
          Submit Another
        </button>
      </div>
    )
  }

  return (
    <div>
      <h2 className="font-lake-serif text-2xl sm:text-3xl text-lake-ink mb-2">Send Us a Message</h2>
      <p className="text-lake-mute mb-6">Use the form below for partnership or general inquiries, or switch topics for careers and rest area feedback.</p>

      {/* Topic switcher */}
      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        {topics.map((t) => {
          const isActive = topic === t.id
          const className = `rounded-md p-4 border transition-all text-left group ${
            isActive
              ? 'bg-lake-tint border-lake-spruce shadow-sm'
              : 'bg-white border-lake-line hover:border-lake-spruce/40 hover:shadow-sm'
          }`
          const inner = (
            <div className="flex items-start gap-3">
              <span className={`mt-0.5 shrink-0 ${isActive ? 'text-lake-spruce' : 'text-lake-mute group-hover:text-lake-spruce'}`}>{t.icon}</span>
              <div>
                <div className="text-sm font-bold text-gray-900 group-hover:text-lake-spruce transition-colors">{t.label}</div>
                <p className="text-xs text-gray-500 mt-0.5">{t.description}</p>
              </div>
            </div>
          )
          if ('href' in t && t.href) {
            return (
              <Link key={t.id} href={t.href} className={className}>
                {inner}
              </Link>
            )
          }
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTopic(t.id as 'partnership' | 'careers')}
              aria-pressed={isActive}
              className={className}
            >
              {inner}
            </button>
          )
        })}
      </div>

      {/* Careers → link to full application */}
      {topic === 'careers' && (
        <div className="bg-white rounded-md border border-lake-line p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Employment Application</h3>
          <p className="text-gray-600 mb-6">
            We&apos;re always looking for dedicated people to join our team across recreation areas and DOT rest area facilities nationwide.
          </p>
          <div className="bg-lake-tint rounded-md p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">What we offer:</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {['Competitive pay and benefits', 'Positions across 9 states', 'Recreation area and DOT rest area roles', 'Site Attendants, Maintenance Technicians, Area Managers', 'Training and certification programs'].map(item => (
                <li key={item} className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <Link href="/careers" className="inline-flex min-h-[56px] items-center gap-2 rounded-full bg-lake-spruce px-8 text-base font-medium text-lake-paper hover:bg-lake-spruce-dark transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce">
            Go to Full Application
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <p className="text-xs text-gray-500 mt-4">Or email your resume to <a href="mailto:OfficeManager@BAServes.com" className="text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink">OfficeManager@BAServes.com</a></p>
        </div>
      )}

      {/* Partnerships form */}
      {topic === 'partnership' && (
        <form onSubmit={handlePartnerSubmit} className="bg-white rounded-md border border-lake-line p-8 space-y-6">
          <p className="text-gray-600">Interested in partnering with BA Services for property management? Tell us about your facility.</p>
          {/* Honeypot — hidden from people and from screen readers, bots fill it. */}
          <div aria-hidden="true" className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input type="text" required value={partnerForm.name} onChange={e => setPartnerForm(p => ({ ...p, name: e.target.value }))} className="w-full px-4 py-2.5 border border-lake-line rounded-lg focus:ring-2 focus:ring-lake-spruce/30 focus:border-lake-spruce" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
              <input type="text" value={partnerForm.organization} onChange={e => setPartnerForm(p => ({ ...p, organization: e.target.value }))} className="w-full px-4 py-2.5 border border-lake-line rounded-lg focus:ring-2 focus:ring-lake-spruce/30 focus:border-lake-spruce" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" required value={partnerForm.email} onChange={e => setPartnerForm(p => ({ ...p, email: e.target.value }))} className="w-full px-4 py-2.5 border border-lake-line rounded-lg focus:ring-2 focus:ring-lake-spruce/30 focus:border-lake-spruce" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" value={partnerForm.phone} onChange={e => setPartnerForm(p => ({ ...p, phone: e.target.value }))} className="w-full px-4 py-2.5 border border-lake-line rounded-lg focus:ring-2 focus:ring-lake-spruce/30 focus:border-lake-spruce" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property/Facility Type</label>
              <select value={partnerForm.propertyType} onChange={e => setPartnerForm(p => ({ ...p, propertyType: e.target.value }))} className="w-full px-4 py-2.5 border border-lake-line rounded-lg focus:ring-2 focus:ring-lake-spruce/30 focus:border-lake-spruce">
                <option value="">Select type...</option>
                <option>Campground / Recreation Area</option>
                <option>State / National Park</option>
                <option>DOT Rest Area</option>
                <option>Welcome Center</option>
                <option>Conference / Retreat Center</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location (State/City)</label>
              <input type="text" value={partnerForm.location} onChange={e => setPartnerForm(p => ({ ...p, location: e.target.value }))} className="w-full px-4 py-2.5 border border-lake-line rounded-lg focus:ring-2 focus:ring-lake-spruce/30 focus:border-lake-spruce" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tell us about your needs *</label>
            <textarea required rows={4} value={partnerForm.message} onChange={e => setPartnerForm(p => ({ ...p, message: e.target.value }))} className="w-full px-4 py-2.5 border border-lake-line rounded-lg focus:ring-2 focus:ring-lake-spruce/30 focus:border-lake-spruce" placeholder="Describe your property, current challenges, and what you're looking for..." />
          </div>
          <TurnstileWidget onToken={setTurnstileToken} resetKey={turnstileReset} />
          {partnerError && (
            <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{partnerError}</p>
          )}
          <button type="submit" disabled={submitting} className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-lake-spruce px-8 text-base font-medium text-lake-paper hover:bg-lake-spruce-dark transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce">
            {submitting ? 'Sending...' : 'Submit Partnership Inquiry'}
          </button>
        </form>
      )}
    </div>
  )
}
