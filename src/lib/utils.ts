// ============================================================
// Chishti Furniture Mart — Utility Functions
// ============================================================

/**
 * Merge class names, filtering out falsy values.
 * Lightweight alternative to clsx + twMerge.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format a number as USD currency string.
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Generate a unique order ID with prefix and timestamp.
 */
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `CFM-${timestamp}-${random}`;
}

/**
 * Calculate the discount percentage between original and current price.
 */
export function calculateDiscount(
  originalPrice: number,
  currentPrice: number
): number {
  if (originalPrice <= 0) return 0;
  const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
  return Math.round(discount);
}

/**
 * Return an array describing star rendering.
 * Each element is 'full', 'half', or 'empty'.
 */
export function getStarRating(
  rating: number,
  maxStars: number = 5
): ('full' | 'half' | 'empty')[] {
  const stars: ('full' | 'half' | 'empty')[] = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const extraFull = rating - fullStars >= 0.75 ? 1 : 0;

  for (let i = 0; i < fullStars + extraFull; i++) {
    stars.push('full');
  }
  if (hasHalf) {
    stars.push('half');
  }
  while (stars.length < maxStars) {
    stars.push('empty');
  }
  return stars;
}

/**
 * Truncate text to a given length, appending an ellipsis if truncated.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Classic debounce: returns a debounced version of the provided function.
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Convert a string into a URL-safe slug.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generate a random ID string.
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

/**
 * Get estimated delivery date string from now + days.
 */
export function getEstimatedDelivery(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format a date string to a readable format.
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
