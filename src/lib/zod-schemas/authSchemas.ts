import * as z from "zod";

const baseAuthSchema = z.object({
    email: z
        .string()
        .min(1, "L'email est requis")
        .email("Format d'email invalide"),
    password: z
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre",
        ),
});

const signupSchema = baseAuthSchema.extend({
    mode: z.literal("signup"),
    name: z
        .string()
        .min(1, "Le nom est requis")
        .max(50, "Le nom ne peut pas dépasser 50 caractères"),
});

const loginSchema = baseAuthSchema.extend({
    mode: z.literal("login"),
});

const adminLoginSchema = z.object({
    name: z
        .string()
        .min(1, "Le nom d'admin est requis")
        .max(50, "Le nom ne peut pas dépasser 50 caractères"),
    mode: z.literal("admin_login"),
    ...baseAuthSchema.pick({ password: true }).shape,
});

export const authSchema = z.discriminatedUnion("mode", [
    loginSchema,
    signupSchema,
    adminLoginSchema,
]);

export type IAuthData = z.infer<typeof authSchema>;
export type ILoginSchema = Omit<z.infer<typeof loginSchema>, "mode">;
export type ISignupSchema = Omit<z.infer<typeof signupSchema>, "mode">;
export type IAdminLoginSchema = Omit<z.infer<typeof adminLoginSchema>, "mode">;
