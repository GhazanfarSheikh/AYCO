import type { RefreshToken, User } from "@ayco/db";
import { Injectable } from "@nestjs/common";

import { PrismaService } from "@/infrastructure/prisma/prisma.service";

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  findUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findUserById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async createUser(input: {
    email: string;
    firstName: string;
    passwordHash: string;
  }): Promise<User> {
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: input.email,
          firstName: input.firstName,
          passwordHash: input.passwordHash,
        },
      });

      await tx.userPreference.create({
        data: {
          userId: user.id,
        },
      });

      await tx.stash.create({
        data: {
          userId: user.id,
        },
      });

      return user;
    });
  }

  async createRefreshToken(input: {
    expiresAt: Date;
    ipAddress?: string;
    tokenHash: string;
    userAgent?: string;
    userId: string;
  }): Promise<RefreshToken> {
    return this.prisma.refreshToken.create({
      data: input,
    });
  }

  findRefreshToken(id: string) {
    return this.prisma.refreshToken.findUnique({
      where: { id },
    });
  }

  revokeRefreshToken(id: string) {
    return this.prisma.refreshToken.update({
      data: {
        revokedAt: new Date(),
      },
      where: { id },
    });
  }
}
