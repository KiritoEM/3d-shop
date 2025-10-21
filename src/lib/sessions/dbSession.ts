"use server";

import crypto from "crypto";
import { headers, cookies } from "next/headers";
import { IDBSession, SessionwithFacial } from "@/types";
import { prisma } from "../prisma";
const generateToken = () => {
    const randomBytes = crypto.randomBytes(32).toString("hex");
    return crypto.createHash("sha256").update(randomBytes).digest("hex"); //hash random bytes
};

type IcreateSessionArg = {
    method?: "FORM" | "FACIAL_RECOGNITION";
};

export const createSession = async (
    arg: IcreateSessionArg = { method: "FORM" },
    id: string,
) => {
    const generatedToken = generateToken();
    const userAgent = (await headers()).get("user-agent"); //get user-agent
    const cookiesStore = await cookies();

    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); //7 days

    const sessionDB = await prisma.session.create({
        data: {
            token: generatedToken,
            userAgent,
            method: arg.method,
            expires,
            admin: {
                connect: {
                    id,
                },
            },
        },
    });

    if (!sessionDB) {
        throw new Error("Failed to create DB session");
    }

    await cookiesStore.set("session_id", generatedToken, {
        httpOnly: true,
        expires: expires,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
    });
};

export const getSession = async (token: string): Promise<IDBSession> => {
    const session = (await prisma.session.findUnique({
        where: {
            token,
        },
        select: {
            id: true,
            expires: true,
            admin: {
                select: {
                    username: true,
                    role: true,
                    id: true,
                    adminFacial: {
                        select: {
                            image: true,
                        },
                    },
                },
            },
        },
    })) as SessionwithFacial;

    if (!session) {
        throw new Error("Session not found");
    }

    console.log(session);

    return {
        id: session.id,
        username: session.admin?.username!,
        role: session.admin?.role!,
        image: session.admin?.adminFacial?.image ?? "",
        expires: session.expires,
        adminId: session.admin.id,
    };
};

export const deleteSession = async (token: string): Promise<boolean> => {
    const session = await getSession(token);

    if (!session) return false;

    const deletedSession = await prisma.session.delete({
        where: {
            token,
        },
    });

    if (!deletedSession) return false;

    const cookiesStore = await cookies();

    cookiesStore.delete("session_id");
    return true;
};

export const getToken = async () => {
    const token = (await cookies()).get("session_id");
    return token?.value ?? null;
};
