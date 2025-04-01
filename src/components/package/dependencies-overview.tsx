import { DependenciesCard } from "./depencies-card";
import { SectionHeader } from "./section-header";

type DependenciesOverviewProps = {
  packageName: string;
  deps?: Record<string, string>;
  peerDeps?: Record<string, string>;
  devDeps?: Record<string, string>;
};

export const DependenciesOverview = ({
  packageName,
  deps,
  peerDeps,
  devDeps,
}: DependenciesOverviewProps) => {
  return (
    <div className="flex flex-col gap-2">
      <SectionHeader>
        <h2 className="text-3xl font-semibold"> Dependencies Overview</h2>
      </SectionHeader>
      <div className="flex flex-row gap-2">
        <DependenciesCard
          title="Dependencies"
          description={`Packages used by the ${packageName} package`}
          dependencies={deps}
        />
        <DependenciesCard
          title="Peer Dependencies"
          description={`Packages required by the ${packageName} package`}
          dependencies={peerDeps}
        />
        <DependenciesCard
          title="Dev Dependencies"
          description={`Packages for the development the ${packageName} package`}
          dependencies={devDeps}
        />
      </div>
    </div>
  );
};
