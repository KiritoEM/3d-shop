import { NextRequest, NextResponse } from "next/server";

export const BearerAccess = (handler: Function) => {
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

            if (token.length < 32) {
                return NextResponse.json(
                    { message: "Invalid session token" },
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
