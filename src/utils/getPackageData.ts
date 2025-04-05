import { NpmPackageMetadata, NpmPackageVersion } from "@/types/package-metadata";
import { filterStableVersions } from "./filterStableVersions";
import { NpmFormattedMetadata } from "@/components/pages";

export const getPackageData = async (packageName: string): Promise<NpmFormattedMetadata> => {
  const packageResponse = await fetch(`https://registry.npmjs.org/${packageName}`);
  const packageData: NpmPackageMetadata = await packageResponse.json();
  const { versions, repository, time, license, author, description } = packageData;
  const stableVersionNumbers = filterStableVersions(Object.keys(versions));

  const sanitazedVersions = Object.entries(versions).reduce((acc, [versionNum, version]) => {
    if (!stableVersionNumbers.includes(versionNum)) return acc;

    const cleanDist = {
      tarball: version.dist?.tarball,
      fileCount: version.dist?.fileCount,
      unpackedSize: version.dist?.unpackedSize,
    };

    const cleaned = {
      name: version.name,
      version: version.version,
      description: version.description,
      dependencies: version.dependencies,
      devDependencies: version.devDependencies,
      peerDependencies: version.peerDependencies,
      optionalDependencies: version.optionalDependencies,
      license: version.license,
      repository: version.repository,
      author: version.author,
      funding: version.funding,
      dist: cleanDist,
      releaseDate: time[versionNum],
    };

    acc[versionNum] = cleaned;
    return acc;
  }, {} as Record<string, NpmPackageVersion>);
  const definedVersions = Object.fromEntries(
    Object.entries(sanitazedVersions).filter(
      ([versionNumber, versionData]) => !!versionData && !!versionNumber
    )
  );

  const extractedPackageData = {
    latestVersion: packageData["dist-tags"].latest,
    repositoryUrl: versions[packageData["dist-tags"].latest].repository?.url || repository?.url,
    stableVersions: definedVersions,
    license: license || "N/A",
    author,
    description,
  };

  return extractedPackageData;
};
