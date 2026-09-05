"use client";

import { CenteredModalFrame } from "@/components/dashboard/header/centered-modal-frame";
import { Magnifier } from "@gravity-ui/icons";
import { Button, Modal, SearchField } from "@heroui/react";

function SearchBox({ autoFocus = false }: { autoFocus?: boolean }) {
  return (
    <SearchField className="w-full" name="search">
      <SearchField.Group className="h-11 rounded-full bg-surface">
        <SearchField.Input
          autoFocus={autoFocus}
          className="h-full"
          placeholder="Search claims or residents"
        />
        <Magnifier className="me-3 size-4 shrink-0 text-muted" />
      </SearchField.Group>
    </SearchField>
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
