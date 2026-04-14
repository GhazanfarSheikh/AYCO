"use client";

import { useEffect } from "react";

export function useLockScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) {
      document.body.style.removeProperty("overflow");
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [locked]);
}
