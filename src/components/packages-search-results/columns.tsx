"use client";

import { ColumnDef } from "@tanstack/react-table";

import { SearchResultHeader } from "./header";
import { NpmSearchResult } from "@/types";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { formatDistance, subDays } from "date-fns";

export const columns: ColumnDef<NpmSearchResult>[] = [
  {
    accessorKey: "package.name",
    header: () => (
      <SearchResultHeader className="w-[auto] font-semibold">
        {" "}
        <strong className="font-semibold">Name </strong>{" "}
      </SearchResultHeader>
    ),
    meta: {
      className: "w-[auto] font-semibold",
    },
  },
  {
    accessorKey: "package.version",
    header: () => <SearchResultHeader className="w-[220px]"> Version </SearchResultHeader>,
    cell: ({ cell }) => {
      const value = cell.getValue() as string;
      return (
        <div className="">
          {" "}
          <Badge variant="default"> {value} </Badge>{" "}
        </div>
      );
    },
    meta: {
      className: "w-[220px]",
    },
  },
  {
    accessorKey: "downloads.monthly",
    header: () => <SearchResultHeader className=""> Monthly downloads </SearchResultHeader>,
    cell: ({ cell }) => {
      const value = cell.getValue() as number;
      const formattedValue = Intl.NumberFormat("en", { notation: "compact" }).format(value);

      return formattedValue;
    },
  },
  {
    accessorKey: "package.date",
    header: () => <SearchResultHeader className="w-[220px]"> Last update </SearchResultHeader>,
    cell: ({ cell }) => {
      const value = cell.getValue() as string;
      const formattedDate = formatDistance(subDays(new Date(value), 3), new Date(), {
        addSuffix: true,
      });

      return <div className="italic"> {formattedDate} </div>;
    },
    meta: {
      className: "w-[220px]",
    },
  },
  {
    id: "actions",
    cell: () => {
      return (
        <div className="">
          <Button className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight />
          </Button>
        </div>
      );
    },
    meta: {
      className: "w-[220px] text-right",
    },
  },
];
