"use client";

import { InfoBanner } from "@/components/dashboard/info-banner";
import type {
  FollowUpField,
  OptionIcon,
  WalkthroughQuestion,
} from "@/lib/dashboard/claim-walkthrough-data";
import { visibleFollowUps } from "@/lib/dashboard/cmr-form";
import type { WalkthroughAnswers } from "@/lib/dashboard/use-claim-walkthrough";
import {
  House,
  Lock,
  LockOpen,
  Persons,
  Shield,
  ShieldCheck,
  Stethoscope,
} from "@gravity-ui/icons";
import { cn } from "@heroui/react";
import type { ComponentType, SVGProps } from "react";

const OPTION_ICONS: Record<OptionIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  lock: Lock,
  "lock-open": LockOpen,
  "shield-check": ShieldCheck,
  shield: Shield,
  house: House,
  stethoscope: Stethoscope,
  persons: Persons,
};

const inputClass =
  "h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm font-medium outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FollowUpField;
  value: string;
  onChange: (value: string) => void;
}) {
  if (field.type === "select") {
    return (
      <select
        className={inputClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{field.placeholder ?? "Select…"}</option>
        {field.options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      className={inputClass}
      placeholder={field.placeholder}
      type={field.type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function QuestionPanel({
  question,
  questionCount,
  answers,
  onAnswer,
}: {
  question: WalkthroughQuestion;
  questionCount: number;
  answers: WalkthroughAnswers;
  onAnswer: (fieldId: string, value: string) => void;
}) {
  const selected = answers[question.id] ?? "";
  const followUps = visibleFollowUps(question, answers);
  // Plain Yes / No questions sit side by side.
  const compact = question.options.every((o) => !o.description && !o.icon) && question.options.length <= 2;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <span className="inline-flex rounded-full bg-accent-soft px-3 py-1 type-badge text-accent">
          Question {question.number} of {questionCount}
        </span>
        <h2 className="mt-3 type-page">
          {question.title}
        </h2>
        {question.helper ? (
          <p className="mt-1.5 type-body font-medium text-muted">
            {question.helper}
          </p>
        ) : null}
      </div>

      {question.notice ? <InfoBanner tone="amber">{question.notice}</InfoBanner> : null}

      <div
        aria-label={question.title}
        className={cn(
          "grid gap-2.5",
          compact && "sm:grid-cols-2",
        )}
        role="radiogroup"
      >
        {question.options.map((option) => {
          const active = selected === option.id;
          const Icon = option.icon ? OPTION_ICONS[option.icon] : null;
          return (
            <button
              key={option.id}
              aria-checked={active}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-accent",
                active
                  ? "border-accent bg-accent-soft ring-1 ring-accent"
                  : "border-border bg-surface hover:bg-surface-secondary",
              )}
              role="radio"
              type="button"
              onClick={() => onAnswer(question.id, option.id)}
            >
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-full border-2",
                  active ? "border-accent bg-accent" : "border-muted/60",
                )}
              >
                {active ? (
                  <span className="size-2 rounded-full bg-accent-foreground" />
                ) : null}
              </span>
              {Icon ? (
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-lg",
                    active
                      ? "bg-accent text-accent-foreground"
                      : "bg-surface-secondary text-muted",
                  )}
                >
                  <Icon className="size-5" />
                </span>
              ) : null}
              <span className="min-w-0 flex-1">
                <span className="block type-row">{option.label}</span>
                {option.description ? (
                  <span className="mt-0.5 block type-meta text-muted">
                    {option.description}
                  </span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>

      {followUps.map((group) => (
        <section
          key={`${group.optionId}-${group.heading}`}
          className="rounded-xl border border-accent/30 bg-accent-soft/50 p-4"
        >
          <h3 className="type-row text-accent">{group.heading}</h3>
          {group.note ? (
            <p className="mt-1 type-meta text-muted">{group.note}</p>
          ) : null}
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {group.fields.map((field) => (
              <label
                key={field.id}
                className={cn(
                  "flex flex-col gap-1.5",
                  group.fields.length === 1 && "sm:col-span-2",
                )}
              >
                <span className="type-body">
                  {field.label}
                  {field.optional ? (
                    <span className="ml-1.5 type-meta font-medium text-muted">
                      (optional)
                    </span>
                  ) : null}
                </span>
                <FieldInput
                  field={field}
                  value={answers[field.id] ?? ""}
                  onChange={(value) => onAnswer(field.id, value)}
                />
              </label>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
