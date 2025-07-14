import { NpmPackageVersion } from "@/types/package-metadata";
import { getOrSet } from "../redis";
import {
  OsvBatchResponse,
  PackageVulnerabilties,
  getVlnsDetailsFromIds,
  PackageVlnDetails,
} from ".";

const getVlnIdsForMultiplePackages = async (
  packages: NpmPackageVersion[]
): Promise<PackageVlnDetails[]> => {
  const ovsResponse = await fetch(`${process.env.OVS_BASE_URL}/querybatch`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 2 * 24 * 60 * 60,
    },
    body: JSON.stringify({
      queries: packages.map((dep) => ({
        package: {
          ecosystem: "npm",
          name: dep.name,
        },
        version: dep.version,
      })),
    }),
  });

  if (!ovsResponse.ok) {
    console.error(`Failed to fetch: ${ovsResponse.status} ${ovsResponse.statusText}`);
    return [];
  }

  const ovsData: OsvBatchResponse = await ovsResponse.json();
  const packageVlnsSummaries = ovsData.results
    .map((ovsVln, index) => ({
      ...ovsVln,
      packageName: packages[index].name,
      version: packages[index].version,
    }))
    .filter((packageVln) => packageVln.vulns && packageVln.vulns.length) as PackageVulnerabilties[];

  const vlnDetails = await getVlnsDetailsFromIds(packageVlnsSummaries);

  return vlnDetails;
};

export const getVlnsForMultiplePkgs = async (cacheKey: string, dependencies: NpmPackageVersion[]) =>
  await getOrSet<PackageVlnDetails[]>(cacheKey, 2 * 24 * 60 * 60, () =>
    getVlnIdsForMultiplePackages(dependencies)
  );
