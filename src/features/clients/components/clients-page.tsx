"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import { DataTable } from "@/components/table/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { dateFormatter } from "@/features/clients/components/client-table-columns";
import { ClientForm } from "@/features/clients/components/client-form";
import { useClientsTable } from "@/features/clients/hooks/use-clients-table";
import type { Client } from "@/features/clients/types/client";
import { createClient, type CreateClientInput } from "@/services/clients/getClients";


function ClientMobileCard({ client }: { client: Client }) {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold text-white">{client.name}</h2>
          <p className="mt-1 text-sm text-zinc-500">{client.phone}</p>
        </div>
        <Badge variant={client.vipStatus === "VIP" ? "default" : "muted"}>
          {client.vipStatus}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
            Cars
          </p>
          <p className="mt-1 text-zinc-200">{client.cars.length}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
            Last visit
          </p>
          <p className="mt-1 text-zinc-200">
            {dateFormatter.format(new Date(client.lastVisit))}
          </p>
        </div>
      </div>

      <p className="line-clamp-2 text-sm text-zinc-400">
        {client.cars.join(", ")}
      </p>
    </div>
  );
}

type ClientsPageProps = {
  clients: Client[];
};

export function ClientsPage({ clients }: ClientsPageProps) {
  const router = useRouter();
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const { table, globalFilter, setGlobalFilter, vipFilter, setVipFilter } =
    useClientsTable(clients);

  function handleAddClientOpenChange(open: boolean) {
    setIsAddClientOpen(open);
    setCreateError(null);
  }

  async function handleCreateClient(values: CreateClientInput) {
    setIsCreating(true);
    setCreateError(null);

    try {
      await createClient(values);
      setIsAddClientOpen(false);
      router.refresh();
    } catch (error) {
      setCreateError(
        error instanceof Error
          ? error.message
          : "Unable to create client. Please try again.",
      );
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <AppShell title="Clients" eyebrow="Client Management">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <Card>
          <CardHeader className="gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle className="text-base text-white">
                  Client Directory
                </CardTitle>
                <p className="mt-1 text-sm text-zinc-500">
                  Click any row to open the client profile.
                </p>
              </div>
              <Button onClick={() => handleAddClientOpenChange(true)}>
                Add Client
              </Button>
            </div>
            <div className="grid gap-3 md:grid-cols-[1fr_220px]">
              <Input
                value={globalFilter}
                onChange={(event) => setGlobalFilter(event.target.value)}
                placeholder="Search by name, phone, car, or status..."
                aria-label="Search clients"
              />
              <select
                value={vipFilter}
                onChange={(event) =>
                  setVipFilter(event.target.value as "all" | "VIP" | "Standard")
                }
                className="h-10 rounded-lg border border-white/10 bg-[#111] px-3 text-sm text-white outline-none transition-colors focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20"
                aria-label="Filter by VIP status"
              >
                <option value="all">All clients</option>
                <option value="VIP">VIP only</option>
                <option value="Standard">Standard only</option>
              </select>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <DataTable
              table={table}
              emptyTitle={clients.length ? "No clients found" : "No clients yet"}
              emptyDescription={
                clients.length
                  ? "Adjust the search query or filter to find matching ML Auto client records."
                  : "Client records from Supabase will appear here once they are added."
              }
              getRowHref={(client) => `/clients/${client.id}`}
              onRowClick={(client) => router.push(`/clients/${client.id}`)}
              renderMobileCard={(client) => (
                <ClientMobileCard client={client as Client} />
              )}
            />
          </CardContent>
        </Card>
      </div>
      <Dialog open={isAddClientOpen} onOpenChange={handleAddClientOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Client</DialogTitle>
            <DialogDescription>
              Create a new ML Auto client record in Supabase.
            </DialogDescription>
          </DialogHeader>
          <ClientForm
            error={createError}
            isSubmitting={isCreating}
            onCancel={() => handleAddClientOpenChange(false)}
            onSubmit={handleCreateClient}
          />
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
