import { blocks, faqs, h2, h3, list, makePost, p, type BlogPost } from '../helpers';

export const post: BlogPost = makePost({
  slug: 'goa-self-drive-bike-rental-guide',
  title: 'Goa self-drive bike rental: complete 2025 guide',
  excerpt:
    'Beaches, backroads and monsoon-ready tips — how to pick the right two-wheeler and book smart on OnnRide in Goa.',
  category: 'City guides',
  cluster: 'rental',
  priority: 'B',
  featured: true,
  publishedAt: '2025-05-12',
  dateModified: '2026-06-01',
  readTimeMinutes: 6,
  gradient: 'from-amber-500 to-orange-700',
  tags: ['Goa', 'Weekend trip', 'Scooter'],
  relatedCitySlugs: ['goa'],
  quickAnswer:
    'Goa is best explored on a self-drive scooter or light commuter — narrow coastal lanes and beach hops favour two-wheelers over cars. Book through OnnRide with transparent daily rates, complete KYC before pickup, and confirm fuel and deposit terms with your vendor in booking chat.',
  keyTakeaways: [
    'Scooters suit beach hops and city traffic; 125–150 cc commuters handle North–South Goa runs better.',
    'Book 9 AM–9 PM slots, compare deposit upfront, and coordinate exact pickup via booking chat.',
    'Fuel is not included; one helmet is standard. Deposit releases after safe return inspection.',
    'Confirm outstation or cruiser use with your vendor before you ride interior or highway stretches.',
  ],
  faqs: faqs([
    {
      q: 'What is the best bike to rent in Goa for a week-long trip?',
      a: 'For most visitors, a scooter (Activa or Ntorq) covers beach towns and short hops. Choose a 125–150 cc commuter if you plan North–South Goa runs or hillier interior routes.',
    },
    {
      q: 'Do I need an international license to rent in Goa?',
      a: 'Indian residents need a valid full driving license — learner licenses are not accepted. International visitors should carry an IDP plus home-country license and confirm acceptance with the vendor via booking chat.',
    },
    {
      q: 'Is fuel included in Goa bike rentals on OnnRide?',
      a: 'Fuel is typically not included. Vendors usually provide enough to reach the nearest pump. Refill before return if you consumed a full tank, per vendor policy.',
    },
    {
      q: 'Can I ride from North Goa to South Goa on a rented scooter?',
      a: 'Yes — many renters do daily coastal runs on scooters or commuters. Confirm your route and return timing with the vendor, especially for multi-day or outstation use.',
    },
    {
      q: 'What are typical pickup hours for Goa rentals?',
      a: 'Most OnnRide Goa listings use 9 AM–9 PM pickup and return windows. Book slots that match your flight or train arrival and message the vendor for exact landmark pickup.',
    },
    {
      q: 'How much security deposit should I expect in Goa?',
      a: 'Deposit varies by vehicle category and vendor — always shown in your pricing breakdown before payment. It is held during the trip and released after inspection with no damage claim.',
    },
    {
      q: 'Is one helmet enough for two riders in Goa?',
      a: 'One helmet is included with every rental. Carry a second helmet for your pillion — vendors may not always stock extras at pickup.',
    },
    {
      q: 'Can I rent a cruiser for Goa highway stretches?',
      a: 'Cruisers are listed by some vendors for weekend highway rides. Confirm outstation rules, deposit tier, and return location in booking chat before checkout.',
    },
  ]),
  content: blocks(
    p(
      'Goa remains India\'s favourite self-drive two-wheeler destination. Narrow coastal lanes, beach-hopping and late-night rides make scooters and light commuters the default choice — but picking the right vehicle and pickup slot matters.',
    ),
    p(
      'Peak season (December–February) fills slots quickly — book a few days ahead and complete KYC early so handover is not delayed on arrival day.',
    ),
    h2('Best bikes for Goa roads'),
    list([
      'Scooters (Activa, Ntorq) — ideal for couples, short beach hops and city traffic.',
      '125–150 cc commuters — better for North–South Goa runs and slightly hillier interior routes.',
      'Cruisers — weekend highway stretches; confirm outstation rules with your vendor via booking chat.',
    ]),
    h2('Booking tips on OnnRide'),
    p(
      'Select Goa as your location, pick pickup and return slots between 9 AM and 9 PM, and compare transparent daily rates plus security deposit before checkout. Pay online, complete KYC from your profile, and coordinate exact pickup point with your vendor after confirmation.',
    ),
    h3('Fuel, helmet and deposit'),
    p(
      'Fuel is not included — vendors typically hand over enough to reach the nearest pump. One helmet is included with every rental. Your deposit is held during the trip and released after safe return per vendor inspection.',
    ),
  ),
});
