import { randomUUID } from "node:crypto";

import type { FastifyReply, FastifyRequest } from "fastify";

export function requestIdMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
  done: () => void,
) {
  const requestId = request.headers["x-request-id"]?.toString() ?? randomUUID();
  request.headers["x-request-id"] = requestId;
  reply.header("x-request-id", requestId);
  done();
}
