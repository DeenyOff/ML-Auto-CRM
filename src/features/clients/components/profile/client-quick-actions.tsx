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
import { BookingForm } from "@/features/bookings/components/booking-form";
import { VehicleForm } from "@/features/cars/components/vehicle-form";
import type { ClientProfile } from "@/features/clients/types/client";
import {
  createBooking,
  type BookingEmployeeOption,
  type CreateBookingInput,
} from "@/services/bookings/getBookings";
import { createCar, type CreateCarInput } from "@/services/cars/getCars";

const actions = ["Add booking", "Add note", "Add car", "Upload photo"];

type ClientQuickActionsProps = {
  client: ClientProfile;
  employees: BookingEmployeeOption[];
};

export function ClientQuickActions({ client, employees }: ClientQuickActionsProps) {
  const router = useRouter();
  const [isAddBookingOpen, setIsAddBookingOpen] = useState(false);
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [isCreatingBooking, setIsCreatingBooking] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);
  const vehicles = client.vehicles.map((vehicle) => ({
    id: vehicle.id,
    clientId: client.id,
    name: `${vehicle.brand} ${vehicle.model}`,
    plateNumber: vehicle.plateNumber,
  }));

  function handleAddBookingOpenChange(open: boolean) {
    setIsAddBookingOpen(open);
    setBookingError(null);
  }

  function handleAddVehicleOpenChange(open: boolean) {
    setIsAddVehicleOpen(open);
    setCreateError(null);
  }

  async function handleCreateBooking(values: CreateBookingInput) {
    setIsCreatingBooking(true);
    setBookingError(null);

    try {
      await createBooking({
        ...values,
        client_id: client.id,
      });
      handleAddBookingOpenChange(false);
      router.refresh();
    } catch (error) {
      setBookingError(
        error instanceof Error
          ? error.message
          : "Unable to create booking. Please try again.",
      );
    } finally {
      setIsCreatingBooking(false);
    }
  }

  async function handleCreateVehicle(values: CreateCarInput) {
    setIsCreating(true);
    setCreateError(null);

    try {
      await createCar({
        ...values,
        client_id: client.id,
      });
      handleAddVehicleOpenChange(false);
      router.refresh();
    } catch (error) {
      setCreateError(
        error instanceof Error
          ? error.message
          : "Unable to create vehicle. Please try again.",
      );
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action, index) => (
          <Button
            key={action}
            variant={index === 0 ? "default" : "outline"}
            className="h-12 justify-start"
            onClick={
              action === "Add booking"
                ? () => handleAddBookingOpenChange(true)
                : action === "Add car"
                ? () => handleAddVehicleOpenChange(true)
                : undefined
            }
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-black/20 text-sm">
              +
            </span>
            {action}
          </Button>
        ))}
      </div>

      <Dialog open={isAddBookingOpen} onOpenChange={handleAddBookingOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Booking</DialogTitle>
            <DialogDescription>
              Create a new service booking for {client.name}.
            </DialogDescription>
          </DialogHeader>
          <BookingForm
            clients={[client]}
            defaultCarId={vehicles[0]?.id ?? ""}
            defaultClientId={client.id}
            employees={employees}
            error={bookingError}
            isSubmitting={isCreatingBooking}
            onCancel={() => handleAddBookingOpenChange(false)}
            onSubmit={handleCreateBooking}
            vehicles={vehicles}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isAddVehicleOpen} onOpenChange={handleAddVehicleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Vehicle</DialogTitle>
            <DialogDescription>
              Create a new vehicle record for {client.name}.
            </DialogDescription>
          </DialogHeader>
          <VehicleForm
            clients={[client]}
            defaultClientId={client.id}
            error={createError}
            isSubmitting={isCreating}
            onCancel={() => handleAddVehicleOpenChange(false)}
            onSubmit={handleCreateVehicle}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
