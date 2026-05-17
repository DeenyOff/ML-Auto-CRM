import Link from "next/link";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { ClientProfileHeader } from "@/features/clients/components/profile/client-profile-header";
import { ClientProfileTabs } from "@/features/clients/components/profile/client-profile-tabs";
import { ClientQuickActions } from "@/features/clients/components/profile/client-quick-actions";
import type { ClientProfile } from "@/features/clients/types/client";

type ClientProfilePageProps = {
  client: ClientProfile;
};

export function ClientProfilePage({ client }: ClientProfilePageProps) {
  return (
    <AppShell title={client.name} eyebrow="Client Profile">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div className="flex items-center justify-between gap-3">
          <Link href="/clients">
            <Button variant="outline" size="sm">
              Back to clients
            </Button>
          </Link>
          <span className="hidden text-sm text-zinc-500 sm:inline">
            Profile ID: {client.id}
          </span>
        </div>

        <ClientProfileHeader client={client} />
        <ClientQuickActions />
        <ClientProfileTabs client={client} />
      </div>
    </AppShell>
  );
}
