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

import { bookingColumns } from "@/features/bookings/components/booking-table-columns";
import type {
  Booking,
  BookingStatus,
} from "@/features/bookings/types/booking";

export type BookingStatusFilter = "all" | BookingStatus;
export type BookingDateFilter = "all" | "today" | "upcoming" | "past";
export type BookingEmployeeFilter = "all" | string;

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function useBookingsTable(data: Booking[]) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<BookingStatusFilter>("all");
  const [dateFilter, setDateFilter] = useState<BookingDateFilter>("all");
  const [employeeFilter, setEmployeeFilter] =
    useState<BookingEmployeeFilter>("all");
  const [sorting, setSorting] = useState<SortingState>([
    { id: "date", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const employees = useMemo(() => {
    return Array.from(new Set(data.map((booking) => booking.assignedEmployee)))
      .sort((a, b) => a.localeCompare(b));
  }, [data]);

  const filteredData = useMemo(() => {
    const today = new Date();

    return data.filter((booking) => {
      const bookingDate = new Date(booking.date);
      const matchesStatus =
        statusFilter === "all" || booking.status === statusFilter;
      const matchesEmployee =
        employeeFilter === "all" ||
        booking.assignedEmployee === employeeFilter;
      const matchesDate =
        dateFilter === "all" ||
        (dateFilter === "today" && isSameDay(bookingDate, today)) ||
        (dateFilter === "upcoming" && bookingDate > today) ||
        (dateFilter === "past" && bookingDate < today);

      return matchesStatus && matchesEmployee && matchesDate;
    });
  }, [data, dateFilter, employeeFilter, statusFilter]);

  const table = useReactTable({
    data: filteredData,
    columns: bookingColumns,
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
      const booking = row.original;

      return [
        booking.client,
        booking.vehicle,
        booking.vin,
        booking.bookingId,
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
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    employeeFilter,
    setEmployeeFilter,
    employees,
  };
}
