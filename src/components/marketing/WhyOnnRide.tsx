import { BadgeIndianRupee, Headphones, Shield, Users } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Verified vendors',
    body: 'Every fleet partner is KYC-verified with RC-checked vehicles before going live.',
  },
  {
    icon: BadgeIndianRupee,
    title: 'Transparent pricing',
    body: 'Daily rate, deposit, taxes and discounts shown upfront — no hidden charges at pickup.',
  },
  {
    icon: Users,
    title: '80+ cities',
    body: 'Launching city by city across India. Goa, Delhi, Bengaluru and more active now.',
  },
  {
    icon: Headphones,
    title: 'Trip support',
    body: 'In-app chat with your vendor for pickup coordination, delays and returns.',
  },
];

export function WhyOnnRide() {
  return (
    <section className="bg-surface-900 py-16 text-white sm:py-20">
      <div className="section-container">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-400">
            Why OnnRide
          </p>
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Built for riders who want freedom, not friction
          </h2>
          <p className="mt-3 text-slate-400">
            A marketplace designed for self-drive — not taxi rides. You pick the bike, you pick
            the route.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/20 text-brand-400">
                <feature.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
