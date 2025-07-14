import { NpmPackageVersion } from "@/types";
import { filterStableVersions } from "./filterStableVersions";

/**
 * Utility fuction to find the previous stable versions starting from a version number
 * @param currVersion
 * @param versions
 * @returns
 */
export const findPreviousVersions = (
  currVersion: string,
  versions: Record<string, NpmPackageVersion>
): NpmPackageVersion => {
  const stableVersionsList = filterStableVersions(
    Object.keys(versions).map((version) => versions[version].version)
  );
  const currVersionIndex = stableVersionsList.findIndex((v) => v === currVersion);
  const prevVersion = versions[stableVersionsList[currVersionIndex + 1]];

  return prevVersion;
};
