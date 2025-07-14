import { CACHE_TAGS } from "@/consts";
import { getOrSet } from "../redis";
import { sendPropmpt } from "./generatePrompt";

export const generatePackageSummary = async (packageName: string) => {
  return getOrSet(`${CACHE_TAGS.aiPackageSummary}:${packageName}`, 365 * 24 * 60 * 60, () =>
    sendPropmpt(
      `Npmcheck.com is a web app that provides useful analytics for npm packages. Your goal is to provide a description of MIN 70 words and MAX 100 words for the npm package named ${packageName}. Respond with the description only.`
    )
  );
};
