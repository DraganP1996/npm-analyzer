import { getTrends } from "@/lib/trends";
import { filterStableVersions } from "@/utils";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const trendingPackages = await getTrends();

  const urls = [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/trends`,
      lastModified: new Date(),
    },
  ];

  trendingPackages.forEach((pkg) => {
    urls.push({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/package/${pkg.name}`,
      lastModified: new Date(),
    });
    urls.push({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/package/${pkg.name}/versions`,
      lastModified: new Date(),
    });
    const packageVersions = filterStableVersions(pkg.versions?.map((v) => v.number) || []);

    packageVersions.forEach((version) => {
      urls.push({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/package/${pkg.name}/versions/${version}`,
        lastModified: new Date(),
      });
    });
  });

  console.log("Number of URLS", urls.length);

  return urls;
}
