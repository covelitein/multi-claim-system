"use client";

import { Checkbox } from "@heroui/react";
import type { ReactNode } from "react";

type AuthCheckboxProps = {
  name: string;
  children: ReactNode;
  value?: string;
  isSelected?: boolean;
  onChange?: (selected: boolean) => void;
  error?: string;
};

export function AuthCheckbox({
  name,
  children,
  value,
  isSelected,
  onChange,
  error,
}: AuthCheckboxProps) {
  return (
    <div className="flex flex-col gap-1">
      <Checkbox
        isInvalid={Boolean(error)}
        isSelected={isSelected}
        name={name}
        value={value}
        onChange={onChange}
      >
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          {children}
        </Checkbox.Content>
      </Checkbox>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
    </div>
  );
}
