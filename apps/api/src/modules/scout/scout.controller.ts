import { Controller, Get, Query } from "@nestjs/common";
import { ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";

import { ok } from "@/common/http/api-response.util";

import { ScoutService } from "./scout.service";

@ApiTags("scout")
@Controller("scout")
export class ScoutController {
  constructor(private readonly scoutService: ScoutService) {}

  @Get("search")
  @ApiOkResponse({ description: "Run AYCO Scout search across products and zones." })
  @ApiQuery({ name: "q", required: true })
  @ApiQuery({ name: "campus", required: false })
  async search(@Query() query: Record<string, unknown>) {
    return ok(await this.scoutService.search(query));
  }
}
