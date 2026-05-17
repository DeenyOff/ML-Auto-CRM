import { ClientsPage } from "@/features/clients/components/clients-page";
import { getClients } from "@/services/clients/getClients";

export const dynamic = "force-dynamic";

export default async function ClientsRoute() {
  const clients = await getClients();

  return <ClientsPage clients={clients} />;
}
