"use client";

import { HeaderMenuPopover } from "@/components/dashboard/header/header-menu-popover";
import { ArrowDownToLine, FileText, Printer } from "@gravity-ui/icons";
import { Dropdown } from "@heroui/react";

export function HeaderExportItems() {
  return (
    <>
      <Dropdown.Item id="csv" textValue="Export CSV">
        <FileText className="size-4" />
        Export CSV
      </Dropdown.Item>
      <Dropdown.Item id="pdf" textValue="Export PDF">
        <FileText className="size-4" />
        Export PDF
      </Dropdown.Item>
      <Dropdown.Item id="print" textValue="Print">
        <Printer className="size-4" />
        Print
      </Dropdown.Item>
    </>
  );
}

export function HeaderExport() {
  return (
    <Dropdown>
      <Dropdown.Trigger
        aria-label="Export"
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-surface hover:bg-surface-tertiary [&>svg]:m-0"
      >
        <ArrowDownToLine className="size-5 text-muted" />
      </Dropdown.Trigger>
      <HeaderMenuPopover desktopPlacement="bottom end">
        <Dropdown.Menu>
          <HeaderExportItems />
        </Dropdown.Menu>
      </HeaderMenuPopover>
    </Dropdown>
  );
}
