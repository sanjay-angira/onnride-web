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
  slug: 'bike-rental-rishikesh',
  title: 'Bike rental in Rishikesh: Ganga trails & gateway rides',
  excerpt:
    'Rent a scooter or bike in Rishikesh for Ganga ghats, waterfall day trips, and Rajaji access — booking tips and OnnRide vendor guide.',
  category: 'City guides',
  cluster: 'routes',
  priority: 'B',
  publishedAt: '2026-04-23',
  dateModified: '2026-06-01',
  gradient: 'from-orange-500 to-amber-700',
  tags: ['Rishikesh', 'Uttarakhand', 'Ganga', 'Weekend trip'],
  relatedCitySlugs: ['rishikesh'],
  relatedBlogSlugs: [
    'bike-rental-dehradun-mussoorie',
    'weekend-hill-station-road-trip-checklist',
    'bike-rental-documents-india',
  ],
  quickAnswer:
    'Rishikesh is best on a rented scooter or light commuter — ghats, cafés, and Neer Garh waterfall runs are short and traffic-heavy. Book verified vendors at /bike-rental/rishikesh on OnnRide, compare live rates, and confirm whether your route includes Neelkanth or Mussoorie outstation legs.',
  keyTakeaways: [
    'Scooters dominate Rishikesh rentals for ghat-road agility and easy parking.',
    'Neelkanth Mahadev and Kunjapuri rides need geared bikes for steeper climbs.',
    'Peak season (rafting months) books out — reserve early online.',
    'Helmet and KYC are mandatory before vendor handover on OnnRide.',
    'Avoid night rides on Laxman Jhula–Tapovan lanes — pedestrians and cows fill the road.',
  ],
  faqs: faqs([
    ...rentalFaqs('Rishikesh'),
    {
      q: 'Can I ride from Rishikesh to Mussoorie on a rental bike?',
      a: 'Some vendors allow outstation use toward Dehradun and Mussoorie. Declare your route in booking chat after payment — overnight parking outside the rental zone may need approval.',
    },
    {
      q: 'Is a Royal Enfield necessary in Rishikesh?',
      a: 'No — town loops and waterfall day trips work well on scooters. Choose a 350 cc only if you are continuing toward Himalayan highways or multi-day tours.',
    },
    {
      q: 'Where do vendors hand over bikes in Rishikesh?',
      a: 'Common pickup points include Tapovan, Laxman Jhula area, and near the bus stand. Confirm exact location and timing via booking chat after your OnnRide confirmation.',
    },
    {
      q: 'Are rental bikes allowed inside Rajaji Tiger Reserve roads?',
      a: 'Public roads through buffer zones are open, but off-trail riding is prohibited. Stick to marked routes and respect forest checkpoints.',
    },
  ]),
  content: blocks(
    p(
      'Rishikesh runs on two wheels — yoga travellers, rafters, and weekenders all rent scooters to move between ghats, ashrams, and riverside cafés without fighting taxi queues. Start at /bike-rental/rishikesh on OnnRide to compare live rates from verified vendors, pick your dates, and complete KYC before pickup day.',
    ),
    h2('Best bikes for Rishikesh'),
    list([
      'Scooters — Tapovan café hops, Ganga arti runs, local market errands.',
      '125–150 cc commuters — Neer Garh waterfall, Shivpuri rafting belt.',
      'Royal Enfield — multi-day plans toward Devprayag or upper Garhwal.',
    ]),
    h2('Popular rides from Rishikesh'),
    h3('Town and riverside loops'),
    p(
      'Laxman Jhula, Ram Jhula, and the Tapovan café strip are walkable but faster by scooter when you are shuttling between stays and activity points. Parking near the jhulas is limited — arrive early for morning arti.',
    ),
    h3('Neelkanth and waterfall day trips'),
    p(
      'Neelkanth Mahadev temple road climbs through forest — geared bikes handle the gradient better than loaded scooters. Neer Garh waterfall is a shorter outing suitable for light commuters.',
    ),
    h2('Booking on OnnRide'),
    p(
      'Select Rishikesh as your location, choose pickup and return slots, and compare transparent daily rates plus security deposit. Pay online, upload KYC, and coordinate handover details with your vendor through booking chat.',
    ),
    tips([
      'Carry a rain jacket during monsoon — sudden valley showers are common.',
      'Lock your helmet when parking at busy ghats.',
      'Use engine braking on downhill ghat roads — wet patches are slippery.',
      'Top up fuel before Neelkanth climbs — pumps are sparse on the temple road.',
    ]),
    mistakes([
      'Riding without checking outstation permission for Mussoorie or Haridwar loops.',
      'Parking in no-parking zones near Laxman Jhula — fines and towing are frequent.',
      'Booking during peak rafting weekends without early reservation.',
    ]),
    h2('Seasonal notes'),
    p(
      'October through March offers the clearest riding weather. Summer is hot at lower elevation but still busy. Monsoon brings lush scenery and landslide risk on cliff roads — inexperienced riders should stick to town loops.',
    ),
  ),
});
