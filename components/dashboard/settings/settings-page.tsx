"use client";

import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import {
  Bell,
  Envelope,
  Gear,
  Lock,
  Shield,
  Smartphone,
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
    <div className="grid gap-5">
      <Card className={`${dashboardCardClass} border-2 border-accent/20`}>
        <Card.Header>
          <Card.Title className="type-card-title">
            Organization settings
          </Card.Title>
          <Card.Description className="text-sm font-medium text-muted">
            Preferences for your long-term care claims workspace.
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
            <TextField defaultValue="Illumifin" name="defaultInsurer">
              <Label>Default client / insurer</Label>
              <Input />
            </TextField>
            <TextField
              defaultValue="billing@rewardcare.com"
              name="billingEmail"
            >
              <Label>Billing contact email</Label>
              <Input type="email" />
            </TextField>
          </div>
          <div className="flex justify-end border-t border-separator pt-4">
            <Button className="font-bold" size="sm" variant="primary">
              Save changes
            </Button>
          </div>
        </Card.Content>
      </Card>

      <Card className={`${dashboardCardClass} border border-success/30 bg-success-soft/20`}>
        <Card.Header>
          <Card.Title className="type-card-title">Contact RCS support</Card.Title>
          <Card.Description className="text-sm font-semibold text-muted">
            Reach Reward Care Solutions when you need help. Production numbers
            will replace these placeholders.
          </Card.Description>
        </Card.Header>
        <Card.Content className="gap-3">
          <div className="grid gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-muted">
                Email
              </p>
              <p className="mt-0.5 font-bold">support@rewardcare.example</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-muted">
                Phone
              </p>
              <p className="mt-0.5 font-bold">(800) 555-0199</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-accent/35 bg-accent-soft px-4 text-sm font-bold text-accent hover:border-accent"
              href="mailto:support@rewardcare.example"
            >
              <Envelope className="size-4" />
              Email RCS support
            </a>
            <a
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-success/35 bg-success-soft px-4 text-sm font-bold text-success hover:border-success"
              href="tel:+18005550199"
            >
              <Smartphone className="size-4" />
              Call RCS support
            </a>
          </div>
        </Card.Content>
      </Card>
    </div>
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
        <Card.Title className="type-card-title">Email notifications</Card.Title>
        <Card.Description className="text-sm font-medium text-muted">
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
              <p className="text-sm font-bold">{item.label}</p>
              <p className="mt-0.5 text-sm font-medium text-muted">
                {item.description}
              </p>
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
          <Card.Title className="type-card-title">Change password</Card.Title>
          <Card.Description className="text-sm font-medium text-muted">
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
            <Button className="font-bold" size="sm" variant="primary">
              Update password
            </Button>
          </div>
        </Card.Content>
      </Card>

      <Card className={dashboardCardClass}>
        <Card.Header>
          <Card.Title className="type-card-title">Security tips</Card.Title>
        </Card.Header>
        <Card.Content className="gap-3 text-sm font-medium text-muted">
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
        <h1 className="type-page">
          Settings
        </h1>
        <p className="mt-1 type-meta text-muted">
          Account preferences, notifications, and security.
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
                "inline-flex min-h-11 items-center gap-2 rounded-2xl border-2 px-4 py-2.5 text-sm font-bold transition-colors",
                active
                  ? "border-accent bg-accent text-accent-foreground shadow-sm"
                  : "border-border bg-surface text-muted hover:bg-surface-secondary hover:text-foreground",
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
