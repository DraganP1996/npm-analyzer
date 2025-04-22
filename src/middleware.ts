import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "unknown";
  const path = request.nextUrl.pathname;

  if (/bot|crawl|spider|slurp|fetch|wget|curl|python/i.test(userAgent)) {
    console.log(`[CRAWLER] ${userAgent} => ${path}`);
  }

  return NextResponse.next();
}
