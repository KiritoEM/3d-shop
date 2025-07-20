import * as z from "zod";

const baseAdminSchema = z.object({
    username: z.string().min(1, "Le nom admin est requis"),
    role: z.enum(["ADMIN", "SUPERADMIN"]),
});

export const addAdminSchema = baseAdminSchema.extend({});

export type IAddAdminSchema = z.infer<typeof addAdminSchema>;
