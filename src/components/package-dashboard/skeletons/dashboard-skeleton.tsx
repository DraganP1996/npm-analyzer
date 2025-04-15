import { PageContainer } from "@/components/layout";
import { PackageGeneralInfoSkeleton } from "./package-general-info-skeleton";
import { DependenciesOverviewSkeleton } from "./dependencies-overview-skeleton";
import { VersionsOverviewSkeleton } from "./versions-overview-skeleton";
import { SecurityOverviewSkeleton } from "./security-overview-skeleton";
import { PopularityOverviewSkeleton } from "./popularity-overview-skeleton";
import { RepositoryOverviewSkeleton } from "./repository-overiview-skeleton";

export const DashboardSkeleton = () => {
  return (
    <PageContainer>
      <div className="animate-pulse bg-white rounded p-2 w-full mt-2 flex flex-col gap-2">
        <div className="pt-2 bg-gray-200 rounded w-3/4 h-[40px] mb-2"></div>
        <div className="h-[20px] bg-gray-200 rounded w-1/2"></div>
      </div>
      <PackageGeneralInfoSkeleton />
      <DependenciesOverviewSkeleton />
      <VersionsOverviewSkeleton />
      <SecurityOverviewSkeleton />
      <PopularityOverviewSkeleton />
      <RepositoryOverviewSkeleton />
    </PageContainer>
  );
};
