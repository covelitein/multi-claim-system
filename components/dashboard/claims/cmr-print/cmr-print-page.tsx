"use client";

import {
  CLAIM_WALKTHROUGH,
  CMR_FACILITY,
  CMR_SIGNER,
  type FollowUp,
  type WalkthroughQuestion,
} from "@/lib/dashboard/claim-walkthrough-data";
import { useCmrDraft, useCmrDraftReady } from "@/lib/dashboard/cmr-draft-store";
import { formatDate, isQuestionComplete } from "@/lib/dashboard/cmr-form";
import { residentByKey } from "@/lib/dashboard/residents-data";
import { ArrowLeft, CircleInfo, Printer } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import Link from "next/link";
import type { ReactNode } from "react";

type Answers = Record<string, string>;

const { template, questions } = CLAIM_WALKTHROUGH;

/* The sheet is always black on white, whatever the app theme is. */

function Line({
  label,
  value,
  tall,
}: {
  label: string;
  value?: string;
  tall?: boolean;
}) {
  return (
    <div className="flex items-end gap-1.5">
      <span className="shrink-0 font-bold">{label}</span>
      <span
        className={`flex-1 border-b border-black px-1 ${tall ? "min-h-9" : "min-h-[1.25rem]"}`}
      >
        {value}
      </span>
    </div>
  );
}

function Box({ checked }: { checked: boolean }) {
  return (
    <span
      aria-label={checked ? "checked" : "unchecked"}
      className="mt-px inline-flex size-3.5 shrink-0 items-center justify-center border border-black text-[11px] leading-none font-bold"
      role="img"
    >
      {checked ? "X" : ""}
    </span>
  );
}

function CheckItem({ checked, children }: { checked: boolean; children: ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <Box checked={checked} />
      <span>{children}</span>
    </div>
  );
}

function FollowUpBlock({ group, answers }: { group: FollowUp; answers: Answers }) {
  return (
    <div className="mt-1.5 ml-6">
      <p className="italic">{group.heading}</p>
      {group.note ? <p className="text-[11px]">{group.note}</p> : null}
      <div className="mt-1 grid grid-cols-2 gap-x-6 gap-y-1.5">
        {group.fields.map((field) => (
          <Line
            key={field.id}
            label={`${field.label}:`}
            value={
              field.type === "date"
                ? formatDate(answers[field.id])
                : answers[field.id]
            }
          />
        ))}
      </div>
    </div>
  );
}

function QuestionBlock({
  question,
  answers,
}: {
  question: WalkthroughQuestion;
  answers: Answers;
}) {
  const groups = (question.followUps ?? []).filter((g) => !g.offForm);
  const chosen = answers[question.id];
  const inline = question.options.length <= 2;
  const columns = question.options.length > 4;

  return (
    <section className="break-inside-avoid">
      <h3 className="font-bold">
        {question.number}. {question.title}
      </h3>
      {question.notice ? (
        <p className="mt-0.5 text-[11px] italic">{question.notice}</p>
      ) : null}

      <div
        className={
          inline
            ? "mt-1.5 ml-6 flex gap-8"
            : columns
              ? "mt-1.5 ml-6 grid grid-cols-2 gap-x-6 gap-y-1.5"
              : "mt-1.5 ml-6 flex flex-col gap-1.5"
        }
      >
        {question.options.map((option) => (
          <div key={option.id}>
            <CheckItem checked={chosen === option.id}>{option.label}</CheckItem>
            {!inline && !columns
              ? groups
                  .filter((g) => g.optionId === option.id)
                  .map((g) => (
                    <FollowUpBlock
                      key={g.heading}
                      answers={answers}
                      group={g}
                    />
                  ))
              : null}
          </div>
        ))}
      </div>

      {inline || columns
        ? groups.map((g) => (
            <FollowUpBlock key={g.heading} answers={answers} group={g} />
          ))
        : null}
    </section>
  );
}

export function CmrPrintPage() {
  const ready = useCmrDraftReady();
  const answers = useCmrDraft((s) => s.answers);
  const residentKey = useCmrDraft((s) => s.residentKey);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  const resident = residentByKey(residentKey);
  const complete = questions.every((q) => isQuestionComplete(q, answers));

  // Never show a half-empty form: send people back to finish it.
  if (!complete) {
    const remaining = questions.filter((q) => !isQuestionComplete(q, answers));
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="flex max-w-md flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-8 text-center shadow-sm">
          <span className="flex size-12 items-center justify-center rounded-full bg-signal-amber text-signal-amber-ink">
            <CircleInfo className="size-6" />
          </span>
          <div>
            <h1 className="type-card-title">Finish the questions first</h1>
            <p className="mt-1.5 type-body font-medium text-muted">
              The full form is available once every question is answered, so
              nothing prints blank. Still to do:{" "}
              {remaining.map((q) => `Question ${q.number}`).join(", ")}.
            </p>
          </div>
          <Link
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-5 type-body text-accent-foreground"
            href="/billing/cmr"
          >
            <ArrowLeft className="size-4" />
            Back to walkthrough
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-200 pb-10 dark:bg-neutral-900 print:bg-white print:pb-0">
      <div className="sticky top-0 z-10 border-b border-border bg-surface px-4 py-3 print:hidden">
        <div className="mx-auto flex max-w-[8.5in] flex-wrap items-center justify-between gap-3">
          <Link
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-border px-4 type-body hover:bg-surface-secondary"
            href="/billing/cmr"
          >
            <ArrowLeft className="size-4" />
            Back to walkthrough
          </Link>
          <div className="flex items-center gap-3">
            <Button
              className="h-11 gap-2 bg-accent px-5 type-body text-accent-foreground"
              onPress={() => window.print()}
            >
              <Printer className="size-4" />
              Print form
            </Button>
          </div>
        </div>
      </div>

      <article className="mx-auto mt-6 max-w-[8.5in] bg-white p-[0.6in] font-[Arial,Helvetica,sans-serif] text-[12.5px] leading-snug text-black shadow-lg print:mt-0 print:max-w-none print:p-0 print:shadow-none">
        <header className="text-center">
          <p className="text-[13px] font-bold">{template.carrier}</p>
          <h1 className="mt-1 text-[19px] font-bold tracking-wide uppercase">
            {template.title}
          </h1>
        </header>

        <section className="mt-4 border border-black bg-neutral-200 p-3 [print-color-adjust:exact]">
          <p className="font-bold">Instructions</p>
          <ul className="mt-1 list-disc pl-5">
            {template.instructions.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="mt-2 font-bold">
            Fax to {template.returnFax} or mail to {template.returnMail}
          </p>
        </section>

        <section className="mt-5 grid grid-cols-2 gap-x-8 gap-y-2">
          <div className="flex flex-col gap-2">
            <Line label="Facility Name:" value={CMR_FACILITY.name} />
            <Line label="Address:" value={CMR_FACILITY.address} />
            <Line label="City:" value={CMR_FACILITY.city} />
            <Line label="State:" value={CMR_FACILITY.state} />
            <Line label="Phone:" value={CMR_FACILITY.phone} />
            <Line label="Fax:" value={CMR_FACILITY.fax} />
          </div>
          <div className="flex flex-col gap-2">
            <Line
              label="Resident Name:"
              value={resident ? `${resident.firstName} ${resident.lastName}` : ""}
            />
            <Line label="Policy #:" value={resident?.policyId} />
            <Line label="Room #:" value={resident?.room} />
            <Line label="Move-In Date:" value={formatDate(resident?.admitDate)} />
            <Line
              label="Month of Service From:"
              value={formatDate(answers["claim-from"])}
            />
            <Line label="Through:" value={formatDate(answers["claim-to"])} />
          </div>
        </section>

        <div className="mt-6 flex flex-col gap-5">
          {questions.map((question) => (
            <QuestionBlock key={question.id} answers={answers} question={question} />
          ))}
        </div>

        <section className="mt-7 break-inside-avoid">
          <p>{template.declaration}</p>
          <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3">
            <Line label="Print Name:" value={CMR_SIGNER.name} />
            <Line label="Title:" value={CMR_SIGNER.title} />
            <Line label="Phone Number:" value={CMR_SIGNER.phone} />
            <span />
            <Line label="Signature:" tall />
            <Line label="Date:" tall />
          </div>
        </section>
      </article>
    </div>
  );
}
