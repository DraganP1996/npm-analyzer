"use client";

import { ColumnDef } from "@tanstack/react-table";

import { SearchResultHeader } from "./header";
import { NpmSearchResult } from "@/types";

export const columns: ColumnDef<NpmSearchResult>[] = [
  {
    accessorKey: "package.name",
    header: () => <SearchResultHeader> Name </SearchResultHeader>,
  },
  {
    accessorKey: "package.version",
    header: () => <SearchResultHeader> Last Version </SearchResultHeader>,
  },
  {
    accessorKey: "package.date",
    header: () => <SearchResultHeader> Last update </SearchResultHeader>,
  },
];
