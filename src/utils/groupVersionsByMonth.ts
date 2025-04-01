import { isSameMonth } from "date-fns";
import semver from "semver";

export type VersionGroupedByMonth = Record<string, string[]>;

export type MonthVersions = {
  month: string;
  versions: string[];
  total: number;
};

export const groupVersionsByMonth = (data: Record<string, string>): MonthVersions[] => {
  const months: MonthVersions[] = [];
  const sortedVersions = Object.keys(data)
    .filter((v) => /^\d+\.\d+\.\d+$/.test(v))
    .filter((v) => semver.valid(v))
    .sort(semver.rcompare);

  const numberOfVersions = sortedVersions.length;
  const firstReleaseVersion = sortedVersions[numberOfVersions - 1];
  const firstReleaseDate = data[firstReleaseVersion];

  const fromDate = new Date(firstReleaseDate);
  const now = new Date();
  const allMonths: string[] = [];

  fromDate.setDate(1);
  now.setDate(1);

  const current = new Date(fromDate);

  while (current <= now) {
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, "0");
    allMonths.push(`${year}-${month}`);

    current.setMonth(current.getMonth() + 1); // move to next month
  }

  console.log("Check all months", allMonths);

  const entries = Object.entries(data).map(([version, dateStr]) => ({
    version,
    date: new Date(dateStr),
    month: new Date(dateStr).toLocaleDateString("en", { dateStyle: "short" }), // "YYYY-MM"
  }));

  for (const month of allMonths) {
    const monthlyVersions = entries
      .filter((entry) => isSameMonth(new Date(entry.month), new Date(month)))
      .map((entry) => entry.version);

    months.push({
      month,
      total: monthlyVersions.length,
      versions: monthlyVersions,
    });
  }

  console.log("Months grouped data", months);

  return months;
};
