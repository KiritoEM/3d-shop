import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req });

        console.log(token);

        return NextResponse.json({ accessToken: token }, { status: 200 });
    } catch (error) {
        console.error("Session Error:", error);

        return NextResponse.json(
            {
                message: "Internal Server Error",
                error:
                    process.env.NODE_ENV === "development"
                        ? String(error)
                        : undefined,
            },
            { status: 500 },
        );
    }
}
