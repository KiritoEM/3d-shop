import { getSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = (await req.json()) as { token: string };

        if (!data.token) {
            return NextResponse.json({
                message: "No token provided",
                status: 400,
            });
        }

        const session = await getSession(data.token);

        if (!session) {
            return NextResponse.json({
                message: "No session created",
                status: 400,
            });
        }

        return NextResponse.json({
            expires: session.expires,
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
