import { beforeEach, describe, expect, it, vi } from "vitest";

import { ProductsService } from "../src/modules/products/products.service";

vi.mock("@/modules/products/products.mapper", () => ({
  toProductCardDto: vi.fn((product: { dto: unknown }) => product.dto),
  toProductDetailDto: vi.fn((product: { detail: unknown }) => product.detail),
}));

describe("ProductsService", () => {
  const productsRepository = {
    findByIdOrSlug: vi.fn(),
    findRelatedCandidates: vi.fn(),
    listBrowseCandidates: vi.fn(),
  };

  let productsService: ProductsService;

  beforeEach(() => {
    vi.clearAllMocks();
    productsService = new ProductsService(productsRepository as never);
  });

  it("applies exam-mode boosts to browse ranking", async () => {
    productsRepository.listBrowseCandidates.mockResolvedValue([
      {
        dto: {
          heatScore: 80,
          heatTier: "heating",
          id: "tech-grid-dock",
          isExamRelevant: false,
          isFeatured: false,
          price: { amount: 89, compareAtAmount: null, currency: "USD" },
          primaryImage: null,
          ratingAverage: 4.4,
          ratingCount: 42,
          receiptCount: 11,
          slug: "tech-grid-dock",
          subtitle: "Tech desk utility",
          title: "Grid Dock",
          zoneSlugs: ["tech"],
        },
      },
      {
        dto: {
          heatScore: 70,
          heatTier: "warming",
          id: "study-focus-lamp",
          isExamRelevant: true,
          isFeatured: true,
          price: { amount: 44, compareAtAmount: 59, currency: "USD" },
          primaryImage: null,
          ratingAverage: 4.8,
          ratingCount: 120,
          receiptCount: 20,
          slug: "study-focus-lamp",
          subtitle: "Late-night study boost",
          title: "Focus Lamp",
          zoneSlugs: ["study"],
        },
      },
    ]);

    const result = await productsService.listProducts({
      examMode: true,
      limit: 10,
      sort: "newest",
    });

    expect(result.data.items[0]?.slug).toBe("study-focus-lamp");
  });

  it("rejects invalid browse filters", async () => {
    await expect(
      productsService.listProducts({ limit: 999 }),
    ).rejects.toMatchObject({ code: "CATALOG_FILTER_INVALID" });
  });
});
