'use client'

import { useState } from 'react'

const scopeCategories = [
  {
    title: 'Full-Service Facility Management',
    items: ['End-to-end management of DOT rest areas, view areas, and welcome centers', 'Daily operations and administration', 'Full staffing and workforce management', 'On-site oversight and quality control', 'Regulatory and safety compliance', 'Asset inventory and tracking'],
  },
  {
    title: 'Operations & Staffing',
    items: ['Trained Site Attendants at every location', 'Maintenance Technicians for repairs and upkeep', 'Area Managers for regional oversight', 'Dedicated Project Manager for statewide coordination', 'Continuous 24/7 operations coverage', 'Staff training and certification programs'],
  },
  {
    title: 'Janitorial & Sanitation',
    items: ['Continuous restroom cleaning and disinfecting', 'Replenishing soap, paper products, and supplies', 'Trash and waste removal on scheduled rotations', 'Interior and exterior surface cleaning', 'ADA restroom maintenance and compliance', 'Deep cleaning cycles and odor control'],
  },
  {
    title: 'Grounds & Site Maintenance',
    items: ['Lawn mowing, edging, and trimming', 'Vegetation management and weed control', 'Irrigation system maintenance', 'Litter and debris removal across all areas', 'Snow and ice removal for safe winter access', 'Parking lot and sidewalk upkeep'],
  },
  {
    title: 'Preventive & Corrective Maintenance',
    items: ['Plumbing systems and fixture repairs', 'Electrical systems and lighting maintenance', 'HVAC and climate control servicing', 'Mechanical and structural repairs', 'Preventive maintenance scheduling and inspections', 'Emergency and corrective repair response'],
  },
  {
    title: 'Utilities & Environmental Systems',
    items: ['Water systems operation and compliance testing', 'Wastewater management (septic, sewer, and lagoon)', 'Stormwater compliance and environmental reporting', 'Utility monitoring and conservation', 'Environmental regulatory adherence', 'System inspections and documentation'],
  },
  {
    title: 'Performance Monitoring & Compliance',
    items: ['24/7 emergency availability', 'On-site staffing during all operating hours', 'Uniform and professionalism standards', 'Safety and regulatory compliance', 'Routine quality inspections and scoring', 'Detailed reporting and documentation'],
  },
  {
    title: 'Customer Experience & Public Interface',
    items: ['Clean, safe, and welcoming facilities for travelers', 'Staff trained to assist the traveling public', 'Prompt response to visitor concerns', 'Professional presence at all locations', 'Accessibility and ADA compliance', 'Traveler information and wayfinding support'],
  },
]

export default function ScopeAccordion() {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-8">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-forest-DEFAULT/10 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-forest-DEFAULT" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <span className="font-bold text-gray-900 group-hover:text-forest-DEFAULT transition-colors">Scope of Services</span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? 'max-h-[2000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {scopeCategories.map((cat) => (
            <div key={cat.title} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h4 className="font-bold text-gray-900 text-sm mb-3">{cat.title}</h4>
              <ul className="space-y-2">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-start text-xs text-gray-600">
                    <svg className="w-3.5 h-3.5 mr-1.5 mt-0.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
