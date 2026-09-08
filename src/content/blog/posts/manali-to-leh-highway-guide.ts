import { makePost, blocks, p, h2, h3, list, tips, mistakes, faqs } from '../helpers';
import type { BlogPost } from '../types';

export const post: BlogPost = makePost({
  slug: 'manali-to-leh-highway-guide',
  title: 'Manali to Leh highway by bike: passes, stops and survival guide',
  excerpt:
    'Rohtang, Baralacha La, Sarchu and Tanglang La — day-by-day riding advice for the Manali–Leh highway on a rented motorcycle.',
  category: 'Route guides',
  cluster: 'routes',
  priority: 'A',
  publishedAt: '2026-02-12',
  dateModified: '2026-06-01',
  readTimeMinutes: 11,
  gradient: 'from-indigo-500 to-blue-900',
  tags: ['Manali', 'Leh', 'Highway', 'Rohtang'],
  relatedCitySlugs: ['manali', 'leh'],
  relatedBlogSlugs: [
    'leh-ladakh-bike-trip-complete-guide',
    'ladakh-bike-rental-permit-documents',
    'himalayan-rental-manali',
  ],
  quickAnswer:
    'The Manali–Leh highway spans roughly 470 km with major passes and seasonal openings. Plan 2–3 riding days with overnight at Jispa or Sarchu, fuel at Tandi, and a Ladakh-capable rental from Manali — compare live rates on OnnRide before booking.',
  keyTakeaways: [
    'Distance ~470 km — do not attempt as a single day on a rental bike.',
    'Fuel critically low between Tandi and ups — fill at every chance.',
    'Overnight at Jispa, Sarchu or Pang for sane pacing and altitude.',
    'Compare live rates on OnnRide for Himalayan-class bikes in Manali.',
    'Check highway opening and weather daily during monsoon season.',
  ],
  faqs: faqs([
    {
      q: 'How many days for Manali to Leh by bike?',
      a: 'Minimum two riding days with one overnight in Jispa, Sarchu or similar. Three days is more comfortable for acclimatisation.',
    },
    {
      q: 'Which passes are on the route?',
      a: 'Rohtang (or Atal Tunnel routing), Baralacha La, Nakeela, Lachulung La and Tanglang La among notable high points.',
    },
    {
      q: 'Where is the last fuel before Leh?',
      a: 'Tandi is the famous last reliable fuel before long stretches. Top up again at Karu approaching Leh.',
    },
    {
      q: 'Can I camp on the highway?',
      a: 'Tented camps exist at Sarchu and Pang seasonally. Book ahead in June peak.',
    },
    {
      q: 'Do I need a permit for this highway?',
      a: 'Rohtang permits from Manali side when applicable. Inner line permits are for Leh valley side trips, not the highway transit itself.',
    },
    {
      q: 'What bike should I rent in Manali?',
      a: 'Royal Enfield Himalayan or equivalent adventure bike. Compare live rates on OnnRide and confirm Ladakh outstation permission.',
    },
    {
      q: 'Is the road paved throughout?',
      a: 'Mostly paved with rough patches and water crossings in sections. Conditions vary yearly — ride alert.',
    },
    {
      q: 'When should I start each morning?',
      a: 'Sunrise to early morning starts beat afternoon weather and give buffer for pass crossings.',
    },
  ]),
  content: blocks(
    p(
      'The Manali–Leh highway is the centerpiece of many Ladakh dreams. This guide covers pacing, fuel, passes and rental prep — not romantic shortcuts that ignore altitude and fatigue.',
    ),
    h2('Highway facts'),
    list([
      'Length: ~470 km Manali to Leh.',
      'Season: typically late May–September.',
      'Altitude: multiple passes above 4,800 m.',
    ]),
    h2('Suggested 3-day transit'),
    h3('Day 1: Manali to Jispa'),
    p('Cross Rohtang or tunnel route, descend to Keylong, overnight Jispa. Fuel at Tandi before the long gap.'),
    h3('Day 2: Jispa to Sarchu or Pang'),
    p('Baralacha La highlight — weather windows matter. Overnight tented camp for stars and rest.'),
    h3('Day 3: Sarchu/Pang to Leh'),
    p('Tanglang La then descent to Leh. Acclimatise before aggressive sightseeing.'),
    h2('Fuel strategy'),
    p(
      'Treat Tandi as gospel — fill tanks and carry cash. Range anxiety is real between remote stops.',
    ),
    h2('Rental preparation in Manali'),
    p(
      'Compare live rates on /bike-rental/manali for Himalayan or adventure class. Inspect tyres, brakes and lights. Confirm outstation Ladakh approval in booking chat.',
    ),
    h2('Gear and health'),
    list([
      'Thermal layers, rain shell, gloves, sun protection.',
      'Hydration and snacks between dhabas.',
      'Altitude awareness — headache means slow down.',
    ]),
    tips([
      'Start passes early — afternoon clouds and wind pick up.',
      'Photograph bike before departure for Ladakh road wear disputes.',
      'Carry basic toolkit and puncture repair.',
      'Book Sarchu camps before June peak weekends.',
    ]),
    mistakes([
      'Single-day Manali–Leh attempts — dangerous and exhausting.',
      'Skipping Tandi fuel on "half tank looks fine".',
      'Riding after dark on pass sections.',
      'Renting underpowered bikes without ground clearance.',
    ]),
    h2('Ride the highway with respect'),
    p(
      'Book the right bike on OnnRide, split the miles across days, and let Tanglang La arrive on a rested body — not a midnight gamble.',
    ),
  ),
});
