"use client";

import { CenteredModalFrame } from "@/components/dashboard/header/centered-modal-frame";
import { CLAIMS_DATA } from "@/lib/dashboard/claims-data";
import { RESIDENTS_DATA } from "@/lib/dashboard/residents-data";
import { useWorkspace } from "@/lib/dashboard/workspace-store";
import { Magnifier } from "@gravity-ui/icons";
import { Button, Modal } from "@heroui/react";
import Link from "next/link";
import { useMemo, useState } from "react";

function SearchBox({ autoFocus = false }: { autoFocus?: boolean }) {
  const [query, setQuery] = useState("");
  const requests = useWorkspace((s) => s.requests);
  const addedResidents = useWorkspace((s) => s.addedResidents);
  const addedClaims = useWorkspace((s) => s.addedClaims);
  const [open, setOpen] = useState(false);
  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (q.length < 2) return [];
    const residents = [...addedResidents, ...RESIDENTS_DATA.residents]
      .filter((resident) =>
        `${resident.firstName} ${resident.lastName} ${resident.policyId} ${resident.facility}`
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 4)
      .map((resident) => ({
        key: resident.residentId,
        href: `/billing/cmr?resident=${resident.residentId}`,
        title: `${resident.firstName} ${resident.lastName}`,
        meta: `${resident.policyId} · Resident`,
      }));
    const claims = [...addedClaims, ...CLAIMS_DATA.claims]
      .filter((claim) =>
        `${claim.policyId} ${claim.residentName} ${claim.insurer}`
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 4)
      .map((claim) => ({
        key: claim.id,
        href: "/billing",
        title: claim.policyId,
        meta: `${claim.residentName} · Claim`,
      }));
    const requestHits = requests
      .filter((request) =>
        `${request.id} ${request.residentName} ${request.next}`.toLowerCase().includes(q),
      )
      .slice(0, 3)
      .map((request) => ({
        key: request.id,
        href: "/billing?view=requests",
        title: request.id,
        meta: `${request.residentName} · ${request.next}`,
      }));
    return [...residents, ...claims, ...requestHits];
  }, [addedClaims, addedResidents, q, requests]);

  return (
    <div className="relative w-full">
      <div className="flex h-11 items-center rounded-full bg-surface">
        <input
          autoFocus={autoFocus}
          className="h-full min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-muted"
          placeholder="Search claims or residents"
          value={query}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
        <Magnifier className="me-3 size-4 shrink-0 text-muted" />
      </div>
      {open && q.length >= 2 ? (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-border bg-surface shadow-md">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm font-medium text-muted">No matches</p>
          ) : (
            <ul>
              {results.map((result) => (
                <li key={result.key}>
                  <Link
                    className="block px-4 py-2.5 hover:bg-surface-secondary"
                    href={result.href}
                    onClick={() => setOpen(false)}
                  >
                    <span className="block text-sm font-bold">{result.title}</span>
                    <span className="block text-xs font-medium text-muted">
                      {result.meta}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}

export function HeaderSearch({ variant }: { variant: "field" | "dialog" }) {
  if (variant === "field") {
    return (
      <div className="w-full max-w-md">
        <SearchBox />
      </div>
    );
  }

  return (
    <Modal>
      <Button
        isIconOnly
        aria-label="Search"
        className="size-10 rounded-full bg-surface [&>svg]:m-0"
        variant="ghost"
      >
        <Magnifier className="size-5 text-muted" />
      </Button>
      <CenteredModalFrame>
        <Modal.Header>
          <Modal.Heading>Search</Modal.Heading>
          <Modal.CloseTrigger />
        </Modal.Header>
        <Modal.Body>
          <SearchBox autoFocus />
        </Modal.Body>
      </CenteredModalFrame>
    </Modal>
  );
}
