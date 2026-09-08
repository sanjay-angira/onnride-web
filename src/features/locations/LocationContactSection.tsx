import Link from 'next/link';
import {
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { mailHref, telHref, waHref } from '@/lib/location-seo';

interface LocationContactSectionProps {
  cityName: string;
  state: string | null;
  phone: string;
  email: string;
  whatsapp: string;
}

export function LocationContactSection({
  cityName,
  state,
  phone,
  email,
  whatsapp,
}: LocationContactSectionProps) {
  const waMessage = `Hi OnnRide, I need help with a bike rental in ${cityName}.`;

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-y border-surface-200 bg-gradient-to-br from-surface-900 via-surface-900 to-brand-950 py-14 text-white"
      aria-labelledby="location-contact-heading"
    >
      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-300">
              Local support
            </p>
            <h2
              id="location-contact-heading"
              className="mt-2 font-display text-2xl font-bold sm:text-3xl"
            >
              Contact OnnRide in {cityName}
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/75">
              Questions about pickup, KYC, deposits or your booking? Reach our {cityName}
              {state ? `, ${state}` : ''} support team — we respond fastest on WhatsApp.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-white/60">
              <Clock className="h-4 w-4 shrink-0" aria-hidden />
              Support hours: 8:00 AM – 10:00 PM IST (7 days)
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href={waHref(whatsapp, waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-emerald-400/40 hover:bg-white/10"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                <MessageCircle className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block text-xs font-medium uppercase tracking-wide text-white/50">
                  WhatsApp
                </span>
                <span className="mt-0.5 block font-semibold text-white group-hover:text-emerald-200">
                  Chat with support
                </span>
                <span className="mt-1 block text-sm text-white/65">{whatsapp}</span>
              </span>
            </a>

            <a
              href={telHref(phone)}
              className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-sky-400/40 hover:bg-white/10"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500/20 text-sky-300">
                <Phone className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block text-xs font-medium uppercase tracking-wide text-white/50">
                  Phone
                </span>
                <span className="mt-0.5 block font-semibold text-white group-hover:text-sky-200">
                  Call {cityName} desk
                </span>
                <span className="mt-1 block text-sm text-white/65">{phone}</span>
              </span>
            </a>

            <a
              href={mailHref(email)}
              className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-amber-400/40 hover:bg-white/10 sm:col-span-2"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
                <Mail className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block text-xs font-medium uppercase tracking-wide text-white/50">
                  Email
                </span>
                <span className="mt-0.5 block font-semibold text-white group-hover:text-amber-200">
                  {email}
                </span>
                <span className="mt-1 block text-sm text-white/65">
                  Include your booking number for faster help
                </span>
              </span>
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/55">
          <MapPin className="h-4 w-4 shrink-0 text-brand-400" aria-hidden />
          <span>
            Service area: {cityName}
            {state ? `, ${state}` : ''}, India — pickup at vendor hubs & listed pickup points
          </span>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 font-medium text-brand-300 hover:text-brand-200"
          >
            All contact options
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
