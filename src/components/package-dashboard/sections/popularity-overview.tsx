import { getDownlaodStatsForPackage } from "@/lib/package/getDownloads";
import { PopularityCard, SectionHeader } from "../components";
import { PopularityGeneralInfo } from "./popularity-general-info";
import { ChartConfig } from "@/components/ui/chart";
import { getPopularityFrequencySummary } from "@/lib/ai";
import { aggregateDownloadsByMonth } from "@/utils";

type PopularityOverviewProps = {
  packageName: string;
  stars?: string;
  watchers?: string;
  forks?: string;
};

export const PopularityOverview = async ({
  packageName,
  stars,
  watchers,
  forks,
}: PopularityOverviewProps) => {
  const downloadData = await getDownlaodStatsForPackage(packageName);
  const chartConfig = {
    total: {
      label: "Number of releases ",
      color: "#2563eb",
    },
  } satisfies ChartConfig;
  const aggregatedData = aggregateDownloadsByMonth(downloadData || []);
  const popularitySummary = await getPopularityFrequencySummary(packageName, aggregatedData);

  return (
    <section className="flex flex-col gap-2">
      <SectionHeader>
        <h2 className="text-3xl font-semibold"> Popularity Overview</h2>
      </SectionHeader>
      <PopularityGeneralInfo stars={stars} watchers={watchers} forks={forks} />
      <PopularityCard
        config={chartConfig}
        popularitySummary={popularitySummary}
        data={downloadData || []}
      />
    </section>
  );
};
