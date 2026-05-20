// Per-IP login rate limit. In-memory Map — sufficient for single-instance
// Vercel deployment. Swap for @upstash/ratelimit if scaling to multiple
// serverless instances.

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

type Entry = { count: number; resetAt: number };
const buckets = new Map<string, Entry>();

export function checkLoginRate(ip: string): {
  allowed: boolean;
  remaining: number;
  resetInSec: number;
  reset: () => void;
} {
  const now = Date.now();
  let entry = buckets.get(ip);

  if (!entry || entry.resetAt < now) {
    entry = { count: 0, resetAt: now + WINDOW_MS };
    buckets.set(ip, entry);
  }

  entry.count += 1;
  const remaining = Math.max(0, MAX_ATTEMPTS - entry.count);
  const allowed = entry.count <= MAX_ATTEMPTS;
  const resetInSec = Math.ceil((entry.resetAt - now) / 1000);

  return {
    allowed,
    remaining,
    resetInSec,
    reset: () => buckets.delete(ip),
  };
}
