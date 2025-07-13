import { prisma } from "@/lib/prisma";
import { statsSQLQuery } from "@/lib/sqlQuery";
import { NextRequest, NextResponse } from "next/server";
import { checkHasAccess } from "../../middlewares/BearerAcess";

const handler = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const yearParam = searchParams.get("year");
        const year = yearParam ? parseInt(yearParam, 10) : undefined;

        if (!year) {
            return NextResponse.json(
                { message: "No year provided in Query" },
                { status: 404 },
            );
        }

        const sqlQuery = statsSQLQuery("transaction", year);

        const transactionsStats = (await prisma.$queryRawUnsafe(sqlQuery)) as {
            month: number;
            count: number;
        }[];

        const dataToSerialize = transactionsStats.map((item) => ({
            ...item,
            count: Number(item.count),
        }));

        return NextResponse.json({ stats: dataToSerialize }, { status: 200 });
    } catch (error) {
        console.error("Error in getStats for transactions: ", error);
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
