import { AppShell } from "@/components/layout/app-shell";
import { AnalyticsLoadingSkeleton } from "@/features/analytics/components/analytics-loading-skeleton";

export default function Loading() {
  return (
    <AppShell title="Analytics" eyebrow="Business Intelligence">
      <AnalyticsLoadingSkeleton />
    </AppShell>
  );
}
