'use client';

import Link from 'next/link';
import { CalendarDays, FileText, LogOut, User, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { User as UserType } from '@/types';

const mobileLinks = [
  { href: '/bookings', label: 'My bookings', icon: CalendarDays },
  { href: '/profile/kyc', label: 'Documents', icon: FileText },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/wallet', label: 'Wallet', icon: Wallet },
] as const;

interface UserAccountMobileCardProps {
  user: UserType;
  isDarkHero?: boolean;
  onNavigate: () => void;
  onLogout: () => void;
}

export function UserAccountMobileCard({
  user,
  isDarkHero = false,
  onNavigate,
  onLogout,
}: UserAccountMobileCardProps) {
  const displayName = user.name?.trim() || user.phone;

  return (
    <div
      className={cn(
        'mb-3 overflow-hidden rounded-2xl border',
        isDarkHero ? 'border-white/10 bg-white/5' : 'border-surface-200 bg-surface-50',
      )}
    >
      <div className={cn('px-4 py-4', isDarkHero ? 'text-white' : 'text-surface-900')}>
        <p className="font-display font-bold">{displayName}</p>
        <p className={cn('mt-0.5 text-sm', isDarkHero ? 'text-slate-400' : 'text-slate-500')}>
          {user.email?.trim() || user.phone}
        </p>
      </div>

      <ul className="border-t border-surface-100/80 p-2">
        {mobileLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium',
                isDarkHero ? 'text-slate-200 hover:bg-white/5' : 'text-slate-700 hover:bg-white',
              )}
            >
              <link.icon className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
              {link.label}
            </Link>
          </li>
        ))}
        <li className="mt-1 border-t border-surface-100/80 pt-1">
          <button
            type="button"
            onClick={() => {
              onNavigate();
              onLogout();
            }}
            className={cn(
              'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium',
              isDarkHero
                ? 'text-red-300 hover:bg-white/5'
                : 'text-red-600 hover:bg-red-50',
            )}
          >
            <LogOut className="h-4 w-4 shrink-0" aria-hidden />
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
}
