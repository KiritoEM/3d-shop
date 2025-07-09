"use client";

import { isDevelopment } from "@/lib/utils";
import { DefaultSession } from "next-auth";
import { useSession } from "next-auth/react";

interface IprovidedSession {
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

export const updateSession = async (providedSession: IprovidedSession) => {
    try {
        const { update } = useSession();

        const sessionUpdated = await update({
            user: {
                image: providedSession?.image,
                email: providedSession?.email,
                name: providedSession?.name,
            },
        });

        if (!sessionUpdated) return;

        setTimeout(() => {
            window.location.reload();
        }, 100);
    } catch (err) {
        isDevelopment && console.error(err);
    }
};
