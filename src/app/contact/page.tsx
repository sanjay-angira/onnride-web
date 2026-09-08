import type { Metadata } from 'next';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { JsonLdScript } from '@/components/seo/JsonLdScript';
import { MarketingPageShell } from '@/components/layout/MarketingPageShell';
import { getPublicSettingsMap } from '@/lib/public-settings';
import { buildContactLocalBusinessJsonLd } from '@/lib/seo/contact-jsonld';
import { pageMetadata } from '@/lib/seo/metadata';
import { CONTACT } from '@/lib/site-content';

export const metadata: Metadata = pageMetadata({
  title: 'Contact Us',
  description:
    'Contact OnnRide support for booking help, vendor partnerships and feedback — phone, email and WhatsApp.',
  path: '/contact',
});

export default async function ContactPage() {
  const settings = await getPublicSettingsMap();
  const phone = settings.platform_phone ?? CONTACT.phone;
  const email = settings.platform_email ?? CONTACT.email;
  const whatsapp = settings.platform_whatsapp ?? CONTACT.whatsapp;

  return (
    <>
      <JsonLdScript data={buildContactLocalBusinessJsonLd({ phone, email })} />
      <MarketingPageShell
        title="Contact us"
        subtitle="Booking help, vendor partnerships or feedback — we're here to help."
        breadcrumb={[{ label: 'Contact' }]}
      >
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-card">
            <Phone className="h-8 w-8 text-brand-500" aria-hidden />
            <h2 className="mt-4 font-display font-bold text-surface-900">Phone</h2>
            <p className="mt-2 text-slate-600">{phone}</p>
            <p className="mt-1 text-xs text-slate-400">9 AM – 9 PM IST</p>
          </div>
          <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-card">
            <Mail className="h-8 w-8 text-brand-500" aria-hidden />
            <h2 className="mt-4 font-display font-bold text-surface-900">Email</h2>
            <p className="mt-2 text-slate-600">{email}</p>
          </div>
          <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-card">
            <MessageCircle className="h-8 w-8 text-brand-500" aria-hidden />
            <h2 className="mt-4 font-display font-bold text-surface-900">WhatsApp</h2>
            <p className="mt-2 text-slate-600">{whatsapp}</p>
            <p className="mt-1 text-xs text-slate-400">OTP &amp; trip updates</p>
          </div>
        </div>
      </MarketingPageShell>
    </>
  );
}
