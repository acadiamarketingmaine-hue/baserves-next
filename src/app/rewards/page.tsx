'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const tiers = [
  {
    name: 'Explorer',
    minNights: 0,
    maxNights: 9,
    color: 'bg-gray-100',
    textColor: 'text-gray-700',
    benefits: [
      '5% off future bookings',
      'Early access to new locations',
      'Exclusive member newsletter',
    ],
  },
  {
    name: 'Adventurer',
    minNights: 10,
    maxNights: 24,
    color: 'bg-amber-100',
    textColor: 'text-amber-700',
    benefits: [
      '10% off future bookings',
      'Free firewood bundle per stay',
      'Priority customer support',
      'Birthday bonus points',
    ],
  },
  {
    name: 'Trailblazer',
    minNights: 25,
    maxNights: 49,
    color: 'bg-emerald-100',
    textColor: 'text-emerald-700',
    benefits: [
      '15% off future bookings',
      'Free late checkout (when available)',
      'Complimentary site upgrades',
      'Exclusive gear discounts',
      'Member-only events',
    ],
  },
  {
    name: 'Legend',
    minNights: 50,
    maxNights: null,
    color: 'bg-purple-100',
    textColor: 'text-purple-700',
    benefits: [
      '20% off all bookings',
      'Free early check-in & late checkout',
      'Guaranteed site availability (48hr notice)',
      'Annual free night certificate',
      'VIP event access',
      'Personal concierge service',
    ],
  },
]

const faqs = [
  {
    question: 'How do I earn reward nights?',
    answer: 'Every night you stay at a BA Serves location counts toward your reward tier. Book through our website or app to ensure your nights are tracked.',
  },
  {
    question: 'Do my reward nights expire?',
    answer: 'Reward nights are tracked on a rolling 12-month basis. Stay active by booking at least once per year to maintain your tier status.',
  },
  {
    question: 'Can I combine rewards with other discounts?',
    answer: 'Member discounts can be combined with most promotions unless otherwise stated. Some blackout dates may apply during peak seasons.',
  },
  {
    question: 'How do I redeem my rewards?',
    answer: 'Rewards are automatically applied when you book while logged into your account. You\'ll see your discount at checkout.',
  },
]

export default function RewardsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0">
          <Image
            src="/images/Burlingame1-2048x1365.jpg"
            alt="BA Serves Rewards"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative container-custom px-6">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-sm font-medium rounded-full mb-4">Rewards Program</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              BA Serves <span className="text-green-400">Rewards</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              The more you explore, the more you earn. Join our rewards program and unlock exclusive benefits with every stay.
            </p>
            <a
              href="https://escape.baserves.com/customer/login"
              className="inline-flex items-center gap-2 px-6 py-3 bg-forest-DEFAULT text-white font-semibold rounded-lg hover:bg-forest-dark transition-colors"
            >
              Join Now - It's Free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-forest-DEFAULT">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Sign Up Free</h3>
              <p className="text-white/70">Create an account on our booking platform. It only takes a minute.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Stay & Earn</h3>
              <p className="text-white/70">Every night you stay at a BA Serves location earns you progress toward the next tier.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Enjoy Rewards</h3>
              <p className="text-white/70">Unlock discounts, perks, and exclusive benefits as you level up.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reward Tiers */}
      <section className="py-16">
        <div className="container-custom px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Reward Tiers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Progress through our tiers by staying more nights. The higher your tier, the better your rewards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <div key={tier.name} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className={`${tier.color} p-6 text-center`}>
                  <h3 className={`text-2xl font-bold ${tier.textColor}`}>{tier.name}</h3>
                  <p className={`text-sm ${tier.textColor} opacity-80`}>
                    {tier.maxNights ? `${tier.minNights}-${tier.maxNights} nights/year` : `${tier.minNights}+ nights/year`}
                  </p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-forest-DEFAULT flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm">
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest-DEFAULT">
        <div className="container-custom px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Earning?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Join the BA Serves Rewards program today and start enjoying exclusive benefits on your very next stay.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://escape.baserves.com/customer/login"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-forest-DEFAULT font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Create Account
            </a>
            <Link
              href="/experiences"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-forest-DEFAULT transition-colors"
            >
              Browse Locations
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
