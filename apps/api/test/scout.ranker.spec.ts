import { describe, expect, it } from "vitest";

import { ScoutRanker } from "../src/modules/scout/scout.ranker";

describe("ScoutRanker", () => {
  const ranker = new ScoutRanker();

  it("prioritizes exact title matches over hotter but looser matches", () => {
    const ranked = ranker.rankProducts("aurora buds", [
      {
        heatScore: 99,
        isExamRelevant: false,
        searchKeywords: ["wireless"],
        subtitle: "Noise cancelling",
        tags: [{ label: "audio" }],
        title: "Tech Pods",
        zones: [{ zone: { slug: "tech" } }],
      },
      {
        heatScore: 70,
        isExamRelevant: false,
        searchKeywords: ["aurora"],
        subtitle: "Campus commute",
        tags: [{ label: "audio" }],
        title: "Aurora Buds",
        zones: [{ zone: { slug: "tech" } }],
      },
    ] as never);

    expect(ranked[0]?.title).toBe("Aurora Buds");
  });

  it("boosts exam-relevant products for study-style queries", () => {
    const ranked = ranker.rankProducts("study focus", [
      {
        heatScore: 82,
        isExamRelevant: false,
        searchKeywords: ["desk"],
        subtitle: "Tech setup",
        tags: [{ label: "tech" }],
        title: "Grid Dock",
        zones: [{ zone: { slug: "tech" } }],
      },
      {
        heatScore: 74,
        isExamRelevant: true,
        searchKeywords: ["focus"],
        subtitle: "Study sessions",
        tags: [{ label: "study" }],
        title: "Focus Lamp",
        zones: [{ zone: { slug: "study" } }],
      },
    ] as never);

    expect(ranked[0]?.title).toBe("Focus Lamp");
  });
});
