import { Button } from "@/components/ui/button";

const actions = ["Add booking", "Add note", "Add car", "Upload photo"];

export function ClientQuickActions() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {actions.map((action, index) => (
        <Button
          key={action}
          variant={index === 0 ? "default" : "outline"}
          className="h-12 justify-start"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-black/20 text-sm">
            +
          </span>
          {action}
        </Button>
      ))}
    </div>
  );
}
