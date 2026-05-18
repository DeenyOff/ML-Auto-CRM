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

import { VehicleForm } from "@/features/cars/components/vehicle-form";
import type { Car } from "@/features/cars/types/car";
import type { Client } from "@/features/clients/types/client";

import {
    updateCar,
} from "@/services/cars/updateCar";

import type { CreateCarInput } from "@/services/cars/getCars";

type CarEditDialogProps = {
    car: Car;
    clients: Client[];
};

export function CarEditDialog({
                                  car,
                                  clients,
                              }: CarEditDialogProps) {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function handleOpenChange(open: boolean) {
        setIsOpen(open);
        setError(null);
    }

    async function handleUpdateCar(values: CreateCarInput) {
        setIsUpdating(true);
        setError(null);

        try {
            await updateCar(car.id, values);

            handleOpenChange(false);

            router.refresh();
        } catch (updateError) {
            setError(
                updateError instanceof Error
                    ? updateError.message
                    : "Unable to update vehicle. Please try again.",
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
                Edit Vehicle
            </Button>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Vehicle</DialogTitle>

                    <DialogDescription>
                        Update this vehicle record in Supabase.
                    </DialogDescription>
                </DialogHeader>

                <VehicleForm
                    clients={clients}
                    defaultValues={{
                        brand: car.brand,
                        model: car.model,
                        year: car.year,
                        vin: car.vin,
                        plate_number: car.plateNumber,
                        color: car.color,
                        mileage: car.mileage,
                        client_id: car.ownerId,
                    }}
                    error={error}
                    isSubmitting={isUpdating}
                    onCancel={() => handleOpenChange(false)}
                    onSubmit={handleUpdateCar}
                    submitLabel="Save changes"
                    submittingLabel="Saving..."
                />
            </DialogContent>
        </Dialog>
    );
}