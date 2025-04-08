import { SeverityDef } from ".";

export const prioritizeSeverityType = (severityData: SeverityDef[]): SeverityDef | undefined => {
  const priority = ["CVSS_V4", "CVSS_V3.1", "CVSS_V3", "CVSS_V2"];

  for (const preferredType of priority) {
    const match = severityData.find((s) => s.type === preferredType);
    if (match) return match;
  }

  return undefined;
};
