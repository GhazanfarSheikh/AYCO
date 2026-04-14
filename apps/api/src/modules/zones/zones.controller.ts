import { Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { ok } from "@/common/http/api-response.util";

import { ZonesService } from "./zones.service";

@ApiTags("catalog")
@Controller("catalog/zones")
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) {}

  @Get()
  @ApiOkResponse({ description: "List active catalog zones." })
  async listZones() {
    return ok(await this.zonesService.listZones());
  }

  @Get(":slug")
  @ApiOkResponse({ description: "Get zone metadata and Dial In defaults." })
  async getZone(@Param("slug") slug: string) {
    return ok(await this.zonesService.getZoneDetail(slug));
  }
}
