import { CarsPage } from "@/features/cars/components/cars-page";
import { getCars } from "@/services/cars/getCars";
import { getClients } from "@/services/clients/getClients";

export const dynamic = "force-dynamic";

export default async function CarsRoute() {
  const [cars, clients] = await Promise.all([getCars(), getClients()]);

  return <CarsPage cars={cars} clients={clients} />;
}
