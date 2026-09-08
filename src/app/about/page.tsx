import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Heart, MapPin, ShieldCheck, Users } from 'lucide-react';
import { MarketingPageShell } from '@/components/layout/MarketingPageShell';
import { PageBottomCta } from '@/components/marketing/PageBottomCta';
import { JsonLdScript } from '@/components/seo/JsonLdScript';
import { COMPANY } from '@/lib/company';
import { TRUST_FEATURES } from '@/lib/site-content';
import { buildAboutPageJsonLd } from '@/lib/seo/organization';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'About Us',
  description:
    'OnnRide is India’s self-drive bike and scooter rental marketplace — connecting riders with verified local fleet partners.',
  path: '/about',
});


const VALUES = [
  {
    icon: Heart,
    title: 'Customer experience first',
    body: 'Browse without login, book with transparent pricing, and ride with confidence on every trip.',
  },
  {
    icon: Users,
    title: 'Vendor success second',
    body: 'Independent rental shops and fleet owners grow through our vendor portal, payouts and booking tools.',
  },
  {
    icon: ShieldCheck,
    title: 'Platform control always',
    body: 'Verified listings, secure payments, manual KYC review, and admin oversight on every marketplace transaction.',
  },
  {
    icon: MapPin,
    title: 'City-by-city expansion',
    body: 'We launch markets incrementally with local inventory — no hardcoded cities, all managed from admin.',
  },
] as const;

export default function AboutPage() {
  return (
    <MarketingPageShell
      eyebrow="Our story"
      title="About OnnRide"
      subtitle="India’s marketplace for self-drive two-wheeler rentals — built for riders who want freedom, and vendors who want reach."
      breadcrumb={[{ label: 'About us' }]}
    >
      <JsonLdScript data={buildAboutPageJsonLd()} />

      <div className="max-w-3xl">
        <p className="text-lg leading-relaxed text-slate-600">
          {COMPANY.description}
        </p>
      </div>

      <div className="mt-8 max-w-3xl rounded-2xl border border-surface-200 bg-white p-6 shadow-sm">
        <h2 className="font-display text-base font-bold text-surface-900">Company at a glance</h2>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-medium text-slate-500">Brand</dt>
            <dd className="text-surface-900">{COMPANY.brandName} (also known as ONNRIDE)</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Founded</dt>
            <dd className="text-surface-900">{COMPANY.foundingDate}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Headquarters</dt>
            <dd className="text-surface-900">{COMPANY.headquarters.addressLocality}, India</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Primary markets</dt>
            <dd className="text-surface-900">{COMPANY.primaryMarkets.join(' · ')}</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm text-slate-600">
          Trust & policies:{' '}
          <Link href="/reviews" className="font-medium text-brand-600 hover:text-brand-700">
            Reviews
          </Link>
          {' · '}
          <Link href="/rental-policy" className="font-medium text-brand-600 hover:text-brand-700">
            Rental policy
          </Link>
          {' · '}
          <Link href="/insurance-policy" className="font-medium text-brand-600 hover:text-brand-700">
            Insurance
          </Link>
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <item.icon className="h-5 w-5" aria-hidden />
            </div>
            <h2 className="mt-4 font-display text-base font-bold text-surface-900">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <div className="rounded-2xl border border-surface-200 bg-white p-8">
          <div className="flex items-center gap-3">
            <Building2 className="h-6 w-6 text-brand-600" aria-hidden />
            <h2 className="font-display text-xl font-bold text-surface-900">What we do</h2>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Riders search by city and dates, compare verified listings, pay online via Razorpay, and
            coordinate pickup with vendors through per-booking chat. Vendors manage fleet, bookings,
            earnings and documents from a dedicated portal — with admin approval on listings and KYC.
          </p>
        </div>
        <div className="rounded-2xl bg-surface-900 p-8 text-white">
          <h2 className="font-display text-xl font-bold">Our mission</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            Make self-drive mobility accessible without ownership hassle — flexible daily rentals,
            secure payments, refundable deposits, and accountability on every handover and return.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            Business rules live in admin settings, not in code — so pricing, commissions, deposits
            and policies can evolve as we scale city by city.
          </p>
        </div>
      </div>

      <div className="mt-14">
        <h2 className="font-display text-xl font-bold text-surface-900">Why riders choose us</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST_FEATURES.map((feature) => (
            <li
              key={feature.title}
              className="rounded-xl border border-surface-200 bg-surface-50 px-5 py-4"
            >
              <p className="font-semibold text-surface-900">{feature.title}</p>
              <p className="mt-1 text-sm text-slate-600">{feature.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-14 rounded-2xl border border-surface-200 bg-white p-8">
        <h2 className="font-display text-xl font-bold text-surface-900">For fleet partners</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
          Rental shops and fleet owners partner with OnnRide to reach online riders, manage bookings,
          and track payouts. WhatsApp OTP signup, RC-verified listings, and admin-supported onboarding.
        </p>
        <Link
          href="/list-your-bike"
          className="mt-5 inline-flex text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          Partner with us →
        </Link>
      </div>

      <PageBottomCta
        title="Ready to explore?"
        description="Search bikes in your city or join as a fleet partner on the OnnRide marketplace."
        primaryHref="/search"
        primaryLabel="Rent a bike"
        secondaryHref="/list-your-bike"
        secondaryLabel="Partner with us"
      />
    </MarketingPageShell>
  );
}
