import { calculateBaseScore } from "cvss4";

import { SeverityDef, prioritizeSeverityType } from ".";

export const extractSeverityData = (severityData?: SeverityDef[]): SeverityDef | undefined => {
  if (!severityData || !severityData.length) return;

  const severityPrioritized = prioritizeSeverityType(severityData);

  if (!severityPrioritized) return;

  return {
    type: severityPrioritized.type,
    score: calculateBaseScore(`${severityPrioritized.score}`),
  };
};
