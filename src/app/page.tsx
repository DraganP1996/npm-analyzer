import { Metadata } from "next";
import Script from "next/script";
import { TechArticle, WithContext } from "schema-dts";

import { Home } from "@/components/home/home";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "NpmCheck - Fast Dependency and Vulnerability Checker for npm Packages",
  description:
    "Explore detailed reports for any npm package. Check size, dependencies, security issues, versions, maintainers, and GitHub stats — all in one place.",
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
  keywords: [
    "npm",
    "npm packages",
    "package size",
    "npm audit",
    "javascript dependencies",
    "npm vulnerabilities",
    "npm checker",
    "npm version compare",
    "npm security",
    "open source audit",
    "package insights",
    "GitHub dependencies",
    "node.js packages",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: `NpmCheck - Fast Dependency and Vulnerability Checker for npm Packages`,
    description:
      "Explore detailed reports for any npm package. Check size, dependencies, security issues, versions, maintainers, and GitHub stats — all in one place.",
  },
  bookmarks: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  category: "Technology",
};

const jsonLd: WithContext<TechArticle> = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline:
    "Explore detailed reports for any npm package. Check size, dependencies, security issues, versions, maintainers, and GitHub stats — all in one place.",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `https://jsonsformatter.com`,
  },
  author: {
    "@type": "Person",
    name: "Dragan Petrovic",
    url: "https://github.com/DraganP1996",
  },
  publisher: {
    "@type": "Person",
    name: "Dragan Petrovic",
    url: "https://github.com/DraganP1996",
  },
  keywords: [
    "npm",
    "npm packages",
    "package size",
    "npm audit",
    "javascript dependencies",
    "npm vulnerabilities",
    "npm checker",
    "npm version compare",
    "npm security",
    "open source audit",
    "package insights",
    "GitHub dependencies",
    "node.js packages",
  ],
  about: {
    "@type": "WebApplication",
    name: "NpmCheck - Fast Dependency and Vulnerability Checker for npm Packages",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    browserRequirements: "Requires modern browsers (Chrome, Firefox, Safari)",
    applicationCategory: "Utilities",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0.00",
      priceCurrency: "EUR",
    },
  },
};

export const revalidate = 432_000;

export default function HomePage() {
  return (
    <>
      <Script
        id="npmcheck-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div
        className={cn("flex-1 flex flex-col gap-16 font-[family-name:var(--font-geist-sans)]")}
        style={{
          backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_URL}/pattern2.png')`,
        }}
      >
        <main className={cn("flex-1 flex flex-col gap-3 items-center")}>
          <Home />
        </main>
      </div>
    </>
  );
}
