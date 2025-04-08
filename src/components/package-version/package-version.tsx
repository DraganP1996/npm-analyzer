import { Fragment } from "react";
import { TriangleAlertIcon } from "lucide-react";

import { PageContainer } from "../layout/page-container";
import { BreadCrumbNavigation } from "../ui/breadcrumb-navigation";
import { NpmPackageVersion } from "@/types/package-metadata";
import { getTransitiveDependenies } from "@/lib";
import { getVlnsForMultiplePkgs } from "@/lib/ovs";
import { Badge } from "../ui/badge";
import { DirectVulnerabilities } from "./sections";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { cn } from "@/lib/utils";
import { CACHE_TAGS } from "@/consts";

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

  const ovsData = await getVlnsForMultiplePkgs(
    `${CACHE_TAGS.ovsIncludingTransitive}:${packageName}@${version.version}`,
    [version, ...transitiveDependencies]
  );

  const directVlns = ovsData.filter((ovsItem) => ovsItem.packageName === packageName);

  console.log("Check ovs data", ovsData);

  return (
    <PageContainer>
      <BreadCrumbNavigation items={breadcrumbNavigationItems} />

      <h1 className="font-bold text-3xl">Version Details</h1>

      <div className="flex flex-row items-center justify-between ">
        <div className="flex flex-row items-center text-xl font-semibold gap-1">
          <span className="text-2xl">📦</span> <h2>{packageName}</h2>
        </div>
        <Badge> {version.version} </Badge>
      </div>

      <Tabs defaultValue="allVulnerabilities" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="allVulnerabilities" className="cursor-pointer">
            <h3 className="text-lg">All Vulnerabilities</h3>
          </TabsTrigger>
          <TabsTrigger value="transitiveDependencies" className="cursor-pointer">
            <h3 className="text-lg">Transitive Dependencies</h3>
          </TabsTrigger>
          <TabsTrigger value="package" className="cursor-pointer">
            <h3 className="text-lg">Package</h3>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="allVulnerabilities">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <h3 className="mt-6 text-xl font-semibold"> All Security Vulnerabilities </h3>
              <p className="text-sm text-gray-500">
                All the vulnerabilities related to the version {version.version} of the package
              </p>
            </div>
            <Accordion
              type="multiple"
              className="flex flex-col gap-2"
              defaultValue={ovsData
                .map((vln) => vln.vlns.map((vlnInner) => vlnInner.id).flat())
                .flat()}
            >
              {ovsData.map((packageVln) => (
                <Fragment key={packageVln.packageName}>
                  {packageVln.vlns.map((vln) => (
                    <AccordionItem
                      value={vln.id}
                      key={vln.id}
                      className="shadow-sm rounded-t-md rounded-b-xs w-full"
                    >
                      <AccordionTrigger className="p-4 cursor-pointer bg-muted rounded-b-xs flex items-center w-full">
                        <div className="flex flex-row flex-1 items-center justify-between">
                          <div className="flex flex-col">
                            <div className="text-lg font-semibold">
                              {" "}
                              {packageVln.packageName}@{packageVln.version}
                            </div>
                            <span className="text-xs text-gray-500"> {vln.id} </span>
                          </div>
                          <div
                            className={cn(
                              "flex flex-row gap-1 items-center font-bold",
                              vln.severity &&
                                vln.severity.score &&
                                (vln.severity?.score as number) >= 9
                                ? "text-red-800"
                                : "",
                              vln.severity &&
                                vln.severity.score &&
                                (vln.severity?.score as number) >= 7 &&
                                (vln.severity?.score as number) < 9
                                ? "text-red-600"
                                : "",
                              vln.severity &&
                                vln.severity.score &&
                                (vln.severity?.score as number) >= 4 &&
                                (vln.severity?.score as number) < 7
                                ? "text-orange-400"
                                : "",
                              vln.severity &&
                                vln.severity.score &&
                                (vln.severity?.score as number) >= 0 &&
                                (vln.severity?.score as number) < 4
                                ? "text-yellow-400"
                                : ""
                            )}
                          >
                            {" "}
                            <TriangleAlertIcon /> {vln.severity?.score || "N/A"}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="p-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col">
                            <span className="text font-semibold"> Summary: </span>
                            <p className="leading-5 line-clamp-6">{vln.summary}</p>
                          </div>
                          <div className="flex flex-col">
                            <span className="text font-semibold"> Details: </span>
                            <p className="leading-4 line-clamp-6">{vln.details}</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Fragment>
              ))}
            </Accordion>
          </div>
        </TabsContent>
        <TabsContent value="transitiveDependencies">Change your password here.</TabsContent>
        <TabsContent value="package">
          <DirectVulnerabilities vulnerabilities={directVlns} />{" "}
        </TabsContent>
      </Tabs>

      {/* <DirectVulnerabilities vulnerabilities={directVlns} /> */}

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
