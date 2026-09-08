import { makePost, blocks, p, h2, h3, list, tips, mistakes, faqs, rentalFaqs } from '../helpers';
import type { BlogPost } from '../types';

export const post: BlogPost = makePost({
  slug: 'bike-rental-amritsar',
  title: 'Bike rental in Amritsar: Golden Temple loops and Punjab road trips',
  excerpt:
    'Rent a scooter or motorcycle in Amritsar for city darshan, Wagah border runs and Punjab highway trips — book on OnnRide.',
  category: 'City guides',
  cluster: 'punjab',
  priority: 'B',
  publishedAt: '2026-02-19',
  dateModified: '2026-06-01',
  readTimeMinutes: 8,
  gradient: 'from-orange-500 to-red-700',
  tags: ['Amritsar', 'Punjab', 'Golden Temple', 'Wagah'],
  relatedCitySlugs: ['amritsar'],
  relatedBlogSlugs: [
    'punjab-bike-rental-travel-guide',
    'bike-rental-chandigarh-prices-booking',
    'outstation-bike-rental-punjab-hp',
  ],
  quickAnswer:
    'Amritsar bike rentals on OnnRide suit Golden Temple visits, Wagah border trips and Punjab food trails. Compare live rates at /bike-rental/amritsar, complete KYC before pickup, and use scooters for city traffic or motorcycles for highway legs.',
  keyTakeaways: [
    'Scooters excel in Amritsar old city lanes and parking near Harmandir Sahib.',
    'Compare live rates on OnnRide — no fixed Amritsar daily tariff.',
    'Wagah border runs need early starts — confirm outstation rules.',
    'Carry original DL and KYC ID at pickup.',
    'Helmet included; add pillion helmet via vendor chat if needed.',
  ],
  faqs: faqs([
    ...rentalFaqs('Amritsar').slice(0, 2),
    {
      q: 'Can I park near Golden Temple on a rented bike?',
      a: 'Designated parking exists nearby — arrive early for peak festival days. Follow local traffic and security guidance.',
    },
    {
      q: 'Which bike for Wagah border trip?',
      a: '125–150 cc motorcycle or sturdy scooter for the ~30 km one-way run. Start early for ceremony seating.',
    },
    {
      q: 'Is Amritsar rental available year-round?',
      a: 'Yes with seasonal demand spikes during festivals and winter holidays. Compare live rates ahead for Baisakhi and Diwali periods.',
    },
    {
      q: 'Can I ride to Chandigarh on rental?',
      a: 'Possible with outstation approval — confirm return date and charges in OnnRide booking chat.',
    },
    {
      q: 'What about Jallianwala Bagh and old city sightseeing?',
      a: 'Short scooter hops work well — walk final stretches in crowded lanes if needed.',
    },
    {
      q: 'Are Royal Enfields available in Amritsar?',
      a: 'Availability varies by vendor fleet. Filter listings when comparing live rates on OnnRide.',
    },
    {
      q: 'Fuel policy in Amritsar?',
      a: 'Typically not included — vendors hand over enough for nearest pump. Return level per vendor policy.',
    },
    {
      q: 'Best time to pick up rental?',
      a: 'Morning pickups between 9–11 AM beat afternoon heat and help for dawn Golden Temple visits next day.',
    },
  ]),
  content: blocks(
    p(
      'Amritsar rewards slow food walks and quick two-wheeler hops between gurdwaras, markets and the Wagah road. Start at /bike-rental/amritsar on OnnRide to compare live rates and book verified Punjab vendors.',
    ),
    h2('Best bikes for Amritsar'),
    list([
      'Scooters — old city, Lawrence Road, cafe trails.',
      '125–150 cc commuters — Wagah, Tarn Taran day trips.',
      'Royal Enfield — Punjab highway runs toward Chandigarh or Pathankot.',
    ]),
    h2('Popular routes'),
    h3('City and heritage'),
    list([
      'Golden Temple and langar visit loop.',
      'Jallianwala Bagh and Hall Bazaar.',
      'Partition Museum and Ranjit Singh panorama.',
    ]),
    h3('Day trips'),
    list([
      'Wagah border ceremony (early departure).',
      'Tarn Taran Sahib.',
      'Pul Kanjari heritage site.',
    ]),
    h2('Booking tips'),
    p(
      'Compare live rates on OnnRide, pay online, finish KYC early, and confirm pickup near your hotel or railway station via booking chat.',
    ),
    tips([
      'Respect helmet and modest dress norms near religious sites.',
      'Lock bike in designated parking — carry chain if vendor provides.',
      'Carry cash for langar donations and street food — cards not always accepted roadside.',
      'Book ahead for long weekends around national holidays.',
    ]),
    mistakes([
      'Late start for Wagah — roads congest and seats fill.',
      'Riding unfamiliar old city lanes at rush hour without patience.',
      'Skipping outstation chat before Chandigarh highway plan.',
    ]),
    h2('Explore Amritsar on two wheels'),
    p(
      'Compare live rates, pick scooter or motorcycle for your Punjab rhythm, and taste the city without taxi surge pricing.',
    ),
  ),
});
