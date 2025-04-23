import { TrendPackage, TrendsResponseItem } from "@/types/trends";
import { filterStableVersions } from "@/utils";
import fs from "fs";
import path from "path";

export const getTrends1000 = async (): Promise<TrendPackage[]> => {
  try {
    const top500Packages: TrendPackage[] = [];

    const fileNames = ["100.json", "200.json" /*'300.json', '400.json', '500.json'*/];
    const dataDir = path.join(process.cwd(), "src", "consts");

    if (!fs.existsSync(dataDir)) {
      throw new Error(`Directory does not exist: ${dataDir}`);
    }

    for (const fileName of fileNames) {
      const filePath = path.join(dataDir, fileName);
      const raw = fs.readFileSync(filePath, "utf-8");
      const packagesData = JSON.parse(raw) as TrendsResponseItem[];

      top500Packages.push(
        ...packagesData.map((pkg) => ({
          dependents: pkg.dependents_count,
          description: pkg.description,
          forks: pkg.forks,
          latestVersion: filterStableVersions(pkg.versions.map((version) => version.number))[0],
          name: pkg.name,
          rank: pkg.rank,
          stars: pkg.stars,
          versions: pkg.versions,
        }))
      );
    }

    return top500Packages;
  } catch (err) {
    console.error("Error during trends data fetching", err);
    return [];
  }
};
