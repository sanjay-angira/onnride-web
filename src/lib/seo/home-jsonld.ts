import { FAQ_ITEMS } from '@/lib/site-content';
import { HOME_FAQ, HOME_GEO } from '@/constants/homepage';
import { CORE_BIKE_RENTAL_KEYWORDS } from '@/lib/seo/primary-keywords';
import { SITE_ALTERNATE_NAMES } from '@/lib/seo/metadata';
import { absoluteUrl } from '@/lib/seo/site-url';
import { CONTACT } from '@/lib/site-content';

export function buildHomeJsonLd() {
  const siteUrl = absoluteUrl('');
  const faqItems = [...HOME_FAQ, ...FAQ_ITEMS.slice(0, 4)];

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${siteUrl}#localbusiness`,
      name: 'OnnRide',
      alternateName: [...SITE_ALTERNATE_NAMES],
      url: siteUrl,
      description: HOME_GEO.businessDescription,
      areaServed: {
        '@type': 'Country',
        name: 'India',
      },
      serviceType: 'Self-Drive Bike Rental Service',
      telephone: CONTACT.phone,
      email: CONTACT.email,
      priceRange: '₹₹',
      knowsAbout: [...CORE_BIKE_RENTAL_KEYWORDS],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${siteUrl}#service`,
      name: 'Self-Drive Bike Rental Service',
      provider: { '@id': `${siteUrl}#organization` },
      description: HOME_GEO.businessDescription,
      areaServed: HOME_GEO.serviceAreas,
      serviceType: 'Bike Rental',
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'INR',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteUrl,
        },
      ],
    },
  ];
}
