"use client";

import { Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, FieldError, InputGroup, Label, TextField } from "@heroui/react";
import { useState } from "react";

type AuthPasswordFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
};

export function AuthPasswordField({
  name,
  label,
  placeholder,
  autoComplete,
  autoFocus,
  value,
  onChange,
  error,
}: AuthPasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      autoFocus={autoFocus}
      fullWidth
      isInvalid={Boolean(error)}
      name={name}
      type={visible ? "text" : "password"}
      value={value}
      onChange={onChange}
    >
      <Label>{label}</Label>
      <InputGroup fullWidth className="h-12 overflow-hidden">
        <InputGroup.Input
          autoComplete={autoComplete}
          className="h-full min-w-0"
          placeholder={placeholder}
        />
        <InputGroup.Suffix className="h-full shrink-0 items-center pe-2.5">
          <Button
            isIconOnly
            aria-label={visible ? "Hide password" : "Show password"}
            className="size-8 shrink-0 grid place-items-center [&>svg]:m-0"
            size="sm"
            variant="ghost"
            onPress={() => setVisible((current) => !current)}
          >
            {visible ? (
              <EyeSlash className="size-4 text-muted" />
            ) : (
              <Eye className="size-4 text-muted" />
            )}
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
      {error ? <FieldError>{error}</FieldError> : null}
    </TextField>
  );
}
