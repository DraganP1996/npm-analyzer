import { ReactNode } from "react";

export type SearchResultHeaderProps = {
  children: ReactNode;
};

export const SearchResultHeader = ({ children }: SearchResultHeaderProps) => {
  return <div className="font-bold text-2xl max-w-[300px]"> {children} </div>;
};
