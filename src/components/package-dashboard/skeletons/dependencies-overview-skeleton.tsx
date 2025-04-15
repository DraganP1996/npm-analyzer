import { ComplexCardSkeleton } from "./complex-card-skeleton";
import { SectionHeaderSkeleton } from "./section-header-skeleton";

export const DependenciesOverviewSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <SectionHeaderSkeleton />
      <div className="flex flex-col lg:flex-row gap-2">
        <ComplexCardSkeleton />
        <ComplexCardSkeleton />
        <ComplexCardSkeleton />
      </div>
      <div className="animate-pulse flex flex-col gap-1 p-4 shadow border rounded-xl">
        <div className="bg-gray-200 rounded w-1/2 h-[20px]" />
        <div className="bg-gray-200 rounded w-full h-[44px]" />
        <div className="flex justify-end">
          <div className="bg-gray-200 rounded w-1/4 h-[20px]" />
        </div>
      </div>
    </div>
  );
};
