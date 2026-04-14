import { successResponse, type ApiMeta } from "@ayco/contracts";

export function ok<T>(data: T, meta?: ApiMeta) {
  return successResponse(data, meta);
}
