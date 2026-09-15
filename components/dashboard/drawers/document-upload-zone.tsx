"use client";

import { ArrowUpFromSquare, FileText, TrashBin } from "@gravity-ui/icons";
import { useRef } from "react";

export type UploadedDocument = {
  id: string;
  name: string;
  sizeLabel: string;
  type: string;
};

type DocumentUploadZoneProps = {
  files: UploadedDocument[];
  onAdd: (files: UploadedDocument[]) => void;
  onRemove: (id: string) => void;
  accept?: string;
  title?: string;
  hint?: string;
};

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function DocumentUploadZone({
  files,
  onAdd,
  onRemove,
  accept = ".pdf,.png,.jpg,.jpeg,.doc,.docx",
  title = "Upload documents",
  hint = "PDF, images, or Word docs. Upload the packet — Helix reviews it.",
}: DocumentUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(list: FileList | null) {
    if (!list?.length) return;
    const next = Array.from(list).map((file, index) => ({
      id: `${file.name}-${file.size}-${Date.now()}-${index}`,
      name: file.name,
      sizeLabel: formatSize(file.size),
      type: file.type || "document",
    }));
    onAdd(next);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-surface-secondary/50 px-4 py-8 text-center transition-colors hover:border-accent/40 hover:bg-accent-soft/20"
        type="button"
        onClick={() => inputRef.current?.click()}
      >
        <span className="flex size-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
          <ArrowUpFromSquare className="size-5" />
        </span>
        <span className="text-sm font-semibold">{title}</span>
        <span className="max-w-sm text-xs leading-5 text-muted">{hint}</span>
      </button>
      <input
        ref={inputRef}
        accept={accept}
        className="hidden"
        multiple
        type="file"
        onChange={(event) => handleFiles(event.target.files)}
      />

      {files.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {files.map((file) => (
            <li
              key={file.id}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2.5"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-secondary text-muted">
                <FileText className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted">{file.sizeLabel}</p>
              </div>
              <button
                aria-label={`Remove ${file.name}`}
                className="rounded-lg p-2 text-muted transition-colors hover:bg-danger-soft hover:text-danger"
                type="button"
                onClick={() => onRemove(file.id)}
              >
                <TrashBin className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
