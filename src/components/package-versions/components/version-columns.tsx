"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "../../ui/badge";
import { NpmPackageVersion } from "@/types/package-metadata";
import { formatBytes, getPercentualDifference } from "@/utils";
import { ChevronRight, TrendingDown, TrendingUp } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
      const allRows = table.getCoreRowModel().rows;
      const rowIdx = row.index;
      const currentRowDependenciesNumber = Object.keys(value || {}).length;
      const isTheFirstRow = rowIdx === allRows.length - 1;

      if (isTheFirstRow) {
        return <div className="text-right px-2">{currentRowDependenciesNumber}</div>;
      }

      const previousRow = allRows[rowIdx + 1];
      const prevRowDependenciesNumber = Object.keys(
        previousRow?.original?.dependencies || {}
      ).length;
      const percentageDiff = getPercentualDifference(
        currentRowDependenciesNumber,
        prevRowDependenciesNumber
      );

      const percentageSpan =
        percentageDiff !== 0 ? (
          <span
            className={cn(
              percentageDiff > 0 ? "text-red-600" : "text-green-600",
              "flex flex-row items-center gap-1 text-xs font-semibold"
            )}
          >
            {percentageDiff ? `${percentageDiff.toFixed(1)}%` : ""}{" "}
            {percentageDiff > 0 ? (
              <TrendingUp width={18} height={18} />
            ) : (
              <TrendingDown width={18} height={18} />
            )}
          </span>
        ) : undefined;

      return (
        <div className={cn("text-right px-2")}>
          <div className="flex flex-row items-center justify-end gap-4">
            {percentageSpan}
            {currentRowDependenciesNumber}
          </div>
        </div>
      );
    },
    meta: {
      className: "w-[220px]",
    },
  },
  {
    accessorKey: "devDependencies",
    header: "Dev Dependencies",
    cell: ({ cell, row, table }) => {
      const value = cell.getValue() as Record<string, string>;
      const allRows = table.getCoreRowModel().rows;
      const rowIdx = row.index;
      const currentRowDependenciesNumber = Object.keys(value || {}).length;
      const isTheFirstRow = rowIdx === allRows.length - 1;

      if (isTheFirstRow) {
        return <div className="text-right px-2">{currentRowDependenciesNumber}</div>;
      }

      const previousRow = allRows[rowIdx + 1];
      const prevRowDependenciesNumber = Object.keys(
        previousRow?.original?.devDependencies || {}
      ).length;
      const percentageDiff = getPercentualDifference(
        currentRowDependenciesNumber,
        prevRowDependenciesNumber
      );

      const percentageSpan =
        percentageDiff !== 0 ? (
          <span
            className={cn(
              percentageDiff > 0 ? "text-red-600" : "text-green-600",
              "flex flex-row items-center gap-1 text-xs font-semibold"
            )}
          >
            {percentageDiff ? `${percentageDiff.toFixed(1)}%` : ""}{" "}
            {percentageDiff > 0 ? (
              <TrendingUp width={18} height={18} />
            ) : (
              <TrendingDown width={18} height={18} />
            )}
          </span>
        ) : undefined;

      return (
        <div className={cn("text-right px-2")}>
          <div className="flex flex-row items-center justify-end gap-4">
            {percentageSpan}
            {currentRowDependenciesNumber}
          </div>
        </div>
      );
    },
    meta: {
      className: "w-[220px]",
    },
  },
  {
    accessorKey: "peerDependencies",
    header: "Peer Dependencies",
    cell: ({ cell, row, table }) => {
      const value = cell.getValue() as Record<string, string>;
      const allRows = table.getCoreRowModel().rows;
      const rowIdx = row.index;
      const currentRowDependenciesNumber = Object.keys(value || {}).length;
      const isTheFirstRow = rowIdx === allRows.length - 1;

      if (isTheFirstRow) {
        return <div className="text-right px-2">{currentRowDependenciesNumber}</div>;
      }

      const previousRow = allRows[rowIdx + 1];
      const prevRowDependenciesNumber = Object.keys(
        previousRow?.original?.peerDependencies || {}
      ).length;
      const percentageDiff = getPercentualDifference(
        currentRowDependenciesNumber,
        prevRowDependenciesNumber
      );

      const percentageSpan =
        percentageDiff !== 0 ? (
          <span
            className={cn(
              percentageDiff > 0 ? "text-red-600" : "text-green-600",
              "flex flex-row items-center gap-1 text-xs font-semibold"
            )}
          >
            {percentageDiff ? `${percentageDiff.toFixed(1)}%` : ""}{" "}
            {percentageDiff > 0 ? (
              <TrendingUp width={18} height={18} />
            ) : (
              <TrendingDown width={18} height={18} />
            )}
          </span>
        ) : undefined;

      return (
        <div className={cn("text-right px-2")}>
          <div className="flex flex-row items-center justify-end gap-4">
            {percentageSpan}
            {currentRowDependenciesNumber}
          </div>
        </div>
      );
    },
    meta: {
      className: "w-[220px]",
    },
  },
  {
    accessorKey: "dist.fileCount",
    header: "Distributed Files",
    cell: ({ cell, row, table }) => {
      const value = cell.getValue() as number | undefined;

      if (value === undefined) {
        return <div className="text-right px-2">N/A</div>;
      }

      const allRows = table.getCoreRowModel().rows;
      const rowIdx = row.index;
      const isTheFirstRow = rowIdx === allRows.length - 1;

      if (isTheFirstRow) {
        return <div className="text-right px-2">{value}</div>;
      }

      const previousRow = allRows[rowIdx + 1];
      const prevRowFileCount = previousRow.original.dist.fileCount;

      if (prevRowFileCount === undefined) {
        return <div className="text-right px-2">{value}</div>;
      }

      const percentageDiff = getPercentualDifference(value, prevRowFileCount);

      const percentageSpan =
        percentageDiff !== 0 ? (
          <span
            className={cn(
              percentageDiff > 0 ? "text-red-600" : "text-green-600",
              "flex flex-row items-center gap-1 text-xs font-semibold"
            )}
          >
            {percentageDiff ? `${percentageDiff.toFixed(2)}%` : ""}{" "}
            {percentageDiff > 0 ? (
              <TrendingUp width={18} height={18} />
            ) : (
              <TrendingDown width={18} height={18} />
            )}
          </span>
        ) : undefined;

      return (
        <div className={cn("text-right px-2")}>
          <div className="flex flex-row items-center justify-end gap-4">
            {percentageSpan}
            {value}
          </div>
        </div>
      );
    },
    meta: {
      className: "w-[220px]",
    },
  },
  {
    accessorKey: "dist.unpackedSize",
    header: "Unpacked Size",
    cell: ({ cell, row, table }) => {
      const value = cell.getValue() as number | undefined;

      if (value === undefined) {
        return <div className="text-right px-2">N/A</div>;
      }

      const allRows = table.getCoreRowModel().rows;
      const rowIdx = row.index;
      const isTheFirstRow = rowIdx === allRows.length - 1;
      const formattedValue = formatBytes(value);

      if (isTheFirstRow) {
        return <div className="text-right px-2">{formattedValue}</div>;
      }

      const previousRow = allRows[rowIdx + 1];
      const prevRowFileCount = previousRow.original.dist.unpackedSize;

      if (prevRowFileCount === undefined) {
        return <div className="text-right px-2">{formattedValue}</div>;
      }

      const percentageDiff = getPercentualDifference(value, prevRowFileCount);

      const percentageSpan =
        percentageDiff !== 0 ? (
          <span
            className={cn(
              percentageDiff > 0 ? "text-red-600" : "text-green-600",
              "flex flex-row items-center gap-1 text-xs font-semibold"
            )}
          >
            {percentageDiff ? `${percentageDiff.toFixed(3)}%` : ""}{" "}
            {percentageDiff > 0 ? (
              <TrendingUp width={18} height={18} />
            ) : (
              <TrendingDown width={18} height={18} />
            )}
          </span>
        ) : undefined;

      return (
        <div className={cn("text-right px-2")}>
          <div className="flex flex-row items-center justify-end gap-4">
            {percentageSpan}
            {formattedValue}
          </div>
        </div>
      );
    },
    meta: {
      className: "w-[220px]",
    },
  },
  {
    header: "Details",
    cell: ({ row }) => {
      console.log("ROW");
      const packageName = row.original.name;
      const version = row.original.version;

      return (
        <Link
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/package/${packageName}/versions/${version}`}
          className="flex justify-end text-gray-500"
        >
          <ChevronRight />
        </Link>
      );
    },
  },
];
