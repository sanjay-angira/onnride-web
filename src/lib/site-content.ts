/** OnnRide marketing copy — self-drive bike & scooter rentals (MVP). */

export const TRUST_FEATURES = [
  {
    title: 'Verified vendors',
    body: 'Every fleet partner is KYC-verified with RC-checked vehicles before listing.',
  },
  {
    title: 'Complimentary helmet',
    body: 'One helmet included with every rental — extra gear available at pickup.',
  },
  {
    title: 'Secure payments',
    body: 'Pay online via Razorpay — UPI, cards and netbanking. Wallet & coupons supported.',
  },
  {
    title: '24/7 trip support',
    body: 'In-app chat with your vendor plus platform support for booking issues.',
  },
  {
    title: 'Transparent pricing',
    body: 'Daily rate, deposit, taxes and discounts shown upfront — no hidden pickup charges.',
  },
  {
    title: 'Refundable deposit',
    body: 'Security deposit released after safe return per vendor inspection.',
  },
] as const;

export const RIDE_TYPES = [
  {
    name: 'Scooters',
    slug: 'scooter',
    rating: '4.8',
    rentals: 'Easy city rides',
    fromPrice: '₹349',
    perks: ['Low deposit', 'Great mileage', 'Helmet included', 'Ideal for couples'],
    gradient: 'from-sky-500 to-blue-700',
  },
  {
    name: 'Commuter bikes',
    slug: 'commuter',
    rating: '4.9',
    rentals: 'Daily commute',
    fromPrice: '₹299',
    perks: ['Affordable daily rates', 'Verified dealers', 'Flexible dates', 'Office friendly'],
    gradient: 'from-emerald-500 to-teal-700',
  },
  {
    name: 'Cruisers & tourers',
    slug: 'cruiser',
    rating: '4.7',
    rentals: 'Weekend trips',
    fromPrice: '₹799',
    perks: ['Highway ready', 'Premium models', 'Outstation friendly', 'Low hassle booking'],
    gradient: 'from-amber-500 to-orange-700',
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Search & select',
    body: 'Pick your city, dates and browse scooters, commuters, cruisers or adventure bikes.',
  },
  {
    step: '02',
    title: 'Book online',
    body: 'Review transparent pricing, apply coupons or wallet, verify via WhatsApp OTP and pay securely.',
  },
  {
    step: '03',
    title: 'Complete KYC',
    body: 'Upload Aadhaar and driving license after payment — required before pickup handover.',
  },
  {
    step: '04',
    title: 'Pick up & ride',
    body: 'Meet your vendor, inspect the bike, sign pickup report and hit the road — no km cap on MVP rides.',
  },
] as const;

export const OFFERS = [
  {
    code: 'ONNRIDE50',
    title: 'Launch offer — ₹50 off',
    detail: 'Flat ₹50 off on bookings above ₹500. Use at checkout.',
    badge: 'Active',
  },
  {
    title: 'Wallet credits',
    detail: 'Earn referral rewards and refund-to-wallet on eligible cancellations.',
    badge: 'Wallet',
  },
  {
    title: 'Weekend multi-day',
    detail: 'Dynamic pricing applies weekend multipliers — book early for best rates.',
    badge: 'Pricing',
  },
] as const;

export const TESTIMONIALS = [
  {
    name: 'Rahul S.',
    city: 'Goa',
    quote: 'Booked an Activa for a 3-day Goa trip. OTP checkout was quick and the vendor was ready at pickup.',
    vehicle: 'Honda Activa 6G',
  },
  {
    name: 'Priya M.',
    city: 'Bengaluru',
    quote: 'Used OnnRide for office commute — transparent deposit and easy KYC upload from my phone.',
    vehicle: 'TVS Ntorq',
  },
  {
    name: 'Amit K.',
    city: 'Delhi',
    quote: 'Rented a Pulsar for an outstation run. Pricing breakdown was clear before I paid.',
    vehicle: 'Bajaj Pulsar 150',
  },
] as const;

export const FAQ_ITEMS = [
  {
    q: 'How do I book a bike on OnnRide?',
    a: 'Select your city and dates on the homepage, choose a bike, review pricing at checkout, verify your mobile via WhatsApp OTP, and pay online. You will receive booking confirmation instantly.',
  },
  {
    q: 'What documents are required?',
    a: 'Valid driving license and Aadhaar (front + back). Upload from your profile after booking. International guests need an International Driving Permit.',
  },
  {
    q: 'Is KYC required before booking?',
    a: 'No — you can browse, book and pay without approved KYC. KYC must be approved before vendor handover and your ride can start.',
  },
  {
    q: 'Is fuel included in the rental price?',
    a: 'No. Fuel is not included. Vehicles are handed over with enough fuel to reach the nearest pump — standard self-drive rental practice on OnnRide.',
  },
  {
    q: 'Is the security deposit refundable?',
    a: 'Yes. Deposit is held during the trip and refunded after safe return, subject to vendor inspection and admin deposit rules.',
  },
  {
    q: 'Are helmets provided?',
    a: 'Yes — one complimentary helmet is included with every rental. Request an extra helmet from your vendor at pickup if needed.',
  },
  {
    q: 'Can I ride outstation?',
    a: 'Many vendors allow outstation use. Confirm route and return timing with your vendor via booking chat after confirmation.',
  },
  {
    q: 'What is the cancellation policy?',
    a: 'Cancellation refunds follow admin-configured rules based on hours before pickup. See our Cancellation Policy page for details.',
  },
  {
    q: 'Do you offer roadside assistance?',
    a: 'Vendors and platform support assist with breakdowns during active trips. Contact your vendor via booking chat or platform support.',
  },
  {
    q: 'Minimum age to rent?',
    a: 'You must be at least 18 with a valid driving license for the vehicle category. Learner licenses are not accepted.',
  },
] as const;

export const CONTACT = {
  phone: '+91 98765 43210',
  email: 'hello@onnride.com',
  whatsapp: '+91 98765 43210',
  vendorPortal: 'http://localhost:3002',
  social: {
    instagram: 'https://www.instagram.com/onnride',
    facebook: 'https://www.facebook.com/onnride',
  },
} as const;
