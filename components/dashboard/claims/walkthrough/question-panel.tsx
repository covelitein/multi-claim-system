"use client";

import type {
  ConditionalField,
  WalkthroughQuestion,
} from "@/lib/dashboard/claim-walkthrough-data";
import type { WalkthroughAnswers } from "@/lib/dashboard/use-claim-walkthrough";
import { cn } from "@heroui/react";

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: ConditionalField;
  value: string;
  onChange: (value: string) => void;
}) {
  const className =
    "h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";

  if (field.type === "select") {
    return (
      <select
        className={className}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select…</option>
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
      className={className}
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
  const visibleFields =
    question.conditionalFields?.filter(
      (field) => field.showWhenOptionId === selected,
    ) ?? [];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <span className="inline-flex rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
          Question {question.number} of {questionCount}
        </span>
        <h2 className="mt-3 text-lg font-semibold leading-snug tracking-tight sm:text-xl">
          {question.number}. {question.title}
        </h2>
        {question.helper ? (
          <p className="mt-2 text-sm text-muted">{question.helper}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2.5">
        {question.options.map((option) => {
          const active = selected === option.id;
          return (
            <button
              key={option.id}
              className={cn(
                "flex w-full items-start gap-3 rounded-2xl border px-4 py-3.5 text-left transition-colors",
                active
                  ? "border-accent bg-accent-soft/50"
                  : "border-border bg-surface hover:bg-surface-secondary",
              )}
              type="button"
              onClick={() => onAnswer(question.id, option.id)}
            >
              <span
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border",
                  active ? "border-accent bg-accent" : "border-border",
                )}
              >
                {active ? (
                  <span className="size-2 rounded-full bg-accent-foreground" />
                ) : null}
              </span>
              <span>
                <span className="block text-sm font-medium">{option.label}</span>
                {option.description ? (
                  <span className="mt-0.5 block text-xs text-muted">
                    {option.description}
                  </span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>

      {visibleFields.length > 0 ? (
        <div className="rounded-2xl border border-accent/20 bg-accent-soft/20 p-4">
          <p className="mb-3 text-sm font-semibold text-accent">
            If yes, provide the following information:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {visibleFields.map((field) => (
              <label
                key={field.id}
                className={cn(
                  "flex flex-col gap-1.5 text-sm",
                  visibleFields.length === 1 || field.type === "select"
                    ? "sm:col-span-2"
                    : undefined,
                )}
              >
                <span className="font-medium">{field.label}</span>
                <FieldInput
                  field={field}
                  value={answers[field.id] ?? ""}
                  onChange={(value) => onAnswer(field.id, value)}
                />
              </label>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
