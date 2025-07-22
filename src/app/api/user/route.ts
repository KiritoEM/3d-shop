import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { checkHasAccess } from "../middlewares/auth";
import { NextRequestWithId } from "@/types";

const handler = async (req: NextRequestWithId) => {
    try {
        const userInfo = await prisma.user.findUnique({
            where: { id: req.userId },
            include: {
                accounts: true,
            },
        });

        if (!userInfo) {
            return NextResponse.json(
                { message: `No user found with id: ${req.userId}` },
                { status: 404 },
            );
        }

        return NextResponse.json(
            {
                message: "User fetched successfully",
                user: userInfo,
            },
            {
                status: 200,
            },
        );
    } catch (error) {
        console.error("Error in user handler:", error);
        return NextResponse.json(
            {
                message: "Internal server error",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 },
        );
    }
};

const protectedHandler = checkHasAccess(handler, { type: "nextauth" });

export const GET = protectedHandler;
