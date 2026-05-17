import type { NavigationItem } from "@/types/navigation";

export const navigationItems: NavigationItem[] = [
  { title: "Dashboard", href: "/", icon: "dashboard" },
  { title: "Clients", href: "/clients", icon: "clients" },
  { title: "Cars", href: "/cars", icon: "cars" },
  { title: "Bookings", href: "/bookings", icon: "bookings" },
  { title: "Analytics", href: "/analytics", icon: "analytics" },
  { title: "Settings", href: "/settings", icon: "settings" },
];

type NavigationIconProps = {
  icon: NavigationItem["icon"];
  className?: string;
};

export function NavigationIcon({ icon, className }: NavigationIconProps) {
  const commonProps = {
    className,
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (icon) {
    case "clients":
      return (
        <svg {...commonProps}>
          <path d="M16 19c0-2.2-1.8-4-4-4H7c-2.2 0-4 1.8-4 4" />
          <path d="M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
          <path d="M21 19c0-1.9-1.3-3.4-3.1-3.9" />
          <path d="M16.5 4.4a3.5 3.5 0 0 1 0 6.2" />
        </svg>
      );
    case "cars":
      return (
        <svg {...commonProps}>
          <path d="m4 13 1.8-5.1A3 3 0 0 1 8.6 6h6.8a3 3 0 0 1 2.8 1.9L20 13" />
          <path d="M3 13h18v5H3z" />
          <path d="M6.5 18v2" />
          <path d="M17.5 18v2" />
          <path d="M6.5 15.5h.1" />
          <path d="M17.4 15.5h.1" />
        </svg>
      );
    case "bookings":
      return (
        <svg {...commonProps}>
          <path d="M7 3v3" />
          <path d="M17 3v3" />
          <path d="M4 8h16" />
          <path d="M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" />
          <path d="m8 14 2.2 2.2L16 10.5" />
        </svg>
      );
    case "analytics":
      return (
        <svg {...commonProps}>
          <path d="M4 19V5" />
          <path d="M4 19h16" />
          <path d="M8 16v-5" />
          <path d="M12 16V8" />
          <path d="M16 16v-3" />
        </svg>
      );
    case "settings":
      return (
        <svg {...commonProps}>
          <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2 3.4-.2-.1a1.7 1.7 0 0 0-1.9.1 8 8 0 0 1-1.6.9 1.7 1.7 0 0 0-1.1 1.6v.1H9v-.1a1.7 1.7 0 0 0-1.1-1.6 8 8 0 0 1-1.6-.9 1.7 1.7 0 0 0-1.9-.1l-.2.1-2-3.4.1-.1A1.7 1.7 0 0 0 2.6 15 8.5 8.5 0 0 1 2 13a1.7 1.7 0 0 0-1.3-1.5H.5v-4h.2A1.7 1.7 0 0 0 2 6 8.5 8.5 0 0 1 2.6 4a1.7 1.7 0 0 0-.3-1.9l-.1-.1 2-3.4.2.1a1.7 1.7 0 0 0 1.9-.1 8 8 0 0 1 1.6-.9A1.7 1.7 0 0 0 9 .1V0h4v.1a1.7 1.7 0 0 0 1.1 1.6 8 8 0 0 1 1.6.9 1.7 1.7 0 0 0 1.9.1l.2-.1 2 3.4-.1.1A1.7 1.7 0 0 0 19.4 8c.3.6.5 1.3.6 2a1.7 1.7 0 0 0 1.3 1.5h.2v4h-.2A1.7 1.7 0 0 0 20 13c-.1.7-.3 1.4-.6 2Z" />
        </svg>
      );
    default:
      return (
        <svg {...commonProps}>
          <path d="M4 5a1 1 0 0 1 1-1h5v7H4z" />
          <path d="M14 4h5a1 1 0 0 1 1 1v3h-6z" />
          <path d="M14 12h6v7a1 1 0 0 1-1 1h-5z" />
          <path d="M4 15h6v5H5a1 1 0 0 1-1-1z" />
        </svg>
      );
  }
}
