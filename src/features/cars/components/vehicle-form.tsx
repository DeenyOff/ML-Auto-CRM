"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { Client } from "@/features/clients/types/client";
import type { CreateCarInput } from "@/services/cars/getCars";

const vehicleFormSchema = z.object({
  brand: z.string().trim().min(1, "Brand is required."),
  model: z.string().trim().min(1, "Model is required."),
  year: z.coerce
    .number()
    .int("Year must be a whole number.")
    .min(1900, "Enter a valid vehicle year.")
    .max(new Date().getFullYear() + 1, "Enter a valid vehicle year."),
  vin: z.string().trim().min(5, "VIN is required."),
  plate_number: z.string().trim().min(2, "Plate number is required."),
  color: z.string().trim().min(1, "Color is required."),
  mileage: z.coerce
    .number()
    .int("Mileage must be a whole number.")
    .min(0, "Mileage cannot be negative."),
  client_id: z.string().trim().min(1, "Owner is required."),
});

type VehicleFormInput = z.input<typeof vehicleFormSchema>;
type VehicleFormValues = z.output<typeof vehicleFormSchema>;

type VehicleFormProps = {
  clients: Client[];
  defaultClientId?: string;
  error?: string | null;
  isSubmitting?: boolean;
  onCancel: () => void;
  onSubmit: (values: CreateCarInput) => Promise<void>;
};

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-1 text-xs text-red-300">{message}</p>;
}

export function VehicleForm({
  clients,
  defaultClientId = "",
  error,
  isSubmitting = false,
  onCancel,
  onSubmit,
}: VehicleFormProps) {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<VehicleFormInput, unknown, VehicleFormValues>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      vin: "",
      plate_number: "",
      color: "",
      mileage: 0,
      client_id: defaultClientId,
    },
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-zinc-200" htmlFor="brand">
            Brand
          </label>
          <Input
            id="brand"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.brand)}
            {...register("brand")}
          />
          <FieldError message={errors.brand?.message} />
        </div>
        <div>
          <label className="text-sm font-medium text-zinc-200" htmlFor="model">
            Model
          </label>
          <Input
            id="model"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.model)}
            {...register("model")}
          />
          <FieldError message={errors.model?.message} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-zinc-200" htmlFor="year">
            Year
          </label>
          <Input
            id="year"
            type="number"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.year)}
            {...register("year")}
          />
          <FieldError message={errors.year?.message} />
        </div>
        <div>
          <label className="text-sm font-medium text-zinc-200" htmlFor="mileage">
            Mileage
          </label>
          <Input
            id="mileage"
            type="number"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.mileage)}
            {...register("mileage")}
          />
          <FieldError message={errors.mileage?.message} />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-zinc-200" htmlFor="vin">
          VIN
        </label>
        <Input
          id="vin"
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.vin)}
          {...register("vin")}
        />
        <FieldError message={errors.vin?.message} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            className="text-sm font-medium text-zinc-200"
            htmlFor="plate_number"
          >
            Plate number
          </label>
          <Input
            id="plate_number"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.plate_number)}
            {...register("plate_number")}
          />
          <FieldError message={errors.plate_number?.message} />
        </div>
        <div>
          <label className="text-sm font-medium text-zinc-200" htmlFor="color">
            Color
          </label>
          <Input
            id="color"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.color)}
            {...register("color")}
          />
          <FieldError message={errors.color?.message} />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-zinc-200" htmlFor="client_id">
          Owner
        </label>
        <select
          id="client_id"
          disabled={isSubmitting || !clients.length}
          aria-invalid={Boolean(errors.client_id)}
          className="h-10 w-full rounded-lg border border-white/10 bg-[#111] px-3 text-sm text-white outline-none transition-colors focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          {...register("client_id")}
        >
          <option value="">Select owner</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
        <FieldError
          message={
            clients.length ? errors.client_id?.message : "Add a client before creating a vehicle."
          }
        />
      </div>

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
        <Button type="submit" disabled={isSubmitting || !clients.length}>
          {isSubmitting ? "Creating..." : "Create vehicle"}
        </Button>
      </DialogFooter>
    </form>
  );
}
