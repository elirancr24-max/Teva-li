// Bucket helpers for dashboard sparkline.

export type RangeKey = '7d' | '30d' | '90d';

export const RANGE_DAYS: Record<RangeKey, number> = {
  '7d': 7,
  '30d': 30,
  '90d': 90,
};

export function rangeStart(range: RangeKey, now = new Date()): Date {
  const days = RANGE_DAYS[range];
  return new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
}

/**
 * Buckets timestamped values into per-day sums for the given range.
 * Returns an array of length RANGE_DAYS[range] aligned oldest→newest.
 */
export function bucketDaily(
  rows: { created_at: string; value: number }[],
  range: RangeKey,
  now = new Date(),
): number[] {
  const days = RANGE_DAYS[range];
  const buckets = new Array(days).fill(0);
  const startMs = rangeStart(range, now).getTime();
  const dayMs = 24 * 60 * 60 * 1000;

  for (const row of rows) {
    const t = new Date(row.created_at).getTime();
    if (t < startMs) continue;
    const idx = Math.floor((t - startMs) / dayMs);
    if (idx >= 0 && idx < days) buckets[idx] += row.value;
  }
  return buckets;
}
