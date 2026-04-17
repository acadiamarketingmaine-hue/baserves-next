import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Stuart Recreation Area | Monongahela National Forest | BA Services',
  description: 'Stuart Recreation Area offers family-friendly camping along the shores of a scenic mountain lake in the Monongahela National Forest. The area features both tent',
  alternates: { canonical: '/monongahela-national-forest/stuart-recreation-area' },
}

export default function StuartRecreationAreaPage() {
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
              Stuart Recreation Area
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Lakeside Camping and Recreation
            </p>
            <a
              href="https://www.recreation.gov/camping/campgrounds/232007"
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
              <div className="text-2xl md:text-3xl font-bold text-white">30+</div>
              <div className="text-white/60 text-sm">Sites</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">Mountain Lake</div>
              <div className="text-white/60 text-sm">Feature</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">May–Oct</div>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Stuart Recreation Area</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Stuart Recreation Area is a well-developed, family-friendly destination located along the Shavers Fork of the Cheat River, approximately six miles northeast of Elkins, West Virginia, at the junction of WV Route 6 and Forest Road 91 (Stuart Memorial Drive). Nestled in the Allegheny Mountains within the Monongahela National Forest, the site was originally constructed in the 1930s by the Civilian Conservation Corps and continues to offer a blend of historic character and modern amenities.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                The recreation area includes a campground, a group campground, and a day-use area, providing a wide range of overnight and day-use opportunities. The main campground features 26 campsites (25 single and 1 double), all with electric hookups, paved spurs, picnic tables, fire rings, and lantern posts. Most campsites and facilities are ABA accessible. Sanitary facilities include two single-unit vault toilets, one double-unit vault toilet, and a six-unit flush restroom with four accessible shower units.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                A separate group campground accommodates up to 40 people and includes fire rings, picnic tables, lantern posts, and two single-unit vault toilets. While there is no electric service at the group site, drinking water is available from the main campground. The group campground is not accessible.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                The day-use area is centered around picnicking and outdoor recreation along the river. It features three reservable pavilions: a large pavilion with electricity that can accommodate up to 100 people, and two non-electric pavilions&mdash;the Small Pavilion (capacity 50) and the Alpena Pavilion (capacity 25). Additional amenities include multiple picnic tables and pedestal grills, five parking areas accommodating approximately 25&ndash;40 vehicles each, a 14-acre open field, a river beach with easy water access, a volleyball net, and four restroom buildings, including changing rooms. Key facilities, including restrooms, parking areas, and the large and small pavilions&mdash;are accessible.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                A unique feature of the site is the historic Stuart House, a renovated cabin listed on the National Register of Historic Places and available to reserve. The fully furnished cabin includes a complete kitchen, one full bathroom, two living areas, a study room, and two bedrooms with a total of four beds. The cabin is equipped with electric heat and public water and is connected to the on-site wastewater system, though it does not have air conditioning.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Recreational opportunities throughout the area include camping, fishing, swimming, hiking, and relaxing along the scenic river corridor.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Support facilities include trash dumpsters located in both the campground and recreation area, with additional trash receptacles at pavilions and the group site. An RV dump station is located adjacent to the campground. The site is supported by an on-site wastewater treatment system utilizing a recirculating sand filter.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Stuart Recreation Area offers a balanced mix of history, accessibility, and outdoor recreation, making it a versatile destination for families, groups, and individual visitors alike. Stuart typically operates from mid-April through late October, aligning with peak seasonal demand.
              </p>
              <a
                href="https://www.recreation.gov/camping/campgrounds/232007"
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
                  Lakeside campsites
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Swimming beach
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Fishing access
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Hiking trails
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Picnic areas
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Vault restrooms
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
            <a href="https://www.recreation.gov/camping/campgrounds/232007" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
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
