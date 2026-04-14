import type { ApiMeta } from "@ayco/contracts";

export function buildPaginationMeta(params: {
  page: number;
  pageSize: number;
  total: number;
}) {
  const { page, pageSize, total } = params;
  const hasMore = page * pageSize < total;

  return {
    pagination: {
      hasMore,
      nextCursor: hasMore ? String(page + 1) : null,
      page,
      pageSize,
      total,
    },
  } satisfies ApiMeta;
}
