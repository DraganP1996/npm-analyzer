import { fetchVlnDetailsById, VlnDetails } from "./fetchVlnIdDetails";
import { PackageVulnerabilties } from "./types";

export type PackageVlnDetails = {
  packageName: string;
  version: string;
  vlns: VlnDetails[];
};

export const getVlnsDetailsFromIds = async (
  pkgVlns: PackageVulnerabilties[]
): Promise<PackageVlnDetails[]> => {
  const pkgVlnsDetails = await Promise.all(
    pkgVlns.map(async (pkgVln) => {
      const vlns = await Promise.all(
        pkgVln.vulns.map(async (vln) => {
          const id = vln.id;

          const vlnDetails = await fetchVlnDetailsById(id);

          return vlnDetails;
        })
      );

      return {
        packageName: pkgVln.packageName,
        version: pkgVln.version,
        vlns: vlns.filter((vln) => vln !== undefined),
      };
    })
  );

  return pkgVlnsDetails;
};
