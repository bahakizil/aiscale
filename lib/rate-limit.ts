import { NextRequest, NextResponse } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// Clean up old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 10 * 60 * 1000);

export interface RateLimitConfig {
  interval: number; // in milliseconds
  uniqueTokenPerInterval: number;
}

export function rateLimit(config: RateLimitConfig) {
  const { interval, uniqueTokenPerInterval } = config;

  return {
    check: (request: NextRequest, limit: number, token: string): NextResponse | null => {
      const tokenCount = store[token] || { count: 0, resetTime: Date.now() + interval };

      if (Date.now() > tokenCount.resetTime) {
        tokenCount.count = 0;
        tokenCount.resetTime = Date.now() + interval;
      }

      tokenCount.count += 1;
      store[token] = tokenCount;

      const remaining = Math.max(0, limit - tokenCount.count);
      const reset = Math.ceil((tokenCount.resetTime - Date.now()) / 1000);

      if (tokenCount.count > limit) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          {
            status: 429,
            headers: {
              'X-RateLimit-Limit': limit.toString(),
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': reset.toString(),
              'Retry-After': reset.toString(),
            },
          }
        );
      }

      return null; // No rate limit hit
    },
  };
}

// Get IP address from request
export function getIP(request: NextRequest): string {
  const xff = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');

  if (xff) {
    return xff.split(',')[0].trim();
  }

  if (realIp) {
    return realIp.trim();
  }

  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }

  return 'unknown';
}

// Pre-configured rate limiters
export const limiter = {
  // Strict - for sensitive endpoints (login, register, etc.)
  strict: rateLimit({
    interval: 15 * 60 * 1000, // 15 minutes
    uniqueTokenPerInterval: 500,
  }),

  // Standard - for API endpoints
  standard: rateLimit({
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 500,
  }),

  // Lenient - for public endpoints
  lenient: rateLimit({
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 500,
  }),
};
