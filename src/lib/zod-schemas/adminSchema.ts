import * as z from "zod";

const baseAdminSchema = z.object({
    username: z.string().min(1, "Le nom d'utilisateur est requis"),
    role: z.enum(["ADMIN", "SUPERADMIN"]),
});

export const addAdminSchema = baseAdminSchema.extend({
    password: z
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre",
        ),
});

export type IAddAdminSchema = z.infer<typeof addAdminSchema>;
