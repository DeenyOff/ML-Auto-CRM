"use client";

import { useState } from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";

type AppShellProps = {
  children: React.ReactNode;
  title?: string;
  eyebrow?: string;
};

export function AppShell({ children, title, eyebrow }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_32%)]" />
      <div className="relative flex min-h-screen">
        <Sidebar
          collapsed={sidebarCollapsed}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
          onToggleCollapsed={() => setSidebarCollapsed((current) => !current)}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopNavbar
            eyebrow={eyebrow}
            title={title}
            onOpenMobile={() => setMobileSidebarOpen(true)}
          />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
