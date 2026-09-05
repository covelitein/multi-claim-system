import { HOSPITAL_TYPES, type RegisterDraft } from "@/lib/auth/register-schema";

export function ReviewStep({ values }: { values: RegisterDraft }) {
  const hospitalType =
    HOSPITAL_TYPES.find((item) => item.id === values.hospitalType)?.label ?? "Not selected";

  return (
    <div className="flex min-w-0 flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-surface-secondary p-4">
      <ReviewRow label="Facility" value={values.legalName} />
      <ReviewRow label="Workspace" value={values.displayName} />
      <ReviewRow label="Type" value={hospitalType} />
      <ReviewRow label="License" value={values.licenseNumber} />
      <ReviewRow label="Location" value={`${values.city}, ${values.country}`} />
      <ReviewRow label="Address" value={values.address} />
      <ReviewRow
        label="Administrator"
        value={`${values.firstName} ${values.lastName} · ${values.jobTitle}`}
      />
      <ReviewRow label="Work email" value={values.workEmail} />
      <ReviewRow label="Phone" value={values.phone} />
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <p className="w-28 shrink-0 pt-0.5 text-xs text-muted">{label}</p>
      <p className="min-w-0 flex-1 break-words text-sm font-medium text-foreground">
        {value || "—"}
      </p>
    </div>
  );
}
