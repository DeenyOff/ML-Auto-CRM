import { supabase } from "@/lib/supabase/client";

type ClientAnalyticsRow = {
  id: string;
  full_name: string | null;
  vip_status: boolean | null;
  total_spent: number | null;
};

type CarAnalyticsRow = {
  brand: string | null;
};

type BookingAnalyticsRow = {
  status: string | null;
  price: number | null;
};

export type AnalyticsMetric = {
  label: string;
  value: string;
  detail: string;
};

export type AnalyticsListItem = {
  label: string;
  value: number;
};

export type TopClientAnalyticsItem = {
  id: string;
  name: string;
  totalSpent: number;
};

export type AnalyticsData = {
  metrics: AnalyticsMetric[];
  bookingsByStatus: AnalyticsListItem[];
  vehiclesByBrand: AnalyticsListItem[];
  topClientsByTotalSpent: TopClientAnalyticsItem[];
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

function normalizeBookingStatus(status: string | null) {
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

function countByLabel(items: string[]) {
  const counts = new Map<string, number>();

  for (const item of items) {
    counts.set(item, (counts.get(item) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((first, second) => second.value - first.value);
}

export async function getAnalytics(): Promise<AnalyticsData> {
  const [clientsResult, carsResult, bookingsResult] = await Promise.all([
    supabase
      .from("clients")
      .select("id, full_name, vip_status, total_spent"),
    supabase
      .from("cars")
      .select("brand"),
    supabase
      .from("bookings")
      .select("status, price"),
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

  const clients = (clientsResult.data ?? []) as ClientAnalyticsRow[];
  const cars = (carsResult.data ?? []) as CarAnalyticsRow[];
  const bookings = (bookingsResult.data ?? []) as BookingAnalyticsRow[];
  const normalizedStatuses = bookings.map((booking) =>
    normalizeBookingStatus(booking.status),
  );
  const totalRevenue = bookings.reduce(
    (total, booking) => total + (booking.price ?? 0),
    0,
  );
  const completedBookings = normalizedStatuses.filter(
    (status) => status === "Completed",
  ).length;
  const vipClients = clients.filter((client) => client.vip_status).length;

  return {
    metrics: [
      {
        label: "Total clients",
        value: clients.length.toString(),
        detail: `${vipClients} VIP clients`,
      },
      {
        label: "Total vehicles",
        value: cars.length.toString(),
        detail: "Registered vehicles",
      },
      {
        label: "Total bookings",
        value: bookings.length.toString(),
        detail: "All service jobs",
      },
      {
        label: "Completed bookings",
        value: completedBookings.toString(),
        detail: "Finished service jobs",
      },
      {
        label: "Total revenue",
        value: currencyFormatter.format(totalRevenue),
        detail: "From booking prices",
      },
      {
        label: "VIP clients",
        value: vipClients.toString(),
        detail: "Premium client records",
      },
    ],
    bookingsByStatus: countByLabel(normalizedStatuses),
    vehiclesByBrand: countByLabel(
      cars.map((car) => car.brand?.trim() || "Unknown brand"),
    ),
    topClientsByTotalSpent: clients
      .map((client) => ({
        id: client.id,
        name: client.full_name ?? "Unnamed client",
        totalSpent: client.total_spent ?? 0,
      }))
      .filter((client) => client.totalSpent > 0)
      .sort((first, second) => second.totalSpent - first.totalSpent)
      .slice(0, 5),
  };
}
