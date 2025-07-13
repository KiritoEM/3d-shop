import { getSession } from "@/lib/dbSession";
import { NextRequest, NextResponse } from "next/server";

export const checkHasAccess = (
    handler: Function,
    type: "nextauth" | "jwt" = "jwt",
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
                if (token.length < 32) {
                    return NextResponse.json(
                        { message: "Invalid session token" },
                        { status: 401 },
                    );
                }
            }

            //JWT validation
            else if (type === "jwt") {
                const DBSession = await getSession(token);
                const isTokenExpired =
                    Date.now() > new Date(DBSession.expires).getTime();

                if (isTokenExpired) {
                    return NextResponse.json(
                        { message: "Token was expired" },
                        { status: 401 },
                    );
                }
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
