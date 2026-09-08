/** Category-based visuals for vehicle cards (no hardcoded prices). */
export function getVehicleVisual(categorySlug?: string | null) {
  const map: Record<
    string,
    { gradient: string; label: string; accent: string }
  > = {
    scooter: {
      gradient: 'from-sky-400 via-cyan-500 to-blue-600',
      label: 'Scooter',
      accent: 'bg-sky-100 text-sky-800',
    },
    commuter: {
      gradient: 'from-emerald-400 via-teal-500 to-green-600',
      label: 'Commuter',
      accent: 'bg-emerald-100 text-emerald-800',
    },
    cruiser: {
      gradient: 'from-amber-500 via-orange-600 to-amber-800',
      label: 'Cruiser',
      accent: 'bg-amber-100 text-amber-900',
    },
    adventure: {
      gradient: 'from-stone-500 via-slate-600 to-zinc-800',
      label: 'Adventure',
      accent: 'bg-stone-200 text-stone-800',
    },
    sports: {
      gradient: 'from-red-500 via-orange-500 to-rose-600',
      label: 'Sports',
      accent: 'bg-red-100 text-red-800',
    },
    superbike: {
      gradient: 'from-violet-500 via-purple-600 to-indigo-800',
      label: 'Superbike',
      accent: 'bg-violet-100 text-violet-800',
    },
    electric: {
      gradient: 'from-lime-400 via-green-500 to-emerald-700',
      label: 'Electric',
      accent: 'bg-lime-100 text-lime-900',
    },
    hatchback: {
      gradient: 'from-blue-400 via-indigo-500 to-violet-700',
      label: 'Hatchback',
      accent: 'bg-blue-100 text-blue-900',
    },
    sedan: {
      gradient: 'from-slate-500 via-zinc-600 to-neutral-800',
      label: 'Sedan',
      accent: 'bg-slate-200 text-slate-800',
    },
    suv: {
      gradient: 'from-amber-500 via-orange-600 to-red-800',
      label: 'SUV',
      accent: 'bg-amber-100 text-amber-900',
    },
    muv: {
      gradient: 'from-teal-500 via-cyan-600 to-blue-800',
      label: 'MUV',
      accent: 'bg-teal-100 text-teal-900',
    },
  };

  return (
    map[categorySlug ?? ''] ?? {
      gradient: 'from-slate-500 via-slate-600 to-surface-900',
      label: 'Vehicle',
      accent: 'bg-slate-100 text-slate-800',
    }
  );
}

export function getVehicleTransmission(
  vehicle: {
    vehicleClass?: string | null;
    transmissionType?: string | null;
    category?: { slug?: string | null } | null;
  },
): string {
  if (vehicle.vehicleClass === 'FOUR_WHEELER') {
    if (vehicle.transmissionType === 'AUTOMATIC') return 'Automatic';
    if (vehicle.transmissionType === 'MANUAL') return 'Manual';
    return 'Manual';
  }
  const slug = vehicle.category?.slug;
  if (slug === 'scooter' || slug === 'electric') return 'Gearless';
  return 'Manual';
}

export function formatFuelType(fuelType?: string | null): string {
  if (!fuelType) return 'Petrol';
  return fuelType.charAt(0) + fuelType.slice(1).toLowerCase();
}

export function getDestinationVisual(slug: string) {
  const map: Record<string, { gradient: string; tagline: string }> = {
    goa: {
      gradient: 'from-teal-500 via-cyan-600 to-blue-700',
      tagline: 'Beach rides & coastal roads',
    },
    delhi: {
      gradient: 'from-orange-500 via-amber-600 to-red-700',
      tagline: 'City commutes & weekend trips',
    },
    bengaluru: {
      gradient: 'from-emerald-500 via-green-600 to-teal-800',
      tagline: 'Tech city & hill getaways',
    },
    manali: {
      gradient: 'from-indigo-500 via-blue-600 to-slate-800',
      tagline: 'Mountain adventures',
    },
    jaipur: {
      gradient: 'from-rose-500 via-orange-600 to-amber-700',
      tagline: 'Heritage & desert trails',
    },
  };

  return (
    map[slug] ?? {
      gradient: 'from-brand-500 via-brand-600 to-surface-900',
      tagline: 'Self-drive bike rental',
    }
  );
}
