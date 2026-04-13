'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ContractGroup {
  id: string
  label: string
  badge: string
  badgeColor: string
  contracts: {
    name: string
    href: string
    location: string
    stats: string
    scope: { title: string; items: string[] }[]
  }[]
}

const contractGroups: ContractGroup[] = [
  {
    id: 'dot',
    label: 'DOT Rest Area Management',
    badge: 'Government Contracts',
    badgeColor: 'bg-blue-50 text-blue-700',
    contracts: [
      {
        name: 'Utah Department of Transportation',
        href: '/services/utah-dot',
        location: 'Statewide — 3 Regions',
        stats: '28 Rest Areas',
        scope: [
          { title: 'Facility Management', items: ['End-to-end operations for 28 rest areas, view areas, and welcome centers', 'Daily operations, staffing, and workforce management', '24/7 emergency availability and continuous coverage'] },
          { title: 'Janitorial & Sanitation', items: ['Restroom cleaning and disinfecting to minimum "B" rating', 'Supply replenishment and deep cleaning cycles', 'Interior/exterior surface cleaning and odor control'] },
          { title: 'Grounds & Infrastructure', items: ['Lawn care, irrigation, and vegetation management', 'Snow and ice removal across all elevations', 'Plumbing, electrical, HVAC, and mechanical maintenance'] },
          { title: 'Utilities & Compliance', items: ['Water and wastewater system management', 'Stormwater and environmental compliance', 'Performance monitoring, inspections, and reporting'] },
        ],
      },
      {
        name: 'Iowa Department of Transportation',
        href: '/services/iowa-dot',
        location: 'I-29 Corridor — Sergeant Bluff',
        stats: '2 Rest Areas',
        scope: [
          { title: 'Staffing & Operations', items: ['Trained attendants during all operating hours', 'Continuously staffed with no service gaps', 'Professionally uniformed personnel'] },
          { title: 'Interior & Exterior Janitorial', items: ['Continuous restroom cleaning and deep cleaning schedules', 'ADA restroom maintenance and floor scrubbing', 'Daily litter removal, sidewalk washing, landscaping'] },
          { title: 'Safety & Monitoring', items: ['Facility monitoring for vandalism and safety hazards', 'Daily logs, incident reports, and immediate response', 'Coordination with Iowa DOT on all maintenance'] },
        ],
      },
    ],
  },
  {
    id: 'national-forest',
    label: 'National Forest Concessions',
    badge: 'USDA Forest Service',
    badgeColor: 'bg-green-50 text-green-700',
    contracts: [
      {
        name: 'Bankhead National Forest',
        href: '/bankhead-national-forest',
        location: 'Northwest Alabama',
        stats: '180,000+ Acres — 2 Recreation Areas',
        scope: [
          { title: 'Guest Services', items: ['Campground check-in and visitor assistance', 'Retail and camp store operations', 'Family-oriented programming and public outreach'] },
          { title: 'Operations & Maintenance', items: ['Grounds maintenance, road and trail upkeep', 'Facility repairs, water systems, waste disposal', 'Environmental remediation and bio-hazard response'] },
        ],
      },
      {
        name: 'Hoosier National Forest',
        href: '/hoosier-national-forest',
        location: 'Southern Indiana',
        stats: '3 Recreation Areas — 295+ Campsites',
        scope: [
          { title: 'Recreation Operations', items: ['Campground and day-use area management', 'Visitor services and guest experience programs', 'Revenue collection and administrative reporting'] },
          { title: 'Facility & Environmental', items: ['Facility maintenance and grounds management', 'Safety, security, and emergency response', 'Environmental stewardship and Forest Service compliance'] },
        ],
      },
      {
        name: 'Monongahela National Forest',
        href: '/monongahela-national-forest',
        location: 'Eastern West Virginia',
        stats: '921,000+ Acres — 6 Campgrounds',
        scope: [
          { title: 'Campground Operations', items: ['Full campground and recreation area operations', 'Visitor services and customer experience', 'Revenue management and administrative oversight'] },
          { title: 'Maintenance & Stewardship', items: ['Facility maintenance and grounds management', 'Safety, security, and compliance programs', 'Environmental stewardship and resource protection'] },
        ],
      },
    ],
  },
  {
    id: 'state-parks',
    label: 'State Park Concessions',
    badge: 'State Partnerships',
    badgeColor: 'bg-amber-50 text-amber-700',
    contracts: [
      {
        name: 'Meramec State Park',
        href: '/experiences/meramec-state-park',
        location: 'Sullivan, Missouri',
        stats: '6,896 Acres — Lodging, Dining, Watercraft',
        scope: [
          { title: 'Lodging & Hospitality', items: ['Cabin and motel operations', 'Conference center management', 'Food and beverage services'] },
          { title: 'Recreation & Retail', items: ['Watercraft rentals and river services', 'Camp store and retail operations', 'Guest services and reservations'] },
        ],
      },
      {
        name: 'Washington State Park',
        href: '/washington-state-park',
        location: 'De Soto, Missouri',
        stats: '2,147+ Acres — Cabins, Pool, Watercraft',
        scope: [
          { title: 'Guest Accommodations', items: ['Cabin and lodging management', 'Pool and recreation facility operations', 'Camp store and retail'] },
          { title: 'Grounds & Operations', items: ['Watercraft rentals and recreation', 'Facility maintenance and grounds management', 'Quality control and guest experience'] },
        ],
      },
      {
        name: 'Burlingame State Park',
        href: '/experiences/burlingame-state-park',
        location: 'Charlestown, Rhode Island',
        stats: '755 Campsites — 20 Cabins',
        scope: [
          { title: 'Campground Management', items: ['Full operation of RI\'s largest campground', 'Registration, reservations, and guest relations', 'Cabin and campsite maintenance'] },
          { title: 'Maintenance & Safety', items: ['Grounds maintenance and facility upkeep', 'Security patrols and rule enforcement', 'Environmental compliance and reporting'] },
        ],
      },
    ],
  },
  {
    id: 'municipal',
    label: 'Municipal & Private Concessions',
    badge: 'Local Partnerships',
    badgeColor: 'bg-purple-50 text-purple-700',
    contracts: [
      {
        name: 'Canal Bridge Campground',
        href: '/experiences/canal-bridge',
        location: 'Fryeburg, Maine',
        stats: '36 Campsites — Saco River',
        scope: [
          { title: 'Campground Operations', items: ['Full-service management under Town of Fryeburg agreement', 'Registration office, guest check-in, and reservations', 'Capital improvements and facility upgrades'] },
          { title: 'Maintenance & Security', items: ['Bathhouse cleaning, grounds maintenance, beach upkeep', 'Nightly security patrols and quiet hours enforcement', 'Financial reporting and administrative compliance'] },
        ],
      },
      {
        name: 'Long Lake & Chief Noonday Outdoor Centers',
        href: '/long-lake-outdoor-center',
        location: 'Middleville, Michigan',
        stats: '20+ Cabins — Lodges — Private Lake',
        scope: [
          { title: 'Retreat Center Operations', items: ['Group camping and outdoor education programs', 'Wedding venue and event management', 'Lodge, cabin, and lakefront facility operations'] },
          { title: 'Grounds & Programs', items: ['Year-round facility and grounds maintenance', 'Team building and nature education programs', 'Food service and guest hospitality'] },
        ],
      },
    ],
  },
]

export default function ServiceAccordion({ compact = false }: { compact?: boolean }) {
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [openContract, setOpenContract] = useState<string | null>(null)

  return (
    <div className="space-y-3">
      {contractGroups.map((group) => (
        <div key={group.id} className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
          {/* Group header */}
          <button
            onClick={() => setOpenGroup(openGroup === group.id ? null : group.id)}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${group.badgeColor}`}>{group.badge}</span>
              <span className="font-bold text-gray-900">{group.label}</span>
              <span className="text-sm text-gray-400">{group.contracts.length} contract{group.contracts.length > 1 ? 's' : ''}</span>
            </div>
            <svg className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openGroup === group.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Group content */}
          <div className={`transition-all duration-500 ease-in-out ${openGroup === group.id ? 'max-h-[4000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
            <div className="px-6 pb-6 space-y-4">
              {group.contracts.map((contract) => (
                <div key={contract.name} className="border border-gray-100 rounded-xl overflow-hidden">
                  {/* Contract header */}
                  <button
                    onClick={() => setOpenContract(openContract === contract.name ? null : contract.name)}
                    className="w-full flex items-center justify-between px-5 py-3.5 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="text-left">
                      <div className="font-semibold text-gray-900 text-sm">{contract.name}</div>
                      <div className="text-xs text-gray-500">{contract.location} — {contract.stats}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={contract.href}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-forest-DEFAULT font-semibold hover:underline hidden sm:block"
                      >
                        View Page
                      </Link>
                      <svg className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${openContract === contract.name ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Contract scope */}
                  <div className={`transition-all duration-400 ease-in-out ${openContract === contract.name ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                    <div className={`p-5 grid gap-4 ${compact ? 'grid-cols-1' : 'sm:grid-cols-2'}`}>
                      {contract.scope.map((cat) => (
                        <div key={cat.title}>
                          <h4 className="font-semibold text-gray-900 text-sm mb-2">{cat.title}</h4>
                          <ul className="space-y-1.5">
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
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
