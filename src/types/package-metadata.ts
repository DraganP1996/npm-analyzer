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
  main?: string;
  types?: string;
  typings?: string;
  scripts?: {
    [script: string]: string;
  };
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
  bin?:
    | string
    | {
        [binName: string]: string;
      };
  directories?: {
    [key: string]: string;
  };
  files?: string[];
  man?: string[];
  engines?: {
    [engine: string]: string;
  };
  os?: string[];
  cpu?: string[];
  license?: string;
  repository?: {
    type: string;
    url: string;
    directory?: string;
  };
  bugs?: {
    url?: string;
    email?: string;
  };
  homepage?: string;
  keywords?: string[];
  author?: {
    name: string;
    email?: string;
    url?: string;
  };
  contributors?: Array<{
    name: string;
    email?: string;
  }>;
  funding?: string | { type?: string; url: string } | Array<{ type?: string; url: string }>;
  dist: {
    integrity?: string;
    shasum: string;
    tarball: string;
    fileCount?: number;
    unpackedSize?: number;
    signatures?: Array<{
      keyid: string;
      sig: string;
    }>;
  };
  _id: string;
  _nodeVersion?: string;
  _npmVersion?: string;
  _npmUser?: {
    name: string;
    email?: string;
  };
  deprecated?: string;
  gitHead?: string;
  sideEffects?: boolean;
  module?: string;
}
