export type ImageVariantKey = 'thumb' | 'w300' | 'w900' | 'w1200';

export type ImageVariants = Record<ImageVariantKey, string>;

export function pickVariantUrl(
  variants: ImageVariants | null | undefined,
  size: ImageVariantKey = 'w300',
): string | null {
  if (!variants) return null;
  return variants[size] ?? variants.w900 ?? variants.w300 ?? variants.thumb ?? null;
}

export function legacyUrlToVariants(url: string): ImageVariants {
  return { thumb: url, w300: url, w900: url, w1200: url };
}

/** Card thumbnails, city grids */
export const CARD_IMAGE_SIZE: ImageVariantKey = 'w300';

/** Detail hero, large previews */
export const DETAIL_IMAGE_SIZE: ImageVariantKey = 'w900';

/** Open Graph / JSON-LD */
export const OG_IMAGE_SIZE: ImageVariantKey = 'w1200';

/** CDN / Supabase / S3 URLs — skip Next.js optimizer (avoids server-side TLS fetch failures). */
export function isRemoteImageSrc(src: string): boolean {
  return src.startsWith('http://') || src.startsWith('https://');
}
