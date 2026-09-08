import type { Metadata } from 'next';
import { LoginPage } from '@/features/auth/LoginPage.client';

export const metadata: Metadata = {
  title: 'Login',
  robots: { index: false, follow: false },
};

interface LoginRouteProps {
  searchParams: Promise<{ redirect?: string }>;
}

function safeRedirect(value: string | undefined): string {
  if (!value || !value.startsWith('/') || value.startsWith('//')) {
    return '/bookings';
  }
  return value;
}

export default async function LoginRoute({ searchParams }: LoginRouteProps) {
  const { redirect: redirectParam } = await searchParams;
  const redirectTo = safeRedirect(redirectParam);

  return <LoginPage redirectTo={redirectTo} />;
}
