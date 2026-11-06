"use client";

import { useWorkspace } from "@/lib/dashboard/workspace-store";
import { useEffect } from "react";

/** Short confirmation, same role as the demo's toast. */
export function ToastHost() {
  const toast = useWorkspace((s) => s.toast);
  const clearToast = useWorkspace((s) => s.clearToast);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(clearToast, 2600);
    return () => clearTimeout(timer);
  }, [toast, clearToast]);

  if (!toast) return null;

  return (
    <div
      className="fixed right-5 bottom-5 z-50 max-w-sm rounded-xl border border-signal-green/40 bg-signal-green-soft px-4 py-3 type-body text-signal-green-ink shadow-lg"
      role="status"
    >
      {toast.text}
    </div>
  );
}
