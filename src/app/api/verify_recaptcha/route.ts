import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const SITE_SECRET = process.env.RECAPTCHA_SITE_SECRET;

        const data = await req.json();

        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${SITE_SECRET}&response=${data.captchaValue}`,
        );

        return NextResponse.json({ data: response.data }, { status: 200 });
    } catch (error) {
        console.error("Error in recaptach-verification: ", error);
        return NextResponse.json(
            {
                message: "Internal server error",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 },
        );
    }
}
