import { cn } from "@/lib/utils";

type ComplexCardSkeletonProps = {
  widthClassName?: string;
};

export const ComplexCardSkeleton = ({ widthClassName }: ComplexCardSkeletonProps) => {
  return (
    <div
      className={cn(
        "animate-pulse flex-col gap-6 rounded-xl border py-4 lg:py-6 shadow-sm w-full flex",
        widthClassName ? widthClassName : "lg:w-[350px]"
      )}
    >
      <div className="grid auto-rows-min grid-rows-[auto_auto] items-start px-4 lg:px-6 gap-1">
        <div className="bg-gray-200 rounded w-1/2 h-[16px]" />
        <div className="bg-gray-200 rounded w-/4 h-[16px]" />
      </div>
      <div className="px-2 lg:px-6 min-h-[200px] max-h-[260px]">
        <div className="flex flex-col flex-1 gap-1">
          <div className="bg-gray-200 rounded w-full h-[38px] p-2" />
          <div className="bg-gray-200 rounded w-full h-[38px] p-2" />
          <div className="bg-gray-200 rounded w-full h-[38px] p-2" />
          <div className="bg-gray-200 rounded w-full h-[38px] p-2" />
        </div>
      </div>
    </div>
  );
};
