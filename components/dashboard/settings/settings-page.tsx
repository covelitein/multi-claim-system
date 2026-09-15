"use client";

import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import {
  Bell,
  Gear,
  Lock,
  Shield,
} from "@gravity-ui/icons";
import {
  Button,
  Card,
  Input,
  Label,
  Switch,
  TextField,
  cn,
} from "@heroui/react";
import { useState } from "react";

type SettingsTab = "general" | "notifications" | "security";

const TABS: {
  id: SettingsTab;
  label: string;
  icon: typeof Gear;
}[] = [
  { id: "general", label: "General", icon: Gear },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
];

function SettingSwitch({
  label,
  defaultSelected,
}: {
  label: string;
  defaultSelected: boolean;
}) {
  return (
    <Switch aria-label={label} defaultSelected={defaultSelected}>
      <Switch.Content>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch.Content>
    </Switch>
  );
}

function GeneralTab() {
  return (
    <Card className={dashboardCardClass}>
      <Card.Header>
        <Card.Title className="text-base font-semibold">
          Organization settings
        </Card.Title>
        <Card.Description className="text-sm text-muted">
          General preferences for your claims workspace.
        </Card.Description>
      </Card.Header>
      <Card.Content className="gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField defaultValue="Reward Care Solutions" name="orgName">
            <Label>Organization name</Label>
            <Input />
          </TextField>
          <TextField defaultValue="America/Chicago" name="timezone">
            <Label>Default timezone</Label>
            <Input />
          </TextField>
          <TextField defaultValue="Medicaid Monthly" name="claimType">
            <Label>Default claim type</Label>
            <Input />
          </TextField>
          <TextField defaultValue="billing@rewardcare.com" name="billingEmail">
            <Label>Billing contact email</Label>
            <Input type="email" />
          </TextField>
        </div>
        <div className="flex justify-end border-t border-separator pt-4">
          <Button size="sm" variant="primary">
            Save changes
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}

function NotificationsTab() {
  const notifications = [
    {
      id: "claim-status",
      label: "Claim status changes",
      description: "Email when a claim moves to a new status.",
      defaultChecked: true,
    },
    {
      id: "missing-docs",
      label: "Missing document alerts",
      description: "Alert when required documents are incomplete.",
      defaultChecked: true,
    },
    {
      id: "deadline-reminder",
      label: "Deadline reminders",
      description: "Remind 3 days before a deadline is due.",
      defaultChecked: true,
    },
    {
      id: "denied-claims",
      label: "Denied claim notifications",
      description: "Alert when a claim is denied or returned.",
      defaultChecked: true,
    },
    {
      id: "team-activity",
      label: "Team activity",
      description: "Updates about teammate actions on claims.",
      defaultChecked: false,
    },
    {
      id: "weekly-digest",
      label: "Weekly digest",
      description: "A weekly summary of claim activity.",
      defaultChecked: false,
    },
  ];

  return (
    <Card className={dashboardCardClass}>
      <Card.Header>
        <Card.Title className="text-base font-semibold">
          Email notifications
        </Card.Title>
        <Card.Description className="text-sm text-muted">
          Choose which alerts you want to receive.
        </Card.Description>
      </Card.Header>
      <Card.Content className="gap-0 divide-y divide-separator/60 p-0">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 px-5 py-4"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium">{item.label}</p>
              <p className="mt-0.5 text-sm text-muted">{item.description}</p>
            </div>
            <SettingSwitch
              defaultSelected={item.defaultChecked}
              label={item.label}
            />
          </div>
        ))}
      </Card.Content>
    </Card>
  );
}

function SecurityTab() {
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
      <Card className={dashboardCardClass}>
        <Card.Header>
          <Card.Title className="text-base font-semibold">
            Change password
          </Card.Title>
          <Card.Description className="text-sm text-muted">
            Use a strong password you do not reuse elsewhere.
          </Card.Description>
        </Card.Header>
        <Card.Content className="gap-5">
          <TextField name="currentPassword" type="password">
            <Label>Current password</Label>
            <Input placeholder="Enter current password" />
          </TextField>
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField name="newPassword" type="password">
              <Label>New password</Label>
              <Input placeholder="Enter new password" />
            </TextField>
            <TextField name="confirmPassword" type="password">
              <Label>Confirm new password</Label>
              <Input placeholder="Re-enter new password" />
            </TextField>
          </div>
          <div className="flex justify-end border-t border-separator pt-4">
            <Button size="sm" variant="primary">
              Update password
            </Button>
          </div>
        </Card.Content>
      </Card>

      <Card className={dashboardCardClass}>
        <Card.Header>
          <Card.Title className="text-base font-semibold">
            Security tips
          </Card.Title>
        </Card.Header>
        <Card.Content className="gap-3 text-sm text-muted">
          <div className="flex gap-3 rounded-2xl bg-surface-secondary/80 px-3.5 py-3">
            <Shield className="mt-0.5 size-4 shrink-0 text-accent" />
            <p>Prefer a unique password with at least 12 characters.</p>
          </div>
          <div className="flex gap-3 rounded-2xl bg-surface-secondary/80 px-3.5 py-3">
            <Lock className="mt-0.5 size-4 shrink-0 text-accent" />
            <p>Sign out of shared devices after updating credentials.</p>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");

  return (
    <div className="flex min-w-0 flex-col gap-6 pb-4 sm:gap-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted">
          Manage organization, notification, and security preferences.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "border border-border bg-surface text-muted hover:bg-surface-secondary hover:text-foreground",
              )}
              type="button"
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon className="size-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "general" ? <GeneralTab /> : null}
      {activeTab === "notifications" ? <NotificationsTab /> : null}
      {activeTab === "security" ? <SecurityTab /> : null}
    </div>
  );
}
