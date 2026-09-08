import Link from 'next/link';
import { Bike, Facebook, Instagram, Mail, Phone } from 'lucide-react';
import { ComingSoonApps } from '@/components/marketing/ComingSoonApps';
import { getLocations } from '@/lib/api';
import { POPULAR_CITY_REGIONS } from '@/lib/popular-cities';
import { getPublicSettingsMap } from '@/lib/public-settings';
import { CONTACT } from '@/lib/site-content';
import {
  FOOTER_ACCOUNT,
  FOOTER_COMPANY,
  FOOTER_LEGAL,
  FOOTER_SUPPORT,
} from '@/lib/navigation';

export async function Footer() {
  const [locations, settings] = await Promise.all([getLocations(), getPublicSettingsMap()]);
  const phone = settings.platform_phone ?? CONTACT.phone;
  const email = settings.platform_email ?? CONTACT.email;
  const bySlug = new Map(locations.map((location) => [location.slug, location]));

  const regions = POPULAR_CITY_REGIONS.map((region) => ({
    ...region,
    cities: region.slugs
      .map((slug) => bySlug.get(slug))
      .filter((city): city is NonNullable<typeof city> => Boolean(city))
      .slice(0, 6),
  })).filter((region) => region.cities.length > 0);

  return (
    <footer className="relative border-t border-white/10 bg-surface-950 text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.08),transparent_55%)]"
        aria-hidden
      />

      <div className="section-container relative py-12 pb-32 md:py-16 md:pb-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 shadow-lg shadow-brand-500/25">
                <Bike className="h-5 w-5 text-white" aria-hidden />
              </span>
              <span className="text-xl font-bold text-white">
                Onn<span className="text-brand-400">Ride</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              Self-drive bike rental across India — verified vendors, transparent pricing, and
              instant online booking on the OnnRide marketplace.
            </p>
            <div className="mt-6 space-y-2.5 text-sm">
              <p className="flex items-center gap-2.5 text-slate-300">
                <Phone className="h-4 w-4 shrink-0 text-brand-400" aria-hidden />
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-white">
                  {phone}
                </a>
              </p>
              <p className="flex items-center gap-2.5 text-slate-300">
                <Mail className="h-4 w-4 shrink-0 text-brand-400" aria-hidden />
                <a href={`mailto:${email}`} className="hover:text-white">
                  {email}
                </a>
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3 md:hidden">
              <span className="text-sm text-slate-400">Follow us</span>
              <div className="flex items-center gap-2">
                <a
                  href={CONTACT.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="OnnRide on Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#dd2a7b] hover:text-white"
                >
                  <Instagram className="h-5 w-5" aria-hidden />
                </a>
                <a
                  href={CONTACT.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="OnnRide on Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#1877F2] hover:text-white"
                >
                  <Facebook className="h-5 w-5" aria-hidden />
                </a>
              </div>
            </div>

            <div className="mt-8 md:hidden">
              <ComingSoonApps variant="dark" size="compact" />
            </div>
            <div className="mt-8 hidden md:block">
              <ComingSoonApps variant="dark" />
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-300 sm:text-[16px]">
                Company
              </h3>
              <ul className="mt-4 space-y-2.5">
                {FOOTER_COMPANY.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition hover:text-brand-300 sm:text-[15px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-300 sm:text-[16px]">
                Support
              </h3>
              <ul className="mt-4 space-y-2.5">
                {FOOTER_SUPPORT.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition hover:text-brand-300 sm:text-[15px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-300 sm:text-[16px]">
                Account
              </h3>
              <ul className="mt-4 space-y-2.5">
                {FOOTER_ACCOUNT.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition hover:text-brand-300 sm:text-[15px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-300 sm:text-[16px]">
                Legal
              </h3>
              <ul className="mt-4 space-y-2.5">
                {FOOTER_LEGAL.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition hover:text-brand-300 sm:text-[15px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-300 sm:text-[16px]">
                Cities
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-1">
                {regions.slice(0, 2).map((region) => (
                  <div key={region.region}>
                    <p className="text-sm font-bold uppercase tracking-[0.12em] text-slate-500 sm:text-[15px]">
                      {region.region}
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {region.cities.map((city) => (
                        <li key={city.id}>
                          <Link
                            href={`/bike-rental/${city.slug}`}
                            className="text-sm text-slate-400 transition hover:text-brand-300 sm:text-[15px]"
                          >
                            {city.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-[13px] text-slate-500 sm:text-left sm:text-[14px]">
            © {new Date().getFullYear()} OnnRide. Self-drive bike rental marketplace.
          </p>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[13px] text-slate-500 sm:justify-end sm:gap-x-4 sm:text-[14px]">
            <span>Helmet included</span>
            <span aria-hidden>·</span>
            <span>Verified vendors</span>
            <span aria-hidden>·</span>
            <span>Secure payments</span>
            <span aria-hidden>·</span>
            <Link href="/llms.txt" className="hover:text-brand-300">
              AI site guide
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
