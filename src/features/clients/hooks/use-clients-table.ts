"use client";

import { useMemo, useState } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";

import { clientColumns } from "@/features/clients/components/client-table-columns";
import type { Client, ClientVipStatus } from "@/features/clients/types/client";

type VipFilter = "all" | ClientVipStatus;

export function useClientsTable(data: Client[]) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [vipFilter, setVipFilter] = useState<VipFilter>("all");
  const [sorting, setSorting] = useState<SortingState>([
    { id: "lastVisit", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const filteredData = useMemo(() => {
    if (vipFilter === "all") {
      return data;
    }

    return data.filter((client) => client.vipStatus === vipFilter);
  }, [data, vipFilter]);

  const table = useReactTable({
    data: filteredData,
    columns: clientColumns,
    state: {
      globalFilter,
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: (row, _columnId, filterValue) => {
      const search = String(filterValue).toLowerCase();
      const client = row.original;

      return [
        client.name,
        client.phone,
        client.vipStatus,
        client.cars.join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(search);
    },
  });

  return {
    table,
    globalFilter,
    setGlobalFilter,
    vipFilter,
    setVipFilter,
  };
}
