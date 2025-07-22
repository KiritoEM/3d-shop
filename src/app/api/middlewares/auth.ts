import { AdminInfo, AdminRole, Session } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/sessions/dbSession";
import { isSuperAdmin } from "@/lib/utils";
import { IDBSession, INextauthSession } from "@/types";
import { decodeJWT } from "@/lib/jwt";

export const checkHasAccess = (
    handler: Function,
    type: "nextauth" | "jwt" = "jwt",
    adminRole: AdminRole = "ADMIN",
) => {
    return async (req: NextRequest, context: any) => {
        try {
            const headers = req.headers;

            if (
                !headers.get("Authorization") ||
                !headers.get("Authorization")?.startsWith("Bearer")
            ) {
                return NextResponse.json(
                    { message: "Unauthorized request" },
                    { status: 401 },
                );
            }

            const token = req.headers.get("Authorization")?.slice(7);

            if (!token) {
                return NextResponse.json(
                    { message: "No token provided" },
                    { status: 401 },
                );
            }

            //Nextauth validation
            if (type === "nextauth") {
                const payload = decodeJWT<INextauthSession>(
                    token,
                    process.env.NEXTAUTH_SECRET as string,
                );

                checkIsExpired(Number(payload.exp) * 1000);
            }

            //JWT validation
            else if (type === "jwt") {
                const DBSession = await getSession(token);

                if (adminRole === "SUPERADMIN") {
                    const isSuperAdmin = await checkSuperadminAccess(DBSession);

                    if (!isSuperAdmin) {
                        return NextResponse.json(
                            {
                                message:
                                    "This action needs superadmin privileges",
                            },
                            { status: 401 },
                        );
                    }
                }

                checkIsExpired(new Date(DBSession?.expires!).getTime());
            } else {
                return NextResponse.json(
                    { message: "Unauthorized request, uknow token type" },
                    { status: 401 },
                );
            }

            const response = await handler(req, context);
            return response;
        } catch (err) {
            console.error("Bearer access error: ", err);
            return NextResponse.json(
                {
                    error: "Internal server error",
                    message:
                        err instanceof Error
                            ? err.message
                            : "An unexpected error occurred",
                },
                {
                    status: 500,
                },
            );
        }
    };
};

const checkIsExpired = (expires: number) => {
    const isTokenExpired = Date.now() > expires;

    if (isTokenExpired) {
        return NextResponse.json(
            { message: "Token was expired" },
            { status: 401 },
        );
    }
};

export const checkSuperadminAccess = (
    sessionPayload: IDBSession,
): Promise<IDBSession> => {
    return new Promise((resolve, reject) => {
        if (sessionPayload.role && !isSuperAdmin(sessionPayload.role)) reject();

        resolve(sessionPayload);
    });
};
