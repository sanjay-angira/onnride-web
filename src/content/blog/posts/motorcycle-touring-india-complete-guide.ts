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
  slug: 'motorcycle-touring-india-complete-guide',
  title: 'Motorcycle touring in India: complete planning guide',
  excerpt:
    'From bike choice and paperwork to Himalaya seasons and packing — the definitive India motorcycle touring guide for renters and owners alike.',
  category: 'Pillar guides',
  cluster: 'touring',
  priority: 'A',
  isPillar: true,
  readTimeMinutes: 20,
  publishedAt: '2026-05-07',
  dateModified: '2026-06-01',
  gradient: 'from-indigo-600 to-violet-900',
  tags: ['Motorcycle touring', 'India', 'Road trip', 'Pillar'],
  relatedCitySlugs: ['manali', 'leh', 'chandigarh', 'goa'],
  relatedBlogSlugs: [
    'himachal-pradesh-bike-travel-guide',
    'leh-ladakh-bike-trip-complete-guide',
    'adventure-bike-trips-india',
    'ladakh-bike-packing-list',
    'bike-rental-documents-india',
  ],
  quickAnswer:
    'India motorcycle touring spans weekend hill loops to month-long Himalaya expeditions. Match bike category to terrain, rent from verified platforms like OnnRide when flying in, secure permits for regulated routes, pack layers for altitude, and never underestimate monsoon or fuel-gap planning on remote highways.',
  keyTakeaways: [
    'Himalaya, Rajasthan, Western Ghats, and Northeast each demand different bikes and seasons.',
    'Renting beats shipping your own bike for fly-in trips — compare live rates on OnnRide.',
    'Paperwork: license, KYC, permits, rental agreement, and PUC where applicable.',
    'Daily distances should drop as altitude and road quality drop.',
    'Touring culture rewards early starts, defensive riding, and flexible itineraries.',
  ],
  faqs: faqs([
    {
      q: 'Do I need my own bike to tour India?',
      a: 'No — fly-in riders rent from OnnRide in cities like Manali, Chandigarh, Leh, Goa, and Rishikesh. Owners often ship bikes via train for long tours, but rental is faster for two-week trips.',
    },
    {
      q: 'What license do I need for motorcycle touring in India?',
      a: 'A valid Indian two-wheeler license or international permit accepted in India. Carry original documents — checkpoints on highway routes are common.',
    },
    {
      q: 'How many kilometres should I ride per day?',
      a: 'Plains highways allow 300–400 km for experienced riders. Himalayan segments often cap at 150–250 km due to curves, altitude, and fatigue.',
    },
    {
      q: 'When is the best time for Himalaya touring?',
      a: 'June–September for Ladakh access; April–June and September–October for Himachal and Uttarakhand. Avoid core monsoon on cliff highways.',
    },
    {
      q: 'Is solo touring safe in India?',
      a: 'Thousands tour solo yearly. Share live location, avoid night riding on unknown roads, book verified rentals, and trust local weather advisories.',
    },
    {
      q: 'Royal Enfield or modern adventure bike?',
      a: 'Enfields suit classic Himalaya pacing and parts availability. Modern ADV bikes excel on mixed terrain but have sparser service in remote districts.',
    },
    {
      q: 'How do I handle breakdowns far from cities?',
      a: 'Choose well-maintained rentals, carry basic tools, save vendor and OnnRide support contacts, and ask army or truckers for help on remote highways — Indian road solidarity is real.',
    },
    {
      q: 'What about insurance for rented touring bikes?',
      a: 'OnnRide bookings include vendor-defined coverage terms. Read checkout details, avoid unapproved routes, and document bike condition at pickup.',
    },
    {
      q: 'Can I tour India as a foreign national?',
      a: 'Yes with valid visa, license, and permits where required. Rent from platforms with clear KYC flows and carry passport copies at checkpoints.',
    },
    {
      q: 'How much should I budget for a two-week Himalaya tour?',
      a: 'Costs vary by bike category, hotels, and route. Compare live rental rates on OnnRide, add fuel and food, and keep emergency cash — avoid fixed daily price assumptions in outdated guides.',
    },
  ]),
  content: blocks(
    p(
      'India is among the world\'s great motorcycle touring destinations — a single country where you can ride snow passes, coastal highways, desert forts, and rainforest ghats in one ambitious month. This pillar guide is the planning layer beneath every route-specific article we publish: bike choice, seasons, paperwork, pacing, culture, and rental logistics for riders who want the full picture before turning the key.',
    ),
    h2('Touring regions at a glance'),
    h3('The Himalaya arc'),
    p(
      'Himachal, Uttarakhand, Ladakh, Sikkim, and Arunachal form the prestige belt. High altitude, permit complexity, and seasonal pass closures define planning. Most international visitors start in Manali, Leh, or Chandigarh.',
    ),
    h3('Rajasthan and the Thar'),
    p(
      'Winter-friendly, fort-to-fort touring on wide highways. Heat management and hydration dominate summer. Royal Enfields and cruisers fit the aesthetic and pace.',
    ),
    h3('Western Ghats and Konkan'),
    p(
      'Monsoon-green hairpins from Mumbai and Bangalore toward Goa and Coorg. Scooters and light commuters excel; leeches and rain define July rides.',
    ),
    h3('Northeast frontiers'),
    p(
      'Assam, Meghalaya, Nagaland — culturally rich, less crowded, more permit friction. Plan extra days for inner-line paperwork and monsoon landslides.',
    ),
    h2('Rent vs own vs buy-sell'),
    p(
      'Fly-in travellers should rent verified bikes via OnnRide — no shipping, no resale hassle, vendor maintenance responsibility. Long-term India sabbaticals sometimes justify buying a used Enfield and selling at trip end; that path needs registration transfer knowledge most tourists lack.',
    ),
    list([
      'Rent — best for 1–4 week fly-in tours.',
      'Own bike shipped by train — best for 6+ week dedicated tours.',
      'Buy-sell locally — expert-level; registration and state taxes apply.',
    ]),
    h2('Choosing your touring machine'),
    h3('Scooters (110–125 cc)'),
    p(
      'City and short ghats only — not for Ladakh, Spiti, or multi-day highway touring.',
    ),
    h3('Commuters (150–220 cc)'),
    p(
      'Budget Himalaya highway option for solo riders with light luggage. Fuel-efficient, easier to upright after slow drops.',
    ),
    h3('Royal Enfield lineage'),
    p(
      'Classic touring romance with wide service network in North India. Vibration and braking demand respect; choose vendors with recent service records on OnnRide.',
    ),
    h3('Adventure and ADV (250 cc+)'),
    p(
      'KTM, Himalayan 450, BMW GS — for mixed-surface routes like Spiti riverbeds. Spare parts thin outside major towns.',
    ),
    h2('Paperwork and compliance'),
    list([
      'Valid two-wheeler license — original at checkpoints.',
      'KYC for rentals — complete before pickup on OnnRide.',
      'Rental agreement — keep digital and physical copies.',
      'Rohtang, inner-line, and protected-area permits per route.',
      'PUC and insurance papers where states enforce checks.',
    ]),
    h2('Seasonal matrix'),
    list([
      'Ladakh — June to September primary window.',
      'Himachal / Uttarakhand — April–June, September–October sweet spots.',
      'Rajasthan — October–March avoids desert heat.',
      'Goa / coast — October–February dry season.',
      'Monsoon — experienced riders only on cliff and ghats roads.',
    ]),
    h2('Daily pacing and acclimatisation'),
    p(
      'Touring India is not a kilometre challenge — altitude, heat, and traffic variability matter more than odometer bragging. Schedule acclimatisation days above 3,000 m. Start rides at dawn; end before dusk on mountain segments.',
    ),
    tips([
      'Share live location with family — Jio coverage is wide but not universal.',
      'Carry electrolytes — dehydration mimics AMS symptoms.',
      'Learn basic chain lube and puncture repair — saves hours remote.',
      'Respect temple town dismount zones and no-horn zones.',
      'Tip dhabas fairly — they are your roadside support network.',
    ]),
    h2('Packing for multi-week tours'),
    p(
      'See our Ladakh packing list for altitude specifics. Baseline touring kit: layered riding gear, rain suit, tool roll, first-aid, power bank, offline maps, cash envelope, and dry bag for electronics.',
    ),
    h2('Fuel and food logistics'),
    p(
      'Assume fuel gaps on Ladakh, Spiti, and parts of Northeast. Food is rarely the problem — highway dhabas serve dal, rice, and chai every 50–80 km on major routes. Vegetarian riders thrive; vegan options thin in remote stops.',
    ),
    h2('Lodging rhythm'),
    p(
      'Mix hotels, homestays, and monastery guesthouses. Peak season needs advance booking in Manali, Leh, and Rishikesh. Flexible riders can negotiate walk-in rates off-season.',
    ),
    h2('Safety culture'),
    p(
      'Indian highways mix the world\'s traffic diversity — cows, trucks, weddings, and landslides share one lane. Defensive riding saves lives. ABS helps; skills matter more. Women tour successfully with daylight discipline and verified vendors.',
    ),
    mistakes([
      'Copying YouTube itineraries day-for-day — weather overrides plans.',
      'Riding at night on Himalayan highways — trucks and no streetlights.',
      'Skipping permit research — turnarounds cost days.',
      'Overloading pillions with luggage on small bikes — handling suffers.',
      'Ignoring vendor maintenance quality — cheapest rental is not cheapest trip.',
    ]),
    h2('Using OnnRide across a multi-city tour'),
    p(
      'Book each city segment on OnnRide, declare full routes in vendor chat, and photograph handover condition. Round-trip returns are standard — plan loops that end where your rental started unless one-way drop is pre-approved.',
    ),
    h2('Sample tour archetypes'),
    h3('14-day Ladakh classic'),
    list([
      'Fly to Chandigarh or Delhi, reach Manali, rent, cross to Leh.',
      'Acclimatise in Leh, Nubra, Pangong loops.',
      'Return via same highway or fly from Leh.',
    ]),
    h3('10-day Himachal loop'),
    list([
      'Chandigarh pickup, Shimla, Manali, Kasol, return.',
      'Permits for Rohtang if included.',
    ]),
    h3('7-day Rajasthan heritage'),
    list([
      'Jaipur base, Amber, Pushkar, Jodhpur highway days.',
      'Winter timing preferred.',
    ]),
    h2('Building your own itinerary'),
    p(
      'Start with region and season, pick bike category, map fuel and permits, book rentals early on OnnRide, and keep two buffer days per two weeks of riding. India rewards riders who plan loose and ride attentive.',
    ),
  ),
});
