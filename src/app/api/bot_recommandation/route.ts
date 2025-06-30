import { generateAIChat } from "@/lib/laingchain";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const data = (await req.json()) as { prompt?: string };

        if (!data.prompt) {
            return NextResponse.json({
                message: "No data provided",
                status: 400,
            });
        }

        const result = await generateAIChat(data.prompt);

        if (!result) {
            return NextResponse.json({
                message: "No response from AI",
                status: 400,
            });
        }

        return NextResponse.json({
            message: result,
            status: 200,
        });
    } catch (err) {
        console.error("Bot API Error:", err);

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
