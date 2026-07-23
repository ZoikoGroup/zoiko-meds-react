const store = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  key: string,
  maxRequests: number = 30,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; retryAfter: number | null } {
  const now = Date.now();
  const record = store.get(key);

  if (!record || now > record.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, retryAfter: null };
  }

  record.count++;
  if (record.count > maxRequests) {
    return { allowed: false, remaining: 0, retryAfter: Math.ceil((record.resetAt - now) / 1000) };
  }

  return { allowed: true, remaining: maxRequests - record.count, retryAfter: null };
}

export function getRateLimitHeaders(
  result: { allowed: boolean; remaining: number; retryAfter: number | null }
): Record<string, string> {
  const headers: Record<string, string> = {
    "X-RateLimit-Limit": "30",
    "X-RateLimit-Remaining": String(result.remaining),
  };
  if (result.retryAfter !== null) {
    headers["Retry-After"] = String(result.retryAfter);
    headers["X-RateLimit-Reset"] = String(result.retryAfter);
  }
  return headers;
}
