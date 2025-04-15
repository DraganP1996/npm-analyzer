"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Badge } from "../../ui/badge";
import { NpmPackageVersion } from "@/types/package-metadata";
import { formatBytes } from "@/utils";
import { VersionCell } from "./version-cell";

export const versionColumns: ColumnDef<NpmPackageVersion>[] = [
  {
    accessorKey: "version",
    header: "Version",
    meta: {
      className: "w-[auto] font-semibold",
    },
    cell: ({ cell }) => {
      const value = cell.getValue() as string;
      return (
        <div className="px-2">
          <Badge variant="default"> {value} </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "dependencies",
    header: "Dependencies",
    cell: ({ cell, table, row }) => {
      const value = cell.getValue() as Record<string, string>;
      const currentRowDependenciesNumber = Object.keys(value || {}).length;

      const allRows = table.getCoreRowModel().rows;
      const rowIdx = row.index;
      const isTheFirstRow = rowIdx === allRows.length - 1;

      const previousRow = isTheFirstRow ? undefined : allRows[rowIdx + 1];
      const prevRowDependenciesNumber = previousRow
        ? Object.keys(previousRow?.original?.dependencies || {}).length
        : undefined;

      return (
        <VersionCell
          currentValue={currentRowDependenciesNumber}
          previousValue={prevRowDependenciesNumber}
          positiveDiffClassName="text-red-600 p-[2px] rounded shadow border border-red-600"
          negativeDiffClassName="text-green-600 p-[2px] rounded shadow border border-green-600"
        />
      );
    },
  },
  {
    accessorKey: "devDependencies",
    header: "Dev Dependencies",
    cell: ({ cell, row, table }) => {
      const value = cell.getValue() as Record<string, string>;
      const currentRowDependenciesNumber = Object.keys(value || {}).length;

      const allRows = table.getCoreRowModel().rows;
      const rowIdx = row.index;
      const isTheFirstRow = rowIdx === allRows.length - 1;

      const previousRow = isTheFirstRow ? undefined : allRows[rowIdx + 1];
      const prevRowDependenciesNumber = previousRow
        ? Object.keys(previousRow?.original?.devDependencies || {}).length
        : undefined;

      return (
        <VersionCell
          currentValue={currentRowDependenciesNumber}
          previousValue={prevRowDependenciesNumber}
          positiveDiffClassName="text-red-600 p-[2px] rounded shadow border border-red-600"
          negativeDiffClassName="text-green-600 p-[2px] rounded shadow border border-green-600"
        />
      );
    },
  },
  {
    accessorKey: "peerDependencies",
    header: "Peer Dependencies",
    cell: ({ cell, row, table }) => {
      const value = cell.getValue() as Record<string, string>;
      const currentRowDependenciesNumber = Object.keys(value || {}).length;

      const allRows = table.getCoreRowModel().rows;
      const rowIdx = row.index;
      const isTheFirstRow = rowIdx === allRows.length - 1;

      const previousRow = isTheFirstRow ? undefined : allRows[rowIdx + 1];
      const prevRowDependenciesNumber = Object.keys(
        previousRow?.original?.peerDependencies || {}
      ).length;

      return (
        <VersionCell
          currentValue={currentRowDependenciesNumber}
          previousValue={prevRowDependenciesNumber}
          positiveDiffClassName="text-red-600 p-[2px] rounded shadow border border-red-600"
          negativeDiffClassName="text-green-600 p-[2px] rounded shadow border border-green-600"
        />
      );
    },
  },
  {
    accessorKey: "dist.fileCount",
    header: "Distributed Files",
    cell: ({ cell, row, table }) => {
      const value = cell.getValue() as number | undefined;

      const allRows = table.getCoreRowModel().rows;
      const rowIdx = row.index;
      const isTheFirstRow = rowIdx === allRows.length - 1;

      const previousRow = isTheFirstRow ? undefined : allRows[rowIdx + 1];
      const prevRowFileCount = previousRow ? previousRow.original.dist.fileCount : undefined;

      return (
        <VersionCell
          currentValue={value}
          previousValue={prevRowFileCount}
          positiveDiffClassName="text-red-600 p-[2px] rounded shadow border border-red-600"
          negativeDiffClassName="text-green-600 p-[2px] rounded shadow border border-green-600"
        />
      );
    },
  },
  {
    accessorKey: "dist.unpackedSize",
    header: "Unpacked Size",
    cell: ({ cell, row, table }) => {
      const value = cell.getValue() as number | undefined;

      const allRows = table.getCoreRowModel().rows;
      const rowIdx = row.index;
      const isTheFirstRow = rowIdx === allRows.length - 1;

      const previousRow = isTheFirstRow ? undefined : allRows[rowIdx + 1];
      const prevRowFileCount = previousRow ? previousRow.original.dist.unpackedSize : undefined;

      return (
        <VersionCell
          currentValue={value}
          previousValue={prevRowFileCount}
          positiveDiffClassName="text-red-600 p-[2px] rounded shadow border border-red-600"
          negativeDiffClassName="text-green-600 p-[2px] rounded shadow border border-green-600"
          formatValue={(value) => formatBytes(value, 1)}
          tooltipContent={value ? formatBytes(value) : ""}
        />
      );
    },
  },
  {
    header: "Details",
    cell: ({ row }) => {
      const packageName = row.original.name;
      const version = row.original.version;

      return (
        <Link
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}/versions/${version}`}
          className="flex justify-end text-gray-500"
          prefetch={false}
        >
          <ChevronRight width={18} height={18} />
        </Link>
      );
    },
  },
];
