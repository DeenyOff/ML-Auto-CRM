"use client";

import type { Table as ReactTable } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DataTableProps<TData> = {
  table: ReactTable<TData>;
  emptyTitle: string;
  emptyDescription: string;
  getRowHref?: (row: TData) => string;
  onRowClick?: (row: TData) => void;
  renderMobileCard?: (row: TData) => React.ReactNode;
};

export function DataTable<TData>({
  table,
  emptyTitle,
  emptyDescription,
  getRowHref,
  onRowClick,
  renderMobileCard,
}: DataTableProps<TData>) {
  const rows = table.getRowModel().rows;

  if (!rows.length) {
    return (
      <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.03] px-6 py-14 text-center">
        <h2 className="text-base font-semibold text-white">{emptyTitle}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
          {emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-xl border border-white/10 md:block">
        <div className="max-h-[620px] overflow-auto">
          <table className="w-full min-w-[820px] border-collapse text-left text-sm">
            <thead className="sticky top-0 z-10 bg-[#101010]/95 text-xs uppercase tracking-[0.18em] text-zinc-500 backdrop-blur">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border-b border-white/10 px-4 py-4 font-medium"
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
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    "border-b border-white/10 transition-colors duration-200 last:border-b-0 hover:bg-red-500/[0.04]",
                    onRowClick && "cursor-pointer",
                  )}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-4 text-zinc-300">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-3 md:hidden">
        {rows.map((row) => {
          const href = getRowHref?.(row.original);

          return (
            <button
              key={row.id}
              className="w-full rounded-xl border border-white/10 bg-zinc-950/80 p-4 text-left transition-colors duration-200 hover:border-red-500/40 hover:bg-red-500/[0.04]"
              onClick={() => onRowClick?.(row.original)}
              aria-label={href ? `Open ${href}` : "Open row"}
            >
              {renderMobileCard?.(row.original)}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-zinc-500">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
