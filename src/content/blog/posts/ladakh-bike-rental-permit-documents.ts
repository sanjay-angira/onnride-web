import { makePost, blocks, p, h2, h3, list, tips, mistakes, faqs } from '../helpers';
import type { BlogPost } from '../types';

export const post: BlogPost = makePost({
  slug: 'ladakh-bike-rental-permit-documents',
  title: 'Ladakh bike rental permits and documents: ILP, Rohtang and checkpoints',
  excerpt:
    'Every permit and document you need to rent a bike for Ladakh — inner line passes, Rohtang rules and checkpoint prep.',
  category: 'Rental guide',
  cluster: 'ladakh',
  priority: 'A',
  publishedAt: '2026-01-29',
  dateModified: '2026-06-01',
  readTimeMinutes: 10,
  gradient: 'from-blue-500 to-cyan-800',
  tags: ['Ladakh', 'Permits', 'ILP', 'Documents'],
  relatedCitySlugs: ['leh', 'manali'],
  relatedBlogSlugs: [
    'leh-ladakh-bike-trip-complete-guide',
    'bike-rental-documents-india',
    'best-bike-leh-ladakh-rental',
  ],
  quickAnswer:
    'Ladakh bike trips need standard rental docs (DL + KYC ID) plus inner line permits for restricted areas like Pangong and Nubra. Manali departures may need Rohtang permits seasonally. Rental paperwork and tourist permits are separate processes.',
  keyTakeaways: [
    'OnnRide KYC and driving licence are required — they do not replace Ladakh ILP.',
    'Apply inner line permits in Leh (or online where available) for lake and Nubra circuits.',
    'Rohtang Pass permits apply on Manali side during regulated seasons.',
    'Carry multiple ID copies — checkpoints are routine on Ladakh routes.',
    'Match permit names exactly to KYC and licence details.',
  ],
  faqs: faqs([
    {
      q: 'What is an inner line permit (ILP) in Ladakh?',
      a: 'Government authorization for non-residents to visit protected areas including Pangong, Nubra Valley and some border zones. Required in addition to rental documents.',
    },
    {
      q: 'Where do I get Ladakh permits?',
      a: 'Leh DC office, designated online portals when active, or authorised agents. Many riders apply after acclimatising in Leh.',
    },
    {
      q: 'Do I need Rohtang permit on a rented bike?',
      a: 'When crossing Rohtang from Manali during regulated periods, yes — arrange via vendor guidance or official Rohtang permit channels.',
    },
    {
      q: 'Can the rental vendor arrange ILP?',
      a: 'Some vendors assist for a fee. Confirm in OnnRide booking chat — ultimate responsibility stays with the rider.',
    },
    {
      q: 'How many photocopies should I carry?',
      a: 'At least 5–10 sets of ID and permit copies. Checkpoints and homestays often request them.',
    },
    {
      q: 'Are permits needed for Leh city only?',
      a: 'Leh town and common approach roads often need standard ID only. Pangong, Nubra, Tso Moriri and similar need ILP.',
    },
    {
      q: 'What documents for bike rental pickup in Leh?',
      a: 'Original DL, KYC-approved ID and booking confirmation — same as any OnnRide rental nationwide.',
    },
    {
      q: 'Do foreign nationals need different permits?',
      a: 'Yes — Protected Area Permit rules differ for international travellers. Research PAP requirements before booking flights.',
    },
  ]),
  content: blocks(
    p(
      'Ladakh paperwork stacks up fast: rental KYC, inner line permits, Rohtang passes and checkpoint IDs. Separate what your OnnRide vendor needs at pickup from what Ladakh administration requires on the road.',
    ),
    h2('Rental documents (OnnRide)'),
    list([
      'Valid driving licence — motorcycle class.',
      'KYC-approved government ID (original at pickup).',
      'Booking confirmation and vendor coordination via chat.',
    ]),
    h2('Inner line permits (ILP)'),
    p(
      'Required for most iconic Ladakh detours. Apply with accurate names matching your licence and KYC.',
    ),
    h3('Commonly covered areas'),
    list([
      'Pangong Lake circuit.',
      'Nubra Valley via Khardung La.',
      'Dah-Hanu and some border-adjacent villages.',
      'Tso Moriri and certain Changthang routes.',
    ]),
    h3('Application tips'),
    list([
      'Plan 1–2 hours in Leh for in-person processing when online is down.',
      'List all riders and pillions consistently.',
      'Keep digital photos of permits on phone backup.',
    ]),
    h2('Rohtang and Manali-side permits'),
    p(
      'If your Ladakh trip starts from Manali and crosses Rohtang during quota seasons, secure Rohtang permits before departure. Atal Tunnel routing may change permit needs — verify current rules before ride day.',
    ),
    h2('Checkpoint etiquette'),
    p(
      'Stop calmly, remove helmet, present originals and permit copies. Rental bikes may attract extra registration scrutiny — carry vendor contact in case officers verify ownership.',
    ),
    h2('Renting in Manali vs Leh'),
    p(
      'Manali pickup suits highway entrants; compare live rates on OnnRide and confirm outstation Ladakh permission. Leh pickup skips Manali–Leh transit permits on the south side but still needs ILP for restricted valleys.',
    ),
    tips([
      'Apply ILP after light acclimatisation — you may need to appear in person.',
      'Laminate permit copies if riding multi-day — paper wears fast.',
      'Ask vendor for bike registration copy photo before Ladakh departure.',
      'Keep emergency cash — some remote checkpoints lack connectivity.',
    ]),
    mistakes([
      'Assuming rental booking equals Ladakh ILP.',
      'Name typos on permits — fix before leaving Leh.',
      'Single photocopy stash — runs out at first checkpoint.',
      'Ignoring Rohtang quota deadlines on Manali start dates.',
    ]),
    h2('Document-ready Ladakh ride'),
    p(
      'Complete OnnRide KYC early, file permits with matching IDs, and compare live rates for Manali or Leh rentals once paperwork is clear.',
    ),
  ),
});
