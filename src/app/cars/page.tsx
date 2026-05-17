import { CarsPage } from "@/features/cars/components/cars-page";
import { getCars } from "@/services/cars/getCars";

export const dynamic = "force-dynamic";

export default async function CarsRoute() {
  const cars = await getCars();

  return <CarsPage cars={cars} />;
}
