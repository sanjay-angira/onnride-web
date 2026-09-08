'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bike, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { UserAccountMobileCard } from '@/components/layout/UserAccountMobileCard';
import { LocationsNavMenu } from '@/components/layout/LocationsNavMenu.client';
import { UserProfileMenu } from '@/components/layout/UserProfileMenu.client';
import { cn } from '@/lib/utils';
import { getMainNav, isMainNavLinkActive } from '@/lib/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/authSlice';

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isCityLanding = pathname !== '/' && pathname.startsWith('/bike-rental/');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const dispatch = useAppDispatch();
  const { user, isHydrated } = useAppSelector((state) => state.auth);
  const mainNav = getMainNav(Boolean(isHydrated && user));

  const useDarkHeader = isCityLanding || (isHome && pastHero);

  useEffect(() => {
    function updateHeaderState() {
      setScrolled(window.scrollY > 8);

      if (!isHome) {
        setPastHero(false);
        return;
      }

      const hero = document.querySelector('[data-home-hero]');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setPastHero(rect.bottom <= 80);
        return;
      }

      setPastHero(window.scrollY > 520);
    }

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
    window.addEventListener('resize', updateHeaderState);

    return () => {
      window.removeEventListener('scroll', updateHeaderState);
      window.removeEventListener('resize', updateHeaderState);
    };
  }, [isHome]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const linkClass = (href: string, highlight?: boolean) =>
    cn(
      'text-sm font-medium transition-colors',
      useDarkHeader
        ? highlight
          ? 'text-brand-300 hover:text-brand-200'
          : 'text-slate-300 hover:text-white'
        : highlight
          ? 'text-brand-600 hover:text-brand-700'
          : 'text-secondary hover:text-primary',
      isMainNavLinkActive(pathname, href) &&
        (useDarkHeader ? 'text-white' : highlight ? 'text-brand-600' : 'text-brand-600'),
    );

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        useDarkHeader
          ? cn(
              'border-b text-white',
              scrolled
                ? 'border-white/10 bg-surface-950/95 shadow-lg shadow-black/10 backdrop-blur-xl'
                : 'border-transparent bg-surface-950/90 backdrop-blur-md',
            )
          : cn(
              'border-b text-primary',
              scrolled
                ? 'border-border/80 bg-white/95 shadow-sm backdrop-blur-xl'
                : 'border-transparent bg-white/70 backdrop-blur-md',
            ),
      )}
    >
      <div className="section-container flex h-16 items-center justify-between lg:h-[4.5rem]">
        <Link href="/" className="group flex shrink-0 touch-target items-center gap-2.5">
          <span
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-xl shadow-lg',
              useDarkHeader
                ? 'bg-brand-500 shadow-brand-500/30'
                : 'bg-brand-500 shadow-brand-500/25',
            )}
          >
            <Bike className="h-5 w-5 text-white" aria-hidden />
          </span>
          <span
            className={cn(
              'text-xl font-bold tracking-tight',
              useDarkHeader ? 'text-white' : 'text-primary',
            )}
          >
            Onn<span className={useDarkHeader ? 'text-brand-400' : 'text-brand-500'}>Ride</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-4 xl:gap-6 lg:flex"
          aria-label="Main navigation"
        >
          <LocationsNavMenu isDarkHero={useDarkHeader} variant="desktop" />
          {mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClass(link.href, 'highlight' in link ? link.highlight : false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {isHydrated && user ? (
            <UserProfileMenu
              user={user}
              isDarkHero={useDarkHeader}
              onLogout={() => dispatch(logout())}
            />
          ) : (
            <Link href="/search">
              <Button size="sm">Book Now</Button>
            </Link>
          )}
        </div>

        <button
          type="button"
          className={cn(
            'touch-target rounded-xl p-2 lg:hidden',
            useDarkHeader ? 'text-white hover:bg-white/10' : 'text-secondary hover:bg-muted',
          )}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen ? (
        <nav
          className={cn(
            'border-t px-4 py-4 lg:hidden',
            useDarkHeader ? 'border-white/10 bg-surface-950' : 'border-border bg-white',
          )}
          aria-label="Mobile navigation"
        >
          <ul className="space-y-1">
            <LocationsNavMenu
              isDarkHero={useDarkHeader}
              variant="mobile"
              onNavigate={() => setMobileOpen(false)}
            />
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'flex touch-target rounded-xl px-3 py-2.5 text-sm font-medium',
                    useDarkHeader
                      ? 'text-slate-200 hover:bg-white/5'
                      : 'text-primary hover:bg-muted',
                    'highlight' in link && link.highlight && 'text-brand-600',
                    isMainNavLinkActive(pathname, link.href) &&
                      (useDarkHeader ? 'text-white' : 'text-brand-600'),
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {isHydrated && user ? (
              <li>
                <UserAccountMobileCard
                  user={user}
                  isDarkHero={useDarkHeader}
                  onNavigate={() => setMobileOpen(false)}
                  onLogout={() => dispatch(logout())}
                />
              </li>
            ) : (
              <li className="pt-2">
                <Link href="/search" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full">
                    Book Now
                  </Button>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
