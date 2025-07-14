import { DownloadDay, DownloadMonth } from "@/types";

export const aggregateDownloadsByMonth = (dailyData: DownloadDay[]): DownloadMonth[] => {
  const monthlyAggregation: Record<string, number> = {};

  dailyData.forEach(({ day, downloads }) => {
    const date = new Date(day);
    const monthYear = `${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;

    monthlyAggregation[monthYear] = (monthlyAggregation[monthYear] || 0) + downloads;
  });

  return Object.entries(monthlyAggregation).map(([month, downloads]) => ({
    month,
    downloads,
  }));
};
