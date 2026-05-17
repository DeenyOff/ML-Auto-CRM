"use client";

import { useRouter } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import { DataTable } from "@/components/table/data-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { clients } from "@/features/clients/data/clients";
import { dateFormatter } from "@/features/clients/components/client-table-columns";
import { useClientsTable } from "@/features/clients/hooks/use-clients-table";
// import type { Client } from "@/features/clients/types/client";
import { useEffect, useState } from "react";
import { getClients } from "@/services/clients/getClients";
import {Client} from "@/features/clients/types/client";


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

export function ClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClients() {
      try {
        const data = await getClients();

        const formattedClients: Client[] = (data || []).map((client) => ({
          id: client.id,
          name: client.full_name,
          phone: client.phone || "",
          cars: [],
          lastVisit: client.last_visit || new Date().toISOString(),
          totalSpent: client.total_spent || 0,
          vipStatus: client.vip_status ? "VIP" : "Standard",
        }));

        setClients(formattedClients);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadClients();
  }, []);
  const { table, globalFilter, setGlobalFilter, vipFilter, setVipFilter } =
    useClientsTable(clients);

  if (loading) {
    return (
        <AppShell title="Clients" eyebrow="Client Management">
          <div className="p-6 text-white">Loading...</div>
        </AppShell>
    );
  }

  return (
    <AppShell title="Clients" eyebrow="Client Management">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-red-400">
              ML Auto database
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Clients
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-500">
              Search, filter, and manage client relationships across premium
              detailing services.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              Total records
            </p>
            <p className="mt-1 text-2xl font-semibold text-white">
              {clients.length}
            </p>
          </div>
        </section>

        <Card>
          <CardHeader className="gap-4">
            <div>
              <CardTitle className="text-base text-white">
                Client Directory
              </CardTitle>
              <p className="mt-1 text-sm text-zinc-500">
                Click any row to open the client profile.
              </p>
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
              emptyTitle="No clients found"
              emptyDescription="Adjust the search query or filter to find matching ML Auto client records."
              getRowHref={(client) => `/clients/${client.id}`}
              onRowClick={(client) => router.push(`/clients/${client.id}`)}
              renderMobileCard={(client) => (
                <ClientMobileCard client={client as Client} />
              )}
            />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
