import { AppShell } from "@/components/layout/app-shell";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type {
  AnalyticsData,
  AnalyticsListItem,
  AnalyticsMetric,
  TopClientAnalyticsItem,
} from "@/services/analytics/getAnalytics";

type AnalyticsPageProps = {
  data: AnalyticsData | null;
  error?: string | null;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-500">
      {message}
    </div>
  );
}

function MetricCard({ metric }: { metric: AnalyticsMetric }) {
  return (
    <Card className="transition-all duration-200 hover:-translate-y-0.5 hover:border-red-500/40 hover:bg-zinc-900/80">
      <CardHeader>
        <CardTitle className="text-zinc-400">{metric.label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold tracking-tight text-white">
          {metric.value}
        </div>
        <p className="mt-2 text-sm text-red-300">{metric.detail}</p>
      </CardContent>
    </Card>
  );
}

function BarList({
  emptyMessage,
  items,
}: {
  emptyMessage: string;
  items: AnalyticsListItem[];
}) {
  const maxValue = Math.max(...items.map((item) => item.value), 0);

  if (!items.length) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.label} className="space-y-2">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="min-w-0 truncate text-zinc-300">
              {item.label}
            </span>
            <span className="font-medium text-white">{item.value}</span>
          </div>
          <div className="h-2 rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-red-600 shadow-[0_0_18px_rgba(220,38,38,0.45)]"
              style={{
                width: `${maxValue ? Math.max((item.value / maxValue) * 100, 8) : 0}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function TopClientsList({ clients }: { clients: TopClientAnalyticsItem[] }) {
  if (!clients.length) {
    return <EmptyState message="No client spending has been recorded yet." />;
  }

  return (
    <div className="space-y-3">
      {clients.map((client, index) => (
        <article
          key={client.id}
          className="grid grid-cols-[36px_1fr_auto] items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 text-sm font-semibold text-red-200">
            {index + 1}
          </span>
          <h2 className="min-w-0 truncate font-medium text-white">
            {client.name}
          </h2>
          <p className="font-medium text-red-200">
            {currencyFormatter.format(client.totalSpent)}
          </p>
        </article>
      ))}
    </div>
  );
}

export function AnalyticsPage({ data, error }: AnalyticsPageProps) {
  return (
    <AppShell title="Analytics" eyebrow="Business Intelligence">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section>
          <p className="text-sm uppercase tracking-[0.24em] text-red-400">
            ML Auto performance
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Analytics
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-500">
            Live CRM statistics from clients, vehicles, and service bookings.
          </p>
        </section>

        {error ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-white">
                Unable to load analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                {error}
              </p>
            </CardContent>
          </Card>
        ) : null}

        {data ? (
          <>
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {data.metrics.map((metric) => (
                <MetricCard key={metric.label} metric={metric} />
              ))}
            </section>

            <section className="grid gap-6 xl:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base text-white">
                    Bookings by status
                  </CardTitle>
                  <p className="text-sm text-zinc-500">
                    Service job distribution across workflow stages.
                  </p>
                </CardHeader>
                <CardContent>
                  <BarList
                    items={data.bookingsByStatus}
                    emptyMessage="No bookings have been recorded yet."
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base text-white">
                    Vehicles by brand
                  </CardTitle>
                  <p className="text-sm text-zinc-500">
                    Registered vehicle mix by manufacturer.
                  </p>
                </CardHeader>
                <CardContent>
                  <BarList
                    items={data.vehiclesByBrand}
                    emptyMessage="No vehicles have been recorded yet."
                  />
                </CardContent>
              </Card>
            </section>

            <Card>
              <CardHeader>
                <CardTitle className="text-base text-white">
                  Top clients by total spent
                </CardTitle>
                <p className="text-sm text-zinc-500">
                  Highest-value client records from Supabase.
                </p>
              </CardHeader>
              <CardContent>
                <TopClientsList clients={data.topClientsByTotalSpent} />
              </CardContent>
            </Card>
          </>
        ) : null}
      </div>
    </AppShell>
  );
}
