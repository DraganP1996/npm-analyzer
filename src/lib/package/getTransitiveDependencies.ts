import semver from "semver";

import { NpmPackageVersion } from "@/types/package-metadata";
import { getPackage } from "./getPackage";

type VisitedDeps = Map<string, Promise<NpmPackageVersion[]>>;

export const getTransitiveDependenies = async (
  initialDeps: Record<string, string>,
  visited: VisitedDeps = new Map<string, Promise<NpmPackageVersion[]>>()
): Promise<NpmPackageVersion[]> => {
  const transitiveDeps = await Promise.all(
    Object.entries(initialDeps).map(async ([depName, depRange]) => {
      const key = depName;

      if (visited.has(key)) {
        return;
      }

      const promise = (async () => {
        const response = await getPackage(depName);

        if (!response) return [];

        const availableVersions = Object.keys(response.stableVersions);
        const resolvedVersion = semver.maxSatisfying(availableVersions, depRange);

        if (!resolvedVersion) return [];

        const versionMetadata = response.stableVersions[resolvedVersion];
        const nestedDeps = {
          ...versionMetadata.dependencies,
        };

        if (!Object.keys(nestedDeps).length) {
          return [versionMetadata];
        }

        const innerDeps = await getTransitiveDependenies(nestedDeps, visited);
        return [versionMetadata, ...innerDeps];
      })();

      visited.set(key, promise);
      return promise;
    })
  );

  return transitiveDeps.filter((dep) => !!dep).flat();
};
