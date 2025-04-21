import { PageContainer } from "@/components/layout";
import { ComplexCardSkeleton } from "@/components/package-dashboard/skeletons";

export const PackageVersionSkeleton = () => {
  return (
    <PageContainer>
      <div className="animate-pulse bg-white rounded p-2 w-full mt-2 flex flex-col gap-2">
        <div className="pt-2 bg-gray-200 rounded w-3/4 h-[40px] mb-2"></div>
        <div className="h-[20px] bg-gray-200 rounded w-1/2"></div>
      </div>
      <ComplexCardSkeleton widthClassName="w-full" />
      <ComplexCardSkeleton widthClassName="w-full" />
    </PageContainer>
  );
};
