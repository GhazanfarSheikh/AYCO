import { beforeEach, describe, expect, it, vi } from "vitest";

import { StealsService } from "../src/modules/steals/steals.service";

vi.mock("@/modules/products/products.mapper", () => ({
  productCatalogInclude: {},
  toProductCardDto: vi.fn((product: { card: unknown }) => product.card),
}));

describe("StealsService", () => {
  const makeCard = (slug: string, title: string) => ({
    heatScore: 90,
    heatTier: "blazing" as const,
    id: slug,
    isExamRelevant: false,
    isFeatured: false,
    price: { amount: 99, compareAtAmount: 129, currency: "USD" },
    primaryImage: null,
    ratingAverage: 4.8,
    ratingCount: 120,
    receiptCount: 48,
    slug,
    subtitle: null,
    title,
    zoneSlugs: ["tech"],
  });

  const stealsRepository = {
    listActiveSteals: vi.fn(),
  };

  let stealsService: StealsService;

  beforeEach(() => {
    vi.clearAllMocks();
    stealsService = new StealsService(stealsRepository as never);
  });

  it("deduplicates repeated product steals and keeps the lead steal first", async () => {
    stealsRepository.listActiveSteals.mockResolvedValue([
      {
        badgeText: "Steal of the Day",
        endsAt: new Date("2026-04-14T00:00:00.000Z"),
        id: "steal_1",
        priority: 1,
        product: { card: makeCard("tech-aurora-buds", "Aurora Buds") },
        productId: "tech-aurora-buds",
        startsAt: new Date("2026-04-13T00:00:00.000Z"),
        stealPrice: 99,
      },
      {
        badgeText: "Repeat",
        endsAt: new Date("2026-04-14T00:00:00.000Z"),
        id: "steal_2",
        priority: 2,
        product: { card: makeCard("tech-aurora-buds", "Aurora Buds") },
        productId: "tech-aurora-buds",
        startsAt: new Date("2026-04-13T00:00:00.000Z"),
        stealPrice: 95,
      },
      {
        badgeText: "Dorm Win",
        endsAt: new Date("2026-04-14T00:00:00.000Z"),
        id: "steal_3",
        priority: 3,
        product: { card: makeCard("dorm-cloud-throw", "Cloud Throw") },
        productId: "dorm-cloud-throw",
        startsAt: new Date("2026-04-13T00:00:00.000Z"),
        stealPrice: 29,
      },
    ]);

    const result = await stealsService.listSteals({ limit: 12 });

    expect(result.lead).toMatchObject({ id: "steal_1" });
    expect(result.items).toHaveLength(2);
    expect(result.items[0]?.product.title).toBe("Aurora Buds");
    expect(result.items[1]?.product.title).toBe("Cloud Throw");
  });
});
