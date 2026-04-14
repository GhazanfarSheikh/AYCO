"use client";

import { useEffect, useState } from "react";

function getCountdown(target: Date) {
  const diff = target.getTime() - Date.now();
  const total = Math.max(0, diff);

  const hours = Math.floor(total / 1000 / 60 / 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  return {
    expired: total <= 0,
    hours,
    minutes,
    seconds,
  };
}

export function useCountdown(target: Date) {
  const [countdown, setCountdown] = useState(() => getCountdown(target));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdown(target));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [target]);

  return countdown;
}
