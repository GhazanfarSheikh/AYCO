import { meResponseSchema, updatePreferencesSchema } from "@ayco/contracts";
import { Injectable } from "@nestjs/common";

import { usersErrors } from "./users.errors";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getMe(userId: string) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw usersErrors.notFound();
    }

    return meResponseSchema.parse({
      campusSlug: user.preferences?.campus?.slug ?? null,
      cloutBalance: 0,
      email: user.email,
      firstName: user.firstName,
      id: user.id,
      role: user.role,
      theme: user.preferences?.theme ?? "system",
    });
  }

  async updatePreferences(userId: string, input: unknown) {
    const parsed = updatePreferencesSchema.parse(input);
    const nextPreferences = {
      campusId: parsed.campusId,
      claimUpdates: parsed.pingSettings?.claimUpdates,
      density: parsed.density,
      examMode: parsed.examMode,
      heatAlerts: parsed.pingSettings?.heatAlerts,
      marketing: parsed.pingSettings?.marketing,
      receiptResponses: parsed.pingSettings?.receiptResponses,
      stealsAlerts: parsed.pingSettings?.stealsAlerts,
      theme: parsed.theme,
    };

    return this.usersRepository.updatePreferences(userId, nextPreferences);
  }
}
