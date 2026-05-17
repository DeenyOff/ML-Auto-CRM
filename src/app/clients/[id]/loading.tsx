import { AppShell } from "@/components/layout/app-shell";
import { ClientsTableSkeleton } from "@/features/clients/components/clients-table-skeleton";

export default function Loading() {
  return (
    <AppShell title="Client Profile" eyebrow="Client Profile">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div className="h-9 w-32 rounded bg-white/[0.07]" />
        <div className="h-44 rounded-xl border border-white/10 bg-white/[0.04]" />
        <ClientsTableSkeleton />
      </div>
    </AppShell>
  );
}
