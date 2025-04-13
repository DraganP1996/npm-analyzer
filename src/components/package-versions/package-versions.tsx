import { NpmPackageVersion } from "@/types/package-metadata";
import { PageContainer } from "../layout/page-container";
import { DataTable } from "../packages-search-results/data-table";
import { versionColumns } from "./components/version-columns";
import { ChartConfig } from "../ui/chart";
import { ComplexCard } from "../ui/complex-card";
import { BreadCrumbNavigation } from "../ui/breadcrumb-navigation";
import { VersionsChart } from "./components";
import { mobileVersionColumns } from "./components/mobile-version-columns";

type PackagVersionsProps = {
  versions: Record<string, NpmPackageVersion>;
  orderedVersionNumbers: string[];
};

export const PackagVersions = ({ versions, orderedVersionNumbers }: PackagVersionsProps) => {
  const packageName = versions[orderedVersionNumbers[0]].name;
  const tableData: NpmPackageVersion[] = [];

  const breadcrumbNavigationItems = [
    {
      title: packageName,
      href: `${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}`,
    },
    {
      title: "versions",
      href: `${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}/versions`,
    },
  ];

  orderedVersionNumbers.forEach((version) => tableData.push(versions[version]));

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
    <PageContainer>
      <BreadCrumbNavigation items={breadcrumbNavigationItems} />
      <div className="flex flex-row gap-1 items-center">
        <h1 className="font-bold text-3xl"> Versions</h1>
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
