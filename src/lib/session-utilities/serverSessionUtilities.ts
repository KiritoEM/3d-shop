"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { redirect } from "next/navigation";

export type SessionUserWithId = {
    id: string;
    name?: string;
    email?: string;
    image?: string;
};

export const validateSession = async (
    options: typeof authOptions,
    callback: string,
) => {
    const serverSession = await getServerSession(options);

    if (!serverSession || !serverSession.user) {
        redirect(`/login?callbackUrl=${callback}`);
    }

    return serverSession.user as SessionUserWithId;
};

export const redirectIfAuthentificated = async (
    options: typeof authOptions,
    callback: string,
) => {
    const serverSession = await getServerSession(options);

    if (serverSession && serverSession?.user) {
        redirect(`/${callback}`);
    }
};
