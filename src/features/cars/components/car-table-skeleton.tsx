import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CarTableSkeleton() {
  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        <div className="grid gap-3 md:grid-cols-[1fr_180px_160px]">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
        <div className="hidden rounded-xl border border-white/10 md:block">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-8 gap-4 border-b border-white/10 p-4 last:border-b-0"
            >
              {Array.from({ length: 8 }).map((__, cellIndex) => (
                <Skeleton key={cellIndex} className="h-5" />
              ))}
            </div>
          ))}
        </div>
        <div className="space-y-3 md:hidden">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-40" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
