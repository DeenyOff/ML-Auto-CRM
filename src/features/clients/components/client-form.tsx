"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import type { UpdateClientInput } from "@/services/clients/getClients";

const optionalEmail = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .refine((value) => !value || z.email().safeParse(value).success, {
    message: "Enter a valid email address.",
  });

const clientFormSchema = z.object({
  full_name: z.string().trim().min(2, "Client name is required."),
  phone: z.string().trim().min(5, "Phone number is required."),
  email: optionalEmail,
  instagram: z.string().trim().optional().or(z.literal("")),
  vip_status: z.boolean(),
  special_requests: z.string().trim().optional().or(z.literal("")),
});

export type ClientFormValues = z.infer<typeof clientFormSchema>;

type ClientFormProps = {
  defaultValues?: Partial<ClientFormValues>;
  error?: string | null;
  includeSpecialRequests?: boolean;
  isSubmitting?: boolean;
  onCancel: () => void;
  onSubmit: (values: UpdateClientInput) => Promise<void>;
  submitLabel?: string;
  submittingLabel?: string;
};

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-1 text-xs text-red-300">{message}</p>;
}

export function ClientForm({
  defaultValues,
  error,
  includeSpecialRequests = false,
  isSubmitting = false,
  onCancel,
  onSubmit,
  submitLabel = "Create client",
  submittingLabel = "Creating...",
}: ClientFormProps) {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      email: "",
      instagram: "",
      vip_status: false,
      special_requests: "",
      ...defaultValues,
    },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(async (values) => {
        await onSubmit({
          ...values,
          email: values.email || null,
          instagram: values.instagram || null,
          special_requests: values.special_requests || null,
        });
      })}
    >
      <div>
        <label className="text-sm font-medium text-zinc-200" htmlFor="full_name">
          Full name
        </label>
        <Input
          id="full_name"
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.full_name)}
          {...register("full_name")}
        />
        <FieldError message={errors.full_name?.message} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-zinc-200" htmlFor="phone">
            Phone
          </label>
          <Input
            id="phone"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.phone)}
            {...register("phone")}
          />
          <FieldError message={errors.phone?.message} />
        </div>
        <div>
          <label className="text-sm font-medium text-zinc-200" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            type="email"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-zinc-200" htmlFor="instagram">
          Instagram
        </label>
        <Input
          id="instagram"
          disabled={isSubmitting}
          placeholder="@client"
          {...register("instagram")}
        />
      </div>

      <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm text-zinc-200">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-white/10 bg-zinc-950 accent-red-600"
          disabled={isSubmitting}
          {...register("vip_status")}
        />
        VIP client
      </label>

      {includeSpecialRequests && (
        <div>
          <label
            className="text-sm font-medium text-zinc-200"
            htmlFor="special_requests"
          >
            Special requests
          </label>
          <Input
            id="special_requests"
            disabled={isSubmitting}
            {...register("special_requests")}
          />
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/[0.08] p-3 text-sm text-red-100">
          {error}
        </div>
      )}

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? submittingLabel : submitLabel}
        </Button>
      </DialogFooter>
    </form>
  );
}
