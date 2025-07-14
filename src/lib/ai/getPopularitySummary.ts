import { CACHE_TAGS } from "@/consts";
import { getOrSet } from "../redis";
import { sendPropmpt } from "./generatePrompt";
import { DownloadMonth } from "@/types";

export const getPopularityFrequencySummary = async (
  packageName: string,
  releases: DownloadMonth[]
) => {
  const prompt = `This is the data about the downloads of the npm package ${packageName}: ${JSON.stringify(
    releases
  )}. Pleaese provide a description of around 50 words.Please consider that the last month is the current month so we have no complete data yet. Respond with the summary only.`;
  return getOrSet(`${CACHE_TAGS.aiPopularitySummary}:${packageName}`, 30 * 24 * 60 * 60, () =>
    sendPropmpt(prompt)
  );
};
