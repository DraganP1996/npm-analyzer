import { NpmPackageVersion } from "@/types/package-metadata";

export type NpmFormattedMetadata = {
  latestVersion: NpmPackageVersion;
  repositoryUrl?: string;
  stableVersions: Record<string, NpmPackageVersion>;
  stableVersionNumbers: string[];
  time: { [key: string]: string };
  license: string;
  author?: {
    name: string;
    email?: string;
    url?: string;
  };
  description?: string;
};
