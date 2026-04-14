"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";

export function Slider({
  max = 100,
  min = 0,
  onValueChange,
  value,
}: {
  max?: number;
  min?: number;
  onValueChange?: (value: number[]) => void;
  value: number[];
}) {
  return (
    <SliderPrimitive.Root
      className="relative flex h-7 w-full touch-none select-none items-center"
      max={max}
      min={min}
      onValueChange={onValueChange}
      value={value}
    >
      <SliderPrimitive.Track className="relative h-2 grow rounded-full bg-white/10">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-[var(--ayco-brand-cyan)]" />
      </SliderPrimitive.Track>
      {value.map((thumbValue) => (
        <SliderPrimitive.Thumb
          aria-label={`Price handle ${thumbValue}`}
          className="block size-5 rounded-full border border-white/20 bg-[var(--ayco-bg-primary)] shadow-[var(--ayco-glow-cyan)]"
          key={thumbValue}
        />
      ))}
    </SliderPrimitive.Root>
  );
}
