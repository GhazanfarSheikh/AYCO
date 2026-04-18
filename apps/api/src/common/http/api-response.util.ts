import {
  type ApiMeta,
  type ApiResponse,
  successResponse,
} from "@ayco/contracts";

export function ok<T>(data: T, meta?: ApiMeta): ApiResponse<T> {
  return successResponse(data, meta);
}
