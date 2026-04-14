export const ERROR_CODES = {
  catalogFilterInvalid: "CATALOG_FILTER_INVALID",
  productNotFound: "PRODUCT_NOT_FOUND",
  scoutQueryInvalid: "SCOUT_QUERY_INVALID",
  zoneNotFound: "ZONE_NOT_FOUND",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
