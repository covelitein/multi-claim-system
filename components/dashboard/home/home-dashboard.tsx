"use client";

import { HomeCalendar } from "@/components/dashboard/home/home-calendar";
import { HomeSkeleton } from "@/components/dashboard/home/home-skeleton";
import { MySchedule } from "@/components/dashboard/home/my-schedule";
import { StatCards } from "@/components/dashboard/home/stat-cards";
import { UpcomingAppointments } from "@/components/dashboard/home/upcoming-appointments";
import { VisitStats } from "@/components/dashboard/home/visit-stats";
import { VisitsChart } from "@/components/dashboard/home/visits-chart";
import { useDashboardHome } from "@/lib/dashboard/use-dashboard-home";
import { useMemo, useState } from "react";

export function HomeDashboard() {
  const { data, loading } = useDashboardHome();
  const [visitYear, setVisitYear] = useState<string>();
  const [month, setMonth] = useState<number>();
  const [selectedDate, setSelectedDate] = useState<string>();
  const [scheduleRange, setScheduleRange] = useState("day");

  const resolvedYear = visitYear ?? data?.defaultYear ?? "2023";
  const resolvedDate = selectedDate ?? data?.defaultDate ?? "2023-08-09";
  const resolvedMonth = month ?? Number(resolvedDate.slice(5, 7)) - 1;
  const calendarYear = Number(resolvedDate.slice(0, 4));

  const appointments = useMemo(
    () => data?.appointments.filter((item) => item.date === resolvedDate) ?? [],
    [data, resolvedDate],
  );

  if (loading || !data) {
    return <HomeSkeleton />;
  }

  return (
    <div className="flex min-w-0 flex-col gap-4 overflow-x-hidden pb-4 sm:gap-6">
      <StatCards
        internExtra={data.internExtra}
        interns={data.interns}
        stats={data.stats}
      />

      <div className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <VisitsChart
            months={data.months}
            selectedYear={resolvedYear}
            years={data.visits}
            onYearChange={setVisitYear}
          />
        </div>
        <HomeCalendar
          events={data.calendarEvents}
          month={resolvedMonth}
          selectedDate={resolvedDate}
          year={calendarYear}
          onMonthChange={setMonth}
          onSelectDate={(date) => {
            setSelectedDate(date);
            setMonth(Number(date.slice(5, 7)) - 1);
          }}
        />
      </div>

      <div className="grid min-w-0 gap-4 sm:gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <MySchedule
          days={data.schedule}
          range={scheduleRange}
          selectedDate={resolvedDate}
          onRangeChange={setScheduleRange}
          onSelectDate={setSelectedDate}
        />
        <UpcomingAppointments appointments={appointments} />
        <VisitStats range={data.visitStatsRange} stats={data.visitStats} />
      </div>
    </div>
  );
}
