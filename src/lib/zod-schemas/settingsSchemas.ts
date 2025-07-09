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

export const settingsSchema = z.discriminatedUnion("mode", [
    userSettingsSchema,
]);

export type ISettingsSchema = z.infer<typeof settingsSchema>;
export type IUserSettingsSchema = Omit<
    z.infer<typeof userSettingsSchema>,
    "mode"
>;
