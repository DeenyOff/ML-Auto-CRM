import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ClientProfile } from "@/features/clients/types/client";

type PreferencesTabProps = {
  client: ClientProfile;
};

export function PreferencesTab({ client }: PreferencesTabProps) {
  const preferences = [
    ["Contact method", client.preferences.contactMethod],
    ["Pickup window", client.preferences.pickupWindow],
    ["Invoice preference", client.preferences.invoicePreference],
    ["Waiting area", client.preferences.waitingArea],
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <Card>
        <CardHeader>
          <CardTitle className="text-base text-white">
            Client Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {preferences.map(([label, value]) => (
            <div
              key={label}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
            >
              <p className="text-xs uppercase text-zinc-500">{label}</p>
              <p className="mt-2 text-sm font-medium text-white">{value}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base text-white">
              Special Instructions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {client.preferences.specialInstructions.length ? (
              client.preferences.specialInstructions.map((instruction) => (
                <div
                  key={instruction}
                  className="rounded-lg border border-red-500/20 bg-red-500/[0.06] p-4 text-sm text-red-50"
                >
                  {instruction}
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-500">
                No special instructions recorded.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base text-white">
              Favorite Services
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {client.preferences.favoriteServices.length ? (
              client.preferences.favoriteServices.map((service) => (
                <Badge key={service} variant="default">
                  {service}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-zinc-500">
                No favorite services recorded.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
