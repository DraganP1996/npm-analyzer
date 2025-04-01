import semver from "semver";

export const filterStableVersions = (versions: string[]) => {
  return versions
    .filter((v) => /^\d+\.\d+\.\d+$/.test(v))
    .filter((v) => semver.valid(v))
    .sort(semver.rcompare);
};
