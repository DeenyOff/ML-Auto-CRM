import { supabase } from "@/lib/supabase/client";
import type { CreateBookingInput } from "@/services/bookings/getBookings";

export async function updateBooking(
    id: string,
    values: CreateBookingInput,
) {
    const { error } = await supabase
        .from("bookings")
        .update(values)
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }
}