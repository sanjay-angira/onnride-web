import type { Metadata } from 'next';
import { Gift, Percent, Sparkles, Tag, Wallet } from 'lucide-react';
import { MarketingPageShell } from '@/components/layout/MarketingPageShell';
import { PageBottomCta } from '@/components/marketing/PageBottomCta';
import { OFFERS } from '@/lib/site-content';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Offers & Coupons',
  description: 'Active offers, coupons and wallet deals on OnnRide bike rentals.',
  path: '/offers',
});

export default function OffersPage() {
  return (
    <MarketingPageShell
      eyebrow="Save more"
      title="Offers & deals"
      subtitle="Apply coupon codes or wallet balance at checkout — transparent savings on every trip."
      breadcrumb={[{ label: 'Offers' }]}
    >
      <div className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-brand-200 bg-brand-50 px-5 py-4 text-sm text-brand-900">
        <Sparkles className="h-5 w-5 text-brand-600" aria-hidden />
        <span>
          Use code <strong className="font-mono">ONNRIDE50</strong> on eligible bookings at checkout.
        </span>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {OFFERS.map((offer, index) => (
          <article
            key={offer.title}
            className="group overflow-hidden rounded-3xl border border-surface-200 bg-white shadow-card transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover"
          >
            <div className="bg-gradient-to-br from-brand-500 to-brand-700 px-6 py-5 text-white">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                  {offer.badge}
                </span>
                <Gift className="h-5 w-5 text-brand-200" aria-hidden />
              </div>
              <h2 className="mt-4 font-display text-xl font-bold">{offer.title}</h2>
            </div>
            <div className="p-6">
              <p className="text-sm leading-relaxed text-slate-600">{offer.detail}</p>
              {'code' in offer && offer.code ? (
                <div className="mt-5 flex items-center justify-between rounded-xl border border-dashed border-brand-300 bg-brand-50 px-4 py-3">
                  <span className="inline-flex items-center gap-2 font-mono text-sm font-bold text-brand-800">
                    <Tag className="h-4 w-4" aria-hidden />
                    {offer.code}
                  </span>
                  <span className="text-xs font-semibold uppercase text-brand-600">At checkout</span>
                </div>
              ) : (
                <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                  <Wallet className="h-4 w-4" aria-hidden />
                  Available at checkout
                </p>
              )}
              {index === 0 ? (
                <p className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                  <Percent className="h-3.5 w-3.5" aria-hidden />
                  Most popular this week
                </p>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <PageBottomCta
        title="Found an offer you like?"
        description="Pick your city, choose dates and apply your coupon before Razorpay checkout."
        primaryHref="/search"
        primaryLabel="Book with offers"
        secondaryHref="/wallet"
        secondaryLabel="Check wallet"
      />
    </MarketingPageShell>
  );
}
