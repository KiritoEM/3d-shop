import { getSession } from "@/lib/dbSession";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ token: string }> },
) {
    try {
        const token = (await params).token;

        console.log(token);

        if (!token) {
            return NextResponse.json(
                {
                    message: "No token provided",
                },
                {
                    status: 404,
                },
            );
        }

        const session = await getSession(token);

        if (!session) {
            return NextResponse.json(
                {
                    message: "No session found",
                },
                {
                    status: 404,
                },
            );
        }

        return NextResponse.json(session, {
            status: 200,
        });
    } catch (err) {
        console.error("Admin session error:", err);

        return NextResponse.json(
            {
                message: "Internal Server Error",
                error:
                    process.env.NODE_ENV === "development"
                        ? String(err)
                        : undefined,
            },
            { status: 500 },
        );
    }
}
