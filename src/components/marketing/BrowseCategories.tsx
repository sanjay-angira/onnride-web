import { Bike, Gauge, ShieldCheck, Zap } from 'lucide-react';

const categories = [
  {
    name: 'Scooters',
    slug: 'scooter',
    description: 'Easy city rides, great mileage',
    gradient: 'from-sky-400 to-blue-600',
    icon: Zap,
  },
  {
    name: 'Commuter',
    slug: 'commuter',
    description: 'Daily rides & office commutes',
    gradient: 'from-emerald-400 to-teal-600',
    icon: Gauge,
  },
  {
    name: 'Cruiser',
    slug: 'cruiser',
    description: 'Relaxed long-distance touring',
    gradient: 'from-amber-500 to-orange-700',
    icon: Bike,
  },
  {
    name: 'Adventure',
    slug: 'adventure',
    description: 'Mountains & off-road trails',
    gradient: 'from-stone-500 to-slate-800',
    icon: ShieldCheck,
  },
  {
    name: 'Sports',
    slug: 'sports',
    description: 'Performance & weekend thrills',
    gradient: 'from-red-500 to-rose-600',
    icon: Bike,
  },
];

export function BrowseCategories() {
  return (
    <section className="border-y border-surface-200 bg-white py-16 sm:py-20">
      <div className="section-container">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
          Choose your ride
        </p>
        <h2 className="section-title">Bikes for every kind of trip</h2>
        <p className="section-subtitle">
          From scooters for city hops to cruisers for highway escapes — pick what fits your journey.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              className="group relative overflow-hidden rounded-2xl border border-surface-200 bg-surface-50 p-5 transition-all hover:border-brand-200 hover:shadow-card-hover"
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${cat.gradient} text-white shadow-md`}
              >
                <cat.icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="font-display font-bold text-surface-900">{cat.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
