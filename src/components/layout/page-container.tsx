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
      <div className={cn("flex flex-col gap-2 p-4 w-[1100px]", className ? className : "")}>
        {children}
      </div>
    </div>
  );
};
