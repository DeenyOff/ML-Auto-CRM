"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Client } from "@/features/clients/types/client";

const currencyFormatter = new Intl.NumberFormat("lt-LT", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

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

export const clientColumns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortButton
        label="Client name"
        sorted={column.getIsSorted()}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-white">{row.original.name}</p>
        <p className="text-xs text-zinc-500">{row.original.id}</p>
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-zinc-300">
        {row.original.phone}
      </span>
    ),
  },
  {
    accessorKey: "cars",
    header: "Cars",
    cell: ({ row }) => (
      <div className="max-w-[260px]">
        <p className="truncate text-zinc-200">{row.original.cars.join(", ")}</p>
        <p className="text-xs text-zinc-500">
          {row.original.cars.length} vehicle
          {row.original.cars.length === 1 ? "" : "s"}
        </p>
      </div>
    ),
    sortingFn: (rowA, rowB) =>
      rowA.original.cars.length - rowB.original.cars.length,
  },
  {
    accessorKey: "lastVisit",
    header: ({ column }) => (
      <SortButton
        label="Last visit"
        sorted={column.getIsSorted()}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {dateFormatter.format(new Date(row.original.lastVisit))}
      </span>
    ),
  },
  {
    accessorKey: "totalSpent",
    header: ({ column }) => (
      <SortButton
        label="Total spent"
        sorted={column.getIsSorted()}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <span className="font-medium text-white">
        {currencyFormatter.format(row.original.totalSpent)}
      </span>
    ),
  },
  {
    accessorKey: "vipStatus",
    header: "VIP status",
    cell: ({ row }) => (
      <Badge variant={row.original.vipStatus === "VIP" ? "default" : "muted"}>
        {row.original.vipStatus}
      </Badge>
    ),
  },
];

export { currencyFormatter, dateFormatter };
