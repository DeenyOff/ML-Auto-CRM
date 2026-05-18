import { DashboardPage } from "@/features/dashboard/components/dashboard-page";
import {
  getDashboard,
  type DashboardData,
} from "@/services/dashboard/getDashboard";

export const dynamic = "force-dynamic";

const emptyDashboard: DashboardData = {
  metrics: [
    { label: "Active Clients", value: "0", trend: "0 recent clients" },
    { label: "Cars Managed", value: "0", trend: "+0 new records" },
    { label: "Bookings", value: "0", trend: "0 pending" },
    { label: "Revenue Pipeline", value: "EUR 0", trend: "All recorded bookings" },
  ],
  recentBookings: [],
  recentClients: [],
  bookingStatuses: [],
};

export default async function Home() {
  try {
    const data = await getDashboard();

    return <DashboardPage data={data} />;
  } catch (error) {
    return (
      <DashboardPage
        data={emptyDashboard}
        error={
          error instanceof Error
            ? error.message
            : "Unable to load dashboard data. Please try again."
        }
      />
    );
  }
}
