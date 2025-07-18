import { formatDistance, subDays } from "date-fns";
import { Metadata } from "next";
import { TechArticle, WithContext } from "schema-dts";
import Script from "next/script";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import {
  compactNumberFormatter,
  extractGitHubRepo,
  formatBytes,
  getPackagePackedSize,
  parsePackageDescription,
} from "@/utils";
import { getRepoInfoQuery, getGithub, getPackage } from "@/lib";
import { PageContainer } from "../layout/page-container";
import {
  PackageGeneralInfo,
  DependenciesOverview,
  VersionsOverview,
  RepositoryOverview,
  SecurityOverview,
  PackageSummary,
} from "./sections";
import { filterStableVersions } from "@/utils/filterStableVersions";
import { PopularityOverview } from "./sections/popularity-overview";
import { SecurityOverviewSkeleton } from "./skeletons/security-overview-skeleton";
import { PopularityOverviewSkeleton } from "./skeletons/popularity-overview-skeleton";

export type PackageDashboardProps = {
  packageName: string;
};

export function generatePackageDashoardMetadata(packageName: string): Metadata {
  const title = `${packageName} — Analyze Size, Security, Dependencies & Versions | npmcheck`;
  const description = `Get full insights into ${packageName}: size, vulnerabilities, dependencies, popularity, and version history. Updated stats with GitHub and npm data.`;

  return {
    title,
    description,
    authors: [{ name: "Dragan Petrovic", url: "https://github.com/DraganP1996" }],
    creator: "Dragan Petrovic",
    publisher: "Dragan Petrovic",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}`,
    },
    keywords: `${packageName}, npm ${packageName}, ${packageName} versions, ${packageName} vulnerabilities, ${packageName} size, npm audit, open source package analysis, github ${packageName}`,
    openGraph: {
      title: title,
      description: description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}`,
      siteName: "Npm Check",
      locale: "en",
      type: "article",
      authors: ["Dragan Petrovic"],
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
      title: title,
      description: description,
    },
    bookmarks: `${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}`,
  };
}

export default async function PackageDashboard({ packageName }: PackageDashboardProps) {
  const metadata = await getPackage(packageName);

  if (!metadata) {
    return notFound();
  }

  const {
    latestVersion,
    repositoryUrl: metadataRepoUrl,
    license,
    author,
    description,
    stableVersions,
  } = metadata;

  // TODO: This is a quick fix, change in order to avoid 404 but display data related to a version that is not stable
  // TODO: Example => /package/@webpack-contrib/schema-utils
  if (Object.keys(stableVersions).length === 0) return notFound();

  const parsedDescription = await parsePackageDescription(description || "");

  const { dist, repository, version, dependencies, devDependencies, peerDependencies } =
    stableVersions[latestVersion];

  const tarball = dist.tarball;
  const repositoryUrl = repository?.url || metadataRepoUrl;

  const versionNumbers = filterStableVersions(Object.keys(stableVersions));
  const releaseHistoryRecord = Object.fromEntries(
    Object.entries(stableVersions).map(([versionNumber, versionData]) => [
      versionNumber,
      versionData.releaseDate,
    ])
  );

  const gitHubRepo = repositoryUrl ? extractGitHubRepo(repositoryUrl) : undefined;
  const hasGithubRepo = gitHubRepo && gitHubRepo.owner && gitHubRepo.repo;

  const graphQLGithubData = hasGithubRepo
    ? await getGithub(packageName, getRepoInfoQuery, gitHubRepo?.owner, gitHubRepo?.repo)
    : undefined;

  const lastActivityDate = graphQLGithubData
    ? graphQLGithubData.pushedAt
    : releaseHistoryRecord[version];
  const unpackedSize = dist.unpackedSize;
  const packedSize = await getPackagePackedSize(tarball);
  const packageLeadingInfo = {
    lastActivity: formatDistance(subDays(new Date(lastActivityDate), 3), new Date(), {
      addSuffix: true,
    }),
    licence: license,
    unpackedSize: unpackedSize ? formatBytes(unpackedSize) : "N/A",
    packedSize: packedSize ? formatBytes(packedSize) : "N/A",
    authorName: author?.name || graphQLGithubData?.owner.login || "N/A",
    authorLink: author?.url || graphQLGithubData?.owner.url,
  };

  const popularityGeneralInfo = {
    stars:
      graphQLGithubData && graphQLGithubData.stargazerCount !== undefined
        ? compactNumberFormatter(graphQLGithubData.stargazerCount)
        : undefined,
    forks:
      graphQLGithubData && graphQLGithubData.forkCount !== undefined
        ? compactNumberFormatter(graphQLGithubData.forkCount)
        : undefined,
    watchers:
      graphQLGithubData && graphQLGithubData.watchers !== undefined
        ? compactNumberFormatter(graphQLGithubData.watchers.totalCount)
        : undefined,
  };

  const title = `${packageName} — Analyze Size, Security, Dependencies & Versions | npmcheck`;
  const desc = `Get full insights into ${packageName}: size, vulnerabilities, dependencies, popularity, and version history. Updated stats with GitHub and npm data.`;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}`;
  const keywords = `${packageName}, npm ${packageName}, ${packageName} versions, ${packageName} vulnerabilities, ${packageName} size, npm audit, open source package analysis, github ${packageName}`;

  const jsonLd: WithContext<TechArticle> = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description: desc,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
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
    keywords: keywords,
    about: {
      "@type": "WebApplication",
      name: title,
      url: url,
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

  return (
    <>
      <Script
        id="json-formatter-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageContainer className="pb-4">
        <section className="flex flex-col justify-center gap-1">
          <h1 className="text-2xl lg:text-3xl font-bold pt-2">
            <span>📦</span> {packageName}
          </h1>
          <span
            className="flex-1 text-gray-500 text-sm"
            dangerouslySetInnerHTML={{ __html: parsedDescription }}
          />
        </section>
        <PackageGeneralInfo {...packageLeadingInfo} />
        <PackageSummary packageMetada={metadata} />
        <DependenciesOverview
          packageName={packageName}
          deps={dependencies}
          peerDeps={peerDependencies}
          devDeps={devDependencies}
        />
        <VersionsOverview
          versions={versionNumbers}
          history={releaseHistoryRecord}
          packageName={packageName}
          lastVersion={latestVersion}
        />
        <Suspense fallback={<SecurityOverviewSkeleton />}>
          <SecurityOverview
            packageName={packageName}
            versions={stableVersions}
            stableVersion={latestVersion}
          />
        </Suspense>

        <Suspense fallback={<PopularityOverviewSkeleton />}>
          <PopularityOverview packageName={packageName} {...popularityGeneralInfo} />
        </Suspense>
        <Suspense fallback={<p> Loading ....</p>}>
          {graphQLGithubData && <RepositoryOverview repository={graphQLGithubData} />}
        </Suspense>
      </PageContainer>
    </>
  );
}
