import type { ZodSchema } from "zod";
import { PipeTransform } from "@nestjs/common";

import { DomainError } from "../errors/domain-error";

export class ZodValidationPipe<T> implements PipeTransform {
  constructor(private readonly schema: ZodSchema<T>) {}

  transform(value: unknown): T {
    const parsed = this.schema.safeParse(value);

    if (!parsed.success) {
      throw new DomainError(
        "VALIDATION_FAILED",
        "Request validation failed.",
        parsed.error.flatten(),
        422,
      );
    }

    return parsed.data;
  }
}
