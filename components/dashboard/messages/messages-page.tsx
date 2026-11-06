"use client";

import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import { InfoBanner } from "@/components/dashboard/info-banner";
import { useWorkspace } from "@/lib/dashboard/workspace-store";
import { Button, Card } from "@heroui/react";
import { useState } from "react";

const THREADS = [
  {
    id: "illumifin",
    initials: "IL",
    title: "Illumifin — submission question",
    detail: "Sample thread · 2 messages",
    toast: "Opened carrier follow-up thread",
  },
  {
    id: "sunrise",
    initials: "SM",
    title: "Sunrise Assisted Living",
    detail: "Sample thread · invoice follow-up",
    toast: "Opened facility notes thread",
  },
];

export function MessagesPage() {
  const messages = useWorkspace((s) => s.messages);
  const addMessage = useWorkspace((s) => s.addMessage);
  const showToast = useWorkspace((s) => s.showToast);
  const [to, setTo] = useState("Internal team");
  const [text, setText] = useState("");

  return (
    <div className="flex min-w-0 flex-col gap-4 pb-4">
      <div>
        <h1 className="type-page">Messages</h1>
        <p className="mt-1 type-meta text-muted">
          Internal workflow notes and follow-ups. External email is not
          connected.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className={dashboardCardClass}>
          <Card.Header>
            <Card.Title className="type-card-title">Conversation inbox</Card.Title>
          </Card.Header>
          <Card.Content className="gap-2">
            {THREADS.map((thread) => (
              <button
                key={thread.id}
                className="flex w-full items-center gap-3 rounded-xl border border-border px-3 py-3 text-left hover:bg-surface-secondary"
                type="button"
                onClick={() => showToast(thread.toast)}
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                  {thread.initials}
                </span>
                <span>
                  <span className="block type-body">{thread.title}</span>
                  <span className="block type-meta text-muted">{thread.detail}</span>
                </span>
              </button>
            ))}
            {messages.map((message) => (
              <div
                key={message.id}
                className="rounded-xl border border-border px-3 py-3"
              >
                <p className="type-body">{message.to}</p>
                <p className="mt-1 type-meta text-muted">{message.text}</p>
                <p className="mt-1 type-badge text-muted">{message.date}</p>
              </div>
            ))}
          </Card.Content>
        </Card>
        <Card className={dashboardCardClass}>
          <Card.Header>
            <Card.Title className="type-card-title">New message</Card.Title>
          </Card.Header>
          <Card.Content className="gap-3">
            <label className="flex flex-col gap-1.5 text-sm font-bold">
              To
              <select
                className="h-11 rounded-xl border border-border bg-surface px-3 font-semibold"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              >
                <option>Internal team</option>
                <option>Illumifin Claims Desk (demo)</option>
                <option>Facility contact (demo)</option>
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-bold">
              Message
              <textarea
                className="min-h-24 rounded-xl border border-border bg-surface px-3 py-2 font-medium outline-none focus:border-accent"
                placeholder="Write a message or follow-up note…"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </label>
            <Button
              className="h-11 w-fit font-bold"
              variant="primary"
              onPress={() => {
                if (!text.trim()) {
                  showToast("Enter a message first");
                  return;
                }
                addMessage({ to, text: text.trim() });
                setText("");
                showToast("Message saved locally");
              }}
            >
              Save message
            </Button>
            <InfoBanner>
              External email sending is not connected. Saved messages stay in
              this session.
            </InfoBanner>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
