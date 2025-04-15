export const SimpleCardSkeleton = () => {
  return (
    <div className="flex flex-col py-1 lg:py-2 rounded-xl border shadow-sm gap-0">
      <div className="gap-0 px-2 lg:px-4">
        <div className="pt-2 bg-gray-200 rounded h-[14px] mb-2 w-10"></div>
        <div className="h-[28px] bg-gray-200 rounded w-14"></div>
      </div>
    </div>
  );
};
