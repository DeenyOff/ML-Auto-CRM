"use client";

import { useRouter } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import { DataTable } from "@/components/table/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookingMobileCard } from "@/features/bookings/components/booking-mobile-card";
import { bookings } from "@/features/bookings/data/bookings";
import {
  type BookingDateFilter,
  type BookingStatusFilter,
  useBookingsTable,
} from "@/features/bookings/hooks/use-bookings-table";
import type { Booking } from "@/features/bookings/types/booking";

const statuses: BookingStatusFilter[] = [
  "all",
  "New",
  "Confirmed",
  "In Progress",
  "Waiting",
  "Completed",
  "Delivered",
  "Cancelled",
];

const dateFilters: Array<{
  label: string;
  value: BookingDateFilter;
}> = [
  { label: "All dates", value: "all" },
  { label: "Today", value: "today" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Past", value: "past" },
];

export function BookingsPage() {
  const router = useRouter();
  const {
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
  } = useBookingsTable(bookings);

  const activeBookings = bookings.filter(
    (booking) =>
      !["Delivered", "Completed", "Cancelled"].includes(booking.status),
  ).length;

  return (
    <AppShell title="Bookings" eyebrow="Service Jobs">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-red-400">
              ML Auto workshop schedule
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Bookings
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-500">
              Track every booking and service job across clients, vehicles,
              employees, dates, prices, and operational status.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                Jobs
              </p>
              <p className="mt-1 text-2xl font-semibold text-white">
                {bookings.length}
              </p>
            </div>
            <div className="rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-red-300">
                Active
              </p>
              <p className="mt-1 text-2xl font-semibold text-white">
                {activeBookings}
              </p>
            </div>
          </div>
        </section>

        <Card>
          <CardHeader className="gap-4">
            <div>
              <CardTitle className="text-base text-white">
                Booking Directory
              </CardTitle>
              <p className="mt-1 text-sm text-zinc-500">
                Click a row to open booking details.
              </p>
            </div>
            <div className="grid gap-3 xl:grid-cols-[1fr_160px_150px_190px]">
              <Input
                value={globalFilter}
                onChange={(event) => setGlobalFilter(event.target.value)}
                placeholder="Search client, vehicle, VIN, or booking ID..."
                aria-label="Search bookings"
              />
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as BookingStatusFilter)
                }
                className="h-10 rounded-lg border border-white/10 bg-[#111] px-3 text-sm text-white outline-none transition-colors focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20"
                aria-label="Filter by booking status"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === "all" ? "All statuses" : status}
                  </option>
                ))}
              </select>
              <select
                value={dateFilter}
                onChange={(event) =>
                  setDateFilter(event.target.value as BookingDateFilter)
                }
                className="h-10 rounded-lg border border-white/10 bg-[#111] px-3 text-sm text-white outline-none transition-colors focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20"
                aria-label="Filter by booking date"
              >
                {dateFilters.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
              <select
                value={employeeFilter}
                onChange={(event) => setEmployeeFilter(event.target.value)}
                className="h-10 rounded-lg border border-white/10 bg-[#111] px-3 text-sm text-white outline-none transition-colors focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20"
                aria-label="Filter by assigned employee"
              >
                <option value="all">All employees</option>
                {employees.map((employee) => (
                  <option key={employee} value={employee}>
                    {employee}
                  </option>
                ))}
              </select>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <DataTable
              table={table}
              emptyTitle="No bookings found"
              emptyDescription="Adjust search or filters to find matching ML Auto service jobs."
              getRowHref={(booking) => `/bookings/${booking.id}`}
              onRowClick={(booking) => router.push(`/bookings/${booking.id}`)}
              renderMobileCard={(booking) => (
                <BookingMobileCard booking={booking as Booking} />
              )}
            />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
