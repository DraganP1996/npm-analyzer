import { CACHE_TAGS } from "@/consts";
import { getOrSet } from "../redis";
import { sendPropmpt } from "./generatePrompt";
import { NpmPackageVersion } from "@/types";

export const getSpecificVersionSummary = async (
  packageName: string,
  version: NpmPackageVersion,
  prevVersion: NpmPackageVersion
) => {
  const prompt = `This is the data about a specific version of the npm package ${packageName}: ${JSON.stringify(
    version
  )}. And this is about the previous stable version of the same package ${JSON.stringify(
    prevVersion
  )} Please provide a description of min 150 and max 300 words trying to focus on the differences between the 2 versions and the interesting stuff for developers that want to use the library. Respond with the summary without titles only and focus on readibility and SEO.`;
  return getOrSet(
    `${CACHE_TAGS.aiSpecificVersionSummary}:${packageName}:${version.version}`,
    365 * 24 * 60 * 60,
    () => sendPropmpt(prompt)
  );
};
