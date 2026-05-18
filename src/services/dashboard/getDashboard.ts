import { supabase } from "@/lib/supabase/client";

type ClientRow = {
  id: string;
  full_name: string | null;
  last_visit: string | null;
};

type CarRow = {
  id: string;
  created_at: string | null;
};

type BookingServiceRow = {
  service:
    | {
        name: string | null;
      }
    | Array<{
        name: string | null;
      }>
    | null;
  services?: {
    name: string | null;
  } | null;
};

type BookingRow = {
  id: string;
  scheduled_date: string | null;
  price: number | null;
  status: string | null;
  client:
    | {
        full_name: string | null;
      }
    | Array<{
        full_name: string | null;
      }>
    | null;
  car:
    | {
        brand: string | null;
        model: string | null;
      }
    | Array<{
        brand: string | null;
        model: string | null;
      }>
    | null;
  booking_services: BookingServiceRow[] | null;
};

export type DashboardMetric = {
  label: string;
  value: string;
  trend: string;
};

export type DashboardBooking = {
  id: string;
  time: string;
  client: string;
  vehicle: string;
  service: string;
};

export type DashboardStatus = {
  label: string;
  value: number;
};

export type DashboardData = {
  metrics: DashboardMetric[];
  recentBookings: DashboardBooking[];
  recentClients: Array<{
    id: string;
    name: string;
  }>;
  bookingStatuses: DashboardStatus[];
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 1,
  notation: "compact",
});

function normalizeStatus(status: string | null) {
  const value = status?.toLowerCase().replace(/[_-]/g, " ") ?? "";

  if (value.includes("confirm")) {
    return "Confirmed";
  }

  if (value.includes("progress")) {
    return "In detailing";
  }

  if (value.includes("wait")) {
    return "Awaiting pickup";
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

function isThisMonth(value: string | null) {
  if (!value) {
    return false;
  }

  const date = new Date(value);
  const now = new Date();

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth()
  );
}

function formatBookingTime(value: string | null) {
  if (!value) {
    return "--:--";
  }

  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
}

function formatVehicle(car: BookingRow["car"]) {
  const relation = Array.isArray(car) ? car[0] : car;

  if (!relation) {
    return "Unassigned vehicle";
  }

  return (
    [relation.brand, relation.model].filter(Boolean).join(" ") ||
    "Unnamed vehicle"
  );
}

function formatService(row: BookingRow) {
  const primaryService = row.booking_services?.[0] ?? null;
  const serviceRelation = primaryService?.service ?? primaryService?.services ?? null;
  const service = Array.isArray(serviceRelation)
    ? serviceRelation[0]
    : serviceRelation;

  return service?.name ?? "Service not assigned";
}

function countStatuses(bookings: BookingRow[]) {
  const counts = new Map<string, number>();

  for (const booking of bookings) {
    const status = normalizeStatus(booking.status);
    counts.set(status, (counts.get(status) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((first, second) => second.value - first.value)
    .slice(0, 3);
}

export async function getDashboard(): Promise<DashboardData> {
  const [clientsResult, carsResult, bookingsResult] = await Promise.all([
    supabase
      .from("clients")
      .select("id, full_name, last_visit")
      .order("last_visit", { ascending: false, nullsFirst: false }),
    supabase
      .from("cars")
      .select("id, created_at"),
    supabase
      .from("bookings")
      .select(
        `
          id,
          scheduled_date,
          price,
          status,
          client:clients(full_name),
          car:cars(brand, model),
          booking_services(service:services(name))
        `,
      )
      .order("scheduled_date", { ascending: false, nullsFirst: false }),
  ]);

  if (clientsResult.error) {
    throw new Error(clientsResult.error.message);
  }

  if (carsResult.error) {
    throw new Error(carsResult.error.message);
  }

  if (bookingsResult.error) {
    throw new Error(bookingsResult.error.message);
  }

  const clients = (clientsResult.data ?? []) as ClientRow[];
  const cars = (carsResult.data ?? []) as CarRow[];
  const bookings = (bookingsResult.data ?? []) as unknown as BookingRow[];
  const recentClients = clients.slice(0, 3).map((client) => ({
    id: client.id,
    name: client.full_name ?? "Unnamed client",
  }));
  const activeBookings = bookings.filter(
    (booking) =>
      !["Completed", "Delivered", "Cancelled"].includes(
        normalizeStatus(booking.status),
      ),
  ).length;
  const totalRevenue = bookings.reduce(
    (total, booking) => total + (booking.price ?? 0),
    0,
  );

  return {
    metrics: [
      {
        label: "Active Clients",
        value: clients.length.toString(),
        trend: `${recentClients.length} recent clients`,
      },
      {
        label: "Cars Managed",
        value: cars.length.toString(),
        trend: `+${cars.filter((car) => isThisMonth(car.created_at)).length} new records`,
      },
      {
        label: "Bookings",
        value: bookings.length.toString(),
        trend: `${activeBookings} pending`,
      },
      {
        label: "Revenue Pipeline",
        value: currencyFormatter.format(totalRevenue),
        trend: "All recorded bookings",
      },
    ],
    recentBookings: bookings.slice(0, 3).map((booking) => ({
      id: booking.id,
      time: formatBookingTime(booking.scheduled_date),
      client:
        (Array.isArray(booking.client)
          ? booking.client[0]?.full_name
          : booking.client?.full_name) ?? "Unassigned client",
      vehicle: formatVehicle(booking.car),
      service: formatService(booking),
    })),
    recentClients,
    bookingStatuses: countStatuses(bookings),
  };
}
