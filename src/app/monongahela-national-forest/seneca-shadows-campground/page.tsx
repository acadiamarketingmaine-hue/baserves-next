import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Seneca Shadows Campground | Monongahela National Forest | BA Services',
  description: 'Seneca Shadows Campground sits in the shadow of the iconic Seneca Rocks — one of the most famous rock climbing destinations in the eastern United States. Locate',
  alternates: { canonical: '/monongahela-national-forest/seneca-shadows-campground' },
}

export default function SenecaShadowsCampgroundPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-forest-DEFAULT overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/monongahela/entrance-sign.jpg" alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="container-custom px-6 relative z-10">
          <div className="max-w-3xl">
            <Link href="/monongahela-national-forest" className="inline-flex items-center gap-2 text-green-300 hover:text-white text-sm mb-4 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Monongahela National Forest
            </Link>
            <h1 className="font-display headline-xl text-white mb-4">
              Seneca Shadows Campground
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Camp Beneath the Iconic Seneca Rocks
            </p>
            <a
              href="https://www.recreation.gov/camping/campgrounds/232095"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Book on Recreation.gov
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 py-8">
        <div className="container-custom px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">52</div>
              <div className="text-white/60 text-sm">Sites</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">Seneca Rocks</div>
              <div className="text-white/60 text-sm">Landmark</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">Apr–Nov</div>
              <div className="text-white/60 text-sm">Season</div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Seneca Shadows Campground</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Seneca Shadows Campground is set beneath the dramatic backdrop of Seneca Rocks, one of the most iconic climbing destinations in the eastern United States. Located within the Spruce Knob&ndash;Seneca Rocks National Recreation Area and near the North Fork of the South Branch of the Potomac River, the campground offers sweeping views of the 900-foot quartzite formation, visible from many campsites. Surrounded by mountains on both the east and west, the setting provides a striking and immersive Appalachian landscape.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                As the newest campground in the recreation area, Seneca Shadows combines modern amenities with exceptional access to outdoor recreation. Visitors are drawn to the area for hiking, rock climbing, fishing, and nature study, with nearby attractions including Seneca Rocks, local cave systems, and scenic river corridors.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                The campground accommodates a wide range of camping styles. Facilities include 11 standard sites with electric hookups, 2 double sites with electric, 23 standard non-electric sites, and 2 double non-electric sites. In addition, there are 40 walk-in tent sites and 3 group tent areas. Standard sites are equipped with paved spurs, picnic tables, fire rings, and lantern posts, while drinking water is available throughout the campground. An outdoor amphitheater with lighting, sound equipment, and seating supports interpretive programs and group gatherings.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Sanitary facilities are extensive and include two four-toilet vault restrooms, one double-toilet vault restroom, and four flush restroom buildings with showers. Trash dumpsters are conveniently located throughout the campground for waste disposal. An RV dump station is located adjacent to the host site, and the campground is supported by an on-site wastewater treatment system utilizing a recirculating sand filter.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Seneca Shadows Campground typically operates from early April through late October, aligning with peak seasonal demand.
              </p>
              <a
                href="https://www.recreation.gov/camping/campgrounds/232095"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Reserve Your Site
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Features &amp; Amenities</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Views of Seneca Rocks
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  River access for fishing
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Tent and RV sites
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Flush restrooms and showers
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Seneca Rocks Discovery Center nearby
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Rock climbing access
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Visit?</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Reservations are managed through Recreation.gov. Book your campsite today and experience the Monongahela National Forest.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://www.recreation.gov/camping/campgrounds/232095" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
              Book on Recreation.gov
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
            <Link href="/monongahela-national-forest" className="btn-secondary">
              Back to Monongahela NF
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
