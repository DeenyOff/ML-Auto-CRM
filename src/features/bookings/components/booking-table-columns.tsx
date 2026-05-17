"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  currencyFormatter,
  dateTimeFormatter,
} from "@/features/bookings/components/booking-formatters";
import { BookingStatusBadge } from "@/features/bookings/components/booking-status-badge";
import type { Booking } from "@/features/bookings/types/booking";

function SortButton({
  label,
  onClick,
  sorted,
}: {
  label: string;
  onClick: () => void;
  sorted: false | "asc" | "desc";
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3 h-8 px-3 text-xs uppercase tracking-[0.18em] text-zinc-500 hover:text-white"
      onClick={onClick}
    >
      {label}
      <span className="text-red-400">
        {sorted === "asc" ? "↑" : sorted === "desc" ? "↓" : ""}
      </span>
    </Button>
  );
}

export const bookingColumns: ColumnDef<Booking>[] = [
  {
    accessorKey: "bookingId",
    header: ({ column }) => (
      <SortButton
        label="Booking ID"
        sorted={column.getIsSorted()}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs font-medium text-red-200">
        {row.original.bookingId}
      </span>
    ),
  },
  {
    accessorKey: "client",
    header: ({ column }) => (
      <SortButton
        label="Client"
        sorted={column.getIsSorted()}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <span className="whitespace-nowrap font-medium text-white">
        {row.original.client}
      </span>
    ),
  },
  {
    accessorKey: "vehicle",
    header: ({ column }) => (
      <SortButton
        label="Vehicle"
        sorted={column.getIsSorted()}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-zinc-100">{row.original.vehicle}</p>
        <p className="mt-1 font-mono text-xs text-zinc-500">
          {row.original.plateNumber}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "service",
    header: "Service",
    cell: ({ row }) => (
      <span className="text-zinc-200">{row.original.service}</span>
    ),
  },
  {
    accessorKey: "assignedEmployee",
    header: ({ column }) => (
      <SortButton
        label="Employee"
        sorted={column.getIsSorted()}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <SortButton
        label="Date"
        sorted={column.getIsSorted()}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {dateTimeFormatter.format(new Date(row.original.date))}
      </span>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <SortButton
        label="Price"
        sorted={column.getIsSorted()}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <span className="font-medium text-white">
        {currencyFormatter.format(row.original.price)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <BookingStatusBadge status={row.original.status} />,
  },
];
