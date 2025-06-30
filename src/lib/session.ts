"use server";

import crypto from "crypto";
import { headers, cookies } from "next/headers";
import { prisma } from "./prisma";
import { IResponseType } from "@/types";

const generateToken = () => {
    const randomBytes = crypto.randomBytes(32).toString("hex");
    return crypto.createHash("sha256").update(randomBytes).digest("hex"); //hash random bytes
};

export const createSession = async (): Promise<IResponseType<null>> => {
    const generatedToken = generateToken();
    const userAgent = (await headers()).get("user-agent"); //get user-agent
    const cookiesStore = await cookies();

    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); //7 days

    const sessionDB = await prisma.session.create({
        data: {
            token: generatedToken,
            userAgent: userAgent,
            expires: expires,
        },
    });

    if (!sessionDB) {
        return {
            message: "Failed to create DB session",
            status: "error",
        };
    }

    cookiesStore.set("session_id", generatedToken, {
        httpOnly: true,
        expires: expires,
        sameSite: "lax",
        secure: true,
    });

    return {
        message: "Session created successfully",
        status: "success",
    };
};
