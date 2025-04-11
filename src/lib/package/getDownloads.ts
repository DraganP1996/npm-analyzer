import { CACHE_TAGS } from "@/consts";
import { getOrSet } from "../redis";
import { DownloadDay, PackageDownloadResponse } from "@/types/package-download-stats";

const fetchDownloadData = async (packageName: string): Promise<DownloadDay[]> => {
  const toDate = new Date();
  const fromDate = new Date();

  fromDate.setMonth(fromDate.getMonth() - 18); // Subtract exactly 18 months

  const to = toDate.toISOString().split("T")[0];
  const fromFormatted = fromDate.toISOString().split("T")[0];

  try {
    const response = await fetch(
      `${process.env.NPM_DOWNLOAD_URL}/downloads/range/${fromFormatted}:${to}/${packageName}`
    );

    if (!response.ok) {
      console.log("Error when fetching download data for package", packageName);
      return [];
    }
    const data: PackageDownloadResponse = await response.json();

    return data.downloads;
  } catch (err) {
    console.error("Error during loading download stats for package", packageName, err);
    return [];
  }
};

export const getDownlaodStatsForPackage = (packageName: string) =>
  getOrSet<DownloadDay[]>(
    `${CACHE_TAGS.packageDownloadStats}:${packageName}`,
    21 * 24 * 60 * 60,
    () => fetchDownloadData(packageName)
  );
