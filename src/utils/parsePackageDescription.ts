import { marked } from "marked";
import { sanitizeHtmlData } from "./sanitizeHtml";

export const parsePackageDescription = async (desc: string) => {
  console.log("Lets debug here, initial desc", desc);

  const html = await marked(desc);

  console.log("Marked ", html);

  const sanitized = sanitizeHtmlData(html);
  console.log("sanitized ", sanitized);

  return sanitized;
};
