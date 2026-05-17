"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Car, CarServiceStatus } from "@/features/cars/types/car";
import {
  dateFormatter,
  mileageFormatter,
} from "@/features/cars/components/car-formatters";

const statusVariant: Record<CarServiceStatus, "default" | "success" | "muted"> =
  {
    Ready: "success",
    "In service": "default",
    Scheduled: "muted",
    "Follow-up": "default",
  };

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

export const carColumns: ColumnDef<Car>[] = [
  {
    accessorKey: "brand",
    header: ({ column }) => (
      <SortButton
        label="Brand"
        sorted={column.getIsSorted()}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-white">{row.original.brand}</p>
        <p className="text-xs text-zinc-500">{row.original.color}</p>
      </div>
    ),
  },
  {
    accessorKey: "model",
    header: ({ column }) => (
      <SortButton
        label="Model"
        sorted={column.getIsSorted()}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <span className="font-medium text-zinc-100">{row.original.model}</span>
    ),
  },
  {
    accessorKey: "year",
    header: ({ column }) => (
      <SortButton
        label="Year"
        sorted={column.getIsSorted()}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
  },
  {
    accessorKey: "vin",
    header: "VIN",
    cell: ({ row }) => (
      <span className="font-mono text-xs text-zinc-300">
        {row.original.vin}
      </span>
    ),
  },
  {
    accessorKey: "plateNumber",
    header: "Plate number",
    cell: ({ row }) => (
      <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-xs text-zinc-100">
        {row.original.plateNumber}
      </span>
    ),
  },
  {
    accessorKey: "owner",
    header: ({ column }) => (
      <SortButton
        label="Owner"
        sorted={column.getIsSorted()}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <div>
        <p className="whitespace-nowrap text-zinc-100">{row.original.owner}</p>
        <Badge variant={statusVariant[row.original.status]} className="mt-1">
          {row.original.status}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "mileage",
    header: ({ column }) => (
      <SortButton
        label="Mileage"
        sorted={column.getIsSorted()}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <span>{mileageFormatter.format(row.original.mileage)} km</span>
    ),
  },
  {
    accessorKey: "lastServiceDate",
    header: ({ column }) => (
      <SortButton
        label="Last service"
        sorted={column.getIsSorted()}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {dateFormatter.format(new Date(row.original.lastServiceDate))}
      </span>
    ),
  },
];
