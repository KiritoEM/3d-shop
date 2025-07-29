import { grokModel } from "@/lib/laingchain/models";
import { translate3DMaterials } from "@/lib/laingchain/translate3DMaterials";
import { I3DMaterial } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = (await req.json()) as { materials: I3DMaterial[] };
        const AIModel = grokModel();

        if (!data.materials) {
            return NextResponse.json(
                {
                    message: "No materials data provided",
                },
                {
                    status: 404,
                },
            );
        }

        const translatedMaterials = await translate3DMaterials(
            data.materials,
            "fr",
            AIModel,
        );

        if (!translate3DMaterials) {
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
            { translatedMaterials: JSON.parse(translatedMaterials.content) },
            { status: 201 },
        );
    } catch (error) {
        console.error(
            "An error occured when getting 3d materials from AI:",
            error,
        );

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
