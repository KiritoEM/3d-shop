import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ cuid: string }> },
) {
    try {
        const cuid = (await params).cuid;

        const productDetail = await prisma.product.findUnique({
            where: {
                cuid: cuid,
            },
            include: {
                category: true,
            },
        });

        if (!productDetail) {
            return NextResponse.json(
                {
                    message: "No product with this cuid" + cuid,
                },
                {
                    status: 404,
                },
            );
        }

        return NextResponse.json(productDetail, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 },
        );
    }
}
