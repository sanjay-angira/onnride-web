import { makePost, blocks, p, h2, h3, list, tips, mistakes, faqs } from '../helpers';
import type { BlogPost } from '../types';

export const post: BlogPost = makePost({
  slug: 'chandigarh-to-shimla-bike-route',
  title: 'Chandigarh to Shimla by bike: route, timing and stops',
  excerpt:
    'NH-5 hill highway from the Tricity to Shimla — distance, fuel stops, riding tips and what to rent.',
  category: 'Route guides',
  cluster: 'routes',
  priority: 'B',
  publishedAt: '2026-02-05',
  dateModified: '2026-06-01',
  readTimeMinutes: 9,
  gradient: 'from-purple-500 to-fuchsia-800',
  tags: ['Chandigarh', 'Shimla', 'Route', 'NH-5'],
  relatedCitySlugs: ['chandigarh', 'shimla'],
  relatedBlogSlugs: [
    'bike-rental-shimla',
    'bike-rental-chandigarh-prices-booking',
    'chandigarh-to-manali-bike-route-guide',
  ],
  quickAnswer:
    'Chandigarh to Shimla is roughly 115 km via NH-5 through Kalka and Solan, taking 3.5–5 hours by bike with breaks. Rent in the Tricity with outstation approval or pick up in Shimla — compare live rates on OnnRide for both options.',
  keyTakeaways: [
    'Distance ~115 km; plan half a day including breaks and Shimla parking.',
    'NH-5 is well paved but winding after Kalka — ride daylight hours.',
    'Compare live rates for Chandigarh pickup vs Shimla local rental.',
    'Fuel at Panchkula, Kalka and Solan — top up before final Shimla climb.',
    'Avoid overloading scooters for sustained highway and hill combo.',
  ],
  faqs: faqs([
    {
      q: 'What is the best route from Chandigarh to Shimla?',
      a: 'NH-5 via Panchkula, Kalka, Solan and Shoghi is the standard scenic highway — well signed year-round barring extreme weather.',
    },
    {
      q: 'How long does the ride take?',
      a: '3.5–5 hours depending on breaks and holiday traffic near Shimla entry.',
    },
    {
      q: 'Is the road difficult for beginners?',
      a: 'Moderate — steady climbs and bends after Kalka. New riders should practice in Tricity before committing.',
    },
    {
      q: 'Can I take a scooter on this route?',
      a: 'Possible for solo light riders, but 125–150 cc motorcycles are more comfortable for highway plus hill combined.',
    },
    {
      q: 'Where to stop for food?',
      a: 'Kalka, Dharampur and Solan have dhabas and chains. Shoghi offers hill views before Shimla.',
    },
    {
      q: 'Do I need permits?',
      a: 'No special permit for Chandigarh–Shimla on NH-5. Standard rental docs apply.',
    },
    {
      q: 'Should I rent in Chandigarh or Shimla?',
      a: 'Chandigarh if continuing elsewhere after; Shimla if flying/bus into hills. Compare live rates on OnnRide.',
    },
    {
      q: 'Is night riding safe?',
      a: 'Avoid — wildlife, sharp bends and tourist buses make daylight rides safer.',
    },
  ]),
  content: blocks(
    p(
      'The Chandigarh–Shimla run is the classic weekend hill escape — short enough for a morning departure, scenic enough to feel like a real ride. Plan your rental and NH-5 stops before you leave the Tricity.',
    ),
    h2('Route snapshot'),
    list([
      'Distance: ~115 km.',
      'Highlights: Kalka foothills, Solan valleys, Shoghi viewpoints.',
      'Elevation gain: steady climb into Shimla ~2,200 m.',
    ]),
    h2('Segment breakdown'),
    h3('Chandigarh to Kalka'),
    p('Flat to rolling highway — clear traffic early mornings. Fuel in Panchkula or Kalka.'),
    h3('Kalka to Solan'),
    p('Winding hill highway — maintain lane discipline and watch for slow trucks.'),
    h3('Solan to Shimla'),
    p('Tighter bends and tourist traffic near Shoghi. Patience pays off — do not rush passes.'),
    h2('Rental strategy'),
    p(
      'Compare live rates on OnnRide for /bike-rental/chandigarh with outstation Shimla use, or rent locally at /bike-rental/shimla if arriving by bus or air.',
    ),
    h2('Fuel and breaks'),
    list([
      'Panchkula / Kalka — last easy flatland fuel.',
      'Solan — meal and stretch stop.',
      'Shimla outskirts — fill before mall road parking hunt.',
    ]),
    tips([
      'Leave Tricity by 7 AM on summer Saturdays.',
      'Carry light jacket — Shimla cooler than Chandigarh.',
      'Offline maps help in Solan signal dips.',
      'Confirm hotel parking for rented bike in advance.',
    ]),
    mistakes([
      'Underestimating Shimla entry traffic on long weekends.',
      'Riding scooter two-up with luggage on steep sections.',
      'Skipping vendor outstation confirmation from Chandigarh pickup.',
    ]),
    h2('Hit the highway'),
    p(
      'Book your bike on OnnRide, ride NH-5 in daylight, and roll into Shimla Ridge by lunch.',
    ),
  ),
});
