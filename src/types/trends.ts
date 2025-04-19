export type TrendsResponseItem = {
  code_of_conduct_url: string;
  contribution_guidelines_url: string;
  contributions_count: number;
  dependent_repos_count: number;
  dependents_count: number;
  deprecation_reason: string | null;
  description: string;
  forks: number;
  funding_urls: unknown[];
  homepage: string;
  keywords: string[];
  language: string;
  latest_download_url: string;
  latest_release_number: string;
  latest_release_published_at: string;
  latest_stable_release_number: string;
  latest_stable_release_published_at: string;
  license_normalized: boolean;
  licenses: string;
  name: string;
  normalized_licenses: string;
  package_manager_url: string;
  platform: string;
  rank: number;
  repository_license: string;
  repository_status: string | null;
  repository_url: string;
  security_policy_url: string;
  stars: number;
  status: string | null;
  versions: {
    number: string;
    published_at: string;
    repository_sources: string[];
    researched_at: string | null;
    spdx_expression: string;
  }[];
};

export type TrendPackage = {
  dependents: number;
  description: string;
  forks: number;
  latestVersion: string;
  name: string;
  rank: number;
  stars: number;
};
