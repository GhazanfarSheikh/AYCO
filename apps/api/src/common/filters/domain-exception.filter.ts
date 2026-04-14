import { errorResponse } from "@ayco/contracts";
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import type { FastifyReply, FastifyRequest } from "fastify";

import { DomainError } from "../errors/domain-error";

@Catch()
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const response = ctx.getResponse<FastifyReply>();
    const requestId = response.getHeader("x-request-id")?.toString();

    if (exception instanceof DomainError) {
      return response.status(exception.status).send(
        errorResponse(exception.code, exception.message, exception.details, {
          requestId,
        }),
      );
    }

    if (exception instanceof HttpException) {
      return response
        .status(exception.getStatus())
        .send(
          errorResponse(
            "HTTP_EXCEPTION",
            exception.message,
            exception.getResponse(),
            { requestId },
          ),
        );
    }

    return response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send(
        errorResponse(
          "INTERNAL_SERVER_ERROR",
          "Something broke on our side.",
          { path: request.url },
          { requestId },
        ),
      );
  }
}
