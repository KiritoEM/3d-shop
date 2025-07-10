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
                image: providedSession?.image,
                email: providedSession?.email,
                name: providedSession?.name,
            },
        });

        if (!sessionUpdated) return;

        window.location.reload();
    } catch (err) {
        isDevelopment && console.error(err);
    }
};
