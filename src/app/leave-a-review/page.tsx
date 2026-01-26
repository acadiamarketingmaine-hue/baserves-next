'use client'

import { useState } from 'react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const restAreas = [
  'Bear Lake - SR-30 - Laketown, Utah',
  'Bear Lake Overlook - SR-89 - Garden City, Utah',
  'Brigham City - I-15 - Brigham City, Utah',
  'Crescent Junction - I-70 - Crescent Junction, Utah',
  'Echo Canyon Eastbound - I-80S - Coalville, Utah',
  'Echo Canyon Westbound - I-80N - Echo, Utah',
  'Grassy Mountain Eastbound - I-80S - Wendover, Utah',
  'Grassy Mountain Westbound - I-80N - Wendover, Utah',
  "Hoover's - US-89 - Sevier, Utah",
  'Ivie Creek - I-70 - Salina, Utah',
  'Jensen Welcome Center - US-40 - Jensen, Utah',
  'Kanarraville Northbound - I-15N - Cedar City, Utah',
  'Kanarraville Southbound - I-15S - Cedar City, Utah',
  'Kane Springs - US-191 - Monticello, Utah',
  'Lunt Park Northbound - I-15S - Paragonah, Utah',
  'Lunt Park Southbound - I-15N - Paragonah, Utah',
  'Mountain Green - I-84 - Morgan, Utah',
  'Oak Springs - SR-24 - Richfield, Utah',
  'Perry - I-15 - Perry, Utah',
  'Pinion Ridge - US-40 - Duchesne, Utah',
  'Salt Flats Eastbound - I-80N - Wendover, Utah',
  'Salt Flats Westbound - I-80S - Wendover, Utah',
  'Shingle Creek - US-89 - Glendale, Utah',
  'Silver City - US-6 - Jericho Junction, Utah',
  'The Pines - SR-12 - Bryce Canyon City, Utah',
  'Thompson Springs - I-70 - Thompson Springs, Utah',
  'Tie-Fork - US-6 - Spanish Fork, Utah',
  'Weber Canyon - I-84 - Morgan, Utah',
]

const ratingOptions = ['Excellent', 'Good', 'Fair', 'Poor']
const vendingOptions = ['Very satisfied', 'Satisfied', 'Neutral', 'Dissatisfied']

export default function LeaveReviewPage() {
  const [formData, setFormData] = useState({
    restArea: '',
    restroomCleanliness: '',
    maintenance: '',
    groundsCleanliness: '',
    vending: '',
    staffCourtesy: '',
    feedback: '',
    followUp: false,
    name: '',
    phone: '',
    email: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://formspree.io/f/xpwzgvqk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: `Rest Area Feedback: ${formData.restArea}`,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }

    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0">
          <Image
            src="/images/Burlingame1-2048x1365.jpg"
            alt="Leave a Review"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative container-custom px-6">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-sm font-medium rounded-full mb-4">Feedback</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Submit Your <span className="text-green-400">Feedback</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Your feedback helps us maintain the highest standards at our rest areas. Please take a moment to share your experience.
            </p>
          </div>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="py-16">
        <div className="container-custom px-6">
          <div className="max-w-3xl mx-auto">
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You for Your Feedback!</h2>
                <p className="text-gray-600 mb-8">
                  We appreciate you taking the time to share your experience. Your feedback helps us continue to improve our services.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({
                      restArea: '',
                      restroomCleanliness: '',
                      maintenance: '',
                      groundsCleanliness: '',
                      vending: '',
                      staffCourtesy: '',
                      feedback: '',
                      followUp: false,
                      name: '',
                      phone: '',
                      email: '',
                    })
                  }}
                  className="text-forest-DEFAULT font-semibold hover:underline"
                >
                  Submit Another Review
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Rest Area Feedback Form</h2>

                {/* Rest Area Selection */}
                <div className="mb-6">
                  <label htmlFor="restArea" className="block text-sm font-medium text-gray-700 mb-2">
                    Which rest area did you visit? *
                  </label>
                  <select
                    id="restArea"
                    name="restArea"
                    required
                    value={formData.restArea}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-DEFAULT focus:border-transparent bg-white"
                  >
                    <option value="">Select a rest area</option>
                    {restAreas.map((area) => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>

                {/* Ratings Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="restroomCleanliness" className="block text-sm font-medium text-gray-700 mb-2">
                      Cleanliness of the restrooms today? *
                    </label>
                    <select
                      id="restroomCleanliness"
                      name="restroomCleanliness"
                      required
                      value={formData.restroomCleanliness}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-DEFAULT focus:border-transparent bg-white"
                    >
                      <option value="">Select rating</option>
                      {ratingOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="maintenance" className="block text-sm font-medium text-gray-700 mb-2">
                      Overall maintenance of this facility? *
                    </label>
                    <select
                      id="maintenance"
                      name="maintenance"
                      required
                      value={formData.maintenance}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-DEFAULT focus:border-transparent bg-white"
                    >
                      <option value="">Select rating</option>
                      {ratingOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="groundsCleanliness" className="block text-sm font-medium text-gray-700 mb-2">
                      Cleanliness of the grounds and parking? *
                    </label>
                    <select
                      id="groundsCleanliness"
                      name="groundsCleanliness"
                      required
                      value={formData.groundsCleanliness}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-DEFAULT focus:border-transparent bg-white"
                    >
                      <option value="">Select rating</option>
                      {ratingOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="vending" className="block text-sm font-medium text-gray-700 mb-2">
                      Satisfaction with vending offerings? *
                    </label>
                    <select
                      id="vending"
                      name="vending"
                      required
                      value={formData.vending}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-DEFAULT focus:border-transparent bg-white"
                    >
                      <option value="">Select rating</option>
                      {vendingOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="staffCourtesy" className="block text-sm font-medium text-gray-700 mb-2">
                      Courtesy of our staff? *
                    </label>
                    <select
                      id="staffCourtesy"
                      name="staffCourtesy"
                      required
                      value={formData.staffCourtesy}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-DEFAULT focus:border-transparent bg-white"
                    >
                      <option value="">Select rating</option>
                      {ratingOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Feedback */}
                <div className="mb-6">
                  <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                    Based upon this visit, do you have any concerns, suggestions or compliments that will help us better service our visitors?
                  </label>
                  <textarea
                    id="feedback"
                    name="feedback"
                    rows={5}
                    value={formData.feedback}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-DEFAULT focus:border-transparent resize-none"
                    placeholder="Your feedback..."
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
                      className="w-5 h-5 mt-0.5 text-forest-DEFAULT rounded focus:ring-forest-DEFAULT"
                    />
                    <span className="text-sm text-gray-700">
                      If your feedback highlights any issues, may we follow up with you directly? Yes, you may contact me.
                    </span>
                  </label>
                </div>

                {/* Contact Info */}
                <div className="border-t pt-8 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Contact Information</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-DEFAULT focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-DEFAULT focus:border-transparent"
                        placeholder="(555) 555-5555"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-DEFAULT focus:border-transparent"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-4 bg-forest-DEFAULT text-white font-semibold rounded-lg hover:bg-forest-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
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

      <Footer />
    </main>
  )
}
