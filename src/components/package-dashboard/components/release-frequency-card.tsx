import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { groupVersionsByMonth } from "@/utils";
import { ChartConfig } from "../../ui/chart";
import { ComplexCard } from "../../ui/complex-card";
import { ReleaseFrequencyChart } from "./release-frequency-chart";

type ReleaseFrequencyCardProps = {
  history: Record<string, string>;
  packageName: string;
};

export const ReleaseFrequencyCard = ({ history, packageName }: ReleaseFrequencyCardProps) => {
  const monthReleases = groupVersionsByMonth(history);
  const chartConfig = {
    total: {
      label: "Number of releases ",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <ComplexCard
      title="Release Frequency"
      description="Historycal data about package versions"
      showInfoIcon
      className="w-full"
      contentClassName=""
    >
      <ReleaseFrequencyChart config={chartConfig} monthReleases={monthReleases} />
      <div className="flex flex-row items-center justify-end">
        <Link
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}/versions`}
          className="flex flex-row items-center"
        >
          All Versions <ChevronRight />
        </Link>
      </div>
    </ComplexCard>
  );
};
