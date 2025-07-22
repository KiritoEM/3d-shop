import { AdminRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getSession } from "@/lib/sessions/dbSession";
import { INextauthSession, NextRequestWithId } from "@/types";
import { authOptions } from "@/lib/nextauth";
import {
    checkIsSuperadmin,
    isTokenExpired,
    unauthorizedResponse,
} from "@/lib/server-utils";

interface AuthConfig {
    type?: "nextauth" | "db_session";
    adminRole?: AdminRole;
}

export const checkHasAccess = (
    handler: (req: NextRequestWithId, context: any) => Promise<NextResponse>,
    { type = "db_session", adminRole = "ADMIN" }: AuthConfig = {},
) => {
    return async (
        req: NextRequestWithId,
        context: any,
    ): Promise<NextResponse> => {
        try {
            if (type === "nextauth") {
                // Handle next-auth sessions
                return await handleNextAuth(req, handler, context);
            } else if (type === "db_session") {
                const authHeader = req.headers.get("Authorization");

                if (!authHeader || !authHeader.startsWith("Bearer ")) {
                    return unauthorizedResponse(
                        "Missing or invalid Authorization header",
                    );
                }

                const token = authHeader.split(" ")[1];
                if (!token) {
                    return unauthorizedResponse("No token provided");
                }

                return await handleDBSession(
                    req,
                    token,
                    adminRole,
                    handler,
                    context,
                );
            }

            return unauthorizedResponse("Unknown token type");
        } catch (error) {
            console.error("Authentication error:", error);
            const message =
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred";
            return NextResponse.json(
                { error: "Internal server error", message },
                { status: 500 },
            );
        }
    };
};

const handleNextAuth = async (
    req: NextRequestWithId,
    handler: (req: NextRequestWithId, context: any) => Promise<NextResponse>,
    context: any,
): Promise<NextResponse> => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return unauthorizedResponse("No valid session found");
    }

    const expires = new Date(session.expires).getTime();
    if (isTokenExpired(expires)) {
        return unauthorizedResponse("Token has expired");
    }

    req.userId = (session.user as INextauthSession).id ?? null;
    return await handler(req, context);
};

const handleDBSession = async (
    req: NextRequestWithId,
    token: string,
    adminRole: AdminRole,
    handler: (req: NextRequestWithId, context: any) => Promise<NextResponse>,
    context: any,
): Promise<NextResponse> => {
    const dbSession = await getSession(token);

    if (adminRole === "SUPERADMIN") {
        try {
            await checkIsSuperadmin(dbSession);
        } catch {
            return unauthorizedResponse("Superadmin privileges required");
        }
    }

    const expires = new Date(dbSession?.expires!).getTime();
    if (isTokenExpired(expires)) {
        return unauthorizedResponse("Token has expired");
    }

    return await handler(req, context);
};
