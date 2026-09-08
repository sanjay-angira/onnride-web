import { makePost, blocks, p, h2, h3, list, tips, mistakes, faqs } from '../helpers';
import type { BlogPost } from '../types';

export const post: BlogPost = makePost({
  slug: 'bike-rental-deposit-explained',
  title: 'Bike rental security deposit explained: holds, refunds and disputes',
  excerpt:
    'How OnnRide security deposits work — when money is held, how refunds process and how to avoid damage claims.',
  category: 'Rental guide',
  cluster: 'policy',
  priority: 'A',
  publishedAt: '2026-02-12',
  dateModified: '2026-06-01',
  readTimeMinutes: 8,
  gradient: 'from-gray-500 to-slate-800',
  tags: ['Deposit', 'Policy', 'Refund', 'Rental'],
  relatedBlogSlugs: [
    'bike-rental-documents-india',
    'manali-bike-rental-price-2026',
    'bike-inspection-before-ride',
  ],
  quickAnswer:
    'Security deposits on OnnRide are held during your rental and released after safe return and vendor inspection. Deposit amount varies by bike model — see your booking summary when you compare live rates, not fixed blog numbers.',
  keyTakeaways: [
    'Deposit is separate from daily rental rate shown on OnnRide.',
    'Amount varies by bike category and vendor — check booking summary.',
    'Refunds follow successful inspection with no damage claim.',
    'Pre-ride photos protect you in scratch disputes.',
    'Compare live rates on OnnRide — lower daily rate may mean higher deposit.',
  ],
  faqs: faqs([
    {
      q: 'Why is a security deposit required?',
      a: 'It covers potential damage, loss or policy violations during self-drive rental. It is standard across verified vendors on OnnRide.',
    },
    {
      q: 'How much is the deposit?',
      a: 'Varies by model — scooters typically lower than Royal Enfields. Your exact deposit appears when comparing live rates and at checkout.',
    },
    {
      q: 'When is deposit collected?',
      a: 'Held as part of the booking flow per platform payment settings — details show in your confirmation.',
    },
    {
      q: 'How fast is deposit refunded?',
      a: 'After vendor marks safe return and any inspection window passes, refund follows OnnRide platform deposit refund settings.',
    },
    {
      q: 'What causes deposit deductions?',
      a: 'Documented damage beyond normal wear, missing accessories, late return penalties or policy breaches per vendor terms.',
    },
    {
      q: 'Can I reduce deposit amount?',
      a: 'Deposit is vendor-set for each bike listing. Choosing a different model or vendor may change the hold amount.',
    },
    {
      q: 'Should I photograph the bike at pickup?',
      a: 'Yes — timestamped photos of all panels, mirrors and tyres help resolve pre-existing damage disputes.',
    },
    {
      q: 'Is deposit same as total booking cost?',
      a: 'No — you pay daily rental plus a separate refundable deposit hold for the trip duration.',
    },
  ]),
  content: blocks(
    p(
      'Security deposits confuse first-time renters more than mileage limits. On OnnRide, deposit is transparent in your booking summary — compare live rates and deposit together before checkout.',
    ),
    h2('What the deposit covers'),
    list([
      'Accidental damage during your rental period.',
      'Missing helmets, mirrors or accessories.',
      'Excessive cleaning or mechanical abuse cases.',
      'Late return or unauthorised use penalties per policy.',
    ]),
    h2('How holds work'),
    p(
      'At booking, you see daily rate and deposit side by side. Funds are held per platform rules until return. Plan liquidity — deposit is not spend, but it is temporarily locked.',
    ),
    h2('Refund timeline'),
    p(
      'Return bike on time, participate in vendor inspection, report issues immediately. After cleared inspection, refund processes per OnnRide deposit refund settings — patience helps during peak return hours.',
    ),
    h2('Deposit vs bike category'),
    p(
      'Scooters and commuters often carry lower holds than Royal Enfields or adventure bikes. When you compare live rates on OnnRide, weigh total commitment — not just per-day price.',
    ),
    h2('Avoiding disputes'),
    list([
      'Walk around bike with vendor at pickup — note scratches.',
      'Photograph all angles in daylight.',
      'Report mechanical issues before leaving lot.',
      'Return with similar fuel level unless agreed otherwise.',
      'Do not modify bike or stickers without permission.',
    ]),
    tips([
      'Save vendor WhatsApp inspection photos if shared.',
      'Return during vendor business hours for same-day inspection.',
      'Clean obvious mud only — avoid aggressive washing that hides damage.',
      'Read late return policy in booking chat before extending informally.',
    ]),
    mistakes([
      'Skipping pickup inspection because you are in a hurry.',
      'Assuming small scratches "do not matter" without documentation.',
      'Handing keys without joint return walkaround.',
      'Choosing vendor solely on lowest daily rate while ignoring deposit hold size.',
    ]),
    h2('Book with eyes open'),
    p(
      'Compare live rates and deposits together on OnnRide, photograph at pickup, and ride responsibly — refunds stay smooth when expectations match policy.',
    ),
  ),
});
