"use client";

import type { Intern } from "@/lib/dashboard/home-data";
import { Avatar, Tooltip } from "@heroui/react";

export function AvatarStack({
  people,
  extra,
}: {
  people: Intern[];
  extra?: number;
}) {
  return (
    <div className="flex items-center">
      {people.map((person) => (
        <Tooltip key={person.id} delay={80}>
          <Tooltip.Trigger className="-ms-2 first:ms-0">
            <Avatar className="size-8 ring-2 ring-surface">
              <Avatar.Image alt={person.name} src={person.image} />
              <Avatar.Fallback>{person.initials}</Avatar.Fallback>
            </Avatar>
          </Tooltip.Trigger>
          <Tooltip.Content>{person.name}</Tooltip.Content>
        </Tooltip>
      ))}
      {extra ? (
        <span className="ms-2 flex size-8 items-center justify-center rounded-full bg-accent/15 text-xs font-medium text-accent">
          +{extra}
        </span>
      ) : null}
    </div>
  );
}
