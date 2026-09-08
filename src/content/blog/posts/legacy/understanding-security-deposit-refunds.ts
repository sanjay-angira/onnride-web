import { blocks, faqs, h2, makePost, p, type BlogPost } from '../helpers';

export const post: BlogPost = makePost({
  slug: 'understanding-security-deposit-refunds',
  title: 'How security deposit and refunds work',
  excerpt:
    'Deposit is separate from rental total — collected at checkout, held during your trip, and released after return inspection.',
  category: 'Rental guide',
  cluster: 'policy',
  priority: 'B',
  publishedAt: '2025-03-08',
  dateModified: '2026-06-01',
  readTimeMinutes: 4,
  gradient: 'from-rose-500 to-red-700',
  tags: ['Deposit', 'Payments', 'Refund'],
  quickAnswer:
    'Security deposit is paid upfront with your rental total and held separately — it is not vendor earnings unless a damage claim is approved. After safe return and inspection, the full deposit releases per platform refund settings; partial forfeit applies only when a claim is settled.',
  keyTakeaways: [
    'Deposit amount is always shown in pricing breakdown before Razorpay checkout.',
    'Deposit covers potential damage or policy violations during the trip — ride carefully.',
    'Document bike condition with photos at pickup and return to support dispute-free release.',
    'Full refund after inspection with no claim; partial forfeit only on approved damage claims.',
  ],
  faqs: faqs([
    {
      q: 'Why do I pay a security deposit on top of the rental fee?',
      a: 'Deposit covers potential damage, loss, or policy violations during your trip. It is held separately from the rental total and is not treated as vendor earnings unless a claim is approved.',
    },
    {
      q: 'Where can I see my deposit amount before paying?',
      a: 'The full pricing breakdown at checkout shows rental total plus security deposit before you complete Razorpay payment — always review it before confirming.',
    },
    {
      q: 'When is my deposit refunded after I return the bike?',
      a: 'After safe return, vendor inspection, and no approved damage claim, deposit is released per admin deposit refund settings — automatic or manual depending on configuration.',
    },
    {
      q: 'Can part of my deposit be forfeited?',
      a: 'Yes — if an approved damage claim or policy violation is recorded, a partial forfeit may apply. You are notified through the booking and refund flow.',
    },
    {
      q: 'Is deposit the same for every bike?',
      a: 'No — deposit varies by vehicle, category, and location rules. Premium or higher-cc bikes often carry higher deposits.',
    },
    {
      q: 'How long does deposit refund take to reach my account?',
      a: 'Timing depends on Razorpay and bank processing after release is initiated — typically a few business days. Check your payment method and booking status for updates.',
    },
    {
      q: 'Should I take photos at pickup and return?',
      a: 'Yes — photos of existing scratches and overall condition at both handover and return help resolve disputes quickly and support full deposit release.',
    },
    {
      q: 'What if I disagree with a damage claim on my deposit?',
      a: 'Contact platform support with your pickup and return photos, booking chat history, and inspection notes. Claims follow documented vendor and admin review process.',
    },
  ]),
  content: blocks(
    p(
      'On every booking you pay rental total plus security deposit upfront via Razorpay. The deposit amount comes from vehicle, category or location rules — always shown in your pricing breakdown before payment.',
    ),
    p(
      'Treat deposit as insurance for the vendor, not an extra fee — return the bike on time, in agreed condition, and with documented inspection to get it back in full.',
    ),
    h2('During the trip'),
    p(
      'Deposit covers potential damage or policy violations. It is not part of vendor earnings until a claim is settled. Ride carefully and document condition at pickup and return.',
    ),
    h2('After safe return'),
    p(
      'Vendor inspects the vehicle. With no damage, deposit is released per admin deposit refund settings — automatic or manual. Partial forfeit applies only when a damage claim is approved.',
    ),
  ),
});
