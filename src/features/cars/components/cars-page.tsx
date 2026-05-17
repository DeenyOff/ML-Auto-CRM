"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CarMobileCard } from "@/features/cars/components/car-mobile-card";
import { VehicleForm } from "@/features/cars/components/vehicle-form";
import { useCarsTable } from "@/features/cars/hooks/use-cars-table";
import type { Car, CarServiceStatus } from "@/features/cars/types/car";
import type { Client } from "@/features/clients/types/client";
import { createCar, type CreateCarInput } from "@/services/cars/getCars";

const statuses: Array<"all" | CarServiceStatus> = [
  "all",
  "Ready",
  "In service",
  "Scheduled",
  "Follow-up",
];

type CarsPageProps = {
  cars: Car[];
  clients: Client[];
};

export function CarsPage({ cars, clients }: CarsPageProps) {
  const router = useRouter();
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
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

  function handleAddVehicleOpenChange(open: boolean) {
    setIsAddVehicleOpen(open);
    setCreateError(null);
  }

  async function handleCreateVehicle(values: CreateCarInput) {
    setIsCreating(true);
    setCreateError(null);

    try {
      await createCar(values);
      handleAddVehicleOpenChange(false);
      router.refresh();
    } catch (error) {
      setCreateError(
        error instanceof Error
          ? error.message
          : "Unable to create vehicle. Please try again.",
      );
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <AppShell title="Cars" eyebrow="Vehicle Registry">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <Card>
          <CardHeader className="gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle className="text-base text-white">
                  Vehicle Directory
                </CardTitle>
                <p className="mt-1 text-sm text-zinc-500">
                  Click a row to open the vehicle profile.
                </p>
              </div>
              <Button onClick={() => handleAddVehicleOpenChange(true)}>
                Add Vehicle
              </Button>
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
      <Dialog open={isAddVehicleOpen} onOpenChange={handleAddVehicleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Vehicle</DialogTitle>
            <DialogDescription>
              Create a new vehicle record and link it to an existing client.
            </DialogDescription>
          </DialogHeader>
          <VehicleForm
            clients={clients}
            error={createError}
            isSubmitting={isCreating}
            onCancel={() => handleAddVehicleOpenChange(false)}
            onSubmit={handleCreateVehicle}
          />
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
