import { generateAIChat } from "@/lib/laingchain/generateText";
import { grokModel } from "@/lib/laingchain/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const data = (await req.json()) as { prompt?: string };
        const AIModel = grokModel();

        if (!data.prompt?.trim()) {
            return NextResponse.json(
                {
                    message: "No data provided",
                },
                {
                    status: 404,
                },
            );
        }

        const result = await generateAIChat(data.prompt, AIModel);

        if (!result) {
            return NextResponse.json(
                {
                    message: "No response from AI",
                },
                {
                    status: 404,
                },
            );
        }

        return NextResponse.json(
            {
                message: result.content,
            },
            {
                status: 201,
            },
        );
    } catch (error) {
        console.error("Bot API Error:", error);

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
