/**
 * Defines the reponse type of the OVS API for a specific
 * Vulnerability id
 */
export type OvsVulnerabiltyDetailsResponse = {
  id: string;
  summary: string;
  details: string;
  modified: string;
  published: string;
  references: {
    type: string;
    url: string;
  }[];
  affected: {
    package: {
      name: string;
      ecosystem: string;
      purl: string;
    };
    ranges: {
      type: string;
      repo?: string;
      events?: Record<string, string>[];
    }[];
  }[];
  severity?: SeverityDef[];
};

export type OsvVulnerability = {
  id: string;
  modified: string;
  summary?: string;
  details?: string;
};

export type OvsVulnerabilties = {
  packageName: string;
  versions: string;
  vulns?: OsvVulnerability[];
};

/**
 * Defines the repsonse type of the OVS batch API
 */
export type OsvBatchResponse = {
  results: OvsVulnerabilties[];
};

export type SeverityDef = {
  type: string;
  score: string | number;
};

export type PackageVulnerabilties = {
  packageName: string;
  version: string;
  vulns: OsvVulnerability[];
};
