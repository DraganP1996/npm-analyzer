import { getTrends } from "@/lib/trends/getTrends";
import { TrendPackage } from "@/types/trends";
import { TrendingItem } from "./components";

export const TrendingList = async () => {
  const trends = await getTrends();

  return (
    <div className="flex flex-col gap-2">
      {trends &&
        trends.map((pkg: TrendPackage, index: number) => (
          <TrendingItem key={pkg.name} pkg={pkg} position={index + 1} />
        ))}
    </div>
  );
};
