import { NpmPackageMetadata } from "@/types/package-metadata";
import { filterStableVersions } from "./filterStableVersions";
import { NpmFormattedMetadata } from "@/components/pages";

export const getPackageData = async (packageName: string): Promise<NpmFormattedMetadata> => {
  const packageResponse = await fetch(`https://registry.npmjs.org/${packageName}`);
  const packageData: NpmPackageMetadata = await packageResponse.json();
  const { versions, repository, time, license, author, description } = packageData;
  const stableVersionNumbers = filterStableVersions(Object.keys(versions));

  Object.keys(versions).forEach((version) => {
    if (!stableVersionNumbers.includes(version)) delete versions[version];
  });

  const extractedPackageData = {
    latestVersion: versions[packageData["dist-tags"].latest],
    repositoryUrl: versions[packageData["dist-tags"].latest].repository?.url || repository?.url,
    stableVersions: versions,
    stableVersionNumbers,
    time: time,
    license: license || "N/A",
    author,
    description,
  };

  return extractedPackageData;
};
