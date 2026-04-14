import { z } from "zod";
export declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    firstName: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const refreshSessionSchema: z.ZodObject<{
    refreshToken: z.ZodString;
}, z.core.$strip>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshSessionInput = z.infer<typeof refreshSessionSchema>;
//# sourceMappingURL=auth.d.ts.map