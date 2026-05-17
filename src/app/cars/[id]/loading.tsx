import { AppShell } from "@/components/layout/app-shell";
import { CarTableSkeleton } from "@/features/cars/components/car-table-skeleton";

export default function Loading() {
  return (
    <AppShell title="Vehicle Profile" eyebrow="Vehicle Profile">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="h-9 w-28 rounded bg-white/[0.07]" />
        <div className="h-40 rounded-xl border border-white/10 bg-white/[0.04]" />
        <CarTableSkeleton />
      </div>
    </AppShell>
  );
}
