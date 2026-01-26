'use client'

import { useState } from 'react'

// ============================================
// CARDEN KENNELS & UNCOMMON DOG - RATES
// Last Updated: January 2026
// ============================================

const servicesData = {
  // BOARDING SERVICES @ Carden Kennels, Bangor
  boarding: {
    title: 'Boarding Services',
    subtitle: 'Rates are by calendar day and include daycare for dogs who have passed evaluations',
    packages: [
      {
        name: 'Classic Boarding',
        tagline: 'Comfortable Standard Care',
        description: 'A comfortable, safe environment for your dog while you\'re away. Includes regular feeding, outdoor breaks, and comfortable sleeping arrangements.',
        features: [
          'Climate-controlled sleeping area',
          'Regular outdoor potty breaks',
          'Fresh food & water daily',
          'Daily wellness check',
          'Daycare included (if evaluated)',
        ],
        pricing: [
          { label: '1 Pet', price: '$39', per: '/calendar day' },
        ],
        highlight: false,
      },
      {
        name: 'Deluxe, Senior or Cuddle Care',
        tagline: 'Extra Attention & Comfort',
        description: 'Enhanced care for dogs who need a little extra attention, whether they\'re seniors, need more cuddles, or simply deserve the deluxe treatment.',
        features: [
          'All Classic Boarding benefits',
          'Extra one-on-one attention',
          'Comfortable upgraded bedding',
          'Perfect for seniors or anxious pets',
          'Daycare included (if evaluated)',
        ],
        pricing: [
          { label: '1 Pet', price: '$42', per: '/calendar day' },
          { label: '2 Pets', price: '$66', per: '/calendar day' },
          { label: '3 Pets (if space permits)', price: '$99', per: '/calendar day' },
        ],
        highlight: false,
      },
      {
        name: 'Family Room',
        tagline: 'Spacious Shared Accommodations',
        description: 'A larger private space perfect for multi-pet families who want to stay together. Your pets will enjoy the comfort of being with their siblings.',
        features: [
          'Spacious private room',
          'Pets stay together',
          'Extra room to move around',
          'Great for bonded pairs/groups',
          'Daycare included (if evaluated)',
        ],
        pricing: [
          { label: '1 or 2 Pets', price: '$75', per: '/calendar day' },
          { label: '3 Pets', price: '$109', per: '/calendar day' },
        ],
        highlight: true,
      },
      {
        name: 'Suite',
        tagline: 'Premium Luxury Accommodations',
        description: 'Our most spacious and luxurious boarding option. Premium private suite with the most space, elevated bedding, and VIP treatment.',
        features: [
          'Largest private suite available',
          'Premium orthopedic bedding',
          'Maximum comfort & privacy',
          'VIP treatment',
          'Daycare included (if evaluated)',
        ],
        pricing: [
          { label: '1 or 2 Pets', price: '$84', per: '/calendar day' },
          { label: '3 Pets', price: '$129', per: '/calendar day' },
        ],
        highlight: true,
      },
      {
        name: 'Cat, Rabbit & Pocket Pet Boarding',
        tagline: 'Small Pet Accommodations',
        description: 'Safe, comfortable boarding for cats, rabbits, and other small pets. Each guest receives attentive care in a calm, quiet environment.',
        features: [
          'Quiet, stress-free environment',
          'Species-appropriate housing',
          'Fresh food & water daily',
          'Daily wellness check',
          'Litter/bedding maintained',
        ],
        pricing: [
          { label: 'Cats, Rabbits or Pocket Pets', price: '$25', per: '/calendar day' },
        ],
        highlight: false,
      },
    ],
  },

  // DAYCARE SERVICES
  daycare: {
    title: 'Daycare Services',
    subtitle: 'Application and successful evaluation required • Monday – Friday',
    packages: [
      {
        name: 'Daily Daycare',
        tagline: 'Standard Supervised Play',
        description: 'A balanced mix of play, rest, and socialization. Perfect for friendly, social dogs who enjoy group play and structured activity in a safe and engaging setting. Dogs are grouped based on size and play style.',
        features: [
          'Group play with carefully selected playmates',
          'Indoor & outdoor play areas',
          'Rest periods in a quiet space',
          'Constant supervision by trained staff',
          'Stress-free, enjoyable experience',
        ],
        pricing: [
          { label: 'Single Dog', price: '$34', per: '/day' },
          { label: '2 Dog Family (same day)', price: '$60', per: '/day' },
        ],
        highlight: false,
      },
      {
        name: 'Weekly Daycare Package',
        tagline: 'Best Value for Regular Visitors',
        description: 'The perfect solution for working pet parents. Your dog enjoys a full week of socialization, exercise, and fun while you\'re at work. Significant savings over daily rates.',
        features: [
          'All daily daycare benefits',
          'Monday through Friday coverage',
          'Consistent routine for your dog',
          'Best value - save over daily rate',
          'Regular socialization & exercise',
        ],
        pricing: [
          { label: 'Single Dog Weekly', price: '$150', per: '/week' },
        ],
        highlight: true,
      },
    ],
  },

  // GROOMING / BATHING SERVICES
  grooming: {
    title: 'Bathing & Grooming',
    subtitle: 'Professional grooming to keep your pup looking their best',
    packages: [
      {
        name: 'Small Dogs - Short Coat',
        tagline: 'Chihuahua, Jack Russell Terrier, Beagles',
        description: 'Complete bath service with hand drying for small, short-coated breeds.',
        features: [
          'Premium shampoo & conditioner',
          'Thorough hand drying',
          'Brush out',
          'Ear cleaning available',
        ],
        pricing: [
          { label: 'Bath with Hand Drying', price: '$32', per: '' },
        ],
        highlight: false,
      },
      {
        name: 'Small Dogs - Long/Curly Coat',
        tagline: 'Bichon Frise, Shih Tzu, Pomeranian',
        description: 'Complete bath service with hand drying for small breeds with longer or curly coats that require extra attention.',
        features: [
          'Premium shampoo & conditioner',
          'Thorough hand drying',
          'Detailed brush out',
          'De-matting as needed',
        ],
        pricing: [
          { label: 'Bath with Hand Drying', price: '$36–$44', per: '' },
        ],
        highlight: false,
      },
      {
        name: 'Medium Dogs - Short Coat',
        tagline: 'Labrador, Boxer, German Shorthaired Pointer',
        description: 'Complete bath service with hand drying for medium-sized, short-coated breeds.',
        features: [
          'Premium shampoo & conditioner',
          'Thorough hand drying',
          'Brush out',
          'Ear cleaning available',
        ],
        pricing: [
          { label: 'Bath with Hand Drying', price: '$45–$49', per: '' },
        ],
        highlight: false,
      },
      {
        name: 'Medium Dogs - With Coat',
        tagline: 'Collie, Poodle Crosses, German Shepherd',
        description: 'Complete bath service with hand drying for medium breeds with longer coats requiring extra care.',
        features: [
          'Premium shampoo & conditioner',
          'Thorough hand drying',
          'Detailed brush out',
          'De-matting as needed',
        ],
        pricing: [
          { label: 'Bath with Hand Drying', price: '$50–$59', per: '' },
        ],
        highlight: false,
      },
      {
        name: 'Large Breed - Short Coat',
        tagline: 'Great Dane, Mastiff',
        description: 'Complete bath service with hand drying for large, short-coated breeds.',
        features: [
          'Premium shampoo & conditioner',
          'Thorough hand drying',
          'Brush out',
          'Ear cleaning available',
        ],
        pricing: [
          { label: 'Bath with Hand Drying', price: '$55+', per: '' },
        ],
        highlight: false,
      },
      {
        name: 'Large Breed - With Coat',
        tagline: 'Husky, Samoyed, Akita, Chow-Chow, Newfoundland',
        description: 'Complete bath service for large breeds with heavy coats. Full groom service may be needed - call for consultation.',
        features: [
          'Premium shampoo & conditioner',
          'Thorough hand drying',
          'Extensive brush out',
          'De-matting & de-shedding',
          'Call for consultation',
        ],
        pricing: [
          { label: 'Bath with Hand Drying', price: '$73–$195', per: '' },
        ],
        highlight: true,
      },
    ],
  },

  // ALA CARTE GROOMING SERVICES
  alacarte: {
    title: 'Ala Carte Services',
    subtitle: 'Some services may only be available at Carden Kennels. Ask your canine concierge for details.',
    items: [
      { name: 'Nail Trim', description: 'Professional nail trimming ($5 fee if 2 people required)', price: '$15' },
      { name: 'Sanitary Trim', description: 'Hygienic trimming for cleanliness', price: '$8–$20' },
      { name: 'Paw Trim', description: 'Trim fur between paw pads', price: '$8–$20' },
      { name: 'Face & Eye Trim', description: 'Tidy up around face and eyes', price: '$8–$20' },
    ],
  },

  // ADD-ON ACTIVITIES
  addons: {
    title: 'Add-On Activities',
    subtitle: 'Give your dog an extra special experience with personalized activities',
    items: [
      {
        name: 'Fetch & Zoomies',
        description: 'Private playtime in a fenced area with a team member. Frisbee, tug, ball, or any play your dog enjoys. Physical activity and mental stimulation!',
        price: '$15'
      },
      {
        name: 'Outdoor Walks',
        description: 'Leashed walk with their own person. At Uncommon Dog: private trails with wildlife and varied terrain. At Carden: outdoor walk and across to Bean Estates road. Your dog sets the pace!',
        price: '$15'
      },
      {
        name: 'Lure Coursing',
        description: 'Satisfy your dog\'s high-energy instincts! Dogs chase a mechanized lure around a course simulating unpredictable prey. Improves focus, agility, and is simply heaven for active dogs!',
        price: '$20'
      },
      {
        name: 'Brunches & Treats',
        description: 'House-made bedtime cookies, stuffed Kong toys, brunches, or licki mats. Varies by season and location - ask your canine concierge!',
        price: 'Varies'
      },
    ],
  },
}

// Booking URLs - Update these with your actual booking links
const bookingUrls = {
  bangor: 'https://cardenkennels.com/application/',
  holden: 'https://cardenkennels.com/application/',
}

// Contact info
const contactPhone = '(207) 307-7903'

// ============================================
// END OF EDITABLE SECTION
// ============================================

export default function PetServicesRates() {
  const [activeTab, setActiveTab] = useState<'boarding' | 'daycare' | 'grooming'>('boarding')

  return (
    <div className="py-16 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-900 mb-4">
            Our Services & Rates
          </h2>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">
            Premium care packages designed with your pet's comfort and happiness in mind
          </p>
        </div>

        {/* Service Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {(['boarding', 'daycare', 'grooming'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-amber-700 text-white shadow-lg shadow-amber-700/30 scale-105'
                  : 'bg-white text-amber-800 border-2 border-amber-200 hover:border-amber-400 hover:bg-amber-50'
              }`}
            >
              {servicesData[tab].title}
            </button>
          ))}
        </div>

        {/* Active Service Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-serif font-bold text-amber-900 mb-2">
              {servicesData[activeTab].title}
            </h3>
            <p className="text-amber-600">{servicesData[activeTab].subtitle}</p>
          </div>

          {/* Package Cards */}
          <div className={`grid gap-6 max-w-6xl mx-auto ${
            activeTab === 'grooming'
              ? 'sm:grid-cols-2 lg:grid-cols-3'
              : activeTab === 'boarding'
              ? 'sm:grid-cols-2 lg:grid-cols-3'
              : 'md:grid-cols-2'
          }`}>
            {servicesData[activeTab].packages.map((pkg, index) => (
              <div
                key={pkg.name}
                className={`relative rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                  pkg.highlight
                    ? 'bg-gradient-to-br from-amber-700 via-amber-600 to-amber-800 text-white shadow-xl shadow-amber-700/20'
                    : 'bg-white border-2 border-amber-100 shadow-lg'
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full uppercase tracking-wider">
                      {activeTab === 'daycare' ? 'Best Value' : 'Premium'}
                    </span>
                  </div>
                )}

                <div className="p-6">
                  {/* Package Header */}
                  <div className="mb-4">
                    <h4 className={`text-xl font-serif font-bold mb-1 ${pkg.highlight ? 'text-white' : 'text-amber-900'}`}>
                      {pkg.name}
                    </h4>
                    <p className={`text-sm italic ${pkg.highlight ? 'text-amber-100' : 'text-amber-600'}`}>
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className={`mb-4 text-sm leading-relaxed ${pkg.highlight ? 'text-amber-50' : 'text-gray-600'}`}>
                    {pkg.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4">
                    <ul className="space-y-1.5">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <svg
                            className={`w-4 h-4 flex-shrink-0 mt-0.5 ${pkg.highlight ? 'text-amber-200' : 'text-amber-600'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className={`text-xs ${pkg.highlight ? 'text-amber-50' : 'text-gray-600'}`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing */}
                  <div className={`rounded-2xl p-4 ${pkg.highlight ? 'bg-white/10' : 'bg-amber-50'}`}>
                    <div className="space-y-2">
                      {pkg.pricing.map((price, i) => (
                        <div key={i} className="flex justify-between items-baseline">
                          <span className={`text-sm ${pkg.highlight ? 'text-amber-100' : 'text-gray-600'}`}>
                            {price.label}
                          </span>
                          <div className="text-right">
                            <span className={`text-lg font-bold ${pkg.highlight ? 'text-white' : 'text-amber-700'}`}>
                              {price.price}
                            </span>
                            {price.per && (
                              <span className={`text-xs ml-1 ${pkg.highlight ? 'text-amber-200' : 'text-gray-500'}`}>
                                {price.per}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ala Carte Services (shown with grooming) */}
        {activeTab === 'grooming' && (
          <div className="max-w-4xl mx-auto mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-serif font-bold text-amber-900 mb-2">
                {servicesData.alacarte.title}
              </h3>
              <p className="text-amber-600 text-sm">{servicesData.alacarte.subtitle}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {servicesData.alacarte.items.map((item) => (
                <div
                  key={item.name}
                  className="bg-white rounded-2xl p-5 border-2 border-amber-100 hover:border-amber-300 hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-amber-900">
                      {item.name}
                    </h4>
                    <span className="text-amber-600 font-bold whitespace-nowrap ml-2">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add-On Activities */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-serif font-bold text-amber-900 mb-2">
              {servicesData.addons.title}
            </h3>
            <p className="text-amber-600">{servicesData.addons.subtitle}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {servicesData.addons.items.map((addon) => (
              <div
                key={addon.name}
                className="bg-white rounded-2xl p-6 border-2 border-amber-100 hover:border-amber-300 hover:shadow-lg transition-all group"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-lg font-bold text-amber-900 group-hover:text-amber-700 transition-colors">
                    {addon.name}
                  </h4>
                  <span className="text-amber-600 font-bold text-lg whitespace-nowrap ml-4">
                    {addon.price}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 rounded-3xl p-10 shadow-xl">
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
            Ready to Book Your Pet's Stay?
          </h3>
          <p className="text-amber-100 mb-8 max-w-xl mx-auto">
            Application and evaluation required for daycare participation. Contact us to get started!
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <a
              href={bookingUrls.bangor}
              className="px-8 py-4 bg-white text-amber-700 font-bold rounded-full hover:bg-amber-50 transition-all shadow-lg"
            >
              Apply at Carden Kennels (Bangor)
            </a>
            <a
              href={bookingUrls.holden}
              className="px-8 py-4 bg-amber-900/30 text-white font-bold rounded-full border-2 border-white/30 hover:bg-amber-900/50 transition-all"
            >
              Apply at Uncommon Dog (Holden)
            </a>
          </div>
          <p className="text-amber-100">
            Questions? Call us at{' '}
            <a href={`tel:${contactPhone.replace(/[^0-9]/g, '')}`} className="font-semibold text-white underline hover:text-amber-200">
              {contactPhone}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
