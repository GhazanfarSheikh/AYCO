import { successResponse, updatePreferencesSchema } from "@ayco/contracts";
import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { ZodValidationPipe } from "@/common/pipes/zod-validation.pipe";
import { AccessTokenGuard } from "@/modules/auth/guards/access-token.guard";

import { UsersService } from "./users.service";

@ApiTags("users")
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  @ApiOkResponse({ description: "Return current authenticated user profile." })
  async me(@Req() request: { user: { sub: string } }) {
    return successResponse(await this.usersService.getMe(request.user.sub));
  }

  @Patch("preferences")
  @ApiOkResponse({ description: "Update user preferences." })
  @UsePipes(new ZodValidationPipe(updatePreferencesSchema))
  async updatePreferences(
    @Req() request: { user: { sub: string } },
    @Body() body: unknown,
  ) {
    return successResponse(
      await this.usersService.updatePreferences(request.user.sub, body),
    );
  }
}
