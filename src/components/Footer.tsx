import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const PropertyMap = dynamic(() => import('@/components/PropertyMap'), { ssr: false })

const locationsByState = [
  {
    state: 'Alabama',
    icon: '/images/states/alabama.png',
    locations: [
      { name: 'Bankhead National Forest', href: '/bankhead-national-forest', children: [
        { name: 'Clear Creek Recreation Area', href: '/experiences/clear-creek-recreation-area' },
        { name: 'Corinth Recreation Area', href: '/experiences/corinth-recreation-area' },
      ]},
    ],
  },
  {
    state: 'Indiana',
    icon: '/images/states/indiana.png',
    locations: [
      { name: 'Hoosier National Forest', href: '/hoosier-national-forest', children: [
        { name: 'Hardin Ridge Recreation Area', href: '/hardin-ridge-recreation-area' },
        { name: 'Indian-Celina Lakes Recreation Area', href: '/indian-celina-lakes-recreation-area' },
        { name: 'Tipsaw Lake Recreation Area', href: '/tipsaw-lake-recreation-area' },
      ]},
    ],
  },
  {
    state: 'Maine',
    icon: '/images/states/maine.png',
    locations: [
      { name: 'Canal Bridge Campground', href: '/experiences/canal-bridge' },
    ],
  },
  {
    state: 'Michigan',
    icon: '/images/states/michigan.png',
    locations: [
      { name: 'Yankee Springs Recreation Area', href: '/yankee-springs-recreation-area', children: [
        { name: 'Chief Noonday Outdoor Center', href: '/chief-noonday-outdoor-center' },
        { name: 'Long Lake Outdoor Center', href: '/long-lake-outdoor-center' },
      ]},
    ],
  },
  {
    state: 'Missouri',
    icon: '/images/states/missouri.png',
    locations: [
      { name: 'Meramec State Park', href: '/experiences/meramec-state-park' },
      { name: 'Washington State Park', href: '/washington-state-park' },
    ],
  },
  {
    state: 'Rhode Island',
    icon: '/images/states/rhode-island.png',
    locations: [
      { name: 'Burlingame State Park', href: '/experiences/burlingame-state-park' },
    ],
  },
  {
    state: 'West Virginia',
    icon: '/images/states/west-virginia.png',
    locations: [
      { name: 'Monongahela National Forest', href: '/monongahela-national-forest', children: [
        { name: 'Big Bend Campground', href: '/monongahela-national-forest/big-bend-campground' },
        { name: 'Jess Judy Group Campground', href: '/monongahela-national-forest/jess-judy-group-campground' },
        { name: 'Seneca Shadows Campground', href: '/monongahela-national-forest/seneca-shadows-campground' },
        { name: 'Spruce Knob Lake Campground', href: '/monongahela-national-forest/spruce-knob-lake-campground' },
        { name: 'Gatewood Group Campground', href: '/monongahela-national-forest/gatewood-group-campground' },
        { name: 'Stuart Recreation Area', href: '/monongahela-national-forest/stuart-recreation-area' },
      ]},
    ],
  },
]

const footerLinks = {
  experiences: [
    { name: 'Kayak & Watercraft', href: '/experiences/categories/kayak-and-watercraft-rentals' },
    { name: 'Campground Rentals', href: '/experiences/categories/campground-rentals' },
    { name: 'Hiking Trails', href: '/experiences/categories/hiking' },
    { name: 'Scenic Drives', href: '/experiences/categories/scenic-drives' },
    { name: 'Conference Centers', href: '/experiences/categories/conference-center-rentals' },
    { name: 'Lookout Pavilions', href: '/experiences/categories/lookout-pavillions' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Services', href: '/services' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Refund Policy', href: '/refund_returns' },
    { name: 'SMS Terms', href: '/sms-terms' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-forest-dark text-white">
      {/* Main Footer */}
      <div className="container-custom py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            {/* Mini Map — 1:1 square, above logo */}
            <div className="aspect-square w-full max-w-[280px] rounded-xl overflow-hidden opacity-70 mb-6">
              <PropertyMap />
            </div>
            <Link href="/" className="inline-block mb-6 bg-white rounded-lg px-4 py-2">
              <Image
                src="/images/logo.png"
                alt="BA Services"
                width={180}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-white/70 leading-relaxed mb-6 max-w-md">
              From the rockbound coast of Maine to the salt flats of Utah, our managed sites offer
              well-kept facilities, unspoiled scenery, and seamless experiences for every visitor.
            </p>
            <div className="text-white/70 text-sm space-y-1 mb-4">
              <p className="font-semibold text-white">BA Services, Inc.</p>
              <p>1257 Hammond Street</p>
              <p>Bangor, ME 04401</p>
              <a href="mailto:email@BAServes.com" className="text-green-400 hover:text-green-300 transition-colors">email@BAServes.com</a>
              <a href="tel:+12073077903" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mt-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +1 207 307-7903
              </a>
            </div>
          </div>

          {/* Experiences */}
          <div>
            <h3 className="text-white font-semibold mb-4">Experiences</h3>
            <ul className="space-y-3">
              {footerLinks.experiences.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/70 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations by State */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-4">Locations</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1">
              {locationsByState.map((group) => (
                <div key={group.state} className="mb-3">
                  <div className="inline-flex items-center gap-1.5 mb-1 px-2 py-0.5 bg-white/10 rounded-full">
                    <Image src={group.icon} alt={group.state} width={12} height={12} className="brightness-0 invert opacity-70" />
                    <span className="text-[10px] font-semibold text-white/60 uppercase tracking-wider">{group.state}</span>
                  </div>
                  <ul className="space-y-1">
                    {group.locations.map((loc: any) => (
                      <li key={loc.href}>
                        <Link href={loc.href} className="text-white/70 hover:text-white transition-colors text-sm">
                          {loc.name}
                        </Link>
                        {loc.children && (
                          <ul className="space-y-0.5 mt-0.5">
                            {loc.children.map((child: any) => (
                              <li key={child.name}>
                                <Link href={child.href} className="text-white/50 hover:text-white transition-colors text-xs block ml-3">
                                  {child.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="mb-3">
                <Link href="/experiences" className="text-green-400 hover:text-green-300 transition-colors text-sm font-semibold">
                  View All Locations →
                </Link>
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/70 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-white font-semibold mt-6 mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/70 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} BA Services. All rights reserved.
            </p>
            {/* Card-brand acceptance marks — Bar Harbor Bank card-brand review */}
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 48 32" className="h-6" aria-label="Visa"><rect width="48" height="32" rx="4" fill="#1A1F71"/><path d="M19.5 21h-2.7l1.7-10.5h2.7L19.5 21zm11.2-10.2c-.5-.2-1.4-.4-2.4-.4-2.7 0-4.5 1.4-4.5 3.4 0 1.5 1.3 2.3 2.4 2.8 1 .5 1.4.8 1.4 1.3 0 .7-.8 1-1.6 1-.6 0-1.1-.1-1.8-.4l-.3-.1-.3 1.7c.7.3 1.5.4 2.4.4 2.8 0 4.6-1.4 4.6-3.5 0-1.2-.7-2.1-2.2-2.8-1-.5-1.5-.8-1.5-1.3 0-.4.5-.9 1.6-.9.9 0 1.5.2 2 .4l.2.1.3-1.7zm6.8-.3h-2.1c-.6 0-1.1.2-1.4.9L30 21h2.8l.6-1.6h3.5l.3 1.6H40l-2.3-10.5h-2.2zm-2 6.8l1.5-3.8.6 3.8h-2.1zM17 10.5L14.3 18l-.3-1.4c-.5-1.7-2.1-3.5-3.8-4.4l2.4 8.8h2.8l4.3-10.5H17z" fill="#fff"/><path d="M12.2 10.5H8l0 .2c3.3.8 5.5 2.9 6.4 5.3l-.9-4.6c-.2-.7-.7-.9-1.3-.9z" fill="#F9A533"/></svg>
              <svg viewBox="0 0 48 32" className="h-6" aria-label="Mastercard"><rect width="48" height="32" rx="4" fill="#252525"/><circle cx="19" cy="16" r="8" fill="#EB001B"/><circle cx="29" cy="16" r="8" fill="#F79E1B"/><path d="M24 10.3a8 8 0 010 11.4 8 8 0 000-11.4z" fill="#FF5F00"/></svg>
              <svg viewBox="0 0 48 32" className="h-6" aria-label="American Express"><rect width="48" height="32" rx="4" fill="#006FCF"/><text x="24" y="18" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="Arial">AMEX</text></svg>
              <svg viewBox="0 0 48 32" className="h-6" aria-label="Discover"><rect width="48" height="32" rx="4" fill="#FF6600"/><text x="24" y="18" textAnchor="middle" fill="white" fontSize="6.5" fontWeight="bold" fontFamily="Arial">DISCOVER</text></svg>
            </div>
          </div>
        </div>
        <div className="text-center pb-4">
          <a href="https://acadiamarketingmaine.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" style={{ fontSize: '5px' }}>
            Website by Acadia Marketing of Maine
          </a>
        </div>
      </div>
    </footer>
  )
}
