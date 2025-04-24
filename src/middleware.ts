import { NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(request: NextRequest) {
  const { ua, isBot } = userAgent(request);

  console.log("Ua", ua);
  console.log("isBot", isBot);

  const isSuspiciousBot = /curl|node-fetch|python|axios|scrapy|go-http-client/i.test(ua);

  if (isSuspiciousBot) {
    console.log("Scraper found !!!!");
    return new NextResponse("Blocked scraper", { status: 403 });
  }

  return NextResponse.next();
}
