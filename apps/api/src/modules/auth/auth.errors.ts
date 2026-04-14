import { DomainError } from "@/common/errors/domain-error";

export const authErrors = {
  invalidCredentials: () =>
    new DomainError("AUTH_INVALID_CREDENTIALS", "The login details do not match."),
  refreshTokenInvalid: () =>
    new DomainError(
      "AUTH_REFRESH_TOKEN_INVALID",
      "The session refresh token is missing or invalid.",
      undefined,
      401,
    ),
  userAlreadyExists: () =>
    new DomainError("AUTH_USER_ALREADY_EXISTS", "An account already exists for that email.", undefined, 409),
};
