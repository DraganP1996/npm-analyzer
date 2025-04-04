import { DependenciesCard, SectionHeader } from "../components";

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
          description={`List of dependencies of ${packageName}`}
          dependencies={deps}
        />
        <DependenciesCard
          title="Peer Dependencies"
          description={`List of peer dependencies of ${packageName}`}
          dependencies={peerDeps}
        />
        <DependenciesCard
          title="Dev Dependencies"
          description={`List of dev dependencies of ${packageName} package`}
          dependencies={devDeps}
        />
      </div>
    </div>
  );
};
