type UrlExtractedPackageInfo = {
  packageName: string;
  versionsPath: string;
  section: string;
  version: string;
};

export const extractPackageFromUrl = (
  packageNameFromUrl: string[]
): UrlExtractedPackageInfo | undefined => {
  const decodedPackageName = decodeURIComponent(packageNameFromUrl[0]);
  const isScoped = decodedPackageName?.startsWith("@");

  if (isScoped && !packageNameFromUrl[1]) {
    return undefined;
  }

  const packageName = isScoped
    ? `${decodedPackageName}/${packageNameFromUrl[1]}`
    : packageNameFromUrl[0];
  const versionsPath = isScoped ? packageNameFromUrl[2] : packageNameFromUrl[1];
  const version = isScoped ? packageNameFromUrl[3] : packageNameFromUrl[2];
  const section = isScoped ? packageNameFromUrl[4] : packageNameFromUrl[3];

  return {
    packageName,
    versionsPath,
    section,
    version,
  };
};
