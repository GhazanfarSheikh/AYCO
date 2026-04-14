export type ApiError = {
  code: string;
  details?: unknown;
  message: string;
};

export type PaginationMeta = {
  cursor?: string;
  page?: number;
  pageSize?: number;
  total?: number;
};

export type ApiMeta = {
  pagination?: PaginationMeta;
  requestId?: string;
};

export type ApiEnvelope<T> = {
  data: T | null;
  error?: ApiError;
  meta?: ApiMeta;
  success: boolean;
};

export function successResponse<T>(data: T, meta?: ApiMeta): ApiEnvelope<T> {
  return {
    data,
    meta,
    success: true,
  };
}

export function errorResponse(
  code: string,
  message: string,
  details?: unknown,
  meta?: ApiMeta,
): ApiEnvelope<null> {
  return {
    data: null,
    error: {
      code,
      details,
      message,
    },
    meta,
    success: false,
  };
}
