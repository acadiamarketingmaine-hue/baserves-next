'use client'

import ServiceAccordion from './ServiceAccordion'

export default function ScopeAccordion() {
  return (
    <div className="mt-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lake-spruce/10">
          <svg className="w-5 h-5 text-lake-spruce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <div>
          <h3 className="font-lake-serif text-[20px] text-lake-ink">Active Contracts &amp; Scope of Services</h3>
          <p className="text-sm text-lake-mute">Tap any contract group to explore our management portfolio</p>
        </div>
      </div>
      <ServiceAccordion compact tone="lake" />
    </div>
  )
}
