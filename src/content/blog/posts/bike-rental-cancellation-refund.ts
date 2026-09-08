import {
  makePost,
  blocks,
  p,
  h2,
  h3,
  list,
  tips,
  mistakes,
  faqs,
} from '../helpers';
import type { BlogPost } from '../types';

export const post: BlogPost = makePost({
  slug: 'bike-rental-cancellation-refund',
  title: 'Bike rental cancellation & refund policy on OnnRide',
  excerpt:
    'How OnnRide handles booking cancellations, refunds, vendor no-shows, and date changes — what renters should know before checkout.',
  category: 'Rental guide',
  cluster: 'policy',
  priority: 'B',
  publishedAt: '2026-04-27',
  dateModified: '2026-06-01',
  gradient: 'from-rose-500 to-red-800',
  tags: ['Cancellation', 'Refund', 'Policy', 'Booking'],
  relatedBlogSlugs: [
    'understanding-security-deposit-refunds',
    'bike-rental-deposit-explained',
    'kyc-checklist-first-time-renters',
  ],
  quickAnswer:
    'OnnRide cancellation and refund outcomes depend on how far ahead you cancel, vendor policy, and whether payment was captured or only authorized. Cancel from your booking dashboard as early as possible, document vendor issues via booking chat, and expect refunds to the original payment method within standard banking timelines after approval.',
  keyTakeaways: [
    'Earlier cancellations generally receive higher refund percentages per platform rules.',
    'Vendor-specific terms may apply on top of OnnRide baseline policy — read checkout summary.',
    'No-shows and same-day cancellations usually forfeit most or all prepaid amounts.',
    'Deposit refunds are separate from booking cancellation — handled after bike return.',
    'Force majeure (road closures, disasters) may qualify for credit or rescheduling — contact support.',
  ],
  faqs: faqs([
    {
      q: 'How do I cancel an OnnRide bike booking?',
      a: 'Open your booking in the OnnRide app or website, select Cancel booking, and confirm. The system shows estimated refund eligibility before you finalize cancellation.',
    },
    {
      q: 'How long do refunds take after cancellation?',
      a: 'Approved refunds return to your original payment method. Bank and UPI timelines vary — typically a few business days up to one billing cycle for cards.',
    },
    {
      q: 'Can I reschedule instead of cancelling?',
      a: 'Many bookings support date changes if vendor inventory allows. Request modification via booking chat or support — rescheduling often preserves more value than cancelling and rebooking.',
    },
    {
      q: 'What if the vendor cancels on me?',
      a: 'If a vendor cannot fulfil your confirmed booking, OnnRide support arranges alternatives or processes a full refund. Document all communication in booking chat.',
    },
    {
      q: 'Is the security deposit refunded on cancellation?',
      a: 'Deposits are usually pre-authorized, not captured, for confirmed trips. If you cancel before handover, deposit hold should release per payment gateway rules. Captured deposits refund after approval.',
    },
    {
      q: 'Do I get a refund if weather closes mountain passes?',
      a: 'Document official road closure advisories and contact support. Case-by-case credits or rescheduling may apply — vendor and platform policies govern final outcomes.',
    },
    {
      q: 'Are partial refunds possible for early returns?',
      a: 'Returning the bike before your booked end date does not automatically trigger partial refunds unless vendor agrees in chat. Extensions work the opposite way — extra days charged per rules.',
    },
    {
      q: 'What counts as a no-show?',
      a: 'Failing to appear at agreed pickup time without prior notice typically forfeits prepaid rental amounts and may affect deposit handling.',
    },
    {
      q: 'Can I cancel after KYC is approved?',
      a: 'Yes — KYC approval does not lock you into the ride. Cancellation terms still follow timing-based rules shown at checkout.',
    },
    {
      q: 'Who do I contact for disputed refunds?',
      a: 'Use in-app support with your booking ID, chat screenshots, and payment reference. OnnRide mediates between renter and vendor per platform policy.',
    },
  ]),
  content: blocks(
    p(
      'Plans change — flights delay, passes close, friends drop out. Understanding how OnnRide handles cancellation and refunds before you pay saves stress later. This guide explains renter-initiated cancellations, vendor failures, deposit handling, and how to maximize refund eligibility.',
    ),
    h2('Cancellation tiers and timing'),
    p(
      'Refund eligibility typically scales with notice period. Cancelling days or weeks before pickup preserves more of your prepaid amount than same-day cancellation. The exact breakdown appears on your checkout summary and booking detail page — always review before confirming payment.',
    ),
    list([
      'Early cancellation — highest refund percentage per platform schedule.',
      'Mid-window cancellation — partial refund; vendor may have turned down other bookings.',
      'Late cancellation — minimal or zero refund; vendor held inventory for you.',
      'No-show — prepaid amounts usually forfeited.',
    ]),
    h2('Renter-initiated cancellation'),
    h3('Steps to cancel cleanly'),
    list([
      'Open booking dashboard and select Cancel.',
      'Review displayed refund estimate.',
      'Confirm cancellation and save confirmation email or screenshot.',
      'Watch for refund credit on original payment method.',
    ]),
    h3('When rescheduling beats cancelling'),
    p(
      'If your dates shift slightly, message your vendor via booking chat first. Rescheduling within vendor availability often avoids cancellation penalties and keeps your rate locked.',
    ),
    h2('Vendor-initiated cancellation'),
    p(
      'Verified vendors rarely cancel, but bike damage, documentation issues, or overbooking can happen. If a vendor cannot fulfil a confirmed booking, OnnRide support steps in with replacement options or full refund. Keep all communication in-platform — off-platform deals weaken dispute resolution.',
    ),
    tips([
      'Screenshot checkout refund terms at payment time for reference.',
      'Cancel unused bookings promptly — holding inventory hurts small vendors.',
      'Buy travel insurance separately if your trip has high cancellation risk.',
      'For pass-dependent trips, build flexible rental dates where possible.',
      'Contact support early when issues emerge — last-minute tickets are harder to resolve.',
    ]),
    h2('Security deposit vs booking payment'),
    p(
      'Booking payment and security deposit follow different paths. Deposits are often authorization holds released after safe return. Cancelling before pickup should release deposit holds per gateway timing. See our deposit refund guide for post-ride inspection disputes.',
    ),
    h2('Special situations'),
    h3('Weather and road closures'),
    p(
      'Himalayan trips face pass closures, landslides, and curfews. If official advisories make your route impossible, contact OnnRide support with links or screenshots. Outcomes may include rescheduling credits — not guaranteed cash refunds unless vendor agrees.',
    ),
    h3('KYC rejection or incomplete documents'),
    p(
      'If KYC cannot be approved before pickup, vendor may refuse handover. Resolve document issues early; cancellation terms apply if you cannot complete KYC in time.',
    ),
    mistakes([
      'Assuming walk-up cancellations get full refunds — policy is time-based.',
      'Negotiating only off-platform — no audit trail for support.',
      'Waiting until pickup hour to cancel — worst refund tier.',
      'Confusing deposit release timing with booking refund timing.',
    ]),
    h2('Maximizing refund success'),
    p(
      'Cancel early, communicate in booking chat, document vendor problems, and escalate to OnnRide support with your booking ID. Transparent platform records help both renters and vendors reach fair outcomes.',
    ),
  ),
});
