import { AppShell } from "@/components/layout/app-shell";
import { CarTableSkeleton } from "@/features/cars/components/car-table-skeleton";

export default function Loading() {
  return (
    <AppShell title="Cars" eyebrow="Vehicle Registry">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div className="space-y-3">
          <div className="h-4 w-52 rounded bg-red-500/20" />
          <div className="h-9 w-36 rounded bg-white/[0.07]" />
          <div className="h-4 w-full max-w-xl rounded bg-white/[0.07]" />
        </div>
        <CarTableSkeleton />
      </div>
    </AppShell>
  );
}
