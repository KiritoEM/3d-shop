import { prisma } from "@/lib/prisma";
import { userStatsSQLQuery } from "@/lib/sqlQuery";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const yearParam = searchParams.get("year");
        const year = yearParam ? parseInt(yearParam, 10) : undefined;
        const sqlQuery = userStatsSQLQuery(year);

        const usersStats = (await prisma.$queryRawUnsafe(sqlQuery)) as {
            month: number;
            count: number;
        }[];

        const dataToSerialize = usersStats.map((item) => ({
            ...item,
            count: Number(item.count),
        }));

        return NextResponse.json({ stats: dataToSerialize }, { status: 200 });
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
}
