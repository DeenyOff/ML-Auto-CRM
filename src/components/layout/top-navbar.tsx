"use client";

import { Button } from "@/components/ui/button";

type TopNavbarProps = {
  onOpenMobile: () => void;
  title?: string;
  eyebrow?: string;
};

export function TopNavbar({
  onOpenMobile,
  title = "Dashboard",
  eyebrow = "Premium CRM",
}: TopNavbarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0a0a0a]/82 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onOpenMobile}
            aria-label="Open navigation"
          >
            <span className="flex flex-col gap-1.5">
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
            </span>
          </Button>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.26em] text-red-400">
              {eyebrow}
            </p>
            <h1 className="text-xl font-semibold text-white sm:text-2xl">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-white">Admin</p>
            <p className="text-xs text-zinc-500">ML Auto Operations</p>
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-sm font-semibold text-white">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
