import { beforeEach, describe, expect, it, vi } from "vitest";

import { UsersService } from "../src/modules/users/users.service";

describe("UsersService", () => {
  const usersRepository = {
    findById: vi.fn(),
    updatePreferences: vi.fn(),
  };

  let usersService: UsersService;

  beforeEach(() => {
    vi.clearAllMocks();
    usersService = new UsersService(usersRepository as never);
  });

  it("maps the authenticated profile projection", async () => {
    usersRepository.findById.mockResolvedValue({
      email: "ari@ayco.store",
      firstName: "Ari",
      id: "ck1234567890123456789012",
      preferences: { campus: { slug: "nyu" }, theme: "system" },
      role: "student",
    });

    await expect(usersService.getMe("ck1234567890123456789012")).resolves.toMatchObject({
      campusSlug: "nyu",
      email: "ari@ayco.store",
      firstName: "Ari",
    });
  });
});
