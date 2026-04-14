import type { ApiResponse } from "@/types/api";

export async function getJson<T>(input: RequestInfo | URL, init?: RequestInit) {
  const response = await fetch(input, init);
  const payload = (await response.json()) as ApiResponse<T>;
  const successful = payload.success ?? payload.ok;

  if (!response.ok || !successful || payload.data === null) {
    throw new Error(payload.error?.message ?? "Something bounced.");
  }

  return payload.data;
}
