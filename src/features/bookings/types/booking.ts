export type BookingStatus =
  | "New"
  | "Confirmed"
  | "In Progress"
  | "Waiting"
  | "Completed"
  | "Delivered"
  | "Cancelled";

export type Booking = {
  id: string;
  bookingId: string;
  client: string;
  clientId: string;
  vehicle: string;
  vehicleId: string;
  vin: string;
  plateNumber: string;
  service: string;
  assignedEmployee: string;
  date: string;
  price: number;
  status: BookingStatus;
  bay: string;
  notes: string;
};
