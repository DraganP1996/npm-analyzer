import { StickyNoteIcon } from "lucide-react";

type CardNoDataProps = {
  content: string;
};

export const CardNoData = ({ content }: CardNoDataProps) => {
  return (
    <div className="flex flex-col justify-center items-center flex-1 text-xs w-full h-full gap-2">
      <StickyNoteIcon color="#8d94a0bf" width={64} height={64} strokeWidth={1} />
      <div className="max-w-[240px] text-gray-500">{content}</div>
    </div>
  );
};
