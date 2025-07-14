import { ChevronRight, Terminal } from "lucide-react";

import { groupVersionsByMonth } from "@/utils";
import { ChartConfig } from "../../ui/chart";
import { ComplexCard } from "../../ui/complex-card";
import { ReleaseFrequencyChart } from "./release-frequency-chart";
import { CardLink } from "@/components/ui/card-link";
import { getPackageReleaseFrequencySummary, formatParagraphs } from "@/lib/ai";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type ReleaseFrequencyCardProps = {
  history: Record<string, string>;
  packageName: string;
};

export const ReleaseFrequencyCard = async ({ history, packageName }: ReleaseFrequencyCardProps) => {
  const monthReleases = groupVersionsByMonth(history);
  const chartConfig = {
    total: {
      label: "Number of releases ",
      color: "#2563eb",
    },
  } satisfies ChartConfig;
  const releaseFrequencySummary = await getPackageReleaseFrequencySummary(
    packageName,
    monthReleases
  );

  return (
    <ComplexCard
      title="Release Frequency"
      description="Historycal data about package versions"
      showInfoIcon
      className="w-full"
      contentClassName=""
    >
      <ReleaseFrequencyChart config={chartConfig} monthReleases={monthReleases} />
      {releaseFrequencySummary && (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>
            <h3>Releases Summary</h3>
          </AlertTitle>
          <AlertDescription className="leading-4">
            {formatParagraphs(releaseFrequencySummary)}
          </AlertDescription>
        </Alert>
      )}
      <div className="flex flex-row items-center justify-end">
        <CardLink href={`${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}/versions`}>
          All Versions <ChevronRight width={16} height={16} />
        </CardLink>
      </div>
    </ComplexCard>
  );
};
