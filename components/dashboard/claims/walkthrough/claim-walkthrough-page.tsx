"use client";

import { QuestionPanel } from "@/components/dashboard/claims/walkthrough/question-panel";
import { TipsColumn } from "@/components/dashboard/claims/walkthrough/tips-column";
import { WalkthroughPhaseStepper } from "@/components/dashboard/claims/walkthrough/phase-stepper";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import { useClaimWalkthrough } from "@/lib/dashboard/use-claim-walkthrough";
import { Button, Card, Chip } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ClaimWalkthroughPage() {
  const router = useRouter();
  const {
    data,
    loading,
    phase,
    phaseIndex,
    question,
    questionIndex,
    questionCount,
    answers,
    checklist,
    setAnswer,
    toggleChecklistItem,
    goNext,
    goBack,
    canGoBack,
    isLastPhase,
  } = useClaimWalkthrough();

  if (loading || !data) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  const nextLabel =
    phase === "form-questions"
      ? questionIndex < questionCount - 1
        ? `Save & Continue / Next: Question ${questionIndex + 2}`
        : "Save & Continue"
      : isLastPhase
        ? "Submit Claim"
        : "Save & Continue";

  return (
    <div className="flex min-w-0 flex-col gap-5 pb-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {data.formTitle}
            </h1>
            <Chip color="accent" size="sm" variant="soft">
              <Chip.Label>{data.modeLabel}</Chip.Label>
            </Chip>
          </div>
          <p className="mt-1 text-sm text-muted">
            Answer each question, then attach invoice requirements before submit.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-muted hover:bg-surface-secondary"
            type="button"
          >
            Help
          </button>
          <Link
            className="inline-flex h-9 items-center rounded-xl border border-border px-3 text-sm font-medium hover:bg-surface-secondary"
            href="/billing"
          >
            View Full Form
          </Link>
        </div>
      </div>

      <Card className={dashboardCardClass}>
        <Card.Content>
          <WalkthroughPhaseStepper
            activeIndex={phaseIndex}
            phases={data.phases}
          />
        </Card.Content>
      </Card>

      {phase === "form-questions" && question ? (
        <>
          <Card className={dashboardCardClass}>
            <Card.Content className="gap-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="font-medium">Claim period from</span>
                  <input
                    className="h-11 rounded-xl border border-border bg-surface px-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                    type="date"
                    value={answers["claim-from"] ?? ""}
                    onChange={(e) => setAnswer("claim-from", e.target.value)}
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="font-medium">Claim period to</span>
                  <input
                    className="h-11 rounded-xl border border-border bg-surface px-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                    type="date"
                    value={answers["claim-to"] ?? ""}
                    onChange={(e) => setAnswer("claim-to", e.target.value)}
                  />
                </label>
              </div>
              <p className="rounded-xl bg-accent-soft/50 px-3 py-2 text-sm text-accent">
                Match invoice dates to this claim period before you continue.
              </p>
            </Card.Content>
          </Card>

          <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
            <Card className={dashboardCardClass}>
              <Card.Content>
                <QuestionPanel
                  answers={answers}
                  question={question}
                  questionCount={questionCount}
                  onAnswer={setAnswer}
                />
              </Card.Content>
            </Card>
            <TipsColumn tips={question.tips} />
          </div>
        </>
      ) : null}

      {phase === "invoice-requirements" ? (
        <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="flex flex-col gap-4">
            {data.invoiceRequirements.map((item) => (
              <Card key={item.id} className={dashboardCardClass}>
                <Card.Content className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm text-muted">{item.description}</p>
                  </div>
                  <div className="rounded-xl bg-accent-soft/40 px-3 py-3 text-sm">
                    <p className="text-xs font-medium text-accent">Example</p>
                    <p className="mt-1">{item.example}</p>
                  </div>
                </Card.Content>
              </Card>
            ))}
            <Card className={dashboardCardClass}>
              <Card.Header>
                <Card.Title className="text-base font-semibold">
                  Invoice Requirements
                </Card.Title>
              </Card.Header>
              <Card.Content className="gap-2">
                {data.invoiceChecklist.map((item) => (
                  <label
                    key={item}
                    className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 hover:bg-surface-secondary"
                  >
                    <input
                      checked={Boolean(checklist[item])}
                      className="size-4 accent-[var(--accent)]"
                      type="checkbox"
                      onChange={() => toggleChecklistItem(item)}
                    />
                    <span className="text-sm">{item}</span>
                  </label>
                ))}
              </Card.Content>
            </Card>
          </div>
          <TipsColumn
            tips={[
              {
                id: "inv-tip",
                title: "Fresh Signatures & Dates Required",
                tone: "accent",
                body: "Invoices without a current signature are returned before payout review.",
                ctaLabel: "See More Tips",
              },
            ]}
          />
        </div>
      ) : null}

      {phase === "review" ? (
        <Card className={dashboardCardClass}>
          <Card.Header>
            <Card.Title className="text-base font-semibold">Review answers</Card.Title>
          </Card.Header>
          <Card.Content className="gap-3">
            <p className="text-sm text-muted">
              Claim period: {answers["claim-from"] || "—"} → {answers["claim-to"] || "—"}
            </p>
            {data.questions.map((q) => (
              <div
                key={q.id}
                className="rounded-xl border border-border px-4 py-3"
              >
                <p className="text-sm font-medium">
                  {q.number}. {q.title}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {q.options.find((o) => o.id === answers[q.id])?.label ??
                    "Not answered"}
                </p>
              </div>
            ))}
          </Card.Content>
        </Card>
      ) : null}

      {phase === "ready" ? (
        <Card className={dashboardCardClass}>
          <Card.Content className="gap-3 py-8 text-center">
            <p className="text-lg font-semibold">Ready to submit</p>
            <p className="mx-auto max-w-lg text-sm text-muted">
              Mock flow only — wire this step to your claim create API. Checklist
              and answers are held in local state for now.
            </p>
          </Card.Content>
        </Card>
      ) : null}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          isDisabled={!canGoBack}
          variant="outline"
          onPress={goBack}
        >
          Previous Question
        </Button>
        <Button
          variant="primary"
          onPress={() => {
            if (isLastPhase) {
              router.push("/billing");
              return;
            }
            goNext();
          }}
        >
          {nextLabel}
        </Button>
      </div>
    </div>
  );
}
