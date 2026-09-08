export interface CityRoute {
  name: string;
  distance: string;
  description: string;
}

export interface CityVehicleType {
  name: string;
  slug: string;
  description: string;
}

export interface CityContent {
  /** SEO H1 when DB content is empty */
  h1?: string;
  intro: string;
  /** Direct answer block for AEO / featured snippets */
  aeoSummary: string;
  highlights: string[];
  areasServed: string[];
  popularRoutes: CityRoute[];
  vehicleTypes: CityVehicleType[];
  pickupNote: string;
  travelTips: string[];
  extraFaqs: Array<{ q: string; a: string }>;
}

const DEFAULT: CityContent = {
  intro:
    'Browse verified vendor fleets, compare daily rates, and book self-drive scooters and motorcycles online. One complimentary helmet is included with every rental.',
  aeoSummary:
    'OnnRide offers self-drive bike and scooter rental from verified local vendors with online booking, secure payment, and helmet included.',
  highlights: [
    'Verified vendors with RC-checked vehicles',
    'Secure Razorpay checkout',
    'Refundable security deposit after safe return',
  ],
  areasServed: [],
  popularRoutes: [],
  vehicleTypes: [
    { name: 'Scooters', slug: 'scooter', description: 'Easy city rides and short trips' },
    { name: 'Commuter bikes', slug: 'commuter', description: 'Fuel-efficient daily riders' },
    { name: 'Cruisers', slug: 'cruiser', description: 'Comfortable highway and leisure rides' },
  ],
  pickupNote:
    'Choose a convenient pickup point at checkout — railway stations and airport hubs where available.',
  travelTips: [
    'Carry your driving licence and ID for pickup verification',
    'Inspect fuel, brakes and tyres before you ride',
    'Follow local traffic rules and wear your helmet',
  ],
  extraFaqs: [],
};

const BY_SLUG: Record<string, Partial<CityContent>> = {
  delhi: {
    h1: 'Bike on Rent in Delhi',
    intro:
      'Bike on rent in Delhi from verified local vendors on OnnRide. Scooters for NCR commute, Royal Enfields and commuters for outstation runs to Jaipur, Agra, Manali and more.',
    aeoSummary:
      'Bike on rent in Delhi from ₹299/day on OnnRide — verified vendors, IGI Airport and railway station pickup, helmets included, secure online booking.',
    highlights: [
      'Pickup at major railway stations & IGI Airport',
      'Scooters and commuters from verified vendors — compare live daily rates',
      'Outstation-friendly rentals with vendor chat support',
    ],
    areasServed: [
      'Connaught Place',
      'Karol Bagh',
      'South Delhi',
      'Gurgaon',
      'Noida',
      'Dwarka',
    ],
    pickupNote:
      'Select New Delhi, Old Delhi, Nizamuddin railway station or IGI Airport T3 at checkout.',
    travelTips: [
      'Avoid peak hours on Ring Road and Outer Ring Road',
      'Keep licence and rental agreement handy — checks are common',
      'Use navigation apps for live traffic updates',
      'Park only in authorised areas to avoid towing fines',
    ],
    extraFaqs: [
      {
        q: 'How much does bike on rent in Delhi cost?',
        a: 'Daily rates start from ₹299/day depending on model and vendor — compare live prices on OnnRide before you book. Total includes rental days, deposit and any active offers.',
      },
      {
        q: 'Is bike rental available near Delhi railway stations?',
        a: 'Yes — choose New Delhi, Old Delhi or Nizamuddin station as your pickup point when you checkout.',
      },
      {
        q: 'Can I ride outstation from Delhi?',
        a: 'Many vendors allow outstation trips. Confirm your route with the vendor via booking chat after payment.',
      },
      {
        q: 'Is partial payment available?',
        a: 'When enabled, pay a portion online and the balance before pickup — same as leading rental platforms.',
      },
    ],
  },
  goa: {
    intro:
      'Explore North and South Goa on a self-drive scooter or motorcycle from verified local vendors. Book online in minutes, pick up near Dabolim Airport or Calangute, and ride coastal roads to beaches, forts, and nightlife hubs — with one complimentary helmet on every rental.',
    aeoSummary:
      'OnnRide lets you rent self-drive scooters and bikes in Goa from verified vendors with online booking, airport and Calangute pickup, helmet included, and secure Razorpay payment.',
    highlights: [
      'Dabolim Airport & Calangute hub pickup points',
      'Scooters, commuters and cruisers from verified vendors',
      'Helmet included · doorstep delivery on select vehicles',
      'Vendor chat for pickup timing, KYC and route tips',
      'Refundable security deposit after safe return',
    ],
    areasServed: [
      'North Goa — Calangute, Baga, Anjuna, Vagator',
      'Panjim & Dona Paula',
      'South Goa — Margao, Colva, Palolem',
      'Old Goa & churches circuit',
      'Dabolim Airport (GOI)',
      'Mopa Airport (GOX) — vendor hubs expanding',
    ],
    popularRoutes: [
      {
        name: 'Calangute → Fort Aguada',
        distance: '~12 km',
        description: 'Classic coastal ride with lighthouse views — best in early morning.',
      },
      {
        name: 'Panjim → Old Goa churches',
        distance: '~10 km',
        description: 'Heritage loop via Mandovi river road; easy on scooters.',
      },
      {
        name: 'Margao → Palolem Beach',
        distance: '~65 km',
        description: 'South Goa day trip — plan fuel and start before noon.',
      },
      {
        name: 'Anjuna → Chapora Fort',
        distance: '~8 km',
        description: 'Short sunset ride; parking available near the fort viewpoint.',
      },
    ],
    vehicleTypes: [
      {
        name: 'Scooters',
        slug: 'scooter',
        description: 'Activa, Jupiter & more — ideal for beach hops and narrow lanes',
      },
      {
        name: 'Commuter bikes',
        slug: 'commuter',
        description: 'Pulsar, Apache & 160cc riders for longer coastal runs',
      },
      {
        name: 'Cruisers',
        slug: 'cruiser',
        description: 'Classic and Royal Enfield options for relaxed highway rides',
      },
    ],
    pickupNote:
      'Choose Dabolim Airport (GOI) or Calangute hub at checkout. Panjim city hub available on select listings.',
    travelTips: [
      'Ride carefully on wet roads during monsoon (June–September)',
      'Book early for Christmas, New Year and long weekends',
      'Return with the agreed fuel level to avoid refuelling charges',
      'Carry driving licence and Aadhaar — vendor verifies at pickup',
      'Avoid riding on beaches; use designated parking near shacks',
      'Wear ISI-mark helmet — one included; add extra at checkout if needed',
    ],
    extraFaqs: [
      {
        q: 'How much does scooter rental cost in Goa?',
        a: 'Daily rates depend on vehicle model, season and vendor — compare live prices on OnnRide search. You pay the listed daily rate × rental days plus any active multipliers, minus coupons or wallet credits, plus a refundable security deposit.',
      },
      {
        q: 'Can I rent a bike at Goa airport?',
        a: 'Yes. Select Dabolim Airport (GOI) as your pickup point at checkout when available on your chosen vehicle. Confirm exact handover location with the vendor via booking chat after payment.',
      },
      {
        q: 'Do you deliver the bike to my hotel in Goa?',
        a: 'Doorstep delivery is offered on select vehicles — filter by doorstep delivery on search or enable it at checkout when the vendor supports it.',
      },
      {
        q: 'What documents are needed for bike rental in Goa?',
        a: 'Valid driving licence and Aadhaar. Upload KYC after booking; vendor verifies documents before handover. Ride cannot start until KYC is approved.',
      },
      {
        q: 'Is fuel included in Goa bike rental?',
        a: 'Typically one fuel tank level is agreed at pickup (often full-to-full). Return at the same level or pay refuelling charges per vendor policy.',
      },
      {
        q: 'Can I take the rented bike from North Goa to South Goa?',
        a: 'Most vendors allow riding across Goa. Confirm any restrictions on outstation or inter-region use in booking chat before you ride.',
      },
      {
        q: 'What is the best time to rent a bike in Goa?',
        a: 'October to March offers dry weather and peak tourist season — book ahead. Monsoon has fewer crowds but slippery roads; ride only if you are comfortable in rain.',
      },
      {
        q: 'Is the security deposit refundable in Goa?',
        a: 'Yes — after safe return and vendor inspection, the deposit is released per admin deposit rules. Damage claims may adjust the refund amount.',
      },
    ],
  },
  mumbai: {
    h1: 'Bike on Rent in Mumbai',
    intro:
      'Bike on rent in Mumbai from verified vendors — beat traffic with scooters and commuters across South Mumbai, Bandra, Andheri and Navi Mumbai.',
    aeoSummary:
      'Bike on rent in Mumbai from ₹299/day on OnnRide — verified vendors, CSMT and airport pickup options, helmets included, secure online booking.',
    highlights: ['CSMT & airport pickup options', 'Daily and multi-day rentals', 'Transparent online pricing'],
    areasServed: ['South Mumbai', 'Bandra', 'Andheri', 'Powai', 'Navi Mumbai'],
    pickupNote: 'Choose CSMT or Mumbai Airport T2 pickup at checkout.',
    travelTips: [
      'Monsoon riding needs extra caution on flyovers',
      'Plan around local train strike / event traffic',
    ],
    extraFaqs: [
      {
        q: 'How much does bike on rent in Mumbai cost?',
        a: 'Scooter and commuter rentals typically start from ₹299/day — compare vendor rates live on OnnRide for your dates before checkout.',
      },
    ],
  },
  pune: {
    h1: 'Bike on Rent in Pune',
    intro:
      'Bike on rent in Pune for daily commute, weekend Lonavala trips and city rides — verified vendors across Hinjewadi, Kothrud, Koregaon Park and Pune Station.',
    aeoSummary:
      'Bike on rent in Pune from ₹299/day on OnnRide — verified vendors, Pune Station and IT hub pickup, helmets included, instant online booking.',
    highlights: [
      'Pune Station & Hinjewadi pickup hubs',
      'Scooters, commuters and Royal Enfield options',
      'Weekend rides to Lonavala & Lavasa',
    ],
    areasServed: ['Hinjewadi', 'Kothrud', 'Koregaon Park', 'Viman Nagar', 'Pune Railway Station'],
    pickupNote: 'Select Pune Railway Station or Hinjewadi hub at checkout when available.',
    travelTips: [
      'Western Express Highway sees heavy peak traffic — plan accordingly',
      'Monsoon roads to Lonavala need cautious riding',
    ],
    extraFaqs: [
      {
        q: 'How much does bike on rent in Pune cost?',
        a: 'Rates start from ₹299/day based on model and vendor — search your dates on OnnRide to compare live daily prices before booking.',
      },
      {
        q: 'Can I rent a bike in Pune for a Lonavala trip?',
        a: 'Yes — book multi-day dates at checkout and confirm outstation rules with your vendor via booking chat after payment.',
      },
    ],
  },
  jaipur: {
    h1: 'Bike Rent in Jaipur',
    intro:
      'Bike rent in Jaipur for exploring Pink City — Hawa Mahal, Amer Fort, Nahargarh and bazaar lanes from verified local vendors on OnnRide.',
    aeoSummary:
      'Bike rent in Jaipur from ₹299/day on OnnRide — verified vendors, MI Road and railway station pickup, helmets included, secure online booking.',
    highlights: [
      'MI Road & railway station pickup',
      'Scooters for city lanes, cruisers for highway runs',
      'Multi-day rentals for Rajasthan road trips',
    ],
    areasServed: ['MI Road', 'C-Scheme', 'Malviya Nagar', 'Amer', 'Jaipur Junction'],
    pickupNote: 'Choose Jaipur Junction or MI Road pickup at checkout when available.',
    travelTips: [
      'Old city lanes are narrow — scooters work best',
      'Carry licence and ID — checks near tourist spots are common',
    ],
    extraFaqs: [
      {
        q: 'How much does bike rent in Jaipur cost?',
        a: 'Daily rates start from ₹299/day for scooters and commuters — compare live vendor prices on OnnRide for your travel dates.',
      },
    ],
  },
  manali: {
    h1: 'Bike Rent in Manali',
    intro:
      'Bike rent in Manali for Himalayan rides — Royal Enfield, Himalayan 450 and commuters from verified vendors. Mall Road pickup for Rohtang, Solang and Leh highway trips.',
    aeoSummary:
      'Bike rent in Manali from ₹499/day on OnnRide — Royal Enfield & adventure bikes from verified vendors, Mall Road pickup, helmet included, book online.',
    highlights: [
      'Royal Enfield & Himalayan rentals',
      'Mall Road pickup hub',
      'Outstation-friendly for Leh & Spiti routes',
    ],
    areasServed: ['Mall Road', 'Old Manali', 'Vashisht', 'Naggar Road'],
    popularRoutes: [
      { name: 'Manali → Rohtang Pass', distance: '~51 km', description: 'Iconic mountain ride — check permit and weather.' },
      { name: 'Manali → Solang Valley', distance: '~14 km', description: 'Short scenic loop for half-day rides.' },
    ],
    pickupNote: 'Pick up near Mall Road hub — confirm exact location with vendor via booking chat.',
    travelTips: [
      'Hill roads need extra caution — avoid night rides in fog',
      'Check tyre condition and brakes before mountain routes',
      'Carry warm layers; weather changes quickly',
    ],
    extraFaqs: [
      {
        q: 'How much does bike rent in Manali cost?',
        a: 'Adventure and Royal Enfield rentals typically start from ₹499/day — compare live rates on OnnRide for your trip dates.',
      },
      {
        q: 'Can I rent a Royal Enfield in Manali for Leh?',
        a: 'Many vendors allow Leh highway routes — confirm permits, deposit and return rules with your vendor in booking chat before you ride.',
      },
    ],
  },
  bengaluru: {
    intro:
      'Rent bikes and scooters in Bengaluru for office commute, weekend Nandi Hills trips and city exploration.',
    aeoSummary:
      'OnnRide offers self-drive bike and scooter rental in Bengaluru with airport and KSR pickup, verified vendors, and online booking.',
    highlights: ['Airport & KSR station pickup', 'EV and commuter options from vendors', 'Secure online pay'],
    areasServed: ['Indiranagar', 'Koramangala', 'Whitefield', 'Electronic City', 'MG Road'],
    pickupNote: 'Kempegowda Airport and KSR Bengaluru station pickup points available.',
    travelTips: ['Silk Board and ORR see heavy peak traffic — plan accordingly'],
    extraFaqs: [],
  },
};

export function getCityContent(slug: string): CityContent {
  const extra = BY_SLUG[slug];
  if (!extra) return DEFAULT;
  return {
    h1: extra.h1 ?? DEFAULT.h1,
    intro: extra.intro ?? DEFAULT.intro,
    aeoSummary: extra.aeoSummary ?? DEFAULT.aeoSummary,
    highlights: extra.highlights ?? DEFAULT.highlights,
    areasServed: extra.areasServed ?? DEFAULT.areasServed,
    popularRoutes: extra.popularRoutes ?? DEFAULT.popularRoutes,
    vehicleTypes: extra.vehicleTypes ?? DEFAULT.vehicleTypes,
    pickupNote: extra.pickupNote ?? DEFAULT.pickupNote,
    travelTips: extra.travelTips ?? DEFAULT.travelTips,
    extraFaqs: extra.extraFaqs ?? DEFAULT.extraFaqs,
  };
}
