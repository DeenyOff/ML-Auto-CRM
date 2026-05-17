import {
  currencyFormatter,
  dateTimeFormatter,
} from "@/features/bookings/components/booking-formatters";
import { BookingStatusBadge } from "@/features/bookings/components/booking-status-badge";
import type { Booking } from "@/features/bookings/types/booking";

type BookingMobileCardProps = {
  booking: Booking;
};

export function BookingMobileCard({ booking }: BookingMobileCardProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs font-medium text-red-300">
            {booking.bookingId}
          </p>
          <h2 className="mt-1 font-semibold text-white">{booking.client}</h2>
          <p className="mt-1 text-sm text-zinc-500">{booking.vehicle}</p>
        </div>
        <BookingStatusBadge status={booking.status} />
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
            Service
          </p>
          <p className="mt-1 text-zinc-200">{booking.service}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
            Employee
          </p>
          <p className="mt-1 text-zinc-200">{booking.assignedEmployee}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
            Date
          </p>
          <p className="mt-1 text-zinc-200">
            {dateTimeFormatter.format(new Date(booking.date))}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
            Price
          </p>
          <p className="mt-1 font-medium text-white">
            {currencyFormatter.format(booking.price)}
          </p>
        </div>
      </div>

      <p className="break-all font-mono text-xs text-zinc-500">
        {booking.vin}
      </p>
    </div>
  );
}
