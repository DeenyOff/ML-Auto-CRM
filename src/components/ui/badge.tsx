import * as React from "react";

import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "muted";

const variantClasses: Record<BadgeVariant, string> = {
  default: "border-red-500/30 bg-red-500/10 text-red-200",
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
  muted: "border-white/10 bg-white/[0.04] text-zinc-400",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
