import { BookingsPage } from "@/features/bookings/components/bookings-page";
import { getBookings } from "@/services/bookings/getBookings";

export const dynamic = "force-dynamic";

export default async function BookingsRoute() {
  const bookings = await getBookings();

  return <BookingsPage bookings={bookings} />;
}
