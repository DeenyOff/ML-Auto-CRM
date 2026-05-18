"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import type { Booking } from "@/features/bookings/types/booking";
import { deleteBooking } from "@/services/bookings/deleteBooking";

type BookingDeleteDialogProps = {
    booking: Booking;
};

export function BookingDeleteDialog({
                                        booking,
                                    }: BookingDeleteDialogProps) {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function handleOpenChange(open: boolean) {
        setIsOpen(open);
        setError(null);
    }

    async function handleDeleteBooking() {
        setIsDeleting(true);
        setError(null);

        try {
            await deleteBooking(booking.id);

            handleOpenChange(false);

            router.refresh();
            router.push("/bookings");
        } catch (deleteError) {
            setError(
                deleteError instanceof Error
                    ? deleteError.message
                    : "Unable to delete booking. Please try again.",
            );
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <Button
                variant="destructive"
                size="sm"
                onClick={() => handleOpenChange(true)}
            >
                Delete Booking
            </Button>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Booking</DialogTitle>

                    <DialogDescription>
                        This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                {error ? (
                    <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                        {error}
                    </p>
                ) : null}

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => handleOpenChange(false)}
                        disabled={isDeleting}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDeleteBooking}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete Booking"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
