import { AppShell } from "@/components/layout/app-shell";
import { BookingTableSkeleton } from "@/features/bookings/components/booking-table-skeleton";

export default function Loading() {
  return (
    <AppShell title="Booking Details" eyebrow="Booking Details">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="h-9 w-36 rounded bg-white/[0.07]" />
        <div className="h-40 rounded-xl border border-white/10 bg-white/[0.04]" />
        <BookingTableSkeleton />
      </div>
    </AppShell>
  );
}
