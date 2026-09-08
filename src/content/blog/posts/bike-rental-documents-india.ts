import { makePost, blocks, p, h2, h3, list, tips, mistakes, faqs } from '../helpers';
import type { BlogPost } from '../types';

export const post: BlogPost = makePost({
  slug: 'bike-rental-documents-india',
  title: 'Documents needed for bike rental in India: DL, KYC and pickup checklist',
  excerpt:
    'A complete document guide for renting a two-wheeler in India — licence rules, OnnRide KYC and what to carry on pickup day.',
  category: 'Rental guide',
  cluster: 'policy',
  priority: 'A',
  publishedAt: '2026-01-22',
  dateModified: '2026-06-01',
  readTimeMinutes: 9,
  gradient: 'from-slate-500 to-slate-800',
  tags: ['Documents', 'KYC', 'Driving licence', 'Policy'],
  relatedBlogSlugs: [
    'bike-rental-deposit-explained',
    'ladakh-bike-rental-permit-documents',
    'outstation-bike-rental-punjab-hp',
  ],
  quickAnswer:
    'You need a valid driving licence for the vehicle class you rent, government ID for KYC, and the same originals at pickup. OnnRide lets you book first and complete KYC before handover — approval is required before the ride starts.',
  keyTakeaways: [
    'Valid two-wheeler DL is mandatory — learners permit is not sufficient for self-drive rental.',
    'Complete OnnRide KYC online before pickup day to avoid delays.',
    'Carry the same original ID used in KYC plus original DL at handover.',
    'International travellers need recognised licence plus IDP where applicable.',
    'Outstation and Ladakh trips may need extra permits beyond standard rental docs.',
  ],
  faqs: faqs([
    {
      q: 'Can I rent a bike without a driving licence?',
      a: 'No — verified vendors require a valid licence for the motorcycle or scooter class you book. Self-drive rental cannot proceed without it.',
    },
    {
      q: 'Is Aadhaar enough for bike rental?',
      a: 'Aadhaar or other government ID works for KYC, but it does not replace a driving licence. You need both.',
    },
    {
      q: 'Can I use a learning licence?',
      a: 'No — rental handover requires a full valid licence. Learner permits are not accepted on OnnRide.',
    },
    {
      q: 'When should I complete KYC on OnnRide?',
      a: 'After booking and before pickup day. KYC must be approved before the vendor releases the bike.',
    },
    {
      q: 'Do I need to carry originals at pickup?',
      a: 'Yes — carry original driving licence and the ID document used for KYC. Photocopies alone are not accepted.',
    },
    {
      q: 'What if my DL is from another state?',
      a: 'Indian DLs from any state are valid nationwide for rental, subject to vendor verification.',
    },
    {
      q: 'Can a foreign tourist rent a bike?',
      a: 'Yes with valid passport, visa and recognised driving licence. International Driving Permit may be required — confirm with vendor via chat.',
    },
    {
      q: 'Are extra permits needed for Ladakh?',
      a: 'Yes — inner line and protected area permits are separate from rental KYC. See our Ladakh permit guide for details.',
    },
  ]),
  content: blocks(
    p(
      'Document confusion causes more rental delays than flat tyres. Whether you rent in Chandigarh, Manali or Leh, the same core paperwork applies — licence, KYC and originals at pickup.',
    ),
    h2('Essential documents'),
    list([
      'Valid driving licence — motorcycle/scooter class matching your rental.',
      'Government photo ID — Aadhaar, passport or other KYC-accepted ID.',
      'OnnRide booking confirmation — digital or printed.',
      'Payment proof if requested by vendor during handover.',
    ]),
    h2('OnnRide KYC flow'),
    p(
      'Book and pay online first, then upload ID from your profile. KYC review must complete before ride start — do not leave it for the pickup morning.',
    ),
    h3('KYC tips'),
    list([
      'Use clear photos without glare.',
      'Name on ID should reasonably match licence name.',
      'Re-upload if rejected — do not arrive without approval status green.',
    ]),
    h2('Pickup day checklist'),
    list([
      'Original DL in wallet — not a photo on your phone.',
      'Same ID used for KYC.',
      'Booking ID and vendor contact in phone.',
      'Optional: secondary address proof if vendor requests.',
    ]),
    h2('Licence class matters'),
    p(
      'Renting a 350 cc Royal Enfield requires a licence valid for that class. Scooter rentals still need a proper two-wheeler licence — not just a car licence unless legally endorsed.',
    ),
    h2('Outstation and special routes'),
    p(
      'Standard rental docs cover most Punjab and Himachal highways. Ladakh, certain border areas and protected zones need additional permits — rental KYC alone is not enough.',
    ),
    tips([
      'Renew expiring DLs before trip — vendors cannot hand over on expired licences.',
      'Keep digital DigiLocker copies as backup, but originals are mandatory.',
      'For corporate bookings, clarify if invoice name must match rider DL.',
      'International riders: carry passport copies separately from rental paperwork.',
    ]),
    mistakes([
      'Booking for a friend using your account without matching DL at pickup.',
      'Assuming hotel check-in ID replaces KYC documents.',
      'Arriving with only Xerox copies.',
      'Ignoring permit requirements for Leh while only preparing standard DL.',
    ]),
    h2('Document-ready booking'),
    p(
      'Complete KYC early, carry originals, and compare live rates on OnnRide once paperwork is sorted — smooth handover beats roadside paperwork every time.',
    ),
  ),
});
