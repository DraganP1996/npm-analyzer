import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";

type MarkdownProps = {
  content: string;
};

export const Markdown = ({ content }: MarkdownProps) => {
  return <ReactMarkdown> {content} </ReactMarkdown>;
};
