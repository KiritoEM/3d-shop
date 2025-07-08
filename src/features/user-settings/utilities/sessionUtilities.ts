"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export type SessionUserWithId = {
    id: string;
    name?: string;
    email?: string;
    image?: string;
};

export const validateSession = async (options: typeof authOptions) => {
    const serverSession = await getServerSession(options);

    if (!serverSession || !serverSession.user) {
        redirect("/login?callbackUrl=settings");
    }

    return serverSession.user as SessionUserWithId;
};
