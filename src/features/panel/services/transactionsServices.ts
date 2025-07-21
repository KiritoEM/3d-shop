"use server";

import { getToken } from "@/lib/sessions/dbSession";

export const getPaginatedTransactions = async (skip: number) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment?pagination_count=10&pagination_skip=${skip}`,
        {
            headers: {
                Authorization: `Bearer ${await getToken()}`,
            },
        },
    );

    return response.json();
};
