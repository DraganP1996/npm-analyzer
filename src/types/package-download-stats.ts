export type PackageDownloadResponse = {
  start: string;
  end: string;
  package: string;
  downloads: DownloadDay[];
};

export type DownloadDay = {
  downloads: number;
  day: string;
};

export type DownloadMonth = {
  month: string;
  downloads: number;
};
