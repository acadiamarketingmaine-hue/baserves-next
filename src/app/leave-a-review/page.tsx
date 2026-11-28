'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { ALL_REST_AREAS, CAMPGROUND_SITES, siteForFareharborItem } from '@/data/managers'
import Footer from '@/components/Footer'
import { ListenButton } from '@/components/reader'
import {
  LakesideShell,
  Eyebrow,
  frame,
  bandTint,
  h2 as h2Class,
  pillLight,
  pillGhostLight,
} from '@/components/property/lakeside'

const ratingOptions = ['Excellent', 'Good', 'Fair', 'Poor']
const vendingOptions = ['Very satisfied', 'Satisfied', 'Neutral', 'Dissatisfied']

type Question = { name: string; label: string; options: string[]; wide?: boolean }

// Rest areas and campgrounds are judged on different things, so each gets its
// own question set. The `name` values are what /api/reviews reads.
const restAreaQuestions: Question[] = [
  { name: 'restroomCleanliness', label: 'Cleanliness of the restrooms today?', options: ratingOptions },
  { name: 'maintenance', label: 'Overall maintenance of this facility?', options: ratingOptions },
  { name: 'groundsCleanliness', label: 'Cleanliness of the grounds and parking?', options: ratingOptions },
  { name: 'vending', label: 'Satisfaction with vending offerings?', options: vendingOptions },
  { name: 'staffCourtesy', label: 'Courtesy of our staff?', options: ratingOptions, wide: true },
]

const campgroundQuestions: Question[] = [
  { name: 'accommodationCleanliness', label: 'Cleanliness of your cabin or site?', options: ratingOptions },
  { name: 'facilityCondition', label: 'Condition and upkeep of the facilities?', options: ratingOptions },
  { name: 'bathhouseCleanliness', label: 'Cleanliness of the restrooms and shower house?', options: ratingOptions },
  { name: 'groundsCleanliness', label: 'Cleanliness of the grounds?', options: ratingOptions },
  { name: 'checkInExperience', label: 'Check-in and arrival experience?', options: ratingOptions },
  { name: 'staffCourtesy', label: 'Courtesy of our staff?', options: ratingOptions },
]

const feedbackSteps = [
  {
    step: '01',
    title: 'Routed to the Site Manager',
    body: 'Every submission is tagged to the exact park, campground, or highway rest area you visited so it reaches the crew responsible for that location.',
  },
  {
    step: '02',
    title: 'Same-Day Crew Review',
    body: 'Facility managers review cleanliness, grounds, and maintenance notes daily to recognize great staff work and resolve any issue fast.',
  },
  {
    step: '03',
    title: 'Optional Direct Follow-Up',
    body: 'If you check the follow-up box and leave your contact details, a BA Services supervisor will reach out directly about your visit.',
  },
]

const blankForm = {
  reviewType: 'rest-area' as 'rest-area' | 'campground',
  restArea: '',
  site: '',
  restroomCleanliness: '',
  maintenance: '',
  groundsCleanliness: '',
  vending: '',
  staffCourtesy: '',
  accommodationCleanliness: '',
  facilityCondition: '',
  bathhouseCleanliness: '',
  checkInExperience: '',
  feedback: '',
  followUp: false,
  name: '',
  phone: '',
  email: '',
}

function FieldErrorBadge({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-red-700" role="alert">
      <span
        aria-hidden="true"
        className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-600 text-[11px] font-bold text-white"
      >
        !
      </span>
      <span>{message}</span>
    </p>
  )
}

export default function LeaveReviewPage() {
  const [formData, setFormData] = useState(blankForm)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const isCampground = formData.reviewType === 'campground'
  const questions = isCampground ? campgroundQuestions : restAreaQuestions

  // Switching category clears the previous set's answers so a half-filled rest
  // area review can't ride along on a campground submission.
  const selectReviewType = (reviewType: 'rest-area' | 'campground') => {
    setFormData({ ...blankForm, reviewType, name: formData.name, phone: formData.phone, email: formData.email })
    setFieldErrors({})
    setSubmitError(null)
  }

  // Post-stay survey links may pass ?item=<id> or ?site=<label> to preselect the park.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const fromItem = siteForFareharborItem(params.get('item'))
    const siteParam = params.get('site')
    const site = CAMPGROUND_SITES.some(s => s.label === siteParam) ? siteParam : fromItem
    const type = params.get('type')

    const reviewType =
      type === 'rest-area' || type === 'campground'
        ? type
        : site
          ? 'campground'
          : null

    if (!reviewType && !site) return

    setFormData(prev => ({
      ...prev,
      ...(reviewType ? { reviewType } : {}),
      ...(site ? { site } : {}),
    }))
  }, [])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validateForm = () => {
    const nextErrors: Record<string, string> = {}
    const locationKey = isCampground ? 'site' : 'restArea'
    if (!formData[locationKey]) {
      nextErrors[locationKey] = isCampground
        ? 'Please select the campground or park you visited.'
        : 'Please select the rest area you visited.'
    }
    for (const q of questions) {
      const val = (formData as Record<string, string | boolean>)[q.name]
      if (!val) {
        nextErrors[q.name] = 'Please choose a rating.'
      }
    }
    return nextErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    const nextErrors = validateForm()
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors)
      const firstKey = Object.keys(nextErrors)[0]
      const el = document.getElementById(firstKey)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        el.focus({ preventScroll: true })
      }
      return
    }

    setFieldErrors({})
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        setSubmitError('We could not save your feedback right now. Please try again or call +1 207 307-7903.')
      }
    } catch {
      setSubmitError('Network error while submitting feedback. Please try again.')
    }

    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const copy = { ...prev }
        delete copy[name]
        return copy
      })
    }
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      <LakesideShell>
        {/* Band 1: Hook — Clean Above-the-Fold Hero */}
        <section className="relative pt-32 pb-20 bg-lake-spruce overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('/images/Burlingame1-2048x1365.jpg')" }}
            aria-hidden="true"
          />
          <div className={`relative z-10 ${frame}`}>
            <div className="max-w-3xl">
              <h1 className="font-lake-serif headline-xl text-white mb-4">
                Share Your Park or Rest Area Experience
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-white/95 mb-5 leading-snug">
                Direct feedback to the on-site crews who maintain your destination.
              </h2>
              <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-2xl">
                Every note helps our campground hosts and rest area teams keep facilities spotless, safe, and welcoming.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href="#feedback-form" className={pillLight}>
                  Start Your Review
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>
                <a href="tel:+12073077903" className={pillGhostLight}>
                  Call +1 207 307-7903
                </a>
              </div>
              <div className="mt-6">
                <ListenButton variant="light" />
              </div>
            </div>
          </div>
        </section>

        {/* Band 2: Peak Interest & Mechanism */}
        <section className={`py-14 md:py-20 ${bandTint}`}>
          <div className={frame}>
            <div className="max-w-3xl mb-10">
              <Eyebrow label="Why Your Review Matters" rule className="mb-4" />
              <h2 className={`${h2Class} text-lake-ink mb-4`}>
                How Your Feedback Improves Every Site
              </h2>
              <p className="text-lg text-lake-mute leading-relaxed">
                We read every visitor comment and route it straight to the local operations team managing that property.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {feedbackSteps.map((item) => (
                <div key={item.step} className="bg-white border border-lake-line rounded-md p-6">
                  <span className="text-xs font-semibold tracking-widest text-lake-spruce uppercase block mb-2">
                    Step {item.step}
                  </span>
                  <h3 className="font-lake-serif text-xl text-lake-ink mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-lake-mute leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Band 3: Feedback Form */}
        <section id="feedback-form" className="py-14 md:py-24">
          <div className={frame}>
            <div className="max-w-3xl mx-auto">
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-md p-10 md:p-12 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="font-lake-serif text-3xl text-lake-ink mb-4">Thank You for Your Feedback</h2>
                  <p className="text-lake-mute mb-8 leading-relaxed">
                    We appreciate you taking the time to share your experience. Your feedback goes directly to our operations team. <Link href="/experiences" className="text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink">Explore our recreation areas</Link> for your next visit, or <Link href="/contact" className="text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink">contact us</Link> with any questions.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setFormData(blankForm)
                      setFieldErrors({})
                      setSubmitError(null)
                    }}
                    className="inline-flex min-h-[44px] items-center text-lake-ink font-semibold underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink"
                  >
                    Submit Another Review
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-white rounded-md border border-lake-line p-6 md:p-12"
                >
                  <h2 className="font-lake-serif text-3xl text-lake-ink mb-8">
                    {isCampground ? 'Campground Feedback Form' : 'Rest Area Feedback Form'}
                  </h2>

                  {/* What are you reviewing? */}
                  <fieldset className="mb-6">
                    <legend className="block text-sm font-medium text-lake-ink mb-2">
                      What would you like to give feedback on? *
                    </legend>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {([
                        { value: 'rest-area', title: 'A rest area', detail: 'Utah and Iowa rest areas we maintain' },
                        { value: 'campground', title: 'A campground or park', detail: 'Cabins, campsites and day use' },
                      ] as const).map(option => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => selectReviewType(option.value)}
                          aria-pressed={formData.reviewType === option.value}
                          className={`text-left px-4 py-3 min-h-[56px] rounded-lg border transition-colors ${
                            formData.reviewType === option.value
                              ? 'border-lake-spruce bg-lake-spruce/5 ring-2 ring-lake-spruce'
                              : 'border-lake-line hover:border-lake-moss bg-white'
                          }`}
                        >
                          <span className="block font-semibold text-lake-ink">{option.title}</span>
                          <span className="block text-sm text-lake-mute">{option.detail}</span>
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  {/* Location Selection */}
                  {isCampground ? (
                    <div className="mb-6">
                      <label htmlFor="site" className="block text-sm font-medium text-lake-ink mb-2">
                        Which campground or park did you visit? *
                      </label>
                      <select
                        id="site"
                        name="site"
                        required
                        aria-invalid={Boolean(fieldErrors.site)}
                        value={formData.site}
                        onChange={handleChange}
                        className={`w-full min-h-[48px] px-4 py-3 text-base border rounded-lg focus:ring-2 focus:border-transparent bg-white ${
                          fieldErrors.site
                            ? 'border-red-600 ring-2 ring-red-600/20 focus:ring-red-600'
                            : 'border-lake-line focus:ring-lake-spruce'
                        }`}
                      >
                        <option value="">Select a location</option>
                        {CAMPGROUND_SITES.map(({ label }) => (
                          <option key={label} value={label}>{label}</option>
                        ))}
                      </select>
                      <FieldErrorBadge message={fieldErrors.site} />
                    </div>
                  ) : (
                    <div className="mb-6">
                      <label htmlFor="restArea" className="block text-sm font-medium text-lake-ink mb-2">
                        Which rest area did you visit? *
                      </label>
                      <select
                        id="restArea"
                        name="restArea"
                        required
                        aria-invalid={Boolean(fieldErrors.restArea)}
                        value={formData.restArea}
                        onChange={handleChange}
                        className={`w-full min-h-[48px] px-4 py-3 text-base border rounded-lg focus:ring-2 focus:border-transparent bg-white ${
                          fieldErrors.restArea
                            ? 'border-red-600 ring-2 ring-red-600/20 focus:ring-red-600'
                            : 'border-lake-line focus:ring-lake-spruce'
                        }`}
                      >
                        <option value="">Select a rest area</option>
                        {(['Utah', 'Iowa'] as const).map(group => (
                          <optgroup key={group} label={group}>
                            {ALL_REST_AREAS.filter(a => a.group === group).map(({ label }) => (
                              <option key={label} value={label}>{label}</option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      <FieldErrorBadge message={fieldErrors.restArea} />
                    </div>
                  )}

                  {/* Ratings Grid */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {questions.map(({ name, label, options, wide }) => (
                      <div key={name} className={wide ? 'md:col-span-2' : undefined}>
                        <label htmlFor={name} className="block text-sm font-medium text-lake-ink mb-2">
                          {label} *
                        </label>
                        <select
                          id={name}
                          name={name}
                          required
                          aria-invalid={Boolean(fieldErrors[name])}
                          value={(formData as Record<string, string | boolean>)[name] as string}
                          onChange={handleChange}
                          className={`w-full min-h-[48px] px-4 py-3 text-base border rounded-lg focus:ring-2 focus:border-transparent bg-white ${
                            fieldErrors[name]
                              ? 'border-red-600 ring-2 ring-red-600/20 focus:ring-red-600'
                              : 'border-lake-line focus:ring-lake-spruce'
                          }`}
                        >
                          <option value="">Select rating</option>
                          {options.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        <FieldErrorBadge message={fieldErrors[name]} />
                      </div>
                    ))}
                  </div>

                  {/* Feedback */}
                  <div className="mb-6">
                    <label htmlFor="feedback" className="block text-sm font-medium text-lake-ink mb-2">
                      Based upon this visit, do you have any concerns, suggestions or compliments that will help us better serve our visitors?
                    </label>
                    <textarea
                      id="feedback"
                      name="feedback"
                      rows={5}
                      value={formData.feedback}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-base border border-lake-line rounded-lg focus:ring-2 focus:ring-lake-spruce focus:border-transparent resize-none"
                      placeholder="Share details from your visit..."
                    />
                  </div>

                  {/* Follow Up Checkbox */}
                  <div className="mb-8">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="followUp"
                        checked={formData.followUp}
                        onChange={handleChange}
                        className="w-5 h-5 mt-0.5 text-lake-spruce rounded-lg focus:ring-lake-spruce"
                      />
                      <span className="text-sm text-lake-ink">
                        If your feedback highlights any issues, may we follow up with you directly? Yes, you may contact me.
                      </span>
                    </label>
                  </div>

                  {/* Contact Info */}
                  <div className="border-t border-lake-line pt-8 mb-8">
                    <h3 className="text-lg font-semibold text-lake-ink mb-4">Your Contact Information (Optional)</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-lake-ink mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full min-h-[48px] px-4 py-3 text-base border border-lake-line rounded-lg focus:ring-2 focus:ring-lake-spruce focus:border-transparent"
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-lake-ink mb-2">
                          Your Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full min-h-[48px] px-4 py-3 text-base border border-lake-line rounded-lg focus:ring-2 focus:ring-lake-spruce focus:border-transparent"
                          placeholder="(555) 555-5555"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-lake-ink mb-2">
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full min-h-[48px] px-4 py-3 text-base border border-lake-line rounded-lg focus:ring-2 focus:ring-lake-spruce focus:border-transparent"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  {submitError && (
                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
                      {submitError}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto min-h-[56px] px-8 py-4 rounded-full bg-lake-spruce text-lake-paper font-semibold hover:bg-lake-spruce-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake-spruce"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Submit Feedback'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Band 4: Closing Conversion Door */}
        <section className={`py-14 md:py-20 ${bandTint}`}>
          <div className={`${frame} text-center`}>
            <h2 className="font-lake-serif text-3xl md:text-4xl text-lake-ink mb-4">
              Planning Your Next Outdoor Visit?
            </h2>
            <p className="text-lake-mute max-w-2xl mx-auto leading-relaxed">
              Explore our <Link href="/experiences" className="text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink">managed parks and campgrounds</Link>, learn about our <Link href="/services" className="text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink">facility management services</Link>, or check out <Link href="/careers" className="text-lake-ink underline decoration-lake-line decoration-1 underline-offset-[6px] hover:decoration-lake-ink">career opportunities</Link> with BA Services.
            </p>
          </div>
        </section>
      </LakesideShell>

      <Footer />
    </main>
  )
}
