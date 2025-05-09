import { Fragment } from "react";

import { Accordion } from "@/components/ui/accordion";
import { PackageVlnDetails } from "@/lib/ovs";
import { VulnerabilityItem } from "./vulnerability-item";
import { CardNoData } from "@/components/ui/card-no-data";

type VulnerabilitiesListProps = {
  vulnerabilities: PackageVlnDetails[];
};

export const VulnerabilitiesList = ({ vulnerabilities }: VulnerabilitiesListProps) => {
  const allIds = vulnerabilities
    .map((vln) => vln.vlns.map((vlnInner) => vlnInner.id).flat())
    .flat();

  return (
    <Accordion type="multiple" className="flex flex-col gap-2" defaultValue={allIds}>
      {vulnerabilities.length > 0 &&
        vulnerabilities.map((packageVln) => (
          <Fragment key={packageVln.packageName}>
            {packageVln.vlns.map((vln) => (
              <VulnerabilityItem
                key={vln.id}
                vulnerability={vln}
                packageName={packageVln.packageName}
                packageVersion={packageVln.version}
                showPackageLink
              />
            ))}
          </Fragment>
        ))}
      {vulnerabilities.length === 0 && <CardNoData content="There are not vulnerabilities" />}
    </Accordion>
  );
};
