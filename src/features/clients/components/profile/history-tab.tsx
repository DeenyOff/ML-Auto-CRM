import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type {
  ClientProfile,
  ServiceHistoryStatus,
} from "@/features/clients/types/client";
import {
  currencyFormatter,
  dateFormatter,
} from "@/features/clients/components/profile/profile-formatters";

type HistoryTabProps = {
  client: ClientProfile;
};

const statusVariant: Record<ServiceHistoryStatus, "default" | "success" | "muted"> =
  {
    Completed: "success",
    "In progress": "default",
    Scheduled: "muted",
    Quoted: "muted",
  };

export function HistoryTab({ client }: HistoryTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base text-white">
          Service History
        </CardTitle>
        <p className="text-sm text-zinc-500">
          Timeline of premium detailing services, pricing, and studio status.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        {client.history.map((item) => (
          <article
            key={item.id}
            className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4 md:grid-cols-[150px_1fr_auto]"
          >
            <div>
              <time className="text-sm font-semibold text-red-300">
                {dateFormatter.format(new Date(item.date))}
              </time>
              <p className="mt-2 text-xs text-zinc-500">{item.advisor}</p>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-medium text-white">{item.service}</h3>
                <Badge variant={statusVariant[item.status]}>
                  {item.status}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-zinc-400">{item.vehicle}</p>
              <p className="mt-3 text-sm text-zinc-500">{item.notes}</p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-lg font-semibold text-white">
                {currencyFormatter.format(item.price)}
              </p>
            </div>
          </article>
        ))}
      </CardContent>
    </Card>
  );
}
