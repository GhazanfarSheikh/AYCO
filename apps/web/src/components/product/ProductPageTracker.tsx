"use client";

import { useEffect } from "react";

import { useRewind } from "@/hooks/useRewind";

export function ProductPageTracker({ productId }: { productId: string }) {
  const { addToRewind } = useRewind();

  useEffect(() => {
    addToRewind(productId);
  }, [addToRewind, productId]);

  return null;
}
