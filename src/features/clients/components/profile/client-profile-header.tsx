import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { ClientProfile } from "@/features/clients/types/client";
import {
  currencyFormatter,
  dateFormatter,
} from "@/features/clients/components/profile/profile-formatters";

type ClientProfileHeaderProps = {
  client: ClientProfile;
};

function HeaderMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3">
      <p className="text-xs uppercase text-zinc-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

export function ClientProfileHeader({ client }: ClientProfileHeaderProps) {
  return (
    <Card className="overflow-hidden border-red-500/20 bg-[linear-gradient(135deg,rgba(24,24,27,0.96),rgba(9,9,11,0.92)),url('https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center">
      <div className="bg-black/55">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-600/15 text-2xl font-semibold text-red-100 shadow-[0_0_40px_rgba(220,38,38,0.2)]">
                {client.initials}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-semibold text-white sm:text-4xl">
                    {client.name}
                  </h1>
                  <Badge
                    variant={client.vipStatus === "VIP" ? "default" : "muted"}
                  >
                    {client.vipStatus}
                  </Badge>
                </div>
                <div className="mt-3 flex flex-col gap-1 text-sm text-zinc-300 sm:flex-row sm:flex-wrap sm:gap-x-5">
                  <span>{client.phone}</span>
                  <span>{client.email}</span>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[360px]">
              <HeaderMetric
                label="Last visit"
                value={dateFormatter.format(new Date(client.lastVisit))}
              />
              <HeaderMetric
                label="Total spent"
                value={currencyFormatter.format(client.totalSpent)}
              />
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
