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
  slug: 'altitude-sickness-ladakh-bike',
  title: 'Altitude sickness on a Ladakh bike trip: prevention & response',
  excerpt:
    'Recognize AMS, HACE, and HAPE symptoms on Ladakh rides — acclimatisation pacing, Diamox basics, and when to descend immediately.',
  category: 'Safety',
  cluster: 'ladakh',
  priority: 'B',
  publishedAt: '2026-05-11',
  dateModified: '2026-06-01',
  gradient: 'from-red-500 to-rose-900',
  tags: ['Altitude sickness', 'Ladakh', 'Safety', 'AMS'],
  relatedCitySlugs: ['leh', 'manali'],
  relatedBlogSlugs: [
    'leh-ladakh-bike-trip-complete-guide',
    'ladakh-bike-packing-list',
    'manali-to-leh-highway-guide',
  ],
  quickAnswer:
    'Acute mountain sickness (AMS) can hit fit riders above 3,000 m — headache, nausea, and dizziness are warning signs. Ascend gradually, hydrate, sleep low, and descend if symptoms worsen. Consult a doctor before using Diamox. Rent from /bike-rental/manali or /bike-rental/leh and build acclimatisation days into your itinerary before crossing high passes.',
  keyTakeaways: [
    'AMS does not respect fitness — rapid ascent from Manali to Leh is high risk.',
    'Headache plus nausea at altitude means stop ascending — rest or descend.',
    'Serious AMS (HACE/HAPE) is life-threatening — emergency descent required.',
    'Hydration and sleep matter more than energy drinks on bike trips.',
    'Build 1–2 acclimatisation days in Manali and Leh before hard riding.',
  ],
  faqs: faqs([
    {
      q: 'What is acute mountain sickness (AMS)?',
      a: 'AMS is the body\'s reaction to lower oxygen at altitude — headache, fatigue, nausea, and poor sleep are common early signs. It typically appears above 2,500–3,000 m when ascending too fast.',
    },
    {
      q: 'How fast can I ascend on a Manali–Leh bike trip?',
      a: 'Avoid sleeping more than 500–700 m higher than the previous night when possible. The highway forces big gains — rest days in Keylong and Leh help compensate.',
    },
    {
      q: 'Should I take Diamox for Ladakh?',
      a: 'Many riders consult doctors for acetazolamide (Diamox) prophylaxis. It is not mandatory and has side effects — medical guidance is essential.',
    },
    {
      q: 'Can I ride a motorcycle with mild AMS?',
      a: 'Mild symptoms warrant rest, hydration, and no further ascent. Riding requires focus — do not operate a bike if dizzy, confused, or severely headache-prone.',
    },
    {
      q: 'What are HACE and HAPE?',
      a: 'High-altitude cerebral edema (HACE) and pulmonary edema (HAPE) are severe forms — confusion, staggering gait, chest tightness, pink frothy cough. Immediate descent and medical help are critical.',
    },
    {
      q: 'Does smoking or alcohol worsen AMS?',
      a: 'Yes — both impair acclimatisation and dehydration recovery. Avoid alcohol first 48 hours at altitude.',
    },
    {
      q: 'Are children or older riders more at risk?',
      a: 'Everyone is susceptible. Older riders with cardiac or lung conditions need doctor clearance before Ladakh.',
    },
    {
      q: 'What helps besides descending?',
      a: 'Rest, hydration, light meals, supplemental oxygen at Leh clinics for moderate cases. Descent remains the definitive treatment for worsening symptoms.',
    },
    {
      q: 'Can flying to Leh cause AMS?',
      a: 'Yes — flying to Kushok Bakula Rimpochee Airport jumps you to 3,250 m instantly. Rest 24–48 hours in Leh before strenuous riding.',
    },
    {
      q: 'Should I cancel my rental if I get AMS?',
      a: 'Contact OnnRide support and your vendor — health comes first. Rescheduling or medical evacuation planning beats pushing through dangerous symptoms.',
    },
  ]),
  content: blocks(
    p(
      'Ladakh\'s beauty sits above 3,000 metres — thin air that turns strong riders into headache sufferers overnight. On a motorcycle, AMS is especially dangerous because balance and reaction time already face gravel, wind, and fatigue. Treat altitude respectfully, build rest days into your Manali–Leh plan, and know when to turn the bike around.',
    ),
    h2('Understanding altitude on the Manali–Leh route'),
    p(
      'Manali sits near 2,050 m; Rohtang and tunnel routes climb past 3,900 m; Leh town is 3,500 m; passes like Khardung La exceed 5,300 m. Your body needs time to produce more red blood cells — rushing the schedule invites AMS.',
    ),
    list([
      '2,500 m — mild breathlessness on exertion normal.',
      '3,500 m — AMS risk rises with rapid ascent.',
      '4,500 m+ — strenuous effort feels disproportionately hard.',
      '5,000 m+ — short visits only for most riders after acclimatisation.',
    ]),
    h2('AMS symptoms to watch'),
    h3('Mild AMS'),
    list([
      'Headache not relieved by hydration.',
      'Nausea or reduced appetite.',
      'Fatigue disproportionate to riding effort.',
      'Poor sleep and vivid dreams.',
    ]),
    h3('Severe — evacuate'),
    list([
      'Confusion, inability to walk straight (HACE signs).',
      'Chest congestion, breathlessness at rest (HAPE signs).',
      'Cough with pink or frothy sputum.',
      'Symptoms worsening despite rest.',
    ]),
    h2('Prevention strategies'),
    tips([
      'Sleep lower than your daytime high point when possible.',
      'Hydrate steadily — pale urine is the target colour.',
      'Eat light, carb-forward meals — heavy fats feel worse at altitude.',
      'Avoid ascending further with headache — "tough it out" fails at 4,000 m.',
      'Schedule acclimatisation walks in Leh before Khardung La day trips.',
    ]),
    h2('Riding-specific risks'),
    p(
      'A dizzy rider on Khardung La gravel is a tragedy waiting to happen. If you feel AMS symptoms, park the bike, rest, hydrate, and assess. Delegate riding to a rested partner only if they are symptom-free — two sick riders is worse.',
    ),
    h2('Diamox and medical prep'),
    p(
      'Consult a travel medicine doctor 4–6 weeks before departure. Discuss Diamox, personal risk factors, and emergency plans. Carry a basic pulse oximeter optional — useful for tracking SpO2 trends, not for replacing symptoms awareness.',
    ),
    mistakes([
      'Manali morning to Leh night — classic AMS invitation.',
      'Treating headache only with painkillers while continuing ascent.',
      'Alcohol celebration first night in Leh — worsens dehydration.',
      'Ignoring staggering gait as "bike fatigue".',
      'Riding Khardung La on day one after flying to Leh.',
    ]),
    h2('Emergency response'),
    p(
      'Worsening symptoms mean immediate descent — even 500 m lower helps. Leh has medical clinics and oxygen support. Severe cases need evacuation to lower altitude hospitals — travel insurance with medical evacuation cover is wise for Ladakh trips.',
    ),
    h2('Planning safer itineraries'),
    list([
      'Day 1–2 — Manali acclimatisation rides below 2,500 m.',
      'Day 3–4 — Cross to Keylong, sleep Lahaul.',
      'Day 5 — Reach Leh, rest day minimum.',
      'Day 7+ — High passes like Khardung La after Leh acclimatisation.',
    ]),
    h2('When to postpone or cancel'),
    p(
      'Chest infections, uncontrolled hypertension, or recent AMS history may mean postponing Ladakh. OnnRide bookings can adjust with vendor and support coordination — no ride is worth HACE or HAPE.',
    ),
  ),
});
