import { naturalLanguageToSQL } from "@/lib/langchain";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const data = await req.json() as { question?: string };

        if (!data.question) {
            return NextResponse.json({
                message: "No data provided",
                status: 400
            })
        }

        const result = await naturalLanguageToSQL(data.question);

        return NextResponse.json({
            message: result,
            status: 200
        });
    } catch (err) {
        console.error("Payment API Error:", err);

        return NextResponse.json({
            message: "Internal Server Error",
            error: process.env.NODE_ENV === 'development' ? String(err) : undefined
        }, { status: 500 });
    }
}