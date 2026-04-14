import { Injectable } from "@nestjs/common";

import { PrismaService } from "@/infrastructure/prisma/prisma.service";

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.user.findUnique({
      include: {
        preferences: {
          include: {
            campus: true,
          },
        },
      },
      where: { id },
    });
  }

  updatePreferences(
    userId: string,
    input: {
      campusId?: string;
      density?: string;
      examMode?: boolean;
      heatAlerts?: boolean;
      marketing?: boolean;
      receiptResponses?: boolean;
      stealsAlerts?: boolean;
      theme?: "dark" | "light" | "system";
      claimUpdates?: boolean;
    },
  ) {
    return this.prisma.userPreference.upsert({
      create: {
        ...input,
        userId,
      },
      update: input,
      where: { userId },
    });
  }
}
