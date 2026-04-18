import type { ApiResponse } from "@ayco/contracts";
import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";

import { ok } from "@/common/http/api-response.util";

import { ProductsService } from "./products.service";

@ApiTags("catalog")
@Controller("catalog/products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOkResponse({ description: "List catalog products." })
  @ApiQuery({ name: "zone", required: false })
  @ApiQuery({ name: "campus", required: false })
  @ApiQuery({ name: "sort", required: false })
  @ApiQuery({ name: "page", required: false })
  @ApiQuery({ name: "limit", required: false })
  @ApiQuery({ name: "heatOnly", required: false })
  @ApiQuery({ name: "minPrice", required: false })
  @ApiQuery({ name: "maxPrice", required: false })
  @ApiQuery({ name: "examMode", required: false })
  async listProducts(
    @Query() query: Record<string, unknown>,
  ): Promise<
    ApiResponse<Awaited<ReturnType<ProductsService["listProducts"]>>["data"]>
  > {
    const result = await this.productsService.listProducts(query);
    return ok(result.data, result.meta);
  }

  @Get(":idOrSlug")
  @ApiOkResponse({ description: "Get a product detail by id or slug." })
  async getProduct(
    @Param("idOrSlug") idOrSlug: string,
  ): Promise<
    ApiResponse<Awaited<ReturnType<ProductsService["getProductDetail"]>>>
  > {
    return ok(await this.productsService.getProductDetail(idOrSlug));
  }

  @Get(":idOrSlug/related")
  @ApiOkResponse({
    description: "Get related products for a product detail page.",
  })
  async getRelatedProducts(
    @Param("idOrSlug") idOrSlug: string,
  ): Promise<
    ApiResponse<Awaited<ReturnType<ProductsService["getRelatedProducts"]>>>
  > {
    return ok(await this.productsService.getRelatedProducts(idOrSlug));
  }
}
