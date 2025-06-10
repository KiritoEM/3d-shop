import * as z from "zod";

const baseAuthSchema = z.object({
    email: z.string().min(1, "L'email est requis").email("Format d'email invalide"),
    password: z
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre"),
})

const loginSchema = baseAuthSchema.extend({
    mode: z.literal("login")
})

export const authSchema = z.discriminatedUnion("mode", [
    loginSchema
])

export type ILoginSchema = z.infer<typeof loginSchema>;