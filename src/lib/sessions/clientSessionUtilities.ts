"use client";

import { isDevelopment } from "@/lib/utils";

interface IprovidedSession {
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

export const updateSession = async (
    providedSession: IprovidedSession,
    update: Function,
) => {
    try {
        const sessionUpdated = await update({
            user: {
                image: providedSession?.image || "",
                email: providedSession?.email || "",
                name: providedSession?.name || "",
            },
        });

        if (!sessionUpdated) {
            console.error("Échec de la mise à jour de la session");
            return false;
        }

        window.location.reload();

        return true;
    } catch (err) {
        console.error("Erreur lors de la mise à jour de la session :", err);
        return false;
    }
};
