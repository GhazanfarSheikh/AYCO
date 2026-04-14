import { loginSchema, refreshSessionSchema, registerSchema, successResponse } from "@ayco/contracts";
import { Body, Controller, HttpCode, Post, Res, UsePipes } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import type { FastifyReply } from "fastify";

import { ZodValidationPipe } from "@/common/pipes/zod-validation.pipe";

import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "./auth.constants";
import { AuthService } from "./auth.service";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOkResponse({ description: "Register and create session." })
  @UsePipes(new ZodValidationPipe(registerSchema))
  async register(@Body() body: unknown, @Res({ passthrough: true }) reply: FastifyReply) {
    const session = await this.authService.register(body);
    this.setSessionCookies(reply, session.accessToken, session.refreshToken);
    return successResponse(session.user);
  }

  @Post("login")
  @HttpCode(200)
  @ApiOkResponse({ description: "Login and create session." })
  @UsePipes(new ZodValidationPipe(loginSchema))
  async login(@Body() body: unknown, @Res({ passthrough: true }) reply: FastifyReply) {
    const session = await this.authService.login(body);
    this.setSessionCookies(reply, session.accessToken, session.refreshToken);
    return successResponse(session.user);
  }

  @Post("refresh")
  @HttpCode(200)
  @ApiOkResponse({ description: "Rotate refresh token." })
  @UsePipes(new ZodValidationPipe(refreshSessionSchema))
  async refresh(@Body() body: unknown, @Res({ passthrough: true }) reply: FastifyReply) {
    const session = await this.authService.refresh(body);
    this.setSessionCookies(reply, session.accessToken, session.refreshToken);
    return successResponse(session.user);
  }

  @Post("logout")
  @HttpCode(200)
  @ApiOkResponse({ description: "Clear session cookies." })
  logout(@Res({ passthrough: true }) reply: FastifyReply) {
    reply.clearCookie(ACCESS_TOKEN_COOKIE);
    reply.clearCookie(REFRESH_TOKEN_COOKIE);
    return successResponse({ loggedOut: true });
  }

  private setSessionCookies(
    reply: FastifyReply,
    accessToken: string,
    refreshToken: string,
  ) {
    reply.setCookie(ACCESS_TOKEN_COOKIE, accessToken, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    reply.setCookie(REFRESH_TOKEN_COOKIE, refreshToken, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }
}
