import { SectionHeader } from "../components";
import { SimpleCard } from "../../ui/simple-card";
import { NpmPackageVersion } from "@/types/package-metadata";
import { getVlnsForMultiplePkgs } from "@/lib/ovs";
import { CACHE_TAGS } from "@/consts";
import { ChartConfig } from "@/components/ui/chart";
import { SecurityCard } from "../components/security-card";
import { generateSecurityVulnerabilities } from "@/lib/ai";

type SecurityOverviewProps = {
  packageName: string;
  versions: Record<string, NpmPackageVersion>;
  stableVersion: string;
};

export type VersionVulnerabilityCounter = {
  version: string;
  count: number;
};

export const SecurityOverview = async ({
  packageName,
  versions,
  stableVersion,
}: SecurityOverviewProps) => {
  const chartConfig = {
    count: {
      label: "N. of Vulnerabilities",
      color: "red",
    },
  } satisfies ChartConfig;
  const versionList = Object.keys(versions).map((versionNum: string) => versions[versionNum]);
  const vlns = await getVlnsForMultiplePkgs(
    `${CACHE_TAGS.ovsPackageAllVersions}:${packageName}`,
    versionList
  );

  const versionsVlnCounter = versionList.map((vl) => {
    const count = vlns?.filter((vln) => vln.version === vl.version).length || 0;

    return {
      version: vl.version,
      count,
    };
  });
  const latestVersionVlns = versionsVlnCounter.find((version) => version.version === stableVersion);
  const lastVersionWithVlns = versionsVlnCounter.findLast((version) => version.count > 0);
  const vulnerabiltiesSummary = await generateSecurityVulnerabilities(
    packageName,
    versionsVlnCounter
  );

  return (
    <section className="flex flex-col gap-2">
      <SectionHeader>
        <h2 className="text-3xl font-semibold"> Security Overview</h2>
      </SectionHeader>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 flex-wrap">
          <SimpleCard title="Vulnerabilities">{latestVersionVlns?.count} </SimpleCard>
          <SimpleCard title="Last Version with Vulnerabilities">
            {lastVersionWithVlns?.version || "N/A"}
          </SimpleCard>
        </div>
        <SecurityCard
          config={chartConfig}
          data={versionsVlnCounter}
          packageName={packageName}
          stableVersion={stableVersion}
          summary={vulnerabiltiesSummary}
        />
      </div>
    </section>
  );
};
