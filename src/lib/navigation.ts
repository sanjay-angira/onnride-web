/** Unified site navigation — same on every page. */
const MAIN_NAV_BASE = [
  { href: '/search', label: 'Bikes' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/about', label: 'About us' },
  { href: '/offers', label: 'Offers' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
  { href: '/help', label: 'Help' },
] as const;

export const PARTNER_NAV_ITEM = {
  href: '/list-your-bike',
  label: 'Partner with us',
  highlight: true,
} as const;

export const MY_TRIPS_NAV_ITEM = {
  href: '/bookings',
  label: 'My trips',
  highlight: true,
} as const;

export type MainNavItem =
  | (typeof MAIN_NAV_BASE)[number]
  | typeof PARTNER_NAV_ITEM
  | typeof MY_TRIPS_NAV_ITEM;

/** @deprecated Use getMainNav(loggedIn) for auth-aware nav */
export const MAIN_NAV: readonly MainNavItem[] = [...MAIN_NAV_BASE, PARTNER_NAV_ITEM];

export function getMainNav(loggedIn: boolean): MainNavItem[] {
  return [...MAIN_NAV_BASE, loggedIn ? MY_TRIPS_NAV_ITEM : PARTNER_NAV_ITEM];
}

export const FOOTER_COMPANY = [
  { href: '/bike-rental', label: 'Rental cities' },
  { href: '/compare', label: 'Compare' },
  { href: '/about', label: 'About us' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/blog', label: 'Blog' },
  { href: '/offers', label: 'Offers & coupons' },
  { href: '/list-your-bike', label: 'Partner with us' },
  { href: '/contact', label: 'Contact us' },
] as const;

export const FOOTER_LEGAL = [
  { href: '/terms', label: 'Terms of service' },
  { href: '/privacy', label: 'Privacy policy' },
  { href: '/rental-policy', label: 'Rental policy' },
  { href: '/insurance-policy', label: 'Insurance policy' },
  { href: '/cancellation-policy', label: 'Cancellation policy' },
] as const;

export const FOOTER_ACCOUNT = [
  { href: '/bookings', label: 'My trips' },
  { href: '/profile', label: 'Profile & KYC' },
  { href: '/wallet', label: 'Wallet' },
] as const;

export const FOOTER_SUPPORT = [
  { href: '/faq', label: 'FAQ' },
  { href: '/help', label: 'Help center' },
  { href: '/contact', label: 'Contact support' },
] as const;

function isNavActive(pathname: string, href: string): boolean {
  if (href === '/search') {
    return (
      pathname === '/search' ||
      pathname.startsWith('/vehicles/') ||
      pathname.startsWith('/checkout/')
    );
  }
  if (href === '/blog') {
    return pathname === '/blog' || pathname.startsWith('/blog/');
  }
  if (href === '/bookings') {
    return pathname === '/bookings' || pathname.startsWith('/bookings/');
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isMainNavLinkActive(pathname: string, href: string): boolean {
  return isNavActive(pathname, href);
}
