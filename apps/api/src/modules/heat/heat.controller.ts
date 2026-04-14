import { Controller, Get, Query } from "@nestjs/common";
import { ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";

import { ok } from "@/common/http/api-response.util";

import { HeatService } from "./heat.service";

@ApiTags("catalog")
@Controller("catalog/heat")
export class HeatController {
  constructor(private readonly heatService: HeatService) {}

  @Get()
  @ApiOkResponse({ description: "List ranked Heat surfaces." })
  @ApiQuery({ name: "campus", required: false })
  @ApiQuery({ name: "limit", required: false })
  @ApiQuery({ name: "tier", required: false })
  @ApiQuery({ name: "examMode", required: false })
  async listHeat(@Query() query: Record<string, unknown>) {
    return ok(await this.heatService.listHeat(query));
  }
}
