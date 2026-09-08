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
  slug: 'spiti-valley-bike-trip',
  title: 'Spiti Valley bike trip: Manali route & planning',
  excerpt:
    'Plan a Spiti Valley motorcycle trip from Manali — Kunzum Pass, Kaza stays, permits, bike choice, and realistic day-by-day pacing.',
  category: 'Travel tips',
  cluster: 'himachal',
  priority: 'B',
  publishedAt: '2026-05-25',
  dateModified: '2026-06-01',
  gradient: 'from-yellow-500 to-amber-800',
  tags: ['Spiti', 'Kaza', 'Manali', 'Adventure', 'Himachal'],
  relatedCitySlugs: ['manali'],
  relatedBlogSlugs: [
    'adventure-bike-trips-india',
    'rohtang-pass-bike-rules-2026',
    'himachal-pradesh-bike-travel-guide',
    'manali-leh-fuel-stations',
  ],
  quickAnswer:
    'Spiti Valley bike trips usually start from Manali via Rohtang/Atal Tunnel and Kunzum Pass — allow 8–10 days minimum, rent a geared bike at /bike-rental/manali, secure beyond-Rohtang and inner-line permits, and acclimatise before Kaza\'s 3,800 m elevation.',
  keyTakeaways: [
    'Manali–Kaza is the classic entry — Kunzum Pass opens seasonally around summer.',
    'Royal Enfield Himalayan or Classic 350 are standard Spiti rental choices.',
    'Fuel and ATM gaps are real — cash and full tanks at Tandi and Kaza.',
    'Acclimatise in Keylong or Losar before sleeping in Kaza.',
    'Weather windows are narrow — build 2 buffer days in your itinerary.',
  ],
  faqs: faqs([
    {
      q: 'How many days do I need for Spiti on a bike?',
      a: 'Minimum 8–10 days from Manali including acclimatisation, Kaza exploration, and weather buffer. Rushing invites AMS and mechanical stress.',
    },
    {
      q: 'Which bike is best for Spiti Valley?',
      a: 'Royal Enfield Himalayan, Classic 350, or similar ADV rentals with good ground clearance. Avoid scooters for the full Manali–Kaza corridor.',
    },
    {
      q: 'What permits does Spiti require?',
      a: 'Beyond-Rohtang permit for Lahaul entry and inner-line permits for certain zones depending on your route and residency. Apply online before departure.',
    },
    {
      q: 'When does Kunzum Pass open?',
      a: 'Typically June–September after BRO snow clearance — exact dates vary yearly. Check HP Tourism updates before locking rental dates.',
    },
    {
      q: 'Can I rent in Manali and return in Shimla?',
      a: 'One-way drops are uncommon. Most OnnRide rentals are round-trip Manali — confirm via vendor chat if planning Shimla exit.',
    },
    {
      q: 'Are there fuel stations in Spiti?',
      a: 'Limited — Kaza has fuel but hours and supply fluctuate. Fill at Tandi entering Lahaul and top up whenever Kaza pump is open.',
    },
    {
      q: 'Is Spiti safe for solo riders?',
      a: 'Solo veterans ride Spiti yearly. Share live location, avoid isolated water crossings alone, and join convoys if first visit.',
    },
    {
      q: 'What is the hardest section?',
      a: 'Losar to Kunzum and descent toward Batal — rough surfaces, stream crossings, and weather exposure. Pace conservatively.',
    },
    {
      q: 'Do I need camping gear?',
      a: 'Hotels and homestays exist in Keylong, Losar, and Kaza — camping optional unless you prefer it. Book peak season stays early.',
    },
    {
      q: 'Can monsoon riders access Spiti from Manali?',
      a: 'Not recommended — landslides on Rohtang approaches and Kunzum uncertainty make summer core season the practical window.',
    },
  ]),
  content: blocks(
    p(
      'Spiti Valley is Himachal\'s high desert — monastery villages, fossil beds, and passes that feel like Tibet without leaving India. On a motorcycle, the approach from Manali via Kunzum is half the adventure. Rent at /bike-rental/manali on OnnRide, declare your Spiti route in vendor chat, and plan at least eight days for a humane first trip.',
    ),
    h2('Route overview: Manali to Kaza'),
    list([
      'Manali to Keylong — tunnel or Rohtang route.',
      'Keylong to Losar — Lahaul transition, fuel at Tandi.',
      'Losar to Kunzum Pass — high altitude, rough patches.',
      'Kunzum to Kaza — Spiti headquarters, acclimatised base.',
    ]),
    h2('Permits and paperwork'),
    p(
      'Beyond-Rohtang permit covers Lahaul entry from Manali. Inner-line requirements depend on route points and whether your vehicle is outside Himachal — verify current HP rules on the tourism portal. Carry printed QR codes — signal dies past Losar.',
    ),
    h2('Bike and gear'),
    p(
      'Book Himalayan or Classic 350 class bikes with recent service records. Inspect tyres and clutch at Manali handover. Pack layers, sunscreen, cash, basic tools, and hydration salts — Kaza sun is fierce, nights are cold.',
    ),
    tips([
      'Sleep lower before Kaza — Keylong or Losar first night after Manali.',
      'Start Kunzum crossing early — afternoon weather closes fast.',
      'Photograph bike daily — gravel falls take toll on fairings.',
      'Download offline maps for entire Spiti loop.',
      'Respect monastery photography rules in villages.',
    ]),
    h2('Suggested day plan'),
    h3('Days 1–2'),
    p(
      'Manali acclimatisation, permit check, bike inspection, short Solang or Naggar ride.',
    ),
    h3('Days 3–4'),
    p(
      'Manali to Keylong, sleep Lahaul. Top fuel at Tandi. Rest afternoon — altitude gain is significant.',
    ),
    h3('Days 5–6'),
    p(
      'Keylong/Losar to Kaza via Kunzum. Easy afternoon in Kaza — don\'t chase side trips same day.',
    ),
    h3('Days 7–8'),
    p(
      'Kaza loops — Key Monastery, Hikkim post office, Langza Buddha statue, optional Chandratal if route open and permitted.',
    ),
    h3('Days 9–10'),
    p(
      'Return toward Manali or buffer for weather. Never schedule tight flights on day after Kunzum return.',
    ),
    mistakes([
      'Manali to Kaza in one day — AMS and exhaustion risk.',
      'Scooter rental for Kunzum — vendors should refuse; listen if they do.',
      'Ignoring Kunzum closure tweets from BRO.',
      'Zero cash — Kaza ATMs fail often.',
      'Unapproved side routes — stick to permitted roads.',
    ]),
    h2('Fuel and supplies'),
    p(
      'Tandi last reliable fill before long gaps. Kaza has shops for snacks and basic parts — not a metro stock. Carry spare clutch cable if your vendor suggests it for older Enfields.',
    ),
    h2('Return options'),
    p(
      'Most first-timers return Manali–Kaza–Manali. Experienced riders exit via Kinnaur toward Shimla — longer, more permits, epic cliff highways. Match return plan to rental agreement on OnnRide.',
    ),
  ),
});
