import { ReactNode } from "react";

export const SectionHeader = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-row py-2 lg:py-3 justify-between items-center">{children}</div>;
};
