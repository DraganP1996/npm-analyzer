import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const PageContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className="flex flex-1 w-full justify-center">
      <div
        className={cn(
          "flex flex-col gap-2 p-4 w-full lg:w-[1100px] px-2 lg:px-0 py-0",
          className ? className : ""
        )}
      >
        {children}
      </div>
    </div>
  );
};
