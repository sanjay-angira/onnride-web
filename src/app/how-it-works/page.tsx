import type { Metadata } from 'next';
import {
  CalendarCheck,
  CreditCard,
  FileCheck,
  MapPin,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { MarketingPageShell } from '@/components/layout/MarketingPageShell';
import { PageBottomCta } from '@/components/marketing/PageBottomCta';
import { HOW_IT_WORKS } from '@/lib/site-content';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'How It Works',
  description: 'Learn how to rent a self-drive bike on OnnRide in 4 simple steps.',
  path: '/how-it-works',
});

const STEP_ICONS = [MapPin, Search, CreditCard, FileCheck] as const;

const TRUST_POINTS = [
  { icon: ShieldCheck, text: 'Verified vendors & RC-checked bikes' },
  { icon: CreditCard, text: 'Secure Razorpay checkout' },
  { icon: CalendarCheck, text: 'Flexible pickup & return slots (9 AM – 9 PM)' },
];

export default function HowItWorksPage() {
  return (
    <MarketingPageShell
      eyebrow="Simple process"
      title="How self-drive rental works"
      subtitle="From search to saddle — four steps to rent on OnnRide."
      breadcrumb={[{ label: 'How it works' }]}
    >
      <ol className="relative grid gap-8 lg:grid-cols-4">
        <div
          className="absolute left-[12%] right-[12%] top-10 hidden h-0.5 bg-gradient-to-r from-brand-200 via-brand-500 to-brand-200 lg:block"
          aria-hidden
        />
        {HOW_IT_WORKS.map((step, index) => {
          const Icon = STEP_ICONS[index] ?? MapPin;
          return (
            <li
              key={step.step}
              className="relative rounded-3xl border border-surface-200 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/30">
                  <Icon className="h-7 w-7" aria-hidden />
                </div>
                <span className="font-display text-3xl font-bold text-brand-100">{step.step}</span>
              </div>
              <h2 className="mt-5 font-display text-xl font-bold text-surface-900">{step.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.body}</p>
            </li>
          );
        })}
      </ol>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {TRUST_POINTS.map((point) => (
          <div
            key={point.text}
            className="flex items-center gap-3 rounded-2xl border border-brand-100 bg-brand-50/80 px-5 py-4"
          >
            <point.icon className="h-5 w-5 shrink-0 text-brand-600" aria-hidden />
            <p className="text-sm font-medium text-brand-900">{point.text}</p>
          </div>
        ))}
      </div>

      <PageBottomCta
        title="Ready to book your ride?"
        description="Browse live fleet across active cities — no login required to search."
        primaryHref="/search"
        primaryLabel="Search bikes"
        secondaryHref="/faq"
        secondaryLabel="Read FAQ"
      />
    </MarketingPageShell>
  );
}
