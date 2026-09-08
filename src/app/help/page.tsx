import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CreditCard,
  FileCheck,
  Headphones,
  Mail,
  MessageCircle,
  Phone,
  Shield,
} from 'lucide-react';
import { MarketingPageShell } from '@/components/layout/MarketingPageShell';
import { FaqAccordion } from '@/components/marketing/FaqAccordion.client';
import { CONTACT, FAQ_ITEMS } from '@/lib/site-content';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Help Center',
  description: 'Get help with bookings, payments, KYC and cancellations on OnnRide.',
  path: '/help',
});

const HELP_TOPICS = [
  {
    title: 'Booking & payment',
    href: '/how-it-works',
    desc: 'Search, checkout, OTP and Razorpay',
    icon: CreditCard,
    color: 'from-brand-500 to-brand-600',
  },
  {
    title: 'KYC & documents',
    href: '/profile/kyc',
    desc: 'Upload DL and Aadhaar before pickup',
    icon: FileCheck,
    color: 'from-orange-500 to-brand-600',
  },
  {
    title: 'Cancellation & refunds',
    href: '/cancellation-policy',
    desc: 'Refund rules and timelines',
    icon: Shield,
    color: 'from-surface-700 to-surface-900',
  },
  {
    title: 'Contact support',
    href: '/contact',
    desc: 'Phone, email and WhatsApp',
    icon: Headphones,
    color: 'from-brand-600 to-brand-800',
  },
];

export default function HelpPage() {
  return (
    <MarketingPageShell
      eyebrow="Support"
      title="Help center"
      subtitle="Find answers about bookings, payments, KYC and more — or reach our team directly."
      breadcrumb={[{ label: 'Help' }]}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {HELP_TOPICS.map((topic) => (
          <Link
            key={topic.href}
            href={topic.href}
            className="group overflow-hidden rounded-3xl border border-surface-200 bg-white shadow-card transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover"
          >
            <div className={`bg-gradient-to-br ${topic.color} px-6 py-5 text-white`}>
              <topic.icon className="h-7 w-7" aria-hidden />
              <h2 className="mt-4 font-display text-xl font-bold">{topic.title}</h2>
            </div>
            <div className="flex items-center justify-between p-5">
              <p className="text-sm text-slate-600">{topic.desc}</p>
              <ArrowRight className="h-5 w-5 text-brand-500 transition group-hover:translate-x-1" aria-hidden />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="font-display text-2xl font-bold text-surface-900">Common questions</h2>
        <p className="mt-2 text-slate-600">Quick answers to what riders ask most often.</p>
        <div className="mt-6">
          <FaqAccordion items={FAQ_ITEMS.slice(0, 6)} variant="brand" />
        </div>
      </div>

      <div className="mt-12 grid gap-6 overflow-hidden rounded-3xl border border-surface-200 bg-white shadow-card lg:grid-cols-2">
        <div className="bg-surface-950 p-8 text-white sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-400">
            Still need help?
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold">Talk to OnnRide support</h2>
          <p className="mt-3 text-slate-400">
            Our team helps with bookings, payments, KYC and trip issues.
          </p>
          <div className="mt-6 space-y-3 text-sm">
            <p className="flex items-center gap-3 text-slate-300">
              <Mail className="h-4 w-4 text-brand-400" aria-hidden />
              {CONTACT.email}
            </p>
            <p className="flex items-center gap-3 text-slate-300">
              <Phone className="h-4 w-4 text-brand-400" aria-hidden />
              {CONTACT.phone}
            </p>
            <p className="flex items-center gap-3 text-slate-300">
              <MessageCircle className="h-4 w-4 text-brand-400" aria-hidden />
              WhatsApp support available
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center p-8 sm:p-10">
          <h3 className="font-display text-lg font-bold text-surface-900">Before you reach out</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>• Have your booking number ready</li>
            <li>• KYC must be approved before pickup</li>
            <li>• Refund status is tracked separately from booking status</li>
          </ul>
          <Link
            href="/contact"
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600"
          >
            Contact page
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </MarketingPageShell>
  );
}
