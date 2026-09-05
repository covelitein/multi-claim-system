"use client";

import { ListBox, Select } from "@heroui/react";

export function CompactSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { id: string; label: string }[];
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted">{label}</span>
      <Select
        aria-label={label}
        selectedKey={value}
        onSelectionChange={(key) => {
          if (key != null) onChange(String(key));
        }}
      >
        <Select.Trigger className="h-9 min-w-24 gap-1 rounded-full bg-surface px-3 text-sm">
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {options.map((option) => (
              <ListBox.Item key={option.id} id={option.id} textValue={option.label}>
                {option.label}
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
    </div>
  );
}
