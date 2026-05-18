import { supabase } from "@/lib/supabase/client";

export async function deleteCar(id: string) {
    const { error } = await supabase
        .from("cars")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }
}
