import { makePost, blocks, p, h2, h3, list, tips, mistakes, faqs } from '../helpers';
import type { BlogPost } from '../types';

export const post: BlogPost = makePost({
  slug: 'bike-inspection-before-ride',
  title: 'Bike inspection before your rental ride: pickup checklist',
  excerpt:
    'A safety-first walkaround for every OnnRide pickup — brakes, tyres, lights and documentation before you leave the lot.',
  category: 'Safety',
  cluster: 'safety',
  priority: 'A',
  publishedAt: '2026-02-26',
  dateModified: '2026-06-01',
  readTimeMinutes: 8,
  gradient: 'from-red-500 to-orange-900',
  tags: ['Safety', 'Inspection', 'Checklist', 'Pickup'],
  relatedBlogSlugs: [
    'bike-rental-deposit-explained',
    'bike-rental-documents-india',
    'royal-enfield-rental-manali',
  ],
  quickAnswer:
    'Inspect every rental bike at pickup before signing handover: brakes, tyres, lights, mirrors, chain and existing damage photos. Refuse to leave if critical safety items fail — contact OnnRide support and the vendor immediately.',
  keyTakeaways: [
    'Never skip a daylight walkaround with the vendor present.',
    'Photograph all scratches and panel damage before riding.',
    'Brakes and tyres are non-negotiable safety items.',
    'Report mechanical faults before departure, not after breakdown.',
    'Good inspection protects your deposit and your body.',
  ],
  faqs: faqs([
    {
      q: 'What should I check first on a rental bike?',
      a: 'Brakes — firm lever/pedal feel and no sponginess. Then tyres for tread and cracks. Then lights and horn.',
    },
    {
      q: 'Should I photograph the bike at pickup?',
      a: 'Yes — all angles, existing scratches, odometer and fuel level. Timestamped photos prevent deposit disputes.',
    },
    {
      q: 'What if brakes feel soft?',
      a: 'Do not ride. Ask vendor to fix or swap bike before handover. Escalate via OnnRide if unresolved.',
    },
    {
      q: 'How do I check tyre condition?',
      a: 'Look for tread depth, sidewall cracks, bulges and correct inflation. Hill and highway trips need healthy rubber.',
    },
    {
      q: 'Is chain condition important?',
      a: 'Yes on multi-day rentals — slack should be within range and sprockets not hooked. Ask lubrication status.',
    },
    {
      q: 'Should I test ride before long trip?',
      a: 'Take a 5–10 minute local loop near vendor — test clutch, braking and gear shifts under load.',
    },
    {
      q: 'What documents coincide with inspection?',
      a: 'Verify bike registration matches vendor details, rental agreement notes damage you documented, and insurance/RTO papers if requested.',
    },
    {
      q: 'Who marks pre-existing damage?',
      a: 'You and vendor jointly — point at scratches while photographing. Silence equals acceptance on return.',
    },
  ]),
  content: blocks(
    p(
      'The cheapest rental becomes the most expensive if you skip pickup inspection. Five minutes in the lot prevents breakdowns on Rohtang, deposit fights in Leh and accidents from worn brakes.',
    ),
    h2('Before you touch the throttle'),
    list([
      'Complete KYC and DL verification with vendor.',
      'Ensure helmet fit and quality.',
      'Pick daylight inspection whenever possible.',
      'Keep vendor staff present for entire walkaround.',
    ]),
    h2('Brakes and controls'),
    list([
      'Front brake lever firm — no travel to handlebar.',
      'Rear brake pedal responsive.',
      'Clutch smooth engagement without slip.',
      'Throttle snaps closed without sticking.',
    ]),
    h2('Tyres and wheels'),
    list([
      'Tread adequate for planned route — hills need more rubber.',
      'No sidewall cracks or bulges.',
      'Rims true, spokes tight on spoke wheels.',
      'Tyre pressure visually OK — confirm with gauge if available.',
    ]),
    h2('Lights and electrics'),
    list([
      'Headlight high and low beam.',
      'Brake light activates on both brakes.',
      'Indicators front and rear.',
      'Horn audible — traffic depends on it.',
    ]),
    h2('Fluids and mechanical'),
    list([
      'Engine oil level on dipstick or sight glass.',
      'Coolant on liquid-cooled bikes where visible.',
      'Chain tension and lubrication.',
      'No obvious oil leaks on floor under bike.',
    ]),
    h2('Bodywork and accessories'),
    p(
      'Photograph scratches, dents, mirror cracks and seat tears. Note odometer reading and fuel level in writing or chat message.',
    ),
    h2('Short test ride'),
    p(
      'Ride nearby loop — shift through all gears, test braking from 40 km/h, feel for wobble or loose steering head.',
    ),
    tips([
      'Save photos to cloud immediately — phone loss should not lose evidence.',
      'Message vendor on booking chat summarising noted damage.',
      'Carry small tyre gauge on Ladakh trips.',
      'Refuse bike with bald tyres even if vendor pressures schedule.',
    ]),
    mistakes([
      'Signing handover while rushing to catch daylight.',
      'Assuming new-looking paint means good brakes.',
      'Discovering soft clutch 200 km from Manali instead of at lot.',
      'Returning without comparing to pickup photos when disputing scratches.',
    ]),
    h2('Inspect every time'),
    p(
      'OnnRide connects you to verified vendors — your inspection habit completes the safety chain. Compare live rates, book confidently, and never ride a bike you would not own.',
    ),
  ),
});
