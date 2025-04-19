import { Badge } from "@/components/ui/badge";
import { TrendPackage } from "@/types/trends";
import { compactNumberFormatter } from "@/utils";
import { CableIcon, GitFork, StarIcon } from "lucide-react";
import Link from "next/link";

type TrendingItemProps = {
  pkg: TrendPackage;
  position: number;
};

export const TrendingItem = ({ pkg, position }: TrendingItemProps) => {
  return (
    <Link
      href={`${process.env.NEXT_PUBLIC_BASE_URL}/package/${pkg.name}`}
      className="rounded-xl shadow border p-4 hover:bg-blue-100/30"
    >
      <div className="flex flex-row items-center gap-2">
        <div className="text-lg lg:text-2xl font-bold w-[52px]">{`${position}.`}</div>
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex-1 flex flex-row items-center justify-between">
            <div className="flex-1 flex flex-col gap-1">
              <div className="text-lg lg:text-2xl font-semibold"> {pkg.name} </div>
              <div className="text-xs lg:text-sm text-gray-500 line-clamp-1">{pkg.description}</div>
            </div>
            <Badge className="max-w-[100px] truncate text-xs block" title={pkg.latestVersion}>
              {pkg.latestVersion}
            </Badge>
          </div>
          <div className="flex flex-row gap-2">
            <div
              className="flex flex-row gap-1 items-center text-xs font-semibold"
              title={`GH Stars: ${compactNumberFormatter(pkg.stars)}`}
            >
              <StarIcon
                width={18}
                height={18}
                fill="oklch(90.5% 0.182 98.111)"
                stroke="oklch(90.5% 0.182 98.111)"
                className=""
              />
              {compactNumberFormatter(pkg.stars)}
            </div>
            <div
              className="flex flex-row gap-1 items-center text-xs font-semibold"
              title={`Dependents: ${compactNumberFormatter(pkg.stars)}`}
            >
              <CableIcon stroke="blue" width={18} height={18} />
              {compactNumberFormatter(pkg.dependents)}
            </div>
            <div
              className="flex flex-row gap-1 items-center text-xs font-semibold"
              title={`GH Forks: ${compactNumberFormatter(pkg.stars)}`}
            >
              <GitFork width={18} height={18} stroke="green" /> {pkg.forks}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
