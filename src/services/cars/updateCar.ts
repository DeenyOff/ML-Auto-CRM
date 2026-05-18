import { supabase } from "@/lib/supabase/client";
import type { CreateCarInput } from "@/services/cars/getCars";

export async function updateCar(
    id: string,
    values: CreateCarInput,
) {
    const { error } = await supabase
        .from("cars")
        .update(values)
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }
}