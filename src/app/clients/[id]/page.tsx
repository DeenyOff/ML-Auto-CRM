import { notFound } from "next/navigation";

import { ClientProfilePage } from "@/features/clients/components/profile/client-profile-page";
import { getClientProfile } from "@/features/clients/data/client-profiles";

type ClientProfileRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ClientProfileRoute({
  params,
}: ClientProfileRouteProps) {
  const { id } = await params;
  const client = getClientProfile(id);

  if (!client) {
    notFound();
  }

  return <ClientProfilePage client={client} />;
}
