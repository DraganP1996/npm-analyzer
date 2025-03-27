import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type SearchResultHeaderProps = {
  children: ReactNode;
  className?: string;
};

export const SearchResultHeader = ({ children, className }: SearchResultHeaderProps) => {
  return <div className={cn("font-bold text-2xl", className)}> {children} </div>;
};
