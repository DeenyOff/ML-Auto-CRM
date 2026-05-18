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

import type { Booking } from "@/features/bookings/types/booking";

import type {
    BookingClientOption,
    BookingEmployeeOption,
    BookingVehicleOption,
    CreateBookingInput,
} from "@/services/bookings/getBookings";

import { updateBooking } from "@/services/bookings/updateBooking";

type BookingEditDialogProps = {
    booking: Booking;
    clients: BookingClientOption[];
    vehicles: BookingVehicleOption[];
    employees: BookingEmployeeOption[];
};

export function BookingEditDialog({
                                      booking,
                                      clients,
                                      vehicles,
                                      employees,
                                  }: BookingEditDialogProps) {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function handleOpenChange(open: boolean) {
        setIsOpen(open);
        setError(null);
    }

    async function handleUpdateBooking(
        values: CreateBookingInput,
    ) {
        setIsUpdating(true);
        setError(null);

        try {
            await updateBooking(booking.id, values);

            handleOpenChange(false);

            router.refresh();
        } catch (updateError) {
            setError(
                updateError instanceof Error
                    ? updateError.message
                    : "Unable to update booking. Please try again.",
            );
        } finally {
            setIsUpdating(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <Button
                variant="outline"
                size="sm"
                onClick={() => handleOpenChange(true)}
            >
                Edit Booking
            </Button>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Booking</DialogTitle>

                    <DialogDescription>
                        Update this booking in Supabase.
                    </DialogDescription>
                </DialogHeader>

                <BookingForm
                    clients={clients}
                    vehicles={vehicles}
                    employees={employees}
                    defaultValues={{
                        client_id: booking.clientId,
                        car_id: booking.vehicleId,
                        assigned_employee_id: "",
                        scheduled_date: booking.date.slice(0, 16),
                        status: "new",
                        price: booking.price,
                        notes: booking.notes,
                    }}
                    error={error}
                    isSubmitting={isUpdating}
                    onCancel={() => handleOpenChange(false)}
                    onSubmit={handleUpdateBooking}
                    submitLabel="Save changes"
                    submittingLabel="Saving..."
                />
            </DialogContent>
        </Dialog>
    );
}