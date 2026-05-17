import { AppShell } from "@/components/layout/app-shell";
import { ClientsTableSkeleton } from "@/features/clients/components/clients-table-skeleton";

export default function Loading() {
  return (
    <AppShell title="Clients" eyebrow="Client Management">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div className="space-y-3">
          <div className="h-4 w-44 rounded bg-red-500/20" />
          <div className="h-9 w-48 rounded bg-white/[0.07]" />
          <div className="h-4 w-full max-w-xl rounded bg-white/[0.07]" />
        </div>
        <ClientsTableSkeleton />
      </div>
    </AppShell>
  );
}
