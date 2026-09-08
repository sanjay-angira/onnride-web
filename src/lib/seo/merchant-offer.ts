import { absoluteUrl } from '@/lib/seo/site-url';

/** Shared Offer fields for Google Merchant listings on rental inventory pages. */
export function buildMerchantOfferExtras() {
  const priceValidUntil = new Date();
  priceValidUntil.setDate(priceValidUntil.getDate() + 90);

  return {
    priceValidUntil: priceValidUntil.toISOString().slice(0, 10),
    itemCondition: 'https://schema.org/UsedCondition',
    hasMerchantReturnPolicy: {
      '@type': 'MerchantReturnPolicy',
      applicableCountry: 'IN',
      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
      merchantReturnDays: 1,
      merchantReturnLink: absoluteUrl('/cancellation-policy'),
      returnFees: 'https://schema.org/FreeReturn',
      returnMethod: 'https://schema.org/ReturnInStore',
    },
    shippingDetails: {
      '@type': 'OfferShippingDetails',
      shippingRate: {
        '@type': 'MonetaryAmount',
        value: '0',
        currency: 'INR',
      },
      shippingDestination: {
        '@type': 'DefinedRegion',
        addressCountry: 'IN',
      },
      deliveryTime: {
        '@type': 'ShippingDeliveryTime',
        handlingTime: {
          '@type': 'QuantitativeValue',
          minValue: 0,
          maxValue: 1,
          unitCode: 'DAY',
        },
        transitTime: {
          '@type': 'QuantitativeValue',
          minValue: 0,
          maxValue: 0,
          unitCode: 'DAY',
        },
      },
    },
  };
}
