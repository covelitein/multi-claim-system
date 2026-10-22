"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CmrAnswers = Record<string, string>;

type CmrDraftState = {
  residentKey: string;
  answers: CmrAnswers;
  setResident: (key: string) => void;
  setAnswer: (fieldId: string, value: string) => void;
  reset: () => void;
};

const DEFAULT_RESIDENT = "RES-2048";

const defaultAnswers = (): CmrAnswers => ({
  "claim-from": "2026-08-01",
  "claim-to": "2026-08-31",
});

/**
 * One draft shared by the walkthrough and the printable form.
 * Persisted to sessionStorage so a refresh or the print tab keeps the answers.
 * Plug point: replace with a claim-draft API later.
 */
export const useCmrDraft = create<CmrDraftState>()(
  persist(
    (set) => ({
      residentKey: DEFAULT_RESIDENT,
      answers: defaultAnswers(),
      setResident: (residentKey) =>
        set((state) =>
          state.residentKey === residentKey
            ? state
            : { residentKey, answers: defaultAnswers() },
        ),
      setAnswer: (fieldId, value) =>
        set((state) => ({ answers: { ...state.answers, [fieldId]: value } })),
      reset: () =>
        set({ residentKey: DEFAULT_RESIDENT, answers: defaultAnswers() }),
    }),
    {
      name: "cmr-draft",
      storage: createJSONStorage(() => sessionStorage),
      // Rehydrate after mount so server and client markup match.
      skipHydration: true,
      partialize: (state) => ({
        residentKey: state.residentKey,
        answers: state.answers,
      }),
    },
  ),
);

/** True once the persisted draft has been read on the client. */
export function useCmrDraftReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.resolve(useCmrDraft.persist.rehydrate()).then(() => setReady(true));
  }, []);

  return ready;
}
