"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ClientForm } from "@/features/clients/components/client-form";
import type { ClientProfile } from "@/features/clients/types/client";
import {
  updateClient,
  type UpdateClientInput,
} from "@/services/clients/getClients";

type ClientEditDialogProps = {
  client: ClientProfile;
};

function emptyIfMissing(value: string) {
  return value === "Not recorded" ? "" : value;
}

export function ClientEditDialog({ client }: ClientEditDialogProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleOpenChange(open: boolean) {
    setIsOpen(open);
    setError(null);
  }

  async function handleUpdateClient(values: UpdateClientInput) {
    setIsUpdating(true);
    setError(null);

    try {
      await updateClient(client.id, values);
      handleOpenChange(false);
      router.refresh();
    } catch (updateError) {
      setError(
        updateError instanceof Error
          ? updateError.message
          : "Unable to update client. Please try again.",
      );
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <Button variant="outline" size="sm" onClick={() => handleOpenChange(true)}>
        Edit Client
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Client</DialogTitle>
          <DialogDescription>
            Update this client record in Supabase.
          </DialogDescription>
        </DialogHeader>
        <ClientForm
          defaultValues={{
            full_name: client.name,
            phone: emptyIfMissing(client.phone),
            email: emptyIfMissing(client.email),
            instagram: client.instagram,
            vip_status: client.vipStatus === "VIP",
            special_requests: client.specialRequests,
          }}
          error={error}
          includeSpecialRequests
          isSubmitting={isUpdating}
          onCancel={() => handleOpenChange(false)}
          onSubmit={handleUpdateClient}
          submitLabel="Save changes"
          submittingLabel="Saving..."
        />
      </DialogContent>
    </Dialog>
  );
}
