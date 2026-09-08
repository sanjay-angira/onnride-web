import { Headphones, MapPin, ShieldCheck, Smartphone, Star, Users } from 'lucide-react';
import { ComingSoonApps } from '@/components/marketing/ComingSoonApps';

export function StatsBar() {
  const stats = [
    { value: '80+', label: 'Cities launching', icon: MapPin },
    { value: '500+', label: 'Bikes & scooters', icon: Users },
    { value: '4.8★', label: 'Rider satisfaction', icon: Star },
    { value: '24/7', label: 'Trip support', icon: Headphones },
  ];

  return (
    <section className="relative z-10 w-full border-y border-brand-400/20 bg-gradient-to-r from-brand-700 via-brand-500 to-brand-600 shadow-xl shadow-brand-600/25">
      <div className="absolute inset-0 bg-brand-mesh opacity-40" />
      <div className="absolute inset-0 bg-road-lines opacity-20" />
      <div className="section-container relative py-10 sm:py-14">
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/20">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-3 text-center lg:px-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/20 backdrop-blur">
                <stat.icon className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <dt className="font-display text-3xl font-bold text-white sm:text-4xl">{stat.value}</dt>
                <dd className="mt-1 text-sm font-medium text-orange-100">{stat.label}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function MidPageCta() {
  return (
    <section className="home-section overflow-hidden bg-surface-950">
      <div className="absolute inset-0 bg-hero-pattern opacity-70" />
      <div className="absolute inset-0 bg-road-lines opacity-25" />
      <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-brand-400 via-brand-500 to-brand-600 sm:w-3" />
      <div className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-brand-500/15 blur-3xl" />

      <div className="section-container relative">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 rounded-3xl border border-white/10 bg-white/5 px-6 py-12 text-center backdrop-blur-sm sm:px-12 sm:py-14 lg:flex-row lg:text-left">
          <div className="flex-1">
            <p className="home-section-label text-brand-400">Ready to ride?</p>
            <h2 className="home-section-title-light mt-3">Your next adventure starts here</h2>
            <p className="home-section-subtitle-light mt-4 lg:max-w-none">
              Browse hundreds of self-drive bikes across India. No login to search — book in minutes.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a
              href="/search"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-600"
            >
              Explore all bikes
            </a>
            <a
              href="/offers"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-transparent px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10"
            >
              View offers
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AppComingSoonTopBanner() {
  return (
    <section className="border-b border-white/10 bg-surface-900">
      <div className="section-container flex flex-col items-center justify-between gap-3 py-3 sm:flex-row sm:py-3.5">
        <p className="text-center text-sm text-slate-300 sm:text-left">
          <Smartphone className="mr-2 inline h-4 w-4 text-brand-400" aria-hidden />
          <span className="font-semibold text-white">Mobile apps coming soon</span>
          <span className="hidden sm:inline"> — </span>
          <span className="block sm:inline">Book on iOS & Android</span>
        </p>
        <ComingSoonApps variant="dark" showHeading={false} size="compact" />
      </div>
    </section>
  );
}
