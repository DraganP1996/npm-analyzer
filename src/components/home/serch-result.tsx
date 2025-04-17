import Link from "next/link";
import { Badge } from "../ui/badge";
import { compactNumberFormatter, parsePackageDescription } from "@/utils";
import { useEffect, useState } from "react";

type SearchResultProps = {
  packageName: string;
  description?: string;
  version: string;
  dependents: number;
};

export const SearchResult = ({
  packageName,
  description,
  version,
  dependents,
}: SearchResultProps) => {
  const [formattedDesc, setFormattedDesc] = useState("");

  useEffect(() => {
    const parseDescription = async () => {
      const parsedDesc = await parsePackageDescription(description || "");

      setFormattedDesc(parsedDesc);
    };

    parseDescription();
  }, [description]);

  return (
    <Link
      className="p-4 border rounded-xl flex flex-col gap-2 bg-blue-50/30 hover:bg-blue-100"
      href={`${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}`}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xl font-semibold">{packageName}</span>
          <div
            className="leading-4 text-sm text-gray-500 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: formattedDesc }}
          />
        </div>
        <div className="">
          <Badge> {version} </Badge>
        </div>
      </div>
      <p className="text-xs">
        N. of dependent packages:
        <span className="font-semibold">{compactNumberFormatter(dependents)}</span>
      </p>
    </Link>
  );
};
