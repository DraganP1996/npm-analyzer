import { NextRequest, NextResponse, userAgent } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./lib";

const ratelimit =
  process.env.USE_REDIS === "true"
    ? new Ratelimit({
        redis: redis!,
        limiter: Ratelimit.slidingWindow(6, "10 s"),
      })
    : null;

export async function middleware(request: NextRequest) {
  const { ua, isBot } = userAgent(request);

  console.log("Ua", ua);
  console.log("isBot", isBot);

  const isSuspiciousBot = /curl|node-fetch|python|axios|scrapy|go-http-client/i.test(ua);

  if (isSuspiciousBot) {
    console.log("Scraper found !!!!");
    return new NextResponse("Blocked scraper", { status: 403 });
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";

  console.log("Detected IP:", ip);

  if (process.env.USE_REDIS !== "true") {
    return NextResponse.next();
  }

  const { success } = await ratelimit!.limit(ip);
  return success ? NextResponse.next() : new NextResponse("Too many requests", { status: 429 });
}
