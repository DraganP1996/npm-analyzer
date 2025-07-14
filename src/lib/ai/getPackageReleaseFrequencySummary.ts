import { CACHE_TAGS } from "@/consts";
import { getOrSet } from "../redis";
import { sendPropmpt } from "./generatePrompt";
import { MonthVersions } from "@/utils";

export const getPackageReleaseFrequencySummary = async (
  packageName: string,
  releases: MonthVersions[]
) => {
  const prompt = `This is the data about the release frequency of the npm package ${packageName}: ${JSON.stringify(
    releases
  )}. Pleaese provide a description of MAX 80 words. Respond with the summary only.`;
  return getOrSet(`${CACHE_TAGS.aiReleaseFrequencySummary}:${packageName}`, 30 * 24 * 60 * 60, () =>
    sendPropmpt(prompt)
  );
};
