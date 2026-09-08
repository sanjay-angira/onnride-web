'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  CalendarDays,
  ChevronDown,
  FileText,
  LogOut,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { User as UserType } from '@/types';

const menuItems = [
  { href: '/bookings', label: 'My bookings', icon: CalendarDays },
  { href: '/profile/kyc', label: 'Documents', icon: FileText },
  { href: '/profile', label: 'Profile', icon: User },
] as const;

interface UserProfileMenuProps {
  user: UserType;
  isDarkHero?: boolean;
  onLogout: () => void;
}

function userInitials(user: UserType): string {
  if (user.name?.trim()) {
    const parts = user.name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  }
  return user.phone.slice(-2);
}

export function UserProfileMenu({ user, isDarkHero = false, onLogout }: UserProfileMenuProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const displayName = user.name?.trim() || user.phone;
  const displayEmail = user.email?.trim() || null;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          'inline-flex items-center gap-2 rounded-xl border px-2.5 py-1.5 text-sm font-medium transition',
          isDarkHero
            ? 'border-white/15 bg-white/5 text-white hover:bg-white/10'
            : 'border-surface-200 bg-white text-surface-900 hover:border-brand-200 hover:bg-brand-50/50',
        )}
      >
        <span
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold',
            isDarkHero ? 'bg-brand-500 text-white' : 'bg-brand-500 text-white',
          )}
        >
          {userInitials(user)}
        </span>
        <span className="hidden max-w-[120px] truncate sm:inline">{displayName}</span>
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 transition', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-[250] w-72 overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-xl shadow-surface-900/10"
        >
          <div className="border-b border-surface-100 px-4 py-4">
            <p className="truncate font-display text-base font-bold text-surface-900">{displayName}</p>
            {displayEmail ? (
              <p className="mt-0.5 truncate text-sm text-slate-500">{displayEmail}</p>
            ) : (
              <p className="mt-0.5 text-sm text-slate-500">{user.phone}</p>
            )}
          </div>

          <div className="p-2">
            {menuItems.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== '/profile' && pathname.startsWith(`${item.href}/`)) ||
                (item.href === '/profile' && pathname === '/profile');

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                    active
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-surface-800 hover:bg-surface-50',
                  )}
                >
                  <item.icon
                    className={cn(
                      'h-4 w-4 shrink-0',
                      active ? 'text-brand-600' : 'text-slate-500',
                    )}
                    aria-hidden
                  />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="border-t border-surface-100 p-2">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-surface-800 transition hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="h-4 w-4 shrink-0 text-slate-500" aria-hidden />
              Log out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
