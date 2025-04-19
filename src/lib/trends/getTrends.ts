import { TrendPackage, TrendsResponseItem } from "@/types/trends";
import { getOrSet } from "../redis";
import { filterStableVersions } from "@/utils";

const getTrendsData = async (): Promise<TrendPackage[]> => {
  try {
    const url = `${process.env.LIBRARIES_IO_BASE_URL}?platforms=npm&sort=rank&per_page=100&page=1&api_key=${process.env.LIBRARIES_IO_TOKEN}`;
    const trendsRes = await fetch(url);

    if (!trendsRes.ok) {
      console.log("Trends response is not ok", trendsRes);
      return [];
    }

    const trendsData: TrendsResponseItem[] = await trendsRes.json();

    return trendsData.map((trendPackage) => ({
      dependents: trendPackage.dependents_count,
      description: trendPackage.description,
      forks: trendPackage.forks,
      latestVersion: filterStableVersions(
        trendPackage.versions.map((version) => version.number)
      )[0],
      name: trendPackage.name,
      rank: trendPackage.rank,
      stars: trendPackage.stars,
    }));
  } catch (err) {
    console.error("Error during trends data fetching", err);
    return [];
  }
};

export const getTrends = async () =>
  await getOrSet<TrendPackage[]>("trends", 5 * 24 * 60 * 60, () => getTrendsData());
