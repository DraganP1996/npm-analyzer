import { Metadata } from "next";
import { notFound } from "next/navigation";

import { NpmPackageVersion } from "@/types/package-metadata";
import { PageContainer } from "../layout/page-container";
import { DataTable } from "../packages-search-results/data-table";
import { versionColumns } from "./components/version-columns";
import { ChartConfig } from "../ui/chart";
import { ComplexCard } from "../ui/complex-card";
import { BreadCrumbNavigation } from "../ui/breadcrumb-navigation";
import { VersionsChart } from "./components";
import { mobileVersionColumns } from "./components/mobile-version-columns";
import { getPackage } from "@/lib";
import { filterStableVersions } from "@/utils";

type PackagVersionsProps = {
  packageName: string;
};

export function generatePackageVersionsMetadata(packageName: string): Metadata {
  const title = `${packageName} Version History & Stats | Size, Files & Dependencies – npmcheck.com`;
  const description = `Browse every release of ${packageName} with detailed stats—package size, file count, direct/peer/dev‑dependency counts—for informed upgrade decisions.`;

  return {
    title,
    description,
    authors: [{ name: "Dragan Petrovic", url: "https://github.com/DraganP1996" }],
    creator: "Dragan Petrovic",
    publisher: "Dragan Petrovic",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}/versions`,
    },
    keywords: `npm package versions, ${packageName} version history, package size stats, file count per version, direct dependencies count, dev dependencies count, version comparison, npmcheck insights, upgrade guidance`,
    openGraph: {
      title: title,
      description: description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}/versions`,
      siteName: `Npm Check - ${packageName} Versions`,
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
    bookmarks: `${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}/versions`,
  };
}

export const PackageVersions = async ({ packageName }: PackagVersionsProps) => {
  const metadata = await getPackage(packageName);

  if (!metadata) return notFound();

  const tableData: NpmPackageVersion[] = [];
  const breadcrumbNavigationItems = [
    {
      title: packageName,
      href: `${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}`,
    },
    {
      title: "Versions",
      href: `${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}/versions`,
    },
  ];
  const orderedVersionNumbers = filterStableVersions(Object.keys(metadata.stableVersions));

  orderedVersionNumbers.forEach((version) => tableData.push(metadata.stableVersions[version]));

  const reverseTable = tableData.reverse();
  const packageSizeChartData = reverseTable.filter((item) => item.dist.unpackedSize !== undefined);
  const numOfFilesChartData = reverseTable.filter((item) => item.dist.fileCount !== undefined);
  const depsChartData = reverseTable.map((item) => ({
    ...item,
    depsCount:
      Object.keys(item.dependencies || {}).length +
      Object.keys(item.devDependencies || {}).length +
      Object.keys(item.peerDependencies || {}).length,
  }));

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <PageContainer className="pb-4">
      <BreadCrumbNavigation items={breadcrumbNavigationItems} />
      <div className="flex flex-row gap-1 items-center">
        <h1 className="font-bold text-3xl"> Version History </h1>
        <span className="text-3xl font-semibold">({orderedVersionNumbers.length}) </span>
      </div>

      <div className="flex flex-row items-center gap-1 text-xl font-semibold">
        <h2>
          <span className="text-2xl">📦</span> {packageName}{" "}
        </h2>
      </div>
      <p className="leading-4">
        A full version history of the {packageName} package with size, number of distributed files
        and dependency evolution.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-2">
        <ComplexCard
          title="Unpacked Size"
          description="Historyical package size changes accross diffent versions of the package"
        >
          <VersionsChart
            chartConfig={chartConfig}
            data={packageSizeChartData}
            dataKey="dist.unpackedSize"
          />
        </ComplexCard>
        <ComplexCard
          title="Number of Files"
          description="Historycal changes package file numbers across different versions of the package"
        >
          <VersionsChart
            chartConfig={chartConfig}
            data={numOfFilesChartData}
            dataKey="dist.fileCount"
          />
        </ComplexCard>
        <ComplexCard
          title="Dependencies"
          description="Number of dependencies for all the versions of the package"
        >
          <VersionsChart chartConfig={chartConfig} data={depsChartData} dataKey="depsCount" />
        </ComplexCard>
      </div>
      <div className="hidden lg:flex">
        <DataTable columns={versionColumns} data={tableData.reverse()} />
      </div>
      <div className="flx lg:hidden">
        <DataTable columns={mobileVersionColumns} data={tableData} />
      </div>
    </PageContainer>
  );
};
