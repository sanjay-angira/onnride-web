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
  rentalFaqs,
} from '../helpers';
import type { BlogPost } from '../types';

export const post: BlogPost = makePost({
  slug: 'bike-rental-dehradun-mussoorie',
  title: 'Bike rental in Dehradun & Mussoorie: hill ride guide',
  excerpt:
    'Rent in Dehradun for Mussoorie hill runs, Robber\'s Cave day trips, and Rishikesh extensions — OnnRide booking and road tips.',
  category: 'City guides',
  cluster: 'himachal',
  priority: 'B',
  publishedAt: '2026-05-14',
  dateModified: '2026-06-01',
  gradient: 'from-lime-500 to-green-800',
  tags: ['Dehradun', 'Mussoorie', 'Uttarakhand', 'Hill station'],
  relatedCitySlugs: ['dehradun', 'mussoorie'],
  relatedBlogSlugs: [
    'bike-rental-rishikesh',
    'weekend-hill-station-road-trip-checklist',
    'bike-rental-delhi-manali',
  ],
  quickAnswer:
    'Dehradun is the practical rental base for Mussoorie — wider vendor choice and easier parking than the hill station itself. Book at /bike-rental/dehradun or /bike-rental/mussoorie on OnnRide, compare live rates, and pick a geared bike for Mussoorie\'s steep climb if carrying a pillion.',
  keyTakeaways: [
    'Dehradun pickups suit multi-day loops — Mussoorie, Rishikesh, and Dhanaulti.',
    'Mussoorie mall road congestion favours early-morning rides.',
    '150 cc+ commuters handle Mussoorie gradient better than loaded scooters.',
    'Monsoon increases landslide risk on Mussoorie hill road — ride daylight only.',
    'Confirm outstation permission for Rishikesh or Haridwar extensions in chat.',
  ],
  faqs: faqs([
    ...rentalFaqs('Dehradun'),
    {
      q: 'Should I rent in Dehradun or Mussoorie?',
      a: 'Dehradun offers more inventory and highway access. Mussoorie pickups work if you are staying on the ridge without descending daily — compare live rates for both on OnnRide.',
    },
    {
      q: 'How long is the Dehradun to Mussoorie ride?',
      a: 'Roughly 35 km via the main hill road — 1.5–2 hours with traffic and photo stops. Steeper sections demand cautious gearing.',
    },
    {
      q: 'Can I ride to Rishikesh from Dehradun on a rental?',
      a: 'Many vendors allow outstation use on the Doon Valley corridor. Declare your route in booking chat after payment.',
    },
    {
      q: 'Is Mussoorie mall road open to bikes?',
      a: 'Regulations change seasonally — follow local signage. Park in designated zones and walk congested mall stretches when required.',
    },
    {
      q: 'What bike for Dhanaulti day trips?',
      a: 'Geared 150 cc+ bikes handle Dhanaulti\'s quieter ridge roads comfortably. Scooters work solo in dry season.',
    },
  ]),
  content: blocks(
    p(
      'Dehradun and Mussoorie are classic Doon Valley escapes — pine ridges, colonial walks, and quick drops to Rishikesh when spirituality calls. Two wheels beat shared cabs on these loops. Compare pickups at /bike-rental/dehradun for valley base convenience or /bike-rental/mussoorie if you are staying on the hill throughout.',
    ),
    h2('Dehradun vs Mussoorie pickup'),
    p(
      'Dehradun vendors cluster near Rajpur Road, ISBT, and Clement Town — easy highway access toward Mussoorie, Rishikesh, and Haridwar. Mussoorie handovers save daily climb time if your hotel is on the ridge, but inventory is thinner and parking tighter.',
    ),
    h2('Popular routes'),
    list([
      'Dehradun to Mussoorie via Library Bazaar climb.',
      'Mussoorie to Kempty Falls — morning ride before crowds.',
      'Dehradun to Robber\'s Cave and Sahastradhara — city day loop.',
      'Dehradun to Rishikesh — valley highway half-day.',
      'Mussoorie to Dhanaulti — quieter ridge extension.',
    ]),
    h2('Bike choice for hill roads'),
    p(
      'Scooters suffice for solo Dehradun city errands. Mussoorie climbs with pillion luggage favour 150 cc commuters or Royal Enfields. Compare live rates across categories on OnnRide before booking.',
    ),
    tips([
      'Climb Mussoorie in low gear — overheating scooters on long gradients is common.',
      'Carry light rain gear — sudden valley showers year-round.',
      'Fuel in Dehradun before hill climbs — pumps sparse on ridge.',
      'Avoid Mussoorie mall road at sunset — pedestrian and vendor congestion peaks.',
    ]),
    h2('Booking on OnnRide'),
    p(
      'Select Dehradun or Mussoorie, choose dates, compare transparent rates and deposit, pay online, and complete KYC before pickup. Use booking chat for exact handover pin and outstation approvals.',
    ),
    mistakes([
      'Scooter + heavy pillion on Mussoorie climb — stalls and heat damage risk.',
      'Riding Mussoorie curves at night without experience — unlit edges.',
      'Ignoring monsoon landslide advisories on hill roads.',
      'Returning late without extension request.',
    ]),
    h2('Seasonal notes'),
    p(
      'March–June and September–November offer the clearest riding. Summer weekends crowd Mussoorie — book rentals early. Monsoon is scenic but higher risk for new hill riders.',
    ),
  ),
});
