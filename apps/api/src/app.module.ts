import { Module, MiddlewareConsumer, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";

import { DomainExceptionFilter } from "./common/filters/domain-exception.filter";
import { requestIdMiddleware } from "./common/request-id/request-id.middleware";
import { PrismaModule } from "./infrastructure/prisma/prisma.module";
import { AuthModule } from "./modules/auth/auth.module";
import { CatalogModule } from "./modules/catalog/catalog.module";
import { ScoutModule } from "./modules/scout/scout.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot({
      pinoHttp: {
        redact: ["req.headers.authorization", "req.cookies"],
      },
    }),
    PrismaModule,
    AuthModule,
    CatalogModule,
    ScoutModule,
    UsersModule,
  ],
  providers: [DomainExceptionFilter],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(requestIdMiddleware).forRoutes("*");
  }
}
