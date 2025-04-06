import { formatDistance, subDays } from "date-fns";

import { extractGitHubRepo, formatBytes, getPackagePackedSize } from "@/utils";
import { getRepoInfoQuery, getGithub } from "@/lib";
import { PageContainer } from "../layout/page-container";
import { NpmFormattedMetadata } from "../pages";

import {
  PackageGeneralInfo,
  DependenciesOverview,
  VersionsOverview,
  RepositoryOverview,
} from "./sections";
import { filterStableVersions } from "@/utils/filterStableVersions";

export type PackageDashboardProps = {
  packageName: string;
  metadata: NpmFormattedMetadata;
};

export default async function PackageDashboard({ packageName, metadata }: PackageDashboardProps) {
  const {
    latestVersion,
    repositoryUrl: metadataRepoUrl,
    license,
    author,
    description,
    stableVersions,
  } = metadata;

  const { dist, repository, version, dependencies, devDependencies, peerDependencies } =
    stableVersions[latestVersion];

  const tarball = dist.tarball;
  const repositoryUrl = repository?.url || metadataRepoUrl;

  const versionNumbers = filterStableVersions(Object.keys(stableVersions));
  const releaseHistoryRecord = Object.fromEntries(
    Object.entries(stableVersions).map(([versionNumber, versionData]) => [
      versionNumber,
      versionData.releaseDate,
    ])
  );

  const gitHubRepo = repositoryUrl ? extractGitHubRepo(repositoryUrl) : undefined;
  const hasGithubRepo = gitHubRepo && gitHubRepo.owner && gitHubRepo.repo;

  const graphQLGithubData = hasGithubRepo
    ? await getGithub(packageName, getRepoInfoQuery, gitHubRepo?.owner, gitHubRepo?.repo)
    : undefined;

  const lastActivityDate = graphQLGithubData
    ? graphQLGithubData.pushedAt
    : releaseHistoryRecord[version];
  const unpackedSize = dist.unpackedSize;
  const packedSize = await getPackagePackedSize(tarball);
  const packageLeadingInfo = {
    lastActivity: formatDistance(subDays(new Date(lastActivityDate), 3), new Date(), {
      addSuffix: true,
    }),
    licence: license,
    unpackedSize: unpackedSize ? formatBytes(unpackedSize) : "N/A",
    packedSize: packedSize ? formatBytes(packedSize) : "N/A",
    authorName: author?.name || graphQLGithubData?.owner.login || "N/A",
    authorLink: author?.url || graphQLGithubData?.owner.url,
  };

  return (
    <PageContainer>
      <div className="flex flex-row items-center gap-4">
        <h1 className="text-3xl font-bold">
          <span className="text-3xl">📦</span> {packageName}
        </h1>
        <span className="flex-1 text-gray-500 text-sm"> {description} </span>
      </div>
      <PackageGeneralInfo {...packageLeadingInfo} />
      <DependenciesOverview
        packageName={packageName}
        deps={dependencies}
        peerDeps={peerDependencies}
        devDeps={devDependencies}
      />
      <VersionsOverview
        versions={versionNumbers}
        history={releaseHistoryRecord}
        packageName={packageName}
        lastVersion={latestVersion}
      />
      {graphQLGithubData && <RepositoryOverview repository={graphQLGithubData} />}
    </PageContainer>
  );
}
