import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const allProducts = await prisma.product.findMany();
        return NextResponse.json(allProducts, { status: 200 });
    }
    catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}