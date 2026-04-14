import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";
import { AuthRepository } from "./auth.repository";
import { AuthService } from "./auth.service";
import { AccessTokenGuard } from "./guards/access-token.guard";
import { AccessTokenStrategy } from "./strategies/access-token.strategy";

@Module({
  controllers: [AuthController],
  imports: [JwtModule.register({})],
  providers: [
    AuthRepository,
    AuthService,
    AccessTokenGuard,
    AccessTokenStrategy,
  ],
  exports: [AccessTokenGuard, AuthService],
})
export class AuthModule {}
