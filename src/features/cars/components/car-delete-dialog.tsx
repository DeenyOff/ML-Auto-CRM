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
import type { Car } from "@/features/cars/types/car";
import { deleteCar } from "@/services/cars/deleteCar";

type CarDeleteDialogProps = {
    car: Car;
};

export function CarDeleteDialog({
                                    car,
                                }: CarDeleteDialogProps) {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function handleOpenChange(open: boolean) {
        setIsOpen(open);
        setError(null);
    }

    async function handleDeleteCar() {
        setIsDeleting(true);
        setError(null);

        try {
            await deleteCar(car.id);

            handleOpenChange(false);

            router.refresh();
            router.push("/cars");
        } catch (deleteError) {
            setError(
                deleteError instanceof Error
                    ? deleteError.message
                    : "Unable to delete vehicle. Please try again.",
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
                Delete Vehicle
            </Button>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Vehicle</DialogTitle>

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
                        onClick={handleDeleteCar}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete Vehicle"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
