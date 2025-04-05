import { formatDistance, subDays } from "date-fns";

import { SectionHeader, ReleaseFrequencyCard } from "../components";
import { SimpleCard } from "../../ui/simple-card";

type VersionsOverviewProps = {
  versions: string[];
  history: Record<string, string>;
  lastVersion: string;
  packageName: string;
};

export const VersionsOverview = ({
  versions,
  history,
  packageName,
  lastVersion,
}: VersionsOverviewProps) => {
  const lastVersionReleaseTime = formatDistance(
    subDays(new Date(history[lastVersion]), 3),
    new Date(),
    {
      addSuffix: true,
    }
  );

  return (
    <div className="flex flex-col gap-2">
      <SectionHeader>
        <h2 className="text-3xl font-semibold"> Versions Overview</h2>
      </SectionHeader>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <SimpleCard title="Last Version">{lastVersion}</SimpleCard>
          <SimpleCard title="Last Version Released">{lastVersionReleaseTime}</SimpleCard>
          <SimpleCard title="N. of Versions">{versions.length}</SimpleCard>
        </div>
        <ReleaseFrequencyCard history={history} packageName={packageName} />
      </div>
    </div>
  );
};
