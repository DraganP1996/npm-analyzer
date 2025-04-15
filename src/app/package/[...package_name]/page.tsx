import { Suspense } from "react";

import PackageDashboard from "@/components/package-dashboard/package-dashboard";
import { PackagVersions } from "@/components/package-versions/package-versions";
import { PackageVersion } from "@/components/package-version/package-version";
import { extractPackageFromUrl } from "@/utils";
import { DashboardSkeleton } from "@/components/package-dashboard/skeletons/dashboard-skeleton";

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

  if (!version && versionsPath === "versions") {
    return <PackagVersions packageName={packageName} />;
  } else if (!version && versionsPath && versionsPath !== "versions") {
    return <div> 404 </div>;
  } else if (!version && !versionsPath) {
    return (
      <Suspense fallback={<DashboardSkeleton />}>
        <PackageDashboard packageName={packageName} />
      </Suspense>
    );
  }

  if (version && !section) {
    return <PackageVersion version={version} packageName={packageName} />;
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
