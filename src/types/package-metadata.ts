export interface NpmPackageMetadata {
  _id: string;
  _rev?: string;
  name: string;
  description?: string;
  "dist-tags": {
    [tag: string]: string; // e.g., "latest": "1.0.0"
  };
  versions: {
    [version: string]: NpmPackageVersion;
  };
  time: {
    [key: string]: string; // e.g., created, modified, version publish times
  };
  maintainers?: Array<{
    name: string;
    email?: string;
  }>;
  author?: {
    name: string;
    email?: string;
    url?: string;
  };
  repository?: {
    type: string;
    url: string;
    directory?: string;
  };
  readme?: string;
  readmeFilename?: string;
  license?: string;
  keywords?: string[];
  homepage?: string;
  bugs?: {
    url?: string;
    email?: string;
  };
  users?: {
    [username: string]: boolean;
  };
  contributors?: Array<{
    name: string;
    email?: string;
  }>;
  funding?: string | { type?: string; url: string } | Array<{ type?: string; url: string }>;
}

export interface NpmPackageVersion {
  name: string;
  version: string;
  description?: string;
  dependencies?: {
    [name: string]: string;
  };
  devDependencies?: {
    [name: string]: string;
  };
  peerDependencies?: {
    [name: string]: string;
  };
  optionalDependencies?: {
    [name: string]: string;
  };
  bundledDependencies?: string[];
  license?: string;
  repository?: {
    type: string;
    url: string;
    directory?: string;
  };
  homepage?: string;
  author?: {
    name: string;
    email?: string;
    url?: string;
  };
  funding?: string | { type?: string; url: string } | Array<{ type?: string; url: string }>;
  dist: {
    tarball: string;
    fileCount?: number;
    unpackedSize?: number;
  };
  releaseDate: string;
}
