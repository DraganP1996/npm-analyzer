import { redis } from "./redis";

/**
 * The nextjs fetching system is able to cache entires < 2MB, it is not
 * enough for the use case in the app, for this reason we need to integrate
 * redis.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const memoryCache = new Map<string, any>();

export async function getOrSet<T>(
  key: string,
  ttlSeconds: number,
  fallback: () => Promise<T>
): Promise<T> {
  if (redis) {
    const cached = await redis.get(key);

    if (cached) {
      console.log(`✅ Redis HIT: ${key}`);
      return cached as T;
    }

    console.log(`❌ Redis MISS: ${key}`);

    const value = await fallback();
    await redis.set(key, JSON.stringify(value), { ex: ttlSeconds });
    return value;
  }
  // In-memory fallback (local only)
  if (memoryCache.has(key)) {
    const cache = memoryCache.get(key) as T;

    console.log(`✅ Memory HIT: ${key}`);

    return cache;
  }

  console.log(`❌ Memory MISS: ${key}`);

  const value = await fallback();
  memoryCache.set(key, value);

  return value;
}
