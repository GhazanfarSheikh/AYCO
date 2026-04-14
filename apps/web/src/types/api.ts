export type ApiError = {
  code: string;
  details?: unknown;
  message: string;
};

export type ApiResponse<T> = {
  data: T | null;
  error?: ApiError;
  meta?: {
    pagination?: {
      cursor?: string;
      page?: number;
      pageSize?: number;
      total?: number;
    };
    requestId?: string;
  };
  ok?: boolean;
  success?: boolean;
};

export type PaginatedResponse<T> = ApiResponse<{
  items: T[];
  nextCursor?: number | string;
  total: number;
}>;
