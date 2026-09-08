import { absoluteUrl } from '@/lib/seo/site-url';

interface ContactLocalBusinessInput {
  phone: string;
  email: string;
}

export function buildContactLocalBusinessJsonLd(input: ContactLocalBusinessInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'OnnRide',
    url: absoluteUrl(''),
    telephone: input.phone,
    email: input.email,
    description: 'Self-drive bike and scooter rental marketplace in India.',
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
  };
}
