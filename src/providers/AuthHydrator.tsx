'use client';

import { useEffect } from 'react';
import { hydrateAuth } from '@/store/authSlice';
import { useAppDispatch } from '@/store/hooks';

export function AuthHydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  return <>{children}</>;
}
