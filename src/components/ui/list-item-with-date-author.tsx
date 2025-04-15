import Link from "next/link";
import { formatDistance, subDays } from "date-fns";

import { Avatar, AvatarImage } from "./avatar";
import { cn } from "@/lib/utils";

type ListWithDateAuthorProps = {
  url: string;
  text: string;
  avatarUrl?: string;
  authorName?: string;
  authorLink?: string;
  date: string;
};

export const ListItemWithDateAuthor = ({
  url,
  text,
  authorLink,
  avatarUrl,
  authorName,
  date,
}: ListWithDateAuthorProps) => {
  const formattedDate = formatDistance(subDays(new Date(date), 3), new Date(), {
    addSuffix: true,
  });
  const hideAuthor = !authorLink || !authorName || !avatarUrl;

  return (
    <div className="p-2 hover:bg-blue-200/50 cursor-pointer rounded hover:shadow flex flex-col gap-2">
      <Link
        href={url}
        className="leading-5 break-all text-sm line-clamp-3 w-full"
        target="_blank"
        prefetch={false}
      >
        {text}
      </Link>
      <div
        className={cn(
          "flex flex-row items-center text-xs text-gray-600",
          hideAuthor ? "justify-end" : "justify-between"
        )}
      >
        {!hideAuthor && (
          <Link
            href={authorLink}
            className="flex flex-row gap-1 items-center"
            target="_blank"
            prefetch={false}
          >
            <Avatar>
              <AvatarImage src={avatarUrl} />
            </Avatar>
            <span> {authorName} </span>
          </Link>
        )}
        <div className="">{formattedDate}</div>
      </div>
    </div>
  );
};
