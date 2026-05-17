import Link from "next/link";
import { notFound } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  dateFormatter,
  mileageFormatter,
} from "@/features/cars/components/car-formatters";
import { cars } from "@/features/cars/data/cars";

type CarProfileRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CarProfileRoute({ params }: CarProfileRouteProps) {
  const { id } = await params;
  const car = cars.find((item) => item.id === id);

  if (!car) {
    notFound();
  }

  return (
    <AppShell
      title={`${car.brand} ${car.model}`}
      eyebrow="Vehicle Profile"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <Link href="/cars">
          <Button variant="outline" size="sm">
            Back to cars
          </Button>
        </Link>

        <Card className="overflow-hidden border-red-500/20 bg-[linear-gradient(135deg,rgba(24,24,27,0.96),rgba(9,9,11,0.92)),url('https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center">
          <div className="bg-black/55">
            <CardHeader className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <CardTitle className="text-3xl font-semibold text-white">
                    {car.brand} {car.model}
                  </CardTitle>
                  <p className="mt-2 text-sm text-zinc-300">
                    {car.year} | {car.color} | {car.plateNumber}
                  </p>
                </div>
                <Badge variant={car.status === "Ready" ? "success" : "default"}>
                  {car.status}
                </Badge>
              </div>
            </CardHeader>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base text-white">
              Vehicle Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase text-zinc-500">VIN</p>
              <p className="mt-2 break-all font-mono text-sm text-white">
                {car.vin}
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase text-zinc-500">Owner</p>
              <p className="mt-2 text-sm font-medium text-white">
                {car.owner}
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase text-zinc-500">Mileage</p>
              <p className="mt-2 text-sm font-medium text-white">
                {mileageFormatter.format(car.mileage)} km
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase text-zinc-500">Last service</p>
              <p className="mt-2 text-sm font-medium text-white">
                {dateFormatter.format(new Date(car.lastServiceDate))}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
