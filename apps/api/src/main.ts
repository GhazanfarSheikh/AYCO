import "reflect-metadata";

import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { DomainExceptionFilter } from "./common/filters/domain-exception.filter";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  await app.register(cookie);
  await app.register(cors, {
    credentials: true,
    origin: process.env.WEB_APP_URL?.split(",") ?? ["http://localhost:3000"],
  });
  await app.register(helmet);
  app.setGlobalPrefix("api/v1");
  app.useGlobalFilters(new DomainExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle("AYCO API")
    .setDescription("Campus-commerce backend for AYCO.")
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(Number(process.env.PORT ?? 4000), "0.0.0.0");
}

void bootstrap();
