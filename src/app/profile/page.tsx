'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  ChevronRight,
  CreditCard,
  FileCheck,
  User,
  Wallet,
} from 'lucide-react';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { ProfilePageShell } from '@/components/layout/ProfilePageShell';
import { Button } from '@/components/ui/Button';
import { getKycStatus, getProfile, updateProfile } from '@/lib/api';
import { cn } from '@/lib/utils';
import type { KycStatus, User as UserType } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateUser } from '@/store/authSlice';

const NAV_LINKS = [
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/profile/kyc', label: 'KYC documents', icon: FileCheck },
  { href: '/bookings', label: 'My bookings', icon: BookOpen },
  { href: '/wallet', label: 'Wallet', icon: Wallet },
];

function kycBadgeClass(status: string) {
  switch (status) {
    case 'APPROVED':
      return 'bg-emerald-100 text-emerald-800';
    case 'REJECTED':
      return 'bg-red-100 text-red-800';
    case 'PENDING':
    case 'UNDER_REVIEW':
      return 'bg-amber-100 text-amber-800';
    default:
      return 'bg-surface-100 text-surface-700';
  }
}

function ProfileContent() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);
  const [user, setUser] = useState<UserType | null>(null);
  const [kyc, setKyc] = useState<KycStatus | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!accessToken) return;
    void Promise.all([getProfile(accessToken), getKycStatus(accessToken)]).then(
      ([profile, kycStatus]) => {
        if (profile) {
          setUser(profile);
          setName(profile.name ?? '');
          setEmail(profile.email ?? '');
        }
        setKyc(kycStatus);
      },
    );
  }, [accessToken]);

  async function handleSave() {
    if (!accessToken) return;
    setSaving(true);
    setMessage('');
    try {
      const updated = await updateProfile(accessToken, { name, email });
      setUser(updated);
      dispatch(updateUser(updated));
      setMessage('Profile updated successfully.');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setSaving(false);
    }
  }

  const kycStatus = kyc?.status ?? 'NOT_STARTED';

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <aside className="lg:col-span-4">
        <div className="overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-sm">
          <div className="border-b border-surface-100 bg-gradient-to-r from-brand-50/80 to-white px-5 py-4">
            <p className="font-display text-lg font-bold text-surface-900">
              {user?.name?.trim() || user?.phone || 'Your account'}
            </p>
            <p className="mt-0.5 text-sm text-slate-500">
              {user?.email?.trim() || user?.phone}
            </p>
          </div>

          <nav className="space-y-1 p-2">
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== '/profile' && pathname.startsWith(`${link.href}/`)) ||
                (link.href === '/profile' && pathname === '/profile');

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                    active
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                      : 'text-slate-600 hover:bg-brand-50 hover:text-brand-700',
                  )}
                >
                  <link.icon className="h-4 w-4" aria-hidden />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-4 rounded-2xl border border-brand-100 bg-brand-50/60 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-700">
            Login number
          </p>
          <p className="mt-1 font-display text-lg font-bold text-surface-900">{user?.phone}</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-600">
            WhatsApp OTP · primary account identity
          </p>
        </div>
      </aside>

      <div className="space-y-6 lg:col-span-8">
        <section className="overflow-hidden rounded-3xl border border-surface-200 bg-white shadow-card">
          <div className="border-b border-surface-100 bg-gradient-to-r from-brand-50 to-white px-6 py-5 sm:px-8">
            <h2 className="font-display text-xl font-bold text-surface-900">Personal details</h2>
            <p className="mt-1 text-sm text-slate-500">Update your name and optional email.</p>
          </div>
          <div className="space-y-5 p-6 sm:p-8">
            <div>
              <label htmlFor="profile-name" className="mb-1.5 block text-sm font-medium text-surface-900">
                Full name
              </label>
              <input
                id="profile-name"
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="profile-email" className="mb-1.5 block text-sm font-medium text-surface-900">
                Email (optional)
              </label>
              <input
                id="profile-email"
                type="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            {message ? (
              <p
                className={cn(
                  'rounded-xl px-4 py-3 text-sm',
                  message.includes('success')
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'bg-red-50 text-red-700',
                )}
              >
                {message}
              </p>
            ) : null}
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save profile'}
            </Button>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-surface-200 bg-white shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-surface-100 px-6 py-5 sm:px-8">
            <div>
              <h2 className="font-display text-xl font-bold text-surface-900">KYC verification</h2>
              <p className="mt-1 text-sm text-slate-500">Required before pickup, not before payment.</p>
            </div>
            <span
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide',
                kycBadgeClass(kycStatus),
              )}
            >
              {kycStatus === 'APPROVED' ? <BadgeCheck className="h-3.5 w-3.5" aria-hidden /> : null}
              {kycStatus.replace(/_/g, ' ')}
            </span>
          </div>
          <div className="p-6 sm:p-8">
            <ul className="grid gap-3 sm:grid-cols-3">
              {['Aadhaar', 'Driving license', 'Selfie'].map((doc) => (
                <li
                  key={doc}
                  className="rounded-xl border border-surface-200 bg-surface-50 px-4 py-3 text-sm font-medium text-surface-800"
                >
                  {doc}
                </li>
              ))}
            </ul>
            <Link
              href="/profile/kyc"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-600"
            >
              {kycStatus === 'APPROVED' ? 'View KYC' : 'Complete KYC'}
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </section>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/bookings"
            className="group rounded-2xl border border-surface-200 bg-white p-5 shadow-card transition hover:border-brand-200"
          >
            <BookOpen className="h-6 w-6 text-brand-500" aria-hidden />
            <p className="mt-3 font-semibold text-surface-900">My bookings</p>
            <p className="mt-1 text-sm text-slate-500">Track trips and payments</p>
            <ArrowRight className="mt-3 h-4 w-4 text-brand-500 transition group-hover:translate-x-1" aria-hidden />
          </Link>
          <Link
            href="/wallet"
            className="group rounded-2xl border border-surface-200 bg-white p-5 shadow-card transition hover:border-brand-200"
          >
            <CreditCard className="h-6 w-6 text-brand-500" aria-hidden />
            <p className="mt-3 font-semibold text-surface-900">Wallet & offers</p>
            <p className="mt-1 text-sm text-slate-500">Apply balance at checkout</p>
            <ArrowRight className="mt-3 h-4 w-4 text-brand-500 transition group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProfilePageShell
      title="My profile"
      subtitle="Manage your account, KYC and booking preferences."
      breadcrumb={[{ label: 'Profile' }]}
    >
      <AuthGuard>
        <ProfileContent />
      </AuthGuard>
    </ProfilePageShell>
  );
}
