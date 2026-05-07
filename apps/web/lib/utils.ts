import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classnames safely. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format integer cents to ₪ display (e.g. 2490 → "₪24.90"). */
export function formatPrice(cents: number, currency = '₪'): string {
  const major = (cents / 100).toFixed(2);
  return `${currency}${major}`;
}
