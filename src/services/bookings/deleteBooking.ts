import { supabase } from "@/lib/supabase/client";

export async function deleteBooking(id: string) {
    const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }
}