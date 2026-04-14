import { Module } from "@nestjs/common";

import { StealsController } from "./steals.controller";
import { StealsRepository } from "./steals.repository";
import { StealsService } from "./steals.service";

@Module({
  controllers: [StealsController],
  providers: [StealsRepository, StealsService],
  exports: [StealsRepository, StealsService],
})
export class StealsModule {}
