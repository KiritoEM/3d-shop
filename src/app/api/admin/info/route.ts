import { NextRequest, NextResponse } from "next/server";
import { checkHasAccess } from "../../middlewares/auth";
import { prisma } from "@/lib/prisma";

const handler = async (req: NextRequest) => {
    try {
        const adminData = await prisma.adminInfo.findMany({
            include: {
                adminFacial: true,
            },
        });

        return NextResponse.json(adminData, { status: 200 });
    } catch (err) {
        console.error("Admin session error:", err);

        return NextResponse.json(
            {
                message: "Internal Server Error",
                error:
                    process.env.NODE_ENV === "development"
                        ? String(err)
                        : undefined,
            },
            { status: 500 },
        );
    }
};

const protectedHandler = checkHasAccess(handler);

export const GET = protectedHandler;
