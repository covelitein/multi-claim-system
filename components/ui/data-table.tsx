"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "@gravity-ui/icons";
import { cn } from "@heroui/react";
import { useMemo } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  enablePagination?: boolean;
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
  emptyContent?: React.ReactNode;
  pageSize?: number;
}

function getVisiblePages(current: number, total: number) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: Array<number | "ellipsis"> = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) pages.push("ellipsis");
  for (let page = start; page <= end; page += 1) pages.push(page);
  if (end < total - 1) pages.push("ellipsis");
  pages.push(total);

  return pages;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  enablePagination = false,
  globalFilter,
  onGlobalFilterChange,
  emptyContent = "No results found.",
  pageSize = 8,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...(enablePagination && { getPaginationRowModel: getPaginationRowModel() }),
    initialState: enablePagination
      ? { pagination: { pageSize, pageIndex: 0 } }
      : undefined,
    state: {
      ...(globalFilter !== undefined && { globalFilter }),
    },
    onGlobalFilterChange: onGlobalFilterChange,
  });

  const pageCount = table.getPageCount();
  const pageIndex = table.getState().pagination.pageIndex;
  const currentPage = pageIndex + 1;
  const visiblePages = useMemo(
    () => getVisiblePages(currentPage, pageCount),
    [currentPage, pageCount],
  );

  const from =
    data.length === 0 ? 0 : pageIndex * table.getState().pagination.pageSize + 1;
  const to = Math.min(
    (pageIndex + 1) * table.getState().pagination.pageSize,
    data.length,
  );

  return (
    <div className="flex w-full flex-col">
      <div className="w-full overflow-x-auto bg-transparent p-0">
        <table className="w-full min-w-max table-auto border-collapse text-left text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="group/row">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="whitespace-nowrap border-b border-separator bg-transparent px-3 py-3 font-medium text-muted first:pl-5 last:pr-5"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  className="py-10 text-center text-muted"
                  colSpan={columns.length}
                >
                  {emptyContent}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="group/row border-b border-separator/50 transition-colors last:border-0 hover:bg-surface-secondary/40"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-3 py-3.5 align-middle first:pl-5 last:pr-5"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {enablePagination && pageCount > 0 ? (
        <div className="flex w-full flex-col gap-4 border-t border-separator px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            Showing{" "}
            <span className="font-medium text-foreground">
              {from}–{to}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">{data.length}</span>
          </p>

          <nav
            aria-label="Table pagination"
            className="flex w-full flex-wrap items-center justify-center gap-1.5 sm:w-auto sm:justify-end"
          >
            <button
              aria-label="Previous page"
              className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:bg-surface-secondary hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!table.getCanPreviousPage()}
              type="button"
              onClick={() => table.previousPage()}
            >
              <ChevronLeft className="size-4" />
            </button>

            {visiblePages.map((page, index) =>
              page === "ellipsis" ? (
                <span
                  key={`ellipsis-${index}`}
                  className="inline-flex size-10 items-center justify-center text-sm text-muted"
                >
                  …
                </span>
              ) : (
                <button
                  key={page}
                  aria-current={page === currentPage ? "page" : undefined}
                  className={cn(
                    "inline-flex size-10 items-center justify-center rounded-xl text-sm font-medium transition-colors",
                    page === currentPage
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "border border-border text-foreground hover:bg-surface-secondary",
                  )}
                  type="button"
                  onClick={() => table.setPageIndex(page - 1)}
                >
                  {page}
                </button>
              ),
            )}

            <button
              aria-label="Next page"
              className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:bg-surface-secondary hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!table.getCanNextPage()}
              type="button"
              onClick={() => table.nextPage()}
            >
              <ChevronRight className="size-4" />
            </button>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
