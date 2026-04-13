import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { KayakIcon, CampIcon, CarIcon, HikeIcon, BuildingIcon, MountainIcon } from '@/components/Icons'

const categoryData: Record<string, any> = {
  'kayak-and-watercraft-rentals': {
    name: 'Kayak & Watercraft Rentals',
    icon: <KayakIcon className="w-12 h-12" />,
    description: 'Get out on the water with our selection of kayaks, canoes, rafts, and paddleboards available at multiple locations.',
    image: '/images/Canal-Bridge-Entrance-1-2048x1365.jpg',
    experiences: [
      { name: 'Burlingame State Park Boating', location: 'Burlingame State Park, Charlestown, RI', duration: 'Daily', price: 'Contact for rates', image: '/images/burlingame-entrance-sign.jpg', href: '/experiences/burlingame-state-park' },
      { name: 'Meramec River Float Trips', location: 'Meramec State Park, Sullivan, MO', duration: 'Half day – Full day', price: 'Canoe from $54 / Kayak from $42', image: '/images/meramec-state-park/riverstop-store.jpg', href: '/experiences/meramec-state-park' },
      { name: 'Washington State Park Watercraft', location: 'Washington State Park, De Soto, MO', duration: 'Hourly / Half day', price: 'Contact for rates', image: '/images/washington-state-park/store.jpg', href: '/washington-state-park' },
    ]
  },
  'campground-rentals': {
    name: 'Campground Rentals',
    icon: <CampIcon className="w-12 h-12" />,
    description: 'From primitive tent sites to full-hookup RV spots and rustic cabins, find the perfect stay for your outdoor adventure.',
    image: '/images/corinth-boat-ramp.jpg',
    experiences: [
      { name: 'Burlingame State Park', location: 'Charlestown, RI', duration: 'Nightly', price: '755 sites + 20 cabins', image: '/images/burlingame-entrance-sign.jpg', href: '/experiences/burlingame-state-park' },
      { name: 'Canal Bridge Campground', location: 'Fryeburg, ME', duration: 'Nightly', price: '36 sites + 5 tent', image: '/images/Canal-Bridge-Entrance-1-2048x1365.jpg', href: '/experiences/canal-bridge' },
      { name: 'Clear Creek Recreation Area', location: 'Bankhead National Forest, AL', duration: 'Nightly', price: '102 sites — 4 loops', image: '/images/clear-creek-overview.jpg', href: '/experiences/clear-creek-recreation-area' },
      { name: 'Corinth Recreation Area', location: 'Bankhead National Forest, AL', duration: 'Nightly', price: '52 full-hookup + 10 tent', image: '/images/corinth-boat-ramp.jpg', href: '/experiences/corinth-recreation-area' },
      { name: 'Hardin Ridge Recreation Area', location: 'Monroe County, IN', duration: 'Nightly', price: '200+ sites', image: '/images/hardin-ridge-entrance-sign.jpg', href: '/hardin-ridge-recreation-area' },
      { name: 'Indian-Celina Lakes Recreation Area', location: 'Perry County, IN', duration: 'Nightly', price: '80+ sites', image: '/images/indian-celina-entrance-sign.jpg', href: '/indian-celina-lakes-recreation-area' },
      { name: 'Long Lake Outdoor Center', location: 'Middleville, MI', duration: 'Nightly / Weekly', price: '16 cabins + lodge', image: '/images/long-lake/fall-aerial.jpg', href: '/long-lake-outdoor-center' },
      { name: 'Meramec State Park', location: 'Sullivan, MO', duration: 'Nightly', price: '19 cabins + motel', image: '/images/meramec-entrance-sign.jpg', href: '/experiences/meramec-state-park' },
      { name: 'Monongahela National Forest', location: 'Eastern West Virginia', duration: 'Nightly', price: 'Multiple campgrounds', image: '/images/monongahela/entrance-sign.jpg', href: '/monongahela-national-forest' },
      { name: 'Tipsaw Lake Recreation Area', location: 'Perry County, IN', duration: 'Nightly', price: '35+ sites — 3 loops', image: '/images/tipsaw-lake/lake-view.jpg', href: '/tipsaw-lake-recreation-area' },
      { name: 'Washington State Park', location: 'De Soto, MO', duration: 'Nightly', price: 'Cabins + campsites', image: '/images/washington-thunderbird-lodge.png', href: '/washington-state-park' },
      { name: 'Yankee Springs Recreation Area', location: 'Barry County, MI', duration: 'Nightly', price: '200+ sites', image: '/images/yankee-springs/hill-cabins.jpg', href: '/yankee-springs-recreation-area' },
    ]
  },
  'hiking': {
    name: 'Hiking Trails',
    icon: <HikeIcon className="w-12 h-12" />,
    description: 'Discover hundreds of miles of scenic trails through forests, along lakeshores, and into wilderness areas.',
    image: '/images/bankhead-bicycle-trail.jpg',
    experiences: [
      { name: 'Burlingame State Park Trails', location: 'Charlestown, RI', duration: 'Multiple trails', price: 'Free', image: '/images/burlingame-entrance-sign.jpg', href: '/experiences/burlingame-state-park' },
      { name: 'Hardin Ridge Trails', location: 'Monroe County, IN', duration: '12+ miles', price: 'Free', image: '/images/hardin-ridge-entrance-sign.jpg', href: '/hardin-ridge-recreation-area' },
      { name: 'Indian-Celina Two Lakes Loop', location: 'Perry County, IN', duration: 'Trail loops', price: 'Free', image: '/images/indian-celina/trail-sign.jpg', href: '/indian-celina-lakes-recreation-area' },
      { name: 'Meramec State Park Trails', location: 'Sullivan, MO', duration: '16 miles', price: 'Free', image: '/images/meramec-entrance-sign.jpg', href: '/experiences/meramec-state-park' },
      { name: 'Monongahela National Forest Trails', location: 'Eastern West Virginia', duration: '800+ miles', price: 'Free', image: '/images/monongahela/entrance-sign.jpg', href: '/monongahela-national-forest' },
      { name: 'Raven Interpretive Trail', location: 'Clear Creek, Bankhead NF, AL', duration: '2.5 miles', price: 'Free', image: '/images/clear-creek-overview.jpg', href: '/experiences/clear-creek-recreation-area' },
      { name: 'Sipsey Wilderness Trails', location: 'Bankhead National Forest, AL', duration: '25,000 acres', price: 'Free', image: '/images/bankhead-forest.jpg', href: '/bankhead-national-forest' },
      { name: 'Tipsaw Lake Trails', location: 'Perry County, IN', duration: '8+ miles', price: 'Free', image: '/images/tipsaw-lake/lake-view.jpg', href: '/tipsaw-lake-recreation-area' },
      { name: 'Washington State Park Trails', location: 'De Soto, MO', duration: '10+ miles', price: 'Free', image: '/images/washington-thunderbird-lodge.png', href: '/washington-state-park' },
      { name: 'Yankee Springs Trail System', location: 'Barry County, MI', duration: '30+ miles', price: 'Free', image: '/images/yankee-springs/hill-cabins.jpg', href: '/yankee-springs-recreation-area' },
    ]
  },
  'scenic-drives': {
    name: 'Scenic Drives',
    icon: <CarIcon className="w-12 h-12" />,
    description: 'Experience breathtaking vistas and natural beauty from the comfort of your vehicle.',
    image: '/images/monongahela/entrance-sign.jpg',
    experiences: [
      { name: 'Bankhead National Forest Scenic Drive', location: 'Northwest Alabama', duration: '2-3 hours', price: 'Free', image: '/images/bankhead-forest.jpg', href: '/bankhead-national-forest' },
      { name: 'Highland Scenic Highway', location: 'Monongahela National Forest, WV', duration: '43 miles', price: 'Free', image: '/images/monongahela/entrance-sign.jpg', href: '/monongahela-national-forest' },
      { name: 'Hoosier National Forest Drive', location: 'Southern Indiana', duration: '2-3 hours', price: 'Free', image: '/images/DSC_0103-2048x1365.jpg', href: '/hardin-ridge-recreation-area' },
    ]
  },
  'conference-center-rentals': {
    name: 'Conference Center Rentals',
    icon: <BuildingIcon className="w-12 h-12" />,
    description: 'Host your next retreat, wedding, or corporate event in a stunning natural setting.',
    image: '/images/long-lake/lodge.jpg',
    experiences: [
      { name: 'Corinth Pavilion', location: 'Bankhead National Forest, AL', duration: 'Daily', price: '100-person capacity', image: '/images/corinth-pavilion.jpg', href: '/experiences/corinth-recreation-area' },
      { name: 'Long Lake Outdoor Center', location: 'Middleville, MI', duration: 'Daily / Weekly', price: 'Contact for rates', image: '/images/long-lake/lodge.jpg', href: '/long-lake-outdoor-center' },
      { name: 'Meramec State Park Conference Center', location: 'Sullivan, MO', duration: 'Daily', price: 'Contact for rates', image: '/images/meramec-state-park/conference-center.jpg', href: '/experiences/meramec-state-park' },
    ]
  },
  'lookout-pavillions': {
    name: 'Lookout Pavilions',
    icon: <MountainIcon className="w-12 h-12" />,
    description: 'Reserve scenic overlooks and covered pavilions for picnics, gatherings, and enjoying panoramic views.',
    image: '/images/meramec-state-park/overlook-pavilion.jpg',
    experiences: [
      { name: 'Clear Creek Group Shelters', location: 'Bankhead National Forest, AL', duration: 'Daily', price: 'Reservable', image: '/images/clear-creek-overview.jpg', href: '/experiences/clear-creek-recreation-area' },
      { name: 'Hardin Ridge Picnic Shelters', location: 'Monroe Lake, IN', duration: 'Daily', price: 'From $50', image: '/images/DSC_0103-2048x1365.jpg', href: '/hardin-ridge-recreation-area' },
      { name: 'Meramec Overlook Pavilion', location: 'Meramec State Park, Sullivan, MO', duration: 'Daily', price: 'Contact for rates', image: '/images/meramec-state-park/overlook-pavilion.jpg', href: '/experiences/meramec-state-park' },
      { name: 'Tipsaw Lake Pavilion', location: 'Perry County, IN', duration: 'Daily', price: 'From $40', image: '/images/tipsaw-lake/shelter.jpg', href: '/tipsaw-lake-recreation-area' },
    ]
  },
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = categoryData[params.category]
  if (!category) {
    return {
      title: 'Category Not Found | BA Services',
      alternates: { canonical: `/experiences/categories/${params.category}` },
    }
  }
  return {
    title: `${category.name} | BA Services`,
    description: category.description,
    alternates: { canonical: `/experiences/categories/${params.category}` },
  }
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
                  <Link
                    href={exp.href || 'https://escape.baserves.com'}
                    className="mt-4 block w-full text-center py-3 bg-forest-DEFAULT text-white font-semibold rounded-lg hover:bg-forest-dark transition-colors"
                  >
                    View Details
                  </Link>
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
