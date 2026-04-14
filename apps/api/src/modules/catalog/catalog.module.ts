import { Module } from "@nestjs/common";

import { HeatModule } from "@/modules/heat/heat.module";
import { ProductsModule } from "@/modules/products/products.module";
import { StealsModule } from "@/modules/steals/steals.module";
import { ZonesModule } from "@/modules/zones/zones.module";

@Module({
  imports: [HeatModule, ProductsModule, StealsModule, ZonesModule],
  exports: [HeatModule, ProductsModule, StealsModule, ZonesModule],
})
export class CatalogModule {}
