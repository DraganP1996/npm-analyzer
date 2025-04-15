import { ComplexCardSkeleton } from "./complex-card-skeleton";
import { PackageGeneralInfoSkeleton } from "./package-general-info-skeleton";
import { SectionHeaderSkeleton } from "./section-header-skeleton";

export const RepositoryOverviewSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <SectionHeaderSkeleton />
      <PackageGeneralInfoSkeleton />
      <div className="grid gird-cols-1 lg:grid-cols-[1.7fr_1fr] gap-2">
        <ComplexCardSkeleton widthClassName="w-full" />
        <ComplexCardSkeleton widthClassName="w-full" />
      </div>
      <div className="grid gird-cols-1 lg:grid-cols-[3fr_1.5fr_2.5fr] gap-2">
        <ComplexCardSkeleton widthClassName="w-full" />
        <ComplexCardSkeleton widthClassName="w-full" />
        <ComplexCardSkeleton widthClassName="w-full" />
      </div>
      <div className="grid grid-cols-1 gap-2">
        <ComplexCardSkeleton widthClassName="w-full" />
      </div>
    </div>
  );
};
