import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const systemSettings = [
  { label: "CRM version", value: "0.1.0" },
  { label: "Supabase connected", value: "Connected" },
  { label: "Environment", value: "Development" },
];

const roles = ["Admin", "Manager", "Employee"];

const futureSettings = [
  "Notifications",
  "Booking rules",
  "Theme settings",
  "Permissions",
];

function SectionDescription({ children }: { children: ReactNode }) {
  return <p className="text-sm text-zinc-500">{children}</p>;
}

export function SettingsPage() {
  return (
    <AppShell title="Settings" eyebrow="CRM Controls">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section>
          <p className="text-sm uppercase tracking-[0.24em] text-red-400">
            ML Auto workspace
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Settings
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-500">
            Static CRM configuration placeholders for the ML Auto operations
            workspace.
          </p>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-white">
                Company profile
              </CardTitle>
              <SectionDescription>
                Core business identity used across the CRM.
              </SectionDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-zinc-200" htmlFor="company-name">
                  Company name
                </label>
                <Input id="company-name" value="ML Auto" readOnly />
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-200" htmlFor="company-category">
                  Product
                </label>
                <Input
                  id="company-category"
                  value="Automotive detailing CRM"
                  readOnly
                />
              </div>
              <Button variant="outline" disabled>
                Save profile
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base text-white">
                System settings
              </CardTitle>
              <SectionDescription>
                Current CRM runtime information.
              </SectionDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {systemSettings.map((setting) => (
                <div
                  key={setting.label}
                  className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4"
                >
                  <span className="text-sm text-zinc-400">
                    {setting.label}
                  </span>
                  <span className="text-sm font-medium text-white">
                    {setting.value}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-white">
                User roles
              </CardTitle>
              <SectionDescription>
                Role management placeholder for future access control.
              </SectionDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              {roles.map((role) => (
                <Badge key={role} variant={role === "Admin" ? "default" : "muted"}>
                  {role}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base text-white">
                Future settings
              </CardTitle>
              <SectionDescription>
                Planned configuration areas for later implementation.
              </SectionDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {futureSettings.map((setting) => (
                <div
                  key={setting}
                  className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
                >
                  <p className="font-medium text-white">{setting}</p>
                  <p className="mt-1 text-sm text-zinc-500">Coming soon</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
