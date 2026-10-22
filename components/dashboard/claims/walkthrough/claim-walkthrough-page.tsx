"use client";

import {
  ClaimPeriodCard,
  InvoiceRequirementsPanel,
  ReadyPanel,
  ReviewPanel,
} from "@/components/dashboard/claims/walkthrough/phase-panels";
import { QuestionPanel } from "@/components/dashboard/claims/walkthrough/question-panel";
import { QuestionSidebar } from "@/components/dashboard/claims/walkthrough/question-sidebar";
import { SignatureNotice } from "@/components/dashboard/claims/walkthrough/signature-notice";
import { TipsColumn } from "@/components/dashboard/claims/walkthrough/tips-column";
import { WalkthroughStepper } from "@/components/dashboard/claims/walkthrough/walkthrough-stepper";
import type { TipCard } from "@/lib/dashboard/claim-walkthrough-data";
import { useCmrDraft } from "@/lib/dashboard/cmr-draft-store";
import { isQuestionComplete } from "@/lib/dashboard/cmr-form";
import { residentByKey } from "@/lib/dashboard/residents-data";
import { useClaimWalkthrough } from "@/lib/dashboard/use-claim-walkthrough";
import { ArrowLeft, ArrowRight, CircleInfo, FileText } from "@gravity-ui/icons";
import { Button, Card, Chip } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export function ClaimWalkthroughPage() {
  const router = useRouter();
  const residentKey = useCmrDraft((s) => s.residentKey);
  const setResident = useCmrDraft((s) => s.setResident);
  const resetDraft = useCmrDraft((s) => s.reset);

  const {
    data,
    loading,
    draftReady,
    steps,
    step,
    stepIndex,
    maxReached,
    progress,
    answers,
    checklist,
    setAnswer,
    toggleChecklistItem,
    goTo,
    goNext,
    goBack,
    canGoBack,
    isLast,
  } = useClaimWalkthrough();

  // ?resident= comes from the dashboard quick action.
  useEffect(() => {
    if (!draftReady) return;
    const key = new URLSearchParams(window.location.search).get("resident");
    const resident = residentByKey(key);
    if (resident) setResident(resident.residentId);
  }, [draftReady, setResident]);

  // Start each step at the top; the shell scrolls, not the window.
  const topRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    topRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [stepIndex]);

  if (loading || !data || !step) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  const resident = residentByKey(residentKey);
  const completedCount = data.questions.filter((q) =>
    isQuestionComplete(q, answers),
  ).length;
  const allComplete = completedCount === data.questions.length;

  const done = steps.map((s, i) => {
    if (i > maxReached || i === stepIndex) return false;
    return s.kind === "question" ? isQuestionComplete(s.question, answers) : i < maxReached;
  });

  const stepComplete =
    step.kind === "question" ? isQuestionComplete(step.question, answers) : true;
  const blocked =
    !stepComplete || (step.kind === "phase" && step.id === "review" && !allComplete);

  const nextStep = steps[stepIndex + 1];
  const nextLabel = isLast
    ? "Submit Claim"
    : nextStep?.kind === "question"
      ? `Next: Question ${nextStep.question.number}`
      : nextStep
        ? `Next: ${nextStep.label}`
        : "";

  const signatureTips: TipCard[] = [
    {
      id: "sig",
      title: "Before you submit",
      tone: "green",
      bullets: data.signatureTips,
    },
  ];
  const tips =
    step.kind === "question"
      ? step.question.tips
      : step.id === "invoice-requirements"
        ? data.invoiceTips
        : signatureTips;

  function handleNext() {
    if (isLast) {
      resetDraft();
      router.push("/billing");
      return;
    }
    goNext();
  }

  return (
    <div ref={topRef} className="flex min-w-0 scroll-mt-2 flex-col gap-5 pb-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="type-page">{data.formTitle}</h1>
            <Chip color="accent" size="sm" variant="soft">
              <Chip.Label className="type-badge">{data.modeLabel}</Chip.Label>
            </Chip>
          </div>
          <p className="mt-1 type-body font-medium text-muted">{data.subtitle}</p>
          {resident ? (
            <p className="mt-1 type-body">
              <span className="font-bold">
                {resident.firstName} {resident.lastName}
              </span>
              <span className="font-medium text-muted">
                {" "}
                · {resident.policyId} · Room {resident.room}
              </span>
            </p>
          ) : null}
        </div>
        <div className="flex flex-col items-start gap-1.5 sm:items-end">
          {allComplete ? (
            <Link
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 type-body hover:bg-surface-secondary"
              href="/cmr-form"
            >
              <FileText className="size-4" />
              View Full Form
            </Link>
          ) : (
            <>
              <span
                aria-disabled="true"
                className="inline-flex h-11 cursor-not-allowed items-center gap-2 rounded-xl border border-border bg-surface-secondary px-4 type-body text-muted"
                role="link"
                title="Finish all questions to view the full form"
              >
                <FileText className="size-4" />
                View Full Form
              </span>
              <span className="flex items-center gap-1.5 type-meta text-muted">
                <CircleInfo className="size-4 shrink-0 text-signal-blue-ink" />
                Answer all {data.questions.length} questions first (
                {completedCount} done) so nothing prints blank.
              </span>
            </>
          )}
        </div>
      </div>

      <Card className="p-4 shadow-sm">
        <WalkthroughStepper
          done={done}
          maxReached={maxReached}
          progress={progress}
          stepIndex={stepIndex}
          steps={steps}
          onSelect={goTo}
        />
      </Card>

      <div className="grid min-w-0 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[220px_minmax(0,1fr)_300px]">
        <div className="hidden self-start xl:sticky xl:top-2 xl:block">
          <QuestionSidebar
            done={done}
            maxReached={maxReached}
            stepIndex={stepIndex}
            steps={steps}
            onSelect={goTo}
          />
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          {step.kind === "question" && step.question.number === 1 ? (
            <ClaimPeriodCard
              answers={answers}
              copy={data.claimPeriod}
              onAnswer={setAnswer}
            />
          ) : null}

          <Card className="p-5 shadow-sm sm:p-6">
            {step.kind === "question" ? (
              <QuestionPanel
                answers={answers}
                question={step.question}
                questionCount={data.questions.length}
                onAnswer={setAnswer}
              />
            ) : step.id === "invoice-requirements" ? (
              <InvoiceRequirementsPanel
                checklist={checklist}
                data={data}
                onToggle={toggleChecklistItem}
              />
            ) : step.id === "review" ? (
              <ReviewPanel
                answers={answers}
                data={data}
                onEdit={goTo /* questions are the first steps, so indexes match */}
              />
            ) : (
              <ReadyPanel complete={allComplete} />
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
              <Button
                className="h-12 gap-2 px-5 type-body"
                isDisabled={!canGoBack}
                variant="outline"
                onPress={goBack}
              >
                <ArrowLeft className="size-4" />
                Previous
              </Button>
              <div className="flex flex-col items-stretch gap-1.5 sm:items-end">
                <Button
                  aria-disabled={blocked}
                  className={
                    blocked
                      ? "h-12 cursor-not-allowed gap-3 border border-border bg-surface-secondary px-5 type-body text-muted"
                      : "h-12 gap-3 bg-accent px-5 type-body text-accent-foreground"
                  }
                  onPress={blocked ? undefined : handleNext}
                >
                  <span className="flex flex-col items-start leading-tight">
                    <span>{isLast ? "Submit Claim" : "Save & Continue"}</span>
                    {!isLast && nextLabel ? (
                      <span className="type-badge font-medium opacity-90">
                        {nextLabel}
                      </span>
                    ) : null}
                  </span>
                  <ArrowRight className="size-4" />
                </Button>
                {blocked ? (
                  <span className="type-meta text-muted">
                    {step.kind === "question"
                      ? "Answer this question to continue."
                      : "Finish the incomplete questions to continue."}
                  </span>
                ) : null}
              </div>
            </div>
          </Card>

          <SignatureNotice tips={data.signatureTips} />
        </div>

        <TipsColumn tips={tips} />
      </div>
    </div>
  );
}
