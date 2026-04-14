import { z } from "zod";
export const registerSchema = z.object({
    email: z.string().email(),
    firstName: z.string().min(1).max(100),
    password: z.string().min(8).max(128),
});
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(128),
});
export const refreshSessionSchema = z.object({
    refreshToken: z.string().min(1),
});
//# sourceMappingURL=auth.js.map