/** Canonical site base URL — production primary: https://onnride.com */
export const PRODUCTION_SITE_URL = 'https://onnride.com';

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_SITE_URL;
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl().replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}
