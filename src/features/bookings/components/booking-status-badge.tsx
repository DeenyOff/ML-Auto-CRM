import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { BookingStatus } from "@/features/bookings/types/booking";

type BookingStatusBadgeProps = {
  status: BookingStatus;
  className?: string;
};

const statusClasses: Record<BookingStatus, string> = {
  New: "border-sky-500/30 bg-sky-500/10 text-sky-200",
  Confirmed: "border-indigo-500/30 bg-indigo-500/10 text-indigo-200",
  "In Progress": "border-red-500/30 bg-red-500/10 text-red-200",
  Waiting: "border-amber-500/30 bg-amber-500/10 text-amber-200",
  Completed: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
  Delivered: "border-zinc-400/30 bg-white/[0.05] text-zinc-200",
  Cancelled: "border-zinc-700 bg-zinc-900/80 text-zinc-500",
};

export function BookingStatusBadge({
  status,
  className,
}: BookingStatusBadgeProps) {
  return (
    <Badge className={cn(statusClasses[status], className)}>{status}</Badge>
  );
}
