"use server";

import { fetchApi } from "@/lib/api-utils";

export const getPaginatedProducts = async (skip: number) => {
    const response = await fetchApi("/api/products", {
        params: {
            pagination_count: 10,
            pagination_skip: skip,
        },
    });

    return response.json();
};
