"use client";

import { useState } from "react";

import { SORT_OPTIONS } from "@/lib/constants";

import { Chip } from "../ui/Chip";
import { Slider } from "../ui/Slider";
import { Toggle } from "../ui/Toggle";

type DialInPanelProps = {
  onHeatOnlyChange: (checked: boolean) => void;
  onPriceChange: (value: number[]) => void;
  onSortChange: (value: string) => void;
};

export function DialInPanel({
  onHeatOnlyChange,
  onPriceChange,
  onSortChange,
}: DialInPanelProps) {
  const [price, setPrice] = useState([5, 80]);

  return (
    <div className="space-y-4 rounded-[var(--radius-xl)] border border-white/10 bg-white/4 p-5">
      <div className="space-y-3">
        <p className="text-sm font-medium text-[var(--ayco-text-primary)]">
          Dial In Results
        </p>
        <Slider
          max={100}
          onValueChange={(value) => {
            setPrice(value);
            onPriceChange(value);
          }}
          value={price}
        />
        <div className="flex items-center justify-between text-xs text-[var(--ayco-text-secondary)]">
          <span>${price[0]}</span>
          <span>${price[1]}</span>
        </div>
      </div>

      <Toggle
        checked={false}
        label="On Heat only"
        onCheckedChange={onHeatOnlyChange}
      />

      <div className="flex flex-wrap gap-2">
        {SORT_OPTIONS.map((option) => (
          <Chip key={option.value} onClick={() => onSortChange(option.value)}>
            {option.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}
