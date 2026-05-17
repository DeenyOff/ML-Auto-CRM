import { BookingsPage } from "@/features/bookings/components/bookings-page";
import {
  getBookingEmployees,
  getBookings,
} from "@/services/bookings/getBookings";
import { getCars } from "@/services/cars/getCars";
import { getClients } from "@/services/clients/getClients";

export const dynamic = "force-dynamic";

export default async function BookingsRoute() {
  const [bookings, clients, cars, employees] = await Promise.all([
    getBookings(),
    getClients(),
    getCars(),
    getBookingEmployees(),
  ]);

  return (
    <BookingsPage
      bookings={bookings}
      clients={clients}
      employees={employees}
      vehicles={cars.map((car) => ({
        id: car.id,
        clientId: car.ownerId,
        name: `${car.brand} ${car.model}`,
        plateNumber: car.plateNumber,
      }))}
    />
  );
}
