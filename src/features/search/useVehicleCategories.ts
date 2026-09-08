'use client';

import { useEffect, useState } from 'react';
import { getCategories } from '@/lib/api';
import type { VehicleCategory, VehicleClass } from '@/types';

export function useVehicleCategories(vehicleClass: VehicleClass) {
  const [categories, setCategories] = useState<VehicleCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    void getCategories(vehicleClass, { noCache: true })
      .then((apiList) => {
        if (!cancelled) setCategories(apiList);
      })
      .catch(() => {
        if (!cancelled) setCategories([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [vehicleClass]);

  return { categories, loading, isLive: categories.length > 0 };
}
