'use client'

import ServiceAccordion from './ServiceAccordion'

export default function ScopeAccordion() {
  return (
    <div className="mt-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-forest-DEFAULT/10 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-forest-DEFAULT" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Active Contracts & Scope of Services</h3>
          <p className="text-sm text-gray-500">Tap any contract group to explore our management portfolio</p>
        </div>
      </div>
      <ServiceAccordion compact />
    </div>
  )
}
