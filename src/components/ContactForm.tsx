'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { BriefcaseIcon, HandshakeIcon, ClipboardIcon } from '@/components/Icons'

const topics = [
  { id: 'careers', label: 'Careers', icon: <BriefcaseIcon className="w-8 h-8" />, description: 'Apply for a position with BA Services' },
  { id: 'partnership', label: 'Partnerships', icon: <HandshakeIcon className="w-8 h-8" />, description: 'Explore a management partnership' },
  { id: 'feedback', label: 'Rest Stop Feedback', icon: <ClipboardIcon className="w-8 h-8" />, description: 'Share feedback about a rest area' },
]

const utahRestAreas = [
  'Bear Lake Overlook', 'Bear Lake', 'Brigham City', 'Echo Canyon Eastbound', 'Echo Canyon Westbound',
  'Grassy Mountain Eastbound', 'Grassy Mountain Westbound', 'Mountain Green', 'Perry',
  'Salt Flats Eastbound', 'Salt Flats Westbound', 'Weber Canyon',
  'Crescent Junction', 'Ivie Creek', 'Jensen', 'Kane Springs', 'Pinion Ridge',
  'Silver City', 'Thompson Springs', 'Tie-Fork',
  "Hoover's", 'Kanarraville Northbound', 'Kanarraville Southbound',
  'Lunt Park Northbound', 'Lunt Park Southbound', 'Oak Springs', 'Shingle Creek', 'The Pines',
]

const iowaRestAreas = ['Sergeant Bluff Northbound', 'Sergeant Bluff Southbound']

const ratings = ['Excellent', 'Good', 'Fair', 'Poor']

export default function ContactForm() {
  const searchParams = useSearchParams()
  const [topic, setTopic] = useState<string | null>(null)

  // Read topic from URL params (works with Next.js client-side navigation)
  useEffect(() => {
    const t = searchParams.get('topic')
    if (t && ['careers', 'partnership', 'feedback'].includes(t)) {
      setTopic(t)
    }
  }, [searchParams])
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Partnership form
  const [partnerForm, setPartnerForm] = useState({ name: '', email: '', phone: '', organization: '', propertyType: '', location: '', message: '' })

  // Feedback form
  const [feedbackForm, setFeedbackForm] = useState({ restArea: '', restrooms: '', maintenance: '', grounds: '', staff: '', feedback: '', name: '', email: '', followUp: false })

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: 'partnership', ...partnerForm }),
      })
      setSubmitted(true)
    } catch { setSubmitted(true) }
    finally { setSubmitting(false) }
  }

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch('https://formspree.io/f/xpwzgvqk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: `Rest Area Feedback: ${feedbackForm.restArea}`,
          ...feedbackForm,
        }),
      })
      setSubmitted(true)
    } catch { setSubmitted(true) }
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
        <button onClick={() => { setSubmitted(false); setTopic(null) }} className="btn-secondary">
          Submit Another
        </button>
      </div>
    )
  }

  // Topic selection
  if (!topic) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">What can we help you with?</h2>
        <p className="text-gray-600 mb-8">Select a topic and we&apos;ll show you the right form.</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => setTopic(t.id)}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg hover:border-forest-DEFAULT/30 transition-all text-left group"
            >
              <span className="text-3xl mb-4 block">{t.icon}</span>
              <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-forest-DEFAULT transition-colors">{t.label}</h3>
              <p className="text-sm text-gray-500">{t.description}</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const selectedTopic = topics.find(t => t.id === topic)

  return (
    <div>
      {/* Topic header with back button */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setTopic(null)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <span className="text-2xl mr-2">{selectedTopic?.icon}</span>
          <span className="text-xl font-bold text-gray-900">{selectedTopic?.label}</span>
        </div>
      </div>

      {/* Careers → link to full application */}
      {topic === 'careers' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Employment Application</h3>
          <p className="text-gray-600 mb-6">
            We&apos;re always looking for dedicated people to join our team across recreation areas and DOT rest area facilities nationwide.
          </p>
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">What we offer:</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {['Competitive pay and benefits', 'Positions across 7+ states', 'Recreation area and DOT rest area roles', 'Site Attendants, Maintenance Technicians, Area Managers', 'Training and certification programs'].map(item => (
                <li key={item} className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <Link href="/careers" className="btn-primary inline-flex items-center gap-2">
            Go to Full Application
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <p className="text-xs text-gray-400 mt-4">Or email your resume to <a href="mailto:OfficeManager@BAServes.com" className="text-forest-DEFAULT underline">OfficeManager@BAServes.com</a></p>
        </div>
      )}

      {/* Partnerships form */}
      {topic === 'partnership' && (
        <form onSubmit={handlePartnerSubmit} className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
          <p className="text-gray-600">Interested in partnering with BA Services for property management? Tell us about your facility.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input type="text" required value={partnerForm.name} onChange={e => setPartnerForm(p => ({ ...p, name: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-DEFAULT/30 focus:border-forest-DEFAULT" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
              <input type="text" value={partnerForm.organization} onChange={e => setPartnerForm(p => ({ ...p, organization: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-DEFAULT/30 focus:border-forest-DEFAULT" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" required value={partnerForm.email} onChange={e => setPartnerForm(p => ({ ...p, email: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-DEFAULT/30 focus:border-forest-DEFAULT" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" value={partnerForm.phone} onChange={e => setPartnerForm(p => ({ ...p, phone: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-DEFAULT/30 focus:border-forest-DEFAULT" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property/Facility Type</label>
              <select value={partnerForm.propertyType} onChange={e => setPartnerForm(p => ({ ...p, propertyType: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-DEFAULT/30 focus:border-forest-DEFAULT">
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
              <input type="text" value={partnerForm.location} onChange={e => setPartnerForm(p => ({ ...p, location: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-DEFAULT/30 focus:border-forest-DEFAULT" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tell us about your needs *</label>
            <textarea required rows={4} value={partnerForm.message} onChange={e => setPartnerForm(p => ({ ...p, message: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-DEFAULT/30 focus:border-forest-DEFAULT" placeholder="Describe your property, current challenges, and what you're looking for..." />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary">
            {submitting ? 'Sending...' : 'Submit Partnership Inquiry'}
          </button>
        </form>
      )}

      {/* Rest Stop Feedback form */}
      {topic === 'feedback' && (
        <form onSubmit={handleFeedbackSubmit} className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
          <p className="text-gray-600">Help us improve! Share your experience at one of our managed rest areas.</p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rest Area *</label>
            <select required value={feedbackForm.restArea} onChange={e => setFeedbackForm(p => ({ ...p, restArea: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-DEFAULT/30 focus:border-forest-DEFAULT">
              <option value="">Select a rest area...</option>
              <optgroup label="Iowa">
                {iowaRestAreas.map(ra => <option key={ra}>{ra}</option>)}
              </optgroup>
              <optgroup label="Utah">
                {utahRestAreas.map(ra => <option key={ra}>{ra}</option>)}
              </optgroup>
            </select>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { key: 'restrooms', label: 'Restroom Cleanliness' },
              { key: 'maintenance', label: 'Overall Maintenance' },
              { key: 'grounds', label: 'Grounds & Parking' },
              { key: 'staff', label: 'Staff Courtesy' },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label} *</label>
                <select required value={(feedbackForm as any)[key]} onChange={e => setFeedbackForm(p => ({ ...p, [key]: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-DEFAULT/30 focus:border-forest-DEFAULT">
                  <option value="">Rate...</option>
                  {ratings.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Feedback</label>
            <textarea rows={4} value={feedbackForm.feedback} onChange={e => setFeedbackForm(p => ({ ...p, feedback: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-DEFAULT/30 focus:border-forest-DEFAULT" placeholder="Tell us more about your experience..." />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name (optional)</label>
              <input type="text" value={feedbackForm.name} onChange={e => setFeedbackForm(p => ({ ...p, name: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-DEFAULT/30 focus:border-forest-DEFAULT" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
              <input type="email" value={feedbackForm.email} onChange={e => setFeedbackForm(p => ({ ...p, email: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-DEFAULT/30 focus:border-forest-DEFAULT" />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" checked={feedbackForm.followUp} onChange={e => setFeedbackForm(p => ({ ...p, followUp: e.target.checked }))} className="rounded text-forest-DEFAULT focus:ring-forest-DEFAULT" />
            May we follow up with you if needed?
          </label>
          <button type="submit" disabled={submitting} className="btn-primary">
            {submitting ? 'Sending...' : 'Submit Feedback'}
          </button>
        </form>
      )}
    </div>
  )
}
