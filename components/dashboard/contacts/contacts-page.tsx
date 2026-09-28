"use client";

import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import {
  fetchContacts,
  type ClientContact,
  type ContactsPageData,
} from "@/lib/dashboard/contacts-data";
import { Envelope, Magnifier, Smartphone } from "@gravity-ui/icons";
import { Card, Chip } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";

const ROLE_COLOR: Record<
  ClientContact["role"],
  "accent" | "success" | "warning" | "danger" | "default"
> = {
  "Insurer claims": "accent",
  "Facility referral": "success",
  "Resident family": "warning",
  Vendor: "default",
  Other: "default",
};

export function ContactsPage() {
  const [data, setData] = useState<ContactsPageData | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchContacts().then(setData);
  }, []);

  const contacts = useMemo(() => {
    if (!data) return [];
    if (!query.trim()) return data.contacts;
    const lower = query.toLowerCase();
    return data.contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(lower) ||
        c.organization.toLowerCase().includes(lower) ||
        c.role.toLowerCase().includes(lower) ||
        c.email.toLowerCase().includes(lower) ||
        c.phone.toLowerCase().includes(lower) ||
        c.notes.toLowerCase().includes(lower),
    );
  }, [data, query]);

  if (!data) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-col gap-4 pb-2">
      <div>
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
          Client contacts
        </h1>
        <p className="mt-0.5 text-sm text-muted">
          Searchable contact list for insurers, family, and facility partners.
        </p>
      </div>

      <div className="flex w-full max-w-md items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20">
        <Magnifier className="size-3.5 shrink-0 text-muted" />
        <input
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
          placeholder="Search name, insurer, phone, or notes…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="grid min-w-0 gap-4 sm:grid-cols-2">
        {contacts.map((contact) => (
          <Card
            key={contact.id}
            className={`${dashboardCardClass} border-l-4 border-l-accent`}
          >
            <Card.Header className="flex-row items-start justify-between gap-3">
              <div className="min-w-0">
                <Card.Title className="text-base font-bold leading-snug">
                  {contact.name}
                </Card.Title>
                <p className="mt-1 text-sm font-semibold text-muted">
                  {contact.organization}
                </p>
              </div>
              <Chip color={ROLE_COLOR[contact.role]} size="sm" variant="soft">
                <Chip.Label>{contact.role}</Chip.Label>
              </Chip>
            </Card.Header>
            <Card.Content className="gap-2.5">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Envelope className="size-4 shrink-0 text-accent" />
                <span className="truncate">{contact.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Smartphone className="size-4 shrink-0 text-success" />
                <span>{contact.phone}</span>
              </div>
              <p className="rounded-xl bg-surface-secondary px-3 py-2 text-sm text-muted">
                {contact.notes}
              </p>
              <p className="text-xs font-semibold text-muted">
                Last contacted {contact.lastContacted}
              </p>
            </Card.Content>
          </Card>
        ))}
      </div>

      {contacts.length === 0 ? (
        <p className="py-10 text-center text-base font-semibold text-muted">
          No contacts match your search.
        </p>
      ) : null}
    </div>
  );
}
