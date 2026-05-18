import Link from "next/link";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { ClientEditDialog } from "@/features/clients/components/profile/client-edit-dialog";
import { ClientProfileHeader } from "@/features/clients/components/profile/client-profile-header";
import { ClientProfileTabs } from "@/features/clients/components/profile/client-profile-tabs";
import { ClientQuickActions } from "@/features/clients/components/profile/client-quick-actions";
import type { ClientProfile } from "@/features/clients/types/client";
import type { BookingEmployeeOption } from "@/services/bookings/getBookings";

type ClientProfilePageProps = {
  client: ClientProfile;
  employees: BookingEmployeeOption[];
};

export function ClientProfilePage({ client, employees }: ClientProfilePageProps) {
  return (
    <AppShell title={client.name} eyebrow="Client Profile">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div className="flex items-center justify-between gap-3">
          <Link href="/clients">
            <Button variant="outline" size="sm">
              Back to clients
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-zinc-500 sm:inline">
              Profile ID: {client.id}
            </span>
            <ClientEditDialog client={client} />
          </div>
        </div>

        <ClientProfileHeader client={client} />
        <ClientQuickActions client={client} employees={employees} />
        <ClientProfileTabs client={client} />
      </div>
    </AppShell>
  );
}
