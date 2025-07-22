"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { INextauthSession } from "@/types";

export const validateSession = async (
    options: typeof authOptions,
    callback: string,
) => {
    const serverSession = await getServerSession(options);
    console.log(serverSession);

    if (!serverSession || !serverSession.user) {
        redirect(`/login?callbackUrl=${callback}`);
    }

    return serverSession.user as INextauthSession;
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
