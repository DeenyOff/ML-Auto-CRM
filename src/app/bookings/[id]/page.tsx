import Link from "next/link";
import { notFound } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  currencyFormatter,
  dateTimeFormatter,
} from "@/features/bookings/components/booking-formatters";
import { BookingStatusBadge } from "@/features/bookings/components/booking-status-badge";
import { bookings } from "@/features/bookings/data/bookings";

type BookingDetailsRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

function DetailTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs uppercase text-zinc-500">{label}</p>
      <p className="mt-2 text-sm font-medium text-white">{value}</p>
    </div>
  );
}

export default async function BookingDetailsRoute({
  params,
}: BookingDetailsRouteProps) {
  const { id } = await params;
  const booking = bookings.find((item) => item.id === id);

  if (!booking) {
    notFound();
  }

  return (
    <AppShell title={booking.bookingId} eyebrow="Booking Details">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <Link href="/bookings">
          <Button variant="outline" size="sm">
            Back to bookings
          </Button>
        </Link>

        <Card className="overflow-hidden border-red-500/20 bg-[linear-gradient(135deg,rgba(24,24,27,0.96),rgba(9,9,11,0.92)),url('https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center">
          <div className="bg-black/55">
            <CardHeader className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <CardTitle className="text-3xl font-semibold text-white">
                    {booking.bookingId}
                  </CardTitle>
                  <p className="mt-2 text-sm text-zinc-300">
                    {booking.client} | {booking.vehicle}
                  </p>
                </div>
                <BookingStatusBadge status={booking.status} />
              </div>
            </CardHeader>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base text-white">
              Service Job
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DetailTile label="Service" value={booking.service} />
            <DetailTile
              label="Employee"
              value={booking.assignedEmployee}
            />
            <DetailTile
              label="Date"
              value={dateTimeFormatter.format(new Date(booking.date))}
            />
            <DetailTile
              label="Price"
              value={currencyFormatter.format(booking.price)}
            />
            <DetailTile label="Bay" value={booking.bay} />
            <DetailTile label="Plate" value={booking.plateNumber} />
            <DetailTile label="VIN" value={booking.vin} />
            <DetailTile label="Notes" value={booking.notes} />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
