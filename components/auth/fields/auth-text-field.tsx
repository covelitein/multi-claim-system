"use client";

import { FieldError, Input, Label, TextField } from "@heroui/react";

type AuthTextFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "tel";
  autoFocus?: boolean;
  autoComplete?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
};

export function AuthTextField({
  name,
  label,
  placeholder,
  type = "text",
  autoFocus,
  autoComplete,
  value,
  onChange,
  error,
}: AuthTextFieldProps) {
  return (
    <TextField
      autoFocus={autoFocus}
      fullWidth
      isInvalid={Boolean(error)}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
    >
      <Label>{label}</Label>
      <Input
        autoComplete={autoComplete}
        className="h-12"
        fullWidth
        placeholder={placeholder}
      />
      {error ? <FieldError>{error}</FieldError> : null}
    </TextField>
  );
}
