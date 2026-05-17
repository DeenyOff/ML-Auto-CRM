import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ClientProfile } from "@/features/clients/types/client";
import {
  currencyFormatter,
  dateFormatter,
} from "@/features/clients/components/profile/profile-formatters";

type OverviewTabProps = {
  client: ClientProfile;
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 py-3 last:border-0">
      <span className="text-sm text-zinc-500">{label}</span>
      <span className="text-right text-sm font-medium text-zinc-100">
        {value}
      </span>
    </div>
  );
}

export function OverviewTab({ client }: OverviewTabProps) {
  const stats = [
    { label: "Bookings", value: client.stats.bookings.toString() },
    { label: "Vehicles", value: client.stats.vehicles.toString() },
    {
      label: "Avg. ticket",
      value: currencyFormatter.format(client.stats.averageTicket),
    },
    { label: "Loyalty score", value: `${client.stats.loyaltyScore}%` },
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base text-white">
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DetailRow label="Client ID" value={client.id} />
            <DetailRow label="Phone" value={client.phone} />
            <DetailRow label="Email" value={client.email} />
            <DetailRow label="Address" value={client.address} />
            <DetailRow
              label="Joined"
              value={dateFormatter.format(new Date(client.joinedAt))}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base text-white">Tags</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {client.tags.length ? (
              client.tags.map((tag) => (
                <Badge key={tag} variant="muted">
                  {tag}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-zinc-500">No tags recorded.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base text-white">
              Client Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
              >
                <p className="text-xs uppercase text-zinc-500">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {stat.value}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base text-white">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {client.recentActivity.length ? (
              client.recentActivity.map((activity) => (
                <article
                  key={activity.id}
                  className="border-l border-red-500/50 pl-4"
                >
                  <time className="text-xs text-red-300">
                    {dateFormatter.format(new Date(activity.date))}
                  </time>
                  <h3 className="mt-1 font-medium text-white">
                    {activity.title}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    {activity.description}
                  </p>
                </article>
              ))
            ) : (
              <p className="text-sm text-zinc-500">
                No recent activity recorded.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
