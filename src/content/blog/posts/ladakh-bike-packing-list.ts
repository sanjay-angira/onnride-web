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
  slug: 'ladakh-bike-packing-list',
  title: 'Ladakh bike packing list: gear for Manali–Leh riders',
  excerpt:
    'Everything to pack for a Ladakh motorcycle trip — riding gear, altitude essentials, tools, documents, and what to leave behind.',
  category: 'Travel tips',
  cluster: 'ladakh',
  priority: 'B',
  publishedAt: '2026-05-09',
  dateModified: '2026-06-01',
  gradient: 'from-blue-500 to-slate-800',
  tags: ['Ladakh', 'Packing', 'Gear', 'Manali', 'Leh'],
  relatedCitySlugs: ['manali', 'leh'],
  relatedBlogSlugs: [
    'leh-ladakh-bike-trip-complete-guide',
    'manali-leh-fuel-stations',
    'altitude-sickness-ladakh-bike',
    'ladakh-bike-rental-permit-documents',
  ],
  quickAnswer:
    'Pack in layers for Ladakh — thermal base, fleece, windproof shell, riding gloves, UV protection, and altitude meds. Carry documents (license, permits, rental agreement), basic tools, cash, offline maps, and a compact medical kit. Rent your bike at /bike-rental/manali or /bike-rental/leh and travel light — overloading a rental bike hurts handling on gravel passes.',
  keyTakeaways: [
    'Layered clothing beats one heavy jacket — temperatures swing 20°C daily.',
    'UV is extreme — sunscreen, lip balm, and polarized visor essential.',
    'Documents pouch: license, KYC ID, permits, rental papers, insurance.',
    'Basic tool roll and puncture kit — service stations are far apart.',
    'Pack altitude awareness — meds, hydration salts, know AMS symptoms.',
  ],
  faqs: faqs([
    {
      q: 'How much luggage can I carry on a Ladakh rental bike?',
      a: 'Keep personal gear under 15–20 kg on Enfield-class bikes. Use tank bag and small saddle bags — top-heavy loads wobble on gravel.',
    },
    {
      q: 'Do I need a down jacket for summer Ladakh?',
      a: 'Yes — mornings and pass tops are cold even in July. Packable down or synthetic puffy fits easily in daypack.',
    },
    {
      q: 'Should I bring my own helmet?',
      a: 'OnnRide rentals include one helmet. Bring your own if you need specific fit or intercom — confirm pillion helmet count in booking chat.',
    },
    {
      q: 'What medicines should I pack?',
      a: 'Consult your doctor — many riders carry Diamox for AMS prevention, pain relievers, anti-nausea, blister care, and personal prescriptions. Do not self-prescribe Diamox without medical advice.',
    },
    {
      q: 'Are rain gear necessary in Ladakh?',
      a: 'Rain is less frequent than Himachal, but sudden showers and river spray happen. Packable rain jacket and waterproof gloves are worth the weight.',
    },
    {
      q: 'Cash or card in Ladakh?',
      a: 'Carry both — Leh has ATMs but queues are long. Remote stops prefer cash for food and emergencies.',
    },
    {
      q: 'Do I need camping gear?',
      a: 'Most riders use hotels and homestays. Camping adds weight — only bring if your itinerary explicitly camps.',
    },
    {
      q: 'What electronics should I pack?',
      a: 'Power bank, spare charging cables, offline maps downloaded, action camera optional. Cold drains batteries — keep devices warm in inner pockets.',
    },
    {
      q: 'Can I pack a laptop?',
      a: 'Possible but unnecessary for most tours. Bumpy roads and dust risk damage — leave heavy electronics home if you can.',
    },
  ]),
  content: blocks(
    p(
      'Ladakh punishes overpackers and underprepared riders equally. The right kit keeps you warm at 5,000 m, visible in dust storms, and mobile when signal dies. This packing list assumes you are renting via OnnRide from Manali or Leh — vendor supplies bike, helmet, and registration papers; you supply everything that keeps you alive and comfortable.',
    ),
    h2('Riding gear core'),
    list([
      'Full-face helmet — included with rental; add clear + tinted visor.',
      'Riding jacket with removable liners — CE armour preferred.',
      'Riding gloves — waterproof outer, insulated liner.',
      'Riding boots or sturdy ankle-cover shoes.',
      'Riding pants or knee armour over trekking pants.',
    ]),
    h2('Clothing layers'),
    h3('Base and mid layers'),
    p(
      'Merino or synthetic thermals for mornings. Fleece or light puffy for evenings. Avoid cotton — it stays wet and cold.',
    ),
    h3('Outer shell'),
    p(
      'Windproof, water-resistant jacket blocks pass-top chill. Neck gaiter or buff seals helmet gaps against dust.',
    ),
    h3('Casual off-bike'),
    list([
      'Quick-dry t-shirts and underwear.',
      'Light trekking pants and sandals for hotel evenings.',
      'Wool socks — two pairs rotate.',
      'Sun hat and sunglasses for off-bike exploration.',
    ]),
    h2('Altitude and health kit'),
    list([
      'Reusable water bottle plus hydration salts.',
      'Personal medications and copies of prescriptions.',
      'Basic first aid — bandages, antiseptic, pain relief.',
      'Sunscreen SPF 50+ and lip balm with SPF.',
      'Hand sanitizer and wet wipes — limited showers remote.',
    ]),
    tips([
      'Ascend gradually — packing Diamox does not replace acclimatisation.',
      'Snack on nuts and chocolate — appetite drops at altitude.',
      'Sleep with head elevated if mild AMS symptoms appear.',
      'Keep one dry outfit sealed in plastic — river crossings and rain happen.',
    ]),
    h2('Documents pouch'),
    list([
      'Original driving license.',
      'ID used for OnnRide KYC.',
      'Printed or offline rental agreement.',
      'Rohtang / inner-line permits with QR codes.',
      'Emergency contacts and insurance details.',
    ]),
    h2('Tools and bike accessories'),
    p(
      'Confirm vendor toolkit at Manali pickup. Supplement with multi-tool, tyre puncture kit, zip ties, and duct tape. Phone mount with vibration dampening helps navigation — confirm mount compatibility in chat.',
    ),
    h2('Bags and packing strategy'),
    p(
      'Tank bag for documents, snacks, and phone. Small saddle bags or rear rack bag for clothes. Avoid hard boxes on rental bikes unless vendor provides mounting hardware rated for their bike.',
    ),
    mistakes([
      'Suitcase touring on a motorcycle — bungee cords fail on corrugated roads.',
      'Single cotton hoodie as only warm layer — inadequate at passes.',
      'Skipping UV protection — sunburn and snow glare fatigue riders fast.',
      'No cash reserve — ATM failures strand riders in remote valleys.',
      'Packing duplicate heavy items "just in case" — weight kills fuel range.',
    ]),
    h2('What to leave home'),
    list([
      'Hard-shell roller luggage.',
      'Excessive electronics and jewellery.',
      'Open-toed footwear for riding days.',
      'Alcohol-heavy toiletry bottles — weight adds up.',
    ]),
    h2('Pre-departure check'),
    p(
      'Lay everything out, weigh total personal load, test bungee configuration on parked bike at vendor handover, and shed non-essentials before crossing Rohtang or Atal Tunnel. Ladakh rewards minimalists.',
    ),
  ),
});
