import { Module } from "@nestjs/common";

import { ScoutController } from "./scout.controller";
import { ScoutRanker } from "./scout.ranker";
import { ScoutRepository } from "./scout.repository";
import { ScoutService } from "./scout.service";

@Module({
  controllers: [ScoutController],
  providers: [ScoutRanker, ScoutRepository, ScoutService],
  exports: [ScoutRanker, ScoutRepository, ScoutService],
})
export class ScoutModule {}
