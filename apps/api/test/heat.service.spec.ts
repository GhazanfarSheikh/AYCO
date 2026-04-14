import { beforeEach, describe, expect, it, vi } from "vitest";

import { HeatService } from "../src/modules/heat/heat.service";

vi.mock("@/modules/products/products.mapper", () => ({
  toProductCardDto: vi.fn((product: { dto: unknown }) => product.dto),
}));

describe("HeatService", () => {
  const heatRepository = {
    listHeatCandidates: vi.fn(),
  };

  let heatService: HeatService;

  beforeEach(() => {
    vi.clearAllMocks();
    heatService = new HeatService(heatRepository as never);
  });

  it("boosts exam-relevant featured products when exam mode is on", async () => {
    heatRepository.listHeatCandidates.mockResolvedValue([
      {
        dto: {
          heatScore: 84,
          heatTier: "heating",
          id: "study-focus-lamp",
          isExamRelevant: true,
          isFeatured: true,
          price: { amount: 44, compareAtAmount: 59, currency: "USD" },
          primaryImage: null,
          ratingAverage: 4.8,
          ratingCount: 120,
          receiptCount: 48,
          slug: "study-focus-lamp",
          subtitle: "Desk setup boost",
          title: "Focus Lamp",
          zoneSlugs: ["study"],
        },
        heatSnapshots: [{ score: 88 }],
      },
      {
        dto: {
          heatScore: 92,
          heatTier: "blazing",
          id: "tech-aurora-buds",
          isExamRelevant: false,
          isFeatured: false,
          price: { amount: 129, compareAtAmount: 149, currency: "USD" },
          primaryImage: null,
          ratingAverage: 4.7,
          ratingCount: 240,
          receiptCount: 160,
          slug: "tech-aurora-buds",
          subtitle: "Noise cancelling",
          title: "Aurora Buds",
          zoneSlugs: ["tech"],
        },
        heatSnapshots: [{ score: 82 }],
      },
    ]);

    const result = await heatService.listHeat({ examMode: true, limit: 10 });

    expect(result.tiers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          items: [expect.objectContaining({ slug: "study-focus-lamp" })],
          tier: "heating",
        }),
      ]),
    );
  });

  it("rejects invalid Heat filters", async () => {
    await expect(
      heatService.listHeat({ limit: 999 }),
    ).rejects.toMatchObject({ code: "CATALOG_FILTER_INVALID" });
  });
});
