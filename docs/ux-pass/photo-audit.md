# Photo audit and shot list (UX pass, item 2: photography)

Branch `ux-photos`, 2026-09-24. I opened and looked at every image file in `public/images`: 183 distinct photos, not counting the state badges, Treeko and the smaller size copies of the same photo. 159 of them are used somewhere in `src/`. No image files were added, deleted or edited. Every fix points to a photo that was already in the repo.

**Verdicts:** **right** = the photo shows the place or thing named · **wrong place** = it shows a different property or a different subject · **sign-only** = the right place, but only a sign or notice board · **low quality** = the right subject, but too small (under about 1000px), soft, sideways or dated · **reused** = the same photo is used for several different things.

## Findings that need John or the camp

1. **Two Yankee Springs photos are stored sideways.** `yankee-springs/infirmary.jpg` and `yankee-springs/stage-house.jpg` have no rotation tag, so every browser shows them on their side. They still appear on the Yankee Springs page (gallery, plus the Stage House and Infirmary bunkhouse cards). I took them out of the map tour. The fix is one command each, `sips -r 90 <file>`, but that edits an image file, so I left it for you.
2. **Some photos have misleading names.** `burlingame-aerial.jpg` is the entrance sign. `hardin-ridge/aerial.jpg` is a view from a deck. `long-lake/fall-aerial.jpg` is foliage. `long-lake/lake.jpg` is a group photo of about 25 children. `long-lake/cabins.jpg` and `long-lake/bathhouse.jpg` show children on the dock. `washington-state-park/cabin-11-exterior.png` is a living room. `indian-celina/lake-aerial.jpg` is a copy of `fall-road.jpg`. `tipsaw-lake/lake-view.jpg` is a picnic shelter in winter. `clear-creek-boat-ramp.jpg` is a sideways sign. `clear-creek-group-camping.jpg` is a ROAD CLOSED barricade. `corinth-swimming.jpg` is a parked car on a road. Renaming the files would change their URLs, so I left the names alone and made sure no slot relies on them.
3. **Where DSC_0103 was taken.** The brief calls it a Meramec photo. It shows a Forest Service "Raven Trail" sign with wooden steps, and it belongs to the same `DSC_` series as the Clear Creek entrance sign (`DSC_0001`). Clear Creek has the 2.5-mile Raven Interpretive Trail. I now use it only for the Raven Trail and hiking slots. John, please confirm.
4. **Some source files are very large.** `indian-celina/fishing-pier.jpg` is 14 MB, `trail-sign.jpg` and `two-lakes-loop-sign.jpg` are 5.9 MB each, and `boat-launch.jpg` is 4 MB. Pages serve them through next/image, which resizes them. The map tour used a plain `<img>`, which downloads the full file, so I removed the pier photo from the tour.
5. **Photos with recognizable people.** Before these are used more widely, check that the people shown agreed to it. `long-lake/lake.jpg` (children's faces, now used nowhere). `long-lake/dock.jpg`, `wedding-ceremony.jpg` and `winter.jpg` (racers wearing bibs). `washington-state-park/store.jpg` (two shoppers) and `pool.png`. `burlingame-kayaks.png`, `burlingame-beach.png` and `burlingame-swimming.png` (small figures).
6. **Code nobody sees.** The `canal-bridge`, `corinth-…`, `meramec-state-park`, `clear-creek-…` and `burlingame-…` entries in `src/app/experiences/[slug]/page.tsx` never render, because each has its own page folder that takes priority. They still point at signs and at other places' photos, for example Meramec is shown with DSC_0103 and a Monongahela panorama. I left them unchanged. Only `celina-lakes-recreation-area` in that file renders, and I fixed it.

## (a) Hero and card images

"Home/menu/map" means the same card shown in `HomeClient.tsx` (state tabs and the locations grid), `Navigation.tsx` (the Experiences mega-menu and mobile list), `PropertyMap.tsx` (map pins) and the `/experiences` list.

### Site-wide and generic pages

| Page | Slot | Was | What it shows | Verdict | Action |
|---|---|---|---|---|---|
| /experiences, /contact, /services | Banner background + share image | bankhead-forest(-1600).jpg | Sepia photo of a man beside a 1920s car | wrong place | → Burlingame1 (Experiences), long-lake/weddings/lake-dock-wide (Contact), Burlingame2 (Services) |
| Services menu | Iowa DOT tile | bankhead-forest.jpg | Vintage car | wrong place | → iowa-dot-collage-web.jpg |
| Services menu | Utah DOT tile | monongahela/spruce-knob-panorama | West Virginia mountains | wrong place | → utah-welcome-sign-1600.jpg |
| /about | Hero | monongahela/spruce-knob-panorama | Mountain panorama | right (generic) | kept |
| /careers | Hero | long-lake/fall-foliage | Autumn trees | right (generic) | kept |
| /leave-a-review | Hero | Burlingame1 | Watchaug Pond | right (generic) | kept |
| /services cards, /services/[slug] | Service images | fall-foliage, Burlingame1, DSC_0103, DSC_0001, spruce-knob-panorama | Scenery and signs from our parks | right (generic stock of our own parks) | kept; a real crew-at-work shot would be better (shot list) |
| /services/iowa-dot, /utah-dot | Hero | iowa-dot-collage, utah-welcome-sign | Correct | right | kept |

### /experiences category tiles and /experiences/categories/*

| Page | Slot | Was | What it shows | Verdict | Action |
|---|---|---|---|---|---|
| /experiences | Campground Rentals tile | DSC_0001 | Clear Creek entrance sign | sign-only | → indian-celina/campsite2 (tents at a campsite) |
| /experiences | Hiking Trails tile | Burlingame1 | Lake, no trail | wrong subject | → DSC_0103 (Raven Trail steps) |
| /experiences | Kayak & Watercraft tile | Canal-Bridge-Entrance-1 | Entrance sign | sign-only | → burlingame-kayaks.png |
| /experiences | Lookout Pavilions tile | monongahela/entrance-sign | Sign | sign-only | → meramec overlook-pavilion |
| /experiences | Scenic Drives tile | monongahela/entrance-sign | Sign | sign-only | → monongahela/scenic-drive |
| /experiences | Conference Centers tile | long-lake/lodge.jpg | Brick building (not the timber lodge the copy describes) | unclear | → long-lake/weddings/dining-hall (lodge great room) |
| Kayak | Hero | burlingame-kayaks.png | Kayaks on a Watchaug Pond beach, 2 people | right, low quality (1019px) | kept; shot list |
| Kayak | Meramec River Float Trips | riverstop-store | Store building and parking lot | wrong subject | → Meramec-State-Park-Overview-Image (the river) |
| Kayak | Washington State Park Watercraft | washington-state-park/store | Two shoppers in the camp store | wrong subject | left; shot list |
| Kayak | Burlingame Boating | burlingame-entrance-sign | Sign | sign-only | → Burlingame1 (pond with a boat) |
| Campground | Hero | corinth-boat-ramp | Road down to Lewis Smith Lake | right | kept |
| Campground | 12 property cards | signs, and the lake-view shelter for Tipsaw | see property rows below | sign-only | → same swaps as home/menu/map |
| Hiking | Hero | bankhead-bicycle-trail | Paved trail by the lake | right | kept |
| Hiking | Monongahela Trails | monongahela/entrance-sign | Sign | sign-only | → spruce-treetops |
| Hiking | **Sipsey Wilderness Trails** | bankhead-forest.jpg | Vintage car | wrong place | → Bankhead-Waterfall.png (500px; shot list) |
| Hiking | Yankee Springs Trail System | yankee-springs/hill-cabins | Picnic area with fire ring | wrong subject | left; shot list |
| Hiking | Hardin Ridge Trails | hardin-ridge-entrance-sign | Sign | sign-only | → hardin-ridge/overlook |
| Hiking | Indian-Celina Two Lakes Loop | indian-celina/trail-sign | Two Lakes Loop trail sign | sign-only (relevant) | kept |
| Hiking | Washington State Park Trails | thunderbird lodge | Stone lodge | wrong subject | left; shot list |
| Hiking | Meramec State Park Trails | meramec-entrance-sign | Sign | sign-only | left; shot list |
| Hiking | Tipsaw Lake Trails | tipsaw-lake/lake-view | Winter picnic shelter | wrong subject | → tipsaw-lake/amphitheater (on the interpretive trail) |
| Hiking | Raven Interpretive Trail | clear-creek-overview | Clear Creek entrance sign | sign-only | → DSC_0103 (Raven Trail sign and steps) |
| Hiking | Burlingame Trails | burlingame-entrance-sign | Sign | sign-only | left; shot list |
| Scenic Drives | Hero + Highland Scenic Highway | monongahela/entrance-sign | Sign | sign-only | → monongahela/scenic-drive (a Monongahela road; not confirmed to be the Highland Scenic Highway) |
| Scenic Drives | Bankhead NF Scenic Drive | bankhead-forest.jpg | Vintage car | wrong place | → corinth-boat-ramp |
| Scenic Drives | **Hoosier National Forest Drive** | DSC_0103 | Raven Trail sign (Alabama) | wrong place | → indian-celina/fall-road (autumn road in Hoosier NF) |
| Conference | Hero + Long Lake card | long-lake/lodge.jpg | Brick building | unclear | → long-lake/weddings/dining-hall |
| Conference | Meramec Conference Center | meramec conference-center | Sign on the building wall | sign-only | left; shot list |
| Conference | Corinth Pavilion | corinth-pavilion | Open pavilion with tables | right | kept |
| Lookout | Hero + Meramec Overlook Pavilion | overlook-pavilion | Pavilion in trees | right | kept |
| Lookout | Hardin Ridge Picnic Shelters | DSC_0103 | Raven Trail sign (Alabama) | wrong place | → hardin-ridge/shelter |
| Lookout | Clear Creek Group Shelters | clear-creek-overview | Sign | sign-only | → clear-creek-shelter (day-use walkway; no shelter building visible) |
| Lookout | Tipsaw Lake Pavilion | tipsaw-lake/shelter | Picnic shelter | right | kept |

### Property cards (home, menu, map, /experiences list, campground category)

| Property | Was | What it shows | Verdict | Now |
|---|---|---|---|---|
| Bankhead National Forest | bankhead-forest.jpg | Vintage car | wrong place | bankhead-bicycle-trail |
| Clear Creek | clear-creek-overview | Entrance sign | sign-only | clear-creek-swimming |
| Corinth | corinth-boat-ramp | Road to the lake | right | kept |
| Hoosier National Forest | hardin-ridge-entrance-sign (home, menu); hardin-ridge/aerial (menu) | Sign; deck view of lake | sign-only; right | indian-celina/fall-road; aerial kept |
| Hardin Ridge | hardin-ridge-entrance-sign | Sign | sign-only | hardin-ridge/beach (700px) |
| Indian-Celina | indian-celina-entrance-sign | Sign | sign-only | indian-celina/lake-view |
| Tipsaw | tipsaw-entrance-sign / tipsaw-lake/lake-view | Blurry sign; winter shelter | sign-only / wrong subject | tipsaw-lake/beach-swimming |
| Canal Bridge | Canal-Bridge-Entrance-1 / canal-bridge/entrance | Sign | sign-only | canal-bridge/beach-1 |
| Yankee Springs | yankee-springs/hill-cabins | Picnic grove with fire ring | right | kept |
| Chief Noonday | chief-noonday/deer-lodge | Deer Lodge (stone and timber) | right, low quality (666px) | kept |
| Long Lake | fall-aerial / fall-foliage | Autumn foliage (not aerial) | right (generic) | kept |
| Meramec | meramec-entrance-sign | Stone sign | sign-only | meramec-state-park/cabin-2 |
| Washington | washington-thunderbird-lodge (home state tab: **Burlingame2**) | Lodge; Rhode Island pond | right, low quality (823px); wrong place | Burlingame2 → thunderbird lodge |
| Burlingame | burlingame-entrance-sign | Sign | sign-only | Burlingame2 (Watchaug Pond shore) |
| Monongahela NF | monongahela/entrance-sign | Sign | sign-only | spruce-knob-panorama |
| Monongahela campgrounds (home state tab) | entrance-sign ×6 | Forest sign | sign-only | Seneca Shadows → seneca-rocks-sign, Spruce Knob Lake → spruce-knob-sign (right area); other 4 left |
| Monongahela campgrounds (menu) | scenic-drive, spruce-treetops, seneca-rocks-sign, spruce-knob-sign, spruce-knob-panorama, entrance-sign | Forest scenery, not the campgrounds | reused / generic | left; shot list |

### Property pages (heroes, section cards, galleries)

| Page | Slot | Was | What it shows | Verdict | Action |
|---|---|---|---|---|---|
| Bankhead NF | Hero | bankhead-forest.jpg, alt "Land of a Thousand Waterfalls" | Vintage car | wrong place | → clear-creek-swimming, alt describes the beach |
| Bankhead NF | Gallery #1 | bankhead-forest.jpg "landscape" | Vintage car | wrong place | → DSC_0103 "Raven Trail sign and wooden steps" |
| Bankhead NF | Corinth card | clear-creek-acorn-camp, alt "Corinth" | A Clear Creek group camp | wrong place | → corinth-boat-ramp |
| Bankhead NF | Clear Creek card | clear-creek-bent-twig | Bent Twig Camp path and sign | right | alt made specific |
| Bankhead NF | Waterfalls card | Bankhead-Waterfall.png | Waterfall | right, low quality (500px) | kept; shot list |
| Bankhead NF | Shooting range section | bankhead-bicycle-trail | Bicycle trail | wrong subject | alt corrected; shot list |
| Bankhead NF | Quail habitat section | clear-creek-fox-loop "forest habitat" | Campground road with Fox Loop sign | wrong subject | alt corrected; shot list |
| Clear Creek | Hero | clear-creek-overview | Entrance sign | sign-only | → clear-creek-swimming |
| Clear Creek | Fox Loop card | clear-creek-camping | Generic campground road | unclear | → clear-creek-fox-entrance (Fox Loop road and sign) |
| Clear Creek | Hoot Owl Loop card | clear-creek-hoot-owl-loop | Campsite with table | right | kept |
| Clear Creek | Fawn Loop card | clear-creek-fawn-loop | Notice board | sign-only | left; shot list |
| Clear Creek | Bear Loop card | clear-creek-overview | Entrance sign | sign-only | left; shot list |
| Clear Creek | Group Camping | clear-creek-group-camping | ROAD CLOSED barricade | wrong subject | → clear-creek-acorn-camp |
| Clear Creek | Bent Twig / Acorn / Fox Loop cards | matching files | Correct camps, mostly signs | right / sign-only | kept |
| Clear Creek | Gallery | 12 photos | Includes a sideways sign ("boat ramp") and the barricade | low quality | removed those 2; 4 alts corrected |
| Corinth | Hero | corinth-boat-ramp | Road to the lake | right | kept |
| Corinth | Yellow Hammer / Firefly loop cards | corinth-camping-loop / corinth-firefly-loop | Gravel loop road / notice board | right-ish / sign-only | left; shot list |
| Corinth | Gallery | 6 photos | "Swimming beach" was a parked car | wrong subject | removed it; rules-board alt corrected |
| Hardin Ridge | Hero | hardin-ridge-entrance-sign, alt "beach" | Sign | sign-only | → hardin-ridge/boat-dock (1126px); alt describes it |
| Hardin Ridge | Campsites / Dock / Shelter / Bath-house cards | matching files | Correct | right, low quality (663–1126px) | kept; shot list |
| Hardin Ridge | Gallery "aerial view" | hardin-ridge/aerial | Lake seen from a deck | right, wrong alt | alt corrected |
| Indian-Celina | Hero | indian-celina-entrance-sign | Sign | sign-only | → indian-celina/boat-launch (4500px) |
| Indian-Celina | Pier / Campground / Boat launch / Restroom cards | matching files | Correct | right | kept |
| Indian-Celina (old URL /experiences/celina-lakes-recreation-area) | Hero + gallery | Burlingame1, Burlingame2, DSC_0001 | Rhode Island pond; Alabama sign | wrong place | → boat-launch, lake-view, campsite2, fall-road |
| Tipsaw | Hero | tipsaw-lake/lake-view | Winter picnic shelter, 700px | wrong subject | → tipsaw-lake/beach-swimming |
| Tipsaw | Beach / Shelter / Amphitheater / Campgrounds / Twin Oaks / Rickenbaugh / Restroom cards | matching files | Correct | right (several 585–632px) | kept; "Twin Oaks facility" → "picnic shelter" |
| Tipsaw | Gallery | 9 photos | "Scenic view of Tipsaw Lake" was a shelter; "campsite in the forest" was an RV loop | wrong alt | alts corrected |
| Hoosier NF | Hero | hardin-ridge/aerial, 700px | Deck view | low quality | → indian-celina/boat-launch |
| Hoosier NF | 3 recreation-area cards | 2 entrance signs + Tipsaw shelter | Signs / shelter | sign-only | → hardin-ridge/beach, indian-celina/lake-view, tipsaw-lake/beach |
| Canal Bridge | Hero | canal-bridge/entrance | Sign | sign-only | → canal-bridge/beach-1 (the same photo also appears lower on the page) |
| Canal Bridge | Site cards 1–36 | canal-bridge/site-N | Trees with a site-number box; no pad or table visible | low quality | kept; shot list |
| Canal Bridge | Beach cards | beach-1, beach-2 | Sandy Saco River beach | right | kept |
| Burlingame | Hero | burlingame-entrance-sign | Sign | sign-only | → Burlingame1 (Watchaug Pond) |
| Burlingame | Camping section | Burlingame2, alt "Camping" | Rocky shoreline, no camping | wrong alt | alt corrected |
| Burlingame | Lakefront / map / gallery | burlingame-*.png | Correct; PNGs 500–1020px | right, low quality | kept |
| Yankee Springs | Hero + Hill Cabins | yankee-springs/hill-cabins | Picnic grove, fire ring, cabin in background | right | kept |
| Yankee Springs | Chief Noonday card | yankee-springs/lake-cabins | A Yankee Springs cabin | wrong place | → chief-noonday/deer-lodge |
| Yankee Springs | Long Lake card | yankee-springs/hill-cabins | Yankee Springs picnic grove | wrong place | → long-lake/weddings/lake-dock-wide |
| Yankee Springs | Stage House / Infirmary cards | stage-house, infirmary | Sideways photos | low quality | left; see finding 1 |
| Yankee Springs | Road House card | road-house | Wooded picnic site, no building visible | wrong subject | left (no Road House photo exists); shot list |
| Yankee Springs | Mansion House card | mansion-house | Brown single-story building | right | kept |
| Chief Noonday | Hero + gallery | deer-lodge, long-house, mess-hall (666–716px) | Correct buildings | right, low quality | alts changed from "gallery image 1/2/3" to the building names |
| Long Lake | Hero | long-lake/fall-aerial, alt "aerial view" | Foliage | right, wrong alt | alt corrected |
| Long Lake | Hill Cabins card | long-lake/cabins.jpg | Children on the dock | wrong subject | → long-lake/weddings/cabin-front |
| Long Lake | Lake Cabins card | long-lake/lake.jpg | Group photo of about 25 children | wrong subject | → long-lake/weddings/lake-dock |
| Long Lake | Lodge section | long-lake/dining-hall.png (331px) | Lodge exterior, thumbnail | low quality | → long-lake/weddings/dining-hall (great room) |
| Long Lake | Gallery | 12 photos | "Cabins", "waterfront" and "bathhouse" were children on the dock or the group photo; "lodge interior with fireplace" was a cabin kitchen | wrong subject / wrong alt | 3 swapped (cabins-lawn, lake-dock-wide, fire-pit); 6 alts corrected |
| Meramec | Hero | meramec-state-park/cabin-2, alt "along the river" | Cabin, no river visible | right, wrong alt | alt corrected |
| Meramec | Cabin cards (1-bed, 2-bed, large) | cabin-1, cabin-5, cabin-12-13 | Correct | right | kept |
| Meramec | Fisher Cave section | cabin-19 | A cabin | wrong subject | → Fisher-Cave-2 (gated cave mouth) |
| Meramec | Float the Meramec section | watercraft-rentals | Parking lot | wrong subject | → Meramec-State-Park-Overview-Image (river; 740px) |
| Meramec | Gallery "CCC monument" | meramec-entrance-sign | Entrance sign | wrong subject | → meramec-state-park/ccc-monument |
| Meramec | Visitor Center card | meramec-entrance-sign | Sign | sign-only | alt corrected; shot list |
| Meramec | Riverstop / Fireside / Motel / Conference / Rec Hall / Overlook cards | matching files | Correct (Fireside and Conference are signs) | right / sign-only | kept |
| Washington | Hero | washington-thunderbird-lodge (823px) | Stone Thunderbird Lodge | right, low quality | alt now names the lodge; shot list |
| Washington | Cabins "exterior" photo | thunderbird lodge, alt "Cabin 11 exterior" | The lodge | wrong subject | → washington-state-park/cabin-11-exterior.png (which is actually the living room); alt says so |
| Washington | Cabins "interior", pool, store | matching files | Bedroom; pool; shoppers | right | "interior" alt → "bedroom" |
| Monongahela NF | Hero | spruce-knob-panorama | Mountain panorama | right | kept |
| Monongahela NF | Spruce Knob / Seneca Rocks cards | spruce-knob-sign, seneca-rocks-sign | Road sign; Discovery Center sign | sign-only | alts corrected; shot list |
| Monongahela campground pages (6) | Hero | monongahela/entrance-sign, alt "" | Forest entrance sign | sign-only | left; shot list |
| Map tour (home) | First photo per stop | signs for 7 stops, the car for Bankhead, 2 sideways photos, 14 MB pier | — | sign-only / wrong / low quality | Each stop now opens on a real view; signs moved last; sideways photos and the 14 MB photo removed |

## (b) Shot list for the camp

**Specs for every photo:** Heroes are landscape, 3:2, at least 2400px on the long edge, horizon level, main subject slightly below center so the page heading can sit over the sky. Cards are 4:3, at least 1600px on the long edge. Shoot in season (leaves out, water open, beach set up) in morning or late-afternoon light. No close-up faces unless the person has signed a release; distant backs are fine. Don't show vehicles or license plates, and don't shoot on trash day. Send the camera originals, not screenshots or phone-app exports. **Signs are fine as extra gallery shots but never as the lead photo.**

### Hoosier NF: Hardin Ridge (High)
- **High.** Hero: wide view of Monroe Lake from the beach or boat dock, 3:2, ≥2400px. The current best is 1126px.
- **High.** Campsite with tent, table and fire ring (4:3). The current one is 663px.
- **Med.** Cabin exterior and interior, trail on the ridge, shelter house with lake view (4:3, ≥1600px).

### Hoosier NF: Tipsaw Lake (High)
- **High.** Hero: wide lake view from the beach toward the far shore, summer, 3:2, ≥2400px.
- **High.** Campsite with tent or RV pad, one per loop (4:3).
- **Med.** Trail photo on the lake loop. Catbrier shelter in summer (the current one is a 585px winter shot).
- **Low.** Entrance sign, sharp. The current one is a blurry 568px scan.

### Hoosier NF: Indian-Celina Lakes (Med)
- **Med.** Celina Lake from the accessible pier and the Two Lakes Loop trail itself, not the sign (4:3).
- **Low.** The existing boat-launch and pier photos are good. Just export smaller copies (≤3000px, ≤1 MB).

### Hoosier National Forest overview (Med)
- **Med.** Hero: a Hoosier landscape such as a ridge overlook or Hemlock Cliffs, 3:2, ≥2400px. The Indian-Celina launch is standing in for now.
- **Low.** A scenic-drive photo for the "Hoosier National Forest Drive" card.

### Bankhead NF / Clear Creek / Corinth (High)
- **High.** Bankhead hero: a Sipsey Wilderness waterfall or canyon, 3:2, ≥2400px. The only waterfall file is 500px.
- **High.** Clear Creek: the boat ramp (the current file is a sideways sign), the group camping units (the current file is a ROAD CLOSED barricade), and campsites in the Bear and Fawn loops.
- **High.** Corinth: the swimming beach (the current file is a car on a road), a Firefly Loop campsite (the current file is a notice board), the pavilion in use but without faces.
- **Med.** Shooting range benches. Quail habitat (open pine woodland). The Raven Trail on the trail itself.
- **Low.** Bankhead scenic drive along a forest road.

### Maine: Canal Bridge (Med)
- **Med.** Hero: the Saco River from the campground beach with the White Mountains in view, 3:2, ≥2400px.
- **Med.** Site photos: each site's pad, table and fire ring, shot from the road (4:3). The current ones are tree trunks with a number box.
- **Low.** Bath house and office in good light.

### Michigan: Yankee Springs, Long Lake, Chief Noonday (High)
- **High.** Re-shoot or rotate the Stage House and Infirmary photos (sideways now). Shoot each bunkhouse front-on (4:3).
- **High.** Long Lake: Hill Cabins and Lake Cabins, each with its setting (lake visible for Lake Cabins), 4:3 ≥1600px. The site currently uses wedding-set cabin photos.
- **Med.** Long Lake hero: the lake from the dock with the lodge, 3:2, ≥2400px. Lodge exterior, labelled, so the brick building versus the timber lodge is settled.
- **Med.** Chief Noonday: Deer Lodge, Long House and Mess Hall, re-shot at ≥1600px (current 666–716px), plus a hero of the center and lake.
- **Med.** Yankee Springs: a trail photo for the "Trail System" card, and a lake/beach hero.

### Missouri: Meramec (Med)
- **Med.** Hero: the Meramec River with a bluff, 3:2, ≥2400px. The existing river photo is 740px.
- **Med.** Floaters on the river (backs only) or canoes lined up at Riverstop, for the float and watercraft cards.
- **Med.** The Visitor Center building and a park trail.
- **Low.** Conference Center and Fireside Store exteriors that aren't just the wall sign.

### Missouri: Washington State Park (Med)
- **Med.** Hero: Big River or a petroglyph site, 3:2, ≥2400px. The current lodge photo is 823px.
- **Med.** A cabin exterior (none exists; the "exterior" file is a living room). The watercraft rental. A trail.

### Rhode Island: Burlingame (Low)
- **Low.** Replace the PNG screenshots (500–1020px) with camera originals: beach, cabins, kayak launch, picnic area. Hero of Watchaug Pond at ≥2400px. Trail photo.

### West Virginia: Monongahela (Med)
- **Med.** One lead photo per campground page (Big Bend, Jess Judy, Seneca Shadows, Spruce Knob Lake, Gatewood, Stuart), showing the campground itself (4:3, ≥1600px). All six now share the forest entrance sign.
- **Med.** Seneca Rocks (the rock formation, not the Discovery Center sign) and the Spruce Knob summit. The Highland Scenic Highway, if it's in our area.

### Services (Low)
- **Low.** Crew-at-work photos (mowing, cleaning a restroom, repairing a sign) and a Utah or Iowa rest-area exterior, faces turned away or with releases.
