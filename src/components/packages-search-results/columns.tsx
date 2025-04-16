"use client";

import { formatDistance, subDays } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { NpmSearchResult } from "@/types";
import { Badge } from "../ui/badge";
import { compactNumberFormatter } from "@/utils";

export const columns: ColumnDef<NpmSearchResult>[] = [
  {
    accessorKey: "package.name",
    header: "Name",
  },
  {
    accessorKey: "package.version",
    header: "Version",
    cell: ({ cell }) => {
      const value = cell.getValue() as string;
      return <Badge variant="default"> {value} </Badge>;
    },
  },
  {
    accessorKey: "downloads.monthly",
    header: "Monthly downloads",
    cell: ({ cell }) => {
      const value = cell.getValue() as number;
      const formattedValue = compactNumberFormatter(value);

      return formattedValue;
    },
  },
  {
    accessorKey: "package.date",
    header: "Last update",
    cell: ({ cell }) => {
      const value = cell.getValue() as string;
      const formattedDate = formatDistance(subDays(new Date(value), 3), new Date(), {
        addSuffix: true,
      });

      return <div className="italic"> {formattedDate} </div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const packageName = row.original.package.name;

      return (
        <Link
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}`}
          className="flex justify-end text-gray-500"
          prefetch={false}
        >
          <ChevronRight width={18} height={18} />
        </Link>
      );
    },
  },
];
