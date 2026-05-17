"use client";

import { useRouter } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import { DataTable } from "@/components/table/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CarMobileCard } from "@/features/cars/components/car-mobile-card";
import { useCarsTable } from "@/features/cars/hooks/use-cars-table";
import type { Car, CarServiceStatus } from "@/features/cars/types/car";

const statuses: Array<"all" | CarServiceStatus> = [
  "all",
  "Ready",
  "In service",
  "Scheduled",
  "Follow-up",
];

type CarsPageProps = {
  cars: Car[];
};

export function CarsPage({ cars }: CarsPageProps) {
  const router = useRouter();
  const years = [
    "all",
    ...Array.from(new Set(cars.map((car) => String(car.year)))).sort(
      (yearA, yearB) => Number(yearB) - Number(yearA),
    ),
  ];
  const {
    table,
    globalFilter,
    setGlobalFilter,
    statusFilter,
    setStatusFilter,
    yearFilter,
    setYearFilter,
  } = useCarsTable(cars);

  return (
    <AppShell title="Cars" eyebrow="Vehicle Registry">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-red-400">
              ML Auto serviced vehicles
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Cars
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-500">
              Search and manage every vehicle serviced by ML Auto with VIN,
              plate, owner, mileage, and service status.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              Vehicles
            </p>
            <p className="mt-1 text-2xl font-semibold text-white">
              {cars.length}
            </p>
          </div>
        </section>

        <Card>
          <CardHeader className="gap-4">
            <div>
              <CardTitle className="text-base text-white">
                Vehicle Directory
              </CardTitle>
              <p className="mt-1 text-sm text-zinc-500">
                Click a row to open the vehicle profile.
              </p>
            </div>
            <div className="grid gap-3 lg:grid-cols-[1fr_180px_160px]">
              <Input
                value={globalFilter}
                onChange={(event) => setGlobalFilter(event.target.value)}
                placeholder="Search VIN, owner, brand, model, or plate..."
                aria-label="Search cars"
              />
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as "all" | CarServiceStatus)
                }
                className="h-10 rounded-lg border border-white/10 bg-[#111] px-3 text-sm text-white outline-none transition-colors focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20"
                aria-label="Filter by service status"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === "all" ? "All statuses" : status}
                  </option>
                ))}
              </select>
              <select
                value={yearFilter}
                onChange={(event) =>
                  setYearFilter(event.target.value)
                }
                className="h-10 rounded-lg border border-white/10 bg-[#111] px-3 text-sm text-white outline-none transition-colors focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20"
                aria-label="Filter by vehicle year"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year === "all" ? "All years" : year}
                  </option>
                ))}
              </select>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <DataTable
              table={table}
              emptyTitle={cars.length ? "No vehicles found" : "No vehicles yet"}
              emptyDescription={
                cars.length
                  ? "Adjust search or filters to find matching ML Auto vehicle records."
                  : "Vehicle records from Supabase will appear here once they are added."
              }
              getRowHref={(car) => `/cars/${car.id}`}
              onRowClick={(car) => router.push(`/cars/${car.id}`)}
              renderMobileCard={(car) => <CarMobileCard car={car as Car} />}
            />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
