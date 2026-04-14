"use client";

import { useState } from "react";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export function ReceiptForm({ productId }: { productId: string }) {
  const [text, setText] = useState("");

  return (
    <form className="space-y-4 rounded-[var(--radius-xl)] border border-white/10 bg-white/4 p-5">
      <p className="text-sm text-[var(--ayco-text-secondary)]">
        Drop your Receipt for {productId}.
      </p>
      <Input
        label="Quick take"
        onChange={(event) => setText(event.target.value)}
        placeholder="Tell us how it landed..."
        value={text}
      />
      <Button disabled={text.length < 8}>Drop Your Receipt</Button>
    </form>
  );
}
