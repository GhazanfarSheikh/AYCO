import { type ApiMeta, successResponse } from "@ayco/contracts";

export function ok<T>(data: T, meta?: ApiMeta) {
  return successResponse(data, meta);
}
