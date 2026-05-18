import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "destructive" | "ghost" | "outline";
type ButtonSize = "default" | "icon" | "sm";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-red-600 text-white shadow-[0_12px_30px_rgba(220,38,38,0.22)] hover:bg-red-500",
  destructive:
    "bg-red-600 text-white shadow-[0_12px_30px_rgba(220,38,38,0.22)] hover:bg-red-500",
  ghost: "text-zinc-300 hover:bg-white/[0.06] hover:text-white",
  outline:
    "border border-white/10 bg-white/[0.03] text-zinc-100 hover:border-red-500/50 hover:bg-red-500/10",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2",
  icon: "h-10 w-10",
  sm: "h-9 px-3",
};

export function Button({
  className,
  variant = "default",
  size = "default",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/70 disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
