"use server";

import { fetchApi } from "@/lib/api-utils";
import { getToken } from "@/lib/sessions/dbSession";

export const getPaginatedTransactions = async (skip: number) => {
    const response = await fetchApi("/api/payment", {
        headers: {
            Authorization: `Bearer ${await getToken()}`,
        },
        params: {
            pagination_count: 10,
            pagination_skip: skip,
        },
    });

    return response.json();
};
