import { PackageIcon } from "lucide-react";

import { PageContainer } from "../layout/page-container";
import { BreadCrumbNavigation } from "../ui/breadcrumb-navigation";

type PackageVersionSpecificPageProps = {
  packageName: string;
};

export const PackageVersionSpecificPage = ({ packageName }: PackageVersionSpecificPageProps) => {
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
      title: "12.1.2",
      href: "",
    },
  ];
  return (
    <PageContainer>
      <BreadCrumbNavigation items={breadcrumbNavigationItems} />
      <h1 className="font-bold text-3xl"> Version Details </h1>
      <div className="flex flex-row items-center gap-1 text-xl font-semibold">
        <PackageIcon /> <h2>{packageName} </h2>
      </div>
    </PageContainer>
  );
};
