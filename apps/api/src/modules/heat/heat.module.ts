import { Module } from "@nestjs/common";

import { HeatController } from "./heat.controller";
import { HeatRepository } from "./heat.repository";
import { HeatService } from "./heat.service";

@Module({
  controllers: [HeatController],
  providers: [HeatRepository, HeatService],
  exports: [HeatRepository, HeatService],
})
export class HeatModule {}
