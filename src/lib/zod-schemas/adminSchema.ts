import * as z from "zod";

export const addAdminSchema = z.object({
    username: z.string().min(1, "Le nom admin est requis"),
    role: z.enum(["ADMIN", "SUPERADMIN"]),
});

export type IAddAdminSchema = z.infer<typeof addAdminSchema>;
