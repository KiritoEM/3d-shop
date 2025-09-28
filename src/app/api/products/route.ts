import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const paginationCount = Number(searchParams.get("pagination_count"));
        const paginationSkip = Number(searchParams.get("pagination_skip"));
        const categoryId = Number(searchParams.get("category_id"));
        const minPrice = searchParams.get("price_range")?.split("-")[0];
        const maxPrice = searchParams.get("price_range")?.split("-")[1];
        const searchValue = searchParams.get("search_value");

        const productsDataLength = await prisma.product.count();

        const allProducts = await prisma.product.findMany({
            ...(paginationCount &&
                paginationSkip && {
                    take: paginationCount,
                    skip: paginationSkip,
                }),
            include: {
                category: {
                    select: {
                        name: true,
                        id: true,
                    },
                },
            },
            where: {
                name: searchValue ? { contains: searchValue } : undefined,
                categoryId: categoryId || undefined,
                price: {
                    gte: minPrice ? Number(minPrice) : undefined,
                    lte: maxPrice ? Number(maxPrice) : undefined,
                },
            },
        });
        return NextResponse.json(
            {
                paginatedData: allProducts,
                totalCount: productsDataLength,
            },
            { status: 200 },
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 },
        );
    }
};
