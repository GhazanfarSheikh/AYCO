"use client";

import { motion } from "motion/react";

type HeatScoreRingProps = {
  color: string;
  score: number;
};

const radius = 18;
const circumference = 2 * Math.PI * radius;

export function HeatScoreRing({ color, score }: HeatScoreRingProps) {
  const progress = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex size-12 items-center justify-center">
      <svg
        aria-label={`Heat score ${score}`}
        className="-rotate-90"
        height="44"
        role="img"
        width="44"
      >
        <title>{`Heat score ${score}`}</title>
        <circle
          className="stroke-white/10"
          cx="22"
          cy="22"
          fill="none"
          r={radius}
          strokeWidth="4"
        />
        <motion.circle
          animate={{ strokeDashoffset: progress }}
          cx="22"
          cy="22"
          fill="none"
          initial={{ strokeDashoffset: circumference }}
          r={radius}
          stroke={color}
          strokeDasharray={circumference}
          strokeWidth="4"
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <span className="absolute text-[11px] font-semibold">{score}</span>
    </div>
  );
}
