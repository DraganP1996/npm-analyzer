import { TrendPackage, TrendsResponseItem } from "@/types/trends";
import { getOrSet } from "../redis";
import { filterStableVersions } from "@/utils";

const getTrendsData = async (): Promise<TrendPackage[]> => {
  try {
    const url = `${process.env.LIBRARIES_IO_BASE_URL}?sort=rank&per_page=50&page=1&api_key=${process.env.LIBRARIES_IO_TOKEN}`;
    const trendsRes = await fetch(url);

    if (!trendsRes.ok) {
      console.log("Trends response is not ok", trendsRes.status);
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
      versions: trendPackage.versions,
    }));
  } catch (err) {
    console.error("Error during trends data fetching", err);

    console.log("Check the trends error", err);
    return [];
  }
};

export const getTrends = async () =>
  await getOrSet<TrendPackage[]>("trends", 50 * 24 * 60 * 60, () => getTrendsData());
