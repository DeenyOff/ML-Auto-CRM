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

import { carColumns } from "@/features/cars/components/car-table-columns";
import type { Car, CarServiceStatus } from "@/features/cars/types/car";

type StatusFilter = "all" | CarServiceStatus;
type YearFilter = "all" | string;

export function useCarsTable(data: Car[]) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [yearFilter, setYearFilter] = useState<YearFilter>("all");
  const [sorting, setSorting] = useState<SortingState>([
    { id: "lastServiceDate", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const filteredData = useMemo(() => {
    return data.filter((car) => {
      const matchesStatus =
        statusFilter === "all" || car.status === statusFilter;
      const matchesYear = yearFilter === "all" || car.year === Number(yearFilter);

      return matchesStatus && matchesYear;
    });
  }, [data, statusFilter, yearFilter]);

  const table = useReactTable({
    data: filteredData,
    columns: carColumns,
    state: {
      globalFilter,
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 7,
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
      const car = row.original;

      return [car.vin, car.owner, car.brand, car.model, car.plateNumber]
        .join(" ")
        .toLowerCase()
        .includes(search);
    },
  });

  return {
    table,
    globalFilter,
    setGlobalFilter,
    statusFilter,
    setStatusFilter,
    yearFilter,
    setYearFilter,
  };
}
