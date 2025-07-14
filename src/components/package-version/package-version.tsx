import { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import { PageContainer } from "../layout/page-container";
import { BreadCrumbNavigation } from "../ui/breadcrumb-navigation";
import { getPackage } from "@/lib";
import { Badge } from "../ui/badge";
import { VersionsCompare, VulnerabilityDetails } from "./sections";
import { ComplexCardSkeleton } from "../package-dashboard/skeletons";
import { getSpecificVersionSummary, formatParagraphs } from "@/lib/ai";
import { findPreviousVersions } from "@/utils";

type PackageVersionSpecificPageProps = {
  version: string;
  packageName: string;
};

export const revalidate = 86400;

export function generatePackageVersionMetadata(packageName: string, version: string): Metadata {
  const title = `${packageName} v${version} Security & Vulnerability Report – npmcheck.com`;
  const description = `View all direct & transitive vulnerabilities in ${packageName} v${version} to track dependency changes and security fixes.`;

  return {
    title,
    description,
    authors: [{ name: "Dragan Petrovic", url: "https://github.com/DraganP1996" }],
    creator: "Dragan Petrovic",
    publisher: "Dragan Petrovic",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}/versions/${version}`,
    },
    keywords: `npm package vulnerabilities, ${packageName} v${version} security report, direct and transitive vulnerabilities, version comparison tool, npm security analysis, safe upgrade guidance, vulnerability scanner, npmcheck insights, ${packageName} changelog`,
    openGraph: {
      title: title,
      description: description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}/versions/${version}`,
      siteName: `Npm Check - ${packageName} v${version}`,
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
    bookmarks: `${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}/versions/${version}`,
  };
}

export const PackageVersion = async ({ version, packageName }: PackageVersionSpecificPageProps) => {
  const metadata = await getPackage(packageName);

  if (!metadata) return notFound();

  const versionMetadata = metadata.stableVersions[version];

  if (!versionMetadata) return notFound();

  const breadcrumbNavigationItems = [
    {
      title: packageName,
      href: `${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}`,
    },
    {
      title: "Versions",
      href: `${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}/versions`,
    },
    {
      title: versionMetadata.version,
      href: "",
    },
  ];
  const versions = metadata.stableVersions;
  const prevVersion = findPreviousVersions(version, versions);
  const summary = await getSpecificVersionSummary(packageName, versionMetadata, prevVersion);

  return (
    <PageContainer className="pb-2 gap-2">
      <BreadCrumbNavigation items={breadcrumbNavigationItems} />

      <h1 className="font-bold text-2xl lg:text-3xl my-2">
        Version Details and Security Vulnerabilities
      </h1>

      <div className="flex flex-row items-center justify-between ">
        <div className="flex flex-row items-center text-lg lg:text-xl font-semibold gap-1 my-2">
          <span className="text:xl lg:text-2xl">📦</span> <h2>{packageName}</h2>
        </div>
        <Badge> {versionMetadata.version} </Badge>
      </div>
      {Object.keys(versions).length > 1 && (
        <VersionsCompare currVersion={version} versions={versions} />
      )}
      {summary && (
        <section className="flex flex-col gap-2">
          <h2 className="font-bold text-xl lg:text-2xl my-2">
            Version {versionMetadata.version} Details{" "}
          </h2>
          <div className="text-gray-900"> {formatParagraphs(summary)} </div>
        </section>
      )}
      <section className="flex flex-col gap-2">
        <h2 className="font-bold text-xl lg:text-2xl my-2"> Security Vulnerabilities </h2>
        <Suspense
          fallback={
            <div className="w-full">
              <ComplexCardSkeleton widthClassName="w-full" />{" "}
            </div>
          }
        >
          <VulnerabilityDetails packageName={packageName} packageMetadata={versionMetadata} />
        </Suspense>
      </section>
    </PageContainer>
  );
};
