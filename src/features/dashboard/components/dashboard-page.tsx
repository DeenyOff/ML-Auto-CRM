import { AppShell } from "@/components/layout/app-shell";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const metrics = [
  {
    label: "Active Clients",
    value: "248",
    trend: "+12 this month",
  },
  {
    label: "Cars Managed",
    value: "392",
    trend: "+31 new records",
  },
  {
    label: "Bookings",
    value: "46",
    trend: "18 pending",
  },
  {
    label: "Revenue Pipeline",
    value: "€34.8k",
    trend: "+8.4% projected",
  },
];

const schedule = [
  {
    time: "09:00",
    client: "A. Petrauskas",
    vehicle: "Porsche 911 Carrera",
    service: "Ceramic coating inspection",
  },
  {
    time: "11:30",
    client: "UAB Nordline",
    vehicle: "Mercedes-Benz S-Class",
    service: "Interior detailing",
  },
  {
    time: "15:00",
    client: "M. Kazlauskas",
    vehicle: "BMW M4 Competition",
    service: "Paint correction",
  },
];

const vehicleStatus = [
  { label: "In detailing", value: 14 },
  { label: "Awaiting pickup", value: 7 },
  { label: "Follow-up due", value: 11 },
];

export function DashboardPage() {
  return (
    <AppShell title="Dashboard" eyebrow="Premium CRM">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <Card
              key={metric.label}
              className="transition-all duration-200 hover:-translate-y-0.5 hover:border-red-500/40 hover:bg-zinc-900/80"
            >
              <CardHeader>
                <CardTitle className="text-zinc-400">{metric.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold tracking-tight text-white">
                  {metric.value}
                </div>
                <p className="mt-2 text-sm text-red-300">{metric.trend}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <div>
                <CardTitle className="text-base text-white">
                  Today&apos;s Bookings
                </CardTitle>
                <p className="mt-1 text-sm text-zinc-500">
                  High-value work scheduled for the detailing studio.
                </p>
              </div>
              <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-200">
                Live
              </span>
            </CardHeader>
            <CardContent className="space-y-3">
              {schedule.map((booking) => (
                <article
                  key={`${booking.time}-${booking.vehicle}`}
                  className="grid gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4 transition-colors duration-200 hover:border-red-500/40 hover:bg-red-500/[0.04] sm:grid-cols-[72px_1fr]"
                >
                  <time className="text-sm font-semibold text-red-300">
                    {booking.time}
                  </time>
                  <div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <h2 className="font-medium text-white">
                        {booking.vehicle}
                      </h2>
                      <p className="text-sm text-zinc-500">{booking.client}</p>
                    </div>
                    <p className="mt-1 text-sm text-zinc-400">
                      {booking.service}
                    </p>
                  </div>
                </article>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base text-white">
                Vehicle Workflow
              </CardTitle>
              <p className="text-sm text-zinc-500">
                Current studio load across service stages.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {vehicleStatus.map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-300">{item.label}</span>
                    <span className="font-medium text-white">{item.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-red-600 shadow-[0_0_18px_rgba(220,38,38,0.45)]"
                      style={{ width: `${Math.min(item.value * 5, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
