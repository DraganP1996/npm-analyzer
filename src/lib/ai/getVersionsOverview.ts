import { CACHE_TAGS } from "@/consts";
import { getOrSet } from "../redis";
import { sendPropmpt } from "./generatePrompt";
import { NpmPackageVersion } from "@/types";

export const getOverallVersionsSummary = async (
  packageName: string,
  releases: NpmPackageVersion[]
) => {
  const prompt = `This is the data about all the versions of the npm package ${packageName}: ${JSON.stringify(
    releases
  )}. Pleaese provide a description of MIN 150 words and MAX 300 words trying to focus on the versions. Respond with the summary only keeping in mind that SEO optimization and readability should be our primary focus.`;
  return getOrSet(`${CACHE_TAGS.aiOverallVersionsSummary}:${packageName}`, 30 * 24 * 60 * 60, () =>
    sendPropmpt(prompt)
  );
};
