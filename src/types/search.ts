export interface NpmSearchApiResponse {
  objects: NpmSearchResult[];
  total: number;
  time: string;
}

export interface NpmSearchResult {
  package: NpmPackageInfo;
  score: NpmScore;
  searchScore: number;
}

export interface NpmPackageInfo {
  name: string;
  version: string;
  description?: string;
  keywords?: string[];
  date: string;
  links: {
    npm?: string;
    homepage?: string;
    repository?: string;
    bugs?: string;
  };
  publisher: {
    username: string;
    email: string;
  };
  maintainers: {
    username: string;
    email: string;
  }[];
}

export interface NpmScore {
  final: number;
  detail: {
    quality: number;
    popularity: number;
    maintenance: number;
  };
}
