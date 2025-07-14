import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkHasAccess } from "../../middlewares/BearerAcess";

const handler = async (req: NextRequest) => {
    try {
        const mostSelledProducts = await prisma.product.findMany({
            where: {
                createdAt: {
                    gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                },
            },
            include: {
                category: true,
            },
            take: 5,
            orderBy: {
                createdAt: "asc",
            },
        });

        return NextResponse.json(
            {
                mostSelledProducts,
            },
            {
                status: 200,
            },
        );
    } catch (error) {
        console.error("Error when fetching last products: ", error);
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
