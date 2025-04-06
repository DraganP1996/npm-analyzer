import { PageContainer } from "../layout/page-container";
import { BreadCrumbNavigation } from "../ui/breadcrumb-navigation";
import { NpmPackageVersion } from "@/types/package-metadata";
import { getTransitiveDependenies } from "@/lib";

type PackageVersionSpecificPageProps = {
  version: NpmPackageVersion;
  packageName: string;
};

export const PackageVersion = async ({ version, packageName }: PackageVersionSpecificPageProps) => {
  const breadcrumbNavigationItems = [
    {
      title: packageName,
      href: `${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}`,
    },
    {
      title: "versions",
      href: `${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}/versions`,
    },
    {
      title: version.version,
      href: "",
    },
  ];

  const topLevelDeps = {
    ...version.dependencies,
  };

  const transitiveDependencies = await getTransitiveDependenies(topLevelDeps);

  console.log("Check the transitive deps", transitiveDependencies);

  return (
    <PageContainer>
      <BreadCrumbNavigation items={breadcrumbNavigationItems} />

      <h1 className="font-bold text-3xl">Version Details</h1>

      <div className="flex flex-row items-center gap-1 text-xl font-semibold">
        <span className="text-2xl">📦</span> <h2>{packageName}</h2>
      </div>

      <h3 className="mt-6 text-lg font-semibold">Transitive Dependencies</h3>
      <ul className="list-disc pl-6 text-base">
        {transitiveDependencies.map((dep) => (
          <li key={`${dep.name}@${dep.version}`}>
            {dep.name}@{dep.version}
          </li>
        ))}
      </ul>
    </PageContainer>
  );
};
