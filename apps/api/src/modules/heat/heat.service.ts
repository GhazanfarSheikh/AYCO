import {
  type HeatProductDto,
  heatTierSchema,
  listHeatQuerySchema,
} from "@ayco/contracts";
import { Injectable } from "@nestjs/common";

import { ERROR_CODES } from "@/common/errors/error-codes";
import { DomainError } from "@/common/errors/domain-error";
import { toProductCardDto } from "@/modules/products/products.mapper";

import { HeatRepository } from "./heat.repository";

@Injectable()
export class HeatService {
  constructor(private readonly heatRepository: HeatRepository) {}

  async listHeat(rawQuery: unknown) {
    const parsed = listHeatQuerySchema.safeParse(rawQuery);
    if (!parsed.success) {
      throw new DomainError(
        ERROR_CODES.catalogFilterInvalid,
        "That Heat filter stack didn't line up.",
        parsed.error.flatten(),
        400,
      );
    }

    const query = parsed.data;
    const candidates = await this.heatRepository.listHeatCandidates(query.campus);
    const ranked = candidates
      .map((product) => {
        const dto = toProductCardDto(product);
        const campusScore = product.heatSnapshots[0]?.score ?? null;

        return {
          ...dto,
          campusScore,
          rankingScore: (campusScore ?? dto.heatScore) + this.getRankingBoost(dto, query.examMode),
        };
      })
      .sort((left, right) => right.rankingScore - left.rankingScore)
      .slice(0, query.limit);

    const filtered = query.tier
      ? ranked.filter((product) => product.heatTier === query.tier)
      : ranked;

    const tiers = [
      { label: "Blazing", tier: heatTierSchema.enum.blazing },
      { label: "Heating Up", tier: heatTierSchema.enum.heating },
      { label: "Warming", tier: heatTierSchema.enum.warming },
    ]
      .map((entry) => ({
        items: filtered
          .filter((product) => product.heatTier === entry.tier)
          .map(({ rankingScore: _rankingScore, ...product }) => product),
        label: entry.label,
        tier: entry.tier,
      }))
      .filter((entry) => entry.items.length > 0);

    return { tiers };
  }

  private getRankingBoost(product: HeatProductDto, examMode?: boolean) {
    let boost = 0;

    if (product.isFeatured) {
      boost += 5;
    }

    if (examMode && product.isExamRelevant) {
      boost += 12;
    }

    return boost;
  }
}
