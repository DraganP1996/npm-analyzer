import { Suspense } from "react";

import PackageDashboard, {
  generatePackageDashoardMetadata,
} from "@/components/package-dashboard/package-dashboard";
import { PackageVersions } from "@/components/package-versions/package-versions";
import { PackageVersion } from "@/components/package-version/package-version";
import { extractPackageFromUrl } from "@/utils";
import { DashboardSkeleton } from "@/components/package-dashboard/skeletons/dashboard-skeleton";

type PageProps = { params: Promise<{ package_name: string[] }> };

export const revalidate = 86400;

export async function generateMetadata({ params }: PageProps) {
  const { package_name } = await params;

  if (!package_name?.length || !package_name[0].trim().length) {
    return undefined;
  }

  const packageFromUrl = extractPackageFromUrl(package_name);

  if (!packageFromUrl) return undefined;

  const { packageName, versionsPath, section, version } = packageFromUrl;

  if (!packageName) {
    return undefined;
  }

  if (!version && versionsPath === "versions") {
    return "Versions metadata";
  } else if (!version && versionsPath && versionsPath !== "versions") {
    return undefined;
  } else if (!version && !versionsPath) {
    return generatePackageDashoardMetadata(packageName);
  }

  if (version && !section) {
    return "Version metadata";
  }
}

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
    return <PackageVersions packageName={packageName} />;
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

  return (
    <div>
      Package specific version & section {packageName} version {version} section {section}
    </div>
  );
}
