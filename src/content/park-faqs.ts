import type { ParkFaqItem } from '@/components/property/lakeside'

/**
 * Verified seasonal planning & visitor FAQs for recreation areas and state park
 * guides. Every answer reflects real published property facts and booking flows.
 */
export const PARK_FAQS: Record<string, ParkFaqItem[]> = {
  'hoosier-national-forest': [
    {
      question: 'Which recreation areas in Hoosier National Forest can I reserve?',
      answer:
        'BA Services manages three developed recreation areas in Hoosier National Forest: Hardin Ridge on Monroe Lake, Indian-Celina Lakes in Perry County, and Tipsaw Lake Recreation Area. Each offers online campsite reservations through Recreation.gov.',
    },
    {
      question: 'When is Hoosier National Forest open for camping and day use?',
      answer:
        'Hoosier National Forest trails and dispersed recreation areas are open year-round, while developed campgrounds at Hardin Ridge, Indian-Celina Lakes, and Tipsaw Lake operate seasonally from early April through late October.',
    },
    {
      question: 'What is the Charles C. Deam Wilderness?',
      answer:
        'Spanning 13,000 acres along the southern shore of Monroe Lake, the Charles C. Deam Wilderness is Indiana\'s only federally designated wilderness area, offering non-motorized hiking, backpacking, and scenic ridgelines.',
    },
    {
      question: 'Where can I compare campgrounds, activities, and rates across BA Services parks?',
      answer:
        'Browse our full Experiences directory to compare campgrounds, lakes, and trails, or review our Pricing page for current camping and recreation rates across all managed locations.',
    },
  ],
  'hardin-ridge-recreation-area': [
    {
      question: 'How do I reserve a campsite at Hardin Ridge Recreation Area?',
      answer:
        'Campsites and group shelters at Hardin Ridge Recreation Area in Hoosier National Forest can be reserved online through the booking link on this page. Reserve early for summer weekends and fall foliage dates around Monroe Lake.',
    },
    {
      question: 'What water and boating amenities are available at Hardin Ridge?',
      answer:
        'Hardin Ridge sits directly on Monroe Lake and features an accessible boat dock and launch ramp, a designated swimming beach, and shoreline fishing access for campers and day-use visitors.',
    },
    {
      question: 'Are there electric hookups and bathhouses in the campground?',
      answer:
        'Yes. Hardin Ridge offers wooded campsites with electric hookups, modern restroom and bathhouse facilities, shelter houses for group gatherings, and access to Hoosier National Forest trails.',
    },
    {
      question: 'When is the best season to visit Hardin Ridge Recreation Area?',
      answer:
        'Late spring through early fall is peak season for boating, swimming, and lakeside camping on Monroe Lake, while autumn brings cooler nights and vibrant hardwood foliage across southern Indiana.',
    },
  ],
  'tipsaw-lake-recreation-area': [
    {
      question: 'How do I book a campsite at Tipsaw Lake Recreation Area?',
      answer:
        'Use the reservation button on this page to check open dates and book campsites at Tipsaw Lake Recreation Area in Perry County, Indiana. Advance reservations are recommended for holiday and summer weekends.',
    },
    {
      question: 'What activities are available at Tipsaw Lake?',
      answer:
        'Visitors enjoy a sandy swimming beach, electric-motor and paddle boating, shoreline and boat fishing, hiking and mountain biking on the Tipsaw Lake Trail, and programs at the amphitheater.',
    },
    {
      question: 'Can groups reserve a shelter house at Tipsaw Lake?',
      answer:
        'Yes. The Catbrier Shelter House and nearby picnic areas accommodate family reunions and group day-use outings right near the lake and swimming beach.',
    },
    {
      question: 'What camping loops and facilities are on site?',
      answer:
        'Tipsaw Lake features wooded campground loops including Twin Oaks, restroom and shower facilities, a boat launch, and direct access to Hoosier National Forest trails.',
    },
  ],
  'indian-celina-lakes-recreation-area': [
    {
      question: 'How do I reserve a campsite at Indian-Celina Lakes Recreation Area?',
      answer:
        'Campsites at Indian-Celina Lakes in Hoosier National Forest can be booked directly through the online reservation link on this page. Booking ahead is encouraged for spring fishing and summer weekends.',
    },
    {
      question: 'Is there an accessible fishing pier and boat launch?',
      answer:
        'Yes. Indian-Celina Lakes includes an accessible fishing pier, a public boat launch for electric-motor boats and kayaks, and calm coves stocked for freshwater fishing.',
    },
    {
      question: 'What hiking trails connect to Indian-Celina Lakes?',
      answer:
        'Campers have direct access to the Two Lakes Loop Trail and surrounding Hoosier National Forest trailheads, winding past Celina Lake, Indian Lake, and wooded ridges.',
    },
    {
      question: 'What restroom and campground amenities are provided?',
      answer:
        'The campground provides wooded sites, a modern restroom and shower house, picnic tables, fire rings, and quiet lakeside access away from heavy highway traffic.',
    },
  ],
  'yankee-springs-recreation-area': [
    {
      question: 'How do I book lodging or group facilities at Yankee Springs Recreation Area?',
      answer:
        'Use the booking link on this page to check availability for Chief Noonday Outdoor Center and Long Lake Outdoor Center, or call our team directly for multi-cabin retreats and seasonal group dates.',
    },
    {
      question: 'What historic lodging options are available at Yankee Springs?',
      answer:
        'Our outdoor centers feature Civilian Conservation Corps-era Hill Cabins, Lake Cabins, and group bunkhouses including the Stage House, Road House, Infirmary, and Mansion House.',
    },
    {
      question: 'What seasons can groups reserve Chief Noonday and Long Lake?',
      answer:
        'Both outdoor centers host seasonal retreats, youth camps, family reunions, and private events from spring through autumn, with peak availability booking several months in advance.',
    },
    {
      question: 'What outdoor recreation surrounds Yankee Springs?',
      answer:
        'Yankee Springs Recreation Area spans over 5,000 acres in southwestern Michigan with inland lakes, swimming, paddling, and miles of hiking and mountain biking trails.',
    },
  ],
  'washington-state-park': [
    {
      question: 'How do I reserve a cabin or campsite at Washington State Park?',
      answer:
        'Use the reservation button on this page to check real-time availability and book historic CCC cabins or park lodging at Washington State Park near De Soto, Missouri.',
    },
    {
      question: 'What makes Washington State Park unique in Missouri?',
      answer:
        'Washington State Park preserves more than 350 ancient Native American petroglyphs alongside Civilian Conservation Corps stone architecture, forested Ozark trails, and frontage on the Big River.',
    },
    {
      question: 'Are there swimming, fishing, and camp store amenities on site?',
      answer:
        'Yes. Visitors have access to the seasonal swimming pool, Big River fishing and floating access, marked hiking trails, birding habitats, and the on-site camp store for supplies.',
    },
    {
      question: 'When is the best time to visit Washington State Park?',
      answer:
        'Spring and fall offer mild temperatures for hiking the petroglyph trails and fishing the Big River, while summer brings full pool hours, camp store service, and family cabin stays.',
    },
  ],
  'burlingame-state-park': [
    {
      question: 'How do I book a campsite at Burlingame State Park in Rhode Island?',
      answer:
        'Click the reservation link on this page to browse open dates and reserve a site across the Main Camp Area, 400 Area, or 500 Area at Burlingame State Park in Charlestown, Rhode Island.',
    },
    {
      question: 'How close is Burlingame State Park to Rhode Island beaches and Watchaug Pond?',
      answer:
        'Burlingame surrounds freshwater Watchaug Pond with its own swimming beach and boat launch, and sits just minutes from southern Rhode Island ocean beaches along Block Island Sound.',
    },
    {
      question: 'What camping areas and amenities are available inside the park?',
      answer:
        'The campground features wooded tent and RV sites across the Main, 400, and 500 areas, along with restroom and shower facilities, a camp store, arcade, and freshwater pond access.',
    },
    {
      question: 'When should I book for peak summer weekends at Burlingame?',
      answer:
        'July and August weekends fill quickly at Burlingame State Park. Reserving online well ahead of your travel dates gives you the widest choice of loops and site sizes.',
    },
  ],
  'meramec-state-park': [
    {
      question: 'How do I book a cabin or river float at Meramec State Park?',
      answer:
        'Use the booking link on this page to reserve 1-bedroom, 2-bedroom, or large group cabins at Meramec State Park near Sullivan, Missouri, and arrange canoe, kayak, or raft rentals through the Riverstop Store.',
    },
    {
      question: 'Can visitors tour Fisher Cave during their stay?',
      answer:
        'Yes. Guided tours of Fisher Cave showcase calcite formations, underground streams, and Ozark geology right inside Meramec State Park.',
    },
    {
      question: 'What stores and dining options are inside Meramec State Park?',
      answer:
        'Both the Riverstop Store & Float Rentals and the Fireside Store & Grill operate on site, providing groceries, camping gear, hot meals, and river float outfitting.',
    },
    {
      question: 'What seasons are best for floating the Meramec River and cabin stays?',
      answer:
        'Summer is prime for floating the spring-fed Meramec River, while spring and autumn deliver crisp hiking weather through the Meramec Upland Forest Natural Area and quieter cabin weekends.',
    },
  ],
  'clear-creek-recreation-area': [
    {
      question: 'How do I reserve a campsite at Clear Creek Recreation Area?',
      answer:
        'Select the reservation button on this page to book sites in Fox Loop, Hoot Owl Loop, Fawn Loop, Bear Loop, or the group camping area on Lewis Smith Lake in Bankhead National Forest.',
    },
    {
      question: 'What water and day-use facilities does Clear Creek offer?',
      answer:
        'Clear Creek Recreation Area sits on Lewis Smith Lake and includes a sandy swimming beach, boat launch access, picnic areas, and shaded lakeside campsites.',
    },
    {
      question: 'Are group camping areas available at Clear Creek?',
      answer:
        'Yes. Clear Creek features dedicated group camping facilities ideal for family reunions, scouting trips, and church or outdoor club retreats in northern Alabama.',
    },
    {
      question: 'When is peak camping season at Bankhead National Forest?',
      answer:
        'Spring through fall is peak season for lakeside swimming, boating, and hiking Bankhead National Forest waterfalls and trails, with warm lake temperatures lasting well into early autumn.',
    },
  ],
  'corinth-recreation-area': [
    {
      question: 'How do I book a campsite at Corinth Recreation Area?',
      answer:
        'Use the online reservation link on this page to book sites in Yellow Hammer Loop or Firefly Loop at Corinth Recreation Area on Lewis Smith Lake in Bankhead National Forest.',
    },
    {
      question: 'Does Corinth Recreation Area have a boat ramp and swimming beach?',
      answer:
        'Yes. Corinth features a double-lane boat ramp on Lewis Smith Lake, a designated swimming beach, picnic sites, a group pavilion, and access to the Bobwhite Trail.',
    },
    {
      question: 'What camping loops are available at Corinth?',
      answer:
        'Corinth Recreation Area offers full-featured campsites across Yellow Hammer Loop and Firefly Loop with modern bathhouses and wooded privacy near the water.',
    },
    {
      question: 'What is the best time of year to camp at Corinth Recreation Area?',
      answer:
        'Spring and autumn bring mild hiking weather along the Bobwhite Trail and prime bass fishing on Lewis Smith Lake, while summer is ideal for swimming and family boating trips.',
    },
  ],
  'canal-bridge': [
    {
      question: 'How do I reserve a campsite at Canal Bridge Campground in Fryeburg, Maine?',
      answer:
        'Click the booking button on this page to check open dates and reserve your campsite at Canal Bridge Campground directly along the Saco River in Fryeburg, Maine.',
    },
    {
      question: 'Does Canal Bridge Campground have direct Saco River beach and paddling access?',
      answer:
        'Yes. Campers have direct access to the Saco River sandy beach and river put-in for kayaking, canoeing, swimming, and freshwater fishing right from the campground.',
    },
    {
      question: 'What amenities are included for campers at Canal Bridge?',
      answer:
        'Canal Bridge offers wooded riverside sites, clean restroom facilities, picnic tables, fire rings, and convenient proximity to Fryeburg and the White Mountains.',
    },
    {
      question: 'When should I book a Saco River camping weekend?',
      answer:
        'Summer weekends from late June through Labor Day and Fryeburg Fair week in early October are the most popular dates—booking online early secures your preferred site.',
    },
  ],
  'stuart-recreation-area': [
    {
      question: 'How do I reserve a campsite at Stuart Recreation Area?',
      answer:
        'Use the reservation button on this page to check seasonal dates and book a campsite at Stuart Recreation Area in West Virginia’s Monongahela National Forest.',
    },
    {
      question: 'What outdoor activities are available around Stuart Recreation Area?',
      answer:
        'Visitors enjoy swimming and wading along Shavers Fork, picnicking under historic CCC pavilions, hiking forest trails, and exploring nearby scenic drives across the Monongahela.',
    },
    {
      question: 'Are there other BA Services campgrounds nearby in Monongahela National Forest?',
      answer:
        'Yes. Nearby Monongahela campgrounds include Big Bend, Gatewood Group, Jess Judy Group, Seneca Shadows, and Spruce Knob Lake—all linked directly from this page.',
    },
    {
      question: 'When is the best season to visit Stuart Recreation Area?',
      answer:
        'Late spring through early fall offers the best access for mountain camping, river swimming, and vibrant autumn foliage across Randolph County and the Allegheny Highlands.',
    },
  ],
  'long-lake-outdoor-center': [
    {
      question: 'How many guests can Long Lake Outdoor Center accommodate?',
      answer:
        'Long Lake Outdoor Center accommodates approximately 120 guests across 16 cabins (divided between the Hill Unit and the Lake Unit), four bunkhouses, and a 120-seat central lodge with two stone fireplaces and a commercial kitchen.',
    },
    {
      question: 'How do I book a wedding weekend or group retreat at Long Lake?',
      answer:
        'Check open dates online using the booking button on this page, or call our Long Lake office directly at (616) 644-9459 to reserve the camp for weddings, church retreats, family reunions, or youth camps.',
    },
    {
      question: 'What is included in a Long Lake wedding weekend package?',
      answer:
        'A wedding weekend runs Friday at 3pm through Sunday at 11am with exclusive use of the lodge, dining hall, commercial kitchen, 16 cabins, 4 bunkhouses, and private lakefront, with cleaning included ($3,800 in 2027, $4,300 in 2028).',
    },
    {
      question: 'When is Long Lake Outdoor Center open each year?',
      answer:
        'Long Lake Outdoor Center operates seasonally from spring through autumn inside Yankee Springs Recreation Area in Barry County, Michigan. Contact our office for current opening and closing dates.',
    },
  ],
  'chief-noonday-outdoor-center': [
    {
      question: 'Which cabins are available to rent at Chief Noonday Outdoor Center?',
      answer:
        'Four semi-rustic cabins are available along Chief Noonday Lake: Bear Den (sleeps 6), Chickadee Cabin (sleeps 4), Crane House/Jee-Jak Wigwam (sleeps 8), and Deer Lodge (sleeps 8), accommodating up to 26 guests total.',
    },
    {
      question: 'What amenities are inside the Chief Noonday cabins?',
      answer:
        'Each cabin includes electricity, electric heat, a mini fridge, microwave, and coffee maker, with stone fireplaces in Bear Den, Crane House, and Deer Lodge. Outside each cabin you will find a picnic table, fire pit, and grill, with a hand water pump and vault toilet nearby.',
    },
    {
      question: 'How do I reserve Chief Noonday Outdoor Center for a group?',
      answer:
        'Use the Check Availability button on this page to reserve cabins online through our booking portal, or call (616) 644-9459 for scout outings, church retreats, family reunions, and team-building stays.',
    },
    {
      question: 'Where is Chief Noonday Outdoor Center located?',
      answer:
        'Chief Noonday Outdoor Center is located inside Yankee Springs Recreation Area in Barry County near Middleville, Michigan, originally built in 1938 and listed on the National Register of Historic Places.',
    },
  ],
}
