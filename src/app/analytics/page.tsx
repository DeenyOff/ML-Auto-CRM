import { AnalyticsPage } from "@/features/analytics/components/analytics-page";
import { getAnalytics } from "@/services/analytics/getAnalytics";

export const dynamic = "force-dynamic";

export default async function AnalyticsRoute() {
  try {
    const data = await getAnalytics();

    return <AnalyticsPage data={data} />;
  } catch (error) {
    return (
      <AnalyticsPage
        data={null}
        error={
          error instanceof Error
            ? error.message
            : "Unable to load analytics. Please try again."
        }
      />
    );
  }
}
