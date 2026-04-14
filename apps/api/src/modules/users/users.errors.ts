import { DomainError } from "@/common/errors/domain-error";

export const usersErrors = {
  notFound: () =>
    new DomainError(
      "USER_NOT_FOUND",
      "We couldn't find that user.",
      undefined,
      404,
    ),
};
