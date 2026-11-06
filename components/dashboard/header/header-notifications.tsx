"use client";

import { HeaderMenuPopover } from "@/components/dashboard/header/header-menu-popover";
import { useWorkspace } from "@/lib/dashboard/workspace-store";
import { Bell } from "@gravity-ui/icons";
import { Dropdown } from "@heroui/react";

const NOTIFICATIONS = [
  { id: "gap", title: "Face sheet missing", detail: "Sunrise Villa · 12m ago" },
  { id: "deny", title: "Claim returned", detail: "Genworth · 28m ago" },
  { id: "due", title: "Appeal due tomorrow", detail: "Riverbend SNF · 1h ago" },
];

export function HeaderNotifications() {
  const showToast = useWorkspace((s) => s.showToast);
  return (
    <Dropdown>
      <Dropdown.Trigger
        aria-label="Notifications"
        className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-surface-secondary [&>svg]:m-0"
      >
        <Bell className="size-5 text-muted" />
        <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-danger" />
      </Dropdown.Trigger>
      <HeaderMenuPopover>
        <div className="px-3.5 pt-3 pb-1 text-xs font-medium text-muted">
          Notifications
        </div>
        <Dropdown.Menu
          onAction={(key) => {
            const item = NOTIFICATIONS.find((entry) => entry.id === key);
            showToast(item ? item.title : "You are all caught up.");
          }}
        >
          {NOTIFICATIONS.map((item) => (
            <Dropdown.Item key={item.id} id={item.id} textValue={item.title}>
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="text-sm font-medium">{item.title}</span>
                <span className="text-xs text-muted">{item.detail}</span>
              </div>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </HeaderMenuPopover>
    </Dropdown>
  );
}
