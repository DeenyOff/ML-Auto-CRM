import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ClientProfile } from "@/features/clients/types/client";
import {
  dateFormatter,
  mileageFormatter,
} from "@/features/clients/components/profile/profile-formatters";

type CarsTabProps = {
  client: ClientProfile;
};

export function CarsTab({ client }: CarsTabProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {client.vehicles.map((vehicle) => (
        <Card
          key={vehicle.id}
          className="transition-all duration-200 hover:-translate-y-0.5 hover:border-red-500/40 hover:bg-zinc-900/80"
        >
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-lg text-white">
                  {vehicle.brand} {vehicle.model}
                </CardTitle>
                <p className="mt-1 text-sm text-zinc-500">
                  {vehicle.year} | {vehicle.plateNumber}
                </p>
              </div>
              <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-200">
                {vehicle.color}
              </span>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase text-zinc-500">VIN</p>
              <p className="mt-1 break-all text-sm font-medium text-zinc-100">
                {vehicle.vin}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-zinc-500">Mileage</p>
              <p className="mt-1 text-sm font-medium text-zinc-100">
                {mileageFormatter.format(vehicle.mileage)} km
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-zinc-500">Brand</p>
              <p className="mt-1 text-sm font-medium text-zinc-100">
                {vehicle.brand}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-zinc-500">Next service</p>
              <p className="mt-1 text-sm font-medium text-zinc-100">
                {dateFormatter.format(new Date(vehicle.nextServiceDue))}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
