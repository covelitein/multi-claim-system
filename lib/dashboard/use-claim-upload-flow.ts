"use client";

import {
  fetchClaimUploadFlow,
  type ClaimUploadFlowData,
  type ClaimUploadPhase,
} from "@/lib/dashboard/claim-upload-data";
import type { UploadedDocument } from "@/components/dashboard/drawers/document-upload-zone";
import { useEffect, useState } from "react";

export type ClaimUploadBasics = {
  residentId: string;
  payer: string;
  claimType: string;
  periodFrom: string;
  periodTo: string;
  notes: string;
};

/** Plug point: replace local state with claim create / upload API. */
export function useClaimUploadFlow() {
  const [data, setData] = useState<ClaimUploadFlowData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [basics, setBasics] = useState<ClaimUploadBasics>({
    residentId: "",
    payer: "",
    claimType: "",
    periodFrom: "2026-08-01",
    periodTo: "2026-08-31",
    notes: "",
  });
  const [files, setFiles] = useState<UploadedDocument[]>([]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchClaimUploadFlow()
      .then((result) => {
        if (!active) return;
        setData(result);
        setBasics((prev) => ({
          ...prev,
          residentId: result.residents[0]?.id ?? "",
          payer: result.payers[0] ?? "",
          claimType: result.claimTypes[0] ?? "",
        }));
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Failed to load");
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const phase: ClaimUploadPhase | undefined = data?.phases[phaseIndex]?.id;
  const isLastPhase = Boolean(data && phaseIndex === data.phases.length - 1);
  const canGoBack = phaseIndex > 0;

  function updateBasics(patch: Partial<ClaimUploadBasics>) {
    setBasics((prev) => ({ ...prev, ...patch }));
  }

  function addFiles(next: UploadedDocument[]) {
    setFiles((prev) => [...prev, ...next]);
  }

  function removeFile(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  function goNext() {
    if (!data) return;
    if (phaseIndex < data.phases.length - 1) {
      setPhaseIndex((i) => i + 1);
    }
  }

  function goBack() {
    if (phaseIndex > 0) setPhaseIndex((i) => i - 1);
  }

  return {
    data,
    loading,
    error,
    phase,
    phaseIndex,
    basics,
    files,
    updateBasics,
    addFiles,
    removeFile,
    goNext,
    goBack,
    canGoBack,
    isLastPhase,
  };
}
