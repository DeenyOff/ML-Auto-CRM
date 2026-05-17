"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavigationIcon, navigationItems } from "./navigation-items";

type SidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onToggleCollapsed: () => void;
};

export function Sidebar({
  collapsed,
  mobileOpen,
  onCloseMobile,
  onToggleCollapsed,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <button
        aria-label="Close navigation"
        className={cn(
          "fixed inset-0 z-30 bg-black/70 backdrop-blur-sm transition-opacity lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onCloseMobile}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-white/10 bg-[#070707]/95 shadow-2xl shadow-black/40 backdrop-blur-xl transition-all duration-300 lg:sticky lg:top-0 lg:h-screen",
          collapsed ? "lg:w-20" : "lg:w-72",
          mobileOpen ? "w-72 translate-x-0" : "w-72 -translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-20 items-center gap-3 border-b border-white/10 px-5">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-red-600 text-sm font-black tracking-tight text-white shadow-[0_12px_30px_rgba(220,38,38,0.26)]">
            ML
          </div>
          <div className={cn("min-w-0", collapsed && "lg:hidden")}>
            <p className="truncate text-sm font-semibold uppercase tracking-[0.28em] text-white">
              ML Auto
            </p>
            <p className="truncate text-xs text-zinc-500">Detailing CRM</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-5">
          {navigationItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={cn(
                  "group flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium text-zinc-400 transition-all duration-200 hover:bg-white/[0.06] hover:text-white",
                  active &&
                    "bg-red-600/12 text-white ring-1 ring-red-500/30 shadow-[inset_3px_0_0_rgb(220,38,38)]",
                  collapsed && "lg:justify-center lg:px-0",
                )}
              >
                <NavigationIcon
                  icon={item.icon}
                  className={cn(
                    "shrink-0 text-zinc-500 transition-colors group-hover:text-red-400",
                    active && "text-red-400",
                  )}
                />
                <span className={cn("truncate", collapsed && "lg:hidden")}>
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <Button
            variant="outline"
            className="hidden w-full lg:inline-flex"
            size={collapsed ? "icon" : "default"}
            onClick={onToggleCollapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <span className="text-lg leading-none">{collapsed ? ">" : "<"}</span>
            <span className={cn(collapsed && "lg:hidden")}>Collapse</span>
          </Button>
        </div>
      </aside>
    </>
  );
}
