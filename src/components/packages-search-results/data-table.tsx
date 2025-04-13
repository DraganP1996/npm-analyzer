"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "../ui/table-pagination";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (row: Row<TData>) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 50,
      },
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <Table className="table-fixed rounded border">
        <TableHeader className={cn("bg-blue-100/50 rounded")}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="rounded">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={cn(header.column.columnDef.meta?.className)}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="cursor-pointer group p-2"
                onClick={() => onRowClick?.(row)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={cell.column.columnDef.meta?.className}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div>
  );
}
