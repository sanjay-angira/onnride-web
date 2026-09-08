/** Homepage content — inspired by ONN Bikes, Freedo & RentnHop patterns, tailored for OnnRide. */

import { CORE_BIKE_RENTAL_KEYWORDS, HOME_PAGE_SEO } from '@/lib/seo/primary-keywords';

export const HOME_PROMO = {
  headline: 'Save on multi-day & weekend bookings',
  subline: 'Book 3+ days for better rates — use code ONNRIDE50 at checkout.',
  cta: 'Explore offers',
  href: '/offers',
} as const;

export const HOME_TRUST_TICKER = [
  {
    label: '24/7 roadside assistance',
    icon: 'headphones' as const,
  },
  {
    label: 'No hidden charges',
    icon: 'badge-check' as const,
  },
  {
    label: 'Secure & trusted booking',
    icon: 'shield' as const,
  },
  {
    label: 'Razorpay secure payments',
    icon: 'wallet' as const,
  },
  {
    label: 'Full 24×7 trip support',
    icon: 'clock' as const,
  },
  {
    label: 'Use code ONNRIDE50 — ₹50 off',
    icon: 'sparkles' as const,
    highlight: true,
  },
] as const;

export const HOME_HERO = {
  badge: 'Self-drive bike rental service',
  headline: 'Bike Rental Near Me',
  subheading:
    'Self-drive bike rentals & bike on rent across India — scooters, commuters & Royal Enfield from verified vendors near you.',
  priceFrom: '₹299',
  priceUnit: '/day',
  priceLabel: 'Starting from',
  primaryCta: 'Ride Now',
  secondaryCta: 'Partner With Us',
  trustLine: 'Helmet included · 24/7 support · 80+ cities',
  trustChips: ['Helmet included', '24/7 support', '80+ cities'] as const,
  imageAlt: 'Bikers riding down a scenic mountain road in the hills',
  image: '/hero.webp',
  video: '/videos/hero-bike.mp4',
  videoFallback: '/videos/hero-bike-fallback.mp4',
  videoPoster: '/hero.webp',
} as const;

export const HOME_STATS = [
  { value: '80+', label: 'Cities across India' },
  { value: '500+', label: 'Bikes & scooters' },
  { value: '4.8★', label: 'Rider satisfaction' },
  { value: '24/7', label: 'Trip support' },
] as const;

export const HOME_RENTAL_PLANS = [
  {
    id: 'daily',
    title: 'Daily Rentals',
    tagline: 'Your bike, your way — no complications',
    priceFrom: '₹299/day',
    features: [
      'Flexible pickup & return times',
      'Pay only for days you ride',
      'Helmet included with every booking',
      'Roadside assistance on active trips',
    ],
    cta: 'Rent Now',
    href: '/search',
    highlighted: true,
  },
  {
    id: 'multiday',
    title: 'Multi-day & Outstation',
    tagline: 'Weekend trips, hill rides & highway tours',
    priceFrom: 'Best weekly rates',
    features: [
      'Ideal for Manali, Leh, Goa & outstation rides',
      'Royal Enfield, adventure & touring bikes',
      'Transparent deposit shown upfront',
      'Vendor chat for route & return timing',
    ],
    cta: 'Plan a trip',
    href: '/search',
    highlighted: false,
  },
] as const;

export const HOME_PRICING_PLANS = [
  {
    name: 'Daily',
    description: 'City commute, errands & short rides',
    from: '₹299',
    period: 'per day',
  },
  {
    name: 'Weekend',
    description: '2–3 day getaways & nearby hill stations',
    from: '₹799',
    period: 'per day',
  },
  {
    name: 'Multi-day',
    description: 'Outstation tours & extended road trips',
    from: 'Custom',
    period: 'best rates',
  },
] as const;

export const HOME_SOCIAL_PROOF = [
  { name: 'Rahul S.', city: 'Delhi', vehicle: 'Activa 6G', minutesAgo: 2 },
  { name: 'Priya M.', city: 'Chandigarh', vehicle: 'Royal Enfield Classic', minutesAgo: 5 },
  { name: 'Amit K.', city: 'Manali', vehicle: 'Himalayan 450', minutesAgo: 8 },
  { name: 'Sneha R.', city: 'Bengaluru', vehicle: 'Jupiter 125', minutesAgo: 11 },
  { name: 'Vikram P.', city: 'Goa', vehicle: 'Duke 390', minutesAgo: 14 },
  { name: 'Karan J.', city: 'Mohali', vehicle: 'Ntorq 125', minutesAgo: 6 },
  { name: 'Ananya D.', city: 'Delhi', vehicle: 'Splendor Plus', minutesAgo: 9 },
  { name: 'Rohit B.', city: 'Amritsar', vehicle: 'Meteor 350', minutesAgo: 12 },
] as const;

export const HOME_PLAN_COMPARE = {
  features: [
    { label: 'Best for', daily: 'City commute & errands', weekend: '2–3 day getaways', multiday: 'Outstation & hill tours' },
    { label: 'Starting price', daily: '₹299/day', weekend: '₹799/day', multiday: 'Custom quote' },
    { label: 'Helmet included', daily: true, weekend: true, multiday: true },
    { label: 'Flexible pickup times', daily: true, weekend: true, multiday: true },
    { label: 'Royal Enfield options', daily: false, weekend: true, multiday: true },
    { label: 'Roadside assistance', daily: true, weekend: true, multiday: true },
    { label: 'Deposit refund on return', daily: true, weekend: true, multiday: true },
    { label: 'Vendor chat support', daily: true, weekend: true, multiday: true },
  ],
  plans: [
    { id: 'daily' as const, name: 'Daily', href: '/search', cta: 'Book daily' },
    { id: 'weekend' as const, name: 'Weekend', href: '/search', cta: 'Book weekend' },
    { id: 'multiday' as const, name: 'Multi-day', href: '/search', cta: 'Plan a trip' },
  ],
} as const;

export const HOME_CATEGORIES = [
  {
    name: 'Scooters',
    slug: 'scooter',
    count: '200+ available',
    description: 'Activa, Ntorq & Jupiter — perfect for city commute & daily travel.',
    gradient: 'from-orange-50 via-amber-50 to-white',
    accent: 'bg-brand-500 text-white',
    emoji: '🛵',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85&auto=format&fit=crop',
    imageAlt: 'Honda Activa style scooter for city commute',
  },
  {
    name: 'Commuter Bikes',
    slug: 'commuter',
    count: '150+ available',
    description: 'Pulsar, Splendor & Platina — affordable daily office & college rides.',
    gradient: 'from-brand-50 via-orange-50 to-white',
    accent: 'bg-brand-600 text-white',
    emoji: '🏍️',
    image:
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=900&q=85&auto=format&fit=crop',
    imageAlt: 'Pulsar commuter motorcycle on city road',
  },
  {
    name: 'Royal Enfield',
    slug: 'cruiser',
    count: '120+ available',
    description: 'Classic 350, Meteor & Hunter — highway-ready cruisers for tours.',
    gradient: 'from-slate-100 via-slate-50 to-white',
    accent: 'bg-slate-800 text-white',
    emoji: '🏔️',
    image:
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=900&q=85&auto=format&fit=crop',
    imageAlt: 'Royal Enfield classic cruiser on highway',
  },
  {
    name: 'Adventure & Sports',
    slug: 'adventure',
    count: '80+ available',
    description: 'Himalayan, Duke & KTM — built for mountains, highways & thrill rides.',
    gradient: 'from-zinc-100 via-orange-50/50 to-white',
    accent: 'bg-primary text-white',
    emoji: '⚡',
    image:
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=900&q=85&auto=format&fit=crop',
    imageAlt: 'KTM adventure sports motorcycle',
  },
] as const;

export const HOME_CAR_CATEGORIES = [
  {
    name: 'Hatchback',
    slug: 'hatchback',
    count: 'Compact city cars',
    description: 'Swift, i20 & WagonR — easy parking and fuel-efficient city drives.',
    gradient: 'from-blue-50 via-indigo-50 to-white',
    accent: 'bg-indigo-600 text-white',
    emoji: '🚗',
    image:
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=900&q=85&auto=format&fit=crop',
    imageAlt: 'Compact hatchback car in the city',
  },
  {
    name: 'Sedan',
    slug: 'sedan',
    count: 'Comfort sedans',
    description: 'Verna, City & Ciaz — comfortable for family trips and business travel.',
    gradient: 'from-slate-100 via-zinc-50 to-white',
    accent: 'bg-slate-800 text-white',
    emoji: '🚙',
    image:
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&q=85&auto=format&fit=crop',
    imageAlt: 'Sedan car on highway',
  },
  {
    name: 'SUV',
    slug: 'suv',
    count: 'Spacious SUVs',
    description: 'Nexon, Creta & XUV — highway-ready with extra luggage space.',
    gradient: 'from-amber-50 via-orange-50 to-white',
    accent: 'bg-amber-700 text-white',
    emoji: '🛻',
    image:
      'https://images.unsplash.com/photo-1519641470344-da109e5546a0?w=900&q=85&auto=format&fit=crop',
    imageAlt: 'SUV on mountain road',
  },
  {
    name: 'MUV',
    slug: 'muv',
    count: '7-seater MUVs',
    description: 'Innova, Ertiga & XL6 — perfect for family outings and group travel.',
    gradient: 'from-teal-50 via-cyan-50 to-white',
    accent: 'bg-teal-700 text-white',
    emoji: '🚐',
    image:
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&q=85&auto=format&fit=crop',
    imageAlt: 'Family MUV minivan',
  },
] as const;

export const HOME_WHY_CHOOSE = [
  {
    title: 'Lowest Rental Prices',
    description:
      'Starting from ₹299/day with honest billing. Daily rate, deposit, and taxes shown upfront — what you see is what you pay. No surprise fees at pickup.',
    icon: 'indian-rupee' as const,
  },
  {
    title: 'Flexible Rental Plans',
    description:
      'Daily rides for quick errands, multi-day plans for weekend trips, or outstation tours — pick what fits your schedule. Switch dates before pickup when plans change.',
    icon: 'calendar' as const,
  },
  {
    title: 'No Ownership Worries',
    description:
      'Skip EMIs, servicing, insurance & registration. We connect you with maintained fleets — you just ride and return. Pay only for the time you use.',
    icon: 'bike' as const,
  },
  {
    title: 'Verified Vendors & Hubs',
    description:
      'KYC-verified fleet partners across 80+ cities. Pick up from vendor hubs near railway stations, airports & city centres in Delhi, Chandigarh, Manali & more.',
    icon: 'map-pin' as const,
  },
] as const;

export const HOME_HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Choose Your Vehicle',
    description: 'Browse scooters, bikes & Royal Enfield by city — filter by category and budget.',
  },
  {
    step: 2,
    title: 'Book Online',
    description: 'Select dates, review pricing, verify via OTP & pay securely — instant confirmation.',
  },
  {
    step: 3,
    title: 'Pick Up & Ride',
    description: 'Complete KYC, inspect the bike with your vendor, sign pickup & hit the road.',
  },
  {
    step: 4,
    title: 'Return & Refund',
    description: 'Drop off at the vendor hub. Deposit refunded after inspection — hassle-free.',
  },
] as const;

export const HOME_FEATURED_CITIES = [
  {
    slug: 'pune',
    name: 'Pune',
    highlight: 'Bike on rent — IT hubs & Lonavala',
    image:
      'https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Pune city skyline and urban roads',
  },
  {
    slug: 'delhi',
    name: 'Delhi',
    highlight: 'Bike on rent — NCR & outstation',
    image:
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Delhi city skyline at dusk',
  },
  {
    slug: 'mumbai',
    name: 'Mumbai',
    highlight: 'Bike on rent — CSMT & suburbs',
    image:
      'https://images.unsplash.com/photo-1564507592333-c60657eea23f?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Mumbai coastal skyline at sunset',
  },
  {
    slug: 'manali',
    name: 'Manali',
    highlight: 'Bike rent — Himalayan routes',
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Snow-capped Himalayan mountains near Manali',
  },
  {
    slug: 'jaipur',
    name: 'Jaipur',
    highlight: 'Bike rent — Pink City tours',
    image:
      'https://images.unsplash.com/photo-1477587459873-f574132a2527?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Hawa Mahal palace in Jaipur Rajasthan',
  },
  {
    slug: 'goa',
    name: 'Goa',
    highlight: 'Beach & coastal cruising',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Goa beach and palm trees at sunset',
  },
] as const;

export const HOME_PARTNER = {
  headline: 'Own a Bike? List on OnnRide & Earn',
  description:
    'Join India\'s growing self-drive rental marketplace. Reach verified riders across 80+ cities — zero listing fees, secure payouts & a fleet dashboard.',
  cta: 'Partner With Us',
  trustIndicators: [
    'Zero listing fees',
    'Verified rider KYC',
    'Secure Razorpay payouts',
    'Vendor dashboard',
  ],
} as const;

export const HOME_REVIEWS = [
  {
    name: 'Narasimha Swamy',
    city: 'Bengaluru',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=faces&q=85&auto=format',
    review:
      'The vehicle was in excellent condition and felt almost new. The entire rental experience was smooth and completely hassle-free. Pickup and drop were well managed by the vendor.',
  },
  {
    name: 'Arham Khan',
    city: 'Delhi',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=faces&q=85&auto=format',
    review:
      'Great service from start to finish. The vendor guided me through booking and pickup patiently. The bike was clean, well maintained, and ready on time with transparent pricing.',
  },
  {
    name: 'Ayush Sharma',
    city: 'Chandigarh',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=faces&q=85&auto=format',
    review:
      'Very good experience with transparent pricing and a smooth booking flow. The vehicle was comfortable for city traffic and the whole process felt professional.',
  },
  {
    name: 'Priya Mehta',
    city: 'Delhi',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=faces&q=85&auto=format',
    review:
      'Used OnnRide for daily office commute. Easy KYC upload from my phone, clear deposit terms, and the vendor was always responsive via booking chat.',
  },
  {
    name: 'Amit Kumar',
    city: 'Manali',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&h=128&fit=crop&crop=faces&q=85&auto=format',
    review:
      'Booked a Himalayan for an outstation trip. Pricing breakdown was clear before payment — no surprises at pickup. Perfect for hill station rides.',
  },
  {
    name: 'Rahul Verma',
    city: 'Amritsar',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&h=128&fit=crop&crop=faces&q=85&auto=format',
    review:
      'Booking was simple and the bike was delivered on time. Support team was responsive whenever I had questions. Would definitely rent again.',
  },
] as const;

export const HOME_FAQ = [
  {
    q: 'Where can I find bike rental near me?',
    a: 'Search your city on OnnRide to see bike rentals near you from verified local vendors. Pick pickup dates, compare live daily rates, and book online — hubs near railway stations and airports where available.',
  },
  {
    q: 'What is self drive bike rental?',
    a: 'Self-drive bike rental means you ride the two-wheeler yourself with a valid licence — no chauffeur. OnnRide connects you with verified vendors for daily, weekend and outstation bike on rent across India.',
  },
  {
    q: 'What is the best way to rent a bike online in India?',
    a: 'The best way is through trusted platforms like OnnRide — choose your city, pick scooters, commuters, or Royal Enfield, book online with minimal documents, and get instant confirmation.',
  },
  {
    q: 'How much does bike rental cost per day?',
    a: 'Bike rentals on OnnRide start from around ₹299 per day for scooters and commuters. Premium motorcycles and Royal Enfield models are priced higher based on model, city, and availability.',
  },
  {
    q: 'What documents are required for bike rental?',
    a: 'You need a valid driving license and ID proof (Aadhaar, voter ID, or passport). Upload from your profile after booking — physical copy or DigiLocker works at pickup.',
  },
  {
    q: 'Is a security deposit required for bike rental?',
    a: 'Yes, a small refundable security deposit applies depending on bike model and vendor. The exact amount is shown upfront at checkout and refunded after safe return.',
  },
  {
    q: 'Are helmets included with bike rental?',
    a: 'Yes — one complimentary helmet is included with every rental. Request an extra helmet from your vendor at pickup if needed.',
  },
  {
    q: 'Can I rent a bike for outstation trips?',
    a: 'Yes. Many vendors allow outstation use for routes like Delhi–Manali, Chandigarh–Shimla, or Delhi–Jaipur. Confirm your route and return timing via booking chat after confirmation.',
  },
  {
    q: 'Do you provide roadside assistance?',
    a: 'Vendors and platform support assist with breakdowns during active trips. Contact your vendor via booking chat or reach platform support 24/7.',
  },
  {
    q: 'Which bikes are available for rent?',
    a: 'OnnRide offers scooters, commuter bikes, Royal Enfield cruisers, adventure tourers, and sports bikes depending on city and vendor inventory.',
  },
  {
    q: 'Can I book bike rental near railway stations or airports?',
    a: 'Yes — vendors operate hubs near major railway stations and airports in cities like Delhi, Chandigarh, and Bengaluru. Select your city during search to see nearby pickup points.',
  },
  {
    q: 'How do I book a scooty for daily commuting?',
    a: 'Select your city on OnnRide, choose a scooter, pick daily dates, and complete checkout. Scooty rentals are ideal for office travel, college commute, and city exploration.',
  },
] as const;

export const HOME_SEO = {
  title: HOME_PAGE_SEO.title,
  description: HOME_PAGE_SEO.description,
  ogTitle: HOME_PAGE_SEO.ogTitle,
  ogDescription: HOME_PAGE_SEO.ogDescription,
  keywords: [
    ...CORE_BIKE_RENTAL_KEYWORDS,
    'bike on rent in pune',
    'bike on rent in delhi',
    'bike on rent in mumbai',
    'bike rent in jaipur',
    'bike rent in manali',
    'Royal Enfield rental',
    'monthly bike rental',
  ],
} as const;

export const HOME_GEO = {
  businessDescription:
    'OnnRide is India\'s self-drive bike rental marketplace — bike rental near me, bike on rent and bike rentals from verified vendors with secure online booking across 80+ cities.',
  serviceAreas:
    'Pune, Delhi, Mumbai, Jaipur, Manali, Goa, Chandigarh, Bengaluru, and 80+ Indian cities for bike rentals near you.',
  vehicleCategories:
    'Scooters, commuter bikes, Royal Enfield, adventure bikes, sports bikes, and electric two-wheelers.',
  rentalProcess:
    'Choose vehicle → book online → complete KYC → pick up & ride → return & get deposit refund.',
  benefits:
    'Lowest rental prices, flexible plans, no ownership hassles, verified vendors, helmets included, 24/7 support.',
} as const;
