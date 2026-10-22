"use client";

import {
  fetchClaimWalkthrough,
  type ClaimWalkthroughData,
  type WalkthroughPhase,
  type WalkthroughQuestion,
} from "@/lib/dashboard/claim-walkthrough-data";
import { useCmrDraft, useCmrDraftReady } from "@/lib/dashboard/cmr-draft-store";
import { useEffect, useState } from "react";

export type WalkthroughAnswers = Record<string, string>;

export type WalkthroughStep =
  | { kind: "question"; id: string; label: string; question: WalkthroughQuestion }
  | { kind: "phase"; id: WalkthroughPhase; label: string };

/** Plug point: replace fetch + local draft with claim draft API later. */
export function useClaimWalkthrough() {
  const [data, setData] = useState<ClaimWalkthroughData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [maxReached, setMaxReached] = useState(0);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  const draftReady = useCmrDraftReady();
  const answers = useCmrDraft((s) => s.answers);
  const setAnswer = useCmrDraft((s) => s.setAnswer);

  useEffect(() => {
    let active = true;
    fetchClaimWalkthrough()
      .then((result) => {
        if (!active) return;
        setData(result);
        setChecklist(
          Object.fromEntries(result.invoiceChecklist.map((item) => [item, false])),
        );
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Failed to load walkthrough");
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  // Questions first, then every later phase, as one flat list of steps.
  const steps: WalkthroughStep[] = data
    ? [
        ...data.questions.map(
          (question): WalkthroughStep => ({
            kind: "question",
            id: question.id,
            label: `Question ${question.number}`,
            question,
          }),
        ),
        ...data.phases
          .filter((phase) => phase.id !== "form-questions")
          .map((phase): WalkthroughStep => ({ kind: "phase", ...phase })),
      ]
    : [];

  const step = steps[stepIndex];
  const lastIndex = steps.length - 1;

  function goTo(index: number) {
    if (index < 0 || index > maxReached) return;
    setStepIndex(index);
  }

  function goNext() {
    if (stepIndex >= lastIndex) return;
    const next = stepIndex + 1;
    setStepIndex(next);
    setMaxReached((m) => Math.max(m, next));
  }

  function goBack() {
    setStepIndex((i) => Math.max(0, i - 1));
  }

  function toggleChecklistItem(item: string) {
    setChecklist((prev) => ({ ...prev, [item]: !prev[item] }));
  }

  return {
    data,
    loading: loading || !draftReady,
    draftReady,
    error,
    steps,
    step,
    stepIndex,
    maxReached,
    lastIndex,
    progress:
      steps.length === 0
        ? 0
        : stepIndex === lastIndex
          ? 100
          : Math.round((stepIndex / steps.length) * 100),
    answers,
    checklist,
    setAnswer,
    toggleChecklistItem,
    goTo,
    goNext,
    goBack,
    canGoBack: stepIndex > 0,
    isLast: stepIndex === lastIndex,
  };
}
