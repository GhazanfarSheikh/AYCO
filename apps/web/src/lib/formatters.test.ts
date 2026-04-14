import { describe, expect, test } from "vitest";

import {
  formatCompactNumber,
  formatCurrency,
  formatRelativeDispatch,
} from "./formatters";

describe("formatters", () => {
  test("formats currency", () => {
    expect(formatCurrency(59)).toBe("$59.00");
  });

  test("formats compact numbers", () => {
    expect(formatCompactNumber(1240)).toMatch("1.2");
  });

  test("formats dispatch text", () => {
    expect(formatRelativeDispatch(2)).toBe("Dispatch in 2 days");
  });
});
