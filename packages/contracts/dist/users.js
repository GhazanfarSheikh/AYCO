import { z } from "zod";
export const themeModeSchema = z.enum(["dark", "light", "system"]);
export const pingSettingsSchema = z.object({
    claimUpdates: z.boolean(),
    heatAlerts: z.boolean(),
    marketing: z.boolean(),
    receiptResponses: z.boolean(),
    stealsAlerts: z.boolean(),
});
export const updatePreferencesSchema = z.object({
    campusId: z.string().cuid().optional(),
    density: z.enum(["compact", "default"]).optional(),
    examMode: z.boolean().optional(),
    pingSettings: pingSettingsSchema.partial().optional(),
    theme: themeModeSchema.optional(),
});
export const meResponseSchema = z.object({
    campusSlug: z.string().nullable(),
    cloutBalance: z.number().int().nonnegative(),
    email: z.string().email(),
    firstName: z.string(),
    id: z.string().cuid(),
    role: z.enum(["student", "admin", "moderator"]),
    theme: themeModeSchema,
});
//# sourceMappingURL=users.js.map