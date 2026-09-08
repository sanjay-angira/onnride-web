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
  slug: 'manali-leh-fuel-stations',
  title: 'Manali to Leh fuel stations: bike trip pump guide',
  excerpt:
    'Every critical fuel stop on the Manali–Leh highway — Tandi, Karu, ups, timings, and how to plan range on a rented Ladakh bike.',
  category: 'Travel tips',
  cluster: 'ladakh',
  priority: 'B',
  publishedAt: '2026-05-04',
  dateModified: '2026-06-01',
  gradient: 'from-amber-500 to-orange-800',
  tags: ['Manali', 'Leh', 'Fuel', 'Ladakh', 'Highway'],
  relatedCitySlugs: ['manali', 'leh'],
  relatedBlogSlugs: [
    'manali-to-leh-highway-guide',
    'leh-ladakh-bike-trip-complete-guide',
    'ladakh-bike-packing-list',
  ],
  quickAnswer:
    'Fuel gaps on the Manali–Leh highway are the main planning risk — Tandi (before Sarchu) is the last reliable pump for hundreds of kilometres northbound. Rent a well-maintained bike at /bike-rental/manali, carry a jerry can only if legal and vendor-approved, and never skip a fill when a pump is open.',
  keyTakeaways: [
    'Top up fully in Manali and again at Tandi before the long Sarchu–Leh stretch.',
    'Fuel availability changes seasonally — confirm pump status locally before departure.',
    'Carry cash — some remote pumps have intermittent UPI connectivity.',
    'Know your bike\'s highway range and ride conservatively on high-altitude climbs.',
    'Vendor fuel policy at handover matters — start with a full tank from Manali pickup.',
  ],
  faqs: faqs([
    {
      q: 'Where is the last fuel stop before Sarchu from Manali?',
      a: 'Tandi, where the Chandra and Bhaga rivers meet, is the critical last fill before the long gap toward Sarchu and Leh. Do not leave Tandi on a partial tank.',
    },
    {
      q: 'Are there fuel stations in Leh town?',
      a: 'Yes — Leh has multiple pumps, but summer queues are long. Fill early morning and before returning toward Manali or Nubra.',
    },
    {
      q: 'Can I carry extra fuel in jerry cans?',
      a: 'Regulations on carrying petrol vary and vendors may prohibit extra cans on rented bikes. Ask your OnnRide vendor via booking chat before carrying auxiliary fuel.',
    },
    {
      q: 'What range should I assume on the Manali–Leh highway?',
      a: 'Plan for 250–350 km between reliable fills depending on bike model, load, and altitude. Thinner air reduces efficiency on carbureted bikes.',
    },
    {
      q: 'Do pumps accept cards and UPI?',
      a: 'Manali and Leh usually do. Remote highway pumps may be cash-only — carry sufficient notes.',
    },
    {
      q: 'What if a pump is closed when I arrive?',
      a: 'Ask locals at the previous stop about timing. Never gamble on the next station — turnaround distances are enormous.',
    },
    {
      q: 'Is fuel included in OnnRide rentals?',
      a: 'Typically no — vendors hand over enough fuel to reach the nearest pump. Start Manali–Leh trips with a full tank at handover.',
    },
    {
      q: 'Are there pumps on the Leh–Manali return route?',
      a: 'Same critical stops apply in reverse — Karu, Upshi, and Tandi on the descent. Leh fill before starting south.',
    },
    {
      q: 'Does altitude affect fuel consumption?',
      a: 'Yes — engines work harder on climbs and riders idling in traffic queues burn extra fuel. Budget margin beyond flat-highway estimates.',
    },
  ]),
  content: blocks(
    p(
      'Running dry on the Manali–Leh highway is a rite of passage riders should never experience. Distances between pumps are measured in anxiety, not kilometres. If you are renting at /bike-rental/manali on OnnRide, fuel planning starts at vendor handover and does not stop until Leh.',
    ),
    h2('Northbound: Manali to Leh'),
    h3('Manali and valley'),
    p(
      'Fill completely in Manali town before Rohtang or Atal Tunnel routing. Marhi and Rohtang top have seasonal vendors but do not depend on them for full tanks.',
    ),
    h3('Keylong and Tandi'),
    p(
      'Keylong in Lahaul valley has pumps after Atal Tunnel or Rohtang descent. Tandi is the non-negotiable stop — last reliable fuel before the brutal Sarchu plateau segment.',
    ),
    h3('Sarchu to Leh'),
    p(
      'Long gap with no dependable retail fuel. Carry snacks, water, and conservative speed. Pang and Upshi approaches eventually bring you into Leh district fuel infrastructure.',
    ),
    list([
      'Manali — full tank at trip start.',
      'Keylong — top up after Lahaul entry.',
      'Tandi — mandatory full fill northbound.',
      'Upshi / Karu — Leh approach fills.',
      'Leh town — base for acclimatisation and Nubra planning.',
    ]),
    h2('Southbound: Leh to Manali'),
    p(
      'Reverse the discipline — fill in Leh before departure, refill at every open pump on the descent, and treat Tandi as your last safety net before climbing toward Rohtang or tunnel routes.',
    ),
    tips([
      'Ask pump attendants about next station status — local knowledge beats apps.',
      'Morning fills avoid tour-bus convoy queues at Manali and Leh pumps.',
      'Track odometer segments — know exactly how far since last fill.',
      'Thin air causes carb bikes to run rich — monitor performance.',
      'Never pass an open pump assuming the next will be open.',
    ]),
    h2('Rental bike considerations'),
    p(
      'Confirm with your Manali vendor that Leh highway use is approved, the bike is recently serviced, and tyres are suitable for gravel sections. A misfiring engine at 4,000 m is a fuel and safety crisis — inspect at pickup.',
    ),
    mistakes([
      'Leaving Tandi with half a tank — the most common Ladakh rookie error.',
      'Trusting outdated blog posts about pump locations — infrastructure shifts.',
      'Relying only on UPI in remote stops — cash saves stranded hours.',
      'Ignoring vendor fuel level at handover — start full, not "nearest pump".',
      'Racing on plateau straights — speed burns fuel and invites wind fatigue.',
    ]),
    h2('Emergency planning'),
    p(
      'If fuel runs low between stations, stop and ask commercial vehicles or army camps for guidance — never ride until the tank is empty. Satellite phones and convoy travel are last resorts for stranded riders.',
    ),
  ),
});
