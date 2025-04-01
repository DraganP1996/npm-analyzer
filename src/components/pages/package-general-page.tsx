import { formatDistance, subDays } from "date-fns";
import { NpmPackageMetadata } from "@/types/package-metadata";
import { extractGitHubRepo, formatBytes, getPackagePackedSize } from "@/utils";
import { PackageGeneralPageProps } from "./types";
import { PackageLeadingInfo } from "../package";
import { getBranchInfo } from "@/lib/graphql/clients/getRepoInfo";
import { getRepoInfoQuery } from "@/lib/graphql/queries/getRepoInfo";
import { DependenciesOverview } from "../package/dependencies-overview";
import { VersionsOverview } from "../package/versions-overview";
import { filterStableVersions } from "@/utils/filterStableVersions";
import { RepositoryOverview } from "../package/repository-overview";

export default async function PackageGeneralPage({ packageName }: PackageGeneralPageProps) {
  const packageResponse = await fetch(`https://registry.npmjs.org/${packageName}`);
  const packageData: NpmPackageMetadata = await packageResponse.json();

  const latestVersionKey = packageData["dist-tags"].latest;
  const latestVersion = packageData.versions[latestVersionKey];

  const tarball = latestVersion.dist.tarball;

  const repositoryUrl = latestVersion.repository?.url || packageData.repository?.url;
  const gitHubRepo = repositoryUrl ? extractGitHubRepo(repositoryUrl) : undefined;
  const graphQLGithubData =
    gitHubRepo && gitHubRepo.owner && gitHubRepo.repo
      ? await getBranchInfo(getRepoInfoQuery, gitHubRepo?.owner, gitHubRepo?.repo)
      : undefined;

  console.log("packageData", packageData);
  console.log("Package time data", packageData.time);
  console.log("Latest version data", latestVersion);
  console.log("GraphQL github data", graphQLGithubData);

  // const hasNotSideEffects =
  //   latestVersion.sideEffects !== undefined && latestVersion.sideEffects === false;
  // const packageModule = latestVersion?.module;

  //TODO: I'm still not sure about this logic
  // const likelyTreeShakable = hasNotSideEffects || packageModule;
  // const treeShakable = hasNotSideEffects && packageModule;

  const versionKeys = Object.keys(packageData.versions);
  const stableVersions = filterStableVersions(versionKeys);

  console.log("Versions", stableVersions);
  console.log("Release frequency data", packageData.time);

  const lastActivityDate = graphQLGithubData
    ? graphQLGithubData.pushedAt
    : packageData.time[stableVersions[0]];

  const unpackedSize = latestVersion.dist.unpackedSize;
  const packedSize = await getPackagePackedSize(tarball);

  const packageLeadingInfo = {
    lastActivity: formatDistance(subDays(new Date(lastActivityDate), 3), new Date(), {
      addSuffix: true,
    }),
    licence: packageData.license || "N/A",
    unpackedSize: unpackedSize ? formatBytes(unpackedSize) : "N/A",
    packedSize: packedSize ? formatBytes(packedSize) : "N/A",
    authorName: packageData.author?.name || graphQLGithubData?.owner.login || "N/A",
    authorLink: packageData.author?.url || graphQLGithubData?.owner.url,
  };
  // const hasDiscussions = graphQLGithubData.discussions.totalCount > 0;
  // const hasIssues = graphQLGithubData.issues.totalCount > 0;
  // const hasMilestones = graphQLGithubData.milestones.totalCount > 0;
  // const hasPRs = graphQLGithubData.pullRequests.totalCount > 0;

  const releaseFrequencyData: Record<string, string> = {};

  Object.keys(packageData.time).forEach((version) => {
    if (!stableVersions.includes(version)) return;

    releaseFrequencyData[version] = packageData.time[version];
  });

  return (
    <div className="flex flex-1 w-full justify-center">
      <div className="flex flex-col gap-2 p-4 w-[1100px]">
        <div className="flex flex-row items-center gap-4">
          <h1 className="text-3xl font-bold"> {packageName} </h1>
          <span className="flex-1 text-gray-500 text-sm"> {packageData.description} </span>
        </div>
        <PackageLeadingInfo {...packageLeadingInfo} />
        <DependenciesOverview
          packageName={packageName}
          deps={latestVersion?.dependencies}
          peerDeps={latestVersion?.peerDependencies}
          devDeps={latestVersion?.devDependencies}
        />
        <VersionsOverview versions={stableVersions} history={packageData.time} />
        {graphQLGithubData && <RepositoryOverview repository={graphQLGithubData} />}
      </div>
    </div>
  );
}
