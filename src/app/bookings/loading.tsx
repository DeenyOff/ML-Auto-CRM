import { AppShell } from "@/components/layout/app-shell";
import { BookingTableSkeleton } from "@/features/bookings/components/booking-table-skeleton";

export default function Loading() {
  return (
    <AppShell title="Bookings" eyebrow="Service Jobs">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div className="space-y-3">
          <div className="h-4 w-56 rounded bg-red-500/20" />
          <div className="h-9 w-44 rounded bg-white/[0.07]" />
          <div className="h-4 w-full max-w-xl rounded bg-white/[0.07]" />
        </div>
        <BookingTableSkeleton />
      </div>
    </AppShell>
  );
}
