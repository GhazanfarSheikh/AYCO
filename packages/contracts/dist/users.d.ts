import { z } from "zod";
export declare const themeModeSchema: z.ZodEnum<{
    dark: "dark";
    light: "light";
    system: "system";
}>;
export declare const pingSettingsSchema: z.ZodObject<{
    claimUpdates: z.ZodBoolean;
    heatAlerts: z.ZodBoolean;
    marketing: z.ZodBoolean;
    receiptResponses: z.ZodBoolean;
    stealsAlerts: z.ZodBoolean;
}, z.core.$strip>;
export declare const updatePreferencesSchema: z.ZodObject<{
    campusId: z.ZodOptional<z.ZodString>;
    density: z.ZodOptional<z.ZodEnum<{
        default: "default";
        compact: "compact";
    }>>;
    examMode: z.ZodOptional<z.ZodBoolean>;
    pingSettings: z.ZodOptional<z.ZodObject<{
        claimUpdates: z.ZodOptional<z.ZodBoolean>;
        heatAlerts: z.ZodOptional<z.ZodBoolean>;
        marketing: z.ZodOptional<z.ZodBoolean>;
        receiptResponses: z.ZodOptional<z.ZodBoolean>;
        stealsAlerts: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>>;
    theme: z.ZodOptional<z.ZodEnum<{
        dark: "dark";
        light: "light";
        system: "system";
    }>>;
}, z.core.$strip>;
export declare const meResponseSchema: z.ZodObject<{
    campusSlug: z.ZodNullable<z.ZodString>;
    cloutBalance: z.ZodNumber;
    email: z.ZodString;
    firstName: z.ZodString;
    id: z.ZodString;
    role: z.ZodEnum<{
        student: "student";
        admin: "admin";
        moderator: "moderator";
    }>;
    theme: z.ZodEnum<{
        dark: "dark";
        light: "light";
        system: "system";
    }>;
}, z.core.$strip>;
export type UpdatePreferencesInput = z.infer<typeof updatePreferencesSchema>;
export type MeResponse = z.infer<typeof meResponseSchema>;
//# sourceMappingURL=users.d.ts.map