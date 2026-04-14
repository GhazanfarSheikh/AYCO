import { listStealsQuerySchema } from "@ayco/contracts";
import { Injectable } from "@nestjs/common";

import { ERROR_CODES } from "@/common/errors/error-codes";
import { DomainError } from "@/common/errors/domain-error";
import { toProductCardDto } from "@/modules/products/products.mapper";

import { StealsRepository } from "./steals.repository";

@Injectable()
export class StealsService {
  constructor(private readonly stealsRepository: StealsRepository) {}

  async listSteals(rawQuery: unknown) {
    const parsed = listStealsQuerySchema.safeParse(rawQuery);
    if (!parsed.success) {
      throw new DomainError(
        ERROR_CODES.catalogFilterInvalid,
        "Those Steals filters didn't line up.",
        parsed.error.flatten(),
        400,
      );
    }

    const query = parsed.data;
    const seen = new Set<string>();
    const steals = (await this.stealsRepository.listActiveSteals(query.campus))
      .filter((steal) => {
        if (seen.has(steal.productId)) {
          return false;
        }
        seen.add(steal.productId);
        return true;
      })
      .slice(0, query.limit)
      .map((steal) => ({
        badgeText: steal.badgeText,
        endsAt: steal.endsAt.toISOString(),
        id: steal.id,
        priority: steal.priority,
        product: toProductCardDto(steal.product),
        startsAt: steal.startsAt.toISOString(),
        stealPrice: Number(steal.stealPrice),
      }));

    return {
      endsAt: steals[0]?.endsAt ?? null,
      items: steals,
      lead: steals[0] ?? null,
      startedAt: steals[0]?.startsAt ?? null,
    };
  }
}
