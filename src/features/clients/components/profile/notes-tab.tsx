import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ClientProfile } from "@/features/clients/types/client";
import { dateTimeFormatter } from "@/features/clients/components/profile/profile-formatters";

type NotesTabProps = {
  client: ClientProfile;
};

export function NotesTab({ client }: NotesTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base text-white">Employee Notes</CardTitle>
        <p className="text-sm text-zinc-500">
          Internal service observations and relationship context.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {client.notes.map((note) => (
          <article
            key={note.id}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-zinc-900 text-sm font-semibold text-red-200">
                  {note.author.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">
                    {note.author.name}
                  </h3>
                  <p className="text-xs text-zinc-500">{note.author.role}</p>
                </div>
              </div>
              <time className="text-xs text-zinc-500">
                {dateTimeFormatter.format(new Date(note.timestamp))}
              </time>
            </div>
            <p className="mt-4 text-sm leading-6 text-zinc-300">{note.body}</p>
          </article>
        ))}
      </CardContent>
    </Card>
  );
}
