import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Jess Judy Group Campground | Monongahela National Forest | BA Services',
  description: 'Jess Judy Group Campground provides dedicated group camping facilities in the heart of the Monongahela National Forest. Ideal for scout troops, family reunions,',
  alternates: { canonical: '/monongahela-national-forest/jess-judy-group-campground' },
}

export default function JessJudyGroupCampgroundPage() {
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
              Jess Judy Group Campground
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Group Camping in the Allegheny Highlands
            </p>
            <a
              href="https://www.recreation.gov/camping/campgrounds/233725"
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
              <div className="text-2xl md:text-3xl font-bold text-white">Group Only</div>
              <div className="text-white/60 text-sm">Type</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">Large Groups</div>
              <div className="text-white/60 text-sm">Capacity</div>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Jess Judy Group Campground</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Jess Judy Group Campground is a primitive group camping area located in Smoke Hole Canyon along State Route 2, just south of Big Bend Campground and adjacent to the South Branch of the Potomac River. Set within the hardwood forests of the Allegheny Mountains, the site provides a quiet, natural setting well-suited for organized groups.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Designed to accommodate larger gatherings, the campground features three reservable group sites, each capable of hosting up to 40 people. It is an ideal location for scout troops, family reunions, church groups, and outdoor education programs seeking a more rustic experience.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Each site is equipped with fire rings, picnic tables, and lantern posts. The campground also includes four single-unit vault toilets. As a primitive facility, Jess Judy does not offer electric service or on-site drinking water; however, potable water and a dump station are available nearby at Big Bend Campground. The dump station includes an underground holding tank and is supported by a wastewater treatment system (filtered drain field).
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Recreational opportunities are abundant in the surrounding area. The nearby river provides excellent fishing and canoeing, while the North Fork Mountain Trail&mdash;located close by&mdash;offers outstanding hiking and mountain biking. Additional trail access can be found throughout Smoke Hole Canyon.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                The campground is not accessible and typically operates from early April through the end of October, aligning with the primary recreation season in the region.
              </p>
              <a
                href="https://www.recreation.gov/camping/campgrounds/233725"
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
                  Reservable group sites
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Large capacity for organizations
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Picnic pavilions
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Vault restrooms
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Campfire rings
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Forest trail access
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
            <a href="https://www.recreation.gov/camping/campgrounds/233725" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
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
