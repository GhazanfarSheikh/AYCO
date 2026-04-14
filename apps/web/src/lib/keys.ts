export function withIndex(id: string, index: number, suffix?: string) {
  return suffix ? `${id}-${suffix}-${index}` : `${id}-${index}`;
}
