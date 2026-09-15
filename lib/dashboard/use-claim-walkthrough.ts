"use client";

import {
  fetchClaimWalkthrough,
  type ClaimWalkthroughData,
  type WalkthroughPhase,
} from "@/lib/dashboard/claim-walkthrough-data";
import { useEffect, useState } from "react";

export type WalkthroughAnswers = Record<string, string>;

/** Plug point: replace fetch + local answers with claim draft API later. */
export function useClaimWalkthrough() {
  const [data, setData] = useState<ClaimWalkthroughData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<WalkthroughAnswers>({
    "claim-from": "2026-08-01",
    "claim-to": "2026-08-31",
  });
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
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

  const phase: WalkthroughPhase | undefined = data?.phases[phaseIndex]?.id;
  const question = data?.questions[questionIndex];
  const questionCount = data?.questions.length ?? 0;

  function setAnswer(fieldId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [fieldId]: value }));
  }

  function toggleChecklistItem(item: string) {
    setChecklist((prev) => ({ ...prev, [item]: !prev[item] }));
  }

  function goNext() {
    if (!data) return;

    if (phase === "form-questions") {
      if (questionIndex < questionCount - 1) {
        setQuestionIndex((i) => i + 1);
        return;
      }
      setPhaseIndex(1);
      return;
    }

    if (phaseIndex < data.phases.length - 1) {
      setPhaseIndex((i) => i + 1);
    }
  }

  function goBack() {
    if (!data) return;

    if (phase === "form-questions") {
      if (questionIndex > 0) {
        setQuestionIndex((i) => i - 1);
        return;
      }
      return;
    }

    if (phaseIndex === 1) {
      setPhaseIndex(0);
      setQuestionIndex(questionCount - 1);
      return;
    }

    if (phaseIndex > 0) {
      setPhaseIndex((i) => i - 1);
    }
  }

  return {
    data,
    loading,
    error,
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
    canGoBack:
      phaseIndex > 0 || (phase === "form-questions" && questionIndex > 0),
    isLastPhase: data ? phaseIndex === data.phases.length - 1 : false,
  };
}
