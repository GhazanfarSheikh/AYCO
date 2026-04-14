import { beforeEach, describe, expect, it, vi } from "vitest";

import { AuthService } from "../src/modules/auth/auth.service";

describe("AuthService", () => {
  const authRepository = {
    createRefreshToken: vi.fn(),
    createUser: vi.fn(),
    findRefreshToken: vi.fn(),
    findUserByEmail: vi.fn(),
    findUserById: vi.fn(),
    revokeRefreshToken: vi.fn(),
  };
  const jwtService = {
    signAsync: vi.fn().mockResolvedValue("token"),
    verify: vi.fn(),
  };

  let authService: AuthService;

  beforeEach(() => {
    vi.clearAllMocks();
    authService = new AuthService(authRepository as never, jwtService as never);
  });

  it("rejects duplicate registration", async () => {
    authRepository.findUserByEmail.mockResolvedValue({
      email: "ari@ayco.store",
      id: "user_1",
    });

    await expect(
      authService.register({
        email: "ari@ayco.store",
        firstName: "Ari",
        password: "supersecure123",
      }),
    ).rejects.toMatchObject({ code: "AUTH_USER_ALREADY_EXISTS" });
  });
});
