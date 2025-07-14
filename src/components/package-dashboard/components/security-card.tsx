import { ChevronRight, Terminal } from "lucide-react";

import { ChartConfig } from "@/components/ui/chart";
import { VersionVulnerabilityCounter } from "../sections";
import { ComplexCard } from "@/components/ui/complex-card";
import { SecurityChart } from "./security-chart";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CardLink } from "@/components/ui/card-link";

type SecurityChartProps = {
  config: ChartConfig;
  data: VersionVulnerabilityCounter[];
  packageName: string;
  stableVersion: string;
  summary?: string;
};

export const SecurityCard = ({
  config,
  data,
  packageName,
  stableVersion,
  summary,
}: SecurityChartProps) => {
  return (
    <ComplexCard
      title="Vulnerabilities Tracker"
      description="Historycal data about package vulnerabilities across all the stable versions"
      showInfoIcon
      contentClassName="max-h-[380px]"
    >
      <SecurityChart config={config} data={data} />
      {summary && (
        <div className="flex flex-col gap-2">
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>
              <h3>Vulnerabilites Summary</h3>
            </AlertTitle>
            <AlertDescription className="leading-4">{summary}</AlertDescription>
          </Alert>
          <div className="flex flex-row items-center justify-end">
            <CardLink
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}/versions/${stableVersion}`}
            >
              Complete Security Overview <ChevronRight width={16} height={16} />
            </CardLink>
          </div>
        </div>
      )}
    </ComplexCard>
  );
};
