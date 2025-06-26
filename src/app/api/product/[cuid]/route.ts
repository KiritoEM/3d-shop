import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ cuid: string }> }
) {
    try {
        const cuid = (await params).cuid;
        console.log("cuid: ", cuid);

        const productDetail = await prisma.product.findUnique({
            where: {
                cuid: cuid
            },
            include: {
                category: true
            }
        })

        return NextResponse.json(productDetail, { status: 200 });
    }
    catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}