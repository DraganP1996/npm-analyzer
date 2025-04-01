import { formatDistance, subDays } from "date-fns";
import { SectionHeader } from "./section-header";
import { ValueCard } from "./value-card";
import { ReleaseFrequencyCard } from "./release-frequency-card";

type VersionsOverviewProps = {
  versions: string[];
  history: Record<string, string>;
};

export const VersionsOverview = ({ versions, history }: VersionsOverviewProps) => {
  const lastVersion = versions[0];
  const lastVersionReleaseTime = formatDistance(
    subDays(new Date(history[lastVersion]), 3),
    new Date(),
    {
      addSuffix: true,
    }
  );
  Object.keys(history)
    .filter((version) => !versions.includes(version))
    .forEach((version) => delete history[version]);

  return (
    <div className="flex flex-col gap-2">
      <SectionHeader>
        <h2 className="text-3xl font-semibold"> Versions Overview</h2>
      </SectionHeader>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <ValueCard title="Last Version">{lastVersion}</ValueCard>
          <ValueCard title="Last Version Released">{lastVersionReleaseTime}</ValueCard>
          <ValueCard title="N. of Versions">{versions.length}</ValueCard>
        </div>
        <ReleaseFrequencyCard history={history} />
      </div>
    </div>
  );
};
