type EventPayload = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, payload: EventPayload = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const posthog = (
    window as Window & {
      posthog?: { capture: (event: string, data?: EventPayload) => void };
    }
  ).posthog;

  posthog?.capture(name, payload);
}
