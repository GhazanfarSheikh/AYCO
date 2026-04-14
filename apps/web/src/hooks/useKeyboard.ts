"use client";

import { useEffect } from "react";

export function useKeyboard(
  key: string,
  handler: (event: KeyboardEvent) => void,
) {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === key.toLowerCase()) {
        handler(event);
      }
    };

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [handler, key]);
}
