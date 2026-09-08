import { blocks, faqs, h2, list, makePost, p, type BlogPost } from '../helpers';

export const post: BlogPost = makePost({
  slug: 'monsoon-two-wheeler-safety-basics',
  title: 'Monsoon two-wheeler safety basics',
  excerpt:
    'Wet roads, reduced visibility and longer braking — stay safe on rented bikes during rainy season.',
  category: 'Safety',
  cluster: 'safety',
  priority: 'C',
  publishedAt: '2025-06-01',
  dateModified: '2026-06-01',
  readTimeMinutes: 5,
  gradient: 'from-cyan-600 to-blue-900',
  tags: ['Monsoon', 'Safety', 'Helmet'],
  quickAnswer:
    'Monsoon riding changes grip, visibility, and braking distance — treat the first hour on an unfamiliar rented bike as calibration. Slow down early, avoid painted lines and metal covers when wet, and stop riding if visibility drops below safe limits.',
  keyTakeaways: [
    'Reduce speed and increase following distance — wet asphalt extends braking distance.',
    'Painted road markings and metal covers are slippery when wet; avoid sharp lean angles.',
    'Helmet is included — add a rain layer and avoid loose clothing near wheels.',
    'Report faulty brakes or bald tyres immediately; do not continue on unsafe bikes.',
  ],
  faqs: faqs([
    {
      q: 'Is it safe to rent a two-wheeler during monsoon?',
      a: 'Yes with caution — reduce speed, increase gaps, and inspect tyres and brakes at pickup. Skip rides when visibility or flooding makes conditions unsafe.',
    },
    {
      q: 'What should I check on a rented bike before monsoon riding?',
      a: 'Tyre tread depth, brake response, headlight, and wiper-free visor clarity on your helmet. Report bald tyres or soft brakes before leaving the vendor.',
    },
    {
      q: 'How much should I slow down in rain?',
      a: 'There is no fixed number — cut speed early enough that you can stop within visible distance. If you feel the front wheel slip, you are already too fast for conditions.',
    },
    {
      q: 'Are disc brakes better in wet conditions?',
      a: 'Disc brakes can fade if waterlogged — test both brakes gently after riding through standing water. Either way, increase following distance on wet roads.',
    },
    {
      q: 'Should I ride through standing water?',
      a: 'Avoid deep water — hidden potholes and hydroplaning risk rise quickly. If you must cross shallow pools, go slow, upright, and steady on throttle.',
    },
    {
      q: 'What gear helps in monsoon besides a helmet?',
      a: 'A light rain jacket, closed shoes, and reflective elements improve comfort and visibility. Avoid loose scarves or dupattas near wheels and chain.',
    },
    {
      q: 'Can I reschedule if rain is too heavy on booking day?',
      a: 'Message your vendor via booking chat as early as possible — rescheduling depends on vendor policy and availability, not automatic cancellation for weather.',
    },
    {
      q: 'Who do I contact if the bike skids or has a mechanical issue in rain?',
      a: 'Stop safely first, then use booking chat for vendor support and platform support for urgent safety issues. Do not continue riding on compromised brakes or tyres.',
    },
  ]),
  content: blocks(
    p(
      'Rain changes every ride variable: grip, potholes and reaction time. If you rent during monsoon, treat the first hour as calibration — especially on unfamiliar bikes.',
    ),
    p(
      'Standing water hides potholes and oil slicks — the first rain after a dry spell is often the slipperiest because dust and oil lift to the surface.',
    ),
    h2('Ride smarter'),
    list([
      'Reduce speed early; painted lines and metal covers are slippery when wet.',
      'Increase following distance — braking distance grows on wet asphalt.',
      'Wear helmet (included) and optional rain layer; avoid loose clothing near wheels.',
      'Pause if visibility drops below safe limits — booking chat helps reschedule with vendor.',
    ]),
    p(
      'Report mechanical issues immediately via booking chat or platform support. Do not continue on faulty brakes or bald tyres.',
    ),
  ),
});
