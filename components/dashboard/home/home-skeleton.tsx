import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import { Card, Skeleton } from "@heroui/react";

export function HomeSkeleton() {
  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Skeleton className="h-7 w-72 rounded-lg" />
          <Skeleton className="mt-2 h-4 w-64 rounded-full" />
        </div>
        <Skeleton className="h-9 w-52 rounded-full" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Card key={index} className={dashboardCardClass}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <Skeleton className="h-4 w-20 rounded-full" />
                <Skeleton className="mt-3 h-8 w-14 rounded-lg" />
                <Skeleton className="mt-3 h-3 w-16 rounded-full" />
              </div>
              <Skeleton className="size-11 rounded-2xl" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-3 xl:gap-6">
        {Array.from({ length: 3 }, (_, index) => (
          <Card key={index} className={dashboardCardClass}>
            <Skeleton className="h-4 w-32 rounded-full" />
            <Skeleton className="mt-5 h-44 w-full rounded-2xl" />
          </Card>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-3 xl:gap-6">
        {Array.from({ length: 3 }, (_, index) => (
          <Card key={index} className={dashboardCardClass}>
            <Skeleton className="h-4 w-28 rounded-full" />
            <Skeleton className="mt-5 h-36 w-full rounded-2xl" />
          </Card>
        ))}
      </div>
    </div>
  );
}
