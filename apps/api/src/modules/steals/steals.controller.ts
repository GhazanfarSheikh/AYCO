import type { ApiResponse } from "@ayco/contracts";
import { Controller, Get, Query } from "@nestjs/common";
import { ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";

import { ok } from "@/common/http/api-response.util";

import { StealsService } from "./steals.service";

@ApiTags("catalog")
@Controller("catalog/steals")
export class StealsController {
  constructor(private readonly stealsService: StealsService) {}

  @Get()
  @ApiOkResponse({ description: "List active Steals with lead selection." })
  @ApiQuery({ name: "campus", required: false })
  @ApiQuery({ name: "limit", required: false })
  async listSteals(
    @Query() query: Record<string, unknown>,
  ): Promise<ApiResponse<Awaited<ReturnType<StealsService["listSteals"]>>>> {
    return ok(await this.stealsService.listSteals(query));
  }
}
