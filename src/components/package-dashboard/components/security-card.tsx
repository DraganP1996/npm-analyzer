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
};

export const SecurityCard = ({ config, data, packageName, stableVersion }: SecurityChartProps) => {
  return (
    <ComplexCard
      title="Vulnerabilities Tracker"
      description="Historycal data about package vulnerabilities across all the stable versions"
      showInfoIcon
      contentClassName="max-h-[380px]"
    >
      <SecurityChart config={config} data={data} />
      <div className="flex flex-col gap-2">
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Go to the security page for a complete overview!</AlertTitle>
          <AlertDescription>
            This chart shows only the vulnerabilities directly correlated to the package, to see the
            Vulnerabilities of the transitive dependencies, check the security page.
          </AlertDescription>
        </Alert>
        <div className="flex flex-row items-center justify-end">
          <CardLink
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}/versions/${stableVersion}`}
          >
            Complete Security Overview <ChevronRight width={16} height={16} />
          </CardLink>
        </div>
      </div>
    </ComplexCard>
  );
};
