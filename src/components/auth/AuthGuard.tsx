'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { useAppSelector } from '@/store/hooks';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

function buildLoginUrl(returnPath: string): string {
  return `/login?redirect=${encodeURIComponent(returnPath)}`;
}

export function AuthGuard({ children, redirectTo }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const returnPath = redirectTo ?? pathname;
  const loginUrl = buildLoginUrl(returnPath);
  const { accessToken, isHydrated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isHydrated && !accessToken) {
      router.replace(loginUrl);
    }
  }, [accessToken, isHydrated, loginUrl, router]);

  if (!isHydrated) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-slate-500">Loading…</p>
      </div>
    );
  }

  if (!accessToken) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="font-display text-xl font-bold text-surface-900">Login required</h1>
        <p className="mt-2 text-sm text-slate-600">
          Sign in with WhatsApp OTP to view this page.
        </p>
        <Link href={loginUrl} className="mt-6 inline-block">
          <Button>Continue to login</Button>
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
