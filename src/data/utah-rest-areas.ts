export interface RestArea {
  name: string
  region: number
  route: string
  direction: string
  location: string
  city: string
  lat: number
  lng: number
  googleMapsLink: string
}

export const utahRestAreas: RestArea[] = [
  // Region 1 — Northern Utah
  { name: 'Bear Lake Overlook', region: 1, route: 'SR-89', direction: '', location: 'SR-89 Mile 493', city: 'Garden City', lat: 41.92126, lng: -111.45753, googleMapsLink: 'https://www.google.com/maps/@41.9214952,-111.4582028,523a,35y,2.03h/data=!3m1!1e3' },
  { name: 'Bear Lake', region: 1, route: 'SR-30', direction: '', location: 'SR-30 Mile 124', city: 'Garden City', lat: 41.85683, lng: -111.36370, googleMapsLink: 'https://www.google.com/maps/@41.8566426,-111.3648538,426a,35y,2.03h/data=!3m1!1e3' },
  { name: 'Brigham City', region: 1, route: 'I-15', direction: 'Southbound', location: 'I-15 S Mile 369', city: 'Brigham City', lat: 41.55242, lng: -112.06988, googleMapsLink: 'https://www.google.com/maps/@41.552613,-112.068977,673a,35y,2.03h/data=!3m1!1e3' },
  { name: 'Echo Canyon Eastbound', region: 1, route: 'I-80', direction: 'Eastbound', location: 'I-80 E Mile 169', city: 'Echo', lat: 40.98948, lng: -111.40292, googleMapsLink: 'https://www.google.com/maps/@40.9900216,-111.4034589,586a,35y,57.22h/data=!3m1!1e3' },
  { name: 'Echo Canyon Westbound', region: 1, route: 'I-80', direction: 'Westbound', location: 'I-80 W Mile 169', city: 'Echo', lat: 40.98928, lng: -111.40589, googleMapsLink: 'https://www.google.com/maps/@40.9899264,-111.406809,695a,35y,57.22h/data=!3m1!1e3' },
  { name: 'Grassy Mountain Eastbound', region: 1, route: 'I-80', direction: 'Eastbound', location: 'I-80 E Mile 54', city: 'Wendover', lat: 40.75542, lng: -113.01814, googleMapsLink: 'https://www.google.com/maps/@40.7572986,-113.0187027,1140a,35y,67.17h/data=!3m1!1e3' },
  { name: 'Grassy Mountain Westbound', region: 1, route: 'I-80', direction: 'Westbound', location: 'I-80 W Mile 54', city: 'Wendover', lat: 40.76212, lng: -113.01056, googleMapsLink: 'https://www.google.com/maps/@40.7622483,-113.0101605,669a,35y,67.17h/data=!3m1!1e3' },
  { name: 'Mountain Green', region: 1, route: 'I-84', direction: 'Westbound', location: 'I-84 W Mile 94', city: 'Mountain Green', lat: 41.13824, lng: -111.79659, googleMapsLink: 'https://www.google.com/maps/@41.1381933,-111.797188,492a,35y,83.54h/data=!3m1!1e3' },
  { name: 'Perry', region: 1, route: 'I-15', direction: 'Northbound', location: 'I-15 N Mile 361', city: 'Perry', lat: 41.46700, lng: -112.05367, googleMapsLink: 'https://www.google.com/maps/@41.4667122,-112.0547086,901a,35y,2.03h/data=!3m1!1e3' },
  { name: 'Salt Flats Eastbound', region: 1, route: 'I-80', direction: 'Eastbound', location: 'I-80 E Mile 10', city: 'Wendover', lat: 40.73783, lng: -113.85721, googleMapsLink: 'https://www.google.com/maps/@40.7391226,-113.8592659,1035a,35y,84.05h/data=!3m1!1e3' },
  { name: 'Salt Flats Westbound', region: 1, route: 'I-80', direction: 'Westbound', location: 'I-80 W Mile 10', city: 'Wendover', lat: 40.74031, lng: -113.85208, googleMapsLink: 'https://www.google.com/maps/@40.7401278,-113.8535128,896a,35y,84.05h/data=!3m1!1e3' },
  { name: 'Weber Canyon', region: 1, route: 'I-84', direction: 'Eastbound', location: 'I-84 E Mile 91', city: 'Mountain Green', lat: 41.13927, lng: -111.84770, googleMapsLink: 'https://www.google.com/maps/@41.1400462,-111.8480716,600a,35y,83.54h/data=!3m1!1e3' },

  // Region 2 — Central/Eastern Utah
  { name: 'Crescent Junction', region: 2, route: 'I-70', direction: 'Eastbound', location: 'I-70 E Mile 181', city: 'Crescent Junction', lat: 38.93813, lng: -109.82793, googleMapsLink: 'https://www.google.com/maps/place/Rest+Area/@38.9379891,-109.8309071,1211a,35y,61.6h/data=!3m1!1e3' },
  { name: 'Ivie Creek', region: 2, route: 'I-70', direction: 'Both', location: 'I-70 EW Mile 87', city: 'Emery', lat: 38.75480, lng: -111.41816, googleMapsLink: 'https://www.google.com/maps/@38.7559452,-111.4182943,737a,35y,123.21h/data=!3m1!1e3' },
  { name: 'Jensen', region: 2, route: 'US-40', direction: '', location: 'US-40 Mile 157', city: 'Jensen', lat: 40.37065, lng: -109.34420, googleMapsLink: 'https://www.google.com/maps/@40.370876,-109.3444577,458a,35y,93.5h/data=!3m1!1e3' },
  { name: 'Kane Springs', region: 2, route: 'US-191', direction: '', location: 'US-191 Mile 110', city: 'Moab', lat: 38.39392, lng: -109.45222, googleMapsLink: 'https://www.google.com/maps/place/Rest+Area/@38.3937959,-109.4526856,622a,35y,19.92h/data=!3m1!1e3' },
  { name: 'Pinion Ridge', region: 2, route: 'US-40', direction: '', location: 'US-40 Mile 69', city: 'Duchesne', lat: 40.20419, lng: -110.71302, googleMapsLink: 'https://www.google.com/maps/place/Pinion+Ridge+Rest+Area/@40.2024254,-110.7134387,680a,35y/data=!3m1!1e3' },
  { name: 'Silver City', region: 2, route: 'US-6', direction: '', location: 'US-6 Mile 127', city: 'Jericho Junction', lat: 39.80537, lng: -112.14379, googleMapsLink: 'https://www.google.com/maps/@39.8054645,-112.1435763,439a,35y/data=!3m1!1e3' },
  { name: 'Thompson Springs', region: 2, route: 'I-70', direction: 'Westbound', location: 'I-70 W Mile 190', city: 'Thompson Springs', lat: 38.95201, lng: -109.68503, googleMapsLink: 'https://www.google.com/maps/@38.9512842,-109.6843525,1090a,35y,93.5h/data=!3m1!1e3' },
  { name: 'Tie-Fork', region: 2, route: 'US-6', direction: '', location: 'US-6 Mile 202', city: 'Helper', lat: 39.95047, lng: -111.21756, googleMapsLink: 'https://www.google.com/maps/place/Tie+Fork+Rest+Area/@39.9497728,-111.2172412,396a,35y/data=!3m1!1e3' },

  // Region 3 — Southern Utah
  { name: "Hoover's", region: 3, route: 'US-89', direction: '', location: 'US-89 Mile 183', city: 'Marysville', lat: 38.50297, lng: -112.25941, googleMapsLink: 'https://www.google.com/maps/@38.5031556,-112.2588186,417a,35y,123.21h/data=!3m1!1e3' },
  { name: 'Kanarraville Northbound', region: 3, route: 'I-15', direction: 'Northbound', location: 'I-15 N Mile 44', city: 'Kanarraville', lat: 37.51335, lng: -113.21159, googleMapsLink: 'https://www.google.com/maps/@37.5136734,-113.2114096,747a,35y,13.16h/data=!3m1!1e3' },
  { name: 'Kanarraville Southbound', region: 3, route: 'I-15', direction: 'Southbound', location: 'I-15 S Mile 44', city: 'Kanarraville', lat: 37.51671, lng: -113.21249, googleMapsLink: 'https://www.google.com/maps/@37.5165555,-113.2127434,747a,35y,13.16h/data=!3m1!1e3' },
  { name: 'Lunt Park Northbound', region: 3, route: 'I-15', direction: 'Northbound', location: 'I-15 N Mile 88', city: 'Parowan', lat: 37.98076, lng: -112.73605, googleMapsLink: 'https://www.google.com/maps/@37.9811467,-112.7374885,890a,35y,21.43h/data=!3m1!1e3' },
  { name: 'Lunt Park Southbound', region: 3, route: 'I-15', direction: 'Southbound', location: 'I-15 S Mile 88', city: 'Parowan', lat: 37.98237, lng: -112.73855, googleMapsLink: 'https://www.google.com/maps/@37.9829367,-112.7390945,752a,35y,21.43h/data=!3m1!1e3' },
  { name: 'Oak Springs', region: 3, route: 'SR-24', direction: '', location: 'SR-24 Mile 35', city: 'Koosharem', lat: 38.53455, lng: -111.83578, googleMapsLink: 'https://www.google.com/maps/@38.5349577,-111.8356113,491a,35y,123.21h/data=!3m1!1e3' },
  { name: 'Shingle Creek', region: 3, route: 'US-89', direction: '', location: 'US-89 Mile 95', city: 'Glendale', lat: 37.37934, lng: -112.58560, googleMapsLink: 'https://www.google.com/maps/@37.3792532,-112.5858984,379a,35y,88.1h/data=!3m1!1e3' },
  { name: 'The Pines', region: 3, route: 'SR-12', direction: '', location: 'SR-12 Mile 10', city: 'Panguitch', lat: 37.70851, lng: -112.20628, googleMapsLink: 'https://www.google.com/maps/@37.7081315,-112.2058851,512a,35y,123.21h/data=!3m1!1e3' },
]
