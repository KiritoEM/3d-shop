"use server";

export const getPaginatedProducts = async (skip: number) => {
    const response = await fetch(
        `${process.env.API_URL}/api/products?pagination_count=10&pagination_skip=${skip}`,
    );

    return response.json();
};