import { redis } from "./redis";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const memoryCache = new Map<string, any>();

export async function getOrSet<T>(
  key: string,
  ttlSeconds: number,
  fallback: () => Promise<T>
): Promise<T> {
  if (redis) {
    const cached = await redis.get(key);
    if (cached) return cached as T;

    const value = await fallback();
    await redis.set(key, JSON.stringify(value), { ex: ttlSeconds });
    return value;
  }
  // In-memory fallback (local only)
  if (memoryCache.has(key)) {
    return memoryCache.get(key) as T;
  }

  const value = await fallback();
  memoryCache.set(key, value);

  console.log(memoryCache);
  return value;
}
