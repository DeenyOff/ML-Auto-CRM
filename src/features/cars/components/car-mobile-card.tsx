import { Badge } from "@/components/ui/badge";
import type { Car } from "@/features/cars/types/car";
import {
  dateFormatter,
  mileageFormatter,
} from "@/features/cars/components/car-formatters";

type CarMobileCardProps = {
  car: Car;
};

export function CarMobileCard({ car }: CarMobileCardProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold text-white">
            {car.brand} {car.model}
          </h2>
          <p className="mt-1 text-sm text-zinc-500">{car.owner}</p>
        </div>
        <Badge variant={car.status === "Ready" ? "success" : "default"}>
          {car.status}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
            Plate
          </p>
          <p className="mt-1 font-mono text-zinc-200">{car.plateNumber}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
            Mileage
          </p>
          <p className="mt-1 text-zinc-200">
            {mileageFormatter.format(car.mileage)} km
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
            Year
          </p>
          <p className="mt-1 text-zinc-200">{car.year}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
            Last service
          </p>
          <p className="mt-1 text-zinc-200">
            {dateFormatter.format(new Date(car.lastServiceDate))}
          </p>
        </div>
      </div>

      <p className="break-all font-mono text-xs text-zinc-500">{car.vin}</p>
    </div>
  );
}
