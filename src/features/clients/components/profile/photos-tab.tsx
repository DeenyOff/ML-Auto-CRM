import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ClientProfile } from "@/features/clients/types/client";
import { dateFormatter } from "@/features/clients/components/profile/profile-formatters";

type PhotosTabProps = {
  client: ClientProfile;
};

export function PhotosTab({ client }: PhotosTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base text-white">Photo Gallery</CardTitle>
        <p className="text-sm text-zinc-500">
          Before and after records for client approval and service history.
        </p>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {client.photos.map((photo) => (
          <article
            key={photo.id}
            className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]"
          >
            <div
              className="aspect-[4/3] bg-cover bg-center"
              style={{ backgroundImage: `url(${photo.imageUrl})` }}
            />
            <div className="space-y-3 p-4">
              <div className="flex items-center justify-between gap-3">
                <Badge variant={photo.type === "After" ? "success" : "muted"}>
                  {photo.type}
                </Badge>
                <time className="text-xs text-zinc-500">
                  {dateFormatter.format(new Date(photo.date))}
                </time>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">
                  {photo.title}
                </h3>
                <p className="mt-1 text-xs text-zinc-500">{photo.vehicle}</p>
              </div>
            </div>
          </article>
        ))}
      </CardContent>
    </Card>
  );
}
