import { ReactNode } from "react";

export const PageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-1 w-full justify-center">
      <div className="flex flex-col gap-2 p-4 w-[1100px]">{children}</div>
    </div>
  );
};
