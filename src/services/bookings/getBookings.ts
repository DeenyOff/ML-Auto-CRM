import { supabase } from "@/lib/supabase/client";
import type { Booking, BookingStatus } from "@/features/bookings/types/booking";

type ClientRelation = {
  id: string | null;
  full_name: string | null;
} | null;

type CarRelation = {
  id: string | null;
  brand: string | null;
  model: string | null;
  vin: string | null;
  plate_number: string | null;
} | null;

type EmployeeRelation = {
  id: string | null;
  full_name: string | null;
  email: string | null;
} | null;

type BookingServiceRow = {
  price: number | null;
  notes: string | null;
  service: {
    name: string | null;
    base_price: number | null;
  } | null;
  services?: {
    name: string | null;
    base_price: number | null;
  } | null;
};

type BookingRow = {
  id: string;
  client_id: string | null;
  car_id: string | null;
  assigned_employee_id: string | null;
  scheduled_date: string | null;
  price: number | null;
  status: string | null;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
  client?: ClientRelation;
  car?: CarRelation;
  assignedEmployee?: EmployeeRelation;
  booking_services?: BookingServiceRow[] | null;
};

const bookingSelect = `
  *,
  client:clients(id, full_name),
  car:cars(id, brand, model, vin, plate_number),
  assignedEmployee:profiles!bookings_assigned_employee_id_fkey(id, full_name, email),
  booking_services(price, notes, service:services(name, base_price))
`;

function normalizeStatus(status: string | null): BookingStatus {
  const value = status?.toLowerCase().replace(/[_-]/g, " ") ?? "";

  if (value.includes("confirm")) {
    return "Confirmed";
  }

  if (value.includes("progress")) {
    return "In Progress";
  }

  if (value.includes("wait")) {
    return "Waiting";
  }

  if (value.includes("complete")) {
    return "Completed";
  }

  if (value.includes("deliver")) {
    return "Delivered";
  }

  if (value.includes("cancel")) {
    return "Cancelled";
  }

  return "New";
}

function formatVehicle(car: CarRelation) {
  if (!car) {
    return "Unassigned vehicle";
  }

  return [car.brand, car.model].filter(Boolean).join(" ") || "Unnamed vehicle";
}

function formatBookingId(id: string) {
  return `BK-${id.slice(0, 8).toUpperCase()}`;
}

function getPrimaryService(row: BookingRow) {
  return row.booking_services?.[0] ?? null;
}

function mapBookingRow(row: BookingRow): Booking {
  const primaryService = getPrimaryService(row);
  const service = primaryService?.service ?? primaryService?.services ?? null;

  return {
    id: row.id,
    bookingId: formatBookingId(row.id),
    client: row.client?.full_name ?? "Unassigned client",
    clientId: row.client?.id ?? row.client_id ?? "",
    vehicle: formatVehicle(row.car ?? null),
    vehicleId: row.car?.id ?? row.car_id ?? "",
    vin: row.car?.vin ?? "Not recorded",
    plateNumber: row.car?.plate_number ?? "Not recorded",
    service: service?.name ?? "Service not assigned",
    assignedEmployee:
      row.assignedEmployee?.full_name ?? row.assignedEmployee?.email ?? "Unassigned",
    date: row.scheduled_date ?? row.updated_at ?? row.created_at ?? new Date(0).toISOString(),
    price: row.price ?? primaryService?.price ?? service?.base_price ?? 0,
    status: normalizeStatus(row.status),
    bay: "Not assigned",
    notes: row.notes ?? primaryService?.notes ?? "No notes recorded.",
  };
}

export async function getBookings(): Promise<Booking[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select(bookingSelect)
    .order("scheduled_date", { ascending: false, nullsFirst: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => mapBookingRow(row as BookingRow));
}

export async function getBooking(id: string): Promise<Booking | null> {
  const { data, error } = await supabase
    .from("bookings")
    .select(bookingSelect)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapBookingRow(data as BookingRow) : null;
}
