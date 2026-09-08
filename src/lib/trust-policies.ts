/** Trust & policy copy — rental, insurance, reviews FAQ. */

export const RENTAL_POLICY_SECTIONS = [
  {
    title: 'Booking & confirmation',
    items: [
      'Browse and compare live vendor listings by city and dates without creating an account.',
      'WhatsApp OTP verification is required at checkout before payment.',
      'Booking is confirmed after successful Razorpay payment and vendor acceptance per platform rules.',
      'Pricing shown at checkout includes daily rate, applicable taxes, discounts, and refundable security deposit.',
    ],
  },
  {
    title: 'KYC & eligibility',
    items: [
      'Valid driving licence and government ID (Aadhaar) are required before pickup handover.',
      'KYC can be uploaded after booking; approval is mandatory before the vendor releases the vehicle.',
      'Minimum age: 18 with a valid licence for the vehicle category. Learner licences are not accepted.',
      'International guests need a valid International Driving Permit where applicable.',
    ],
  },
  {
    title: 'Pickup & return',
    items: [
      'Hub pickup: meet at the vendor hub linked to the vehicle unless doorstep delivery was selected.',
      'Doorstep delivery: pickup and return occur at the address provided during booking.',
      'Inspect the vehicle with the vendor, document existing damage, and sign the pickup report.',
      'Return at the agreed time and location; late returns may incur extra charges per vendor policy.',
    ],
  },
  {
    title: 'Fuel, helmet & accessories',
    items: [
      'Fuel is not included unless explicitly stated by the vendor in booking chat.',
      'One complimentary helmet is included with every rental.',
      'Extra helmet or accessories may be available at pickup — confirm with your vendor.',
    ],
  },
  {
    title: 'Security deposit',
    items: [
      'A refundable security deposit is collected at checkout; amount depends on bike model and vendor.',
      'Deposit is released after safe return and vendor inspection with no damage claim.',
      'Damage, theft, or policy violations may result in partial or full deposit forfeiture per inspection.',
    ],
  },
  {
    title: 'Extensions, cancellation & disputes',
    items: [
      'Rental extensions require vendor or admin approval and are charged per platform pricing rules.',
      'Cancellation refunds follow the OnnRide cancellation policy windows shown at checkout.',
      'Disputes on damage or deposit are reviewed by platform support with pickup/return documentation.',
    ],
  },
] as const;

export const INSURANCE_POLICY_SECTIONS = [
  {
    title: 'Marketplace model',
    items: [
      'OnnRide is a rental marketplace — vehicles are owned and insured by independent vendor partners.',
      'Insurance coverage, limits, and claim processes depend on the vendor fleet and applicable motor laws.',
      'Riders must confirm insurance and liability terms with the vendor at pickup when required.',
    ],
  },
  {
    title: 'Rider responsibilities',
    items: [
      'Ride only with a valid licence and within agreed routes (especially for outstation trips).',
      'Follow traffic laws, wear the provided helmet, and avoid riding under influence of alcohol or drugs.',
      'Report accidents, theft, or breakdowns to the vendor and platform support immediately.',
      'Do not sublet, misuse, or modify the vehicle without vendor written approval.',
    ],
  },
  {
    title: 'Third-party liability',
    items: [
      'Third-party injury or property damage claims are handled per the vehicle insurance policy held by the vendor.',
      'Riders may be personally liable for negligence, unauthorised use, or riding outside approved routes.',
      'For outstation rides (e.g. Manali–Leh), confirm interstate and permit requirements before departure.',
    ],
  },
  {
    title: 'Damage & theft',
    items: [
      'Document vehicle condition at pickup and return with photos where possible.',
      'Theft or total loss must be reported to police and the vendor without delay.',
      'Repair costs or deductibles may be recovered from the security deposit per vendor inspection.',
    ],
  },
  {
    title: 'Travel insurance recommendation',
    items: [
      'OnnRide does not sell travel or medical insurance.',
      'For high-altitude or long-distance tours (Ladakh, Spiti, etc.), riders are advised to carry personal travel and medical insurance.',
    ],
  },
] as const;

export const REVIEWS_PAGE_FAQ = [
  {
    q: 'Are OnnRide reviews real?',
    a: 'Published reviews come from customers who completed bookings on OnnRide. Reviews are moderated before publication per platform settings.',
  },
  {
    q: 'How is the average rating calculated?',
    a: 'The average reflects all published reviews across completed trips on the marketplace, weighted equally per review.',
  },
  {
    q: 'Can vendors respond to reviews?',
    a: 'Yes — vendors may reply to published reviews when vendor replies are enabled on the platform.',
  },
  {
    q: 'How do I leave a review?',
    a: 'After your trip is marked complete, you can submit a rating and review from your booking. Only verified completed trips are eligible.',
  },
] as const;
