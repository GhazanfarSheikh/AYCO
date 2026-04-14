export function normalizeCampusSlug(value?: string) {
  return value?.trim().toLowerCase() || undefined;
}
