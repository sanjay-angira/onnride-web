import { COMPANY } from '@/lib/company';
import { CORE_BIKE_RENTAL_KEYWORDS } from '@/lib/seo/primary-keywords';
import { SITE_ALTERNATE_NAMES, SITE_NAME } from '@/lib/seo/metadata';
import { absoluteUrl } from '@/lib/seo/site-url';
import { CONTACT } from '@/lib/site-content';

export function buildOrganizationGraph() {
  const siteUrl = absoluteUrl('');
  const orgId = `${siteUrl}#organization`;
  const websiteId = `${siteUrl}#website`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': orgId,
      name: SITE_NAME,
      legalName: COMPANY.legalName,
      alternateName: [...new Set([...SITE_ALTERNATE_NAMES, ...COMPANY.alternateNames])],
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/icon.svg'),
      },
      image: absoluteUrl('/opengraph-image'),
      description: COMPANY.description,
      foundingDate: COMPANY.foundingDate,
      areaServed: { '@type': 'Country', name: 'India' },
      knowsAbout: [...CORE_BIKE_RENTAL_KEYWORDS, ...COMPANY.industry],
      sameAs: [...COMPANY.sameAs],
      address: {
        '@type': 'PostalAddress',
        addressLocality: COMPANY.headquarters.addressLocality,
        addressRegion: COMPANY.headquarters.addressRegion,
        addressCountry: COMPANY.headquarters.addressCountry,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: CONTACT.phone,
        email: CONTACT.email,
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi'],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': websiteId,
      name: SITE_NAME,
      alternateName: [...SITE_ALTERNATE_NAMES, 'onnride.com'],
      url: siteUrl,
      publisher: { '@id': orgId },
      inLanguage: 'en-IN',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${absoluteUrl('/search')}?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ];
}

export function buildAboutPageJsonLd() {
  const siteUrl = absoluteUrl('');
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${absoluteUrl('/about')}#webpage`,
    name: 'About OnnRide',
    url: absoluteUrl('/about'),
    description: COMPANY.description,
    isPartOf: { '@id': `${siteUrl}#website` },
    about: { '@id': `${siteUrl}#organization` },
    inLanguage: 'en-IN',
  };
}
