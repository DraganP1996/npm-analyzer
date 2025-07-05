// import { ChevronRight, Terminal } from "lucide-react";

// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DependenciesCard, SectionHeader } from "../components";
// import { CardLink } from "@/components/ui/card-link";

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
        <h2 className="text-xl lg:text-3xl font-semibold"> Dependencies Overview</h2>
      </SectionHeader>
      <div className="flex flex-col lg:flex-row gap-2">
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
      {/* <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle className="text-md">Looking for a list of transitive dependencies?</AlertTitle>
        <AlertDescription>
          <p className="text-sm">
            Head over to the version-specific page to find the full list of transitive dependencies
            for the latest version or any other version of the package.
          </p>
          <div className="flex items-center justify-end w-full">
            <CardLink href="">
              <span className="flex flex-row text-sm items-center gap-1">
                All Trasitive Depedencies <ChevronRight width={16} height={16} />
              </span>
            </CardLink>
          </div>
        </AlertDescription>
      </Alert> */}
    </div>
  );
};
