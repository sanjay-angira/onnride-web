import { blocks, faqs, h2, list, makePost, p, type BlogPost } from '../helpers';

export const post: BlogPost = makePost({
  slug: 'weekend-hill-station-road-trip-checklist',
  title: 'Weekend hill-station road trip checklist',
  excerpt:
    'Manali, Shimla, Mussoorie and beyond — prep your rental, route and return timing before you climb.',
  category: 'Travel tips',
  cluster: 'himachal',
  priority: 'C',
  publishedAt: '2025-03-22',
  dateModified: '2026-06-01',
  readTimeMinutes: 7,
  gradient: 'from-violet-500 to-purple-800',
  tags: ['Hill station', 'Road trip', 'Safety'],
  relatedCitySlugs: ['manali', 'shimla', 'mussoorie'],
  quickAnswer:
    'Hill routes demand a suitable bike category, confirmed outstation rules, and a realistic return buffer. Inspect tyres and brakes at pickup, plan fuel stops, and build extra time for descent traffic before your return slot.',
  keyTakeaways: [
    'Book 150 cc+ commuters or tourers for gradients and multi-day hill loops.',
    'Confirm outstation permission and return time with vendor in booking chat.',
    'Inspect tyres, brakes, and lights at pickup; carry a rain layer for shifting weather.',
    'Late returns trigger overdue charges — allow buffer for traffic on the way down.',
  ],
  faqs: faqs([
    {
      q: 'Which bike category is best for Manali or Shimla weekend trips?',
      a: '150 cc+ commuters or tourers handle gradients and longer distances better than scooters. Match power to your route — steep passes need adequate torque and braking.',
    },
    {
      q: 'Do I need vendor permission for outstation hill rides?',
      a: 'Yes — confirm your route, overnight stops, and return timing in booking chat after payment. Policies vary by vendor and vehicle.',
    },
    {
      q: 'Are fuel pumps reliable on hill routes?',
      a: 'Pumps can be sparse on certain stretches — plan stops on main corridors and top up before remote segments. Do not assume 24/7 availability in smaller hill towns.',
    },
    {
      q: 'What should I check at pickup for a hill trip?',
      a: 'Tyre tread, brake feel, headlight, and chain or belt condition. Document existing scratches with photos before you leave the vendor lot.',
    },
    {
      q: 'Is it safe to ride rented bikes in mountain fog or rain?',
      a: 'Reduce speed, increase following distance, and pause if visibility is unsafe. Mountain weather shifts quickly — carry a rain layer and avoid night rides in fog if unfamiliar with the road.',
    },
    {
      q: 'How much buffer should I add for return on a hill weekend?',
      a: 'Add at least 30–60 minutes beyond map ETA for descent traffic, fuel stops, and vendor inspection. Late return can move your booking to overdue status with extra charges.',
    },
    {
      q: 'Can I ride Mussoorie to Dhanaulti on a scooter?',
      a: 'Short hops between nearby towns may work on a scooter; longer climbs and rough patches favour a commuter. Confirm road conditions and vendor rules before you go.',
    },
    {
      q: 'What happens if the bike breaks down on a hill route?',
      a: 'Stop safely, message the vendor via booking chat immediately, and contact platform support if needed. Do not continue on faulty brakes or bald tyres.',
    },
  ]),
  content: blocks(
    p(
      'Hill routes demand more from rider and machine. Book a category suited to gradient and distance — often 150 cc+ commuters or tourers for multi-day loops.',
    ),
    p(
      'Weekend traffic on popular routes to Manali, Shimla, and Mussoorie peaks Friday evening and Sunday afternoon — plan departure and return outside those windows when possible.',
    ),
    h2('Before you leave'),
    list([
      'Confirm outstation and return time with vendor in booking chat.',
      'Check tyre condition and brakes at pickup inspection.',
      'Carry rain layer — mountain weather shifts quickly.',
      'Plan fuel stops; pumps can be sparse on certain stretches.',
    ]),
    h2('Return on time'),
    p(
      'Late returns can trigger overdue status and extra charges per vendor policy. Build buffer for traffic on descent and allow time for return inspection and deposit release.',
    ),
  ),
});
