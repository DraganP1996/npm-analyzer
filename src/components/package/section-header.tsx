import { ReactNode } from "react";

export const SectionHeader = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-row py-4 justify-between items-center">
      {children}
      <div className="">SCORE</div>
    </div>
  );
};
