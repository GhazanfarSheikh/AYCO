import type { ApiResponse } from "@ayco/contracts";
import type { ZodType } from "zod";

type CatalogFetchOptions = {
  next?: NextFetchRequestConfig;
  query?: Record<string, string | number | boolean | undefined>;
};

export function shouldUseCatalogFallback(error: unknown) {
  if (process.env.NODE_ENV === "production") {
    return false;
  }

  if (error instanceof CatalogApiError) {
    return error.code === "CATALOG_SERVICE_UNAVAILABLE";
  }

  if (error instanceof TypeError) {
    return true;
  }

  if (error instanceof Error) {
    const cause = error.cause as { code?: string } | undefined;
    return (
      error.message.toLowerCase().includes("fetch failed") ||
      cause?.code === "ECONNREFUSED"
    );
  }

  return false;
}

function getApiBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_API_URL ??
    (process.env.API_APP_URL
      ? `${process.env.API_APP_URL}/api/v1`
      : "http://localhost:4000/api/v1")
  );
}

function buildUrl(
  path: string,
  query?: Record<string, string | number | boolean | undefined>,
) {
  const url = new URL(path, `${getApiBaseUrl()}/`);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === "") {
        continue;
      }

      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

export class CatalogApiError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly details?: unknown,
  ) {
    super(message);
  }
}

export async function fetchCatalogContract<T>(
  path: string,
  schema: ZodType<ApiResponse<T>>,
  options: CatalogFetchOptions = {},
) {
  let response: Response;

  try {
    response = await fetch(buildUrl(path, options.query), {
      headers: {
        "content-type": "application/json",
      },
      next: options.next,
    });
  } catch (error) {
    throw new CatalogApiError(
      "AYCO catalog service is offline right now.",
      "CATALOG_SERVICE_UNAVAILABLE",
      error,
    );
  }

  const payload = await response.json();
  const parsed = schema.safeParse(payload);

  if (!parsed.success) {
    throw new CatalogApiError(
      "AYCO catalog data came back out of shape.",
      "CATALOG_RESPONSE_INVALID",
      parsed.error.flatten(),
    );
  }

  if (!parsed.data.success) {
    throw new CatalogApiError(
      parsed.data.error.message,
      parsed.data.error.code,
      parsed.data.error.details,
    );
  }

  return {
    data: parsed.data.data,
    meta: parsed.data.meta,
  };
}

export async function fetchCatalogContractOrNull<T>(
  path: string,
  schema: ZodType<ApiResponse<T>>,
  options: CatalogFetchOptions = {},
) {
  try {
    return await fetchCatalogContract(path, schema, options);
  } catch (error) {
    if (shouldUseCatalogFallback(error)) {
      return null;
    }

    throw error;
  }
}

export function normalizeCampusSlug(campus?: string) {
  if (!campus) {
    return undefined;
  }

  return campus
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
