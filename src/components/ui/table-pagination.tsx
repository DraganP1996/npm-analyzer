import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  const pagination = table.getState().pagination;

  const currentPage = pagination.pageIndex + 1;

  return (
    <div className="flex flex-row items-center justify-between text-xs">
      <div className="flex flex-row items-center gap-1">
        {pagination.pageIndex - 1 > 0 && (
          <Button variant="ghost" className="cursor-pointer" onClick={() => table.firstPage()}>
            1
          </Button>
        )}
        {pagination.pageIndex - 1 > 1 && (
          <Button variant="ghost" className="p-0 flex items-center justify-center">
            <Ellipsis width={14} height={14} />
          </Button>
        )}
        {table.getCanPreviousPage() && (
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => table.setPageIndex(pagination.pageIndex - 1)}
          >
            {currentPage - 1}
          </Button>
        )}
        <Button variant="outline" className="cursor-pointer">
          {currentPage}
        </Button>
        {table.getCanNextPage() && (
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => table.setPageIndex(pagination.pageIndex + 1)}
          >
            {currentPage + 1}
          </Button>
        )}
        {pagination.pageIndex + 3 < table.getPageCount() && (
          <Button variant="ghost" className="p-0 flex items-center justify-center">
            <Ellipsis width={14} height={14} />
          </Button>
        )}
        {pagination.pageIndex + 2 < table.getPageCount() && (
          <Button variant="ghost" className="cursor-pointer" onClick={() => table.lastPage()}>
            {table.getPageCount()}
          </Button>
        )}
      </div>
      <div className="flex w-[100px] items-center justify-center text-xs font-medium">
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </div>
    </div>
  );
}
