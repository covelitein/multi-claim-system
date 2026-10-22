"use client";

import { InfoBanner } from "@/components/dashboard/info-banner";
import { StatusBadge } from "@/components/dashboard/status-badge";
import type {
  ClaimWalkthroughData,
  WalkthroughQuestion,
} from "@/lib/dashboard/claim-walkthrough-data";
import {
  formatDate,
  isQuestionComplete,
  optionLabel,
  visibleFollowUps,
} from "@/lib/dashboard/cmr-form";
import { SIGNAL } from "@/lib/dashboard/signal-colors";
import type { WalkthroughAnswers } from "@/lib/dashboard/use-claim-walkthrough";
import { CircleCheckFill, CircleInfo, Printer } from "@gravity-ui/icons";
import { Button, Card, cn } from "@heroui/react";
import Link from "next/link";

const dateInputClass =
  "h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm font-medium outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";

export function ClaimPeriodCard({
  copy,
  answers,
  onAnswer,
}: {
  copy: ClaimWalkthroughData["claimPeriod"];
  answers: WalkthroughAnswers;
  onAnswer: (fieldId: string, value: string) => void;
}) {
  return (
    <Card className="flex flex-col gap-3 p-4 shadow-sm">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
        <h2 className="type-card-title">{copy.title}</h2>
        <p className="type-meta text-muted">{copy.helper}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="type-body">From</span>
          <input
            className={dateInputClass}
            type="date"
            value={answers["claim-from"] ?? ""}
            onChange={(e) => onAnswer("claim-from", e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="type-body">Through</span>
          <input
            className={dateInputClass}
            type="date"
            value={answers["claim-to"] ?? ""}
            onChange={(e) => onAnswer("claim-to", e.target.value)}
          />
        </label>
      </div>
      <p className="flex items-start gap-2 type-meta text-muted">
        <CircleInfo className="mt-0.5 size-4 shrink-0 text-signal-blue-ink" />
        <span>
          {copy.notice} Example: {copy.example}
        </span>
      </p>
    </Card>
  );
}

export function InvoiceRequirementsPanel({
  data,
  checklist,
  onToggle,
}: {
  data: ClaimWalkthroughData;
  checklist: Record<string, boolean>;
  onToggle: (item: string) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="type-page">What your invoice needs</h2>
        <p className="mt-1.5 type-body font-medium text-muted">
          Check these before you attach the invoice. They are the most common
          reasons a form is sent back.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {data.invoiceRequirements.map((req) => (
          <div
            key={req.id}
            className="rounded-xl border border-border bg-surface p-4"
          >
            <h3 className="type-row">{req.title}</h3>
            <p className="mt-1 type-body font-medium text-muted">
              {req.description}
            </p>
            <p className="mt-2 rounded-lg bg-surface-secondary px-3 py-2 type-meta">
              Example: {req.example}
            </p>
          </div>
        ))}
      </div>

      <section className="rounded-xl border border-border bg-surface p-4">
        <h3 className="type-row">Invoice checklist</h3>
        <ul className="mt-3 flex flex-col gap-2.5">
          {data.invoiceChecklist.map((item) => (
            <li key={item}>
              <label className="flex cursor-pointer items-center gap-3 type-body">
                <input
                  checked={checklist[item] ?? false}
                  className="size-5 accent-accent"
                  type="checkbox"
                  onChange={() => onToggle(item)}
                />
                {item}
              </label>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function answerDetails(question: WalkthroughQuestion, answers: WalkthroughAnswers) {
  return visibleFollowUps(question, answers).flatMap((group) =>
    group.fields
      .filter((field) => answers[field.id]?.trim())
      .map((field) => ({
        id: field.id,
        label: field.label,
        value:
          field.type === "date" ? formatDate(answers[field.id]) : answers[field.id],
      })),
  );
}

export function ReviewPanel({
  data,
  answers,
  onEdit,
}: {
  data: ClaimWalkthroughData;
  answers: WalkthroughAnswers;
  onEdit: (questionIndex: number) => void;
}) {
  const allComplete = data.questions.every((q) => isQuestionComplete(q, answers));

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="type-page">Review your answers</h2>
        <p className="mt-1.5 type-body font-medium text-muted">
          Month of service {formatDate(answers["claim-from"])} –{" "}
          {formatDate(answers["claim-to"])}
        </p>
      </div>

      {!allComplete ? (
        <InfoBanner tone="amber">
          Some questions still need details. Use Edit to finish them.
        </InfoBanner>
      ) : null}

      <ul className="flex flex-col gap-3">
        {data.questions.map((question, index) => {
          const complete = isQuestionComplete(question, answers);
          const details = answerDetails(question, answers);
          return (
            <li
              key={question.id}
              className={cn(
                "rounded-xl border border-border bg-surface p-4",
                complete ? SIGNAL.green.edge : SIGNAL.amber.edge,
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="type-label text-muted">
                    Question {question.number} · {question.shortLabel}
                  </p>
                  <p className="mt-1 type-row">
                    {optionLabel(question, answers) ?? "Not answered"}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <StatusBadge signal={complete ? "green" : "amber"}>
                    {complete ? "Complete" : "Needs details"}
                  </StatusBadge>
                  <Button
                    className="h-9 px-3 type-body"
                    size="sm"
                    variant="outline"
                    onPress={() => onEdit(index)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
              {details.length > 0 ? (
                <dl className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                  {details.map((detail) => (
                    <div key={detail.id} className="flex gap-2 type-body">
                      <dt className="font-medium text-muted">{detail.label}:</dt>
                      <dd>{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function ReadyPanel({ complete }: { complete: boolean }) {
  return (
    <div className="flex flex-col items-center gap-4 py-6 text-center">
      <span
        className={cn(
          "flex size-16 items-center justify-center rounded-full",
          complete ? SIGNAL.green.icon : SIGNAL.amber.icon,
        )}
      >
        <CircleCheckFill className="size-9" />
      </span>
      <div>
        <h2 className="type-page">
          {complete ? "Ready to submit" : "Almost there"}
        </h2>
        <p className="mx-auto mt-1.5 max-w-md type-body font-medium text-muted">
          {complete
            ? "Print the form, sign and date it by hand, then attach it to the invoice and submit the claim."
            : "Some questions are still incomplete. Go back to Review & Check to finish them."}
        </p>
      </div>
      {complete ? (
        <Link
          className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 type-body hover:bg-surface-secondary"
          href="/cmr-form"
        >
          <Printer className="size-4" />
          View & print form
        </Link>
      ) : null}
    </div>
  );
}
