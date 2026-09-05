import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import { Card, Skeleton } from "@heroui/react";

export function HomeSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }, (_, index) => (
          <Card key={index} className={dashboardCardClass}>
            <Skeleton className="h-4 w-28 rounded-full" />
            <Skeleton className="mt-3 h-7 w-16 rounded-lg" />
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className={`${dashboardCardClass} xl:col-span-2`}>
          <Skeleton className="h-4 w-32 rounded-full" />
          <Skeleton className="mt-5 h-52 w-full rounded-2xl" />
        </Card>
        <Card className={dashboardCardClass}>
          <Skeleton className="h-4 w-24 rounded-full" />
          <Skeleton className="mt-5 h-52 w-full rounded-2xl" />
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
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
