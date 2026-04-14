import { beforeEach, describe, expect, it, vi } from "vitest";

import { ZonesService } from "../src/modules/zones/zones.service";

describe("ZonesService", () => {
  const zonesRepository = {
    findBySlug: vi.fn(),
    findPriceRangeForZone: vi.fn(),
    listActiveZones: vi.fn(),
  };

  let zonesService: ZonesService;

  beforeEach(() => {
    vi.clearAllMocks();
    zonesService = new ZonesService(zonesRepository as never);
  });

  it("throws a Zone-specific error for missing slugs", async () => {
    zonesRepository.findBySlug.mockResolvedValue(null);

    await expect(
      zonesService.getZoneDetail("missing-zone"),
    ).rejects.toMatchObject({
      code: "ZONE_NOT_FOUND",
    });
  });

  it("returns zone metadata with Dial In defaults", async () => {
    zonesRepository.findBySlug.mockResolvedValue({
      _count: { productLinks: 12 },
      accent: "indigo",
      description: "Campus tech and setup wins.",
      iconKey: "laptop",
      id: "zone_tech",
      imageUrl: "https://cdn.ayco.store/zones/tech.jpg",
      name: "Tech Zone",
      slug: "tech",
    });
    zonesRepository.findPriceRangeForZone.mockResolvedValue({
      max: 129,
      min: 19,
    });

    await expect(zonesService.getZoneDetail("tech")).resolves.toMatchObject({
      filters: {
        priceRange: { max: 129, min: 19 },
        sorts: ["newest", "price-asc", "price-desc", "grabbed", "heat"],
      },
      zone: {
        name: "Tech Zone",
        productCount: 12,
        slug: "tech",
      },
    });
  });
});
