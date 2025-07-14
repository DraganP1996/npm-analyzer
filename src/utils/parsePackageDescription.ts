import { marked } from "marked";
import { sanitizeHtmlData } from "./sanitizeHtml";

export const parsePackageDescription = async (desc: string) => {
  const html = await marked(desc);
  const sanitized = sanitizeHtmlData(html);

  return sanitized;
};
