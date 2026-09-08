/** Canonical site base URL — production primary: https://onnride.com */
export const PRODUCTION_SITE_URL = 'https://onnride.com';

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  // Empty string is not nullish — `??` would keep "" and `new URL("")` crashes the build
  return fromEnv || PRODUCTION_SITE_URL;
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl().replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}
