import * as z from "zod";

const baseSettingsSchema = z.object({
    name: z
        .string()
        .min(1, "Le nom est requis")
        .max(50, "Le nom ne peut pas dépasser 50 caractères"),
});

const userSettingsSchema = baseSettingsSchema.extend({
    mode: z.literal("user"),
    email: z
        .string()
        .min(1, "L'email est requis")
        .email("Format d'email invalide"),
});

export const securitySchema = z.object({
    password: z
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre",
        ),
    newPassword: z
        .string()
        .min(8, "Le nouveau mot de passe doit contenir au moins 8 caractères")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre",
        ),
});

export const settingsSchema = z.discriminatedUnion("mode", [
    userSettingsSchema,
]);

export type ISettingsSchema = z.infer<typeof settingsSchema>;
export type ISecuritySchema = z.infer<typeof securitySchema>;
export type IUserSettingsSchema = Omit<
    z.infer<typeof userSettingsSchema>,
    "mode"
>;
