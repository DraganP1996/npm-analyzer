import { CACHE_TAGS } from "@/consts";
import { getOrSet } from "../redis";
import { extractSeverityData } from "./extractSeverityData";
import { OsvVulnerability, OvsVulnerabiltyDetailsResponse, SeverityDef } from "./types";

export type VlnDetails = {
  published: string;
  severity?: SeverityDef;
} & OsvVulnerability;

const fetchVlnIdDetails = async (id: string): Promise<VlnDetails> => {
  const vlnResponse = await fetch(`${process.env.OVS_BASE_URL}/vulns/${id}`);

  if (!vlnResponse.ok) {
    console.error(`Failed to fetch: ${vlnResponse.status} ${vlnResponse.statusText}`);
  }

  const vlnData: OvsVulnerabiltyDetailsResponse = await vlnResponse.json();
  const severity: SeverityDef | undefined = extractSeverityData(vlnData.severity);

  return {
    id,
    published: vlnData.published,
    modified: vlnData.modified,
    summary: vlnData.summary,
    details: vlnData.details,
    severity,
  };
};

export const fetchVlnDetailsById = (vlnId: string) =>
  getOrSet<VlnDetails>(`${CACHE_TAGS.specificVulnerability}:${vlnId}`, 7 * 24 * 60 * 60, () =>
    fetchVlnIdDetails(vlnId)
  );
