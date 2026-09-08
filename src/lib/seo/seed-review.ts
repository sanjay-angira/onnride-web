/** Demo/seed reviews must never appear on public SEO surfaces. */

export const SEED_REVIEW_PLACEHOLDER_TEXT = 'Smooth pickup and well-maintained bike.';

const SEED_CUSTOMER_NAME = /^dev\s/i;

export function isSeedPlaceholderReview(input: {
  customerName?: string | null;
  review?: string | null;
}): boolean {
  const name = input.customerName?.trim() ?? '';
  if (name && SEED_CUSTOMER_NAME.test(name)) return true;

  const text = input.review?.trim() ?? '';
  if (text && text.toLowerCase() === SEED_REVIEW_PLACEHOLDER_TEXT.toLowerCase()) {
    return true;
  }

  return false;
}

export function filterPublicReviews<T extends { customerName?: string | null; review?: string | null }>(
  reviews: T[],
): T[] {
  return reviews.filter((r) => !isSeedPlaceholderReview(r));
}
