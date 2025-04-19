import { SimpleCardSkeleton } from "@/components/ui/simple-card-skeleton";

export const PackageGeneralInfoSkeleton = () => {
  return (
    <>
      <div className="animate-pulse hidden lg:flex flex-row gap-2 lg:gap-3 flex-wrap">
        <SimpleCardSkeleton />
        <SimpleCardSkeleton />
        <SimpleCardSkeleton />
        <SimpleCardSkeleton />
        <SimpleCardSkeleton />
        <SimpleCardSkeleton />
      </div>
      <div className="animate-pulse flex lg:hidden flex-row gap-2 lg:gap-3 flex-wrap">
        <SimpleCardSkeleton />
        <SimpleCardSkeleton />
        <SimpleCardSkeleton />
        <SimpleCardSkeleton />
        <SimpleCardSkeleton />
        <SimpleCardSkeleton />
      </div>
    </>
  );
};
