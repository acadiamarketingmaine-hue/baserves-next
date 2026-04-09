import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { utahRestAreas } from '@/data/utah-rest-areas'

const RestAreaMap = dynamic(() => import('@/components/RestAreaMap'), { ssr: false })

export const metadata = {
  title: 'Utah DOT Rest Area Management | BA Services',
  description: 'BA Services manages 28 rest area facilities across Utah for the Utah Department of Transportation, spanning I-15, I-80, I-70, and scenic byways.',
  alternates: { canonical: '/services/utah-dot' },
}

const regionInfo = [
  { id: 1, name: 'Region 1 — Northern Utah', color: 'blue', description: 'Covering the I-15, I-80, and I-84 corridors from the Salt Flats to Bear Lake, including major travel routes through the Wasatch Front.' },
  { id: 2, name: 'Region 2 — Central & Eastern Utah', color: 'orange', description: 'Spanning the I-70 corridor, US-40, and US-191 through canyon country, from Helper to Moab and the Colorado border.' },
  { id: 3, name: 'Region 3 — Southern Utah', color: 'green', description: 'Covering the I-15 corridor and scenic byways through red rock country, from Cedar City to Panguitch and beyond.' },
]

const scopeOfWork = [
  {
    title: 'Full-Service Facility Management',
    description: 'End-to-end management of 28 UDOT Rest Areas, View Areas, and Welcome Centers across all three regions.',
    items: [
      'Daily operations and administration',
      'Facility maintenance and upkeep',
      'Full staffing and workforce management',
      'On-site oversight and quality control',
      'Regulatory and safety compliance',
      'Asset inventory and tracking',
    ],
  },
  {
    title: 'Operations & Staffing',
    description: 'Trained personnel deployed across all sites to maintain continuous, high-quality service.',
    items: [
      'Trained Site Attendants at every location',
      'Maintenance Technicians for repairs',
      'Area Managers for regional oversight',
      'Dedicated Project Manager',
      'Continuous 24/7 operations coverage',
      'Staff training and certification programs',
    ],
  },
  {
    title: 'Janitorial & Sanitation',
    description: 'Rigorous cleaning protocols that maintain a minimum "B" rating across all facilities.',
    items: [
      'Restroom cleaning and disinfecting',
      'Replenishing soap, paper, and supplies',
      'Trash and waste removal',
      'Surface cleaning and sanitization',
      'Minimum "B" cleanliness rating maintained',
      'Odor control and deep cleaning cycles',
    ],
  },
  {
    title: 'Grounds & Site Maintenance',
    description: 'Year-round grounds care adapted to Utah\'s diverse climates and elevations.',
    items: [
      'Lawn mowing, edging, and trimming',
      'Vegetation management and weed control',
      'Irrigation system maintenance',
      'Litter and debris removal',
      'Snow and ice removal',
      'Parking lot and sidewalk upkeep',
    ],
  },
  {
    title: 'Preventive & Corrective Maintenance',
    description: 'Scheduled and responsive maintenance to protect facility infrastructure and extend asset life.',
    items: [
      'Plumbing systems and fixtures',
      'Electrical systems and lighting',
      'HVAC and climate control',
      'Mechanical and structural repairs',
      'Preventive maintenance scheduling',
      'Emergency and corrective repairs',
    ],
  },
  {
    title: 'Utilities & Environmental Systems',
    description: 'Management of all utility systems including water, wastewater, and stormwater compliance.',
    items: [
      'Water systems operation and testing',
      'Wastewater management (septic, sewer, lagoon)',
      'Stormwater compliance and reporting',
      'Utility monitoring and conservation',
      'Environmental regulatory adherence',
      'System inspections and documentation',
    ],
  },
  {
    title: 'Performance Monitoring & Compliance',
    description: 'Continuous performance standards with measurable accountability at every facility.',
    items: [
      '24/7 emergency availability',
      'On-site staffing during operating hours',
      'Uniform and appearance standards',
      'Safety and regulatory compliance',
      'Routine quality inspections',
      'Detailed reporting and documentation',
    ],
  },
  {
    title: 'Customer Experience',
    description: 'Every rest stop delivers a clean, safe, and welcoming experience for Utah travelers.',
    items: [
      'Clean, safe, and welcoming facilities',
      'Staff trained to assist the public',
      'Prompt response to visitor concerns',
      'Professional presence at all locations',
      'Accessibility and ADA compliance',
      'Traveler information and wayfinding support',
    ],
  },
]

export default function UtahDotPage() {
  const regionColorClasses: Record<number, { badge: string; dot: string }> = {
    1: { badge: 'bg-blue-50 text-blue-700', dot: 'bg-blue-500' },
    2: { badge: 'bg-orange-50 text-orange-700', dot: 'bg-orange-500' },
    3: { badge: 'bg-green-50 text-green-700', dot: 'bg-green-500' },
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-forest-DEFAULT">
        <div className="container-custom px-6">
          <div className="max-w-3xl">
            <span className="badge bg-white/10 text-white mb-4">Government Contract</span>
            <h1 className="font-display headline-xl text-white mb-6">
              Utah <span className="text-green-400">Rest Area</span> Management
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              BA Services partners with the Utah Department of Transportation to maintain 28 rest area facilities across three regions, from the Bonneville Salt Flats to the red rock country of southern Utah.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 py-8">
        <div className="container-custom px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { value: '28', label: 'Rest Areas' },
              { value: '3', label: 'Regions' },
              { value: '10+', label: 'Highways' },
              { value: 'Statewide', label: 'Coverage' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16">
        <div className="container-custom px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">All 28 Rest Area Locations</h2>
          <p className="text-gray-600 mb-4">Interactive map of every rest area managed by BA Services across Utah. Click any pin for details.</p>
          <div className="flex flex-wrap gap-4 mb-6">
            {regionInfo.map((r) => (
              <div key={r.id} className="flex items-center gap-2 text-sm text-gray-600">
                <span className={`w-3 h-3 rounded-full ${regionColorClasses[r.id].dot}`} />
                {r.name}
              </div>
            ))}
          </div>
          <RestAreaMap
            restAreas={utahRestAreas}
            center={[39.5, -111.5]}
            zoom={6}
            showRegionColors
          />
        </div>
      </section>

      {/* Regions */}
      {regionInfo.map((region) => {
        const areas = utahRestAreas.filter(ra => ra.region === region.id)
        return (
          <section key={region.id} className={region.id % 2 === 0 ? 'py-16 bg-gray-50' : 'py-16'}>
            <div className="container-custom px-6">
              <div className="flex items-center gap-3 mb-2">
                <span className={`w-4 h-4 rounded-full ${regionColorClasses[region.id].dot}`} />
                <h2 className="text-2xl font-bold text-gray-900">{region.name}</h2>
              </div>
              <p className="text-gray-600 mb-8 max-w-3xl">{region.description}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {areas.map((ra) => (
                  <div key={`${ra.name}-${ra.direction}`} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-gray-900 text-sm">{ra.name}</h3>
                      {ra.direction && (
                        <span className={`inline-flex items-center px-2 py-0.5 text-[11px] font-semibold rounded-full ${regionColorClasses[region.id].badge}`}>
                          {ra.direction}
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 text-xs text-gray-500">
                      <p>{ra.route} &middot; {ra.location}</p>
                      <p>{ra.city}, Utah</p>
                    </div>
                    <a
                      href={ra.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-forest-DEFAULT hover:text-forest-dark transition-colors"
                    >
                      Directions
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* Scope of Work */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6">
          <div className="max-w-3xl mb-12">
            <span className="badge bg-forest-DEFAULT/10 text-forest-DEFAULT mb-4">Statement of Work</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contract Scope of Services</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              BA Services provides comprehensive facility management, operations, and maintenance services for 28 UDOT Rest Areas, View Areas, and Welcome Centers across the state.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {scopeOfWork.map((category) => (
              <div key={category.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{category.description}</p>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start text-sm text-gray-700">
                      <svg className="w-4 h-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-custom px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Interested in Our DOT Services?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Contact us to learn more about our rest area management capabilities and how we can support your transportation infrastructure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+12073077903" className="btn-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Call +1 207 307-7903
            </a>
            <Link href="/services" className="btn-secondary">
              All Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
