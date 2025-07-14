import { CACHE_TAGS } from "@/consts";
import { getOrSet } from "../redis";
import { sendPropmpt } from "./generatePrompt";
import { VersionVulnerabilityCounter } from "@/components/package-dashboard/sections";

export const generateSecurityVulnerabilities = async (
  packageName: string,
  securityData: VersionVulnerabilityCounter[]
) => {
  const prompt = `This is the data about the number security vulnerabilties of the npm package ${packageName} for specific versions of the library: ${JSON.stringify(
    securityData
  )}. Pleaese provide a description of MAX 50 words. Respond with the summary only.`;
  return getOrSet(`${CACHE_TAGS.aiPackageSecuritySummary}:${packageName}`, 365 * 24 * 60 * 60, () =>
    sendPropmpt(prompt)
  );
};
