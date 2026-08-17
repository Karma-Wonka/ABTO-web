import "server-only";

// Minimal in-memory, process-local rate limiter — mirrors the admin
// dashboard's src/lib/rate-limit.ts. Good enough to blunt naive
// brute-forcing of the member login endpoint on a low-traffic site
// without needing external infra (Redis, etc.).
declare global {
  // eslint-disable-next-line no-var
  var __rateLimitBuckets: Map<string, { count: number; resetAt: number }> | undefined;
}

function getBuckets() {
  if (!global.__rateLimitBuckets) global.__rateLimitBuckets = new Map();
  return global.__rateLimitBuckets;
}

/** Returns true if `key` is still within `limit` requests per `windowMs`. */
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const buckets = getBuckets();
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (bucket.count >= limit) return false;

  bucket.count += 1;
  return true;
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}
