import { PageContainer } from "../layout/page-container";
import { BreadCrumbNavigation } from "../ui/breadcrumb-navigation";
import { getPackage } from "@/lib";
import { Badge } from "../ui/badge";
import { VersionsCompare, VulnerabilityDetails } from "./sections";

type PackageVersionSpecificPageProps = {
  version: string;
  packageName: string;
};

export const PackageVersion = async ({ version, packageName }: PackageVersionSpecificPageProps) => {
  const metadata = await getPackage(packageName);
  const versionMetadata = metadata.stableVersions[version];
  const breadcrumbNavigationItems = [
    {
      title: packageName,
      href: `${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}`,
    },
    {
      title: "Versions",
      href: `${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}/versions`,
    },
    {
      title: versionMetadata.version,
      href: "",
    },
  ];

  const versions = metadata.stableVersions;

  return (
    <PageContainer className="pb-2">
      <BreadCrumbNavigation items={breadcrumbNavigationItems} />

      <h1 className="font-bold text-2xl lg:text-3xl">Version Details</h1>

      <div className="flex flex-row items-center justify-between ">
        <div className="flex flex-row items-center text-lg lg:text-xl font-semibold gap-1">
          <span className="text:xl lg:text-2xl">📦</span> <h2>{packageName}</h2>
        </div>
        <Badge> {versionMetadata.version} </Badge>
      </div>
      <VersionsCompare currVersion={version} versions={versions} />
      <h2 className="font-bold text-xl lg:text-2xl"> Security Vulnerabilities </h2>
      <VulnerabilityDetails packageName={packageName} packageMetadata={versionMetadata} />
      {/* <h3 className="mt-6 text-lg font-semibold">Transitive Dependencies</h3> */}
      {/* <ul className="list-disc pl-6 text-base">
        {transitiveDependencies.map((dep) => (
          <li key={`${dep.name}@${dep.version}`}>
            {dep.name}@{dep.version}
          </li>
        ))}
      </ul> */}
    </PageContainer>
  );
};
