import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { BearerAccess } from "../../middlewares/BearerAcess";

const handler = async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) => {
    try {
        const { id } = await params;

        const userInfo = await prisma.user.findUnique({
            where: { id },
        });

        if (!userInfo) {
            return NextResponse.json(
                { message: `No user found with id: ${id}` },
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

const protectedHandler = BearerAccess(handler);

export const GET = protectedHandler;
