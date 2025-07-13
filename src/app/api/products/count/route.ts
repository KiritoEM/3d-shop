import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { checkHasAccess } from "../../middlewares/BearerAcess";

const handler = async (req: NextRequest) => {
    try {
        const productsCount = await prisma.product.count();

        return NextResponse.json({ count: productsCount }, { status: 200 });
    } catch (error) {
        console.error("Error in getCount of products: ", error);
        return NextResponse.json(
            {
                message: "Internal server error",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 },
        );
    }
};

const protectedHandler = checkHasAccess(handler);

export const GET = protectedHandler;
