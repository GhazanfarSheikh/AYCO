export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(value);
}

export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatRelativeDispatch(days: number) {
  return `Dispatch in ${days} day${days === 1 ? "" : "s"}`;
}

export function formatPrice(value: number) {
  return formatCurrency(value);
}

export function formatDate(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatRelativeTime(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;
  const diff = date.getTime() - Date.now();
  const minutes = Math.round(diff / 1000 / 60);
  const rtf = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });

  if (Math.abs(minutes) < 60) {
    return rtf.format(minutes, "minute");
  }

  const hours = Math.round(minutes / 60);

  if (Math.abs(hours) < 24) {
    return rtf.format(hours, "hour");
  }

  const days = Math.round(hours / 24);

  if (Math.abs(days) < 7) {
    return rtf.format(days, "day");
  }

  const weeks = Math.round(days / 7);
  return rtf.format(weeks, "week");
}

export function formatClaimId(id: string) {
  return id.startsWith("#") ? id : `#${id}`;
}
