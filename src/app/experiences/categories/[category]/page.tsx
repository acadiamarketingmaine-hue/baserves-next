import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const categoryData: Record<string, any> = {
  'cave-tours': {
    name: 'Cave Tours',
    icon: '🦇',
    description: 'Explore the underground wonders of America with guided cave tours through stunning geological formations.',
    image: '/images/20210323_093823-2048x1536.jpg',
    experiences: [
      { name: 'Meramec Caverns Tour', location: 'Missouri', duration: '1.5 hours', price: 'From $25', image: '/images/20210323_093823-1536x1152.jpg' },
    ]
  },
  'kayak-and-watercraft-rentals': {
    name: 'Kayak & Watercraft Rentals',
    icon: '🚣',
    description: 'Get out on the water with our selection of kayaks, canoes, and paddleboards available at multiple locations.',
    image: '/images/Canal-Bridge-Entrance-1-2048x1365.jpg',
    experiences: [
      { name: 'Saco River Kayaking', location: 'Canal Bridge, ME', duration: 'Half day', price: 'From $40', image: '/images/Canal-Bridge-Entrance-1-2048x1365.jpg' },
      { name: 'Tipsaw Lake Paddleboarding', location: 'Tipsaw Lake, IN', duration: 'Hourly', price: 'From $20', image: '/images/DSC_0001-2048x1365.jpg' },
    ]
  },
  'campground-rentals': {
    name: 'Campground Rentals',
    icon: '⛺',
    description: 'From primitive tent sites to full-hookup RV spots, find the perfect campsite for your outdoor adventure.',
    image: '/images/DSC_0001-2048x1365.jpg',
    experiences: [
      { name: 'Yankee Springs Campground', location: 'Barry County, MI', duration: 'Nightly', price: 'From $35/night', image: '/images/Burlingame1-2048x1365.jpg' },
      { name: 'Tipsaw Lake Camping', location: 'Perry County, IN', duration: 'Nightly', price: 'From $30/night', image: '/images/DSC_0001-2048x1365.jpg' },
      { name: 'Canal Bridge Campground', location: 'Fryeburg, ME', duration: 'Nightly', price: 'From $40/night', image: '/images/Canal-Bridge-Entrance-1-2048x1365.jpg' },
    ]
  },
  'hiking': {
    name: 'Hiking Trails',
    icon: '🥾',
    description: 'Discover miles of scenic trails through forests, along lakeshores, and up mountain peaks.',
    image: '/images/Burlingame1-2048x1365.jpg',
    experiences: [
      { name: 'Yankee Springs Trail System', location: 'Michigan', duration: '30+ miles', price: 'Free', image: '/images/Burlingame1-2048x1365.jpg' },
      { name: 'Tipsaw Lake Trails', location: 'Indiana', duration: '8+ miles', price: 'Free', image: '/images/DSC_0110-2048x1365.jpg' },
    ]
  },
  'scenic-drives': {
    name: 'Scenic Drives',
    icon: '🚗',
    description: 'Experience breathtaking vistas and natural beauty from the comfort of your vehicle.',
    image: '/images/DSC_0110-2048x1365.jpg',
    experiences: [
      { name: 'Hoosier National Forest Drive', location: 'Indiana', duration: '2-3 hours', price: 'Free', image: '/images/DSC_0103-2048x1365.jpg' },
    ]
  },
  'conference-center-rentals': {
    name: 'Conference Center Rentals',
    icon: '🏛️',
    description: 'Host your next retreat, wedding, or corporate event in a stunning natural setting.',
    image: '/images/Playground-Gallery-Pic-2048x1365.jpg',
    experiences: [
      { name: 'Long Lake Outdoor Center', location: 'Michigan', duration: 'Daily/Weekly', price: 'Contact for rates', image: '/images/Playground-Gallery-Pic-2048x1365.jpg' },
    ]
  },
  'lookout-pavillions': {
    name: 'Lookout Pavilions',
    icon: '🏔️',
    description: 'Reserve scenic overlooks and covered pavilions for picnics, gatherings, and enjoying panoramic views.',
    image: '/images/DSC_0110-2048x1365.jpg',
    experiences: [
      { name: 'Hardin Ridge Overlook', location: 'Monroe Lake, IN', duration: 'Daily', price: 'From $50', image: '/images/DSC_0103-2048x1365.jpg' },
      { name: 'Tipsaw Lake Pavilion', location: 'Perry County, IN', duration: 'Daily', price: 'From $40', image: '/images/DSC_0001-2048x1365.jpg' },
    ]
  },
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = categoryData[params.category]

  if (!category) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link href="/experiences" className="btn-primary">View All Experiences</Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0">
          <Image src={category.image} alt={category.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative container-custom px-6">
          <Link href="/experiences" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Experiences
          </Link>
          <div className="max-w-3xl">
            <span className="text-5xl mb-4 block">{category.icon}</span>
            <h1 className="font-display headline-xl text-white mb-6">{category.name}</h1>
            <p className="text-xl text-white/80 leading-relaxed">{category.description}</p>
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section className="section">
        <div className="container-custom px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Available Experiences</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.experiences.map((exp: any, index: number) => (
              <div key={index} className="experience-card">
                <div className="relative h-48">
                  <Image src={exp.image} alt={exp.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{exp.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    {exp.location}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                      <span className="text-sm text-gray-500">Duration:</span>
                      <span className="ml-2 font-medium">{exp.duration}</span>
                    </div>
                    <span className="text-forest-DEFAULT font-bold">{exp.price}</span>
                  </div>
                  <a
                    href="https://escape.baserves.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block w-full text-center py-3 bg-forest-DEFAULT text-white font-semibold rounded-lg hover:bg-forest-light transition-colors"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
