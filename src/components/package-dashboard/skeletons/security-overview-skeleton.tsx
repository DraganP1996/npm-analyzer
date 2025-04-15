import { SimpleCardSkeleton } from "@/components/ui/simple-card-skeleton";
import { SectionHeaderSkeleton } from "./section-header-skeleton";

export const SecurityOverviewSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <SectionHeaderSkeleton />
      <div className="animate-pulse hidden lg:flex flex-row gap-0 lg:gap-3 flex-wrap">
        <SimpleCardSkeleton />
        <SimpleCardSkeleton />
        <SimpleCardSkeleton />
      </div>
      <div className="animate-pulse flex flex-col gap-6 rounded-xl border py-4 lg:py-6 shadow-sm w-full">
        <div className="grid auto-rows-min grid-rows-[auto_auto] items-start px-4 lg:px-6 gap-1">
          <div className="h-[22px] bg-gray-200 rounded w-1/6" />
          <div className="h-[16px] bg-gray-200 rounded w-1/4" />
        </div>
        <div className="px-2 lg:px-6">
          <div className="h-[160px] bg-gray-200 rounded w-full" />
        </div>
      </div>
    </div>
  );
};
