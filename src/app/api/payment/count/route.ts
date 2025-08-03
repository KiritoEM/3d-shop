import { prisma } from "@/lib/prisma";
import { transactionsCountSQlQuery } from "@/lib/sqlQuery";
import { NextRequest, NextResponse } from "next/server";
import { checkHasAccess } from "../../middlewares/auth";

const handler = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const yearParam = searchParams.get("year");
        const year = yearParam ? parseInt(yearParam, 10) : undefined;

        if (!year) {
            return NextResponse.json(
                { message: "No year variable provided in URL query" },
                { status: 404 },
            );
        }

        const transactionsCount = (await prisma.$queryRawUnsafe(
            transactionsCountSQlQuery(year),
        )) as { count: number }[];

        const dataToSerialize = transactionsCount.map((item) =>
            Number(item.count),
        )[0];

        return NextResponse.json({ count: dataToSerialize }, { status: 200 });
    } catch (error) {
        console.error("Error in getCount of transactions: ", error);
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
