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
  slug: 'rohtang-pass-bike-rules-2026',
  title: 'Rohtang Pass bike rules 2026: permits, timing & safety',
  excerpt:
    'Updated Rohtang Pass rules for bikers in 2026 — permit windows, one-way restrictions, altitude prep, and what Manali renters need to know.',
  category: 'Travel tips',
  cluster: 'himachal',
  priority: 'B',
  publishedAt: '2026-04-20',
  dateModified: '2026-06-01',
  gradient: 'from-sky-500 to-indigo-800',
  tags: ['Rohtang Pass', 'Manali', 'Permits', 'Himachal'],
  relatedCitySlugs: ['manali'],
  relatedBlogSlugs: [
    'royal-enfield-rental-manali',
    'himachal-pradesh-bike-travel-guide',
    'best-time-manali-bike',
  ],
  quickAnswer:
    'Rohtang Pass is regulated year-round — bikes need a valid Rohtang permit (or beyond-Rohtang permit for Lahaul), must travel in approved time slots, and should carry warm gear for sub-zero wind chill above 3,900 m. Rent your bike in Manali via /bike-rental/manali, confirm outstation permission with your vendor, and apply for permits online before your ride day.',
  keyTakeaways: [
    'Rohtang permits are mandatory for most private vehicles including bikes — apply online in advance.',
    'Pass opening depends on BRO clearance; check live status before booking rental dates.',
    'Start early from Manali — afternoon weather closes the pass more often than mornings.',
    'Beyond-Rohtang permits are separate if you continue toward Keylong or Leh.',
    'Altitude, cold, and glare demand layered gear, sunglasses, and slow pacing on descent.',
  ],
  faqs: faqs([
    {
      q: 'Do I need a separate permit for my bike at Rohtang Pass?',
      a: 'Yes. HP Tourism issues Rohtang permits for day visits and beyond-Rohtang permits for continued travel toward Lahaul. Apply on the official online portal with your vehicle number, ride date, and ID details.',
    },
    {
      q: 'Can I take an OnnRide rental bike over Rohtang?',
      a: 'Many Manali vendors allow Rohtang and Lahaul routes if declared at booking. Confirm in booking chat, ensure the bike registration permits outstation use, and carry the rental agreement at checkpoints.',
    },
    {
      q: 'What are the typical pass open hours?',
      a: 'When snow-cleared, traffic usually moves between early morning and mid-afternoon. Exact slots change seasonally — verify on the permit portal the day before your ride.',
    },
    {
      q: 'Is Rohtang open in winter?',
      a: 'The pass is generally closed from late autumn until BRO snow clearance in late spring. Winter Lahaul access uses the Atal Tunnel from Manali side — different rules apply.',
    },
    {
      q: 'Which bike type is best for Rohtang?',
      a: '350 cc Royal Enfields and well-maintained 150 cc+ commuters handle the gradient. Avoid underpowered scooters for the full pass crossing — they overheat on long climbs.',
    },
    {
      q: 'How cold is it at the pass top?',
      a: 'Even in summer, wind chill at 3,978 m can feel near freezing. Carry thermal layers, gloves, and a windproof jacket regardless of Manali valley temperatures.',
    },
    {
      q: 'Are there fuel stations after Rohtang?',
      a: 'Fuel is limited on the Manali–Keylong stretch. Top up in Manali and carry a backup plan for Lahaul segments — see our Manali–Leh fuel station guide for pump locations.',
    },
    {
      q: 'What documents do checkpoints ask for?',
      a: 'Original driving license, vehicle registration or rental agreement, permit printout or QR, and ID matching your permit application. Keep digital backups offline.',
    },
    {
      q: 'Can I do a same-day Manali–Rohtang–Manali loop?',
      a: 'Yes — this is the most common bike day trip. Start by 6–7 AM from Manali, avoid afternoon cloud build-up, and respect return slot timings on your permit.',
    },
  ]),
  content: blocks(
    p(
      'Rohtang Pass is the gateway from Manali to Lahaul and a bucket-list ride for every Himachal biker. Rules tightened over recent years — permits, timed entry, and environmental caps mean you cannot simply ride up on impulse. Plan your rental at /bike-rental/manali on OnnRide, secure permits early, and treat weather as the final authority.',
    ),
    h2('2026 permit system overview'),
    p(
      'Himachal Pradesh regulates Rohtang traffic through an online permit system. Day-visit permits cover Manali–Rohtang–Manali loops. Beyond-Rohtang permits are required if you continue toward Keylong, Sissu, or further on the Manali–Leh highway. Slots are limited — apply as soon as your travel dates are firm.',
    ),
    list([
      'Rohtang day permit — Manali to Rohtang top and return same day.',
      'Beyond-Rohtang permit — required for Lahaul valley continuation.',
      'Vehicle category — motorcycles have dedicated daily quotas.',
      'ID linkage — permit name must match license and KYC.',
    ]),
    h2('Before you leave Manali'),
    h3('Vendor and bike checks'),
    p(
      'Confirm with your OnnRide vendor that Rohtang use is allowed on your booking. Inspect brakes, tyre tread, and headlight before departure — checkpoint officials and mountain roads both demand a roadworthy machine.',
    ),
    h3('Gear and fuel'),
    list([
      'Thermal base layer, windproof jacket, gloves — pass top is cold year-round.',
      'Full-face helmet with clear and tinted visor options for glare and mist.',
      'Full fuel tank plus knowledge of last pump before Marhi.',
      'Printed or offline permit QR — mobile signal is unreliable at the top.',
    ]),
    h2('On the road: Manali to Rohtang top'),
    p(
      'The 51 km climb from Manali gains altitude fast. Ride in low gear, avoid aggressive overtaking on gravel patches, and stop at Marhi for tea and acclimatisation. Traffic jams near the pass top are common — engine overheating is a risk in queues; switch off during long holds.',
    ),
    tips([
      'Start at dawn — afternoon storms close the pass with little warning.',
      'Descend slowly — cold brake pads and gravel bends cause most bike incidents.',
      'Do not litter — fines are enforced; carry waste back to Manali.',
      'Watch for melting snow run-off across lanes in late spring.',
      'If you feel altitude headache, descend immediately — do not push to the top.',
    ]),
    h2('Beyond Rohtang: Lahaul and Atal Tunnel'),
    p(
      'Riders continuing to Keylong use beyond-Rohtang permits and must respect Lahaul-specific timing rules. The Atal Tunnel offers an alternative route from Manali toward Lahaul when Rohtang is closed — tunnel traffic has its own peak-hour management; check HP Police advisories.',
    ),
    mistakes([
      'Applying for permits after arriving in Manali during peak season — slots exhaust quickly.',
      'Renting a scooter for a full pass crossing — underpowered and unsafe on steep grades.',
      'Ignoring vendor outstation terms — insurance may void on unapproved routes.',
      'Riding without sunglasses — snow glare causes fatigue and vision loss.',
      'Skipping fuel top-up — no reliable pump between Manali and Keylong.',
    ]),
    h2('When Rohtang is closed'),
    p(
      'If BRO has not cleared snow, no permit will save the trip. Build flexible rental dates on OnnRide, monitor HP Tourism and BRO social updates, and keep backup plans like Solang Valley rides or Naggar–Jana waterfall loops in the Manali basin.',
    ),
  ),
});
