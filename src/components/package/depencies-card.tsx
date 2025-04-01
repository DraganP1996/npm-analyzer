import { ReactNode } from "react";
import Link from "next/link";

import { Badge } from "../ui/badge";
import { ComplexCard } from "./complex-card";

type DependencyCardProps = {
  title: string;
  description: string;
  dependencies: Record<string, string> | undefined;
};

const DependencyItem = ({ children, href }: { children: ReactNode; href: string }) => {
  return (
    <Link
      href={href}
      className="p-2 text-sm flex flex-row justify-between items-center w-full hover:bg-blue-200/50 cursor-pointer rounded hover:shadow"
      prefetch={false}
    >
      {children}
    </Link>
  );
};

export const DependenciesCard = ({ title, description, dependencies }: DependencyCardProps) => {
  const dependencyNames = Object.keys(dependencies || {});
  const hasDependencies = !!dependencyNames.length;

  return (
    <ComplexCard
      title={`${title} (${dependencyNames.length})`}
      description={description}
      showInfoIcon
      className="w-[350px] flex"
      contentClassName="min-h-[200px] max-h-[260px] overflow-auto"
    >
      {!hasDependencies ? (
        <div className="flex items-center justify-center flex-1 text-xs">
          <div className="max-w-[240px] text-gray-500">
            This package has not {title} dependencies{" "}
          </div>
        </div>
      ) : (
        <div className="flex flex-col flex-1">
          {dependencyNames.map((name) => (
            <DependencyItem key={name} href={`${process.env.NEXT_PUBLIC_BASE_URL}/package/${name}`}>
              <span className="font-semibold italic"> {name} </span>
              <Badge className="max-w-[120px]"> {dependencies![name]} </Badge>
            </DependencyItem>
          ))}
        </div>
      )}
    </ComplexCard>
  );
};
