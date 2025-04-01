import PackageGeneralPage from "@/components/pages/package-general-page";

type PageProps = { params: Promise<{ package_name: string[] }> };

export default async function Page({ params }: PageProps) {
  const { package_name } = await params;

  console.log("Has package name lenfth ? ", package_name, package_name.length);

  if (!package_name?.length || !package_name[0].trim().length) {
    return <div>Redirect to home</div>;
  }

  const decodedPackageName = decodeURIComponent(package_name[0]);
  const isScoped = decodedPackageName?.startsWith("@");

  if (isScoped && !package_name[1]) {
    return <div>Redirect to home</div>;
  }

  const packageName = isScoped ? `${decodedPackageName}/${package_name[1]}` : package_name[0];
  const version = isScoped ? package_name[3] : package_name[2];
  const section = isScoped ? package_name[4] : package_name[3];

  if (!packageName) {
    return <div>Redirect to home</div>;
  }

  if (!version) {
    return <PackageGeneralPage packageName={packageName} />;
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
