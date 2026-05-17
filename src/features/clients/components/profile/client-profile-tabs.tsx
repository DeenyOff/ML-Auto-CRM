"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import type { ClientProfile } from "@/features/clients/types/client";
import { CarsTab } from "@/features/clients/components/profile/cars-tab";
import { HistoryTab } from "@/features/clients/components/profile/history-tab";
import { NotesTab } from "@/features/clients/components/profile/notes-tab";
import { OverviewTab } from "@/features/clients/components/profile/overview-tab";
import { PhotosTab } from "@/features/clients/components/profile/photos-tab";
import { PreferencesTab } from "@/features/clients/components/profile/preferences-tab";

type ClientProfileTabsProps = {
  client: ClientProfile;
};

const tabs = [
  "Overview",
  "Cars",
  "History",
  "Preferences",
  "Notes",
  "Photos",
] as const;

type ClientProfileTab = (typeof tabs)[number];

export function ClientProfileTabs({ client }: ClientProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<ClientProfileTab>("Overview");

  return (
    <section className="space-y-6">
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-zinc-950/70 p-1">
        <div className="flex min-w-max gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-400 transition-colors duration-200 hover:bg-white/[0.06] hover:text-white",
                activeTab === tab &&
                  "bg-red-600 text-white shadow-[0_10px_28px_rgba(220,38,38,0.22)]",
              )}
              aria-pressed={activeTab === tab}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "Overview" && <OverviewTab client={client} />}
      {activeTab === "Cars" && <CarsTab client={client} />}
      {activeTab === "History" && <HistoryTab client={client} />}
      {activeTab === "Preferences" && <PreferencesTab client={client} />}
      {activeTab === "Notes" && <NotesTab client={client} />}
      {activeTab === "Photos" && <PhotosTab client={client} />}
    </section>
  );
}
