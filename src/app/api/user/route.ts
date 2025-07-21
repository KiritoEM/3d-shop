import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkHasAccess } from "../middlewares/auth";

const handler = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const paginationCount = Number(searchParams.get("pagination_count"));
        const paginationSkip = Number(searchParams.get("pagination_skip"));

        const usersDataLength = await prisma.user.count();

        const usersData = await prisma.user.findMany({
            ...(paginationCount &&
                paginationSkip && {
                    take: paginationCount,
                    skip: paginationSkip,
                }),
            include: {
                accounts: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(
            {
                paginatedData: usersData,
                totalCount: usersDataLength,
            },
            { status: 200 },
        );
    } catch (error) {
        console.error("Error in getStats for user: ", error);
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
