import PackageDashboard from "@/components/package-dashboard/package-dashboard";
import { PackagVersions } from "@/components/package-versions/package-versions";
import { PackageVersionSpecificPage } from "@/components/pages/package-versions-specific-page";
import { extractPackageFromUrl } from "@/utils";
import { getPackageData } from "@/utils/getPackageData";

type PageProps = { params: Promise<{ package_name: string[] }> };

export default async function Page({ params }: PageProps) {
  const { package_name } = await params;

  if (!package_name?.length || !package_name[0].trim().length) {
    return <div>Redirect to home</div>;
  }

  const packageFromUrl = extractPackageFromUrl(package_name);

  if (!packageFromUrl) return <div>Redirect to home</div>;

  const { packageName, versionsPath, section, version } = packageFromUrl;

  if (!packageName) {
    return <div>Redirect to home</div>;
  }

  const packageData = await getPackageData(packageName);

  if (!version && versionsPath === "versions") {
    return (
      <PackagVersions
        versions={packageData.stableVersions}
        orderedVersionNumbers={packageData.stableVersionNumbers}
      />
    );
  } else if (!version && versionsPath && versionsPath !== "versions") {
    return <div> 404 </div>;
  } else if (!version && !versionsPath) {
    return <PackageDashboard packageName={packageName} metadata={packageData} />;
  }

  if (version && !section) {
    return <PackageVersionSpecificPage packageName={packageName} />;
  }

  if (!section) {
    return (
      <div>
        Version Specific Package Info {packageName} version {version}
      </div>
    );
  }

  return (
    <div>
      Package specific version & section {packageName} version {version} section {section}
    </div>
  );
}
