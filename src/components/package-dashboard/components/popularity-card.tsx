import { Terminal } from "lucide-react";

import { ChartConfig } from "@/components/ui/chart";
import { ComplexCard } from "@/components/ui/complex-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DownloadDay } from "@/types";
import { PopularityChart } from "./popularity-chart";

type PopularityCardProps = {
  config: ChartConfig;
  data: DownloadDay[];
  packageName: string;
};

export const PopularityCard = ({ config, data }: PopularityCardProps) => {
  return (
    <ComplexCard
      title="Downloads History"
      description="Historycal data about package downloads in the last 18 months"
      showInfoIcon
      contentClassName="max-h-[350px]"
    >
      <PopularityChart config={config} data={data} />
      <div className="flex flex-col gap-2">
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>The precision of this numbers </AlertTitle>
          <AlertDescription>
            they are simply a count of the number of HTTP 200 responses we served that were tarball
            files, i.e. packages.
          </AlertDescription>
        </Alert>
      </div>
    </ComplexCard>
  );
};
