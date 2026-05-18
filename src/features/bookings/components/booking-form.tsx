"use client";

import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { BookingStatus } from "@/features/bookings/types/booking";
import type {
  BookingClientOption,
  BookingEmployeeOption,
  BookingVehicleOption,
  CreateBookingInput,
} from "@/services/bookings/getBookings";


const bookingFormSchema = z.object({
  client_id: z.string().trim().min(1, "Client is required."),
  car_id: z.string().trim().min(1, "Vehicle is required."),
  assigned_employee_id: z.string().trim().min(1, "Employee is required."),
  scheduled_date: z.string().trim().min(1, "Scheduled date is required."),
  status: z.enum(["new", "in_progress", "completed", "cancelled"]),
  price: z.coerce.number().min(0, "Price cannot be negative."),
  notes: z.string().trim().optional().or(z.literal("")),
});

type BookingFormInput = z.input<typeof bookingFormSchema>;
type BookingFormValues = z.output<typeof bookingFormSchema>;

type BookingFormProps = {
  clients: BookingClientOption[];
  defaultCarId?: string;
  defaultClientId?: string;
  employees: BookingEmployeeOption[];
  error?: string | null;
  isSubmitting?: boolean;
  onCancel: () => void;
  onSubmit: (values: CreateBookingInput) => Promise<void>;
  vehicles: BookingVehicleOption[];
};

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-1 text-xs text-red-300">{message}</p>;
}

export function BookingForm({
  clients,
  defaultCarId = "",
  defaultClientId = "",
  employees,
  error,
  isSubmitting = false,
  onCancel,
  onSubmit,
  vehicles,
}: BookingFormProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<BookingFormInput, unknown, BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      client_id: defaultClientId,
      car_id: defaultCarId,
      assigned_employee_id: "",
      scheduled_date: "",
      status: "new",
      price: 0,
      notes: "",
    },
  });
  const selectedClientId = useWatch({ control, name: "client_id" });
  const visibleVehicles = useMemo(() => {
    if (!selectedClientId) {
      return vehicles;
    }

    return vehicles.filter((vehicle) => vehicle.clientId === selectedClientId);
  }, [selectedClientId, vehicles]);

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(async (values) => {
        await onSubmit({
          ...values,
          notes: values.notes || null,
        });
      })}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-zinc-200" htmlFor="client_id">
            Client
          </label>
          <select
            id="client_id"
            disabled={isSubmitting || !clients.length}
            aria-invalid={Boolean(errors.client_id)}
            className="h-10 w-full rounded-lg border border-white/10 bg-[#111] px-3 text-sm text-white outline-none transition-colors focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            {...register("client_id")}
          >
            <option value="">Select client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
          <FieldError
            message={
              clients.length ? errors.client_id?.message : "Add a client before creating a booking."
            }
          />
        </div>
        <div>
          <label className="text-sm font-medium text-zinc-200" htmlFor="car_id">
            Vehicle
          </label>
          <select
            id="car_id"
            disabled={isSubmitting || !visibleVehicles.length}
            aria-invalid={Boolean(errors.car_id)}
            className="h-10 w-full rounded-lg border border-white/10 bg-[#111] px-3 text-sm text-white outline-none transition-colors focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            {...register("car_id")}
          >
            <option value="">Select vehicle</option>
            {visibleVehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.name} | {vehicle.plateNumber}
              </option>
            ))}
          </select>
          <FieldError
            message={
              vehicles.length ? errors.car_id?.message : "Add a vehicle before creating a booking."
            }
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            className="text-sm font-medium text-zinc-200"
            htmlFor="assigned_employee_id"
          >
            Employee
          </label>
          <select
            id="assigned_employee_id"
            disabled={isSubmitting || !employees.length}
            aria-invalid={Boolean(errors.assigned_employee_id)}
            className="h-10 w-full rounded-lg border border-white/10 bg-[#111] px-3 text-sm text-white outline-none transition-colors focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            {...register("assigned_employee_id")}
          >
            <option value="">Select employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
          <FieldError
            message={
              employees.length
                ? errors.assigned_employee_id?.message
                : "Add an employee profile before creating a booking."
            }
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            className="text-sm font-medium text-zinc-200"
            htmlFor="scheduled_date"
          >
            Scheduled date
          </label>
          <Input
            id="scheduled_date"
            type="datetime-local"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.scheduled_date)}
            {...register("scheduled_date")}
          />
          <FieldError message={errors.scheduled_date?.message} />
        </div>
        <div>
          <label className="text-sm font-medium text-zinc-200" htmlFor="price">
            Price
          </label>
          <Input
            id="price"
            type="number"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.price)}
            {...register("price")}
          />
          <FieldError message={errors.price?.message} />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-zinc-200" htmlFor="notes">
          Notes
        </label>
        <Input id="notes" disabled={isSubmitting} {...register("notes")} />
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
        <Button
          type="submit"
          disabled={isSubmitting || !clients.length || !vehicles.length || !employees.length}
        >
          {isSubmitting ? "Creating..." : "Create booking"}
        </Button>
      </DialogFooter>
    </form>
  );
}
