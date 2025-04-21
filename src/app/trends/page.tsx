import { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { TechArticle, WithContext } from "schema-dts";

import { PageContainer } from "@/components/layout";
import { TrendingList, TrendingListSkeleton } from "@/components/trends";
import { BreadCrumbNavigation } from "@/components/ui/breadcrumb-navigation";

export const metadata: Metadata = {
  title: "Top 100 Trending npm Packages — Size, Popularity & Downloads | NpmCheck",
  description:
    "Discover the 100 most popular npm packages ranked by dependents and downloads. Explore trends in size, security, and usage over time with npmcheck.",
  keywords:
    "npm trending packages, popular npm packages, top npm libraries, most downloaded npm packages, npm package popularity, npm downloads, npmcheck trends",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/trends`,
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
    title: `Top 100 Trending npm Packages — Size, Popularity & Downloads | NpmCheck`,
    description:
      "Discover the 100 most popular npm packages ranked by dependents and downloads. Explore trends in size, security, and usage over time with npmcheck.",
  },
  bookmarks: `${process.env.NEXT_PUBLIC_BASE_URL}/trends`,
  category: "Technology",
};

const jsonLd: WithContext<TechArticle> = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Top 100 Trending npm Packages — Size, Popularity & Downloads | NpmCheck",
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
  keywords:
    "npm trending packages, popular npm packages, top npm libraries, most downloaded npm packages, npm package popularity, npm downloads, npmcheck trends",
  about: {
    "@type": "WebApplication",
    name: "Top 100 Trending npm Packages — Size, Popularity & Downloads | NpmCheck",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/trends`,
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

export default async function Page() {
  const breadcrumbNavigationItems = [
    {
      title: "Home",
      href: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    },
    {
      title: "Trends",
      href: `${process.env.NEXT_PUBLIC_BASE_URL}/trends`,
    },
  ];

  return (
    <PageContainer className="pb-2">
      <Script
        id="json-formatter-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadCrumbNavigation items={breadcrumbNavigationItems} />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <h1 className="font-bold text-3xl">Most Popular Packages </h1>
          <p className="text-gray-500 text-sm">
            A complete list with the 100 currently most popular packages
          </p>
        </div>
        <Suspense fallback={<TrendingListSkeleton />}>
          <TrendingList />
        </Suspense>
      </div>
    </PageContainer>
  );
}
