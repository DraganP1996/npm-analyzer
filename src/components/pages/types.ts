import { NpmPackageVersion } from "@/types/package-metadata";

export type NpmFormattedMetadata = {
  latestVersion: string;
  repositoryUrl?: string;
  stableVersions: Record<string, NpmPackageVersion>;
  license: string;
  author?: {
    name: string;
    email?: string;
    url?: string;
  };
  description?: string;
};
