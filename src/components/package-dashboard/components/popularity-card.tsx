import { Terminal } from "lucide-react";

import { ChartConfig } from "@/components/ui/chart";
import { ComplexCard } from "@/components/ui/complex-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DownloadDay } from "@/types";
import { PopularityChart } from "./popularity-chart";
import { formatParagraphs } from "@/lib/ai";

type PopularityCardProps = {
  config: ChartConfig;
  data: DownloadDay[];
  popularitySummary?: string;
};

export const PopularityCard = ({ config, data, popularitySummary }: PopularityCardProps) => {
  return (
    <ComplexCard
      title="Downloads History"
      description="Historycal data about package downloads in the last 18 months"
      showInfoIcon
      contentClassName="max-h-[350px]"
    >
      <PopularityChart config={config} data={data} />
      <div className="flex flex-col gap-2">
        {popularitySummary && (
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>
              <h3>Popularity Summary</h3>
            </AlertTitle>
            <AlertDescription className="leading-4">
              {formatParagraphs(popularitySummary)}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </ComplexCard>
  );
};
