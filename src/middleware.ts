import { NextRequest, NextResponse, userAgent } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./lib";

const ratelimit =
  process.env.USE_REDIS === "true"
    ? new Ratelimit({
        redis: redis!,
        limiter: Ratelimit.slidingWindow(12, "1 s"),
      })
    : null;

const RATE_LIMIT_PATHS = [/^\/package\//];

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;

  // Skip middleware for static/irrelevant routes
  if (
    url.startsWith("/_next") ||
    url.startsWith("/favicon.ico") ||
    url.startsWith("/robots.txt") ||
    !RATE_LIMIT_PATHS.some((pattern) => pattern.test(url))
  ) {
    return NextResponse.next();
  }
  const { ua, isBot } = userAgent(request);

  console.log("Ua", ua);
  console.log("isBot", isBot);

  const isSuspiciousBot = /curl|node-fetch|python|axios|scrapy|go-http-client/i.test(ua);
  const allowlistedBots = ["Googlebot", "Bingbot", "Slurp", "DuckDuckBot", "YandexBot", "Applebot"];

  if (isSuspiciousBot) {
    console.log("Scraper found !!!!");
    return new NextResponse("Blocked scraper", { status: 403 });
  }

  if (isBot && allowlistedBots.some((bot) => ua?.includes(bot))) {
    console.log("Allowing good bot without rate limiting");
    return NextResponse.next();
  }

  const forwardedFor =
    request.headers.get("x-forwarded-for") || request.headers.get("cf-connecting-ip");
  const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";

  console.log("Detected IP:", ip);

  if (process.env.USE_REDIS !== "true") {
    return NextResponse.next();
  }

  const { success } = await ratelimit!.limit(ip);
  return success ? NextResponse.next() : new NextResponse("Too many requests", { status: 429 });
}
