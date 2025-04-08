import { PackageVlnDetails } from "@/lib/ovs";
import { VulnerabilityCard } from "../components/vulnerability-card";

type DirectVulnerabilitiesProps = {
  vulnerabilities: PackageVlnDetails[];
};

export const DirectVulnerabilities = ({ vulnerabilities }: DirectVulnerabilitiesProps) => {
  const hasDirectVulnerabilities =
    vulnerabilities &&
    vulnerabilities[0] &&
    vulnerabilities[0].vlns &&
    vulnerabilities[0].vlns.length;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <h3 className="mt-6 text-xl font-semibold"> Direct Security Vulnerabilities </h3>
        <p className="text-sm text-gray-500"> Vulnerabilities found directly inside the package </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {!hasDirectVulnerabilities ? (
          <p> The package doesnt have any direct vulnerability </p>
        ) : (
          vulnerabilities[0].vlns.map((vln) => (
            <VulnerabilityCard key={vln.id} vulnerability={vln} />
          ))
        )}
      </div>
    </div>
  );
};
